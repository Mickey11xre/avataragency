/**
 * Client portal sign-in (2026-11-24): shared code for /api/client-auth, the /clients/<slug>/ gate
 * (functions/clients/_middleware.js) and the /api/review check. No onRequest export, so Pages gives it no route.
 *
 * Only the portal slugs in GATED need a sign-in. Every other /clients/ folder is served exactly as before.
 * Add a slug here ONLY after that client has an account (scripts/client-admin.mjs), or they are locked out.
 *
 * Storage: KV binding CLIENT_AUTH (keys below). Secret: CLIENT_SESSION_SECRET (HMAC key for the aa_cl cookie).
 *   cl:user:<email>   { email, name, role:"client"|"admin", slugs:[...], hash:{alg,iter,salt,dk}, must_change, disabled, pwv, ... }
 *   cl:sess:<sid>     { email, pwv, created }                 TTL = SESSION_DAYS
 *   cl:fail:<email>   failed-attempt count                    TTL = LOCK_MINUTES
 *   cl:ip:<ip>:<hour> login attempts from one IP this hour    TTL ~1 h
 * Passwords: PBKDF2-SHA256, 100,000 iterations (the Workers maximum), 16-byte random salt, 32-byte key. Never plaintext.
 */
export const GATED = new Set(["aneidich"]);
// What the sign-in page lists for each portal (the chooser shown to admins and to clients with more than one).
export const PORTAL_NAMES = { aneidich: "Andre Neidich · Pothole Heroes" };

export const COOKIE = "aa_cl";
export const SESSION_DAYS = 14;
export const PBKDF2_ITER = 100000;
export const MIN_PASSWORD = 10;
export const MAX_FAILS = 5;            // per email, then locked
export const LOCK_MINUTES = 15;
export const IP_PER_HOUR = 20;         // login attempts per IP per hour

const enc = new TextEncoder();

export function configured(env) {
  return !!(env && env.CLIENT_AUTH && env.CLIENT_SESSION_SECRET && String(env.CLIENT_SESSION_SECRET).length >= 32);
}

export function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow", ...headers },
  });
}
export const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
export const normEmail = (e) => String(e || "").trim().toLowerCase().slice(0, 254);

