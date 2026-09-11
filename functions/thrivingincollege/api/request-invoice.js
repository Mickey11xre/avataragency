/**
 * POST /api/request-invoice — Rail 2 of the store (v6 §09): the institutional
 * quote / invoice request. PO accepted · Net 30 · W-9 available.
 *
 * The form does not create anything in Stripe. It delivers one complete
 * request to Dr. Schreiner's inbox (and a KV record when bound); she raises
 * the Stripe Quote or Net-30 invoice from the dashboard, where the hosted
 * invoice takes card or ACH. Programmatic Quotes are a later upgrade and
 * would need Quotes + Customers write on the restricted key.
 *
 * SETUP (Cloudflare Pages project settings):
 *   - Env var (secret):  RESEND_API_KEY        already on the avataragency project
 *   - Env var:           INVOICE_REQUEST_TO    comma-separated recipients
 *                        (falls back to ORDER_NOTIFY_TO, then the agency inbox
 *                        so staging never swallows a request)
 *   - Env var:           ORDER_NOTIFY_FROM     verified Resend sender (optional)
 *   - KV binding:        THRIVE_ORDERS         optional; invoice-request:<id>
 *
 * Accepts JSON or a form post. Form posts are redirected (303) to the static
 * confirmation page so the no-JS path completes without script.
 */
const CATALOGUE = {
  "_source": "Stripe account acct_1UCsilLYND5YEVl6, live mode. Seeded from the 2026-09-08 dashboard readback; run sync-prices.js to confirm against the API and fill price_id.",
  "_synced_at": "2026-09-10T22:39:57.545Z",
  "currency": "usd",
  "coupon": {
    "id": "THRIVE15",
    "percent_off": 15,
    "min_qualifying_surveys": 3,
    "applies_to": [
      "survey",
      "basic-report",
      "expanded-report"
    ]
  },
  "products": [
    {
      "key": "survey",
      "name": "Survey Package",
      "amount": 750,
      "product_id": "prod_VDgA0DxAuY3Nmw",
      "price_id": "price_1UDEoOLYND5YEVl61LTtp1LL",
      "public": true,
      "counts_as_survey": true
    },
    {
      "key": "basic-report",
      "name": "Basic Report Package",
      "amount": 1500,
      "product_id": "prod_VDgBBWN3Iw5fyq",
      "price_id": "price_1UDEoyLYND5YEVl6B53BJduj",
      "public": true,
      "counts_as_survey": true
    },
    {
      "key": "expanded-report",
      "name": "Expanded Report Package",
      "amount": 2500,
      "product_id": "prod_VDgBL9XqRVgBXf",
      "price_id": "price_1UDEpPLYND5YEVl6PCNAQYiH",
      "public": true,
      "counts_as_survey": true,
      "featured": true
    },
    {
      "key": "thriving-campus",
      "name": "Thriving Campus Package with One-Hour Webinar",
      "amount": 10000,
      "product_id": "prod_VDgCDrzjWI1JnW",
      "price_id": "price_1UDEpqLYND5YEVl6majcGkkt",
      "public": true,
      "counts_as_survey": false
    },
    {
      "key": "addon-questions",
      "name": "Additional Institution-Specific Questions (5 items)",
      "amount": 300,
      "product_id": "prod_VDgCLMxyEAt5Ne",
      "price_id": "price_1UDEqGLYND5YEVl6c8VGv42K",
      "public": true,
      "counts_as_survey": false,
      "unit": "per group of 5"
    },
    {
      "key": "addon-demographic",
      "name": "Additional Demographic Variable (Interactive Dashboard)",
      "amount": 300,
      "product_id": "prod_VDgD5zTV7kbA24",
      "price_id": "price_1UDEqhLYND5YEVl6ckdNdzgL",
      "public": true,
      "counts_as_survey": false,
      "unit": "per variable"
    },
    {
      "key": "webinar",
      "name": "One-Hour Webinar with Dr. Laurie Schreiner",
      "amount": 2000,
      "product_id": "prod_VDgDkm4wGRZGFS",
      "price_id": "price_1UDEr9LYND5YEVl6hbglYW21",
      "public": true,
      "counts_as_survey": false
    },
    {
      "key": "researcher",
      "name": "Researcher Option",
      "amount": 250,
      "product_id": "prod_VDgEKPVVVJv6eX",
      "price_id": "price_1UDErcLYND5YEVl6y8x81aPo",
      "public": false,
      "counts_as_survey": false,
      "note": "proposal-first; payment link sent after the signed proposal is returned"
    }
  ]
};

const INSTRUMENTS = {
  undergraduate: 'Undergraduate Thriving Quotient', adult: 'Adult Thriving Quotient',
  graduate: 'Graduate Student Thriving Quotient', sophomore: 'Sophomore Experiences Survey',
  faculty: 'Faculty Thriving Quotient', adjunctfaculty: 'Adjunct Faculty Thriving Quotient',
  staff: 'Staff Thriving Quotient', communitycollege: 'Community College Thriving Quotient'
};
const TERMS = { net30: 'Net 30', receipt: 'Due on receipt' };
const MAX_QTY = 10;
const FALLBACK_TO = 'michael@avataragency.ai';

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
}
const clean = (v, max) => (typeof v === 'string' ? v : '').replace(/[\u0000-\u001F\u007F]/g, '').trim().slice(0, max);
const usd = n => '$' + n.toLocaleString('en-US');

function siteRoot(request) {
  const u = new URL(request.url);
  return u.origin + u.pathname.replace(/\/api\/request-invoice\/?$/, '');
}
function sameOrigin(request) {
  const origin = request.headers.get('Origin');
  return !origin || origin === new URL(request.url).origin;
}

