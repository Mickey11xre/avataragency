/**
 * Cloudflare Worker: ethica-register
 * POST /api/register  { name, email }
 *   → sends confirmation email to user
 *   → sends registration notification to admin
 *
 * Required secret (Cloudflare Dashboard → Settings → Variables → Secret):
 *   RESEND_API_KEY  — from resend.com
 */

const ADMIN_EMAIL  = 'michael@avataragency.ai';
const FROM_ADDRESS = 'Ethica @ AvatarAgency <hello@avataragency.ai>';
const ETHICA_URL   = 'https://avataragency.ai/ethica/napster/';
const ALLOWED_ORIGIN = 'https://avataragency.ai';

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const corsHeaders = {
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response('Invalid JSON', { status: 400, headers: corsHeaders });
    }

    const name    = (body.name  || '').trim();
    const email   = (body.email || '').trim().toLowerCase();
    const consult = body.consult === true;

    if (!name || !email || !email.includes('@')) {
      return new Response('Missing or invalid name/email', { status: 400, headers: corsHeaders });
    }

    const timestamp = new Date().toISOString();

    // Fire both emails in parallel
    const [confirmRes, notifyRes] = await Promise.allSettled([
      sendEmail(env.RESEND_API_KEY, {
        from:    FROM_ADDRESS,
        to:      [email],
        subject: "You're registered — Talk to Ethica",
        html:    confirmationHtml(name, ETHICA_URL),
      }),
      sendEmail(env.RESEND_API_KEY, {
        from:    FROM_ADDRESS,
        to:      [ADMIN_EMAIL],
        subject: `New Ethica Registration — ${name}${consult ? ' ★ Consultation Requested' : ''}`,
        html:    notificationHtml(name, email, timestamp, consult),
      }),
    ]);

    const debug = confirmRes.status === 'fulfilled'
      ? { confirm: 'sent' }
      : { confirm: 'failed', reason: String(confirmRes.reason) };

    return new Response(JSON.stringify({ ok: true, debug }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  },
};

async function sendEmail(apiKey, payload) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend error ${res.status}: ${err}`);
  }
  return res.json();
}

// ── Email templates ────────────────────────────────────────────────────────

function confirmationHtml(name, ethicaUrl) {
  const firstName = name.split(' ')[0];
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>You're registered — Talk to Ethica</title>
</head>
<body style="margin:0;padding:0;background:#0b0b0b;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0b0b0b;padding:48px 16px;">
  <tr><td align="center">
  <table width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;">

    <!-- Wordmark -->
    <tr>
      <td align="center" style="padding-bottom:28px;">
        <span style="font-family:Arial,sans-serif;font-size:18px;font-weight:700;letter-spacing:2px;color:#ffffff;">
          AVATAR<span style="color:#c9a84c;">AGENCY</span>
        </span>
      </td>
    </tr>

    <!-- Card -->
    <tr>
      <td style="background:#ffffff;border-radius:20px;padding:52px 44px 44px;text-align:center;">

        <!-- Gold circle check -->
        <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 28px;">
          <tr><td align="center" style="width:68px;height:68px;border-radius:50%;border:1.5px solid rgba(201,168,76,0.4);background:rgba(201,168,76,0.08);">
            <span style="font-size:28px;line-height:68px;color:#c9a84c;">&#10003;</span>
          </td></tr>
        </table>

        <h1 style="font-family:Georgia,serif;font-size:34px;font-weight:400;color:#0b0b0b;margin:0 0 14px;line-height:1.15;">
          You're in, ${firstName}.
        </h1>
        <p style="font-family:Arial,sans-serif;font-size:15px;color:#666666;line-height:1.75;margin:0 0 36px;max-width:400px;margin-left:auto;margin-right:auto;">
          Your first 5&nbsp;minutes with Ethica are completely free &mdash; no credit card needed. Click below to start your live conversation with the fraud fighter.
        </p>

        <!-- CTA button -->
        <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 32px;">
          <tr>
            <td align="center" bgcolor="#c9a84c" style="border-radius:999px;">
              <a href="${ethicaUrl}" style="display:inline-block;font-family:Arial,sans-serif;font-size:15px;font-weight:700;color:#0b0b0b;text-decoration:none;padding:15px 40px;border-radius:999px;">
                Talk to Ethica Now &rarr;
              </a>
            </td>
          </tr>
        </table>

        <p style="font-family:Arial,sans-serif;font-size:12px;color:#bbbbbb;margin:0;line-height:1.7;">
          Or copy this link into your browser:<br>
          <a href="${ethicaUrl}" style="color:#c9a84c;text-decoration:none;">${ethicaUrl}</a>
        </p>

      </td>
    </tr>

    <!-- Divider -->
    <tr>
      <td style="padding:28px 0 0;text-align:center;">
        <p style="font-family:Arial,sans-serif;font-size:11px;color:rgba(255,255,255,0.2);line-height:1.8;margin:0;">
          &copy; 2026 AvatarAgency.ai &mdash; Los Angeles, California<br>
          <a href="https://avataragency.ai/terms.html" style="color:rgba(255,255,255,0.2);text-decoration:none;">Terms of Service</a>
          &nbsp;&middot;&nbsp;
          <a href="https://avataragency.ai/privacy.html" style="color:rgba(255,255,255,0.2);text-decoration:none;">Privacy Policy</a>
        </p>
      </td>
    </tr>

  </table>
  </td></tr>
</table>
</body>
</html>`;
}

