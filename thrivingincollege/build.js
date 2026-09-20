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
 * staging so the route matches the page prefix.
 *
 * ⛔ AT LAUNCH THE FUNCTIONS GO BESIDE THE STATIC OUTPUT, NEVER INSIDE IT.
 * Cloudflare is explicit: "Make sure that the /functions directory is at the
 * root of your Pages project (and not in the static root, such as /dist)."
 * They used to be emitted into OUT/functions and it failed two ways at once,
 * proved locally on 2026-09-14 before any of it reached her domain:
 *   1. Pages never ran them — it looks in the project root, so every
 *      /api/* route fell through to the static handler and CHECKOUT WAS DEAD.
 *   2. Being inside the served directory, each one was published as a static
 *      asset: GET /functions/api/checkout.js returned 200 application/javascript,
 *      i.e. the Stripe server-side source readable by anyone who guessed it.
 * So the launch layout is the one Cloudflare documents — a project root that
 * holds BOTH, with only `dist` served:
 *     <root>/functions/api/*.js     <- Pages compiles these
 *     <root>/dist/**                <- build output directory
 * Canonical launch build, from the repo root:
 *     BASE= OUT_DIR=thrive-launch/dist node thrivingincollege/build.js
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const SRC   = path.join(__dirname, '_src');
// OUT_DIR lets a launch build (BASE="") land somewhere other than this
// directory — this directory IS the staging deploy, so a launch build here
// would overwrite it with un-prefixed, indexable output.
const OUT   = process.env.OUT_DIR ? path.resolve(process.env.OUT_DIR) : __dirname;
const CHECK = process.argv.includes('--check');
const BASE  = process.env.BASE === undefined ? '/thrivingincollege' : process.env.BASE;
const STAGING = BASE !== '';
// Staging: <repo>/functions/thrivingincollege/…
// Launch:  a SIBLING of the static output (<root>/functions), never inside it
//          — see the ⛔ note in the header. FN_DIR overrides if a host ever
//          wants it somewhere else.
const FN_OUT = process.env.FN_DIR ? path.resolve(process.env.FN_DIR)
  : STAGING
    ? path.join(OUT, '..', 'functions', ...BASE.split('/').filter(Boolean))
    : path.join(OUT, '..', 'functions');
// A launch build with no OUT_DIR would resolve FN_OUT to the repo's own
// functions/ tree and drop her Stripe endpoints on top of avataragency.ai's.
// Refuse rather than corrupt another site's Functions.
if (!STAGING && !process.env.OUT_DIR && !process.env.FN_DIR) {
  console.error('launch build needs OUT_DIR (e.g. OUT_DIR=thrive-launch/dist) so functions\n' +
                'do not land in the repo root functions/ tree. Refusing to build.');
  process.exit(1);
}

const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e =>
  e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);

const catalogueText = fs.readFileSync(path.join(SRC, 'data', 'prices.json'), 'utf8');
const catalogue = JSON.parse(catalogueText);
const byKey = Object.fromEntries(catalogue.products.map(p => [p.key, p]));
const usd = n => '$' + n.toLocaleString('en-US');

// {{price:KEY}} → $1,500 · {{amount:KEY}} → 1500 · {{blurb:KEY}} → the
// buyer-facing description from her 6 Sept 2026 price sheet (prices.json).
function prices(html, file) {
  return html.replace(/\{\{(price|amount|blurb):([a-z0-9-]+)\}\}/g, (m, kind, key) => {
    const p = byKey[key];
    if (!p) throw new Error(`${path.basename(file)}: unknown price key "${key}"`);
    if (kind === 'blurb') {
      if (!p.blurb) throw new Error(`${path.basename(file)}: no blurb for "${key}"`);
      return p.blurb;
    }
    return kind === 'price' ? usd(p.amount) : String(p.amount);
  });
}

const site = JSON.parse(fs.readFileSync(path.join(SRC, 'data', 'site.json'), 'utf8'));
const drawerTpl = fs.existsSync(path.join(SRC, 'templates', 'drawer.html'))
  ? fs.readFileSync(path.join(SRC, 'templates', 'drawer.html'), 'utf8') : '';

// GA4 (when site.json carries the Measurement ID) + an ai_referral event for
// visits arriving from AI assistants, so the monthly report can show them.
function ga4Snippet() {
  if (!site.ga4) return '';
  const hosts = JSON.stringify(site.ai_referrers || []);
  return `<script async src="https://www.googletagmanager.com/gtag/js?id=${site.ga4}"></script>
<script>
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());
gtag('config','${site.ga4}');
(function(){try{var r=document.referrer;if(!r)return;var h=new URL(r).hostname;var L=${hosts};
for(var i=0;i<L.length;i++){if((h+'/').indexOf(L[i].split('/')[0])>-1){gtag('event','ai_referral',{ai_source:L[i],page_location:location.href});break;}}}catch(e){}})();
</script>`;
}

function transform(html, file) {
  let s = prices(html, file);
  // shared mobile drawer on every page that carries the hamburger control
  if (drawerTpl && /class="hamburger"/.test(s)) {
    s = s.replace(/<\/head>/, `<link rel="stylesheet" href="/css/drawer.css">\n</head>`);
    s = s.replace(/<\/body>/, drawerTpl + '\n</body>');
  }
  // Favicon — the tree from her logo, on every page. Declared explicitly
  // rather than relying on the browser's /favicon.ico probe, because on
  // staging the site lives under /thrivingincollege/ and that probe would hit
  // avataragency.ai's own root instead.
  if (!/rel="icon"/.test(s)) {
    s = s.replace(/<\/head>/, `<link rel="icon" href="/assets/favicon.ico" sizes="32x32">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/icon-16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/icon-32.png">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/icon-180.png">
</head>`);
  }
  /* Open Graph + Twitter Card. Added 2026-09-14: the site had NONE, so every
     link anyone shared — an email to a provost, a LinkedIn post, a Slack
     message — unfurled as a bare URL with no title, blurb or picture. For a
     site whose whole distribution is colleagues forwarding it to colleagues,
     that is the cheapest reach on the page.
     Derived from the page's OWN <title>, description and canonical rather
     than hand-written per page, so they can never drift out of sync with
     what the page actually says. Absolute https://thrivingincollege.org URLs
     on purpose, the same convention the canonicals already use: scrapers
     will not resolve a root-relative image, and the share card should name
     her domain wherever it is served from. */
  if (!/property="og:/.test(s)) {
    const pick = (re) => { const m = s.match(re); return m ? m[1].trim() : ''; };
    const attr = (v) => v.replace(/"/g, '&quot;');
    const title = pick(/<title>([\s\S]*?)<\/title>/);
    const desc  = pick(/<meta name="description" content="([^"]*)"/);
    const canon = pick(/<link rel="canonical" href="([^"]*)"/);
    const img   = 'https://thrivingincollege.org/assets/hero-poster.jpg';
    if (title && canon) {
      const og = [
        `<meta property="og:type" content="website">`,
        `<meta property="og:site_name" content="The Thriving Project">`,
        `<meta property="og:locale" content="en_US">`,
        `<meta property="og:title" content="${attr(title)}">`,
        desc ? `<meta property="og:description" content="${attr(desc)}">` : '',
        `<meta property="og:url" content="${attr(canon)}">`,
        `<meta property="og:image" content="${img}">`,
        `<meta property="og:image:width" content="1280">`,
        `<meta property="og:image:height" content="720">`,
        `<meta property="og:image:alt" content="Dr. Laurie A. Schreiner, creator of the Thriving Quotient">`,
        `<meta name="twitter:card" content="summary_large_image">`,
        `<meta name="twitter:title" content="${attr(title)}">`,
        desc ? `<meta name="twitter:description" content="${attr(desc)}">` : '',
        `<meta name="twitter:image" content="${img}">`,
      ].filter(Boolean).join('\n');
      s = s.replace(/<\/head>/, og + '\n</head>');
    }
  }
  const ga = ga4Snippet();
  if (ga) s = s.replace(/<\/head>/, ga + '\n</head>');
  // prefix root-relative href/src/poster/action/data-* — but never protocol, hash, mailto or //
  s = s.replace(/\b(href|src|srcset|poster|action|data-api|data-assets|data-href)="\/(?!\/)/g, (m, a) => `${a}="${BASE}/`);
  // url("/assets/…") inside inline <style> blocks (the homepage's two image custom properties)
  s = s.replace(/url\("\/(?!\/)/g, `url("${BASE}/`);
  if (STAGING && !/name="robots"/.test(s)) {
    s = s.replace(/(<meta name="viewport"[^>]*>)/, `$1\n<meta name="robots" content="noindex, nofollow">`);
  }
  return s;
}

const jobs = [];
for (const f of walk(path.join(SRC, 'pages'))) {
  if (!STAGING && /[\\/]status[\\/]index\.html$/.test(f)) continue;   // staging-only status page
  const raw = fs.readFileSync(f, 'utf8');
  // .html gets the full transform; .txt (llms.txt) gets price tokens only
  jobs.push({ rel: path.relative(path.join(SRC, 'pages'), f), dest: path.join(OUT, path.relative(path.join(SRC, 'pages'), f)),
              out: f.endsWith('.html') ? transform(raw, f) : f.endsWith('.txt') ? prices(raw, f) : raw });
}
for (const f of walk(path.join(SRC, 'css'))) {
  jobs.push({ rel: path.relative(SRC, f), dest: path.join(OUT, path.relative(SRC, f)), out: fs.readFileSync(f, 'utf8') });
}
// scripts and binary assets (film frames, hi-res anchors, hero film, portrait,
// butterfly) copy through untouched; compared as bytes so --check covers them
for (const dir of ['js', 'assets', 'files']) {
  const d = path.join(SRC, dir);
  if (!fs.existsSync(d)) continue;
  for (const f of walk(d)) {
    jobs.push({ rel: path.relative(SRC, f), dest: path.join(OUT, path.relative(SRC, f)), out: fs.readFileSync(f), binary: true });
  }
}
// Instrument pages: one template × _src/data/instruments.json. Client-
// supplied facts that are still null render as a pending block that names
// what is owed — never a placeholder number (brief §10).
const tplPath = path.join(SRC, 'templates', 'instrument.html');
if (fs.existsSync(tplPath)) {
  const tpl = fs.readFileSync(tplPath, 'utf8');
  const { instruments } = JSON.parse(fs.readFileSync(path.join(SRC, 'data', 'instruments.json'), 'utf8'));
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  /* Scale and pathway copy is VERBATIM from the live site (see the _source note
     in instruments.json). α and the sample item are part of the published
     description of a validated instrument — a research office checks them
     against the literature — so they render exactly as written, and a value we
     do not have renders as nothing rather than as a guess. */
  const rowsHtml = (rows, cls) => `<ul class="scales ${cls}" style="margin-block-start: var(--sp-s)">\n` +
    rows.map(s => {
      const meta = s.alpha ? `\n              <p class="scale__meta"><span>α = <b>${esc(s.alpha)}</b></span></p>` : '';
      const sample = s.sample
        ? `\n              <p class="scale__sample"><span class="scale__samplelab">Sample item</span> “${esc(s.sample)}”</p>` : '';
      return `          <li class="scale">
            <div><p class="scale__name">${esc(s.name)}</p></div>
            <div>
              <p class="scale__def">${esc(s.def)}</p>${meta}${sample}
            </div>
          </li>`;
    }).join('\n') + `\n        </ul>`;
  const scalesHtml = inst => {
    const intro = inst.scales_intro ? `<p class="section__lead">${esc(inst.scales_intro)}</p>` : '';
    // no scales is a real state (community college publishes none) — render
    // nothing rather than an empty list
    if (!(inst.scales || []).length) return intro;
    return (intro ? intro + '\n        ' : '') + rowsHtml(inst.scales, 'scales--main');
  };
  /* The citation comes from her own publications page, not from us. Where she
     has published none — the faculty and staff instruments — we say so rather
     than assembling a plausible-looking reference, which is the exact failure
     mode that got the instrument copy rewritten in the first place. */
  const citeHtml = inst => (inst.citations || []).length
    ? (inst.citations || []).map(c => `<p class="cite__ref">${esc(c)}</p>`).join('\n          ')
    : '';
  const pathwaysHtml = inst => {
    if (!inst.pathways_intro && !(inst.pathways || []).length) return '';
    const intro = inst.pathways_intro ? `<p class="section__lead">${esc(inst.pathways_intro)}</p>` : '';
    const rows = (inst.pathways || []).length ? '\n        ' + rowsHtml(inst.pathways, 'scales--paths') : '';
    return `<section class="section" aria-labelledby="paths">
        <h2 id="paths">Pathways to thriving</h2>
        ${intro}${rows}
      </section>`;
  };
  const adminHtml = inst => inst.admin
    ? `<dd>${esc(inst.admin)}</dd>`
    : `<dd><span class="pending" style="display:inline-block;padding:var(--sp-3xs) var(--sp-2xs)"><b>Pending</b> — stated per institution size in the administration guidance.</span></dd>`;
  const closingHtml = inst => inst.closing
    ? `<section class="section" aria-labelledby="alsomeasures">
        <h2 id="alsomeasures">What else the survey assesses</h2>
        <p class="section__lead">${esc(inst.closing)}</p>
      </section>` : '';
  const asideHtml = cur => instruments.map(i =>
    `<li><a href="/instruments/${i.slug}/"${i.slug === cur ? ' aria-current="page"' : ''}>${esc(i.label)}</a></li>`).join('\n          ');
  for (const inst of instruments) {
    const html = tpl.replace(/\{\{(\w+)\}\}/g, (m, k) => {
      if (k === 'scales_html')   return scalesHtml(inst);
      if (k === 'pathways_html') return pathwaysHtml(inst);
      if (k === 'closing_html')  return closingHtml(inst);
      if (k === 'admin_html')    return adminHtml(inst);
      if (k === 'cite_html')     return citeHtml(inst);
      if (k === 'aside_html')    return asideHtml(inst.slug);
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

/* 404.html at the output root. Cloudflare Pages serves this file, with a real
   404 status, for any path that matches no asset.
   ⛔ Without it Pages falls back to index.html AND RETURNS 200. Measured on
   the live preview 2026-09-14: /about/, /this-page-does-not-exist and
   /banana/xyz all returned "200 OK" carrying the full homepage. Those are
   soft-404s — every typo and stale inbound link becomes another URL serving
   duplicate homepage content, Search Console reports them as indexable
   pages, and genuinely broken links never surface as errors.
   Rendered through the same page template as everything else so it carries
   the real header, nav and footer; emitted as a flat file rather than
   /404/index.html so it never enters the sitemap or becomes a reachable URL
   of its own. */
if (fs.existsSync(pageTpl)) {
  const esc404 = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const v = {
    title: esc404('Page not found — The Thriving Project'),
    description: esc404('That page does not exist on thrivingincollege.org. Links to the instruments, packages, research and contact details.'),
    path: '/404.html', eyebrow: 'Error 404', h1: 'We could not find that page',
    capsule_html: '', crumbs_html: '<li aria-current="page">Page not found</li>',
    crumbs_ld: '{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thrivingincollege.org/" }',
    jsonld_extra: '',
    body: `<p>The address may be mistyped, or the page may have moved when the site was rebuilt. Everything on the site is one step from here:</p>
      <ul>
        <li><a href="/instruments/">The seven Thriving Quotient instruments</a> — one for each campus population</li>
        <li><a href="/packages/">Packages and pricing</a>, and the <a href="/store/">store</a></li>
        <li><a href="/research/">Thriving Knowledge Center</a> — publications, presentations, dissertations and webinars</li>
        <li><a href="/for-researchers/">For researchers</a> — licensing an instrument for a dissertation or study</li>
        <li><a href="/about/laurie-schreiner/">About Dr. Laurie A. Schreiner</a></li>
      </ul>
      <p>If you followed a link from somewhere else and it brought you here, please
      <a href="/contact/">tell us where it came from</a> so we can fix it.</p>`,
  };
  for (const n of ['instruments', 'packages', 'research', 'store', 'about']) v['cur_' + n] = '';
  const html404 = fs.readFileSync(pageTpl, 'utf8').replace(/\{\{(\w+)\}\}/g, (mm, k) => {
    if (k in v) return v[k];
    throw new Error(`404 template: unknown token {{${k}}}`);
  });
  jobs.push({ rel: '404.html', dest: path.join(OUT, '404.html'), out: transform(html404, '404.html') });
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

// LAUNCH ONLY: the 301 ledger, an accurate sitemap and a permissive robots.txt
// at the site root. Staging carries none of these — it is noindex and lives
// under a prefix on another domain.
if (!STAGING) {
  const HOST = 'https://thrivingincollege.org';
  const redirects = fs.readFileSync(path.join(SRC, 'redirects.txt'), 'utf8');
  /* Every rule must be exactly: source <space> destination <space> code.
     20 Sept: column padding for the recovered PDF filenames overran its
     width, so destination and code ran together ("…pdf301"). Cloudflare took
     that as the destination and 302'd to a URL that does not exist — 9 of 17
     old Wix PDF links 404'd on the live site, found by testing them rather
     than by reading the file. A glued line is still "3 fields" to a careless
     check, so this asserts the CODE is a bare 3xx of its own. */
  const badRules = redirects.split('\n')
    .map((l, i) => ({ n: i + 1, l }))
    .filter(({ l }) => l.trim() && !l.trim().startsWith('#'))
    .filter(({ l }) => !/^\S+\s+\S+\s+(30[1278]|404|410)\s*$/.test(l));
  if (badRules.length) {
    console.error('redirects.txt: malformed rule(s) — need "source destination code":');
    for (const { n, l } of badRules) console.error(`  line ${n}: ${l}`);
    process.exit(1);
  }
  jobs.push({ rel: '_redirects', dest: path.join(OUT, '_redirects'), out: redirects });
  // Browsers, crawlers and link unfurlers probe /favicon.ico at the site root
  // whatever the page declares, so at launch it is served from there as well.
  // Staging cannot: its root is avataragency.ai, whose own icon is not ours.
  jobs.push({ rel: 'favicon.ico', dest: path.join(OUT, 'favicon.ico'),
              out: fs.readFileSync(path.join(SRC, 'assets', 'favicon.ico')), binary: true });
  // post-purchase, form-sent and staging-status pages never enter the sitemap
  const skip = /^(welcome|status)\/index\.html$|\/sent\/index\.html$/;
  const urls = jobs.filter(j => j.rel.endsWith('index.html') && !skip.test(j.rel.replace(/\\/g, '/')))
    .map(j => { const p = j.rel.replace(/\\/g, '/').replace(/index\.html$/, ''); return HOST + '/' + p; });
  const today = new Date().toISOString().slice(0, 10);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.sort().map(u => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join('\n') + '\n</urlset>\n';
  jobs.push({ rel: 'sitemap.xml', dest: path.join(OUT, 'sitemap.xml'), out: sitemap });
  jobs.push({ rel: 'robots.txt', dest: path.join(OUT, 'robots.txt'),
    out: `# The Thriving Project — all crawlers welcome, training bots included (v6 §11.5)\nUser-agent: *\nAllow: /\nDisallow: /welcome/\nDisallow: /packages/request-invoice/sent/\nDisallow: /contact/sent/\n\nSitemap: ${HOST}/sitemap.xml\n` });
}

/* ---- cache busting -------------------------------------------------------
 * Cloudflare Pages serves /css/*.css and /js/*.js with
 * `Cache-Control: public, max-age=14400, must-revalidate`. `must-revalidate`
 * does NOT mean "always ask" — it only applies once the four hours are up, so
 * for four hours after a deploy a returning browser keeps running the OLD
 * script and stylesheet without so much as a conditional request. That is how
 * two correct fixes could be live on the server and still absent on Michael's
 * phone (2026-09-11), which cost an entire debugging round.
 *
 * The HTML itself is `max-age=0, must-revalidate` and always revalidates, so
 * stamping each reference with a hash of the file's own bytes is enough: new
 * content means a new URL, and the browser cannot serve the old one against
 * it. Unchanged files keep their hash and stay cached, so this costs nothing
 * on a deploy that did not touch them.
 *
 * Safe against the Pages catch-all foot-gun documented in _headers: a query
 * string is a new CACHE key but the same FILE, which exists, so there is no
 * chance of caching an HTML fallback under it. */
const hashes = new Map();                       // "/css/home.css" -> "a1b2c3d4"
for (const j of jobs) {
  const web = '/' + j.rel.split(path.sep).join('/');
  // Stylesheets, scripts and the favicons. NOT the frame sequences — they are
  // 590 files and ~37 MB, they are referenced from JS rather than from an
  // attribute so they would never be rewritten anyway, and they are immutable
  // by design (a re-cut goes in a new directory). Hashing them would cost a
  // slow build for nothing.
  // Stylesheets, scripts, the favicons, and the hero film. The film matters
  // because round 2 REPLACED hero.mp4 in place: same name, different film, and
  // /assets/* is cached for seven days, so a returning visitor would have kept
  // playing round 1 for a week. Hashing the reference is what makes replacing
  // a file in place safe.
  if (!/\.(css|js)$/.test(web) && !/^\/assets\/(icon|favicon|hero|packages\/)/.test(web)) continue;
  hashes.set(web, crypto.createHash('sha256').update(j.out).digest('hex').slice(0, 8));
}
const bust = html => html.replace(
  /\b(href|src)="([^"?#]+\.(?:css|js|png|ico|jpg|mp4))"/g,
  (m, attr, url) => {
    // only our own built files; leave third-party (GA4) and absolute URLs alone
    const web = BASE && url.startsWith(BASE + '/') ? url.slice(BASE.length) : url;
    const h = hashes.get(web);
    return h ? `${attr}="${url}?v=${h}"` : m;
  });
for (const j of jobs) {
  if (typeof j.out === 'string' && /\.html$/.test(j.rel)) j.out = bust(j.out);
}

let changed = 0, same = 0;
for (const j of jobs) {
  let identical = false;
  if (fs.existsSync(j.dest)) {
    if (j.binary) identical = fs.readFileSync(j.dest).equals(j.out);
    else identical = fs.readFileSync(j.dest, 'utf8') === j.out;
  }
  if (identical) { same++; continue; }
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

// U.S. English on a U.S. site (17 Sept 2026). The first launch shipped
// "researcher licence", "research programme" and six other British forms in
// copy we wrote; her own site is American throughout. Fails the build rather
// than letting one ship again. See check-spelling.js for the word list.
{
  const r = require('child_process').spawnSync(process.execPath, [path.join(__dirname, 'check-spelling.js'), OUT], { encoding: 'utf8' });
  process.stdout.write(r.stdout || ''); process.stderr.write(r.stderr || '');
  if (r.status !== 0) { console.error('BUILD FAILED: British spelling in a served file (above).'); process.exit(1); }
}
