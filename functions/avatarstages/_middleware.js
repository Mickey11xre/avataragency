/**
 * Gate for everything under /avatarstages — the private page of live avatar stages (Ava, then Maya).
 * Same access as the private portfolio (/work/): a valid aa_pf cookie, issued by /api/portfolio-confirm with
 * Path=/, passes. Everyone else is sent to the portfolio request form. Logic copied from
 * functions/work/_middleware.js so /work/ itself is untouched.
 *
 * Differences from /work/:
 *  - /avatarstages/api/* (Maya's token route) answers 401 JSON instead of a redirect, and keeps its own
 *    Cache-Control: no-store (a session token must never be cached).
 *  - The viewer's record goes to the next handler as context.data.viewer, so Maya can greet them by first name.
 *  - A pass link (?pass=<code>, see functions/_lib/passes.js) opens the page without the email form: it issues
 *    the same cookie, emails Michael, and redirects to the clean URL.
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

// The only files outside the gate: what Lady Belle's stage embed needs on Adele Harrison's (ungated) client portal,
// /clients/aharrison/lady-belle/ (2026-10-09). Her script, the shared stage styles, her intro and poster: nothing
// private. Exact paths only; every page and every /avatarstages/api/ token route stays gated.
// 2026-10-09: the same for Maya's stage embed on Dr. Nawrocki's (ungated) landing page, /clients/dental-arts/maya/.
const PUBLIC_FILES = new Set(["/avatarstages/ladybelle-stage.js", "/avatarstages/stages.css",
  "/avatarstages/media/ladybelle-intro.mp4", "/avatarstages/media/ladybelle-poster.jpg",
  "/avatarstages/maya-stage.js", "/avatarstages/media/maya-intro.mp4", "/avatarstages/media/maya-poster.jpg"]);

export async function onRequest(context) {
  if (PUBLIC_FILES.has(new URL(context.request.url).pathname)) return context.next();
  const url = new URL(context.request.url);
  const api = url.pathname.startsWith("/avatarstages/api/");
  const who = await hasAccess(context);
  if (!api && url.searchParams.has("pass")) {
    const redeemed = await redeemPass(context, url.searchParams.get("pass"), who, { location: "/avatarstages/", page: "Avatar stages" });
    if (redeemed) return redeemed;
  }
  if (!who) {
    if (api) return new Response(JSON.stringify({ error: "Private page" }), { status: 401, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
    return new Response(null, { status: 302, headers: { Location: GATE, "Cache-Control": "no-store" } });
  }
  context.data.viewer = who;
  const res = await context.next();
  const type = res.headers.get("Content-Type") || "";
  let out = new Response(res.body, res);
  out.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  if (api) return out;
  if (type.startsWith("text/html")) {
    out.headers.set("Cache-Control", "private, no-store");
    // Greet the viewer by first name: <span data-viewer>there</span> → "Sarah". Text-only, so it can't inject markup.
    const first = String(who.name || "").trim().split(/\s+/)[0].slice(0, 40);
    if (first) out = new HTMLRewriter().on("[data-viewer]", { element(el) { el.setInnerContent(first); } }).transform(out);
  } else {
    // Media and assets: cache in this browser only (never a shared cache). Scripts and styles change with ?v=.
    out.headers.set("Cache-Control", "private, max-age=86400");
  }
  return out;
}
