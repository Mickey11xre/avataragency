/**
 * POST /api/ava-booking — Ava books the free strategy call DIRECTLY on Michael's Calendly,
 * then fires the standard Speed-to-Lead alert. Called by the page when the twin's confirm_booking
 * tool runs (or the visitor presses Confirm on the panel).
 *
 * Body: { start_time, token, name, email, phone?, notes?, timezone, sessionId? }
 *   start_time + token  must come from /api/ava-availability (signed, 30-minute window).
 *   timezone            the visitor's IANA zone from the browser, e.g. "America/Chicago".
 *
 * Calendly Scheduling API: POST /invitees (paid plan — confirmed 2026-09-30). Calendly itself
 * sends the visitor its normal confirmation email + calendar invite and reminders, so this endpoint
 * sends NO visitor email — only the admin alert. The lead is stored in KV even if Calendly refuses,
 * so a lead is never lost.
 *
 * Bindings: AISO_KV. Secrets: CALENDLY_TOKEN, RESEND_API_KEY. Optional: CALENDLY_EVENT_SLUG.
 * Alerts go to michael@avataragency.ai (Michael, 2026-09-30) from studio@ — same as the portfolio form.
 */
const API = "https://api.calendly.com";
const DEFAULT_SLUG = "free-consultation-meeting";
const FROM = "AvatarAgency <studio@avataragency.ai>";
const NOTIFY = "michael@avataragency.ai";
const ALLOWED_ORIGINS = ["https://avataragency.ai", "https://www.avataragency.ai"];
const PER_IP_PER_HOUR = 4;     // real calendar events: keep this tight
const PER_EMAIL_PER_DAY = 2;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const clip = (s, n) => String(s == null ? "" : s).trim().slice(0, n);

async function cal(env, path, init = {}) {
  const r = await fetch(API + path, {
    ...init,
    headers: { Authorization: `Bearer ${env.CALENDLY_TOKEN}`, "Content-Type": "application/json", ...(init.headers || {}) },
  });
  const text = await r.text();
  let data; try { data = JSON.parse(text); } catch { data = { raw: text.slice(0, 300) }; }
  return { ok: r.ok, status: r.status, data };
}

// Same lookup + cache key as ava-availability.js.
async function eventType(env) {
  const slug = env.CALENDLY_EVENT_SLUG || DEFAULT_SLUG;
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
// MUST match ava-availability.js.
async function slotKey(env) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("ava-slot-v1:" + env.CALENDLY_TOKEN));
  return crypto.subtle.importKey("raw", digest, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
}
async function slotTokenValid(env, start, token) {
  const [sig, expStr] = String(token || "").split(".");
  const exp = parseInt(expStr, 10);
  if (!sig || !exp || exp < Date.now()) return false;
  const key = await slotKey(env);
  const want = b64url(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(start + "|" + exp)));
  if (want.length !== sig.length) return false;
  let diff = 0; for (let i = 0; i < want.length; i++) diff |= want.charCodeAt(i) ^ sig.charCodeAt(i);
  return diff === 0;
}

// US numbers default to +1. Anything that can't be made E.164 is kept for the alert but not sent.
function e164(phone) {
  const raw = String(phone || "").trim();
  const d = raw.replace(/\D/g, "");
  if (raw.startsWith("+") && d.length >= 8 && d.length <= 15) return "+" + d;
  if (d.length === 10) return "+1" + d;
  if (d.length === 11 && d.startsWith("1")) return "+" + d;
  return null;
}
function validZone(tz) {
  try { new Intl.DateTimeFormat("en-US", { timeZone: tz }); return true; } catch { return false; }
}
function label(iso, tz) {
  return new Date(iso).toLocaleString("en-US", {
    timeZone: tz, weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "2-digit", timeZoneName: "short",
  });
}

