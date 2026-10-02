/**
 * Gate for everything under /work/ — the private client portfolio.
 * A valid aa_pf cookie (issued by /api/portfolio-confirm) passes; everyone else is sent
 * to the request form.
 *
 * What lives behind it (2026-10-01):
 *  - work/index.html + work/portfolio.css/js — the case-study page
 *  - work/assets/…  — portfolio-only media (new encodes, posters, reference sheets, storyboards)
 *  - /work/film/<slug>.mp4 — client films that already live on Pages, proxied by
 *    functions/work/film/[[path]].js so client-portal URLs never reach a prospect
 *  - /work/media/<key> — the R2 bucket route (PORTFOLIO_R2), for when R2 is enabled
 */
const GATE = "/#work";

async function hasAccess(context) {
  const m = (context.request.headers.get("Cookie") || "").match(/(?:^|;\s*)aa_pf=([a-f0-9]{40,80})/i);
  if (!m || !context.env.AISO_KV) return null;
  const raw = await context.env.AISO_KV.get("pf:access:" + m[1]);
  return raw ? JSON.parse(raw) : null;
}

export async function onRequest(context) {
  const who = await hasAccess(context);
  if (!who) return new Response(null, { status: 302, headers: { Location: GATE, "Cache-Control": "no-store" } });
  const res = await context.next();
  const type = res.headers.get("Content-Type") || "";
  let out = new Response(res.body, res);
  out.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  if (type.startsWith("text/html")) {
    out.headers.set("Cache-Control", "private, no-store");
    // Greet the viewer by first name: <span data-viewer>there</span> → "Sarah". Text-only, so it can't inject markup.
    const first = String(who.name || "").trim().split(/\s+/)[0].slice(0, 40);
    if (first) out = new HTMLRewriter().on("[data-viewer]", { element(el) { el.setInnerContent(first); } }).transform(out);
  } else {
    // Media and assets: cache in this browser only (never a shared cache), so replays and seeks don't re-download.
    out.headers.set("Cache-Control", "private, max-age=86400");
  }
  return out;
}
