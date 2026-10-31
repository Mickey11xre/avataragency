#!/usr/bin/env node
/**
 * Harvard Investment Group — static site generator.
 *
 *   node clients/harvard/_build/build.js                      → preview build (root /clients/harvard, noindex)
 *   node clients/harvard/_build/build.js --final              → production build for harvardinvestmentgroup.com
 *                                                               (root "", indexable, sitemap + llms on the real domain)
 *
 * Writes the seven pages (index, about, investments, developments, philanthropic, contact, faq), llms.txt,
 * llms-full.txt and sitemap.xml next to this folder. CSS, JS, images and video are static files in assets/.
 * All copy lives in content.js. No dependencies.
 */
"use strict";
const fs = require("fs"), path = require("path");
const C = require("./content.js");
const { SITE, CONTACT_BLOCK, HOME, HERO, ABOUT, INVESTMENTS, DEVELOPMENTS, PHILANTHROPIC, CONTACT, IMG, FAQ, STAGE } = C;

const FINAL = process.argv.includes("--final");
const ROOT = FINAL ? "" : "/clients/harvard";                         // URL prefix for every internal link
const BASE = FINAL ? "https://harvardinvestmentgroup.com" : "https://avataragency.ai/clients/harvard";
const INDEXABLE = FINAL;
const V = 12;                                                        // ?v= for css/js (Cloudflare caches assets ~4 h)
const OUT = path.resolve(__dirname, "..");

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const u = (p) => ROOT + p;                                             // "/about/" → "/clients/harvard/about/"
const abs = (p) => BASE + p;
const pad = (n) => String(n).padStart(2, "0");

/** Responsive <img> for assets/img/<name>-<w>.webp */
function img(name, alt, o = {}) {
  const widths = o.widths || [800, 1600];
  const src = `${u("/assets/img/")}${name}-${widths[0]}.webp`;
  const srcset = widths.map((w) => `${u("/assets/img/")}${name}-${w}.webp ${w}w`).join(", ");
  const sizes = o.sizes || "(max-width: 900px) 100vw, 50vw";
  const load = o.eager ? `loading="eager" fetchpriority="high"` : `loading="lazy" decoding="async"`;
  return `<img src="${src}" srcset="${srcset}" sizes="${sizes}" alt="${esc(alt)}" ${load}${o.cls ? ` class="${o.cls}"` : ""}${o.style ? ` style="${o.style}"` : ""}>`;
}
/** Gallery item: a button that opens the theater with the 1600 file */
function gi(name, alt, o = {}) {
  const widths = o.widths || [800, 1600];
  const full = `${u("/assets/img/")}${name}-${widths[widths.length - 1]}.webp`;
  return `<button class="gi${o.cls ? " " + o.cls : ""}" type="button" data-full="${full}" data-cap="${esc(alt)}" aria-label="${esc("Open: " + alt)}">${img(name, alt, { widths, sizes: o.sizes || "(max-width: 900px) 50vw, 25vw" })}</button>`;
}
const icon = (id, cls = "") => `<svg class="${cls}" aria-hidden="true"><use href="#i-${id}"/></svg>`;

const NAV = [
  ["/", "Home"], ["/about/", "About"], ["/investments/", "Investments"], ["/developments/", "Developments"], ["/philanthropic/", "Philanthropic"], ["/contact/", "Contact"],
];

// Greg's own H monogram (the serif H with the swish, from the old site's logo file), cut to white and navy PNGs
const wordmark = (tag = "a", attrs = `href="${u("/")}"`) => `<${tag} class="brand" ${attrs} aria-label="${SITE.name} — home">
  <img class="logo-h" src="${u("/assets/img/logo-h-white.png")}" width="245" height="200" alt="" aria-hidden="true">
  <span class="brand-t">Harvard<span class="brand-sep"> </span>Investment<span class="brand-sep"> </span>Group</span>
</${tag}>`;

function header(current) {
  return `<header class="hdr" id="hdr">
  <div class="wrap hdr-in">
    ${wordmark()}
    <nav class="nav" aria-label="Primary">
      ${NAV.filter(([p]) => p !== "/").map(([p, l]) => `<a href="${u(p)}"${p === current ? ' aria-current="page"' : ""}>${l}</a>`).join("\n      ")}
      ${current === "/" ? "" : `<a class="btn btn-line btn-sm" href="${u("/#stage")}">Talk to ${STAGE.name}</a>`}
    </nav>
    <button class="burger" type="button" aria-expanded="false" aria-controls="menu" aria-label="Open menu"><span></span><span></span></button>
  </div>
  <div class="menu" id="menu" hidden>
    <nav aria-label="Menu">
      ${NAV.map(([p, l], i) => `<a href="${u(p)}" style="--i:${i}"${p === current ? ' aria-current="page"' : ""}>${l}</a>`).join("\n      ")}
      <a class="btn btn-gold" style="--i:${NAV.length}" href="${u("/#stage")}">Talk to ${STAGE.name}</a>
    </nav>
    <p class="menu-foot"><a href="mailto:${SITE.email}">${SITE.email}</a><a href="tel:${SITE.phoneTel}">${SITE.phoneDisplay}</a></p>
  </div>
</header>`;
}

function contactBlock(dark = false, talk = true) {   // every page (Michael, 10-30): the Harrison line links to the Home stage
  const h = CONTACT_BLOCK.home;
  const text = talk ? `${h.lead}<a class="cb-talk" href="${u("/#stage")}">${h.talk}</a>${h.rest}` : CONTACT_BLOCK.text;
  return `<section class="cblock${dark ? " cblock-dark" : ""}" aria-labelledby="cb-t">
  <div class="wrap cblock-in">
    <div class="rv">
      <p class="eyebrow">${CONTACT_BLOCK.title}</p>
      <h2 class="serif" id="cb-t">Looking for <em>more info?</em></h2>
      <p class="lede">${text}</p>
      <a class="btn btn-gold" href="${u("/contact/")}">Contact Us ${icon("arrow")}</a>
    </div>
    <dl class="cl rv">
      <div><dt>Email</dt><dd><a href="mailto:${SITE.email}">${SITE.email}</a></dd></div>
      <div><dt>Phone</dt><dd><a href="tel:${SITE.phoneTel}">${SITE.phoneDisplay}</a></dd></div>
      <div><dt>Office</dt><dd>6060 W Manchester Ave – Suite 304<br>Los Angeles, CA 90045</dd></div>
      <div><dt>Follow</dt><dd><a href="${SITE.linkedin}" target="_blank" rel="noopener">LinkedIn ${icon("ext", "ext")}</a></dd></div>
    </dl>
  </div>
</section>`;
}

function footer() {
  return `<footer class="ftr">
  <div class="wrap">
    <div class="ftr-top">
      ${wordmark("a", `href="${u("/")}"`)}
      <nav class="ftr-nav" aria-label="Footer">${NAV.map(([p, l]) => `<a href="${u(p)}">${l}</a>`).join("")}<a href="${u("/faq/")}">FAQ</a></nav>
    </div>
    <div class="ftr-mid">
      <p class="ftr-addr">6060 W Manchester Ave – Suite 304, Los Angeles, CA 90045 · <a href="tel:${SITE.phoneTel}">${SITE.phoneDisplay}</a> · <a href="mailto:${SITE.email}">${SITE.email}</a></p>
      <p class="ftr-netflix"><span class="nflx" aria-hidden="true">N</span><span>As seen on <a href="${SITE.netflix}" target="_blank" rel="noopener">Selling the OC, Season 3</a></span></p>
    </div>
    <div class="ftr-bot">
      <p>© ${new Date().getFullYear()} ${SITE.legal}. All rights reserved. Netflix is a registered trademark of Netflix, Inc.; its name is used here only to identify the series in which the Corona del Mar project appears.</p>
      <a class="credit" href="https://avataragency.ai/" target="_blank" rel="noopener">Site developed by AvatarAgency <img src="${u("/assets/img/avataragency-logo.webp")}" width="105" height="21" alt="AvatarAgency" loading="lazy"></a>
    </div>
  </div>
</footer>`;
}

