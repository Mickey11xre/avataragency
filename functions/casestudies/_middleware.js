/**
 * Gate for /casestudies/: the prospect-facing case studies (Paul Small, SHE THRIVES, Dr. Alena Nawrocki; 2026-10-16).
 * Same access as /work/: a valid aa_pf cookie (issued by /api/portfolio-confirm, or by a pass link) passes; everyone else
 * goes to the request form. Since 10-16 the email link and every prospect pass land HERE, and /work/ (all 10 cases) is
 * internal (functions/work/_middleware.js). The page's media still comes from /work/assets/ and /work/film/, which any
 * valid cookie can load.
 */
import { redeemPass, passStillValid } from "../_lib/passes.js";

const GATE = "/#work";

async function hasAccess(context) {
  const m = (context.request.headers.get("Cookie") || "").match(/(?:^|;\s*)aa_pf=([a-f0-9]{40,80})/i);
  if (!m || !context.env.AISO_KV) return null;
  const raw = await context.env.AISO_KV.get("pf:access:" + m[1]);
  const who = raw ? JSON.parse(raw) : null;
  return who && passStillValid(who) ? who : null;
}

export async function onRequest(context) {
  const who = await hasAccess(context);
  const url = new URL(context.request.url);
  if (url.searchParams.has("pass")) {
    const redeemed = await redeemPass(context, url.searchParams.get("pass"), who, { location: "/casestudies/", page: "Case studies" });
    if (redeemed) return redeemed;
  }
  if (!who) return new Response(null, { status: 302, headers: { Location: GATE, "Cache-Control": "no-store" } });
  const res = await context.next();
  const type = res.headers.get("Content-Type") || "";
  let out = new Response(res.body, res);
  out.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  if (type.startsWith("text/html")) {
    out.headers.set("Cache-Control", "private, no-store");
    const first = String(who.name || "").trim().split(/\s+/)[0].slice(0, 40);   // "Hi Ron": text only, no markup
    if (first) out = new HTMLRewriter().on("[data-viewer]", { element(el) { el.setInnerContent(first); } }).transform(out);
  } else {
    out.headers.set("Cache-Control", "private, max-age=86400");
  }
  return out;
}