// Reads either body shape into one plain object of strings / string arrays.
async function readBody(request) {
  const ct = request.headers.get('Content-Type') || '';
  if (ct.includes('application/json')) return await request.json();
  const f = await request.formData();
  const o = {};
  for (const [k, v] of f.entries()) {
    if (k === 'instruments') (o.instruments = o.instruments || []).push(v);
    else o[k] = v;
  }
  return o;
}

function validate(b) {
  const errors = {};
  const r = {
    institution: clean(b.institution, 160),
    contact: clean(b.contact, 120),
    email: clean(b.email, 160).toLowerCase(),
    phone: clean(b.phone, 40),
    address: clean(b.address, 400),
    po_number: clean(b.po_number, 60),
    terms: TERMS[b.terms] ? b.terms : 'net30',
    w9: b.w9 === true || b.w9 === 'on' || b.w9 === 'yes' || b.w9 === '1',
    notes: clean(b.notes, 2000),
    instruments: (Array.isArray(b.instruments) ? b.instruments : []).filter(k => INSTRUMENTS[k]),
    items: []
  };
  if (r.institution.length < 2) errors.institution = 'Enter the institution name.';
  if (r.contact.length < 2) errors.contact = 'Enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.email)) errors.email = 'Enter a valid email address.';

  for (const p of CATALOGUE.products) {
    if (!p.public) continue;
    const raw = b['qty_' + p.key];
    if (raw === undefined || raw === '' || raw === null) continue;
    const q = Number(raw);
    if (!Number.isInteger(q) || q < 0 || q > MAX_QTY) { errors['qty_' + p.key] = `Quantity must be 0–${MAX_QTY}.`; continue; }
    if (q > 0) r.items.push({ key: p.key, name: p.name, amount: p.amount, quantity: q });
  }
  if (!r.items.length) errors.items = 'Choose at least one package.';
  return { r, errors };
}

function summarise(r) {
  const lines = r.items.map(i => `${i.quantity} × ${i.name} — ${usd(i.amount)} each`);
  const listTotal = r.items.reduce((n, i) => n + i.quantity * i.amount, 0);
  const qualifying = r.items.filter(i => (CATALOGUE.products.find(p => p.key === i.key) || {}).counts_as_survey)
    .reduce((n, i) => n + i.quantity, 0);
  return { lines, listTotal, qualifying, discountEligible: qualifying >= CATALOGUE.coupon.min_qualifying_surveys };
}

export async function onRequestPost(context) {
  const { request, env } = context;
  if (!sameOrigin(request)) return json({ error: 'forbidden' }, 403);
  const wantsJson = (request.headers.get('Content-Type') || '').includes('application/json');
  const root = siteRoot(request);

  let body;
  try { body = await readBody(request); } catch { return json({ error: 'bad request' }, 400); }
  // Honeypot: real buyers never see this field.
  if (clean(body.website, 10)) return wantsJson ? json({ ok: true }) : Response.redirect(root + '/packages/request-invoice/sent/', 303);

  const { r, errors } = validate(body);
  if (Object.keys(errors).length) return json({ error: 'validation', fields: errors }, 400);

  const id = 'ir_' + Date.now().toString(36) + crypto.randomUUID().slice(0, 8);
  const s = summarise(r);
  const rec = { id, at: new Date().toISOString(), ...r, list_total: s.listTotal, discount_eligible: s.discountEligible };

  if (env.THRIVE_ORDERS) await env.THRIVE_ORDERS.put('invoice-request:' + id, JSON.stringify(rec));

  if (!env.RESEND_API_KEY) {
    console.log('request-invoice: RESEND_API_KEY missing; request ' + id + ' stored=' + !!env.THRIVE_ORDERS);
    if (!env.THRIVE_ORDERS) return json({ error: 'not configured' }, 500);
  } else {
    const to = (env.INVOICE_REQUEST_TO || env.ORDER_NOTIFY_TO || FALLBACK_TO).split(',').map(x => x.trim()).filter(Boolean);
    const text = [
      `Invoice / quote request ${id}`,
      '',
      `Institution: ${r.institution}`,
      `Contact: ${r.contact} <${r.email}>${r.phone ? ' · ' + r.phone : ''}`,
      `Billing address: ${r.address || '(not given)'}`,
      `PO number: ${r.po_number || '(none yet)'}`,
      `Terms requested: ${TERMS[r.terms]}`,
      `W-9 requested: ${r.w9 ? 'yes' : 'no'}`,
      `Instruments: ${r.instruments.length ? r.instruments.map(k => INSTRUMENTS[k]).join(', ') : '(not specified)'}`,
      '',
      'Packages:',
      ...s.lines.map(l => '  ' + l),
      `List total: ${usd(s.listTotal)}`,
      s.discountEligible ? `Eligible for ${CATALOGUE.coupon.id} (${CATALOGUE.coupon.percent_off}% on ${s.qualifying} survey packages)` : 'Not eligible for the multi-survey discount',
      '',
      r.notes ? 'Notes:\n' + r.notes : '(no notes)',
      '',
      'Next: raise a Stripe Quote or Net-30 invoice from the dashboard and reply to the contact above.'
    ].join('\n');
    const send = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: env.ORDER_NOTIFY_FROM || 'The Thriving Project store <orders@avataragency.ai>',
        to,
        reply_to: r.email,
        subject: `Invoice request — ${r.institution} — ${usd(s.listTotal)}`,
        text
      })
    });
    if (!send.ok) {
      console.log('request-invoice: resend error', await send.text());
      if (!env.THRIVE_ORDERS) return json({ error: 'could not send' }, 500);
    }
  }

  if (wantsJson) return json({ ok: true, id });
  return Response.redirect(root + '/packages/request-invoice/sent/', 303);
}
