/**
 * GET /api/portfolio-confirm?t=<token>  — step 2: the link inside the portfolio email.
 * Validates the token, issues an access key (cookie, 180 days), logs the confirmed lead,
 * notifies Michael the first time, and redirects to the gated /work/ page.
 * Re-clicking the same email link within 7 days reuses the same access key.
 * Bindings: AISO_KV, RESEND_API_KEY (same as /api/portfolio-signup).
 */
const FROM = "AvatarAgency <studio@avataragency.ai>";
const NOTIFY = "michael@avataragency.ai";
const SITE = "https://avataragency.ai";
const GATE = "/#work";            // where the request form lives (the homepage section)
const ACCESS_TTL = 60 * 60 * 24 * 180;

const esc = (s) => String(s || "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function expired() {
  return new Response(`<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Link expired — AvatarAgency</title></head>
<body style="font-family:Arial,sans-serif;background:#0a0a0a;color:#f5f0e8;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;text-align:center">
<div style="max-width:420px;padding:32px"><h1 style="font-size:22px">This link has expired</h1>
<p style="color:#b9b3a6;font-size:15px;line-height:1.6">Portfolio links are valid for 7 days. Request a fresh one and it will arrive in a minute.</p>
<a href="${SITE}${GATE}" style="display:inline-block;margin-top:14px;background:#C9A84C;color:#120f08;font-weight:bold;padding:12px 26px;border-radius:999px;text-decoration:none">Request a new link</a></div></body></html>`,
    { status: 410, headers: { "Content-Type": "text/html; charset=utf-8" } });
}

export async function onRequestGet(context) {
  const { env } = context;
  const token = new URL(context.request.url).searchParams.get("t") || "";
  const kv = env.AISO_KV;
  if (!token || !/^[a-z0-9-]{20,80}$/i.test(token) || !kv) return expired();
  const raw = await kv.get("pf:confirm:" + token);
  if (!raw) return expired();
  const lead = JSON.parse(raw);
  const first = !lead.accessKey;
  if (first) {
    lead.accessKey = crypto.randomUUID().replace(/-/g, "") + crypto.randomUUID().replace(/-/g, "");
    lead.confirmedAt = new Date().toISOString();
    await kv.put("pf:confirm:" + token, JSON.stringify(lead), { expirationTtl: 60 * 60 * 24 * 7 });
    await kv.put("pf:lead:" + lead.email, JSON.stringify({ name: lead.name, email: lead.email, company: lead.company, confirmedAt: lead.confirmedAt }));
    if (env.RESEND_API_KEY) context.waitUntil(fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: FROM, to: [NOTIFY], reply_to: lead.email,
        subject: `Portfolio opened: ${lead.name}${lead.company ? " — " + lead.company : ""}`,
        html: `<p><b>${esc(lead.name)}</b> &lt;${esc(lead.email)}&gt; confirmed their email and opened the private portfolio${lead.company ? ` (${esc(lead.company)})` : ""}.</p><p>Warm lead — consider a personal follow-up.</p>` }),
    }).catch(() => {}));
  }
  await kv.put("pf:access:" + lead.accessKey, JSON.stringify({ email: lead.email, name: lead.name }), { expirationTtl: ACCESS_TTL });
  return new Response(null, { status: 302, headers: {
    Location: "/work/",
    "Set-Cookie": `aa_pf=${lead.accessKey}; Path=/; Max-Age=${ACCESS_TTL}; HttpOnly; Secure; SameSite=Lax`,
    "Cache-Control": "no-store",
  } });
}