function notificationHtml(name, email, timestamp, consult) {
  const dt = new Date(timestamp).toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
    dateStyle: 'long',
    timeStyle: 'short',
  });
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>New Ethica Registration</title></head>
<body style="margin:0;padding:0;background:#f5f2ec;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f5f2ec;padding:48px 16px;">
  <tr><td align="center">
  <table width="540" cellpadding="0" cellspacing="0" border="0" style="max-width:540px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;">

    <!-- Header bar -->
    <tr>
      <td style="background:#0b0b0b;padding:22px 36px;">
        <span style="font-family:Arial,sans-serif;font-size:15px;font-weight:700;letter-spacing:2px;color:#ffffff;">
          AVATAR<span style="color:#c9a84c;">AGENCY</span>
        </span>
      </td>
    </tr>

    <!-- Consultation alert banner -->
    ${consult ? `
    <tr>
      <td style="background:#c9a84c;padding:14px 36px;">
        <p style="font-family:Arial,sans-serif;font-size:13px;font-weight:700;color:#0b0b0b;margin:0;">
          ★ Consultation Requested — follow up with this person
        </p>
      </td>
    </tr>` : ''}

    <!-- Body -->
    <tr>
      <td style="padding:36px 36px 16px;">
        <h2 style="font-family:Arial,sans-serif;font-size:20px;font-weight:700;color:#0b0b0b;margin:0 0 8px;">
          New Ethica Registration
        </h2>
        <p style="font-family:Arial,sans-serif;font-size:13px;color:#999999;margin:0 0 28px;">
          Someone just registered to talk to Ethica.
        </p>
      </td>
    </tr>

    <!-- Data rows -->
    <tr>
      <td style="padding:0 36px 36px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #f0ece4;">
          <tr>
            <td style="padding:14px 0;border-bottom:1px solid #f0ece4;font-family:Arial,sans-serif;font-size:13px;color:#999999;width:100px;">Name</td>
            <td style="padding:14px 0;border-bottom:1px solid #f0ece4;font-family:Arial,sans-serif;font-size:14px;font-weight:600;color:#0b0b0b;">${name}</td>
          </tr>
          <tr>
            <td style="padding:14px 0;border-bottom:1px solid #f0ece4;font-family:Arial,sans-serif;font-size:13px;color:#999999;">Email</td>
            <td style="padding:14px 0;border-bottom:1px solid #f0ece4;font-family:Arial,sans-serif;font-size:14px;color:#0b0b0b;">
              <a href="mailto:${email}" style="color:#c9a84c;text-decoration:none;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:14px 0;border-bottom:1px solid #f0ece4;font-family:Arial,sans-serif;font-size:13px;color:#999999;">Registered</td>
            <td style="padding:14px 0;border-bottom:1px solid #f0ece4;font-family:Arial,sans-serif;font-size:14px;color:#0b0b0b;">${dt} PT</td>
          </tr>
          <tr>
            <td style="padding:14px 0;font-family:Arial,sans-serif;font-size:13px;color:#999999;">Consultation</td>
            <td style="padding:14px 0;font-family:Arial,sans-serif;font-size:14px;font-weight:600;color:${consult ? '#a07428' : '#bbbbbb'};">${consult ? 'Yes — requested' : 'No'}</td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background:#faf9f6;padding:20px 36px;border-top:1px solid #f0ece4;">
        <p style="font-family:Arial,sans-serif;font-size:11px;color:#cccccc;margin:0;">
          Sent automatically by AvatarAgency &mdash; Ethica registration system
        </p>
      </td>
    </tr>

  </table>
  </td></tr>
</table>
</body>
</html>`;
}
