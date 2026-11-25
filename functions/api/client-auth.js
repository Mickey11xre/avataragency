/**
 * /api/client-auth — password sign-in for the client portals (2026-11-24). Shared code: functions/_lib/client-auth.js.
 *
 *   POST {action:"login",  email, password, next?} -> {ok, next}   next = /login/change/ while a temporary password is in use
 *   POST {action:"change", current, password, next?} -> {ok, next}  needs the aa_cl cookie; clears must_change
 *   POST {action:"logout"}                          -> {ok}          ends this browser's session
 *   GET  ?action=me (or POST {action:"me"})         -> {ok, email, name, role, slugs, must_change} | 401
 *
 * Every failed sign-in gets the same answer, so the form can't be used to find out who has an account.
 * Limits: MAX_FAILS per email, then a LOCK_MINUTES lock; IP_PER_HOUR attempts per IP. POSTs must come from our own pages.
 * Accounts are created and reset with scripts/client-admin.mjs (there is no sign-up).
 * Bindings: CLIENT_AUTH (KV). Secret: CLIENT_SESSION_SECRET.
 */
import {
  configured, json, normEmail, getUser, putUser, startSession, getClientSession, verifyPassword, hashPassword, burnTime,
  passwordProblem, landingFor, GATED, PORTAL_NAMES, sameOrigin, clientIp, sessionCookie, clearCookie, slugsOf,
  MAX_FAILS, LOCK_MINUTES, IP_PER_HOUR,
} from "../_lib/client-auth.js";

const GENERIC = "That email and password don't match. Check them and try again.";
const LOCKED = `Too many attempts. For your security, sign-in is paused for ${LOCK_MINUTES} minutes.`;

async function bump(kv, key, ttl) {
  const n = parseInt((await kv.get(key)) || "0", 10) + 1;
  await kv.put(key, String(n), { expirationTtl: Math.max(60, ttl) });
  return n;
}

async function login(context, body) {
  const { env, request } = context;
  const kv = env.CLIENT_AUTH;
  const email = normEmail(body.email), password = String(body.password || "");
  if (!email || !password || password.length > 200) return json({ ok: false, error: GENERIC }, 401);

  const ipKey = "cl:ip:" + clientIp(request) + ":" + new Date().toISOString().slice(0, 13);
  if ((await bump(kv, ipKey, 3700)) > IP_PER_HOUR) return json({ ok: false, error: LOCKED, locked: true }, 429);

  const failKey = "cl:fail:" + email;
  if (parseInt((await kv.get(failKey)) || "0", 10) >= MAX_FAILS) {
    await burnTime(password);
    return json({ ok: false, error: LOCKED, locked: true }, 429);
  }

  const user = await getUser(env, email);
  const good = user && !user.disabled ? await verifyPassword(password, user.hash) : (await burnTime(password), false);
  if (!good) {
    const n = await bump(kv, failKey, LOCK_MINUTES * 60);
    if (n >= MAX_FAILS) return json({ ok: false, error: LOCKED, locked: true }, 429);
    return json({ ok: false, error: GENERIC }, 401);
  }

  await kv.delete(failKey);
  user.last_login = new Date().toISOString();
  await putUser(env, user);
  const { token } = await startSession(env, user);
  const session = { r: user.role, s: slugsOf(user), mc: !!user.must_change };
  const next = user.must_change
    ? "/login/change/" + (body.next ? "?next=" + encodeURIComponent(String(body.next).slice(0, 300)) : "")
    : landingFor(session, body.next);
  return json({ ok: true, next, must_change: !!user.must_change }, 200, { "Set-Cookie": sessionCookie(token) });
}

async function change(context, body) {
  const { env, request } = context;
  const session = await getClientSession(env, request, { deep: true });
  if (!session) return json({ ok: false, error: "Your sign-in has expired. Sign in again with your temporary password." }, 401);
  const user = session.user;
  const current = String(body.current || ""), password = String(body.password || "");

  const failKey = "cl:fail:" + user.email;
  if (parseInt((await env.CLIENT_AUTH.get(failKey)) || "0", 10) >= MAX_FAILS) return json({ ok: false, error: LOCKED, locked: true }, 429);
  if (!(await verifyPassword(current, user.hash))) {
    await bump(env.CLIENT_AUTH, failKey, LOCK_MINUTES * 60);
    return json({ ok: false, error: "Your current password isn't right.", field: "current" }, 400);
  }
  const problem = passwordProblem(password);
  if (problem) return json({ ok: false, error: problem, field: "password" }, 400);
  if (password === current) return json({ ok: false, error: "Choose a new password, different from the temporary one.", field: "password" }, 400);

  user.hash = await hashPassword(password);
  user.must_change = false;
  user.pwv = (user.pwv || 1) + 1;          // every other browser signed in with the old password is signed out
  user.password_changed = new Date().toISOString();
  await putUser(env, user);
  await env.CLIENT_AUTH.delete("cl:sess:" + session.sid);
  const { token } = await startSession(env, user);
  const next = landingFor({ r: user.role, s: slugsOf(user), mc: false }, body.next);
  return json({ ok: true, next }, 200, { "Set-Cookie": sessionCookie(token) });
}

async function logout(context) {
  const session = await getClientSession(context.env, context.request);
  if (session && session.sid) await context.env.CLIENT_AUTH.delete("cl:sess:" + session.sid);
  return json({ ok: true }, 200, { "Set-Cookie": clearCookie() });
}

async function me(context) {
  const s = await getClientSession(context.env, context.request, { deep: true });
  if (!s) return json({ ok: false, error: "signed out" }, 401);
  const slugs = s.r === "admin" || (s.s || []).includes("*") ? [...GATED] : (s.s || []);
  const portals = slugs.map((slug) => ({ slug, name: PORTAL_NAMES[slug] || slug, href: `/clients/${slug}/` }));
  return json({ ok: true, email: s.e, name: s.n || "", role: s.r, slugs: s.s, must_change: !!s.mc, portals });
}

export async function onRequest(context) {
  const { request, env } = context;
  if (!configured(env)) return json({ ok: false, error: "Sign-in isn't available right now. Please contact Michael." }, 503);
  if (request.method === "GET" || request.method === "HEAD") {
    return new URL(request.url).searchParams.get("action") === "me" ? me(context) : json({ ok: false, error: "Method not allowed" }, 405);
  }
  if (request.method !== "POST") return json({ ok: false, error: "Method not allowed" }, 405);
  if (!sameOrigin(request)) return json({ ok: false, error: "forbidden" }, 403);
  let body;
  try {
    const text = await request.text();
    if (text.length > 4096) return json({ ok: false, error: "Too large" }, 413);
    body = JSON.parse(text || "{}");
  } catch { return json({ ok: false, error: "Invalid request" }, 400); }
  if (!body || typeof body !== "object") return json({ ok: false, error: "Invalid request" }, 400);
  try {
    switch (body.action) {
      case "login": return await login(context, body);
      case "change": return await change(context, body);
      case "logout": return await logout(context);
      case "me": return await me(context);
      default: return json({ ok: false, error: "Unknown action" }, 400);
    }
  } catch (e) {
    console.log("client-auth error:", String((e && e.stack) || e));
    return json({ ok: false, error: "Something went wrong. Try again in a moment." }, 500);
  }
}
