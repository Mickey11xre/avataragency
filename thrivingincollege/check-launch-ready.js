#!/usr/bin/env node
/* LAUNCH GATE — run this before pointing thrivingincollege.org at the new site.
 *
 *   node thrivingincollege/check-launch-ready.js                         # the preview
 *   node thrivingincollege/check-launch-ready.js https://thrivingincollege.org
 *
 * ⛔ THE RULE (Michael, 14 Sept 2026): the domain does not go live while any
 * page still carries an "Awaiting Dr. Schreiner" block.
 *
 * Why this is a gate and not a nice-to-have. The two that were outstanding
 * when the rule was set are /legal/refunds/ and /legal/protection-of-subjects/,
 * and the refunds one is a legal exposure rather than a tidiness problem:
 * California Business & Professions Code §17538 requires the refund policy to
 * be DISCLOSED BEFORE payment is taken, and her checkout is live and charging
 * real cards. Shipping the domain with a placeholder there means taking money
 * on a site that does not state its own refund terms.
 *
 * This deliberately does NOT fail the build. The preview must keep deploying
 * with pending blocks on it — that is how they get reviewed. It fails the
 * CUTOVER, which is the moment the exposure becomes real.
 */
const BASE = (process.argv[2] || 'https://thrivingincollege.pages.dev').replace(/\/$/, '');
const PENDING = /awaiting\s+dr\.?\s+schreiner/i;

const get = async (u) => {
  const r = await fetch(u, { redirect: 'follow' });
  return { status: r.status, body: await r.text() };
};

(async () => {
  let urls = [];
  try {
    const sm = await get(BASE + '/sitemap.xml');
    urls = [...sm.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  } catch (e) {
    console.error('could not read ' + BASE + '/sitemap.xml — ' + e.message);
    process.exit(2);
  }
  if (!urls.length) { console.error('sitemap had no URLs'); process.exit(2); }

  const origin = new URL(urls[0]).origin;
  const blocked = [];
  for (const u of urls) {
    const path = u.slice(origin.length) || '/';
    const { body } = await get(BASE + path);
    if (PENDING.test(body)) blocked.push(path);
  }

  console.log(`${urls.length} pages checked against ${BASE}`);
  if (!blocked.length) {
    console.log('\n✅ no "Awaiting Dr. Schreiner" blocks — clear to cut the domain over.');
    process.exit(0);
  }
  console.log(`\n⛔ NOT CLEAR TO LAUNCH — ${blocked.length} page(s) still awaiting her:`);
  for (const p of blocked) {
    const legal = p === '/legal/refunds/' ? '   ← BPC §17538: must be disclosed before payment, and checkout is LIVE' : '';
    console.log('   ' + p + legal);
  }
  console.log('\nResolve these, or get her one-line approval on the drafted text, before the nameserver change.');
  process.exit(1);
})();
