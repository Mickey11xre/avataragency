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
 */
const fs = require('fs');
const path = require('path');

const SRC   = path.join(__dirname, '_src');
const OUT   = __dirname;
const CHECK = process.argv.includes('--check');
const BASE  = process.env.BASE === undefined ? '/thrivingincollege' : process.env.BASE;
const STAGING = BASE !== '';

const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e =>
  e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);

function transform(html) {
  // prefix root-relative href/src/poster — but never protocol, hash, mailto or //
  let s = html.replace(/\b(href|src|poster)="\/(?!\/)/g, (m, a) => `${a}="${BASE}/`);
  if (STAGING && !/name="robots"/.test(s)) {
    s = s.replace(/(<meta name="viewport"[^>]*>)/, `$1\n<meta name="robots" content="noindex, nofollow">`);
  }
  return s;
}

const pages = walk(path.join(SRC, 'pages'));
const css   = walk(path.join(SRC, 'css'));
let changed = 0, same = 0;

for (const f of [...pages, ...css]) {
  const rel  = path.relative(f.includes(`${path.sep}pages${path.sep}`) ? path.join(SRC, 'pages') : SRC, f);
  const dest = path.join(OUT, rel);
  const raw  = fs.readFileSync(f, 'utf8');
  const out  = f.endsWith('.html') ? transform(raw) : raw;
  const cur  = fs.existsSync(dest) ? fs.readFileSync(dest, 'utf8') : null;
  if (cur === out) { same++; continue; }
  changed++;
  if (CHECK) { console.log('DIFFERS: ' + rel); continue; }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, out);
}

if (CHECK) {
  console.log(changed ? `${changed} file(s) drifted` : 'IDENTICAL - built output matches _src');
  process.exit(changed ? 1 : 0);
}
console.log(`built ${changed + same} file(s) to ${OUT}  (BASE="${BASE}", ${STAGING ? 'staging, noindex on' : 'LAUNCH, indexable'})`);
