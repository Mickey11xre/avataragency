/**
 * GET /api/ava-availability?days=7 — Michael's REAL open times for Ava's booking panel.
 *
 * Returns { ok, event: { name, duration }, slots: [{ start_time, token }] }
 *   start_time  UTC ISO straight from Calendly. The PAGE formats it in the visitor's own time zone.
 *   token       short-lived HMAC proving this server offered that exact slot. /api/ava-booking
 *               requires it, so nothing can put an arbitrary time on Michael's calendar without
 *               first being shown it here (30-minute window).
 *
 * Calendly Scheduling API (Michael's plan is paid — confirmed 2026-09-30):
 *   GET /users/me -> GET /event_types?user=… (found by slug, cached 6 h) -> GET /event_type_available_times
 * Calendly caps one availability request at 7 days and requires a start time in the future.
 *
 * Bindings: AISO_KV (cache + rate limits). Secret: CALENDLY_TOKEN (personal access token —
 * dashboard-pasted, never in chat or the repo). Optional env: CALENDLY_EVENT_SLUG
 * (default "free-consultation-meeting" — the strategy call).
 */
const API = "https://api.calendly.com";
const DEFAULT_SLUG = "free-consultation-meeting";
// A page may ask for one of these Calendly event types (the profile asks for the intro meeting, 9 Oct). Anything else falls back to the default.
const EVENT_SLUGS = ["free-consultation-meeting", "michaelrivera-intro-meeting"];
const pickSlug = (env, requested) => EVENT_SLUGS.includes(requested) ? requested : (env.CALENDLY_EVENT_SLUG || DEFAULT_SLUG);
const ALLOWED_ORIGINS = ["https://avataragency.ai", "https://www.avataragency.ai"];
const SLOT_TTL_MIN = 30;
const PER_IP_PER_HOUR = 60;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

async function cal(env, path) {
  const r = await fetch(API + path, { headers: { Authorization: `Bearer ${env.CALENDLY_TOKEN}` } });
  const text = await r.text();
  let data; try { data = JSON.parse(text); } catch { data = { raw: text.slice(0, 300) }; }
  return { ok: r.ok, status: r.status, data };
}

async function eventType(env, slug = env.CALENDLY_EVENT_SLUG || DEFAULT_SLUG) {
  const ck = "cal:evtype:" + slug;
  const cached = await env.AISO_KV.get(ck, "json");
  if (cached) return cached;
  const me = await cal(env, "/users/me");
  if (!me.ok) throw new Error("calendly /users/me " + me.status);
  const list = await cal(env, "/event_types?active=true&count=100&user=" + encodeURIComponent(me.data.resource.uri));
  if (!list.ok) throw new Error("calendly /event_types " + list.status);
  const et = (list.data.collection || []).find(e =>
    e.slug === slug || String(e.scheduling_url || "").endsWith("/" + slug));
  if (!et) throw new Error("event type not found: " + slug);
  const out = {
    uri: et.uri, name: et.name, duration: et.duration,
    locations: (et.locations || []).map(l => ({ kind: l.kind, location: l.location || null })),
    questions: (et.custom_questions || []).filter(q => q.enabled !== false)
      .map(q => ({ name: q.name, type: q.type, required: !!q.required, position: q.position })),
  };
  await env.AISO_KV.put(ck, JSON.stringify(out), { expirationTtl: 6 * 3600 });
  return out;
}

const b64url = buf => btoa(String.fromCharCode(...new Uint8Array(buf)))
  .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

// Signing key derived from the Calendly token, so no extra secret is needed.
// MUST match the derivation in ava-booking.js.
async function slotKey(env) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("ava-slot-v1:" + env.CALENDLY_TOKEN));
  return crypto.subtle.importKey("raw", digest, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
}
async function signSlot(key, start, exp) {
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(start + "|" + exp));
  return b64url(sig) + "." + exp;
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const origin = request.headers.get("Origin") || "";
  if (origin && !ALLOWED_ORIGINS.includes(origin)) return json({ ok: false, error: "forbidden" }, 403);
  if (!env.CALENDLY_TOKEN || !env.AISO_KV) return json({ ok: false, error: "not configured" }, 503);

  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const rlKey = "rl:ava-avail:" + ip + ":" + new Date().toISOString().slice(0, 13);
  const count = parseInt(await env.AISO_KV.get(rlKey) || "0", 10);
  if (count >= PER_IP_PER_HOUR) return json({ ok: false, error: "too many requests" }, 429);
  await env.AISO_KV.put(rlKey, String(count + 1), { expirationTtl: 3600 });

  const q = new URL(request.url).searchParams;
  const days = Math.min(7, Math.max(1, parseInt(q.get("days") || "7", 10) || 7));
  const slug = pickSlug(env, q.get("event"));
  let et;
  try { et = await eventType(env, slug); }
  catch (e) { console.log("ava-availability:", String(e)); return json({ ok: false, error: "calendar unavailable", detail: String(e.message || e) }, 502); }

  // Cache the slot list for 2 minutes so a busy page doesn't hammer Calendly.
  const ck = "cal:avail:" + slug + ":" + days + ":" + Math.floor(Date.now() / 120000);
  let slots = await env.AISO_KV.get(ck, "json");
  if (!slots) {
    const start = new Date(Date.now() + 10 * 60 * 1000);                 // must be in the future
    const end = new Date(start.getTime() + days * 86400000 - 60 * 1000); // must be <= 7 days
    const r = await cal(env, "/event_type_available_times?event_type=" + encodeURIComponent(et.uri) +
      "&start_time=" + start.toISOString() + "&end_time=" + end.toISOString());
    if (!r.ok) {
      console.log("ava-availability calendly:", r.status, JSON.stringify(r.data).slice(0, 300));
      return json({ ok: false, error: "calendar unavailable", detail: "calendly " + r.status + " " + ((r.data && (r.data.title || r.data.message)) || "") }, 502);
    }
    slots = (r.data.collection || []).filter(s => s.status === "available").map(s => s.start_time);
    await env.AISO_KV.put(ck, JSON.stringify(slots), { expirationTtl: 180 });
  }

  const exp = Date.now() + SLOT_TTL_MIN * 60 * 1000;
  const key = await slotKey(env);
  const signed = await Promise.all(slots.map(async s => ({ start_time: s, token: await signSlot(key, s, exp) })));
  // Ava may read the event name aloud: write the brand as spoken (fleet standard #6). The
  // Calendly event itself is named "Free AvatarAgency Consultation Meeting" and stays as it is.
  const spokenName = String(et.name || "").replace(/AvatarAgency/g, "Avatar Agency");
  return json({ ok: true, event: { name: spokenName, duration: et.duration }, slots: signed });
}
