/**
 * Gate for the client portals listed in GATED (functions/_lib/client-auth.js) — 2026-11-24, Andre Neidich first.
 *
 * /clients/<slug>/… for a slug NOT in GATED passes straight through, untouched: the other portals, the prospect pages
 * (accu, dental-arts, plaud, rentalizer, harvard preview…) and their own functions behave exactly as before.
 * For a gated slug, everything under it (pages, subpages, images, audio, video, iframes) needs an aa_cl sign-in that
 * may see that slug (admins see all):
 *   signed out          page -> 302 /login/?next=<path>       asset -> 401
 *   temporary password  page -> 302 /login/change/            asset -> 401
 *   other client's slug page -> 403 page                      asset -> 403
 *   not configured      503 (fails closed: never serves a gated portal without a working gate)
 * Pages get Cache-Control: private, no-store; assets private (this browser only), never a shared cache.
 */
import { GATED, configured, getClientSession, canAccess, esc } from "../_lib/client-auth.js";

function slugOf(pathname) {
  let p = pathname;
  try { p = decodeURIComponent(pathname); } catch { /* keep raw */ }
  const parts = p.split("/").filter(Boolean);            // "", "clients", "<slug>", …
  return (parts[1] || "").toLowerCase();
}
function isPage(request, pathname) {
  const accept = request.headers.get("Accept") || "";
  return request.method === "GET" && (accept.includes("text/html") || pathname.endsWith("/") || /\.html?$/i.test(pathname) || !/\.[a-z0-9]{2,5}$/i.test(pathname));
}
const plain = (text, status) => new Response(text, { status, headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } });
const redirect = (to) => new Response(null, { status: 302, headers: { Location: to, "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } });

function forbiddenPage() {
  return new Response(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Not your portal · AvatarAgency</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0a0a0a;color:#f5f0e8;font:16px/1.6 -apple-system,'Segoe UI',system-ui,sans-serif;padding:24px}main{max-width:440px;text-align:center}b{color:#C9A84C}a{color:#E4C97A}</style></head>
<body><main><p style="font-weight:700;font-size:22px">Avatar<b>Agency</b></p><h1 style="font-weight:500;font-size:24px">This portal belongs to another client</h1><p>You're signed in, but this page isn't part of your project. <a href="/login/">Go to your portal</a> or <a href="mailto:michael@avataragency.ai">email Michael</a>.</p></main></body></html>`,
    { status: 403, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } });
}

// A small "Signed in as … · Sign out" pill on every gated page, added here so the portal files stay unchanged.
function signedInBar(name) {
  return `<div id="aa-cl-bar" style="position:fixed;right:14px;bottom:14px;z-index:9999;display:flex;align-items:center;gap:10px;padding:8px 8px 8px 14px;border-radius:999px;background:rgba(10,10,10,.86);border:1px solid rgba(201,168,76,.45);color:#f5f0e8;font:500 13px/1.2 -apple-system,'Segoe UI',system-ui,sans-serif;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)">`
    + `<span>Signed in as <b style="color:#E4C97A;font-weight:600">${esc(name)}</b></span>`
    + `<button type="button" id="aa-cl-out" style="min-height:44px;min-width:44px;padding:0 14px;border-radius:999px;border:1px solid rgba(201,168,76,.6);background:transparent;color:#E4C97A;font:600 12.5px/1 inherit;cursor:pointer">Sign out</button></div>`
    + `<script>document.getElementById("aa-cl-out").addEventListener("click",function(){fetch("/api/client-auth",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"same-origin",body:JSON.stringify({action:"logout"})}).finally(function(){location.href="/login/?out=1";});});</script>`;
}

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const slug = slugOf(url.pathname);
  if (!GATED.has(slug)) return context.next();

  const page = isPage(request, url.pathname);
  if (!configured(env)) return plain("Client sign-in isn't configured on this deployment.", 503);

  const session = await getClientSession(env, request, { deep: page });
  if (!session) return page ? redirect("/login/?next=" + encodeURIComponent(url.pathname + url.search)) : plain("Sign in required.", 401);
  if (session.mc) return page ? redirect("/login/change/?next=" + encodeURIComponent(url.pathname)) : plain("Password change required.", 401);
  if (!canAccess(session, slug)) return page ? forbiddenPage() : plain("Forbidden.", 403);

  const res = await context.next();
  let out = new Response(res.body, res);
  const type = res.headers.get("Content-Type") || "";
  out.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  out.headers.set("Referrer-Policy", "same-origin");
  out.headers.delete("ETag");
  if (type.startsWith("text/html")) {
    out.headers.set("Cache-Control", "private, no-store");
    const name = String(session.n || session.e || "").trim().split(/\s+/)[0].slice(0, 40) || "you";
    out = new HTMLRewriter()
      .on("[data-viewer]", { element(el) { el.setInnerContent(name); } })
      .on("body", { element(el) { el.append(signedInBar(session.r === "admin" ? (session.n || "Admin") + " (admin)" : name), { html: true }); } })
      .transform(out);
  } else {
    out.headers.set("Cache-Control", "private, max-age=3600");
  }
  return out;
}
