/**
 * POST /api/stripe-webhook — Stripe event receiver for The Thriving Project.
 *
 * Exists because ACH is a delayed-notification method: checkout completes
 * days before the money does. The success page can only say "initiated";
 * this is where "paid" and "failed" are actually learned.
 *
 * Events to subscribe (Stripe → Developers → Webhooks → add endpoint):
 *   checkout.session.completed              card paid, or ACH initiated
 *   checkout.session.async_payment_succeeded ACH funds settled
 *   checkout.session.async_payment_failed    ACH returned / failed
 *
 * REQUIRED SETUP (Cloudflare Pages project settings):
 *   - Env var (secret):  STRIPE_WEBHOOK_SECRET   whsec_… from the endpoint page
 *   - Env var (secret):  STRIPE_SECRET_KEY       same restricted key as checkout.js
 * OPTIONAL:
 *   - KV binding:        THRIVE_ORDERS           order records, order:<session id>
 *   - Env var:           ORDER_NOTIFY_TO         comma-separated addresses to email
 *   - Env var (secret):  RESEND_API_KEY          only if ORDER_NOTIFY_TO is set
 *   - Env var:           ORDER_NOTIFY_FROM       verified Resend sender
 *
 * Nothing here fulfils an order. It records and notifies; delivery is still
 * Dr. Schreiner's hand process until the Phase 2 intake exists.
 */
const TOLERANCE_S = 300;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
}

function hex(buf) {
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

// Stripe-Signature: t=<unix>,v1=<hmac>[,v1=<hmac>…]; HMAC-SHA256 over "<t>.<raw body>".
async function verify(secret, header, raw) {
  const parts = Object.create(null);
  const v1 = [];
  for (const kv of (header || '').split(',')) {
    const [k, v] = kv.split('=');
    if (k === 'v1') v1.push(v); else parts[k] = v;
  }
  const t = Number(parts.t);
  if (!t || !v1.length) return false;
  if (Math.abs(Date.now() / 1000 - t) > TOLERANCE_S) return false;

  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const mac = hex(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${t}.${raw}`)));
  return v1.some(sig => timingSafeEqual(sig, mac));
}

async function lineItems(env, sessionId) {
  if (!env.STRIPE_SECRET_KEY) return [];
  const r = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}/line_items?limit=20`, {
    headers: { Authorization: 'Bearer ' + env.STRIPE_SECRET_KEY }
  });
  if (!r.ok) return [];
  const b = await r.json();
  return (b.data || []).map(li => ({ description: li.description, quantity: li.quantity, amount_total: li.amount_total }));
}

function money(cents, currency) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: (currency || 'usd').toUpperCase() }).format((cents || 0) / 100);
}

async function notify(env, rec) {
  if (!env.ORDER_NOTIFY_TO || !env.RESEND_API_KEY) return;
  const subject = {
    paid:    `Paid — ${money(rec.amount_total, rec.currency)} — ${rec.institution || rec.name || rec.email}`,
    pending: `ACH initiated — ${money(rec.amount_total, rec.currency)} — ${rec.institution || rec.name || rec.email}`,
    failed:  `ACH FAILED — ${money(rec.amount_total, rec.currency)} — ${rec.institution || rec.name || rec.email}`
  }[rec.state];
  const lines = [
    `Order ${rec.id}`,
    `State: ${rec.state}`,
    `Buyer: ${rec.name || ''} <${rec.email || ''}>`,
    `Institution: ${rec.institution || ''}`,
    `Instrument: ${rec.instrument || ''}`,
    `PO number: ${rec.po_number || ''}`,
    `Discount: ${rec.discount}`,
    '',
    ...rec.items.map(i => `${i.quantity} × ${i.description} — ${money(i.amount_total, rec.currency)}`),
    '',
    `Total: ${money(rec.amount_total, rec.currency)}`,
    `Stripe: https://dashboard.stripe.com/payments?query=${rec.id}`
  ];
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.ORDER_NOTIFY_FROM || 'The Thriving Project store <orders@avataragency.ai>',
      to: env.ORDER_NOTIFY_TO.split(',').map(s => s.trim()).filter(Boolean),
      subject: 'Thriving Project store: ' + subject,
      text: lines.join('\n')
    })
  }).catch(() => {});
}

export async function onRequestPost(context) {
  const { request, env } = context;
  // 500, not 503: Cloudflare replaces 502/503 bodies with its own page.
  if (!env.STRIPE_WEBHOOK_SECRET) return json({ error: 'webhook not configured' }, 500);

  const raw = await request.text();
  if (!(await verify(env.STRIPE_WEBHOOK_SECRET, request.headers.get('Stripe-Signature'), raw))) {
    return json({ error: 'bad signature' }, 400);
  }

  let event;
  try { event = JSON.parse(raw); } catch { return json({ error: 'bad payload' }, 400); }

  const s = event.data && event.data.object;
  const handled = {
    'checkout.session.completed':               s && s.payment_status === 'paid' ? 'paid' : 'pending',
    'checkout.session.async_payment_succeeded': 'paid',
    'checkout.session.async_payment_failed':    'failed'
  }[event.type];

  // Other events are acknowledged and ignored; Stripe retries anything else.
  if (!handled || !s || (s.metadata || {}).store !== 'thrivingincollege') return json({ received: true });

  const fields = {};
  for (const f of (s.custom_fields || [])) {
    const v = f.type === 'dropdown' ? (f.dropdown && f.dropdown.value) : (f.text && f.text.value);
    if (v) fields[f.key] = v;
  }
  const rec = {
    id: s.id,
    state: handled,
    event: event.type,
    at: new Date(event.created * 1000).toISOString(),
    amount_total: s.amount_total,
    currency: s.currency,
    email: s.customer_details && s.customer_details.email,
    name: s.customer_details && s.customer_details.name,
    institution: fields.institution,
    instrument: fields.instrument,
    po_number: fields.po_number,
    discount: (s.metadata || {}).discount || 'none',
    payment_intent: s.payment_intent,
    items: await lineItems(env, s.id)
  };

  if (env.THRIVE_ORDERS) {
    await env.THRIVE_ORDERS.put('order:' + s.id, JSON.stringify(rec));
  }
  await notify(env, rec);
  return json({ received: true, state: handled });
}
