/**
 * Stripe Checkout for The Thriving Project store — Cloudflare Pages Function.
 *
 *   POST /api/checkout                 create a Checkout Session for a cart
 *   GET  /api/checkout?session_id=cs_… read-only status for /welcome/
 *
 * SOURCE lives in thrivingincollege/_src/functions/. build.js injects the
 * committed catalogue (_src/data/prices.json) in place of __CATALOGUE__ and
 * writes the result to the repo's functions/ tree — never edit the built copy.
 *
 * REQUIRED SETUP (Cloudflare Pages project settings):
 *   - Env var (secret):  STRIPE_SECRET_KEY — a RESTRICTED live key:
 *                        Products read · Prices read · Coupons read ·
 *                        Promotion Codes read · Checkout Sessions write.
 *                        It cannot refund, pay out, or edit the catalogue.
 *
 * Commercial rules this file owns (thriving-project-stripe-store §2):
 *   - Only products flagged public in the catalogue can be bought here.
 *     The Researcher Option is proposal-first and never appears.
 *   - THRIVE15 (15%) applies when the cart holds THREE OR MORE per-survey
 *     packages in total. Stripe coupons cannot count, so this code does:
 *     it attaches the coupon programmatically and the buyer never sees a
 *     promo box. The coupon's own product restriction keeps the 15% off the
 *     $10,000 package, the add-ons and the webinar even if it is attached.
 *   - Prices are never accepted from the client. The cart carries product
 *     keys and quantities; the price_id comes from the committed catalogue.
 *   - ACH is a delayed-notification method: a completed session is NOT a
 *     paid order. /welcome/ shows the pending state and the webhook
 *     (stripe-webhook.js) records the outcome. Nothing ships off this file.
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

const MAX_QTY = 10;
const CS_ID = /^cs_(live|test)_[A-Za-z0-9]{10,}$/;

// One product per package, not per package × instrument: the instrument is
// captured at checkout as a required dropdown. Adjunct Faculty is an option
// here and has no page — her ruling of 8 Sept 2026.
const INSTRUMENTS = [
  ['undergraduate',     'Undergraduate Thriving Quotient'],
  ['adult',             'Adult Thriving Quotient'],
  ['graduate',          'Graduate Student Thriving Quotient'],
  ['sophomore',         'Sophomore Experiences Survey'],
  ['faculty',           'Faculty Thriving Quotient'],
  ['adjunct-faculty',   'Adjunct Faculty Thriving Quotient'],
  ['staff',             'Staff Thriving Quotient'],
  ['community-college', 'Community College Thriving Quotient'],
];

const ACH_NOTE = 'Bank debit (ACH) payments take four to five business days to clear. ' +
  'Your order is confirmed once the funds settle; card payments confirm immediately.';

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
  });
}

// Stripe takes application/x-www-form-urlencoded with bracket nesting.
function flatten(obj, prefix, out) {
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    const key = prefix ? `${prefix}[${k}]` : k;
    if (Array.isArray(v)) {
      v.forEach((item, i) => (item !== null && typeof item === 'object')
        ? flatten(item, `${key}[${i}]`, out)
        : out.push([`${key}[${i}]`, String(item)]));
    } else if (typeof v === 'object') {
      flatten(v, key, out);
    } else {
      out.push([key, String(v)]);
    }
  }
  return out;
}

async function stripe(env, method, path, params) {
  const init = {
    method,
    headers: { Authorization: 'Bearer ' + env.STRIPE_SECRET_KEY }
  };
  if (params) {
    init.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    init.body = new URLSearchParams(flatten(params, '', [])).toString();
  }
  const r = await fetch('https://api.stripe.com/v1/' + path, init);
  const body = await r.json();
  if (!r.ok) {
    const err = new Error((body.error && body.error.message) || ('stripe ' + r.status));
    err.status = r.status;
    throw err;
  }
  return body;
}

// The site root as the buyer sees it. On staging this is
// https://avataragency.ai/thrivingincollege; at launch it is her domain.
// Derived from the request so the same file serves both.
function siteRoot(request) {
  const u = new URL(request.url);
  return u.origin + u.pathname.replace(/\/api\/checkout\/?$/, '');
}

function sameOrigin(request) {
  const origin = request.headers.get('Origin');
  if (!origin) return true;                   // no-JS form posts from old UAs
  return origin === new URL(request.url).origin;
}

// Accepts either JSON { items: [{ key, quantity }] } or a form post carrying
// qty_<key>=n fields (the no-JS path from /packages/). Returns validated
// line items against the committed catalogue, or a string error.
async function readCart(request) {
  const ct = request.headers.get('Content-Type') || '';
  let raw = {};
  if (ct.includes('application/json')) {
    const b = await request.json();
    for (const it of (b && Array.isArray(b.items) ? b.items : [])) {
      if (it && typeof it.key === 'string') raw[it.key] = it.quantity;
    }
  } else {
    const f = await request.formData();
    for (const [k, v] of f.entries()) {
      if (k.startsWith('qty_')) raw[k.slice(4)] = v;
    }
  }

  const items = [];
  for (const [key, q] of Object.entries(raw)) {
    const qty = Number(q);
    if (!Number.isInteger(qty) || qty < 0 || qty > MAX_QTY) return `invalid quantity for ${key}`;
    if (qty === 0) continue;
    const p = CATALOGUE.products.find(x => x.key === key && x.public && x.price_id);
    if (!p) return `unknown item ${key}`;
    items.push({ product: p, quantity: qty });
  }
  if (!items.length) return 'empty cart';
  return items;
}

export async function onRequestPost(context) {
  const { request, env } = context;
  if (!env.STRIPE_SECRET_KEY) return json({ error: 'checkout not configured' }, 500);
  if (!sameOrigin(request)) return json({ error: 'forbidden' }, 403);

  const wantsJson = (request.headers.get('Content-Type') || '').includes('application/json');
  const items = await readCart(request).catch(() => 'bad request');
  if (typeof items === 'string') return json({ error: items }, 400);

  const qualifying = items
    .filter(i => i.product.counts_as_survey)
    .reduce((n, i) => n + i.quantity, 0);
  const discount = qualifying >= CATALOGUE.coupon.min_qualifying_surveys;
  const root = siteRoot(request);

  const params = {
    mode: 'payment',
    submit_type: 'pay',
    line_items: items.map(i => ({ price: i.product.price_id, quantity: i.quantity })),
    success_url: root + '/welcome/?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: root + '/packages/',
    customer_creation: 'always',
    billing_address_collection: 'required',
    custom_fields: [
      {
        key: 'instrument', type: 'dropdown',
        label: { type: 'custom', custom: 'Which survey instrument?' },
        dropdown: { options: INSTRUMENTS.map(([value, label]) => ({ value, label })) }
      },
      {
        key: 'institution', type: 'text',
        label: { type: 'custom', custom: 'Institution' },
        text: { minimum_length: 2, maximum_length: 120 }
      },
      {
        key: 'po_number', type: 'text', optional: true,
        label: { type: 'custom', custom: 'Purchase order number (optional)' },
        text: { maximum_length: 60 }
      }
    ],
    custom_text: { submit: { message: ACH_NOTE } },
    metadata: {
      store: 'thrivingincollege',
      items: items.map(i => `${i.product.key}x${i.quantity}`).join(','),
      qualifying_surveys: String(qualifying),
      discount: discount ? CATALOGUE.coupon.id : 'none'
    }
  };
  if (discount) params.discounts = [{ coupon: CATALOGUE.coupon.id }];

  let session;
  try {
    session = await stripe(env, 'POST', 'checkout/sessions', params);
  } catch (e) {
    // Stripe's message names the rejected parameter or permission and never
    // the key. Surfacing it is what makes a misconfigured key diagnosable
    // from outside. 500, not 502: Cloudflare replaces 502/503 bodies with
    // its own error page and the JSON never reaches the caller.
    console.log('checkout session error:', e.message);
    return json({ error: 'could not start checkout', detail: e.message }, 500);
  }

  if (wantsJson) return json({ id: session.id, url: session.url, discount });
  return Response.redirect(session.url, 303);
}

// Status for /welcome/. Reads only what the page shows; the session id is
// unguessable and the response carries no card or bank detail.
export async function onRequestGet(context) {
  const { request, env } = context;
  if (!env.STRIPE_SECRET_KEY) return json({ error: 'checkout not configured' }, 500);
  const id = new URL(request.url).searchParams.get('session_id') || '';
  if (!CS_ID.test(id)) return json({ error: 'invalid session' }, 400);

  let s;
  try {
    s = await stripe(env, 'GET', `checkout/sessions/${id}?expand[]=line_items`);
  } catch (e) {
    return json({ error: 'session not found' }, e.status === 404 ? 404 : 500);
  }
  if ((s.metadata || {}).store !== 'thrivingincollege') return json({ error: 'session not found' }, 404);

  const fields = {};
  for (const f of (s.custom_fields || [])) {
    const v = f.type === 'dropdown' ? (f.dropdown && f.dropdown.value) : (f.text && f.text.value);
    if (v) fields[f.key] = v;
  }
  return json({
    id: s.id,
    status: s.status,                       // open | complete | expired
    payment_status: s.payment_status,       // paid | unpaid | no_payment_required
    amount_total: s.amount_total,
    currency: s.currency,
    email: s.customer_details && s.customer_details.email,
    name: s.customer_details && s.customer_details.name,
    discount: (s.metadata || {}).discount || 'none',
    fields,
    items: ((s.line_items && s.line_items.data) || []).map(li => ({
      description: li.description, quantity: li.quantity, amount_total: li.amount_total
    }))
  });
}
