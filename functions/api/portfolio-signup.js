/**
 * POST /api/portfolio-signup  — step 1 of the private-portfolio gate (double opt-in).
 * Body: { name, email, company?, hp? }   (hp = honeypot; bots fill it, humans never see it)
 * Stores a confirmation token in KV, emails the private link via Resend, and notifies Michael.
 *
 * Reuses the /aiso/ setup (same Cloudflare Pages bindings, "pf:" key prefix):
 *   - KV namespace binding:  AISO_KV
 *   - Env var (secret):      RESEND_API_KEY   (avataragency.ai is verified in Resend)
 */
const FROM = "AvatarAgency <studio@avataragency.ai>";
const NOTIFY = "michael@avataragency.ai";
const SITE = "https://avataragency.ai";

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}
const esc = (s) => String(s || "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

async function sendEmail(env, payload) {
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!r.ok) console.log("resend error:", r.status, await r.text().catch(() => ""));
  return r.ok;
}

export async function onRequestPost(context) {
  const { env } = context;
  let body;
  try { body = await context.request.json(); } catch { return json({ ok: false, error: "invalid input" }, 400); }
  const name = String(body.name || "").trim().slice(0, 80);
  const email = String(body.email || "").trim().toLowerCase().slice(0, 160);
  const company = String(body.company || "").trim().slice(0, 160);
  if (body.hp) return json({ ok: true });                      // honeypot: pretend success
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return json({ ok: false, error: "invalid input" }, 400);
  if (!env.RESEND_API_KEY) return json({ ok: false, error: "email not configured" }, 503);
  if (!env.AISO_KV) return json({ ok: false, error: "storage not configured" }, 503);

  // One email per address per 10 minutes — repeat submits succeed quietly.
  const rl = "pf:rl:" + email;
  if (await env.AISO_KV.get(rl)) return json({ ok: true });
  await env.AISO_KV.put(rl, "1", { expirationTtl: 600 });

  const token = crypto.randomUUID().replace(/-/g, "") + crypto.randomUUID().slice(0, 8);
  await env.AISO_KV.put("pf:confirm:" + token,
    JSON.stringify({ name, email, company, createdAt: new Date().toISOString(), accessKey: null }),
    { expirationTtl: 60 * 60 * 24 * 7 });

  const link = `${SITE}/api/portfolio-confirm?t=${token}`;
  const first = esc(name.split(/\s+/)[0]);
  const html = `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f4f1ea;font-family:Arial,Helvetica,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ea;padding:32px 0"><tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden">
  <tr><td style="background:#0a0a0a;padding:22px 32px"><span style="color:#ffffff;font-size:18px;font-weight:bold">Avatar<span style="color:#C9A84C">Agency</span></span></td></tr>
  <tr><td style="padding:34px 32px 8px">
    <h1 style="margin:0 0 14px;font-size:22px;color:#0a0a0a">Your private portfolio is ready</h1>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#3d3733">Hi ${first},</p>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#3d3733">Thanks for your interest. Our clients' films stay private by agreement, so this link is just for you. It opens the full AvatarAgency portfolio — real estate, dental, higher education, speaking and publishing.</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 26px"><tr><td style="background:#C9A84C;border-radius:999px">
      <a href="${link}" style="display:inline-block;padding:14px 30px;font-size:15px;font-weight:bold;color:#120f08;text-decoration:none">Open the private portfolio</a>
    </td></tr></table>
    <p style="margin:0 0 8px;font-size:13px;line-height:1.6;color:#8a8278">This link works for 7 days. Please don't forward it — it unlocks the portfolio on the device you open it with.</p>
    <p style="margin:0 0 26px;font-size:13px;line-height:1.6;color:#8a8278">Want to talk it through? <a href="https://calendly.com/michaelrivera007/free-consultation-meeting" style="color:#8a7330">Book a free strategy call</a> or just reply to this email.</p>
  </td></tr>
  <tr><td style="padding:18px 32px;border-top:1px solid #eee;font-size:12px;color:#8a8278">AvatarAgency · Los Angeles, California · avataragency.ai</td></tr>
</table></td></tr></table></body></html>`;

  const sent = await sendEmail(env, { from: FROM, to: [email], reply_to: NOTIFY, subject: "Your private AvatarAgency portfolio link", html });
  if (!sent) return json({ ok: false, error: "email failed" }, 502);

  // Heads-up to Michael (not blocking the visitor if it fails).
  context.waitUntil(sendEmail(env, {
    from: FROM, to: [NOTIFY], reply_to: email,
    subject: `Portfolio request: ${name}${company ? " — " + company : ""}`,
    html: `<p><b>${esc(name)}</b> &lt;${esc(email)}&gt; requested the private portfolio${company ? ` (${esc(company)})` : ""}.</p><p>Status: link sent, not yet opened. You'll get a second note when they open it.</p>`,
  }));
  return json({ ok: true });
}
