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
 *   - KV binding:        THRIVE_ORDERS           order records, order:<session id>;
 *                        emailed:<session id>:<state> marks a notification as sent
 *   - Env var:           ORDER_NOTIFY_TO         comma-separated addresses to email (else FALLBACK_TO)
 *   - Env var (secret):  RESEND_API_KEY          required for any order email
 *   - Env var:           ORDER_NOTIFY_FROM       verified Resend sender
 *
 * ONE EMAIL PER SESSION AND STATE. Stripe redelivers an event when a delivery
 * fails, and a manual "Resend" in the Dashboard does not cancel the automatic
 * retries already queued. On 29–30 Sept five orders produced twelve emails
 * that way. The emailed: marker is written before sending and removed if the
 * send fails, so a retry can still deliver a notification that never went out.
 * ACH sends two on purpose: "initiated" (pending), then "paid" or "failed".
 *
 * Nothing here fulfils an order. It records and notifies; delivery is still
 * Dr. Schreiner's hand process until the Phase 2 intake exists.
 */
const TOLERANCE_S = 300;

// Names come from _src/data/instruments.json (injected by build.js), never
// typed here. The checkout dropdown (checkout.js) and the invoice form submit
// these codes; Stripe dropdown values cannot contain hyphens, so two codes
// differ from the catalog slug. Adjunct faculty is not a separate instrument:
// the Instruments page calls it "a variant of the Faculty Thriving Quotient".
const INSTRUMENT_CATALOG = __INSTRUMENTS__;
const CODE_TO_SLUG = { adult: 'adult-learner', communitycollege: 'community-college', adjunctfaculty: 'faculty' };

function instrument(code) {
  if (!code) return { full: '(not given)', short: '' };
  const i = INSTRUMENT_CATALOG.find(x => x.slug === (CODE_TO_SLUG[code] || code));
  if (!i) return { full: `${code} (unrecognized code — check checkout.js)`, short: code };
  const adjunct = code === 'adjunctfaculty';
  const short = /Thriving Quotient$/.test(i.name) ? `${i.label} TQ` : i.name;
  return {
    full: adjunct ? `${i.name} (adjunct faculty version)` : i.name,
    short: adjunct ? `${short} (adjunct)` : short
  };
}

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

// Same fallback as request-invoice.js: a missing ORDER_NOTIFY_TO must not silently drop order emails.
const FALLBACK_TO = 'michael@avataragency.ai';

// Returns what happened to the email; the handler echoes it to Stripe, so the delivery's
// Response body in the Dashboard says whether the notification actually went out.
async function notify(env, rec) {
  if (!env.RESEND_API_KEY) return 'skipped: no RESEND_API_KEY';
  // What Dr. Schreiner needs to act on comes first: which instrument, for whom,
  // what was bought. Order IDs and other technical fields go under Reference.
  const inst = instrument(rec.instrument);
  const who = rec.institution || rec.name || rec.email;
  const amount = money(rec.amount_total, rec.currency).replace(/\.00$/, '');
  const subject = [{ paid: 'Paid', pending: 'ACH initiated', failed: 'ACH FAILED' }[rec.state], amount, who, inst.short]
    .filter(Boolean).join(' — ');
  const status = {
    paid: 'Paid.',
    pending: 'Bank payment (ACH) started. Funds usually clear in four to five business days; a "Paid" email follows when they do.',
    failed: 'The bank payment (ACH) FAILED. The order is not paid. Contact the buyer.'
  }[rec.state];
  const lines = [
    `Instrument: ${inst.full}`,
    `Institution: ${rec.institution || '(not given)'}`,
    `Status: ${status}`,
    '',
    'Ordered:',
    ...(rec.items.length
      ? rec.items.map(i => `  ${i.quantity} × ${i.description} — ${money(i.amount_total, rec.currency)}`)
      : ['  (item list unavailable — open the order in Stripe, link below)']),
    `Total: ${money(rec.amount_total, rec.currency)}`,
    '',
    `Buyer: ${rec.name || '(no name)'} <${rec.email || 'no email'}>`,
    `PO number: ${rec.po_number || '(none)'}`,
    '',
    '',
    'Reference',
    '---------',
    `Order (Checkout session): ${rec.id}`,
    rec.payment_intent ? `Payment: ${rec.payment_intent}` : null,
    `Event: ${rec.event}`,
    `Instrument code: ${rec.instrument || '(none)'}`,
    `Discount: ${rec.discount}`,
    `Stripe: https://dashboard.stripe.com/` + (rec.payment_intent ? `payments/${rec.payment_intent}` : `payments?query=${rec.id}`)
  ].filter(l => l !== null);
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: env.ORDER_NOTIFY_FROM || 'The Thriving Project store <orders@avataragency.ai>',
        to: (env.ORDER_NOTIFY_TO || FALLBACK_TO).split(',').map(s => s.trim()).filter(Boolean),
        subject: 'Thriving Project store: ' + subject,
        text: lines.join('\n')
      })
    });
    if (r.ok) return 'sent';
    const why = `failed: ${r.status} ${(await r.text()).slice(0, 200)}`;
    console.log('stripe-webhook: resend error for ' + rec.id + ' — ' + why);
    return why;
  } catch (e) {
    console.log('stripe-webhook: resend unreachable for ' + rec.id + ' — ' + e);
    return 'failed: ' + String(e).slice(0, 200);
  }
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

  if (!env.THRIVE_ORDERS) {
    // No KV, no memory of past sends: every delivery emails. Say so in the response.
    const email = await notify(env, rec);
    return json({ received: true, state: handled, email, dedupe: 'off: no THRIVE_ORDERS binding' });
  }
  await env.THRIVE_ORDERS.put('order:' + s.id, JSON.stringify(rec));

  const mark = `emailed:${s.id}:${handled}`;
  const already = await env.THRIVE_ORDERS.get(mark);
  if (already) return json({ received: true, state: handled, email: 'skipped: already emailed ' + already });

  await env.THRIVE_ORDERS.put(mark, new Date().toISOString());
  const email = await notify(env, rec);
  // A send that did not go out must not block the next retry from trying again.
  if (email !== 'sent') await env.THRIVE_ORDERS.delete(mark);
  return json({ received: true, state: handled, email });
}
