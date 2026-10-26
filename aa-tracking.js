/**
 * AvatarAgency site tracking (26 Oct 2026). Loaded on the PUBLIC AvatarAgency marketing pages only
 * (never client portals, gated pages or client sites).
 *
 * 1. UTM carry-through: utm_* from the landing URL are kept for the browser session, added to every
 *    Calendly link on the page (also links the Ava panel / assist widget build later), and exposed as
 *    window.AA_UTM so Ava's in-panel booking (/api/ava-booking) can record which ad or post brought the visitor.
 * 2. LinkedIn Insight Tag: conversion tracking + website audiences for LinkedIn ads. NOT loaded when the
 *    browser sends Global Privacy Control, or when the visitor opted out on /privacy (localStorage aa_no_ads=1).
 *    Stays off until LI_PARTNER_ID is filled in.
 * 3. window.aaTrackConversion("booking"): fires the LinkedIn "booked a call" conversion when
 *    LI_BOOKING_CONVERSION_ID is set. The Ava panel calls it after a confirmed booking.
 */
(function () {
  var LI_PARTNER_ID = "10248284";    // Campaign Manager → Measure → Signals manager → Insight Tag (created 26 Oct 2026, ad account 557831188)
  var LI_BOOKING_CONVERSION_ID = "";  // Campaign Manager → Measure → Conversion tracking → the "Booked strategy call" conversion's ID
  var UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  var KEY = "aa_utm", OPT_OUT = "aa_no_ads";
  function storage(kind) { try { return window[kind]; } catch (e) { return null; } }
  var ss = storage("sessionStorage"), ls = storage("localStorage");

  // ---- 1. UTMs ----
  var utm = {}, params = new URLSearchParams(location.search);
  UTM_KEYS.forEach(function (k) { var v = params.get(k); if (v) utm[k] = v.slice(0, 100); });
  try {
    if (Object.keys(utm).length) { if (ss) ss.setItem(KEY, JSON.stringify(utm)); }
    else if (ss) utm = JSON.parse(ss.getItem(KEY) || "{}") || {};
  } catch (e) { utm = {}; }
  window.AA_UTM = utm;

  function tagCalendly(a) {
    if (!Object.keys(utm).length || !a || !a.href) return;
    try {
      var u = new URL(a.href, location.href);
      if (!/(^|\.)calendly\.com$/i.test(u.hostname)) return;
      var changed = false;
      UTM_KEYS.forEach(function (k) { if (utm[k] && !u.searchParams.has(k)) { u.searchParams.set(k, utm[k]); changed = true; } });
      if (changed) a.href = u.toString();
    } catch (e) { /* leave the link alone */ }
  }
  function tagAll() { Array.prototype.forEach.call(document.querySelectorAll('a[href*="calendly.com"]'), tagCalendly); }
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href*="calendly.com"]') : null;
    if (a) tagCalendly(a);
  }, true);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", tagAll); else tagAll();

  // ---- 2 + 3. LinkedIn ----
  window.aaAdsOptOut = function (on) { try { if (on) ls.setItem(OPT_OUT, "1"); else ls.removeItem(OPT_OUT); } catch (e) {} };
  window.aaAdsOptedOut = function () {
    try { return navigator.globalPrivacyControl === true || (ls && ls.getItem(OPT_OUT) === "1"); } catch (e) { return navigator.globalPrivacyControl === true; }
  };
  window.aaTrackConversion = function (name) {
    try { if (name === "booking" && LI_BOOKING_CONVERSION_ID && typeof window.lintrk === "function") window.lintrk("track", { conversion_id: Number(LI_BOOKING_CONVERSION_ID) }); } catch (e) {}
  };
  if (!LI_PARTNER_ID || window.aaAdsOptedOut()) return;
  window._linkedin_partner_id = LI_PARTNER_ID;
  window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
  window._linkedin_data_partner_ids.push(LI_PARTNER_ID);
  if (!window.lintrk) { window.lintrk = function (a, b) { window.lintrk.q.push([a, b]); }; window.lintrk.q = []; }
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
  (document.head || document.documentElement).appendChild(s);
})();