export function b64u(bytes) {
  let s = ""; const a = new Uint8Array(bytes);
  for (let i = 0; i < a.length; i++) s += String.fromCharCode(a[i]);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
export function unb64u(str) {
  const s = String(str).replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(s + "===".slice((s.length + 3) % 4));
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
export function randomBytes(n) { const a = new Uint8Array(n); crypto.getRandomValues(a); return a; }
export function randomHex(n) { return Array.from(randomBytes(n), (b) => b.toString(16).padStart(2, "0")).join(""); }

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let d = 0; for (let i = 0; i < a.length; i++) d |= a[i] ^ b[i];
  return d === 0;
}

// --- passwords ---------------------------------------------------------------------------------------------------
async function pbkdf2(password, salt, iter) {
  const key = await crypto.subtle.importKey("raw", enc.encode(String(password).normalize("NFC")), "PBKDF2", false, ["deriveBits"]);
  return new Uint8Array(await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt, iterations: iter }, key, 256));
}
export async function hashPassword(password) {
  const salt = randomBytes(16);
  return { alg: "PBKDF2-SHA256", iter: PBKDF2_ITER, salt: b64u(salt), dk: b64u(await pbkdf2(password, salt, PBKDF2_ITER)) };
}
export async function verifyPassword(password, h) {
  if (!h || h.alg !== "PBKDF2-SHA256" || !h.salt || !h.dk) return false;
  const dk = await pbkdf2(password, unb64u(h.salt), Math.min(h.iter || PBKDF2_ITER, PBKDF2_ITER));
  return timingSafeEqual(dk, unb64u(h.dk));
}
// Unknown emails still cost one PBKDF2 run, so response time doesn't reveal who has an account.
const DUMMY = { alg: "PBKDF2-SHA256", iter: PBKDF2_ITER, salt: "AAAAAAAAAAAAAAAAAAAAAA", dk: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" };
export async function burnTime(password) { await verifyPassword(password, DUMMY); }

export function passwordProblem(pw) {
  pw = String(pw || "");
  if (pw.length < MIN_PASSWORD) return `Use at least ${MIN_PASSWORD} characters.`;
  if (pw.length > 200) return "That password is too long.";
  if (/^(.)\1+$/.test(pw)) return "Pick something less repetitive.";
  return "";
}

// --- signed cookie -----------------------------------------------------------------------------------------------
async function hmacKey(env) {
  return crypto.subtle.importKey("raw", enc.encode(String(env.CLIENT_SESSION_SECRET)), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}
export async function signToken(env, payload) {
  const body = b64u(enc.encode(JSON.stringify(payload)));
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", await hmacKey(env), enc.encode(body)));
  return body + "." + b64u(sig);
}
export async function verifyToken(env, token) {
  const m = /^([A-Za-z0-9_-]{10,2000})\.([A-Za-z0-9_-]{43})$/.exec(token || "");
  if (!m) return null;
  let ok = false;
  try { ok = await crypto.subtle.verify("HMAC", await hmacKey(env), unb64u(m[2]), enc.encode(m[1])); } catch { return null; }
  if (!ok) return null;
  try {
    const p = JSON.parse(new TextDecoder().decode(unb64u(m[1])));
    return p && typeof p.exp === "number" && p.exp > Date.now() ? p : null;
  } catch { return null; }
}
export function readCookie(request, name = COOKIE) {
  const m = (request.headers.get("Cookie") || "").match(new RegExp("(?:^|;\\s*)" + name + "=([^;]+)"));
  return m ? m[1] : "";
}
export function sessionCookie(token) {
  return `${COOKIE}=${token}; Path=/; Max-Age=${SESSION_DAYS * 86400}; HttpOnly; Secure; SameSite=Lax`;
}
export const clearCookie = () => `${COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`;

// --- users and sessions ------------------------------------------------------------------------------------------
export async function getUser(env, email) {
  const e = normEmail(email);
  return e ? await env.CLIENT_AUTH.get("cl:user:" + e, "json") : null;
}
export async function putUser(env, user) {
  await env.CLIENT_AUTH.put("cl:user:" + user.email, JSON.stringify(user));
}
export function slugsOf(user) {
  if (!user) return [];
  if (user.role === "admin") return ["*"];
  return Array.isArray(user.slugs) ? user.slugs.map((s) => String(s).toLowerCase()) : [];
}
/** Create the KV session and the signed cookie value for a user. */
export async function startSession(env, user) {
  const sid = randomHex(24);
  await env.CLIENT_AUTH.put("cl:sess:" + sid, JSON.stringify({ email: user.email, pwv: user.pwv || 1, created: new Date().toISOString() }),
    { expirationTtl: SESSION_DAYS * 86400 });
  const token = await signToken(env, {
    sid, e: user.email, n: String(user.name || "").slice(0, 80), r: user.role === "admin" ? "admin" : "client",
    s: slugsOf(user), v: user.pwv || 1, mc: !!user.must_change, exp: Date.now() + SESSION_DAYS * 86400 * 1000,
  });
  return { sid, token };
}
/**
 * The signed-in client for this request, or null.
 *  deep=false: signature + expiry only (cheap; used for images, video and other assets).
 *  deep=true:  also checks the KV session still exists and the account is active with the same password version, so
 *              logout, a password reset or disabling an account takes effect at once (within KV's ~60 s edge cache).
 */
export async function getClientSession(env, request, { deep = false } = {}) {
  if (!configured(env)) return null;
  const p = await verifyToken(env, readCookie(request));
  if (!p) return null;
  if (!deep) return p;
  const s = await env.CLIENT_AUTH.get("cl:sess:" + p.sid, "json");
  if (!s || s.email !== p.e) return null;
  const u = await getUser(env, p.e);
  if (!u || u.disabled || (u.pwv || 1) !== (s.pwv || 1) || (u.pwv || 1) !== p.v) return null;
  return { ...p, n: u.name || p.n, r: u.role === "admin" ? "admin" : "client", s: slugsOf(u), mc: !!u.must_change, user: u };
}
export function canAccess(session, slug) {
  if (!session || session.mc) return false;
  const s = session.s || [];
  return session.r === "admin" || s.includes("*") || s.includes(String(slug).toLowerCase());
}
/** The gated slug a /api/review doc id belongs to ("aneidich-scripts" -> "aneidich"), or null if the doc isn't gated. */
export function gatedSlugForDoc(doc) {
  doc = String(doc || "").toLowerCase();
  for (const slug of GATED) if (doc === slug || doc.startsWith(slug + "-")) return slug;
  return null;
}
/** Where to send someone after sign-in: a safe same-site path they may open, else their portal (or the chooser). */
export function landingFor(session, next) {
  if (typeof next === "string" && /^\/clients\/[a-z0-9-]+(\/[A-Za-z0-9._\-/]*)?(#[\w-]*)?$/.test(next) && !next.includes("..")) {
    const slug = next.split("/")[2];
    if (!GATED.has(slug) || canAccess(session, slug)) return next;
  }
  const mine = (session.s || []).filter((s) => s !== "*");
  if (session.r !== "admin" && mine.length === 1) return `/clients/${mine[0]}/`;
  return "/login/";
}
export function sameOrigin(request) {
  const origin = request.headers.get("Origin");
  if (!origin) return request.method === "GET" || request.method === "HEAD";
  return origin === new URL(request.url).origin || origin === "https://avataragency.ai" || origin === "https://www.avataragency.ai";
}
export function clientIp(request) {
  return request.headers.get("CF-Connecting-IP") || request.headers.get("X-Forwarded-For") || "unknown";
}
