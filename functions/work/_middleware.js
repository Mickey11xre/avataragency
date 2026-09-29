/**
 * Gate for everything under /work/ — the private client portfolio.
 * A valid aa_pf cookie (issued by /api/portfolio-confirm) passes; everyone else is sent
 * to the request form. The page itself carries no client names: it loads its list from
 * /work/media/manifest.json, and all media streams from the private R2 bucket (binding
 * PORTFOLIO_R2) through functions/work/media/[[path]].js — nothing client-owned lives in
 * this public repository.
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
  const out = new Response(res.body, res);
  out.headers.set("Cache-Control", "private, no-store");
  out.headers.set("X-Robots-Tag", "noindex, nofollow");
  return out;
}
