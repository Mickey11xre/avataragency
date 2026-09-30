/* AvatarAgency — homepage (home-next prototype)
   One loop drives everything: gsap.ticker (Lenis, carousel, timecodes).
   ⛔ Reduced motion turns off MOTION only — scroll-linked effects, the
   carousel spin, loops, the marquee. It must never stop the films from
   playing on tap, the forms, the menu or the links. (Lesson from the
   Thriving site, 2026-09-11: one early `return` killed the video button
   on every iPhone with Reduce Motion on.) */
(function () {
  "use strict";
  var html = document.documentElement;
  var RM = html.classList.contains("rm");
  var FINE = window.matchMedia("(pointer: fine)").matches;
  var DESKTOP = function () { return window.innerWidth > 900; };
  var hasGSAP = !!(window.gsap && window.ScrollTrigger);
  if (hasGSAP) gsap.registerPlugin(ScrollTrigger);
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var track = function (name, params) { try { if (window.gtag) gtag("event", name, params || {}); } catch (e) {} };
  var HDR = function () { return $("#hdr").offsetHeight || 76; };

  /* ── Smooth scroll (desktop pointers only; touch keeps native scroll) ── */
  var lenis = null;
  if (hasGSAP && !RM && FINE && window.Lenis) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }
  /* Layout position, ignoring transforms: reveal-on-scroll elements sit 34px low until they
     animate in, and getBoundingClientRect would bake that offset into the landing spot. */
  function docTop(el) { var y = 0; while (el) { y += el.offsetTop; el = el.offsetParent; } return y; }
  function scrollToEl(el, off) {
    if (!el) return;
    var y = docTop(el) - (off == null ? HDR() : off);
    if (lenis) lenis.scrollTo(y, { duration: 1.4, easing: function (t) { return 1 - Math.pow(1 - t, 4); } });
    else window.scrollTo({ top: y, behavior: RM ? "auto" : "smooth" });
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute("href");
    if (id === "#" || a.hasAttribute("data-open-login")) return;
    var el = document.getElementById(id.slice(1));
    if (!el) return;
    e.preventDefault(); closeMenu();
    // Land on the section's label (data-anchor) just under the header, not on the section's
    // padded top edge — that left a big black gap above "Private portfolio" on phones.
    var label = el.querySelector("[data-anchor]");
    // Show the destination's content now — never make the reader arrive on a blank section
    // waiting for a scroll-reveal that iPhone Safari may not fire until they touch the screen.
    $$(".rv", el).forEach(function (r) { r.classList.add("in"); });
    setTimeout(function () { revealVisible(); }, 900); setTimeout(function () { revealVisible(); }, 1800);
    if (id === "#top") scrollToEl(el, 0);
    else if (label) scrollToEl(label, HDR() + 18 + (label.classList.contains("ch-label") && window.innerWidth <= 1180 ? 44 : 0));   // clear the chapter pill on phones/tablets
    else scrollToEl(el);
    history.replaceState(null, "", id);
  });

  /* ── Intro (first visit per session) ── */
  var intro = $("#intro");
  function ready() { html.classList.add("is-ready"); if (typeof syncHero === "function") syncHero(); }
  if (html.classList.contains("has-intro") && intro) {
    var tcEl = $("[data-intro-tc]", intro), f0 = performance.now();
    var tcTimer = setInterval(function () { var fr = Math.floor((performance.now() - f0) / 41.67); tcEl.textContent = "00:00:" + pad(Math.floor(fr / 24)) + ":" + pad(fr % 24); }, 42);
    setTimeout(function () { intro.classList.add("is-out"); ready(); }, 1500);
    setTimeout(function () { clearInterval(tcTimer); intro.remove(); html.classList.remove("has-intro"); }, 2500);
  } else { if (intro) intro.remove(); requestAnimationFrame(ready); }
  function pad(n) { return (n < 10 ? "0" : "") + n; }

  /* ── Header state ── */
  var hdr = $("#hdr");
  function onScrollHdr() { hdr.classList.toggle("is-solid", window.scrollY > 24 || html.classList.contains("menu-open")); }
  window.addEventListener("scroll", onScrollHdr, { passive: true }); onScrollHdr();

  /* ── Menu ── */
  var menu = $("#menu"), menuBtn = $("[data-menu-btn]");
  function openMenu() { menu.hidden = false; html.classList.add("menu-open"); menuBtn.setAttribute("aria-expanded", "true"); if (lenis) lenis.stop(); onScrollHdr(); }
  function closeMenu() { if (menu.hidden) return; menu.hidden = true; html.classList.remove("menu-open"); menuBtn.setAttribute("aria-expanded", "false"); if (lenis) lenis.start(); onScrollHdr(); }
  menuBtn.addEventListener("click", function () { menu.hidden ? openMenu() : closeMenu(); });

  /* ── Client login modal (same behavior as the live site: UI only) ── */
  var login = $("#login");
  $$("[data-open-login]").forEach(function (b) { b.addEventListener("click", function (e) { e.preventDefault(); closeMenu(); login.hidden = false; var i = $("input", login); if (i) i.focus(); }); });
  $$("[data-close-login]").forEach(function (b) { b.addEventListener("click", function () { login.hidden = true; }); });
  login.addEventListener("click", function (e) { if (e.target === login) login.hidden = true; });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { login.hidden = true; closeMenu(); } });

  /* ── CTA tracking ── */
  $$("[data-cta]").forEach(function (a) { a.addEventListener("click", function () { track("cta_click", { cta_location: a.getAttribute("data-cta"), link_url: a.href }); }); });

  /* ═════════════ HERO ═════════════ */
  var heroVid = $(".hero-video"), heroTc = $("[data-hero-tc]");
  if (heroVid) {
    var portrait = window.innerWidth / window.innerHeight < 0.8;
    if (portrait) { heroVid.poster = heroVid.getAttribute("data-poster-port"); $(".hero-media").style.backgroundImage = "url(" + heroVid.poster + ")"; }
    if (RM) heroVid.removeAttribute("autoplay");            // reduced motion: poster only, the reel is never downloaded
    else { heroVid.src = heroVid.getAttribute(portrait ? "data-src-port" : "data-src-land"); var p = heroVid.play(); if (p && p.catch) p.catch(function () {}); }
  }
  var heroCovered = false;
  function syncHero() {
    if (!heroVid || RM) return;
    var want = !heroCovered && document.visibilityState === "visible";
    if (want && heroVid.paused) { var q = heroVid.play(); if (q && q.catch) q.catch(function () {}); }
    else if (!want && !heroVid.paused) heroVid.pause();
  }
  document.addEventListener("visibilitychange", syncHero);
  function tcFrom(t) { var fr = Math.floor(t * 24); var s = Math.floor(fr / 24); return "00:" + pad(Math.floor(s / 60)) + ":" + pad(s % 60) + ":" + pad(fr % 24); }

  if (hasGSAP && !RM) {
    // The manifesto rises over the sticky hero; the hero recedes underneath it.
    var tl = gsap.timeline({ scrollTrigger: { trigger: ".manifesto", start: "top bottom", end: "top top", scrub: true,
      onUpdate: function (st) { heroCovered = st.progress > 0.995; syncHero(); } } });
    tl.to(".hero-video", { scale: 1.14, ease: "none" }, 0)
      .to(".hero-content", { y: -90, opacity: 0, ease: "none" }, 0)
      .to(".hero-rail", { y: 40, opacity: 0, ease: "none" }, 0)
      .to(".hero .vf", { opacity: 0, ease: "none" }, 0);
  }

  /* ═════════════ MANIFESTO word reveal ═════════════ */
  var mt = $("[data-words]");
  if (mt && !RM) {
    (function split(node) {
      [].slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) frag.appendChild(document.createTextNode(part));
            else { var s = document.createElement("span"); s.className = "w"; s.textContent = part; frag.appendChild(s); }
          });
          node.replaceChild(frag, n);
        } else if (n.nodeType === 1) split(n);
      });
    })(mt);
    var words = $$(".w", mt);
    if (hasGSAP) ScrollTrigger.create({ trigger: mt, start: "top 82%", end: "bottom 45%", scrub: true,
      onUpdate: function (st) { var k = Math.round(st.progress * words.length); for (var i = 0; i < words.length; i++) words[i].classList.toggle("on", i < k); } });
    else words.forEach(function (w) { w.classList.add("on"); });
  }

  /* ═════════════ Count-ups + reveals ═════════════ */
  var counters = $$("[data-count]");
  /* ⛔ iPhone Safari can skip IntersectionObserver callbacks after a long programmatic smooth
     scroll (an in-page jump) until the reader touches the screen — the destination sat blank
     (Michael's iPhone, 30 Sept). The observers stay, but revealVisible() is the backstop:
     it runs whenever scrolling settles and right after every in-page jump. */
  var revealVisible = function () {};
  if (!RM && "IntersectionObserver" in window) {
    counters.forEach(function (c) { c.textContent = "0"; });
    var startCount = function (el) {
      if (el.__counted) return; el.__counted = true;
      var to = +el.getAttribute("data-count"), t0 = performance.now(), D = 1500;
      (function step(now) { var k = Math.min(1, (now - t0) / D); k = 1 - Math.pow(1 - k, 4); el.textContent = Math.round(to * k); if (k < 1) requestAnimationFrame(step); })(t0);
    };
    var cio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { cio.unobserve(e.target); startCount(e.target); } });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { cio.observe(c); });

    var rvSel = ".groups .group, .stats > div, .index-head, .index-list li, .ch-head, .ch-lede, .tiles, .aro-stats, .timeline, .founder-copy > *, .cast-head, .formats-head, .svc-head, .svc-list li, .work-copy, .vault, .steps li, .process .h2, .more-card, .faq-grid > div, .final-inner > *";
    var rio = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); rio.unobserve(e.target); } }); }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    $$(rvSel).forEach(function (el, i) { el.classList.add("rv"); el.style.transitionDelay = ((i % 4) * 70) + "ms"; rio.observe(el); });

    revealVisible = function () {
      var vh = window.innerHeight;
      $$(".rv:not(.in)").forEach(function (el) { var r = el.getBoundingClientRect(); if (r.top < vh && r.bottom > 0) { el.classList.add("in"); rio.unobserve(el); } });
      counters.forEach(function (c) { var r = c.getBoundingClientRect(); if (!c.__counted && r.top < vh && r.bottom > 0) { cio.unobserve(c); startCount(c); } });
    };
    var settleT = null;
    window.addEventListener("scroll", function () { clearTimeout(settleT); settleT = setTimeout(revealVisible, 140); }, { passive: true });
    window.addEventListener("scrollend", revealVisible);
    document.addEventListener("visibilitychange", revealVisible);
  }

  /* ═════════════ Service index hover preview ═════════════ */
  var ixf = $(".ix-float");
  if (ixf && FINE && !RM) {
    var ixImg = $("img", ixf), mx = 0, my = 0, fx = 0, fy = 0, ixOn = false;
    $$(".index-list a").forEach(function (a) {
      a.addEventListener("mouseenter", function () { ixImg.src = a.getAttribute("data-preview"); ixf.classList.add("on"); ixOn = true; });
      a.addEventListener("mouseleave", function () { ixf.classList.remove("on"); ixOn = false; });
    });
    window.addEventListener("mousemove", function (e) { mx = e.clientX + 190; my = e.clientY; }, { passive: true });
    if (hasGSAP) gsap.ticker.add(function () { if (!ixOn && !ixf.classList.contains("on")) return; fx += (mx - fx) * 0.14; fy += (my - fy) * 0.14; ixf.style.left = fx + "px"; ixf.style.top = fy + "px"; });
  }

  /* ═════════════ PLAYERS ═════════════ */
  var players = [];
  var cursor = $(".cursor");
  function fmt(t) { if (!isFinite(t)) t = 0; t = Math.floor(t); return Math.floor(t / 60) + ":" + pad(t % 60); }

  $$(".player").forEach(function (fig, idx) {
    var title = fig.getAttribute("data-title"), dur = fig.getAttribute("data-duration");
    var chapter = fig.closest(".chapter"), label = chapter ? chapter.getAttribute("data-name") : "Founder film";
    var num = chapter ? pad(+chapter.getAttribute("data-chapter") + 1) : "";
    var loop = document.createElement("video");
    loop.className = "p-loop"; loop.muted = true; loop.loop = true; loop.playsInline = true; loop.setAttribute("playsinline", ""); loop.setAttribute("muted", ""); loop.preload = "none"; loop.setAttribute("aria-hidden", "true");
    var film = document.createElement("video");
    film.className = "p-film"; film.playsInline = true; film.setAttribute("playsinline", ""); film.preload = "none";
    film.setAttribute("aria-label", title);
    fig.appendChild(loop); fig.appendChild(film);
    fig.insertAdjacentHTML("beforeend",
      '<div class="vf" aria-hidden="true"><i class="vf-c tl"></i><i class="vf-c tr"></i><i class="vf-c bl"></i><i class="vf-c br"></i>' +
      '<span class="vf-rec"><b></b>' + (num ? num + " · " : "") + "PREVIEW</span><span class=\"vf-tc\">" + label.toUpperCase().replace(/&AMP;/g, "&") + "</span><span class=\"vf-meta\">RUNTIME " + dur + "</span></div>" +
      '<button class="p-play" type="button" aria-label="Play the film: ' + title + ' (' + dur + ')"><span class="ring"><svg><use href="#i-play"/></svg></span><span class="lbl"><b>Watch the film</b><small>' + dur + " · sound on</small></span></button>" +
      '<div class="p-bar" role="group" aria-label="Video controls">' +
        '<button type="button" class="p-toggle" aria-label="Pause"><svg><use href="#i-pause"/></svg></button>' +
        '<input class="p-seek" type="range" min="0" max="1000" value="0" step="1" aria-label="Seek">' +
        '<span class="p-time">0:00 / ' + dur + "</span>" +
        '<button type="button" class="p-mute" aria-label="Mute"><svg><use href="#i-vol"/></svg></button>' +
        '<button type="button" class="p-full" aria-label="Full screen"><svg><use href="#i-full"/></svg></button>' +
        '<button type="button" class="p-close" aria-label="Close the film"><svg><use href="#i-close"/></svg></button>' +
      "</div>");
    var P = { fig: fig, loop: loop, film: film, title: title, visible: false, started: false, idle: null };
    var playBtn = $(".p-play", fig), tog = $(".p-toggle", fig), seek = $(".p-seek", fig), time = $(".p-time", fig), mute = $(".p-mute", fig), full = $(".p-full", fig), close = $(".p-close", fig);

    function useIcon(btn, id, lbl) { $("use", btn).setAttribute("href", "#" + id); btn.setAttribute("aria-label", lbl); }
    function state(s) {
      fig.classList.toggle("is-playing", s === "playing"); fig.classList.toggle("is-paused", s === "paused");
      if (s !== "playing") fig.classList.remove("idle");
      if (cursor) cursor.classList.toggle("on", s === "" && fig.matches(":hover"));
      // Cinema mode: a full-bleed chapter film tucks the header and rail away while it plays.
      if (fig.closest(".ch-sticky") && DESKTOP()) html.classList.toggle("film-on", s === "playing");
    }
    P.play = function () {
      players.forEach(function (o) { if (o !== P) o.pause(); });
      if (!film.src) { film.src = fig.getAttribute("data-film"); film.preload = "auto"; }
      film.muted = false;
      var pr = film.play(); if (pr && pr.catch) pr.catch(function () { state("paused"); });
      loop.pause(); state("playing"); useIcon(tog, "i-pause", "Pause");
      if (!P.started) { P.started = true; track("video_start", { video_title: title }); }
      poke();
    };
    P.pause = function () { if (!film.paused) { film.pause(); state("paused"); useIcon(tog, "i-play", "Play"); } };
    P.stop = function () { film.pause(); state(""); P.visible && !RM && playLoop(); };
    function playLoop() { if (RM || fig.classList.contains("is-playing") || fig.classList.contains("is-paused")) return; if (!loop.src) loop.src = fig.getAttribute("data-loop"); var q = loop.play(); if (q && q.catch) q.catch(function () {}); }
    P.playLoop = playLoop;

    playBtn.addEventListener("click", P.play);
    tog.addEventListener("click", function () { film.paused ? P.play() : P.pause(); });
    close.addEventListener("click", function () { P.stop(); playBtn.focus(); });
    mute.addEventListener("click", function () { film.muted = !film.muted; useIcon(mute, film.muted ? "i-mute" : "i-vol", film.muted ? "Unmute" : "Mute"); });
    full.addEventListener("click", function () {
      if (document.fullscreenElement) { document.exitFullscreen(); return; }
      if (fig.requestFullscreen) fig.requestFullscreen().catch(function () {});
      else if (film.webkitEnterFullscreen) film.webkitEnterFullscreen();
    });
    seek.addEventListener("input", function () { if (film.duration) film.currentTime = seek.value / 1000 * film.duration; });
    film.addEventListener("timeupdate", function () {
      var k = film.duration ? film.currentTime / film.duration : 0;
      seek.value = Math.round(k * 1000); seek.style.setProperty("--pct", (k * 100).toFixed(2) + "%");
      time.textContent = fmt(film.currentTime) + " / " + (film.duration ? fmt(film.duration) : dur);
    });
    film.addEventListener("ended", function () { track("video_complete", { video_title: title }); state(""); film.currentTime = 0; $(".lbl b", playBtn).textContent = "Watch again"; playLoop(); });
    film.addEventListener("click", function () { film.paused ? P.play() : P.pause(); });
    fig.addEventListener("keydown", function (e) { if ((e.key === " " || e.key === "k") && (fig.classList.contains("is-playing") || fig.classList.contains("is-paused")) && e.target.tagName !== "INPUT") { e.preventDefault(); film.paused ? P.play() : P.pause(); } });
    function poke() { fig.classList.remove("idle"); clearTimeout(P.idle); P.idle = setTimeout(function () { if (!film.paused) fig.classList.add("idle"); }, 2600); }
    fig.addEventListener("mousemove", poke); fig.addEventListener("touchstart", poke, { passive: true });

    if (cursor && FINE) {
      fig.addEventListener("mouseenter", function () { if (!fig.classList.contains("is-playing") && !fig.classList.contains("is-paused")) cursor.classList.add("on"); });
      fig.addEventListener("mouseover", function (e) { var onUi = e.target.closest(".p-play, .p-bar"); var busy = fig.classList.contains("is-playing") || fig.classList.contains("is-paused"); cursor.classList.toggle("on", !onUi && !busy); });
      fig.addEventListener("mouseleave", function () { cursor.classList.remove("on"); });
      fig.addEventListener("click", function (e) { if (e.target === fig || e.target === loop || e.target.classList.contains("player-poster")) { cursor.classList.remove("on"); if (!fig.classList.contains("is-playing")) P.play(); } });
    } else {
      fig.addEventListener("click", function (e) { if (e.target === loop || e.target.classList.contains("player-poster")) P.play(); });
    }
    players.push(P);
  });
  if (cursor && FINE) {
    var cx = 0, cy = 0;
    window.addEventListener("mousemove", function (e) { cx = e.clientX; cy = e.clientY; cursor.style.transform = cursor.classList.contains("on") ? "translate(" + cx + "px," + cy + "px) scale(1)" : "translate(" + cx + "px," + cy + "px) scale(0)"; }, { passive: true });
  }

  // Loops load when near, play only while visible; a playing film pauses when scrolled away.
  if ("IntersectionObserver" in window) {
    var pio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var P = players.filter(function (p) { return p.fig === e.target; })[0]; if (!P) return;
        P.visible = e.isIntersecting && e.intersectionRatio > 0.2;
        if (P.visible) P.playLoop(); else { P.loop.pause(); P.pause(); }
      });
    }, { threshold: [0, 0.2, 0.5] });
    players.forEach(function (P) { pio.observe(P.fig); });
  }

  /* Chapter stage: the frame grows from a card to full screen as it arrives,
     then holds (sticky) — that hold is the stop at each film. */
  if (hasGSAP && !RM) {
    var mm = gsap.matchMedia();
    mm.add("(min-width: 901px)", function () {
      $$(".ch-stage").forEach(function (stage) {
        var fig = $(".player", stage);
        gsap.fromTo(fig, { "--s": 0.58, borderRadius: 44 }, { "--s": 1, borderRadius: 0, ease: "none",
          scrollTrigger: { trigger: stage, start: "top 95%", end: "top top", scrub: true } });
        gsap.fromTo(fig, { "--s": 1 }, { "--s": 0.9, ease: "none", immediateRender: false,
          scrollTrigger: { trigger: stage, start: "bottom 90%", end: "bottom 30%", scrub: true } });
      });
    });

    // Gentle stop: if the reader pauses while a film is almost framed, settle it into frame.
    if (lenis) {
      var snapT = null;
      lenis.on("scroll", function () {
        clearTimeout(snapT);
        snapT = setTimeout(function () {
          if (!DESKTOP()) return;
          var vh = window.innerHeight;
          $$(".ch-stage").forEach(function (stage) {
            var top = stage.getBoundingClientRect().top;
            if (top > 2 && top < vh * 0.34) lenis.scrollTo(stage, { duration: 0.9, easing: function (t) { return 1 - Math.pow(1 - t, 3); } });
          });
        }, 170);
      });
    }
  }

  /* ═════════════ Chapter rail + pill ═════════════ */
  var chapters = $$(".chapter"), railLinks = $$("[data-rail]"), railFill = $("[data-rail-fill]");
  var pillNum = $("[data-pill-num]"), pillName = $("[data-pill-name]"), pillBar = $("[data-pill-bar]");
  function setChapter(i) {
    railLinks.forEach(function (a, k) { a.classList.toggle("on", k === i); });
    if (pillNum) { pillNum.textContent = pad(i + 1) + " / 06"; pillName.textContent = chapters[i].getAttribute("data-name").replace(/&amp;/g, "&"); }
  }
  if (hasGSAP) {
    ScrollTrigger.create({ trigger: "#chapters", start: "top 55%", end: "bottom 45%",
      onToggle: function (st) { html.classList.toggle("in-chapters", st.isActive); },
      onUpdate: function (st) { if (railFill) railFill.style.transform = "scaleY(" + st.progress.toFixed(4) + ")"; } });
    chapters.forEach(function (ch, i) {
      ScrollTrigger.create({ trigger: ch, start: "top 55%", end: "bottom 55%",
        onToggle: function (st) { if (st.isActive) setChapter(i); },
        onUpdate: function (st) { if (pillBar && st.isActive) pillBar.style.transform = "scaleX(" + st.progress.toFixed(4) + ")"; } });
    });
  }

  /* ═════════════ Process line ═════════════ */
  if (hasGSAP && !RM) {
    var steps = $(".steps");
    if (steps) ScrollTrigger.create({ trigger: steps, start: "top 80%", end: "bottom 60%", scrub: true, onUpdate: function (st) { steps.style.setProperty("--prog", st.progress.toFixed(4)); } });
  }

  /* ═════════════ FORMATS — horizontal track ═════════════ */
  var fSec = $(".formats"), fTrack = $(".formats-track");
  var fVids = $$(".fmt video");
  if ("IntersectionObserver" in window && !RM) {
    var fio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) { if (!v.src) v.src = v.getAttribute("data-src"); var q = v.play(); if (q && q.catch) q.catch(function () {}); }
        else v.pause();
      });
    }, { threshold: 0.35 });
    fVids.forEach(function (v) { fio.observe(v); });
  }
  if (hasGSAP && !RM && fSec && fTrack) {
    gsap.matchMedia().add("(min-width: 900px) and (pointer: fine)", function () {
      function dist() { return Math.max(0, fTrack.scrollWidth - window.innerWidth); }
      function size() { fSec.style.setProperty("--formats-h", (window.innerHeight + dist()) + "px"); }
      size();
      var tw = gsap.to(fTrack, { x: function () { return -dist(); }, ease: "none",
        scrollTrigger: { trigger: fSec, start: "top top", end: function () { return "+=" + dist(); }, scrub: true, invalidateOnRefresh: true, onRefreshInit: size } });
      return function () { tw.kill(); fSec.style.removeProperty("--formats-h"); gsap.set(fTrack, { x: 0 }); };
    });
  }

  /* ═════════════ CAST — cylinder carousel ═════════════
     Ported from thrivingincollege/js/home.js (window.CAR). Keep its fixes:
     no setPointerCapture (it breaks clicks), NaN trap in tick, flat
     transform-style, hover never spins the wheel. */
  var CYL = (function () {
    var car = $("#cast"), stage = car && $(".cyl-stage", car);
    if (!car || !stage || RM) return null;
    var cards = $$(".cyl-card", stage), M = cards.length;
    var S = { p: 0, target: null, drag: false, moved: 0, lastX: 0, resume: 0, mx: 0, my: 0, tx: 0, ty: 0, cw: 240, v: 0, lastT: 0, spin: 0 };
    var FRICTION = 0.962, SPIN_MAX = 0.34, SPIN_MIN = 0.013, SPIN_STOP = 0.0017;
    function sizes() {
      S.cw = cards[0].offsetWidth || 240; S.rw = car.clientWidth || S.cw * 3;
      if (!(S.cw > 0)) S.cw = 240;
      var narrow = S.rw < 560;
      S.x1 = Math.min(S.cw * 1.02 + 38, S.rw * (narrow ? 0.335 : 0.3));
      S.x2 = Math.min(S.cw * 1.86, S.rw * (narrow ? 0.6 : 0.52));
    }
    sizes(); window.addEventListener("resize", sizes, { passive: true });
    function settle() {
      var paused = performance.now() - S.lastT > 90;
      var perFrame = paused ? 0 : S.v * 16.7;
      perFrame = Math.max(-SPIN_MAX, Math.min(SPIN_MAX, perFrame));
      S.v = 0; S.resume = Date.now() + 6000;
      if (Math.abs(perFrame) > SPIN_MIN) { S.spin = perFrame; S.target = null; } else { S.spin = 0; S.target = Math.round(S.p); }
    }
    function vel(dp) { var now = performance.now(), dt = Math.max(1, now - S.lastT); S.lastT = now; S.v = S.v * 0.55 + (dp / dt) * 0.45; }
    function front() { return ((Math.round(S.p) % M) + M) % M; }
    function step(d) { S.target = Math.round(S.p) + d; S.spin = 0; S.resume = Date.now() + 8000; }
    $(".cyl-arrow.prev", car).addEventListener("click", function () { step(-1); });
    $(".cyl-arrow.next", car).addEventListener("click", function () { step(1); });
    car.addEventListener("keydown", function (e) { if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); } if (e.key === "ArrowRight") { e.preventDefault(); step(1); } });
    function mouseGear() { return S.cw * 0.92; } function touchGear() { return S.cw * 0.72; }
    function onWinMove(e) { if (e.pointerType === "touch" || !S.drag) return; var dx = e.clientX - S.lastX; S.lastX = e.clientX; S.moved += Math.abs(dx); var dp = -dx / mouseGear(); S.p += dp; vel(dp); }
    function onWinUp(e) { if (e.pointerType === "touch") return; window.removeEventListener("pointermove", onWinMove); window.removeEventListener("pointerup", onWinUp); window.removeEventListener("pointercancel", onWinUp); endDrag(); }
    car.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "touch" || e.target.closest(".cyl-arrow")) return;
      S.drag = true; S.moved = 0; S.lastX = e.clientX; S.target = null; S.v = 0; S.spin = 0; S.lastT = performance.now();
      car.classList.add("grabbing");
      window.addEventListener("pointermove", onWinMove); window.addEventListener("pointerup", onWinUp); window.addEventListener("pointercancel", onWinUp);
    });
    car.addEventListener("pointermove", function (e) {
      if (e.pointerType === "touch") return;
      var r = car.getBoundingClientRect();
      S.tx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 2)));
      S.ty = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height / 2)));
    });
    function endDrag() { if (!S.drag) return; S.drag = false; car.classList.remove("grabbing"); settle(); }
    car.addEventListener("pointerleave", function () { S.tx = 0; S.ty = 0; });
    var T = null;
    car.addEventListener("touchstart", function (e) { if (e.touches.length !== 1) return; T = { x0: e.touches[0].clientX, y0: e.touches[0].clientY, lock: null }; S.moved = 0; S.lastX = T.x0; S.v = 0; S.lastT = performance.now(); }, { passive: true });
    car.addEventListener("touchmove", function (e) {
      if (!T || e.touches.length !== 1) return;
      var x = e.touches[0].clientX, y = e.touches[0].clientY;
      if (T.lock === null) { var ax = Math.abs(x - T.x0), ay = Math.abs(y - T.y0); if (ax > 7 || ay > 7) T.lock = ax > ay ? "x" : "y"; }
      if (T.lock === "x") { e.preventDefault(); S.drag = true; S.target = null; var dx = x - S.lastX; S.lastX = x; S.moved += Math.abs(dx); var dp = -dx / touchGear(); S.p += dp; vel(dp); }
    }, { passive: false });
    function endTouch() { if (!T) return; T = null; if (S.drag) { S.drag = false; settle(); } }
    car.addEventListener("touchend", endTouch); car.addEventListener("touchcancel", endTouch);
    function sm(t) { return t * t * (3 - 2 * t); } function lerp(a, b, t) { return a + (b - a) * t; }
    var visible = false;
    function setVisible(v) { if (v && !visible) S.resume = Date.now() + 3500; visible = v; }
    function tick() {
      if (!visible && !S.drag && !S.spin && S.target === null) return;
      if (!isFinite(S.p)) { S.p = 0; S.target = null; S.v = 0; S.spin = 0; }
      if (S.target !== null && !isFinite(S.target)) S.target = null;
      if (!isFinite(S.spin)) S.spin = 0;
      if (S.spin) { S.p += S.spin; S.spin *= FRICTION; S.resume = Date.now() + 6000; if (Math.abs(S.spin) < SPIN_STOP) { S.spin = 0; S.target = Math.round(S.p); } }
      else if (S.target !== null) { S.p += (S.target - S.p) * 0.13; if (Math.abs(S.target - S.p) < 0.002) { S.p = S.target; S.target = null; } }
      else if (visible && !S.drag && Date.now() > S.resume) { S.p += 0.0026; }
      S.mx += (S.tx - S.mx) * 0.08; S.my += (S.ty - S.my) * 0.08;
      stage.style.transform = "rotateY(" + (S.mx * 5).toFixed(2) + "deg) rotateX(" + (-S.my * 3).toFixed(2) + "deg)";
      var x1 = S.x1, x2 = S.x2, z0 = 80, z1 = -95, z2 = -250, r1 = 40, r2 = 58, f = front();
      for (var i = 0; i < M; i++) {
        var off = i - S.p, half = M / 2;
        while (off > half) off -= M; while (off < -half) off += M;
        var a = Math.abs(off), s = Math.sign(off) || 0, x, z, ry, op;
        if (a <= 1) { var e1 = sm(a); x = s * e1 * x1; z = lerp(z0, z1, e1); ry = s * e1 * r1; op = lerp(1, 0.92, e1); }
        else if (a <= 2) { var e2 = sm(a - 1); x = s * lerp(x1, x2, e2); z = lerp(z1, z2, e2); ry = s * lerp(r1, r2, e2); op = lerp(0.92, 0, e2); }
        else { op = 0; x = s * x2; z = z2; ry = s * r2; }
        var c = cards[i];
        c.style.visibility = op < 0.02 ? "hidden" : "visible";
        c.style.opacity = op.toFixed(3); c.style.zIndex = Math.round(1000 + z);
        c.style.transform = "translateX(" + x.toFixed(1) + "px) translateZ(" + z.toFixed(1) + "px) rotateY(" + ry.toFixed(2) + "deg)";
        c.setAttribute("aria-hidden", i === f ? "false" : "true");
      }
    }
    tick(); visible = false;
    return { tick: tick, setVisible: setVisible };
  })();
  if (CYL) {
    if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { CYL.setVisible(es[0].isIntersecting); }, { threshold: 0.15 }).observe($("#cast"));
    if (hasGSAP) gsap.ticker.add(CYL.tick); else (function loop() { CYL.tick(); requestAnimationFrame(loop); })();
  }

  /* ═════════════ Hero timecode (runs only while the hero is on screen) ═════════════ */
  var heroOn = true;
  if ("IntersectionObserver" in window && $(".hero")) new IntersectionObserver(function (es) { heroOn = es[0].isIntersecting; }, { threshold: 0.02 }).observe($(".hero"));
  var lastTc = "";
  function tcTick() { if (!heroOn || !heroVid || !heroTc) return; var s = tcFrom(heroVid.currentTime || 0); if (s !== lastTc) { heroTc.textContent = s; lastTc = s; } }
  if (hasGSAP) gsap.ticker.add(tcTick); else setInterval(tcTick, 80);

  /* ═════════════ PRIVATE PORTFOLIO form ═════════════ */
  var form = $("#work-form");
  if (form) {
    var msg = $(".form-msg", form), btn = $("button[type=submit]", form);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var F = form.elements, fName = F.namedItem("name"), fEmail = F.namedItem("email"), fCo = F.namedItem("company"), fHp = F.namedItem("website_hp");
      var name = fName.value.trim(), email = fEmail.value.trim(), company = fCo.value.trim();
      fName.setAttribute("aria-invalid", name ? "false" : "true");
      var okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
      fEmail.setAttribute("aria-invalid", okEmail ? "false" : "true");
      msg.classList.remove("err");
      if (!name || !okEmail) { msg.textContent = !name ? "Please add your first name." : "Please enter a valid email address."; msg.classList.add("err"); (!name ? fName : fEmail).focus(); return; }
      btn.disabled = true; msg.textContent = "Sending your private link…";
      fetch("/api/portfolio-signup", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, email: email, company: company, hp: fHp.value }) })
        .then(function (r) { return r.json().catch(function () { return { ok: false }; }).then(function (j) { return { status: r.status, j: j }; }); })
        .then(function (res) {
          if (res.j && res.j.ok) {
            form.classList.add("done");
            msg.textContent = "Check your inbox, " + name + " — your private portfolio link is on its way. (Don't see it? Look in promotions or spam.)";
            track("generate_lead", { lead_source: "private_portfolio" });
          } else throw new Error(res.j && res.j.error || "unavailable");
        })
        .catch(function () { btn.disabled = false; msg.classList.add("err"); msg.innerHTML = 'Something went wrong on our side. Email <a href="mailto:michael@avataragency.ai?subject=Private%20portfolio">michael@avataragency.ai</a> and we\'ll send the link directly.'; });
    });
  }

  /* Recalculate after fonts/images settle */
  if (hasGSAP) {
    window.addEventListener("load", function () { ScrollTrigger.refresh(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
  }
})();
