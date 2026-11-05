/**
 * /api/review-pins — the comment layer on client site previews.
 *
 * A reviewer (client or owner) drops numbered pins on the live preview pages and writes a note under each; the owner
 * replies and resolves. State is one JSON document per site in the REVIEWS KV namespace (key pins:<site>).
 *
 * Access: every request carries the reviewer's code (header X-Review-Code, or ?code=), checked against the SHA-256
 * registry in _lib/reviewers.js. Nothing here is readable without a code.
 *
 *   GET  /api/review-pins?site=hig                → { ok, me, site, comments, rounds }
 *   GET  /api/review-pins?site=hig&format=text    → plain-text digest (owner only; what Michael pastes to the agent)
 *   POST /api/review-pins?site=hig  JSON { action, ... }  (same-origin only)
 *        add     { page, title, anchor, text }   → { ok, comment }
 *        edit    { id, text }                    own comment, not yet sent
 *        delete  { id }                          own + unsent, or owner
 *        reply   { id, text }
 *        resolve { id } · reopen { id }          owner only
 *        send    {}                              client: stamps a round on the unsent comments and emails Michael
 *
 * Bindings: REVIEWS (KV). Secrets: RESEND_API_KEY (the digest email; without it "send" still stamps the round).
 */
import { findReviewer, SITES } from "../_lib/reviewers.js";

const NOTIFY = "michael@avataragency.ai";
const FROM = "AvatarAgency Review <studio@avataragency.ai>";
const MAX_TEXT = 2000, MAX_COMMENTS = 400, MAX_BODY = 16 * 1024;

const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
const text = (body, status = 200) => new Response(body, { status, headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
const clean = (v, max) => (typeof v === "string" ? v : "").replace(/\r\n?/g, "\n").replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, "").trim().slice(0, max);
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const num = (v, lo, hi) => (typeof v === "number" && isFinite(v) ? Math.min(hi, Math.max(lo, v)) : null);

function sameOrigin(request) {
  const origin = request.headers.get("Origin");
  return !origin || origin === new URL(request.url).origin;
}
function cleanAnchor(a) {
  if (!a || typeof a !== "object") return null;
  const sel = clean(a.sel, 400), snippet = clean(a.snippet, 160);
  const ox = num(a.ox, 0, 1), oy = num(a.oy, 0, 1), px = num(a.px, 0, 1), py = num(a.py, 0, 1e6);
  if (px === null || py === null) return null;
  return { sel, ox, oy, px, py, snippet };
}
function cleanPage(p) {
  p = clean(p, 200);
  return /^\/[a-z0-9\-_/]*$/i.test(p) ? p : "/";
}

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const site = (url.searchParams.get("site") || "").toLowerCase();
  if (!SITES[site]) return json({ ok: false, error: "unknown site" }, 404);
  if (!env.REVIEWS) return json({ ok: false, error: "not configured", hint: "bind the REVIEWS KV namespace" }, 503);

  const code = request.headers.get("X-Review-Code") || url.searchParams.get("code") || "";
  const me = await findReviewer(code, site);
  if (!me) return json({ ok: false, error: "no access" }, 401);
  const owner = me.role === "owner";

  const key = `pins:${site}`;
  const load = async () => { const s = await env.REVIEWS.get(key); const d = s ? JSON.parse(s) : {}; return { comments: Array.isArray(d.comments) ? d.comments : [], rounds: Array.isArray(d.rounds) ? d.rounds : [] }; };
  const save = (d) => env.REVIEWS.put(key, JSON.stringify(d));

  if (request.method === "GET") {
    const d = await load();
    if (url.searchParams.get("format") === "text") {
      if (!owner) return json({ ok: false, error: "owner only" }, 403);
      return text(digest(site, d.comments, d.rounds, url.origin, "all"));
    }
    return json({ ok: true, me, site: { id: site, ...SITES[site] }, comments: d.comments, rounds: d.rounds });
  }

  if (request.method !== "POST") return json({ ok: false, error: "method" }, 405);
  if (!sameOrigin(request)) return json({ ok: false, error: "forbidden" }, 403);
  let body;
  try { const t = await request.text(); if (t.length > MAX_BODY) return json({ ok: false, error: "too large" }, 413); body = JSON.parse(t); } catch { return json({ ok: false, error: "bad json" }, 400); }
  if (!body || typeof body !== "object") return json({ ok: false, error: "bad body" }, 400);

  const d = await load();
  const now = new Date().toISOString();
  const find = (id) => d.comments.find((c) => c.id === id);
  const mine = (c) => c.by === me.name && c.role === me.role;

  switch (body.action) {
    case "add": {
      const t = clean(body.text, MAX_TEXT), anchor = cleanAnchor(body.anchor);
      if (!t) return json({ ok: false, error: "empty" }, 400);
      if (!anchor) return json({ ok: false, error: "bad anchor" }, 400);
      if (d.comments.length >= MAX_COMMENTS) return json({ ok: false, error: "limit" }, 429);
      const n = d.comments.reduce((m, c) => Math.max(m, c.n || 0), 0) + 1;
      const c = { id: "c" + Date.now().toString(36) + crypto.randomUUID().slice(0, 6), n, page: cleanPage(body.page), title: clean(body.title, 120), anchor, text: t,
        by: me.name, role: me.role, at: now, status: "open", replies: [], round: null };
      d.comments.push(c); await save(d);
      return json({ ok: true, comment: c });
    }
    case "edit": {
      const c = find(clean(body.id, 40)); const t = clean(body.text, MAX_TEXT);
      if (!c || !t) return json({ ok: false, error: "not found" }, 404);
      if (!(owner || (mine(c) && c.round === null))) return json({ ok: false, error: "not yours" }, 403);
      c.text = t; c.editedAt = now; await save(d);
      return json({ ok: true, comment: c });
    }
    case "delete": {
      const c = find(clean(body.id, 40));
      if (!c) return json({ ok: false, error: "not found" }, 404);
      if (!(owner || (mine(c) && c.round === null))) return json({ ok: false, error: "not yours" }, 403);
      d.comments = d.comments.filter((x) => x.id !== c.id); await save(d);
      return json({ ok: true });
    }
    case "reply": {
      const c = find(clean(body.id, 40)); const t = clean(body.text, MAX_TEXT);
      if (!c || !t) return json({ ok: false, error: "not found" }, 404);
      c.replies.push({ by: me.name, role: me.role, text: t, at: now }); await save(d);
      return json({ ok: true, comment: c });
    }
    case "resolve":
    case "reopen": {
      if (!owner) return json({ ok: false, error: "owner only" }, 403);
      const c = find(clean(body.id, 40));
      if (!c) return json({ ok: false, error: "not found" }, 404);
      c.status = body.action === "resolve" ? "resolved" : "open"; c.resolvedAt = body.action === "resolve" ? now : null; await save(d);
      return json({ ok: true, comment: c });
    }
    case "send": {
      const unsent = d.comments.filter((c) => c.round === null && mine(c));
      if (!unsent.length) return json({ ok: false, error: "nothing to send" }, 400);
      const round = d.rounds.length + 1;
      unsent.forEach((c) => { c.round = round; c.sentAt = now; });
      d.rounds.push({ n: round, at: now, by: me.name, count: unsent.length });
      await save(d);
      let emailed = false;
      if (env.RESEND_API_KEY) {
        const openOlder = d.comments.filter((c) => c.status === "open" && c.round !== null && c.round !== round).length;
        const subject = `Website review: ${unsent.length} comment${unsent.length === 1 ? "" : "s"} from ${me.name} (${SITES[site].name}, round ${round})`;
        const r = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
          body: JSON.stringify({ from: FROM, to: [NOTIFY], subject,
            text: digest(site, unsent, d.rounds, url.origin, round) + (openOlder ? `\n${openOlder} older comment${openOlder === 1 ? " is" : "s are"} still open.\n` : ""),
            html: digestHtml(site, unsent, url.origin, round, me.name, openOlder) }),
        }).catch(() => null);
        emailed = !!(r && r.ok);
        if (!emailed) console.log("review-pins: resend failed", r && (await r.text().catch(() => "")));
      }
      return json({ ok: true, round, count: unsent.length, emailed });
    }
    default:
      return json({ ok: false, error: "unknown action" }, 400);
  }
}