const SPRITE = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
  <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h13m-5-5.5L18.5 12 13 17.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></symbol>
  <symbol id="i-left" viewBox="0 0 24 24"><path d="M19 12H6m5-5.5L5.5 12 11 17.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></symbol>
  <symbol id="i-close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></symbol>
  <symbol id="i-ext" viewBox="0 0 24 24"><path d="M14 5h5v5M19 5l-8 8M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></symbol>
  <symbol id="i-mic" viewBox="0 0 24 24"><rect x="9" y="3.5" width="6" height="11" rx="3" fill="currentColor"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></symbol>
  <symbol id="i-vol" viewBox="0 0 24 24"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></symbol>
  <symbol id="i-sound-off" viewBox="0 0 24 24"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M4 21L20 3" stroke="rgba(10,10,10,.9)" stroke-width="4" stroke-linecap="round"/><path d="M4 21L20 3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></symbol>
  <symbol id="i-play" viewBox="0 0 24 24"><path d="M8 5.5v13a.6.6 0 0 0 .9.5l10.4-6.5a.6.6 0 0 0 0-1L8.9 5a.6.6 0 0 0-.9.5z" fill="currentColor"/></symbol>
  <symbol id="i-chart" viewBox="0 0 24 24"><path d="M4 19h16M7 16V10M12 16V6M17 16v-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></symbol>
  <symbol id="i-building" viewBox="0 0 24 24"><path d="M4 20h16M6 20V5l6-2 6 2v15M9 8h2M13 8h2M9 12h2M13 12h2M11 20v-4h2v4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></symbol>
  <symbol id="i-heart" viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></symbol>
  <symbol id="i-phone" viewBox="0 0 24 24"><path d="M6.5 3.5h3l1.5 4-2 1.5a10 10 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2 2A14 14 0 0 1 4.5 5.5a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></symbol>
  <symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="10" r="2.2" fill="none" stroke="currentColor" stroke-width="1.5"/></symbol>
</svg>`;

const ORG_LD = () => ({
  "@type": "Organization", "@id": abs("/#org"), name: SITE.name, url: abs("/"), logo: abs("/assets/img/logo-h-navy.png"), image: abs("/assets/img/b2201-beach-2000.webp"),
  foundingDate: "1995", founder: { "@id": abs("/about/#greg") }, email: SITE.email, telephone: SITE.phoneTel,
  address: { "@type": "PostalAddress", streetAddress: SITE.address.street, addressLocality: SITE.address.city, addressRegion: SITE.address.region, postalCode: SITE.address.zip, addressCountry: SITE.address.country },
  areaServed: "Southern California", sameAs: [SITE.linkedin],
  description: "Harvard Investment Group, founded in 1995 by Greg Cullen, invests in value-added real estate and early stage businesses and develops luxury residential real estate in Southern California.",
});
const PERSON_LD = () => ({
  "@type": "Person", "@id": abs("/about/#greg"), name: "Greg Cullen", jobTitle: "Founder", worksFor: { "@id": abs("/#org") }, url: abs("/about/"), email: SITE.email, telephone: SITE.phoneTel, sameAs: [SITE.linkedin],
  alumniOf: [{ "@type": "CollegeOrUniversity", name: "Harvard Business School" }, { "@type": "CollegeOrUniversity", name: "Rose-Hulman Institute of Technology" }],
  knowsAbout: ["Real estate development", "Private equity", "Finance", "Negotiations", "Value creation"],
});
const crumbs = (items) => ({ "@type": "BreadcrumbList", itemListElement: items.map(([n, p], i) => ({ "@type": "ListItem", position: i + 1, name: n, item: abs(p) })) });

function layout({ path: p, title, desc, body, ld = [], bodyClass = "", current = p, ogImage }) {
  const graph = [ORG_LD(), PERSON_LD(), { "@type": "WebSite", "@id": abs("/#site"), url: abs("/"), name: SITE.name, publisher: { "@id": abs("/#org") } }, ...ld];
  return `<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
${INDEXABLE ? "" : '<meta name="robots" content="noindex, nofollow, noarchive">'}
<link rel="canonical" href="${abs(p)}">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${abs(p)}">
<meta property="og:image" content="${abs(ogImage || "/assets/img/b2201-beach-2000.webp")}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#071320">
<link rel="icon" href="${u("/assets/img/favicon.png")}" type="image/png" sizes="128x128">
<link rel="apple-touch-icon" href="${u("/assets/img/favicon.png")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${u("/assets/css/site.css")}?v=${V}">
<script>(function(d){var h=d.documentElement;h.className=h.className.replace('no-js','js');if((window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)||/[?&]rm=1/.test(location.search))h.classList.add('rm');})(document);</script>
<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph })}</script>
</head>
<body class="${bodyClass}" data-root="${ROOT}">
<a class="skip" href="#main">Skip to content</a>
${SPRITE}
${header(current)}
<main id="main">
${body}
</main>
${footer()}
<div class="theater" id="theater" role="dialog" aria-modal="true" aria-label="Photo viewer" hidden>
  <div class="theater-bg" data-close></div>
  <img class="theater-img" alt="" data-img>
  <p class="theater-cap" data-cap></p>
  <span class="theater-count" data-count></span>
  <button class="theater-x" type="button" data-close aria-label="Close">${icon("close")}</button>
  <button class="theater-prev" type="button" data-prev aria-label="Previous">${icon("left")}</button>
  <button class="theater-next" type="button" data-next aria-label="Next">${icon("arrow")}</button>
</div>
<script src="${u("/vendor/gsap.min.js")}" defer></script>
<script src="${u("/vendor/ScrollTrigger.min.js")}" defer></script>
<script src="${u("/vendor/lenis.min.js")}" defer></script>
<script src="${u("/assets/js/site.js")}?v=${V}" defer></script>
</body>
</html>
`;
}

/** Page hero with a still image, title, optional lede */
function pageHero({ eyebrow, title, lede, image, alt, pos = "center", tag }) {
  return `<section class="hero hero-page" aria-labelledby="h1">
  <div class="hero-media">${img(image, alt, { widths: [800, 1600], sizes: "100vw", eager: true, style: `object-position:${pos}` })}${tag ? `<span class="ai-tag">${tag}</span>` : ""}</div>
  <div class="hero-shade" aria-hidden="true"></div>
  <div class="wrap hero-copy">
    <p class="eyebrow gold">${eyebrow}</p>
    <h1 class="serif caps hero-title" id="h1">${title.map((l) => `<span class="ln"><span>${l}</span></span>`).join("")}</h1>
    ${lede ? `<p class="serif hero-lede">${lede}</p>` : ""}
  </div>
