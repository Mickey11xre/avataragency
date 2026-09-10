#!/usr/bin/env node
/* Build thrivingincollege from _src/ into this directory.
 *
 *   node thrivingincollege/build.js                 # staging: prefixes /thrivingincollege
 *   BASE= node thrivingincollege/build.js           # launch: site root (her domain)
 *   node thrivingincollege/build.js --check         # diff only, writes nothing
 *
 * Source pages use ROOT-RELATIVE paths (href="/instruments/", src="/css/…").
 * On staging the site lives under avataragency.ai/thrivingincollege/, so every
 * root-relative href/src is prefixed; at launch BASE is empty and the same
 * source deploys unchanged to the root of thrivingincollege.org.
 *
 * Every staging page also gets a noindex meta. Launch strips it — the real
 * site must be indexable. Absolute https://thrivingincollege.org/ URLs inside
 * JSON-LD and <link rel="canonical"> are left alone on purpose: they describe
 * the eventual home, not the staging host.
 *
 * Prices: pages carry {{price:KEY}} ($1,500) and {{amount:KEY}} (1500) tokens
 * resolved from _src/data/prices.json, which sync-prices.js generates from the
 * Stripe account that charges. One price list; no page can drift from it.
 *
 * Functions: _src/functions/ holds the Pages Functions (Stripe Checkout, the
 * webhook). They are emitted with the catalogue injected in place of
 * __CATALOGUE__, to the repo's functions/ tree — under functions/<BASE>/ on
 * staging so the route matches the page prefix, and functions/ at launch.
 */
const fs = require('fs');
const path = require('path');

const SRC   = path.join(__dirname, '_src');
const OUT   = __dirname;
const CHECK = process.argv.includes('--check');
const BASE  = process.env.BASE === undefined ? '/thrivingincollege' : process.env.BASE;
const STAGING = BASE !== '';
// Staging: <repo>/functions/thrivingincollege/…  Launch: <site>/functions/…
const FN_OUT = STAGING
  ? path.join(OUT, '..', 'functions', ...BASE.split('/').filter(Boolean))
  : path.join(OUT, 'functions');

const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e =>
  e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);

const catalogueText = fs.readFileSync(path.join(SRC, 'data', 'prices.json'), 'utf8');
const catalogue = JSON.parse(catalogueText);
const byKey = Object.fromEntries(catalogue.products.map(p => [p.key, p]));
const usd = n => '$' + n.toLocaleString('en-US');

function prices(html, file) {
  return html.replace(/\{\{(price|amount):([a-z0-9-]+)\}\}/g, (m, kind, key) => {
    const p = byKey[key];
    if (!p) throw new Error(`${path.basename(file)}: unknown price key "${key}"`);
    return kind === 'price' ? usd(p.amount) : String(p.amount);
  });
}

function transform(html, file) {
  let s = prices(html, file);
  // prefix root-relative href/src/poster/action/data-api — but never protocol, hash, mailto or //
  s = s.replace(/\b(href|src|poster|action|data-api)="\/(?!\/)/g, (m, a) => `${a}="${BASE}/`);
  if (STAGING && !/name="robots"/.test(s)) {
    s = s.replace(/(<meta name="viewport"[^>]*>)/, `$1\n<meta name="robots" content="noindex, nofollow">`);
  }
  return s;
}

const jobs = [];
for (const f of walk(path.join(SRC, 'pages'))) {
  const raw = fs.readFileSync(f, 'utf8');
  jobs.push({ rel: path.relative(path.join(SRC, 'pages'), f), dest: path.join(OUT, path.relative(path.join(SRC, 'pages'), f)),
              out: f.endsWith('.html') ? transform(raw, f) : raw });
}
for (const f of walk(path.join(SRC, 'css'))) {
  jobs.push({ rel: path.relative(SRC, f), dest: path.join(OUT, path.relative(SRC, f)), out: fs.readFileSync(f, 'utf8') });
}
const fnSrc = path.join(SRC, 'functions');
if (fs.existsSync(fnSrc)) {
  for (const f of walk(fnSrc)) {
    const rel = path.relative(fnSrc, f);
    const raw = fs.readFileSync(f, 'utf8');
    jobs.push({ rel: 'functions/' + rel, dest: path.join(FN_OUT, rel),
                // the assignment only — the header comment mentions the token too
                out: raw.replace(/= __CATALOGUE__;/, () => '= ' + catalogueText.trim() + ';') });
  }
}

let changed = 0, same = 0;
for (const j of jobs) {
  const cur = fs.existsSync(j.dest) ? fs.readFileSync(j.dest, 'utf8') : null;
  if (cur === j.out) { same++; continue; }
  changed++;
  if (CHECK) { console.log('DIFFERS: ' + j.rel); continue; }
  fs.mkdirSync(path.dirname(j.dest), { recursive: true });
  fs.writeFileSync(j.dest, j.out);
}

if (CHECK) {
  console.log(changed ? `${changed} file(s) drifted` : 'IDENTICAL - built output matches _src');
  process.exit(changed ? 1 : 0);
}
console.log(`built ${changed + same} file(s) to ${OUT}  (BASE="${BASE}", ${STAGING ? 'staging, noindex on' : 'LAUNCH, indexable'}; functions -> ${path.relative(process.cwd(), FN_OUT)})`);
