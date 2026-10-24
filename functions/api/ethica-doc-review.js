/**
 * POST /api/ethica-doc-review — "Upload documents" on Ethica's panel (Michael 10-24: the visitor uploads a document,
 * Ethica analyzes it and gives insights; the file is not saved). Option 3 of BRIEF_ETHICA_DOCUMENT_REVIEW.md.
 *
 * The page sends the file as base64 TEXT (it encodes in the browser; images are downscaled to JPEG there first), with
 * headers X-Doc-Type (application/pdf | image/jpeg | image/png | image/webp) and X-Doc-Consent: yes.
 * We forward it to the Claude API for a fraud red-flag review and return the structured report.
 *
 * PRIVACY: the file lives only in this request's memory and is gone when the response is sent. Nothing about it is
 * written to KV, R2 or logs (only size, type, duration and flag count are logged). The report goes back to the page,
 * which keeps it in memory until the conversation ends.
 *
 * Plain fetch to the Messages API, like every function here (no package.json / build step for functions).
 * Bindings: AISO_KV (rate limits). Secret: ANTHROPIC_API_KEY (Michael adds it in the Pages dashboard; until then 503).
 */
const ALLOWED_ORIGINS = ["https://avataragency.ai", "https://www.avataragency.ai"];
const TYPES = { "application/pdf": "document", "image/jpeg": "image", "image/png": "image", "image/webp": "image" };
const MAX_B64 = 6 * 1024 * 1024;   // ≈ 4.5 MB file; images are downscaled in the browser well below this
const PER_IP_PER_DAY = 5;
const ALL_PER_DAY = 200;           // hard ceiling on spend: a few cents each
const MODEL = "claude-opus-5-5";

const SYSTEM = `You are the document reviewer behind Ethica, a fraud-fighting superhero accountant on AvatarAgency's website (Prevention, Detection, Remediation). A member of the public uploaded one financial document: a bank or card statement, invoice, receipt, check, letter, pay stub, tax form, contract or similar. Review it for red flags worth a closer look, the way a careful forensic accountant would on a first read.

Look for: totals or running balances that do not add up; mismatched names, addresses, dates or account endings; font, alignment or spacing inconsistencies and edited-looking areas; round-number or duplicated amounts; impossible or unusual dates (for example weekends on a business-day ledger); missing pages or broken page sequences; unexpected payees, fees or charges; pressure, urgency or payment demands typical of scams (gift cards, wire transfers, crypto, "verify your account" links).

Rules:
- Quote short evidence from the document for every red flag, so the visitor can find it.
- Say what a red flag COULD mean and why it matters. Never state that something IS fraud, and never accuse a named person or company.
- Never write out a full account, card, routing or Social Security number: keep at most the last four digits (for example "account ending 1234").
- Plain, calm, everyday English a non-accountant understands. No legal, tax or investment advice.
- If the document is unreadable or not a financial document, say so in the summary and leave the lists empty.
- Next steps are practical and safe: for example call the bank using the number on the card, ask the issuer for the original, compare with the online account, report to the right place.`;

const ASK = "Review this document and return the report.";

const SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["doc_type", "summary", "red_flags", "looks_consistent", "next_steps", "cannot_tell"],
  properties: {
    doc_type: { type: "string", description: "What the document appears to be, in a few words" },
    summary: { type: "string", description: "Two or three plain sentences: the overall picture" },
    red_flags: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["title", "evidence", "why", "severity"],
        properties: {
          title: { type: "string" },
          evidence: { type: "string", description: "Short quote or location in the document" },
          why: { type: "string", description: "What it could mean and why it matters" },
          severity: { type: "string", enum: ["high", "medium", "low"] },
        },
      },
    },
    looks_consistent: { type: "array", items: { type: "string" } },
    next_steps: { type: "array", items: { type: "string" } },
    cannot_tell: { type: "array", items: { type: "string" }, description: "What this file alone cannot show" },
  },
};
const SCHEMA_JSON = JSON.stringify(SCHEMA);

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  if (!ALLOWED_ORIGINS.includes(request.headers.get("Origin") || "")) return json({ ok: false, error: "forbidden" }, 403);
  if (!env.ANTHROPIC_API_KEY || !env.AISO_KV) return json({ ok: false, error: "not_configured" }, 503);

  const type = (request.headers.get("X-Doc-Type") || "").toLowerCase();
  const kind = TYPES[type];
  if (!kind) return json({ ok: false, error: "unsupported_type" }, 415);
  if (request.headers.get("X-Doc-Consent") !== "yes") return json({ ok: false, error: "consent_required" }, 400);
  const len = parseInt(request.headers.get("Content-Length") || "0", 10);
  if (len > MAX_B64) return json({ ok: false, error: "too_large" }, 413);

  // Rate limits before reading the body: per IP per day, and an all-visitors ceiling per day.
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const day = new Date().toISOString().slice(0, 10);
  const ipKey = "rl:ethica-doc:ip:" + ip + ":" + day, allKey = "rl:ethica-doc:all:" + day;
  const [ipN, allN] = await Promise.all([env.AISO_KV.get(ipKey), env.AISO_KV.get(allKey)]).then((v) => v.map((x) => parseInt(x || "0", 10)));
  if (ipN >= PER_IP_PER_DAY || allN >= ALL_PER_DAY) return json({ ok: false, error: "limit" }, 429);

  const b64 = (await request.text()).trim();
  if (!b64 || b64.length > MAX_B64) return json({ ok: false, error: "too_large" }, 413);
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(b64)) return json({ ok: false, error: "bad_file" }, 400);

  await Promise.all([env.AISO_KV.put(ipKey, String(ipN + 1), { expirationTtl: 90000 }), env.AISO_KV.put(allKey, String(allN + 1), { expirationTtl: 90000 })]);

  // Built by concatenation so the (validated) base64 is never parsed or re-encoded here.
  const block = '{"type":"' + kind + '","source":{"type":"base64","media_type":"' + type + '","data":"' + b64 + '"}}';
  const body = '{"model":"' + MODEL + '","max_tokens":16000,"fallbacks":"default",' +
    '"output_config":{"effort":"high","format":{"type":"json_schema","schema":' + SCHEMA_JSON + '}},' +
    '"system":' + JSON.stringify(SYSTEM) + ',' +
    '"messages":[{"role":"user","content":[' + block + ',{"type":"text","text":' + JSON.stringify(ASK) + '}]}]}';

  const t0 = Date.now();
  let r, data;
  try {
    r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2026-10-21",
        "anthropic-beta": "server-side-fallback-2026-07-01",   // fallbacks: "default" (a declined request re-runs on Anthropic's recommended model)
      },
      body,
    });
    data = await r.json().catch(() => null);
  } catch (e) {
    console.log("ethica-doc-review fetch failed", type, b64.length, Date.now() - t0 + "ms");
    return json({ ok: false, error: "unavailable" }, 502);
  }
  const ms = Date.now() - t0;
  if (!r.ok || !data) {
    console.log("ethica-doc-review api", r.status, data && data.error && data.error.type, type, b64.length, ms + "ms");
    return json({ ok: false, error: r.status === 429 ? "busy" : r.status === 400 ? "unreadable" : "unavailable" }, r.status === 429 ? 429 : 502);
  }
  if (data.stop_reason === "refusal") { console.log("ethica-doc-review refusal", type, b64.length, ms + "ms"); return json({ ok: false, error: "declined" }, 422); }
  if (data.stop_reason === "max_tokens") { console.log("ethica-doc-review max_tokens", type, b64.length, ms + "ms"); return json({ ok: false, error: "unavailable" }, 502); }

  const text = (data.content || []).filter((c) => c.type === "text").map((c) => c.text).join("");
  let report;
  try { report = JSON.parse(text); } catch { console.log("ethica-doc-review bad json", type, b64.length, ms + "ms"); return json({ ok: false, error: "unavailable" }, 502); }
  console.log("ethica-doc-review ok", type, b64.length, ms + "ms", "flags=" + (report.red_flags || []).length, "model=" + data.model,
    "in=" + (data.usage && data.usage.input_tokens), "out=" + (data.usage && data.usage.output_tokens));
  return json({ ok: true, report });
}