</section>`;
}

// ─────────────────── Stage panel views: a short version of each page, shown ON the panel ───────────────────
// Rendered here from the same content as the pages, so the panel never says anything the site doesn't. site.js
// clones these <template>s into the panel when a card is tapped or Harrison calls show_topic. No sale prices here:
// Harrison gives a price only when asked, so the panel says "Sold".
function panelViews() {
  const D = DEVELOPMENTS, P = PHILANTHROPIC, I = INVESTMENTS;
  const thumb = (name, alt) => `<img src="${u("/assets/img/")}${name}-800.webp" alt="${esc(alt)}" decoding="async">`;   // views are inserted on demand: load at once
  const strip = (name, alt, tag) => `<figure class="pv-strip">${img(name, alt, { sizes: "(max-width: 900px) 92vw, 420px" }).replace(/ loading="lazy"/, "")}${tag ? `<span class="ai-tag">${tag}</span>` : ""}</figure>`;
  const more = (href, label) => `<a class="pv-more" href="${u(href)}">${label} ${icon("arrow")}</a>`;
  const note = (interest, label) => `<button class="btn btn-gold pv-note" type="button" data-act="note" data-interest="${interest}">${label} ${icon("arrow")}</button>`;
  const row = (name, alt, title, sub, href) => `<a class="pv-row" href="${u(href)}">${thumb(name, alt)}<span><b>${title}</b><small>${sub}</small></span>${icon("arrow")}</a>`;
  const investing = `
    ${strip("b2201-15", IMG.b2201["15"])}
    <p class="pv-text">${I.paragraphs[0]}</p>
    <dl class="pv-kv">${I.ledger.slice(1, 4).map((x) => `<div><dt>${x.k}</dt><dd>${x.v}</dd></div>`).join("")}</dl>
    <p class="p-label">Sectors</p>
    <ul class="pv-chips">${I.sectors.map((s) => `<li>${s}</li>`).join("")}</ul>
    <div class="pv-acts">${note("Investing", "Send Greg’s office a note")}${more("/investments/", "See the full page")}</div>`;
  const development = `
    <p class="pv-text">${D.intro[0].split(". ").slice(0, 2).join(". ")}.</p>
    <div class="pv-rows">
      ${row("b2201-beach", IMG.beach.alt, D.b2201.title, "Corona del Mar · Brandon Architects · Sold", "/developments/#corona-del-mar")}
      ${row("b2209-40", IMG.b2209["40"], D.b2209.title, "Corona del Mar · Cape Cod estate · Sold", "/developments/#corona-del-mar")}
      ${row("hh-01", "The Hollywood Hills home designed by Tag Front", D.hollywood.title, "Designed by Tag Front · Sold", "/developments/#hollywood-hills")}
      ${row("hb-01", "The Hermosa Beach development above the ocean", D.hermosa.title, "Four-unit development · Sold", "/developments/#hermosa-beach")}
      ${row("rb-01", "The Redondo Beach townhome development", D.redondo.title, "Three-unit townhomes · Sold", "/developments/#redondo-beach")}
    </div>
    <p class="pv-text pv-small">The Corona del Mar project was featured on Netflix: <a href="${SITE.netflix}" target="_blank" rel="noopener">${D.netflixLabel}</a>.</p>
    <div class="pv-acts">${note("Development partnership", "Discuss a partnership")}${more("/developments/", "See the full page")}</div>`;
  const philanthropy = `
    ${strip("boh-team", "The Beacon of Hope team on the porch of the house in Los Angeles, under the Beacon of Hope sign", "AI image enhanced")}
    <p class="pv-text">${P.intro[0].match(/^.*?improve their lives\./)[0]}</p>
    <ul class="pv-list">
      <li><b>${P.beacon.title}</b><small>${P.beacon.place}</small></li>
      <li><b>${P.wabash.title}</b><small>${P.wabash.place}, Indiana</small></li>
      <li><b>${P.oasis.title}</b><small>${P.oasis.place}, Indiana</small></li>
      <li><b>${P.soad.title}</b><small>Schools across the Los Angeles area</small></li>
    </ul>
    <p class="pv-text pv-small">${P.donate}</p>
    <div class="pv-acts"><a class="btn btn-gold pv-note" href="${SITE.donateUrl}" target="_blank" rel="noopener">Donate ${icon("arrow")}</a>${more("/philanthropic/", "See the full page")}</div>`;
  return [["investing", investing], ["development", development], ["philanthropy", philanthropy]]
    .map(([k, h]) => `<template id="pv-${k}"><div class="pv">${h}\n    </div></template>`).join("\n      ");
}

// ─────────────────────────────────────────────── HOME ───────────────────────────────────────────────
function homePage() {
  const stage = `<section class="stage-sec" id="talk" aria-labelledby="t-stage">
  <div class="wrap">
    <div class="sec-head rv">
      <p class="eyebrow">${STAGE.eyebrow}</p>
      <h2 class="serif" id="t-stage">${STAGE.title[0]} <em>${STAGE.title[1]}</em></h2>
      <p class="lede">${STAGE.lede}</p>
    </div>
    <!-- Avatar stage per AVATAR-STAGE-SPEC v1.3. Talk fetches a session from data-token (site.js); while the agent is
         not live that endpoint answers 503 and the stage shows the "arriving soon" toast. The panel's four cards are
         also driven by Harrison (topic highlight, contact form) and the form posts to data-contact. -->
    <div class="stage rv" id="stage" data-name="${esc(STAGE.name)}"${STAGE.intro ? ` data-intro="${u(STAGE.intro)}"` : ""} data-token="/api/hig-harrison-token" data-seen-path="/api" data-contact="${u("/api/contact")}" data-popout="${u("/vendor/avatar-popout.js")}?v=${V}" data-office-phone="${esc(SITE.phoneDisplay)}" data-office-email="${esc(SITE.email)}">
      <div class="stage-av${STAGE.intro ? "" : " is-placeholder"}"${STAGE.poster ? ` style="background:#050505 url(${u(STAGE.poster)}) center / cover no-repeat"` : ""}>
        <div class="ava-mount" id="hig-mount"></div>
        <video class="ava-video" muted loop playsinline preload="none"${STAGE.poster ? ` poster="${u(STAGE.poster)}"` : ""}${STAGE.intro ? ` aria-label="${esc(STAGE.name)}, Harvard Investment Group’s AI agent, introducing himself"` : " hidden"}></video>
        ${STAGE.intro ? "" : `<div class="ava-ph" aria-hidden="true"><svg viewBox="0 0 200 200"><defs><linearGradient id="phg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#B8975A" stop-opacity=".55"/><stop offset="1" stop-color="#B8975A" stop-opacity="0"/></linearGradient></defs><circle cx="100" cy="74" r="30" fill="url(#phg)"/><path d="M38 200c6-44 30-70 62-70s56 26 62 70z" fill="url(#phg)"/></svg><span>Avatar host · arriving soon</span></div>`}
        <div class="ava-badge"><span class="ava-dot"></span>${esc(STAGE.name)} · ${STAGE.badge}</div>
        <div class="ava-caption" aria-live="polite"></div>
        <div class="ava-toast" role="status" hidden></div>
        <button class="ava-sound" type="button" aria-pressed="false" aria-label="Play ${esc(STAGE.name)}’s introduction with sound" title="Play ${esc(STAGE.name)}’s introduction with sound"${STAGE.intro ? "" : " hidden"}>${icon("sound-off")}<span class="ava-sound-label" aria-hidden="true">Muted</span></button>
        <div class="ava-ctrls"><button class="ava-btn ava-talk" type="button">${icon("mic")}<span>Talk to ${esc(STAGE.name)}</span></button></div>
      </div>
      <aside class="panel is-home" id="hig-panel" aria-label="Options">
        <div class="panel-head">
          <button class="panel-back" type="button" hidden aria-label="Back">${icon("arrow")}</button>
          <span class="panel-title"></span>
        </div>
        <div class="panel-body" aria-live="polite" data-lenis-prevent>
          <p class="p-sub">${STAGE.home}</p>
          <div class="p-actions">
            ${STAGE.cards.map((c) => `<a class="p-act" href="${u(c.href)}" data-topic="${c.topic}"><i>${icon(c.icon)}</i><span><b>${c.title}</b><small>${c.sub}</small></span>${icon("arrow")}</a>`).join("\n            ")}
          </div>
        </div>
        <p class="panel-note">${STAGE.note}</p>
      </aside>
      ${panelViews()}
      <script type="application/json" id="pv-titles">${JSON.stringify(STAGE.viewTitles)}</script>
    </div>
  </div>
</section>`;

  // The ambient loop layer is FIXED behind the whole page (livebrand.ai pattern): the hero sits on it, and three
  // transparent .peek breaks further down let it show through again as the visitor scrolls. site.js cycles the clips.
  const clips = HERO.clips.map((c) => ({ src: u(c.src), small: u(c.small || c.src), poster: u(`/assets/img/${c.poster}-2000.webp`), label: c.label }));
  const peek = (i) => `<div class="peek" aria-hidden="true"><div class="wrap"><p class="eyebrow gold peek-cap" data-peek>${HERO.peeks[i] || ""}</p></div></div>`;
  const body = `<div class="ambient" data-ambient data-clips='${JSON.stringify(clips).replace(/'/g, "&#39;")}' aria-hidden="true">
  <img class="amb-poster" src="${clips[0].poster}" alt="" fetchpriority="high">
  <video class="amb-v is-on" muted playsinline preload="metadata" poster="${clips[0].poster}"></video>
  <video class="amb-v" muted playsinline preload="none"></video>
  <div class="amb-shade"></div>
</div>

