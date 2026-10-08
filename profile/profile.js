/* AvatarAgency — /profile/ page behavior: header state, reveal-on-scroll, hero loop, one-at-a-time film player.
   Ava's stage is driven by /home-next/ava-panel.js (loaded after this file). */
(function () {
  "use strict";
  var html = document.documentElement, RM = html.classList.contains("rm");
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var track = function (n, p) { try { if (window.gtag) gtag("event", n, p || {}); } catch (e) {} };

  /* Header turns solid once the hero scrolls under it. */
  var hdr = $("#hdr");
  var onScroll = function () { if (hdr) hdr.classList.toggle("is-solid", window.scrollY > 40); };
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* Reveal on scroll. */
  var rev = $$(".reveal");
  if (!RM && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    rev.forEach(function (el) { io.observe(el); });
  } else { rev.forEach(function (el) { el.classList.add("is-in"); }); }

  /* Hero background loop: load it only after first paint, never under reduced motion or on save-data. */
  var loop = $(".pf-hero-loop");
  var saveData = navigator.connection && navigator.connection.saveData;
  if (loop) {
    if (RM || saveData) { loop.removeAttribute("autoplay"); }
    else { window.addEventListener("load", function () { loop.src = loop.getAttribute("data-src"); var p = loop.play(); if (p && p.catch) p.catch(function () {}); }); }
  }

  /* Film player: one film at a time; Ava's live session calls AAFilms.pauseAll() before she starts. */
  var modal = $("#pf-modal"), mv = modal && $(".pf-modal-video", modal), mt = modal && $(".pf-modal-title", modal), lastBtn = null;
  function closeFilm() {
    if (!modal || modal.hidden) return;
    try { mv.pause(); } catch (e) {}
    mv.removeAttribute("src"); mv.load();
    modal.hidden = true; document.body.style.overflow = "";
    if (lastBtn) lastBtn.focus({ preventScroll: true });
  }
  function openFilm(btn) {
    lastBtn = btn;
    mv.src = btn.getAttribute("data-film");
    mt.textContent = btn.getAttribute("data-title") || "";
    modal.hidden = false; document.body.style.overflow = "hidden";
    var p = mv.play(); if (p && p.catch) p.catch(function () {});
    $(".pf-modal-x", modal).focus({ preventScroll: true });
    track("pf_film_play", { title: mt.textContent });
  }
  $$(".pf-film[data-film]").forEach(function (b) { b.addEventListener("click", function () { openFilm(b); }); });
  if (modal) {
    $(".pf-modal-x", modal).addEventListener("click", closeFilm);
    modal.addEventListener("click", function (e) { if (e.target === modal) closeFilm(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeFilm(); });
  }
  window.AAFilms = window.AAFilms || { pauseAll: closeFilm };
  /* Any header link (menu, logo, Book an intro call) closes a playing film first, so the menu always works. */
  $$("#hdr a").forEach(function (a) { a.addEventListener("click", function () { closeFilm(); }); });

  /* Portfolio pass link: set window.AVA_STAGE_CONFIG.PASS_URL (e.g. "/work/?pass=…") to skip the request form. */
  var cfg = window.AVA_STAGE_CONFIG || {};
  if (cfg.PASS_URL) $$("[data-pass-link]").forEach(function (a) { a.href = cfg.PASS_URL; });


  /* Highlight the menu item for the section in view. */
  var navLinks = $$(".pf-nav a[href^='#']");
  if ("IntersectionObserver" in window && navLinks.length) {
    var byId = {}; navLinks.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { navLinks.forEach(function (a) { a.classList.remove("is-active"); }); var a = byId[e.target.id]; if (a) a.classList.add("is-active"); } });
    }, { rootMargin: "-45% 0px -50% 0px" });
    // A link may point inside a section (Talk to Ava → #ava-stage): watch the section it lives in.
    Object.keys(byId).forEach(function (id) { var el = document.getElementById(id); if (!el) return; var sec = el.closest("section") || el; if (sec.id && sec.id !== id) byId[sec.id] = byId[id]; spy.observe(sec); });
  }

  /* CTA analytics. */
  $$("[data-cta]").forEach(function (a) { a.addEventListener("click", function () { track("pf_cta", { id: a.getAttribute("data-cta") }); }); });
})();
