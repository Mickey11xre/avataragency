/**
 * POST /api/laurie-booking — Speed-to-Lead for the booking panel on /thriving-twin/.
 * Body: { date, time, when, name, email, phone?, notes?, sessionId? }
 *
 * Called by the page when a booking is confirmed (by the twin's confirm_booking tool or the
 * visitor's own Confirm button). Stores the booking in KV and emails the 🔥 alert while the
 * visitor is still in the conversation. Returns a line the twin can relay.
 *
 * The calendar on the page is DEMO data: nothing is placed on anyone's calendar and no
 * confirmation goes to the visitor — only the admin alert.
 *
 * Uses the same Pages bindings as aiso-signup.js:
 *   - KV namespace binding:  AISO_KV
 *   - Env var (secret):      RESEND_API_KEY
 */
const FROM  = "AvatarAgency <hello@avataragency.ai>";
const ADMIN = "michaelrivera@gmail.com"; // same inbox as the LiveBrand Speed-to-Lead alerts
const ALLOWED_ORIGINS = ["https://avataragency.ai", "https://www.avataragency.ai"];
const PER_IP_PER_HOUR = 6;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
  });
}
function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, c =>
    ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" })[c]);
}
function clip(s, n) { return String(s == null ? "" : s).trim().slice(0, n); }

export async function onRequestPost(context) {
  const { request, env } = context;
  const origin = request.headers.get("Origin") || "";
  if (origin && !ALLOWED_ORIGINS.includes(origin)) return json({ ok:false, error:"forbidden" }, 403);
  if (!env.RESEND_API_KEY || !env.AISO_KV) return json({ ok:false, error:"not configured" }, 503);

  let b;
  try { b = await request.json(); } catch { return json({ ok:false, error:"bad json" }, 400); }

  const lead = {
    name:  clip(b.name, 120),
    email: clip(b.email, 200).toLowerCase(),
    phone: clip(b.phone, 40),
    notes: clip(b.notes, 1000),
    date:  clip(b.date, 10),
    time:  clip(b.time, 12),
    when:  clip(b.when, 80),
    sessionId: clip(b.sessionId, 80),
    twin: "laurie-schreiner",
    source: "/thriving-twin/ booking panel (demo calendar)",
    createdAt: new Date().toISOString(),
  };
  if (!lead.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email) || !lead.when) {
    return json({ ok:false, error:"name, a valid email and a time are required" }, 400);
  }

  // Light abuse guard: this endpoint only ever emails the admin, but cap it per IP anyway.
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const rlKey = "rl:laurie-booking:" + ip + ":" + new Date().toISOString().slice(0, 13);
  const count = parseInt(await env.AISO_KV.get(rlKey) || "0", 10);
  if (count >= PER_IP_PER_HOUR) return json({ ok:false, error:"too many requests" }, 429);
  await env.AISO_KV.put(rlKey, String(count + 1), { expirationTtl: 3600 });

  const id = lead.createdAt.replace(/[:.]/g, "-") + "-" + crypto.randomUUID().slice(0, 8);
  await env.AISO_KV.put("booking:laurie:" + id, JSON.stringify(lead));

  const row = (k, v) => v ? `<tr><td style="padding:6px 14px 6px 0;color:#6b6358;font-size:13px;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:6px 0;font-size:15px;color:#1c1a17">${v}</td></tr>` : "";
  const html = `
<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f4f1ea;font-family:Arial,Helvetica,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ea;padding:28px 0"><tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden">
  <tr><td style="background:#1C3327;padding:18px 28px;color:#F5F0E4;font-size:14px;letter-spacing:1px">🔥 SPEED-TO-LEAD &middot; LAURIE SCHREINER TWIN</td></tr>
  <tr><td style="padding:26px 28px 8px">
    <h1 style="margin:0 0 6px;font-size:21px;color:#1c1a17">${esc(lead.name)} booked a call</h1>
    <p style="margin:0 0 18px;font-size:15px;color:#3d3733">${esc(lead.when)} &middot; booked by voice with the twin, while the visitor was still on the page.</p>
    <table role="presentation" cellpadding="0" cellspacing="0">
      ${row("Email", `<a href="mailto:${esc(lead.email)}" style="color:#2E5540">${esc(lead.email)}</a>`)}
      ${row("Phone", esc(lead.phone))}
      ${row("Notes", esc(lead.notes))}
      ${row("Napster session", esc(lead.sessionId))}
      ${row("Record", "booking:laurie:" + esc(id))}
    </table>
    <p style="margin:20px 0 0;padding:10px 12px;background:#F3EAD5;border-radius:6px;font-size:12.5px;color:#806630">Demo calendar &mdash; nothing was placed on a real calendar and the visitor was not emailed.</p>
  </td></tr>
  <tr><td style="border-top:1px solid #eee7d9;padding:14px 28px;font-size:11px;color:#8a8375">avataragency.ai/thriving-twin/ &middot; ${esc(lead.createdAt)}</td></tr>
</table></td></tr></table></body></html>`;

  const send = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Authorization": `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM, to: [ADMIN], reply_to: lead.email,
      subject: `🔥 Speed-to-Lead — ${lead.name} booked ${lead.when}`,
      html,
    }),
  });
  if (!send.ok) {
    console.log("laurie-booking resend error:", await send.text());
    return json({ ok:true, stored:true, alerted:false, id,
      message:"Saved, but the team alert did not send. Tell the visitor the booking is noted and the team will follow up." });
  }
  return json({ ok:true, stored:true, alerted:true, id,
    message:"The team has been alerted and has the visitor's details. Tell them the team will be in touch to confirm." });
}
