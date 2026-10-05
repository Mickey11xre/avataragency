/**
 * Gate for the dashboard pages (/dashboard/*). Signed out -> the sign-in page. The sign-in page and the shared
 * assets (/dashboard/assets/: CSS and JS, no data in them) stay open so the sign-in page can load.
 * Every number, lead and transcript comes from /api/dash/*, which has its own gate.
 */
import { getSession } from "../_lib/dash.js";

const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://api.fontshare.com https://fonts.googleapis.com",
  "font-src 'self' https://cdn.fontshare.com https://fonts.gstatic.com",
  "img-src 'self' data:",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'none'",
  "form-action 'self'",
].join("; ");

export async function onRequest(context) {
  const path = new URL(context.request.url).pathname;
  const open = path.startsWith("/dashboard/login") || path.startsWith("/dashboard/assets/");
  if (!open && !(await getSession(context.env, context.request))) {
    return new Response(null, { status: 302, headers: { Location: "/dashboard/login/", "Cache-Control": "no-store" } });
  }
  const res = await context.next();
  const out = new Response(res.body, res);
  const type = res.headers.get("Content-Type") || "";
  out.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  out.headers.set("Referrer-Policy", "same-origin");
  if (type.startsWith("text/html")) {
    out.headers.set("Cache-Control", "no-store");
    out.headers.set("Content-Security-Policy", CSP);
    out.headers.set("X-Frame-Options", "DENY");
  } else {
    out.headers.set("Cache-Control", "private, max-age=300");    // assets are versioned with ?v=
  }
  return out;
}