<section class="hero hero-home" aria-labelledby="h1">
  <div class="wrap hero-grid">
    <div class="hero-copy" data-hero-copy>
      <p class="eyebrow gold">${HOME.eyebrow}</p>
      <h1 class="serif caps hero-title hero-title-xl" id="h1"><span class="ln"><span>Harvard</span></span><span class="ln"><span>Investment</span></span><span class="ln"><span>Group</span></span></h1>
      <p class="serif hero-lede">${HOME.tagline}</p>
      <div class="hero-ctas">
        <a class="btn btn-gold" href="${u("/developments/")}">Our developments</a>
        <a class="btn btn-ghost" href="${u("/investments/")}">Invest with us</a>
      </div>
    </div>
    <!-- Harrison's welcome film: loops muted (720 file under 900 px, picked natively by the <source media>), the standard
         sound icon replays it from 0:00 with sound, and "Talk to Harrison" sits directly under it and jumps to the stage. -->
    <div class="hero-film-col" data-hero-film>
      <figure class="hero-film" data-film>
        <video class="film-v" autoplay muted loop playsinline preload="metadata" poster="${u(`/assets/img/${HERO.film.poster}-1600.webp`)}" aria-label="${esc(HERO.film.title)}: ${esc(HERO.film.note)}">
          <source src="${u(HERO.film.small)}" type="video/mp4" media="(max-width: 900px)">
          <source src="${u(HERO.film.src)}" type="video/mp4">
          ${img(HERO.film.poster, HERO.film.alt, { widths: [800, 1600], sizes: "(max-width: 900px) 100vw, 46vw", eager: true })}
        </video>
        <button class="ava-sound film-sound" type="button" aria-pressed="false" aria-label="Play the welcome film with sound" title="Play the welcome film with sound">${icon("sound-off")}<span class="ava-sound-label" aria-hidden="true">Muted</span></button>
        <figcaption><span class="eyebrow gold">${HERO.film.eyebrow}</span><b class="serif">${HERO.film.title}</b></figcaption>
      </figure>
      <div class="film-under">
        <a class="btn btn-gold" href="${u("/#stage")}" data-talk>${icon("mic")} ${HERO.film.cta}</a>
        <p>${HERO.film.note}</p>
      </div>
    </div>
  </div>
  <div class="scroll-cue" aria-hidden="true"><span>Scroll</span><i></i></div>
</section>

<section class="sec about-band" id="about" aria-labelledby="t-about">
  <div class="wrap split-5-7">
    <div class="rv">
      <p class="eyebrow">About Us</p>
      <h2 class="serif" id="t-about">${HOME.aboutTitle[0]} <em>${HOME.aboutTitle[1]}</em></h2>
      <span class="rule" aria-hidden="true"></span>
      <a class="tlink" href="${u("/about/")}">Read more ${icon("arrow")}</a>
    </div>
    <div>
      <p class="big rv">${HOME.about}</p>
      <div class="tiles rv">
        ${HOME.tiles.map((t) => `<div><p class="serif tile-big" data-count="${/^\d+$/.test(t.big) ? t.big : ""}">${t.big}${t.sup ? `<sup>${t.sup}</sup>` : ""}</p><p class="eyebrow mute">${t.label}</p></div>`).join("\n        ")}
      </div>
    </div>
  </div>
</section>

${peek(0)}

<section class="sec sec-dark feat" id="featured" aria-labelledby="t-feat">
  <div class="wrap">
    <div class="feat-head rv">
      <div><p class="eyebrow gold">Featured development · Corona del Mar</p><h2 class="serif caps" id="t-feat">2201 Bayside</h2></div>
      <p class="serif sold">${DEVELOPMENTS.b2201.sold}</p>
    </div>
  </div>
  <div class="feat-pin" data-pin>
    <div class="wrap feat-layers">
      <figure class="fl fl-a" data-from="left">${img("b2201-13", IMG.b2201["13"], { sizes: "(max-width: 900px) 100vw, 68vw" })}</figure>
      <figure class="fl fl-b" data-from="right">${img("b2201-03", IMG.b2201["03"], { sizes: "(max-width: 900px) 70vw, 38vw" })}</figure>
      <figure class="fl fl-c" data-from="bottom">${img("b2201-20", IMG.b2201["20"], { sizes: "(max-width: 900px) 50vw, 26vw" })}</figure>
    </div>
  </div>
  <div class="wrap split-7-5 feat-copy">
    <p class="big on-dark rv">${DEVELOPMENTS.b2201.text}</p>
    <div class="facts facts-dark rv">
      ${DEVELOPMENTS.b2201.facts.slice(0, 4).map(([k, v]) => `<div><span>${k}</span><span>${v}</span></div>`).join("")}
      <div><span>Featured on</span><span>Netflix · Selling the OC, Season 3</span></div>
      <a class="btn btn-line" href="${u("/developments/#bayside-2201")}">See all developments</a>
    </div>
  </div>
</section>

<section class="sec duo" aria-label="Investments and Developments">
  <div class="wrap duo-grid">
    <a class="duo-card rv-img" href="${u("/investments/")}">
      ${img("b2201-15", IMG.b2201["15"], { sizes: "(max-width: 900px) 100vw, 50vw" })}
      <span class="duo-txt"><span class="eyebrow gold">Investments</span><span class="serif duo-t">Capital and expertise for value-added real estate and early stage businesses.</span><span class="tlink">Learn more ${icon("arrow")}</span></span>
    </a>
    <a class="duo-card rv-img" href="${u("/developments/")}">
      ${img("b2201-02", IMG.b2201["02"], { sizes: "(max-width: 900px) 100vw, 50vw" })}
      <span class="duo-txt"><span class="eyebrow gold">Developments</span><span class="serif duo-t">Vertically integrated development, from land to the last finish.</span><span class="tlink">Learn more ${icon("arrow")}</span></span>
    </a>
  </div>
</section>

${peek(1)}

${stage}

<section class="sec phil-band" aria-labelledby="t-phil">
  <div class="wrap split-7-5">
    <figure class="phil-img rv-img">${img("boh-team", "The Beacon of Hope team on the porch of the charity's Victorian residence west of downtown Los Angeles", { sizes: "(max-width: 900px) 100vw, 58vw" })}<span class="ai-tag">AI image enhanced</span></figure>
    <div class="rv">
      <p class="eyebrow">Philanthropic</p>
      <h2 class="serif" id="t-phil">Hope for <em>the Hurting.</em></h2>
      <p class="lede">${PHILANTHROPIC.intro[0]}</p>
      <div class="ctas"><a class="btn btn-dark" href="${SITE.donateUrl || u("/contact/")}"${SITE.donateUrl ? ' target="_blank" rel="noopener"' : ""}>Donate</a><a class="tlink" href="${u("/philanthropic/")}">Our initiatives ${icon("arrow")}</a></div>
    </div>
  </div>
</section>

${peek(2)}

