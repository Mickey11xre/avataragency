/**
 * Shared code for the avatar dashboard (/dashboard/ + /api/dash/* + /api/dash-auth): the avatar registry, who may
 * sign in, sessions, KV helpers, the Napster conversation reader and the lead <-> conversation matching.
 *
 * No onRequest export here, so Pages gives this file no route; the dashboard functions import it.
 *
 * Design law, kept from the LiveBrand concept: the person reading the dashboard never sees Napster or any other
 * engine concept. They see their avatar, their leads, their conversations.
 *
 * Bindings: AISO_KV. Secrets: NAPSTER_API_KEY (already set for /api/ava-nv2-token), RESEND_API_KEY.
 */
export const NAPSTER = "https://companion-api.napster.com/public";

// Each avatar a dashboard can show. Engine IDs stay server-side; publicAvatar() is what the browser gets.
export const AVATARS = {
  ava: {
    id: "ava",
    name: "Ava",
    business: "AvatarAgency",
    role: "Website assistant",
    status: "live",
    photo: "/home-next/media/ava-poster.jpg",
    stageUrl: "https://avataragency.ai/#ava-stage",
    site: "avataragency.ai",
    timezone: "America/Los_Angeles",
    contact: "michael@avataragency.ai",         // "Request a change" goes here
    // Every face agent 5d72dc62 has used: the Seedance twin (live since 2026-10-02) and the HeyGen twin (10-01 to 10-02).
    companionIds: ["93d5c657-a813-44d5-8c5d-6afe809e9274", "b1df8c54-d4b4-4468-b4a5-0695d087145b"],
    knowledgeBaseId: "2c1980f2-b8e9-40f0-91c9-28032e26dc60",
    leadAlerts: ["michael@avataragency.ai"],
    leads: { bookingPrefix: "booking:ava:", agentLeadSources: ["ava"], portfolio: true },
    // Insights > "What visitors ask about": keyword groups, checked against what visitors say.
    topics: [
      ["Talking avatars & digital twins", "avatar|digital twin|\\btwins?\\b|clone|talking"],
      ["AI video & commercials", "video|film|commercial|\\bads?\\b|movie|promo"],
      ["Websites", "website|web site|landing page|\\bsite\\b"],
      ["Pricing", "price|pricing|cost|how much|budget|afford|\\$\\s?\\d"],
      ["Real estate", "real estate|realtor|listing|propert|broker"],
      ["AI referral optimization", "referral|\\baro\\b|\\bseo\\b|chatgpt|search engine|show up in"],
      ["Coaching & training", "coach|training|teach|course|workshop"],
      ["Social media & marketing", "social media|instagram|tiktok|facebook|linkedin|marketing"],
      ["Speaking & events", "speak|keynote|\\bthrive\\b|conference"],
      ["Booking a call", "\\bbook|schedule|appointment|meeting|consultation"],
    ],
  },
};

export function publicAvatar(a) {
  const kinds = [];
  if (a.leads.bookingPrefix) kinds.push("booking");
  if (a.leads.agentLeadSources) kinds.push("contact", "callback");
  if (a.leads.portfolio) kinds.push("portfolio");
  return { id: a.id, name: a.name, business: a.business, role: a.role, status: a.status, photo: a.photo,
    stageUrl: a.stageUrl, site: a.site, timezone: a.timezone, contact: a.contact, leadAlerts: a.leadAlerts, leadKinds: kinds };
}

// Dashboard owners who see every avatar. More can be added with the DASH_ADMINS env var (comma-separated).
// Client logins (later) live in KV: dash:user:<email> -> { avatars: ["maya"], name?: "..." }.
export const ADMINS = ["michael@avataragency.ai"];

export const SITE_ORIGINS = ["https://avataragency.ai", "https://www.avataragency.ai"];
export const RETENTION_DAYS = 365;          // conversations shown for 12 months (Michael, 2026-10-05)
export const SESSION_DAYS = 30;             // a sign-in lasts 30 days on that browser
export const LEAD_STATUSES = ["new", "contacted", "won", "lost"];