// ---- digests -------------------------------------------------------------------------------------------------------
function byPage(comments) {
  const m = new Map();
  for (const c of comments) { if (!m.has(c.page)) m.set(c.page, []); m.get(c.page).push(c); }
  return [...m.entries()];
}
const pinUrl = (origin, site, c) => `${origin}${SITES[site].base}${c.page}#aa-pin=${c.id}`;
const when = (iso) => new Date(iso).toLocaleString("en-US", { timeZone: "America/Los_Angeles", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });

function digest(site, comments, rounds, origin, round) {
  const lines = [`${SITES[site].name} — review comments${round === "all" ? "" : `, round ${round}`} (${comments.length})`, ""];
  for (const [page, list] of byPage(comments)) {
    lines.push(`PAGE ${page}${list[0].title ? " · " + list[0].title : ""}`);
    for (const c of list) {
      lines.push(`  #${c.n} [${c.status}] ${c.by}, ${when(c.at)}${c.round ? ", round " + c.round : ""}`);
      if (c.anchor && c.anchor.snippet) lines.push(`     near: "${c.anchor.snippet}"`);
      for (const l of c.text.split("\n")) lines.push(`     ${l}`);
      for (const r of c.replies) lines.push(`     ↳ ${r.by} (${when(r.at)}): ${r.text.replace(/\n/g, " ")}`);
      lines.push(`     open: ${pinUrl(origin, site, c)}`);
    }
    lines.push("");
  }
  return lines.join("\n");
}
function digestHtml(site, comments, origin, round, who, openOlder) {
  const rows = byPage(comments).map(([page, list]) => `<h3 style="margin:18px 0 6px;font:600 14px/1.3 -apple-system,Segoe UI,Arial,sans-serif;color:#111">${esc(page)}${list[0].title ? ` <span style="font-weight:400;color:#777">· ${esc(list[0].title)}</span>` : ""}</h3>` +
    list.map((c) => `<div style="border-left:3px solid #C9A24A;padding:6px 12px;margin:0 0 10px;font:14px/1.45 -apple-system,Segoe UI,Arial,sans-serif;color:#222">
      <div style="font-size:12px;color:#777">#${c.n} · ${when(c.at)}${c.anchor && c.anchor.snippet ? ` · near “${esc(c.anchor.snippet)}”` : ""}</div>
      <div style="white-space:pre-wrap">${esc(c.text)}</div>
      <div style="margin-top:4px;font-size:12px"><a href="${pinUrl(origin, site, c)}" style="color:#8a6d1e">Open this pin on the page</a></div>
    </div>`).join("")).join("");
  return `<div style="max-width:640px;font:14px/1.45 -apple-system,Segoe UI,Arial,sans-serif;color:#222">
    <p><b>${esc(who)}</b> sent ${comments.length} comment${comments.length === 1 ? "" : "s"} on the ${esc(SITES[site].name)} (round ${round}).</p>
    ${rows}
    ${openOlder ? `<p style="color:#777">${openOlder} older comment${openOlder === 1 ? " is" : "s are"} still open.</p>` : ""}
    <p style="font-size:12px;color:#999">Open the preview with your reviewer link to see every pin, reply, and resolve them.</p>
  </div>`;
}
