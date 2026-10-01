/**
 * POST /api/agent-lead — "Leave your details" from Ava's panel on the homepage (and, later, the
 * live Ava's fill_lead_details / submit_lead tools). Stores the lead and fires the standard
 * Speed-to-Lead alert to michael@avataragency.ai — same inbox and sender as the portfolio form
 * and /api/ava-booking. No visitor email: the panel confirms on screen.
 *
 * Body: { name, email, phone?, need?, source?, hp? }   (hp = honeypot; humans never see it)
 * Bindings: AISO_KV. Secret: RESEND_API_KEY.
 */
const FROM = "AvatarAgency <studio@avataragency.ai>";
const NOTIFY = "michael@avataragency.ai";
const ALLOWED_ORIGINS = ["https://avataragency.ai", "https://www.avataragency.ai"];
const PER_IP_PER_HOUR = 6;
const PER_EMAIL_PER_DAY = 3;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
}
const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const clip = (s, n) => String(s == null ? "" : s).trim().slice(0, n);

export async function onRequestPost(context) {
  const { request, env } = context;
  const origin = request.headers.get("Origin") || "";
  if (!ALLOWED_ORIGINS.includes(origin)) return json({ ok: false, error: "forbidden" }, 403);
  if (!env.RESEND_API_KEY || !env.AISO_KV) return json({ ok: false, error: "not configured" }, 503);

  let b; try { b = await request.json(); } catch { return json({ ok: false, error: "bad json" }, 400); }
  if (b.hp) return json({ ok: true });                       // honeypot: pretend success
  const lead = {
    name: clip(b.name, 80), email: clip(b.email, 160).toLowerCase(), phone: clip(b.phone, 40),
    need: clip(b.need, 1200), source: clip(b.source || "ava-panel", 40), createdAt: new Date().toISOString(),
  };
  if (!lead.name || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email)) return json({ ok: false, error: "a name and a valid email are required" }, 400);

  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const ipKey = "rl:agent-lead:ip:" + ip + ":" + lead.createdAt.slice(0, 13);
  const emKey = "rl:agent-lead:em:" + lead.email + ":" + lead.createdAt.slice(0, 10);
  const ipN = parseInt(await env.AISO_KV.get(ipKey) || "0", 10), emN = parseInt(await env.AISO_KV.get(emKey) || "0", 10);
  if (ipN >= PER_IP_PER_HOUR || emN >= PER_EMAIL_PER_DAY) return json({ ok: false, error: "too many requests" }, 429);
  await env.AISO_KV.put(ipKey, String(ipN + 1), { expirationTtl: 3700 });
  await env.AISO_KV.put(emKey, String(emN + 1), { expirationTtl: 90000 });

  const id = crypto.randomUUID();
  await env.AISO_KV.put("lead:agent:" + id, JSON.stringify(lead));

  const rows = [["Name", lead.name], ["Email", lead.email], ["Phone", lead.phone || "—"], ["What they need", lead.need || "—"], ["Source", lead.source]]
    .map(([k, v]) => `<tr><td style="padding:6px 14px 6px 0;color:#8a8278;vertical-align:top">${k}</td><td style="padding:6px 0;color:#1c1a16">${esc(v).replace(/\n/g, "<br>")}</td></tr>`).join("");
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM, to: [NOTIFY], reply_to: lead.email,
      subject: `🔥 New lead from Ava's panel: ${lead.name}`,
      html: `<p style="font-family:Arial,sans-serif;font-size:15px">A visitor left their details on the homepage.</p><table style="font-family:Arial,sans-serif;font-size:14px">${rows}</table><p style="font-family:Arial,sans-serif;font-size:13px;color:#8a8278">Reply to this email to reach them directly.</p>`,
    }),
  });
  if (!r.ok) console.log("agent-lead resend:", r.status, await r.text().catch(() => ""));
  return json({ ok: true, message: `Thanks, ${lead.name.split(/\s+/)[0]} — Michael has your details and will be in touch soon.` });
}
