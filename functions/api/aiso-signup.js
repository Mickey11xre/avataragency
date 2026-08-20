/**
 * POST /api/aiso-signup  — step 1 of the AISO funnel (double opt-in).
 * Body: { name, email, website }
 * Creates a confirmation token in KV, emails a confirmation link via Resend.
 *
 * REQUIRED SETUP (Cloudflare Pages project settings):
 *   - KV namespace binding:  AISO_KV
 *   - Env var (secret):      RESEND_API_KEY   (resend.com — free tier: 100 emails/day)
 *   - Sender domain:         verify avataragency.ai in Resend (SPF + DKIM records)
 * Pattern mirrors functions/api/ava-token.js (env secret, server-side only).
 */
const FROM = "AvatarAgency <audit@avataragency.ai>";
const SITE = "https://avataragency.ai";

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status, headers: { "Content-Type": "application/json" }
  });
}

export async function onRequestPost(context) {
  try {
    const { name, email, website } = await context.request.json();
    if (!name || !email || !website || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ error: "invalid input" }, 400);
    }
    if (!context.env.RESEND_API_KEY) return json({ error: "email not configured" }, 503);
    if (!context.env.AISO_KV) return json({ error: "storage not configured" }, 503);

    // Unguessable token; store the lead against it for 7 days.
    const token = crypto.randomUUID().replace(/-/g, "") +
                  Math.random().toString(36).slice(2, 8);
    await context.env.AISO_KV.put(
      "confirm:" + token,
      JSON.stringify({ name, email, website, createdAt: new Date().toISOString(), confirmed: false }),
      { expirationTtl: 60 * 60 * 24 * 7 }
    );

    const confirmUrl = `${SITE}/api/aiso-confirm?t=${token}`;
    const firstName = String(name).trim().split(/\s+/)[0];

    const html = `
<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f4f1ea;font-family:Arial,Helvetica,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ea;padding:32px 0">
<tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden">
  <tr><td style="background:#14110f;padding:22px 32px">
    <span style="color:#f7f2e8;font-size:16px;font-weight:bold;letter-spacing:1px">AVATAR<span style="color:#c9a227">AGENCY</span>.AI</span>
  </td></tr>
  <tr><td style="padding:34px 32px 10px">
    <h1 style="margin:0 0 14px;font-size:22px;color:#14110f">One click and your free audit begins</h1>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#3d3733">Hi ${firstName},</p>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#3d3733">You asked for a free <b>AI Referral Audit</b> of <b>${website}</b> — a test of how often ChatGPT, Gemini, Grok, Perplexity, and Claude recommend your business when real customers ask.</p>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#3d3733">Confirm your email to continue — it takes you to a 2-minute form, and then we get to work:</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 26px"><tr><td style="background:#c9a227;border-radius:8px">
      <a href="${confirmUrl}" style="display:inline-block;padding:14px 34px;color:#141210;font-size:16px;font-weight:bold;text-decoration:none">Confirm &amp; Start My Free Audit</a>
    </td></tr></table>
    <p style="margin:0 0 8px;font-size:12px;line-height:1.6;color:#8a8375">If the button doesn't work, paste this link into your browser:<br><a href="${confirmUrl}" style="color:#a8841c;word-break:break-all">${confirmUrl}</a></p>
    <p style="margin:0;font-size:12px;line-height:1.6;color:#8a8375">Didn't request this? You can safely ignore this email — nothing happens without your click.</p>
  </td></tr>
  <tr><td style="border-top:1px solid #eee7d9;padding:18px 32px;font-size:11px;color:#8a8375">
    AvatarAgency.ai · AI Referral Optimization · Los Angeles, CA · michael@avataragency.ai
  </td></tr>
</table>
</td></tr></table>
</body></html>`;

    const send = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${context.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: FROM,
        to: [email],
        subject: "Confirm your free AI Referral Audit",
        html
      })
    });
    if (!send.ok) {
      const detail = await send.text();
      console.log("resend error:", detail);
      return json({ error: "email send failed" }, 502);
    }
    return json({ ok: true });
  } catch (e) {
    return json({ error: "bad request" }, 400);
  }
}
