/**
 * GET /api/aiso-confirm?t=<token>  — step 2: the link inside the confirmation email.
 * Validates the token in KV, marks the lead confirmed, redirects to the intake form
 * with the token attached (/aiso/start/?t=...). Invalid/expired → friendly retry page.
 * Requires KV binding: AISO_KV.
 */
const SITE = "https://avataragency.ai";

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const token = url.searchParams.get("t") || "";
  const kv = context.env.AISO_KV;

  const fail = () => new Response(
    `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Link expired</title></head>
     <body style="font-family:Arial,sans-serif;background:#0c0c0e;color:#f2ede3;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;text-align:center">
     <div style="max-width:420px;padding:32px">
       <h1 style="font-size:22px">This link has expired</h1>
       <p style="color:#b9b3a6;font-size:15px;line-height:1.6">Confirmation links are valid for 7 days. No problem — just request a fresh one.</p>
       <a href="${SITE}/aiso/#audit" style="display:inline-block;margin-top:14px;background:#c9a227;color:#141210;font-weight:bold;padding:12px 26px;border-radius:8px;text-decoration:none">Request a new audit</a>
     </div></body></html>`,
    { status: 410, headers: { "Content-Type": "text/html" } }
  );

  if (!token || !kv) return fail();
  const raw = await kv.get("confirm:" + token);
  if (!raw) return fail();

  const lead = JSON.parse(raw);
  lead.confirmed = true;
  lead.confirmedAt = new Date().toISOString();
  await kv.put("confirm:" + token, JSON.stringify(lead), { expirationTtl: 60 * 60 * 24 * 7 });

  return Response.redirect(`${SITE}/aiso/start/?t=${token}`, 302);
}
