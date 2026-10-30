/**
 * POST /clients/harvard/api/contact — the contact form on the Harvard Investment Group site (preview build).
 *
 * Built 2026-10-30 for Greg Cullen's redesigned site, previewed at avataragency.ai/clients/harvard/ before it moves to
 * harvardinvestmentgroup.com (then this file moves to functions/api/contact.js in that project; the page posts to
 * <root>/api/contact either way). Pattern: functions/thrivingincollege/api/contact.js.
 *
 * SETUP (Cloudflare Pages project settings):
 *   RESEND_API_KEY      secret, required to send (already set for the other forms on avataragency.ai)
 *   HIG_CONTACT_TO      comma-separated recipients. ⚠️ Unset = michael@avataragency.ai, on purpose: nothing from the
 *                       preview reaches Greg's inbox until Michael sets it to greg@harvardinvestmentgroup.com at go-live.
 *   HIG_CONTACT_FROM    verified Resend sender (optional; defaults to the avataragency.ai sender the other forms use)
 *
 * Accepts JSON (the page's script) or a plain form post (no JavaScript), which is redirected (303) to the page's
 * `redirect` field (same origin only) with ?sent=1.
 */

const FALLBACK_TO = "michael@avataragency.ai";

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
}
const clean = (v, max) => (typeof v === "string" ? v : "").replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, max);
const cleanText = (v, max) => (typeof v === "string" ? v : "").replace(/\r\n?/g, "\n").replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, "").trim().slice(0, max);

function sameOrigin(request) {
  const origin = request.headers.get("Origin");
  return !origin || origin === new URL(request.url).origin;
}
async function readBody(request) {
  const ct = request.headers.get("Content-Type") || "";
  if (ct.includes("application/json")) return await request.json();
  return Object.fromEntries((await request.formData()).entries());
}
function validate(b) {
  const errors = {};
  const r = { name: clean(b.name, 120), email: clean(b.email, 160).toLowerCase(), phone: clean(b.phone, 40), message: cleanText(b.message, 4000) };
  if (r.name.length < 2) errors.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.email)) errors.email = "Enter a valid email address.";
  if (r.message.length < 2) errors.message = "Enter a message.";
  return { r, errors };
}

export async function onRequestPost(context) {
  const { request, env } = context;
  if (!sameOrigin(request)) return json({ error: "forbidden" }, 403);
  const wantsJson = (request.headers.get("Content-Type") || "").includes("application/json");

  let body;
  try { body = await readBody(request); } catch { return json({ error: "bad request" }, 400); }

  // Where a no-JS post lands afterwards: only a same-origin path is honoured.
  const origin = new URL(request.url).origin;
  let redirect = origin + "/clients/harvard/contact/?sent=1";
  if (typeof body.redirect === "string" && /^\/[^/\\]/.test(body.redirect)) redirect = origin + body.redirect;
  const done = () => (wantsJson ? json({ ok: true }) : Response.redirect(redirect, 303));

  // Honeypot: people never see this field; bots fill it. Pretend success.
  if (clean(body.website, 10)) return done();

  const { r, errors } = validate(body);
  if (Object.keys(errors).length) return json({ error: "validation", fields: errors }, 400);

  if (!env.RESEND_API_KEY) {
    console.log("harvard contact: RESEND_API_KEY missing; message not sent");
    return json({ error: "not configured" }, 500);
  }
  const id = "hig_" + Date.now().toString(36) + crypto.randomUUID().slice(0, 6);
  const to = (env.HIG_CONTACT_TO || FALLBACK_TO).split(",").map((x) => x.trim()).filter(Boolean);
  const text = [
    `Harvard Investment Group website — contact message ${id}`,
    "",
    `From: ${r.name} <${r.email}>`,
    `Phone: ${r.phone || "(not given)"}`,
    "",
    "Message:",
    r.message,
    "",
    "Reply to this email to answer the sender directly.",
    `Sent from ${origin}/clients/harvard/contact/`,
  ].join("\n");

  const send = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.HIG_CONTACT_FROM || "Harvard Investment Group website <orders@avataragency.ai>",
      to,
      reply_to: r.email,
      subject: `Website message — ${r.name}`,
      text,
    }),
  });
  if (!send.ok) {
    console.log("harvard contact: resend error", await send.text());
    return json({ error: "could not send" }, 502);
  }
  return done();
}
