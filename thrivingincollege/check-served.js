#!/usr/bin/env node
/* The curl acceptance test (v6 §11.1, nav spec §8) as a script.
 *
 *   node thrivingincollege/check-served.js                       # staging
 *   node thrivingincollege/check-served.js https://thrivingincollege.org   # launch
 *
 * "What curl sees is what the crawlers see." For every page in the site tree
 * this fetches the served HTML (no JavaScript) and asserts: served as HTML,
 * exactly one <h1>, JSON-LD present in the source, the five primary nav
 * links, a full footer nav, no unresolved {{tokens}}, a <title> and a meta
 * description, robots noindex ON for staging and OFF at launch, and a
 * FAQPage block wherever the page shows a <details> FAQ. Exit 1 on any
 * failure — run it after every deploy, not on launch day.
 */
const base = (process.argv[2] || 'https://avataragency.ai/thrivingincollege').replace(/\/$/, '');
const staging = /\/thrivingincollege$/.test(base);      // the prefixed, noindex build
const pages = [
  '/', '/instruments/', '/instruments/undergraduate/', '/instruments/sophomore/', '/instruments/adult-learner/',
  '/instruments/graduate/', '/instruments/community-college/', '/instruments/faculty/', '/instruments/staff/',
  '/packages/', '/packages/survey/', '/packages/basic-report/', '/packages/expanded-report/', '/packages/thriving-campus/',
  '/packages/researcher/', '/packages/request-invoice/', '/store/',
  '/research/', '/research/publications/', '/research/presentations/', '/research/dissertations/', '/research/webinars/',
  '/research/articles/', '/research/articles/meaning-making-as-a-pathway-to-thriving/',
  '/thriving-vs-engagement-retention-belonging/', '/compare/thriving-quotient-vs-nsse/',
  '/about/laurie-schreiner/', '/for-researchers/', '/contact/',
  '/legal/terms/', '/legal/privacy/', '/legal/disclaimer/', '/legal/refunds/', '/legal/protection-of-subjects/'
];
const NAV = ['/instruments/', '/packages/', '/research/', '/store/', '/about/laurie-schreiner/'];
const prefix = staging ? '/thrivingincollege' : '';

(async () => {
  let failures = 0;
  for (const p of pages) {
    const url = base + p;
    const problems = [];
    try {
      const r = await fetch(url, { headers: { 'User-Agent': 'thriving-check/1.0 (curl acceptance)' } });
      const ct = r.headers.get('content-type') || '';
      const s = await r.text();
      if (r.status !== 200) problems.push('HTTP ' + r.status);
      if (!/text\/html/.test(ct)) problems.push('not HTML: ' + ct);
      const h1 = (s.match(/<h1[\s>]/g) || []).length; if (h1 !== 1) problems.push(`h1 count ${h1}`);
      if (!/application\/ld\+json/.test(s)) problems.push('no JSON-LD');
      if (!/<title>[^<]{5,}<\/title>/.test(s)) problems.push('no title');
      if (!/<meta name="description" content="[^"]{20,}"/.test(s)) problems.push('no meta description');
      for (const n of NAV) if (!s.includes(`href="${prefix}${n}"`)) problems.push('nav missing ' + n);
      const footer = (s.match(/<footer[\s\S]*<\/footer>/) || [''])[0];
      const flinks = (footer.match(/href="/g) || []).length; if (flinks < 25) problems.push(`footer links ${flinks}`);
      if (/\{\{[a-z]+:/.test(s)) problems.push('unresolved token');
      const noindex = /name="robots" content="noindex/.test(s);
      if (staging && !noindex) problems.push('staging page missing noindex');
      if (!staging && noindex && !/\/welcome\/|\/sent\/|\/status\//.test(p)) problems.push('launch page carries noindex');
      if (/<details>/.test(s) && !/"@type":\s*"FAQPage"/.test(s)) problems.push('visible FAQ without FAQPage schema');
      if (/"@type":\s*"FAQPage"/.test(s) && !/<details>/.test(s)) problems.push('FAQPage schema without visible FAQ');
    } catch (e) { problems.push('fetch failed: ' + e.message); }
    if (problems.length) { failures++; console.log('FAIL ' + p + '\n   ' + problems.join('\n   ')); }
    else console.log('ok   ' + p);
  }
  console.log(failures ? `\n${failures} page(s) failed` : `\nall ${pages.length} pages pass`);
  process.exit(failures ? 1 : 0);
})();
