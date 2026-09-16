#!/usr/bin/env node
/* LAUNCH GATE — run this before pointing thrivingincollege.org at the new site.
 *
 *   node thrivingincollege/check-launch-ready.js                         # the preview
 *   node thrivingincollege/check-launch-ready.js https://thrivingincollege.org
 *
 * ⛔ THE RULE (Michael, 14 Sept 2026): the domain does not go live while any
 * page still carries an "Awaiting Dr. Schreiner" block.
 *
 * Why this is a gate and not a nice-to-have. The two outstanding when the rule
 * was set were /legal/refunds/ and /legal/protection-of-subjects/.
 *
 * ⚠️ /legal/refunds/ IS NO LONGER CHECKED HERE BECAUSE THE PAGE NO LONGER
 * EXISTS. It was REMOVED on 16 Sept, not resolved. Laurie disowned the
 * published "no refunds" text on the 4 Sept call — "I don't even know that…
 * I'm happy to write a different policy… we would, we do have, we would make
 * some" — so the site had been publishing a promise she had already
 * contradicted. Rather than launch on that, Michael pulled the page.
 * ⛔ That trades a WRONG disclosure for NO disclosure. Cal. Bus. & Prof. Code
 * §17538 has an online seller disclose its refund policy before taking
 * payment, and checkout is live on real cards, so this gate no longer covers
 * the biggest open legal item on the site. Her policy is the priority.
 * When it lands, restore all five: the page, the link in
 * functions/api/checkout.js, the path in check-served.js, the footer <li> in
 * the templates and standalone pages, and /refundpolicy in redirects.txt.
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
    const legal = '';
    console.log('   ' + p + legal);
  }
  console.log('\nResolve these, or get her one-line approval on the drafted text, before the nameserver change.');
  process.exit(1);
})();