export function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...headers },
  });
}
export const clip = (s, n) => String(s == null ? "" : s).trim().slice(0, n);
export const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
export function randomHex(bytes) {
  const a = new Uint8Array(bytes); crypto.getRandomValues(a);
  return Array.from(a, (b) => b.toString(16).padStart(2, "0")).join("");
}
export async function sha256(s) {
  const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(d), (b) => b.toString(16).padStart(2, "0")).join("");
}
export function cookie(request, name) {
  const m = (request.headers.get("Cookie") || "").match(new RegExp("(?:^|;\\s*)" + name + "=([^;]+)"));
  return m ? m[1] : "";
}
// Same-origin check for anything that changes data (SameSite=Lax already keeps the cookie off cross-site POSTs).
export function sameOrigin(request) {
  const origin = request.headers.get("Origin") || "";
  return SITE_ORIGINS.includes(origin) || origin === new URL(request.url).origin;
}

// --- who may sign in -------------------------------------------------------------------------------------------
export function adminList(env) {
  const extra = String(env.DASH_ADMINS || "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
  return [...new Set([...ADMINS, ...extra])];
}
export async function userFor(env, email) {
  const e = String(email || "").trim().toLowerCase();
  if (!e) return null;
  if (adminList(env).includes(e)) return { email: e, role: "admin", avatars: Object.keys(AVATARS) };
  const u = await env.AISO_KV.get("dash:user:" + e, "json");
  const avatars = u && Array.isArray(u.avatars) ? u.avatars.filter((a) => AVATARS[a]) : [];
  return avatars.length ? { email: e, role: "client", avatars } : null;
}
// The signed-in person for this request, re-checked against the access list every time, so removing someone's
// access takes effect at once instead of when their 30-day cookie runs out.
export async function getSession(env, request) {
  const sid = cookie(request, "aa_dash");
  if (!sid || !/^[a-f0-9]{64}$/.test(sid) || !env.AISO_KV) return null;
  const s = await env.AISO_KV.get("dash:sess:" + sid, "json");
  if (!s || !s.email) return null;
  const user = await userFor(env, s.email);
  return user ? { ...user, sid, since: s.createdAt || null } : null;
}
export function canSee(session, avatarId) {
  return !!(session && AVATARS[avatarId] && (session.avatars || []).includes(avatarId));
}
export function avatarFrom(context) {
  const id = new URL(context.request.url).searchParams.get("avatar") || "";
  return canSee(context.data.session, id) ? AVATARS[id] : null;
}

// --- time ------------------------------------------------------------------------------------------------------
// Napster sends unix SECONDS; our KV records hold ISO strings. Everything inside the dashboard is milliseconds.
export function ms(v) {
  if (v == null || v === "") return null;
  if (typeof v === "number") return v < 1e12 ? v * 1000 : v;
  const n = Number(v);
  if (!isNaN(n) && String(v).trim() !== "") return n < 1e12 ? n * 1000 : n;
  const p = Date.parse(v);
  return isNaN(p) ? null : p;
}
export function rangeFrom(context, fallbackDays = 30) {
  const d = parseInt(new URL(context.request.url).searchParams.get("days") || fallbackDays, 10);
  const days = [7, 30, 90, 365].includes(d) ? d : fallbackDays;
  const end = Date.now();
  return { days, start: end - days * 86400000, end, prevStart: end - 2 * days * 86400000 };
}
const fmtCache = new Map();
function fmt(tz, opts) {
  const k = tz + JSON.stringify(opts);
  if (!fmtCache.has(k)) fmtCache.set(k, new Intl.DateTimeFormat("en-US", { timeZone: tz, ...opts }));
  return fmtCache.get(k);
}
// Calendar day in the avatar's own time zone, as YYYY-MM-DD.
export function dayKey(t, tz) {
  const p = Object.fromEntries(fmt(tz, { year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date(t)).map((x) => [x.type, x.value]));
  return `${p.year}-${p.month}-${p.day}`;
}
// [weekday 0=Sun..6, hour 0..23] in the avatar's own time zone.
export function weekHour(t, tz) {
  const p = Object.fromEntries(fmt(tz, { weekday: "short", hour: "numeric", hourCycle: "h23" }).formatToParts(new Date(t)).map((x) => [x.type, x.value]));
  return [["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(p.weekday), parseInt(p.hour, 10) % 24];
}

// --- KV --------------------------------------------------------------------------------------------------------
export async function listJson(kv, prefix, max = 3000) {
  const keys = [];
  let cursor;
  do {
    const r = await kv.list({ prefix, cursor, limit: 1000 });
    for (const k of r.keys) keys.push(k.name);
    cursor = r.list_complete ? null : r.cursor;
  } while (cursor && keys.length < max);
  const out = [];
  for (let i = 0; i < keys.length; i += 25) {
    const batch = await Promise.all(keys.slice(i, i + 25).map((k) =>
      kv.get(k, "json").then((v) => (v ? { key: k, v } : null)).catch(() => null)));
    for (const b of batch) if (b) out.push(b);
  }
  return out;
}
// Short-lived memo inside one worker instance. It saves KV and Napster calls while someone clicks around; it is
// never the source of truth, so losing it costs nothing.
const memo = new Map();
export async function remember(key, ttlMs, fn) {
  const hit = memo.get(key);
  if (hit && hit.at > Date.now() - ttlMs) return hit.v;
  const v = await fn();
  memo.set(key, { at: Date.now(), v });
  if (memo.size > 400) memo.delete(memo.keys().next().value);
  return v;
}
export function forget(prefix) { for (const k of [...memo.keys()]) if (k.startsWith(prefix)) memo.delete(k); }

// --- Napster conversations -------------------------------------------------------------------------------------
export async function napster(env, path) {
  if (!env.NAPSTER_API_KEY) throw new Error("napster key missing");
  const r = await fetch(NAPSTER + path, { headers: { "X-Api-Key": env.NAPSTER_API_KEY } });
  if (!r.ok) throw new Error("napster " + r.status + " " + path.split("?")[0]);
  return r.json();
}
export function summarize(s) {
  const start = ms(s.startedAt) || ms(s.createdAt);
  const end = ms(s.closedAt);
  const status = String(s.status || "");
  return {
    id: String(s.id),
    startedAt: start,
    endedAt: end,
    durationSec: start && end ? Math.max(0, Math.round((end - start) / 1000)) : null,
    visitor: s.externalClientId ? String(s.externalClientId) : null,
    failed: status === "failed",                         // the visitor's video never connected
    live: !!status && !["closed", "failed", "ended", "expired"].includes(status),
  };
}
// Every conversation the avatar has had in the last 12 months, newest first.
export async function listSessions(env, avatar) {
  return remember("sessions:" + avatar.id, 60000, async () => {
    const seen = new Map();
    for (const cid of avatar.companionIds) {
      for (let p = 0; p < 12; p++) {
        let r;
        try { r = await napster(env, `/sessions?companionId=${cid}&pageIndex=${p}&pageSize=25`); }
        catch (e) { if (p === 0 && cid === avatar.companionIds[0]) throw e; break; }
        const items = Array.isArray(r) ? r : (r.items || []);
        let added = 0;
        for (const s of items) if (s && s.id && !seen.has(s.id)) { seen.set(s.id, summarize(s)); added++; }
        const total = Array.isArray(r) ? null : r.totalCount;
        if (Array.isArray(r) || items.length < 25 || !added || (total != null && (p + 1) * 25 >= total)) break;
      }
    }
    const floor = Date.now() - RETENTION_DAYS * 86400000;
    return [...seen.values()].filter((s) => s.startedAt && s.startedAt >= floor).sort((a, b) => b.startedAt - a.startedAt);
  });
}
// One conversation with its transcript. A closed conversation never changes, so it is kept in KV for 12 months.
export async function sessionDetail(env, id) {
  const ck = "dash:conv:" + id;
  const hit = await env.AISO_KV.get(ck, "json");
  if (hit) return hit;
  const s = await napster(env, "/sessions/" + encodeURIComponent(id));
  const d = {
    ...summarize(s),
    companionId: s.companionId || (s.companion && s.companion.id) || null,
    messages: ((s.conversation && s.conversation.items) || [])
      .map((m) => ({ who: /assistant|agent|companion/i.test(m.role || "") ? "avatar" : "visitor", text: String(m.text || "").trim(), at: ms(m.timestamp) }))
      .filter((m) => m.text),
  };
  if (!d.live) await env.AISO_KV.put(ck, JSON.stringify(d), { expirationTtl: RETENTION_DAYS * 86400 });
  return d;
}
// Transcripts for many conversations, a few at a time. `cap` limits fresh Napster fetches per request (a Worker
// may make only so many outbound calls); everything fetched once is cached, so the next load fills the rest.
export async function detailsFor(env, sessions, cap = 35) {
  const out = new Map();
  let fetched = 0, missing = 0;
  const queue = sessions.filter((s) => !s.failed);
  async function worker() {
    while (queue.length) {
      const s = queue.shift();
      const cached = await env.AISO_KV.get("dash:conv:" + s.id, "json");
      if (cached) { out.set(s.id, cached); continue; }
      if (fetched >= cap) { missing++; continue; }
      fetched++;
      try { out.set(s.id, await sessionDetail(env, s.id)); } catch (e) { missing++; }
    }
  }
  await Promise.all([worker(), worker(), worker(), worker()]);
  return { map: out, missing };
}

// --- leads -----------------------------------------------------------------------------------------------------
// One inbox from four sources: strategy-call bookings, the contact form, callback requests, portfolio requests.
async function leadRecords(env, avatar) {
  return remember("leads:" + avatar.id, 15000, async () => {
    const kv = env.AISO_KV;
    const L = [];
    if (avatar.leads.bookingPrefix) {
      for (const { key, v } of await listJson(kv, avatar.leads.bookingPrefix)) {
        L.push({
          id: key, kind: "booking", name: v.name || "", email: v.email || "", phone: v.phone || "",
          detail: v.notes || "", callAt: v.start_time || null, callLabel: v.whenPT || "",
          createdAt: v.createdAt || null, booked: v.status === "booked",
          problem: v.status === "failed" ? "The calendar did not accept this booking. Contact them to set a time." : "",
          sessionId: v.sessionId || "", reschedule: (v.calendly && v.calendly.reschedule_url) || "",
        });
      }
    }
    if (avatar.leads.agentLeadSources) {
      for (const { key, v } of await listJson(kv, "lead:agent:")) {
        const src = String(v.source || "ava-panel");
        if (!avatar.leads.agentLeadSources.some((p) => src.startsWith(p))) continue;
        L.push({
          id: key, kind: v.callback ? "callback" : "contact", name: v.name || "", email: v.email || "", phone: v.phone || "",
          detail: v.need || "", createdAt: v.createdAt || null, sessionId: "",
        });
      }
    }
    if (avatar.leads.portfolio) {
      const byEmail = new Map();
      const merge = (email, f) => {
        if (!email) return;
        const cur = byEmail.get(email) || { email };
        cur.name = cur.name || f.name || "";
        cur.company = cur.company || f.company || "";
        if (f.requestedAt && (!cur.requestedAt || f.requestedAt < cur.requestedAt)) cur.requestedAt = f.requestedAt;
        if (f.openedAt && (!cur.openedAt || f.openedAt < cur.openedAt)) cur.openedAt = f.openedAt;
        byEmail.set(email, cur);
      };
      // pf:req (permanent, since 2026-10-05) + pf:confirm (7-day link) + pf:lead (written when the link is opened).
      for (const { v } of await listJson(kv, "pf:req:")) merge(v.email, { name: v.name, company: v.company, requestedAt: v.createdAt });
      for (const { v } of await listJson(kv, "pf:confirm:")) merge(v.email, { name: v.name, company: v.company, requestedAt: v.createdAt, openedAt: v.confirmedAt });
      for (const { v } of await listJson(kv, "pf:lead:")) merge(v.email, { name: v.name, company: v.company, openedAt: v.confirmedAt });
      // Requests from before pf:req existed survive only as their consent record (when the box was ticked).
      for (const { key, v } of await listJson(kv, "consent:email:")) {
        if (v.form === "portfolio") merge(key.slice("consent:email:".length), { name: v.name, requestedAt: v.at });
      }
      for (const p of byEmail.values()) {
        L.push({
          id: "pf:" + p.email, kind: "portfolio", name: p.name || "", email: p.email, phone: "",
          detail: p.company ? "Company: " + p.company : "", createdAt: p.requestedAt || p.openedAt || null,
          openedAt: p.openedAt || null, sessionId: "",
        });
      }
    }
    return L.filter((l) => l.createdAt).sort((a, b) => ms(b.createdAt) - ms(a.createdAt));
  });
}
// Lead status (New / Contacted / Won / Lost) and the owner's note, kept for each avatar in one KV record.
export async function leadStates(env, avatar) {
  return (await env.AISO_KV.get("dash:leadstate:" + avatar.id, "json")) || {};
}
export async function collectLeads(env, avatar) {
  const [recs, states] = await Promise.all([leadRecords(env, avatar), leadStates(env, avatar)]);
  return recs.map((r) => {
    const s = states[r.id];
    return { ...r, status: (s && s.status) || "new", note: (s && s.note) || "", statusAt: (s && s.at) || null };
  });
}
export async function leadExists(env, avatar, id) {
  if ((await leadRecords(env, avatar)).some((l) => l.id === id)) return true;
  forget("leads:" + avatar.id);                              // maybe newer than this instance's memo
  return (await leadRecords(env, avatar)).some((l) => l.id === id);
}
export function forgetLeads(avatar) { forget("leads:" + avatar.id); }
// What the browser gets for one lead.
export function leadOut(l) {
  return {
    id: l.id, kind: l.kind, name: l.name, email: l.email, phone: l.phone, detail: l.detail,
    createdAt: ms(l.createdAt), callAt: ms(l.callAt), callLabel: l.callLabel || "", booked: !!l.booked,
    problem: l.problem || "", reschedule: l.reschedule || "", openedAt: ms(l.openedAt),
    status: l.status, note: l.note, statusAt: ms(l.statusAt), sessionId: l.sessionId || "",
  };
}

// Tie each lead to the conversation it came from. Bookings carry their session id. A form filled in during or just
// after a conversation is matched by time (the visitor had the panel open while talking, or right after).
export function matchLeads(sessions, leads) {
  const live = sessions.filter((s) => !s.failed);
  const byId = new Map(live.map((s) => [s.id, s]));
  for (const l of leads) {
    if (l.sessionId && byId.has(l.sessionId)) continue;
    const t = ms(l.createdAt);
    let best = null, bestGap = Infinity;
    for (const s of live) {
      const end = s.endedAt || s.startedAt;
      if (t < s.startedAt - 60000 || t > end + 20 * 60000) continue;
      const gap = t <= end ? 0 : t - end;
      if (gap < bestGap) { best = s; bestGap = gap; }
    }
    l.sessionId = best ? best.id : "";
  }
  const outcomes = new Map();
  for (const l of leads) {
    if (!l.sessionId) continue;
    const o = outcomes.get(l.sessionId) || { kinds: [], leads: [] };
    if (!o.kinds.includes(l.kind)) o.kinds.push(l.kind);
    o.leads.push({ id: l.id, name: l.name, kind: l.kind });
    outcomes.set(l.sessionId, o);
  }
  return outcomes;
}
// A visitor id seen in an earlier conversation = a returning visitor.
export function markReturning(sessions) {
  const seen = new Set();
  for (const s of [...sessions].sort((a, b) => a.startedAt - b.startedAt)) {
    if (!s.visitor || s.failed) continue;
    s.returning = seen.has(s.visitor);
    seen.add(s.visitor);
  }
  return sessions;
}

// --- reading transcripts ---------------------------------------------------------------------------------------
// The avatar saying she could not help: the knowledge gaps worth filling.
const UNSURE = /\b(?:i (?:don['’]t|do not) (?:have|know)|i['’]?m not (?:sure|certain)|i am not (?:sure|certain)|i can['’]?t (?:help with|answer|say for sure|confirm)|i (?:wasn['’]t|was not) able to find|(?:don['’]t|do not) have (?:that|those|any|specific|detailed|exact) (?:info|information|details|numbers)|outside (?:of )?what i (?:know|cover)|beyond what i (?:know|can)|i['’]?d (?:recommend|suggest) (?:reaching out|contacting|asking))/i;
const FILLER = /^(?:hi|hello|hey|yes|yeah|yep|no|nope|ok|okay|sure|thanks|thank you|great|cool|bye|goodbye|hmm+|um+|uh+)[\s.!?,]*$/i;

export function couldNotAnswer(text) { return UNSURE.test(text || ""); }
export function substantive(text) {
  const t = String(text || "").trim();
  return t.split(/\s+/).length >= 3 && !FILLER.test(t);
}
export function firstQuestion(d) {
  const m = (d.messages || []).find((x) => x.who === "visitor" && substantive(x.text));
  return m ? m.text : "";
}
export function previewOf(d) {
  const q = firstQuestion(d);
  if (q) return q;
  const v = (d.messages || []).find((x) => x.who === "visitor");
  return v ? v.text : "";
}
