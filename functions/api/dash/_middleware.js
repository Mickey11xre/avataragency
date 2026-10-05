/**
 * Gate for /api/dash/* — the avatar dashboard's data API. Needs a dashboard sign-in (cookie aa_dash, issued by
 * /api/dash-auth); changes must come from our own pages; ?avatar= must be one this person may see.
 * Shared code lives in functions/_lib/dash.js.
 */
import { json, getSession, sameOrigin, canSee } from "../../_lib/dash.js";

export async function onRequest(context) {
  const { request, env } = context;
  if (!env.AISO_KV) return json({ ok: false, error: "not configured" }, 503);
  const session = await getSession(env, request);
  if (!session) return json({ ok: false, error: "signed out" }, 401);
  if (request.method !== "GET" && request.method !== "HEAD" && !sameOrigin(request)) return json({ ok: false, error: "forbidden" }, 403);
  const av = new URL(request.url).searchParams.get("avatar");
  if (av && !canSee(session, av)) return json({ ok: false, error: "not your avatar" }, 403);
  context.data.session = session;
  let res;
  try { res = await context.next(); }
  catch (e) {
    console.log("dash error:", String((e && e.stack) || e));
    res = json({ ok: false, error: "Something went wrong loading this. Try again in a moment." }, 500);
  }
  const out = new Response(res.body, res);
  out.headers.set("Cache-Control", "no-store");
  out.headers.set("X-Robots-Tag", "noindex, nofollow");
  return out;
}
