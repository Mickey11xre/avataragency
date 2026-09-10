#!/usr/bin/env node
/* Pull the live catalogue from Stripe and write _src/data/prices.json.
 *
 *   STRIPE_SECRET_KEY=rk_live_... node thrivingincollege/sync-prices.js
 *
 * Needs a RESTRICTED key with products:read and prices:read only. Never
 * commit the key; it is passed in the environment for this one run. The
 * resulting JSON is committed, so every price on the site is auditable in
 * git and generated from the account that actually charges.
 *
 * Matches on product_id (already in the seed), fills price_id from the
 * product's default price, and refuses to write if any live amount differs
 * from the seed - a changed price is a decision to record, not to absorb.
 */
const fs = require('fs'), path = require('path');
const KEY = process.env.STRIPE_SECRET_KEY;
if (!KEY) { console.error('STRIPE_SECRET_KEY not set'); process.exit(1); }
const FILE = path.join(__dirname, '_src', 'data', 'prices.json');
const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));

async function stripe(p) {
  const r = await fetch('https://api.stripe.com/v1/' + p, { headers: { Authorization: 'Bearer ' + KEY } });
  if (!r.ok) throw new Error(p + ' -> ' + r.status + ' ' + await r.text());
  return r.json();
}
(async () => {
  const drift = [];
  for (const prod of data.products) {
    const p = await stripe('products/' + prod.product_id + '?expand[]=default_price');
    const price = p.default_price;
    if (!price) { drift.push(prod.key + ': no default price'); continue; }
    const live = price.unit_amount / 100;
    if (live !== prod.amount) drift.push(`${prod.key}: seed $${prod.amount} vs live $${live}`);
    prod.price_id = price.id;
    prod.name = p.name;
  }
  if (drift.length) { console.error('REFUSING TO WRITE - live differs from seed:\n  ' + drift.join('\n  ')); process.exit(1); }
  data._synced_at = new Date().toISOString();
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + '\n');
  console.log('synced ' + data.products.length + ' products; price_ids filled; no drift');
})().catch(e => { console.error(e.message); process.exit(1); });