async function alertMichael(env, lead, status, extra) {
  const row = (k, v) => v ? `<tr><td style="padding:6px 14px 6px 0;color:#6b6358;font-size:13px;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:6px 0;font-size:15px;color:#1c1a17">${v}</td></tr>` : "";
  const booked = status === "booked";
  const html = `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f4f1ea;font-family:Arial,Helvetica,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ea;padding:28px 0"><tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden">
  <tr><td style="background:#0a0a0a;padding:18px 28px;color:#C9A84C;font-size:14px;letter-spacing:1px">🔥 SPEED-TO-LEAD &middot; AVA &middot; AVATARAGENCY.AI</td></tr>
  <tr><td style="padding:26px 28px 8px">
    <h1 style="margin:0 0 6px;font-size:21px;color:#1c1a17">${esc(lead.name)} ${booked ? "booked a strategy call" : "tried to book — needs a follow-up"}</h1>
    <p style="margin:0 0 18px;font-size:15px;color:#3d3733">${esc(lead.whenPT)}${booked ? " &middot; on your Calendly — Calendly has emailed them the confirmation and invite." : ""}</p>
    <table role="presentation" cellpadding="0" cellspacing="0">
      ${row("Email", `<a href="mailto:${esc(lead.email)}" style="color:#8a7330">${esc(lead.email)}</a>`)}
      ${row("Phone", esc(lead.phone))}
      ${row("Notes", esc(lead.notes))}
      ${row("Their time", esc(lead.whenVisitor))}
      ${row("Status", esc(booked ? "Booked on Calendly" : "NOT booked — " + (extra || "Calendly refused the booking")))}
      ${row("Napster session", esc(lead.sessionId))}
      ${row("Record", esc(lead.recordKey))}
    </table>
  </td></tr>
  <tr><td style="border-top:1px solid #eee7d9;padding:14px 28px;font-size:11px;color:#8a8375">Ava on avataragency.ai &middot; ${esc(lead.createdAt)}</td></tr>
</table></td></tr></table></body></html>`;
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM, to: [NOTIFY], reply_to: lead.email,
      subject: booked ? `🔥 Speed-to-Lead — ${lead.name} booked ${lead.whenPT}` : `⚠️ Follow up — ${lead.name} tried to book (${lead.whenPT})`,
      html,
    }),
  });
  if (!r.ok) console.log("ava-booking resend error:", r.status, await r.text().catch(() => ""));
  return r.ok;
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const origin = request.headers.get("Origin") || "";
  if (!ALLOWED_ORIGINS.includes(origin)) return json({ ok: false, error: "forbidden" }, 403);
  if (!env.CALENDLY_TOKEN || !env.RESEND_API_KEY || !env.AISO_KV) return json({ ok: false, error: "not configured" }, 503);

  let b;
  try { b = await request.json(); } catch { return json({ ok: false, error: "bad json" }, 400); }
  const lead = {
    name: clip(b.name, 120),
    email: clip(b.email, 200).toLowerCase(),
    phone: clip(b.phone, 40),
    notes: clip(b.notes, 1000),
    start_time: clip(b.start_time, 40),
    timezone: validZone(clip(b.timezone, 60)) ? clip(b.timezone, 60) : "America/Los_Angeles",
    sessionId: clip(b.sessionId, 80),
    twin: "ava", source: "avataragency.ai booking panel (Calendly)",
    createdAt: new Date().toISOString(),
  };
  if (!lead.name || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email)) {
    return json({ ok: false, error: "a name and a valid email are required" }, 400);
  }
  if (!lead.start_time || isNaN(Date.parse(lead.start_time)) || Date.parse(lead.start_time) < Date.now()) {
    return json({ ok: false, error: "choose an open time first" }, 400);
  }
  if (!(await slotTokenValid(env, lead.start_time, b.token))) {
    return json({ ok: false, retry: true, error: "that time has expired",
      message: "That time is no longer held. Call show_booking_times again and offer fresh options." }, 409);
  }

  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const ipKey = "rl:ava-book:ip:" + ip + ":" + new Date().toISOString().slice(0, 13);
  const emKey = "rl:ava-book:em:" + lead.email + ":" + new Date().toISOString().slice(0, 10);
  const ipN = parseInt(await env.AISO_KV.get(ipKey) || "0", 10);
  const emN = parseInt(await env.AISO_KV.get(emKey) || "0", 10);
  if (ipN >= PER_IP_PER_HOUR || emN >= PER_EMAIL_PER_DAY) return json({ ok: false, error: "too many requests",
    message: "Tell the visitor you have their details and Michael will confirm a time with them directly." }, 429);
  await env.AISO_KV.put(ipKey, String(ipN + 1), { expirationTtl: 3600 });
  await env.AISO_KV.put(emKey, String(emN + 1), { expirationTtl: 86400 });

  lead.whenPT = label(lead.start_time, "America/Los_Angeles");
  lead.whenVisitor = label(lead.start_time, lead.timezone);
  const id = lead.createdAt.replace(/[:.]/g, "-") + "-" + crypto.randomUUID().slice(0, 8);
  lead.recordKey = "booking:ava:" + id;

  let et;
  try { et = await eventType(env); }
  catch (e) {
    console.log("ava-booking eventType:", String(e));
    await env.AISO_KV.put(lead.recordKey, JSON.stringify({ ...lead, status: "failed", error: String(e) }));
    context.waitUntil(alertMichael(env, lead, "failed", "calendar lookup failed"));
    return json({ ok: false, stored: true, message: "The calendar didn't respond. Tell the visitor Michael has their details and will confirm a time with them directly." }, 502);
  }

  const phone = e164(lead.phone);
  const invitee = { name: lead.name, email: lead.email, timezone: lead.timezone };
  if (phone) invitee.text_reminder_number = phone;
  const body = { event_type: et.uri, start_time: new Date(lead.start_time).toISOString(), invitee };

  // Calendly requires a location object when the event type defines one.
  const loc = (et.locations || [])[0];
  if (loc) {
    body.location = { kind: loc.kind };
    if (loc.kind === "outbound_call" && phone) body.location.location = phone;
    else if (loc.location && /physical|custom|inbound_call/.test(loc.kind)) body.location.location = loc.location;
  }
  // Answer the event's custom questions from what Ava collected.
  const qa = (et.questions || []).map(q => {
    const n = q.name.toLowerCase();
    const answer = /phone|mobile|cell/.test(n) ? lead.phone : (lead.notes || (q.required ? "Booked through Ava on avataragency.ai" : ""));
    return answer ? { question: q.name, answer, position: q.position } : null;
  }).filter(Boolean);
  if (qa.length) body.questions_and_answers = qa;

  const r = await cal(env, "/invitees", { method: "POST", body: JSON.stringify(body) });
  if (!r.ok) {
    const why = (r.data && (r.data.message || r.data.title)) || ("HTTP " + r.status);
    console.log("ava-booking calendly:", r.status, JSON.stringify(r.data).slice(0, 500));
    await env.AISO_KV.put(lead.recordKey, JSON.stringify({ ...lead, status: "failed", error: why }));
    context.waitUntil(alertMichael(env, lead, "failed", why));
    const taken = r.status === 400 || r.status === 409 || /avail|taken|conflict/i.test(why);
    return json({ ok: false, stored: true, retry: taken,
      message: taken
        ? "That time was just taken. Apologize briefly, call show_booking_times again, and offer two new options."
        : "The booking didn't go through. Tell the visitor Michael has their details and will confirm a time with them directly." }, 502);
  }

  const inv = r.data.resource || {};
  await env.AISO_KV.put(lead.recordKey, JSON.stringify({
    ...lead, status: "booked", calendly: { invitee: inv.uri, event: inv.event, cancel_url: inv.cancel_url, reschedule_url: inv.reschedule_url },
  }));
  context.waitUntil(alertMichael(env, lead, "booked"));
  return json({ ok: true, booked: true, when: lead.whenVisitor,
    message: `Booked. ${lead.name.split(/\s+/)[0]}'s strategy call with Michael is confirmed for ${lead.whenVisitor}. Calendly has emailed the confirmation and a calendar invite to ${lead.email}.` });
}
