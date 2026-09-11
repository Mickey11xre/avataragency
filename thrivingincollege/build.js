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
// Instrument pages: one template × _src/data/instruments.json. Client-
// supplied facts that are still null render as a pending block that names
// what is owed — never a placeholder number (brief §10).
const tplPath = path.join(SRC, 'templates', 'instrument.html');
if (fs.existsSync(tplPath)) {
  const tpl = fs.readFileSync(tplPath, 'utf8');
  const { instruments } = JSON.parse(fs.readFileSync(path.join(SRC, 'data', 'instruments.json'), 'utf8'));
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const scalesHtml = inst => inst.scales
    ? `<ul class="scales" style="margin-block-start: var(--sp-s)">\n` +
      inst.scales.map(s => `          <li class="scale">
            <div><p class="scale__name">${esc(s.name)}</p></div>
            <div>
              <p class="scale__def">${esc(s.def)}</p>
              <p class="scale__meta"><span>Items <b>PENDING</b></span> <span>α <b>PENDING</b></span></p>
            </div>
          </li>`).join('\n') + `\n        </ul>
        <div class="pending" style="margin-block-start: var(--sp-s)">
          <p><b>Awaiting Dr. Schreiner</b></p>
          <p style="margin-block-start:var(--sp-2xs)">
            Item counts and reliability coefficients for the ${esc(inst.name)} are supplied by
            Dr. Schreiner and are not published until confirmed. Two conflicting sets of α values
            are currently published on the live site, and institutional research offices check
            these figures. Scale names and definitions above are structural and are not affected.
          </p>
        </div>`
    : `<div class="pending" style="margin-block-start: var(--sp-s)">
          <p><b>Awaiting Dr. Schreiner</b></p>
          <p style="margin-block-start:var(--sp-2xs)">
            The scales, item counts and reliability coefficients for the ${esc(inst.name)} are
            supplied by Dr. Schreiner and are not published until confirmed. They legitimately
            differ by instrument and population, so nothing here is copied from another
            instrument. This block is replaced by the scale list when her figures arrive.
          </p>
        </div>`;
  const asideHtml = cur => instruments.map(i =>
    `<li><a href="/instruments/${i.slug}/"${i.slug === cur ? ' aria-current="page"' : ''}>${esc(i.label)}</a></li>`).join('\n          ');
  for (const inst of instruments) {
    const html = tpl.replace(/\{\{(\w+)\}\}/g, (m, k) => {
      if (k === 'scales_html') return scalesHtml(inst);
      if (k === 'aside_html')  return asideHtml(inst.slug);
      if (k in inst && typeof inst[k] === 'string') return inst[k];
      throw new Error(`instrument template: unknown token {{${k}}} for ${inst.slug}`);
    });
    const rel = path.join('instruments', inst.slug, 'index.html');
    jobs.push({ rel, dest: path.join(OUT, rel), out: transform(html, tplPath) });
  }
}

// Generic pages: _src/templates/page.html × _src/content/<path>/index.html.
// A fragment's first line is `<!--meta {…}-->` with title, description,
// eyebrow, h1, nav (which primary item is current), crumbs, optional
// capsule and jsonld_extra; the rest is the <main> body.
const pageTpl = path.join(SRC, 'templates', 'page.html');
const contentDir = path.join(SRC, 'content');
if (fs.existsSync(pageTpl) && fs.existsSync(contentDir)) {
  const tpl = fs.readFileSync(pageTpl, 'utf8');
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  for (const f of walk(contentDir)) {
    if (!f.endsWith('.html')) continue;
    const raw = fs.readFileSync(f, 'utf8');
    const m = raw.match(/^<!--meta\s*(\{[\s\S]*?\})\s*-->\s*/);
    if (!m) throw new Error(`content fragment without meta: ${f}`);
    const meta = JSON.parse(m[1]);
    const body = raw.slice(m[0].length);
    const relPath = '/' + path.relative(contentDir, path.dirname(f)).split(path.sep).join('/') + '/';
    const crumbs = [{ name: 'Home', path: '/' }, ...(meta.crumbs || []), { name: meta.crumb || meta.h1, path: relPath }];
    const crumbsHtml = crumbs.map((c, i) => i === crumbs.length - 1
      ? `<li aria-current="page">${esc(c.name)}</li>`
      : `<li><a href="${c.path}">${esc(c.name)}</a></li>`).join('\n    ');
    const crumbsLd = crumbs.map((c, i) =>
      `{ "@type": "ListItem", "position": ${i + 1}, "name": ${JSON.stringify(c.name)}, "item": "https://thrivingincollege.org${c.path}" }`).join(',\n        ');
    const vals = {
      title: esc(meta.title), description: esc(meta.description), path: relPath,
      eyebrow: meta.eyebrow || '', h1: meta.h1,
      capsule_html: meta.capsule ? `<p class="capsule">${meta.capsule}</p>` : '',
      crumbs_html: crumbsHtml, crumbs_ld: crumbsLd,
      jsonld_extra: meta.jsonld_extra ? ',\n    ' + meta.jsonld_extra : '',
      body
    };
    for (const n of ['instruments', 'packages', 'research', 'store', 'about']) {
      vals['cur_' + n] = meta.nav === n ? ' aria-current="page"' : '';
    }
    const html = tpl.replace(/\{\{(\w+)\}\}/g, (mm, k) => {
      if (k in vals) return vals[k];
      throw new Error(`page template: unknown token {{${k}}} in ${f}`);
    });
    const rel = path.join(relPath.slice(1), 'index.html');
    jobs.push({ rel, dest: path.join(OUT, rel), out: transform(html, f) });
  }
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