${contactBlock(false)}`;

  return layout({
    path: "/", current: "/", title: "Harvard Investment Group | Real Estate Investment & Development, Southern California",
    desc: "Harvard Investment Group, founded in 1995 by Greg Cullen, invests in value-added real estate and early stage businesses and develops luxury residential real estate in Southern California, including 2201 and 2209 Bayside Drive in Corona del Mar.",
    body, bodyClass: "page-home", ld: [crumbs([["Home", "/"]])],
  });
}

// ─────────────────────────────────────────────── ABOUT ──────────────────────────────────────────────
function aboutPage() {
  const body = `<section class="hero hero-about" aria-labelledby="h1">
  <div class="wrap about-hero-in">
    <!-- Portrait: OPTION_A of the 10-30 set (Nano Banana Pro job 809eff5d, from Greg's two headshots aged to his late 50s),
         in the 2201 great room. For Greg's approval; OPTION_B/C are in the REVIEW folder. -->
    <figure class="portrait rv-img">
      <img src="${u("/assets/img/greg-portrait-1200.webp")}" srcset="${u("/assets/img/greg-portrait-800.webp")} 800w, ${u("/assets/img/greg-portrait-1200.webp")} 1200w" sizes="(max-width: 900px) 340px, 40vw" width="1200" height="1600" alt="Greg Cullen, founder of Harvard Investment Group, in the great room of 2201 Bayside Drive" loading="eager" fetchpriority="high">
    </figure>
    <div class="about-hero-copy">
      <p class="eyebrow gold">Founder · Harvard Investment Group</p>
      <h1 class="serif caps hero-title" id="h1"><span class="ln"><span>Greg</span></span><span class="ln"><span>Cullen</span></span></h1>
      <p class="serif hero-lede">Investor, developer and builder. Harvard Business School, 1989. Over thirty years in private equity and real estate development.</p>
      <ul class="cstrip">
        <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
        <li><a href="tel:${SITE.phoneTel}">${SITE.phoneDisplay}</a></li>
        <li><a href="${SITE.linkedin}" target="_blank" rel="noopener">LinkedIn ${icon("ext", "ext")}</a></li>
      </ul>
    </div>
  </div>
</section>

<section class="sec bio" aria-labelledby="t-bio">
  <div class="wrap split-5-7">
    <div class="rv"><p class="eyebrow">About</p><h2 class="serif" id="t-bio">Three decades of <em>value creation.</em></h2><span class="rule" aria-hidden="true"></span></div>
    <div class="prose">${ABOUT.paragraphs.map((p) => `<p class="rv">${p}</p>`).join("\n      ")}</div>
  </div>
</section>

<section class="sec sec-dark ledger-sec" aria-labelledby="t-ledger">
  <div class="wrap">
    <div class="sec-head rv"><p class="eyebrow gold">Credentials</p><h2 class="serif" id="t-ledger">The record.</h2></div>
    <dl class="ledger">
      ${ABOUT.ledger.map((r) => `<div class="rv"><dt class="serif">${r.year}</dt><dd>${r.text}${r.link ? ` <a href="${r.link.href}" target="_blank" rel="noopener">${r.link.label} ${icon("ext", "ext")}</a>` : ""}</dd></div>`).join("\n      ")}
    </dl>
  </div>
</section>

<section class="sec quote-band" aria-label="Harvard Investment Group">
  <div class="wrap rv">
    <p class="serif quote">“Harvard Investment Group was founded in 1995 to make direct investments and provide services to early stage corporations and real estate ventures.”</p>
    <div class="ctas"><a class="btn btn-gold" href="${u("/investments/")}">Investments</a><a class="btn btn-ghost-dark" href="${u("/developments/")}">Developments</a></div>
  </div>
</section>

${contactBlock(false)}`;
  return layout({
    path: "/about/", title: "About Greg Cullen | Founder, Harvard Investment Group",
    desc: "Greg Cullen founded Harvard Investment Group in 1995. Harvard Business School MBA, former Citibank and ING Capital, licensed contractor and real estate broker, with over thirty years in private equity and real estate development.",
    body, bodyClass: "page-about", ld: [crumbs([["Home", "/"], ["About", "/about/"]])], ogImage: "/assets/img/greg-placeholder-bw.webp",
  });
}

// ─────────────────────────────────────────── INVESTMENTS ────────────────────────────────────────────
function investmentsPage() {
  const body = `${pageHero({ eyebrow: "Investments", title: ["Investment", "Focus"], lede: "Capital and management expertise for value-added real estate and early stage businesses.", image: "b2201-15", alt: IMG.b2201["15"], pos: "center 40%" })}

<section class="sec" aria-labelledby="t-inv">
  <div class="wrap split-5-7">
    <div class="rv"><p class="eyebrow">${INVESTMENTS.eyebrow}</p><h2 class="serif" id="t-inv">Where capital meets <em>expertise.</em></h2><span class="rule" aria-hidden="true"></span></div>
    <div class="prose">
      <p class="rv">${INVESTMENTS.paragraphs[0]}</p>
      <figure class="inline-img rv-img">${img("b2201-03", IMG.b2201["03"], { sizes: "(max-width: 900px) 100vw, 58vw" })}</figure>
      <p class="rv">${INVESTMENTS.paragraphs[1]}</p>
      <p class="rv">${INVESTMENTS.paragraphs[2]}</p>
    </div>
  </div>
</section>

<section class="sec sec-dark" aria-labelledby="t-how">
  <div class="wrap split-5-7">
    <div class="rv"><p class="eyebrow gold">At a glance</p><h2 class="serif" id="t-how">How we invest.</h2></div>
    <dl class="kv">${INVESTMENTS.ledger.map((r) => `<div class="rv"><dt>${r.k}</dt><dd>${r.v}</dd></div>`).join("")}</dl>
  </div>
  <div class="wrap sectors rv">
    <p class="eyebrow gold">Sectors invested in</p>
    <ul>${INVESTMENTS.sectors.map((s) => `<li>${s}</li>`).join("")}</ul>
  </div>
</section>

<section class="sec duo" aria-label="Developments">
  <div class="wrap">
    <a class="duo-card duo-wide rv-img" href="${u("/developments/")}">
      ${img("b2209-09", IMG.b2209["09"], { sizes: "100vw" })}
      <span class="duo-txt"><span class="eyebrow gold">Developments</span><span class="serif duo-t">See the real estate the Company has developed, from Corona del Mar to the South Bay.</span><span class="tlink">Our developments ${icon("arrow")}</span></span>
    </a>
  </div>
</section>

${contactBlock(false)}`;
  return layout({
    path: "/investments/", title: "Investments | Harvard Investment Group",
    desc: "Harvard Investment Group invests from the mid-five figures to seven figures in value-added real estate and early stage businesses, bringing deal structuring, valuation, financial engineering and board-level support.",
    body, bodyClass: "page-investments", ld: [crumbs([["Home", "/"], ["Investments", "/investments/"]])],
  });
}

// ─────────────────────────────────────────── DEVELOPMENTS ───────────────────────────────────────────
function developmentsPage() {
  const D = DEVELOPMENTS;
  const range = (prefix, n, altFn, o) => Array.from({ length: n }, (_, i) => gi(`${prefix}-${pad(i + 1)}`, altFn(i + 1), o)).join("\n      ");
  const b2201Keys = ["02", "03", "04", "05", "06", "07", "08", "12", "13", "14", "15", "18", "19", "20", "27", "29", "37", "38", "39"];
  const b2201All = Array.from({ length: 39 }, (_, i) => pad(i + 1));
  const projectNav = [["#corona-del-mar", "Corona del Mar"], ["#bayside-2201", "Bayside 2201"], ["#bayside-2209", "Bayside 2209"], ["#hollywood-hills", "Hollywood Hills"], ["#hermosa-beach", "Hermosa Beach"], ["#redondo-beach", "Redondo Beach"]];

  const body = `${pageHero({ eyebrow: "Developments", title: ["Developing", "Southern California"], lede: "Vertically integrated development: acquisition, design, entitlements, construction and sales.", image: "b2201-14", alt: IMG.b2201["14"], pos: "center 60%" })}

<section class="sec" aria-labelledby="t-dev">
  <div class="wrap split-5-7">
    <div class="rv"><p class="eyebrow">${D.eyebrow}</p><h2 class="serif" id="t-dev">From unrealized potential <em>to finished product.</em></h2><span class="rule" aria-hidden="true"></span></div>
    <div class="prose">
      ${D.intro.map((p) => `<p class="rv">${p}</p>`).join("\n      ")}
      <p class="rv">${D.showcase}</p>
      <p class="rv netflix-line">${D.netflixLine} <a href="${SITE.netflix}" target="_blank" rel="noopener"><span class="nflx" aria-hidden="true">N</span>${D.netflixLabel} ${icon("ext", "ext")}</a></p>
    </div>
  </div>
  <div class="wrap">
    <nav class="chips rv" aria-label="Projects">${projectNav.map(([h, l]) => `<a href="${h}">${l}</a>`).join("")}</nav>
  </div>
</section>

<section class="sec sec-dark proj" id="corona-del-mar" aria-labelledby="t-cdm">
  <div class="wrap">
    <div class="proj-head rv"><div><p class="eyebrow gold">Newport Harbor</p><h2 class="serif caps" id="t-cdm">${D.cdm.title}</h2></div><p class="lede on-dark">${D.cdm.text}</p></div>
    <div class="gal gal-strip" data-gal="cdm" aria-label="Corona del Mar, building the two estates">
      ${range("cdm", IMG.cdm, (i) => `Corona del Mar development, photograph ${i} of ${IMG.cdm}`, { sizes: "(max-width: 900px) 70vw, 30vw" })}
    </div>
  </div>
</section>

<section class="sec sec-dark proj proj-2201" id="bayside-2201" aria-labelledby="t-2201">
  <div class="wrap">
    <div class="feat-head rv"><div><p class="eyebrow gold">Corona del Mar · Modern</p><h2 class="serif caps" id="t-2201">${D.b2201.title}</h2></div><p class="serif sold">${D.b2201.sold}</p></div>
    <div class="mosaic" data-gal="b2201">
      ${gi("b2201-20", IMG.b2201["20"], { cls: "m-a", sizes: "(max-width: 900px) 100vw, 58vw" })}
      ${gi("b2201-37", IMG.b2201["37"], { cls: "m-b", sizes: "(max-width: 900px) 50vw, 20vw" })}
      ${gi("b2201-04", IMG.b2201["04"], { cls: "m-c", sizes: "(max-width: 900px) 50vw, 20vw" })}
      ${gi("b2201-02", IMG.b2201["02"], { cls: "m-d", sizes: "(max-width: 900px) 100vw, 40vw" })}
      ${gi("b2201-07", IMG.b2201["07"], { cls: "m-e", sizes: "(max-width: 900px) 50vw, 30vw" })}
      ${gi("b2201-13", IMG.b2201["13"], { cls: "m-f", sizes: "(max-width: 900px) 50vw, 30vw" })}
      ${gi("b2201-03", IMG.b2201["03"], { cls: "m-g", sizes: "(max-width: 900px) 100vw, 40vw" })}
      ${gi(IMG.beach.name, IMG.beach.alt, { cls: "m-h", widths: IMG.beach.widths, sizes: "(max-width: 900px) 100vw, 60vw" })}
    </div>
    <div class="split-7-5 proj-copy">
      <p class="big on-dark rv">${D.b2201.text}</p>
      <dl class="facts facts-dark rv">${D.b2201.facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>
    </div>
    <details class="more rv">
      <summary><span>All 39 photographs of 2201 Bayside</span>${icon("arrow")}</summary>
      <div class="gal gal-dense" data-gal="b2201-all">
        ${b2201All.map((k) => gi(`b2201-${k}`, IMG.b2201[k] || `2201 Bayside Drive, photograph ${Number(k)} of 39`, { sizes: "(max-width: 900px) 33vw, 16vw" })).join("\n        ")}
      </div>
    </details>
  </div>
</section>

<section class="sec proj proj-2209" id="bayside-2209" aria-labelledby="t-2209">
  <div class="wrap">
    <div class="feat-head rv"><div><p class="eyebrow">Corona del Mar · Cape Cod</p><h2 class="serif caps" id="t-2209">${D.b2209.title}</h2></div><p class="serif sold">${D.b2209.sold}</p></div>
    <div class="mosaic mosaic-3" data-gal="b2209">
      ${gi("b2209-40", IMG.b2209["40"], { cls: "m-a", sizes: "(max-width: 900px) 100vw, 60vw" })}
      ${gi("b2209-28", IMG.b2209["28"], { cls: "m-b", sizes: "(max-width: 900px) 50vw, 20vw" })}
      ${gi("b2209-33", IMG.b2209["33"], { cls: "m-c", sizes: "(max-width: 900px) 50vw, 20vw" })}
    </div>
    <div class="split-7-5 proj-copy">
      <p class="big rv">${D.b2209.text}</p>
      <div class="rv"><p class="eyebrow">Design</p><p>Brandon Architects · Brooke Wagner Design</p><p class="eyebrow" style="margin-top:18px">Program</p><p>Six bedrooms · eight bathrooms · four levels · rooftop deck · wine room · elevator · 6-car garage</p></div>
    </div>
    <div class="gal gal-3" data-gal="b2209-gal" aria-label="2209 Bayside photographs">
      ${["58", "50", "62", "15", "09", "10", "24", "19", "36"].map((k) => gi(`b2209-${k}`, IMG.b2209[k], { sizes: "(max-width: 900px) 50vw, 25vw" })).join("\n      ")}
    </div>
  </div>
</section>

<section class="sec sec-dark proj" id="hollywood-hills" aria-labelledby="t-hh">
  <div class="wrap">
    <div class="proj-head rv"><div><p class="eyebrow gold">Los Angeles</p><h2 class="serif caps" id="t-hh">${D.hollywood.title}</h2><p class="serif sold">Sold</p></div><p class="lede on-dark">${D.hollywood.text}</p></div>
    <div class="gal gal-feature" data-gal="hh">
      ${range("hh", IMG.hh, (i) => `Hollywood Hills residence by Tag Front, photograph ${i} of ${IMG.hh}`, { sizes: "(max-width: 900px) 50vw, 33vw" })}
    </div>
  </div>
</section>

<section class="sec proj" id="hermosa-beach" aria-labelledby="t-hb">
  <div class="wrap">
    <div class="proj-head rv"><div><p class="eyebrow">South Bay</p><h2 class="serif caps" id="t-hb">${D.hermosa.title}</h2><p class="serif sold">Sold</p></div><p class="lede">${D.hermosa.text}</p></div>
    <div class="gal gal-feature" data-gal="hb">
      ${range("hb", IMG.hb, (i) => `Hermosa Beach four-unit development, photograph ${i} of ${IMG.hb}`, { sizes: "(max-width: 900px) 50vw, 33vw" })}
    </div>
  </div>
</section>

<section class="sec sec-dark proj" id="redondo-beach" aria-labelledby="t-rb">
  <div class="wrap">
    <div class="proj-head rv"><div><p class="eyebrow gold">South Bay</p><h2 class="serif caps" id="t-rb">${D.redondo.title}</h2><p class="serif sold">Sold</p></div><p class="lede on-dark">${D.redondo.text}</p></div>
    <div class="gal gal-feature" data-gal="rb">
      ${range("rb", IMG.rb, (i) => `Redondo Beach three-unit townhome development, photograph ${i} of ${IMG.rb}`, { sizes: "(max-width: 900px) 50vw, 33vw" })}
    </div>
  </div>
</section>

${contactBlock(false)}`;

  const ld = [crumbs([["Home", "/"], ["Developments", "/developments/"]]), {
    "@type": "ItemList", name: "Developments by Harvard Investment Group", itemListElement: [
      ["Corona del Mar: Bayside 2201", "/developments/#bayside-2201"], ["Corona del Mar: Bayside 2209", "/developments/#bayside-2209"], ["Hollywood Hills", "/developments/#hollywood-hills"], ["Hermosa Beach", "/developments/#hermosa-beach"], ["Redondo Beach", "/developments/#redondo-beach"],
    ].map(([n, p], i) => ({ "@type": "ListItem", position: i + 1, name: n, url: abs(p) })),
  }];
  return layout({
    path: "/developments/", title: "Developments | Harvard Investment Group",
    desc: "A showcase of Harvard Investment Group's developments: 2201 and 2209 Bayside Drive on the sands of Newport Harbor in Corona del Mar (featured on Netflix's Selling the OC), the Hollywood Hills, Hermosa Beach and Redondo Beach.",
    body, bodyClass: "page-developments", ld, ogImage: "/assets/img/b2201-14-1600.webp",
  });
}

// ─────────────────────────────────────────── PHILANTHROPIC ──────────────────────────────────────────
function philanthropicPage() {
  const P = PHILANTHROPIC;
  const range = (prefix, n, altFn, o) => Array.from({ length: n }, (_, i) => gi(`${prefix}-${pad(i + 1)}`, altFn(i + 1), o)).join("\n      ");
  const donateHref = SITE.donateUrl || u("/contact/");
  // Header image: the Beacon of Hope team on the porch under the sign (AI composite from a team video frame + the house
  // photo, Nano Banana Pro job f85f2ae5, 10-30; for Greg's review, pending the team's consent). The untouched house
  // photo stays in the Beacon gallery below.
  const body = `${pageHero({ eyebrow: "Philanthropic", title: ["Hope for", "the Hurting"], lede: "A 501(c)(3) charitable organization formed by Mr. Cullen in 2015 to assist the less fortunate among us.", image: "boh-team", alt: "The Beacon of Hope team on the porch of the house in Los Angeles, under the Beacon of Hope sign", pos: "center 40%", tag: "AI image enhanced" })}

<section class="sec" id="about-the-charity" aria-labelledby="t-ph">
  <div class="wrap split-5-7">
    <div class="rv"><p class="eyebrow">${P.eyebrow}</p><h2 class="serif" id="t-ph">A foundation for people <em>to improve their lives.</em></h2><span class="rule" aria-hidden="true"></span></div>
    <div class="prose">
      ${P.intro.map((p) => `<p class="rv">${p}</p>`).join("\n      ")}
      <div class="donate rv" id="donate">
        <p>${P.donate} <a href="${u("/contact/")}">${P.donateLink}</a></p>
        <a class="btn btn-gold" href="${donateHref}"${SITE.donateUrl ? ' target="_blank" rel="noopener"' : ""}>Donate ${icon("arrow")}</a>
      </div>
      <p class="rv">${P.initiativesLine}</p>
    </div>
  </div>
</section>

<section class="sec sec-dark proj" id="beacon-of-hope" aria-labelledby="t-boh">
  <div class="wrap">
    <div class="proj-head rv"><div><p class="eyebrow gold">${P.beacon.place}</p><h2 class="serif caps" id="t-boh">${P.beacon.title}</h2><a class="tlink gold" href="${P.beacon.site}" target="_blank" rel="noopener">beaconofhope.la ${icon("ext", "ext")}</a></div><p class="lede on-dark">${P.beacon.text}</p></div>
    <div class="gal gal-2" data-gal="boh">
      ${gi("boh-01", "Beacon of Hope, the Victorian residence west of downtown Los Angeles", { sizes: "(max-width: 900px) 100vw, 50vw" })}
      ${gi("boh-02", "The front lobby of Beacon of Hope", { sizes: "(max-width: 900px) 100vw, 50vw" })}
    </div>
  </div>
</section>

<section class="sec proj" id="wabash-recovery" aria-labelledby="t-wab">
  <div class="wrap">
    <div class="proj-head rv"><div><p class="eyebrow">${P.wabash.place}, Indiana · ${P.wabash.sub}</p><h2 class="serif caps" id="t-wab">${P.wabash.title}</h2><a class="tlink" href="${P.wabash.link}" target="_blank" rel="noopener">${P.wabash.linkLabel} ${icon("ext", "ext")}</a></div><p class="lede">${P.wabash.text}</p></div>
    <p class="eyebrow ba-label rv">Before</p>
    <div class="gal gal-4" data-gal="wab-before">
      ${range("wab-before", IMG.wabBefore, (i) => `Wabash Recovery before the renovation: the unused church building in Kokomo, photograph ${i} of ${IMG.wabBefore}`, { widths: [800, 1020], sizes: "(max-width: 900px) 50vw, 25vw" })}
    </div>
    <p class="eyebrow ba-label rv">After</p>
    <div class="gal gal-4" data-gal="wab-after">
      ${range("wab-after", IMG.wabAfter, (i) => `Wabash Recovery after the renovation, photograph ${i} of ${IMG.wabAfter}`, { sizes: "(max-width: 900px) 50vw, 25vw" })}
    </div>
  </div>
</section>

<section class="sec sec-dark proj" id="oasis-recovery" aria-labelledby="t-oasis">
  <div class="wrap">
    <div class="proj-head rv"><div><p class="eyebrow gold">${P.oasis.place}, Indiana</p><h2 class="serif caps" id="t-oasis">${P.oasis.title}</h2></div><p class="lede on-dark">${P.oasis.text}</p></div>
    <div class="gal gal-feature" data-gal="oasis">
      ${range("oasis", IMG.oasis, (i) => `Oasis Recovery: two homes on five acres in rural Indiana, photograph ${i} of ${IMG.oasis}`, { sizes: "(max-width: 900px) 50vw, 33vw" })}
    </div>
  </div>
</section>

<section class="sec proj" id="strike-out-against-drugs" aria-labelledby="t-soad">
  <div class="wrap">
    <div class="proj-head rv"><div><p class="eyebrow">Los Angeles schools</p><h2 class="serif caps" id="t-soad">${P.soad.title}</h2><p class="soad-abbr">${P.soad.abbr}</p></div><p class="lede">${P.soad.text}</p></div>
    <div class="split-5-7 soad-media">
      <div class="rv">
        <p>${P.soad.visit}</p>
        <ul class="links">
          <li><a href="${P.soad.site}" target="_blank" rel="noopener">strikeoutagainstdrugs.com ${icon("ext", "ext")}</a></li>
          <li><a href="${P.soad.video}" target="_blank" rel="noopener">Watch the video on YouTube ${icon("ext", "ext")}</a></li>
        </ul>
      </div>
      <!-- YouTube loads only on tap (no third-party requests until then) -->
      <div class="yt rv-img" data-yt="${P.soad.videoId}">
        <img src="https://i.ytimg.com/vi/${P.soad.videoId}/hqdefault.jpg" alt="Strike Out Against Drugs video" loading="lazy" decoding="async">
        <button type="button" class="yt-play" aria-label="Play the Strike Out Against Drugs video">${icon("play")}</button>
      </div>
    </div>
    <p class="rv awards-line">${P.soad.awardsLine}</p>
    <div class="gal gal-awards" data-gal="awards">
      ${IMG.awardNames.map((n, i) => gi(`award-${pad(i + 1)}`, `${n} — award or commendation received by Strike Out Against Drugs`, { widths: [600, 1200], sizes: "(max-width: 900px) 33vw, 16vw" })).join("\n      ")}
    </div>
  </div>
</section>

${contactBlock(false)}`;
  const ld = [crumbs([["Home", "/"], ["Philanthropic", "/philanthropic/"]]), {
    "@type": "NGO", name: "Hope for the Hurting", foundingDate: "2015", founder: { "@id": abs("/about/#greg") }, url: abs("/philanthropic/"),
    description: "A 501(c)(3) charitable organization with a mission to assist the less fortunate among us and provide a foundation for people to improve their lives, with four facilities in California and Indiana and the Strike Out Against Drugs school program.",
    nonprofitStatus: "Nonprofit501c3", sameAs: [P.beacon.site, P.soad.site],
  }];
  return layout({
    path: "/philanthropic/", title: "Philanthropic: Hope for the Hurting | Harvard Investment Group",
    desc: "In 2015 Greg Cullen formed Hope for the Hurting, a 501(c)(3) with four facilities in California and Indiana for people facing mental illness and addiction, and the Strike Out Against Drugs program in Los Angeles schools.",
    body, bodyClass: "page-philanthropic", ld, ogImage: "/assets/img/boh-02-1600.webp",
  });
}

// ─────────────────────────────────────────────── CONTACT ────────────────────────────────────────────
function contactPage() {
  const body = `<section class="hero hero-contact" aria-labelledby="h1">
  <div class="wrap">
    <p class="eyebrow gold">Contact</p>
    <h1 class="serif caps hero-title" id="h1"><span class="ln"><span>Get in</span></span><span class="ln"><span>Touch</span></span></h1>
    <p class="serif hero-lede">${CONTACT.lede}</p>
  </div>
</section>

<section class="sec contact-sec" aria-label="Contact details and form">
  <div class="wrap split-5-7">
    <div class="rv">
      <p class="eyebrow">${CONTACT.getInTouch}</p>
      <address class="addr">
        <p>${icon("pin", "ico")}<span>6060 W Manchester Ave<br>Suite 304<br>Los Angeles, CA 90045<br>USA</span></p>
        <p><a href="mailto:${SITE.email}">${SITE.email}</a></p>
        <p><a href="tel:${SITE.phoneTel}">${SITE.phoneDisplay}</a></p>
        <p><a href="${SITE.linkedin}" target="_blank" rel="noopener">LinkedIn ${icon("ext", "ext")}</a></p>
      </address>
      <a class="map" href="https://maps.google.com/?q=6060+W+Manchester+Ave+Suite+304+Los+Angeles+CA+90045" target="_blank" rel="noopener">Open in Google Maps ${icon("ext", "ext")}</a>
    </div>
    <form class="form rv" id="cform" method="post" action="${u("/api/contact")}" novalidate>
      <p class="eyebrow">${CONTACT.send}</p>
      <div class="f2">
        <label><span>Name</span><input name="name" type="text" autocomplete="name" required maxlength="120"></label>
        <label><span>Phone</span><input name="phone" type="tel" autocomplete="tel" maxlength="40"></label>
      </div>
      <label><span>Email</span><input name="email" type="email" autocomplete="email" required maxlength="160"></label>
      <label><span>Message</span><textarea name="message" rows="6" required maxlength="4000"></textarea></label>
      <label class="hp" aria-hidden="true"><span>Website</span><input name="website" type="text" tabindex="-1" autocomplete="off"></label>
      <input type="hidden" name="redirect" value="${u("/contact/?sent=1")}">
      <div class="f-row"><button class="btn btn-gold" type="submit">Send message ${icon("arrow")}</button><p class="f-msg" role="status" aria-live="polite"></p></div>
      <p class="f-note">Your message goes to Greg Cullen’s office by email. Nothing is shared with anyone else.</p>
    </form>
    <div class="sent rv" id="sent" hidden>
      <p class="eyebrow">${CONTACT.thanksTitle}</p>
      <p class="serif sent-t">${CONTACT.thanks}</p>
      <a class="tlink" href="${u("/")}">${icon("left")} Back to the homepage</a>
    </div>
  </div>
</section>`;
  return layout({
    path: "/contact/", title: "Contact | Harvard Investment Group",
    desc: "Contact Harvard Investment Group: 6060 W Manchester Ave, Suite 304, Los Angeles, CA 90045 · (310) 702-5252 · greg@harvardinvestmentgroup.com, or send a message using the form.",
    body, bodyClass: "page-contact", ld: [crumbs([["Home", "/"], ["Contact", "/contact/"]]), { "@type": "ContactPage", "@id": abs("/contact/"), url: abs("/contact/"), about: { "@id": abs("/#org") } }],
  });
}

// ───────────────────────────────────────────────── FAQ ──────────────────────────────────────────────
function faqPage() {
  const body = `<section class="hero hero-contact" aria-labelledby="h1">
  <div class="wrap">
    <p class="eyebrow gold">Frequently asked questions</p>
    <h1 class="serif caps hero-title" id="h1"><span class="ln"><span>Questions,</span></span><span class="ln"><span>Answered</span></span></h1>
    <p class="serif hero-lede">About Harvard Investment Group, its investments, its developments and Hope for the Hurting.</p>
  </div>
</section>
<section class="sec faq-sec" aria-label="Questions and answers">
  <div class="wrap faq">
    ${FAQ.map((f, i) => `<details class="rv"${i === 0 ? " open" : ""}><summary><h2>${f.q}</h2>${icon("arrow")}</summary><p>${f.a}</p></details>`).join("\n    ")}
  </div>
</section>
${contactBlock(false)}`;
  const ld = [crumbs([["Home", "/"], ["FAQ", "/faq/"]]), { "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }];
  return layout({
    path: "/faq/", title: "FAQ | Harvard Investment Group",
    desc: "Answers about Harvard Investment Group: who leads it, what it invests in and how much, the Corona del Mar estates featured on Netflix, and the Hope for the Hurting charity.",
    body, bodyClass: "page-faq", ld,
  });
}

// ───────────────────────────────────────── llms.txt / sitemap ───────────────────────────────────────
function llms() {
  const short = `# ${SITE.name}

> ${SITE.name}, founded in 1995 by Greg Cullen, invests in value-added real estate and early stage businesses and develops luxury residential real estate in Southern California. Office: 6060 W Manchester Ave, Suite 304, Los Angeles, CA 90045. Phone ${SITE.phoneDisplay}. Email ${SITE.email}.

## Pages
- [Home](${abs("/")}): who we are
- [About Greg Cullen](${abs("/about/")}): founder biography and credentials
- [Investments](${abs("/investments/")}): investment focus, typical check size, how we work
- [Developments](${abs("/developments/")}): Corona del Mar (2201 and 2209 Bayside Drive, featured on Netflix's Selling the OC), Hollywood Hills, Hermosa Beach, Redondo Beach
- [Philanthropic](${abs("/philanthropic/")}): Hope for the Hurting, a 501(c)(3) founded in 2015
- [Contact](${abs("/contact/")})
- [FAQ](${abs("/faq/")})

## Key facts
- Founded 1995 by Greg Cullen (Harvard Business School MBA 1989; Rose-Hulman B.S. 1985; formerly Citibank and ING Capital)
- Invests from the mid-five figures to seven figures in value-added real estate and early stage businesses
- 2201 Bayside Drive, Corona del Mar: sold for $24,500,000; Brandon Architects, Brooke Wagner Design
- 2209 Bayside Drive, Corona del Mar: sold for $23,000,000
- Hope for the Hurting: four facilities in California and Indiana; Strike Out Against Drugs school program
`;
  const full = short + `
## About Greg Cullen
${ABOUT.paragraphs.join("\n\n")}

## Investments
${INVESTMENTS.paragraphs.join("\n\n")}

## Developments
${DEVELOPMENTS.intro.join("\n\n")}

### Corona Del Mar
${DEVELOPMENTS.cdm.text}

### Bayside 2201 (${DEVELOPMENTS.b2201.sold})
${DEVELOPMENTS.b2201.text}

### Bayside 2209 (${DEVELOPMENTS.b2209.sold})
${DEVELOPMENTS.b2209.text}

### Hollywood Hills
${DEVELOPMENTS.hollywood.text}

### Hermosa Beach
${DEVELOPMENTS.hermosa.text}

### Redondo Beach
${DEVELOPMENTS.redondo.text}

## Philanthropic: Hope for the Hurting
${PHILANTHROPIC.intro.join("\n\n")}

### Beacon of Hope, Los Angeles (${PHILANTHROPIC.beacon.site})
${PHILANTHROPIC.beacon.text}

### Wabash Recovery, Kokomo
${PHILANTHROPIC.wabash.text}

### Oasis Recovery, Tipton
${PHILANTHROPIC.oasis.text}

### Strike Out Against Drugs (${PHILANTHROPIC.soad.site})
${PHILANTHROPIC.soad.text}

## FAQ
${FAQ.map((f) => `**${f.q}**\n${f.a}`).join("\n\n")}
`;
  return { short, full };
}

const PAGES = [
  ["/", homePage], ["/about/", aboutPage], ["/investments/", investmentsPage], ["/developments/", developmentsPage], ["/philanthropic/", philanthropicPage], ["/contact/", contactPage], ["/faq/", faqPage],
];

function write(rel, content) {
  const f = path.join(OUT, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, content, "utf8");
  console.log("  " + rel.padEnd(28) + (content.length / 1024).toFixed(1) + " KB");
}

console.log(`Building Harvard Investment Group → ${BASE} (root "${ROOT}", ${INDEXABLE ? "indexable" : "noindex"})`);
for (const [p, fn] of PAGES) write(p === "/" ? "index.html" : p.slice(1) + "index.html", fn());
const { short, full } = llms();
write("llms.txt", short); write("llms-full.txt", full);
const today = new Date().toISOString().slice(0, 10);
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${PAGES.map(([p]) => `  <url><loc>${abs(p)}</loc><lastmod>${today}</lastmod></url>`).join("\n")}\n</urlset>\n`);
// monogram favicon: two serif strokes and a gold hairline, the H the old logo implied
write("assets/img/monogram.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="6" fill="#071320"/><rect x="18" y="14" width="7" height="36" fill="#F4EFE6"/><rect x="39" y="14" width="7" height="36" fill="#F4EFE6"/><rect x="25" y="31.5" width="14" height="1.5" fill="#B8975A"/></svg>\n`);
if (FINAL) write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${abs("/sitemap.xml")}\n`);
console.log("done");
