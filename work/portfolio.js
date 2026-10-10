/* AvatarAgency — Private Portfolio behavior.
   Films play inline (one at a time, sound on). Every secondary clip, reference frame and still opens in
   one shared "theater". Pattern notes carried over from the homepage:
   - Reveal-on-scroll gets a scroll-settle backstop: iPhone Safari can skip IntersectionObserver callbacks
     after a long programmatic scroll, which leaves content invisible.
   - Lenis is stopped while the theater is open so the page underneath doesn't scroll. */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var html = document.documentElement;
  var RM = html.classList.contains("rm");
  var HOVER = window.matchMedia && matchMedia("(hover: hover) and (pointer: fine)").matches;
  var track = function (name, params) { try { if (window.gtag) gtag("event", name, params || {}); } catch (e) {} };
  var hdr = $("#hdr");
  var hdrH = function () { return hdr ? hdr.offsetHeight : 72; };

  /* ── Smooth scroll ── */
  var lenis = null;
  if (!RM && window.Lenis) {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.95 });
    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
    } else {
      (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
    }
  }
  function goTo(target) {
    if (!target) return;
    revealNow(target);
    // A case section starts with a deep band of padding; land on its heading instead (eyebrow just under the header).
    var aim = target, gap = 8;
    if (target.classList.contains("case")) { aim = $(".case-head", target) || target; gap = 28; }
    if (lenis) lenis.scrollTo(aim, { offset: -hdrH() - gap, duration: 1.4 });
    else window.scrollTo({ top: aim.getBoundingClientRect().top + scrollY - hdrH() - gap, behavior: RM ? "auto" : "smooth" });
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]'); if (!a) return;
    var id = a.getAttribute("href"); if (id.length < 2) return;
    var t = document.getElementById(id.slice(1)); if (!t) return;
    e.preventDefault(); goTo(t);
    if (history.replaceState) history.replaceState(null, "", id);
  });

  /* ── Header + rail ── */
  var rail = $("#rail"), hero = $(".hero"), closeSec = $(".close");
  function onScroll() {
    var y = window.scrollY || 0;
    if (hdr) hdr.classList.toggle("solid", y > 24);
    if (rail && hero) {
      var past = hero.getBoundingClientRect().bottom < innerHeight * 0.4;
      var atEnd = closeSec && closeSec.getBoundingClientRect().top < innerHeight * 0.5;
      rail.classList.toggle("on", past && !atEnd);
    }
  }
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  var cases = $$(".case");
  if (rail && "IntersectionObserver" in window) {
    var links = $$("a", rail);
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (l) { l.classList.toggle("on", l.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    cases.forEach(function (c) { io.observe(c); });
  }

  /* ── Reveal ── */
  var rvs = $$(".rv");
  function revealNow(scope) { $$(".rv", scope).concat(scope.classList && scope.classList.contains("rv") ? [scope] : []).forEach(function (el) { el.classList.add("in"); }); }
  function revealVisible() { rvs.forEach(function (el) { if (!el.classList.contains("in") && el.getBoundingClientRect().top < innerHeight * 0.95) el.classList.add("in"); }); }
  if (RM || !("IntersectionObserver" in window)) rvs.forEach(function (el) { el.classList.add("in"); });
  else {
    var rio = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); rio.unobserve(en.target); } }); }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
    rvs.forEach(function (el) { rio.observe(el); });
    var settle; addEventListener("scroll", function () { clearTimeout(settle); settle = setTimeout(revealVisible, 160); }, { passive: true });
    addEventListener("scrollend", revealVisible);
    revealVisible();
  }

  /* ── Hero title ── */
  if (!RM && window.gsap) {
    gsap.from(".hero h1 .ln > span", { yPercent: 110, duration: 1.2, ease: "power4.out", stagger: 0.12, delay: 0.1 });
    gsap.from(".hero-side > *", { y: 18, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.08, delay: 0.45 });
    // The number drifts beside the case text; on phones (<= 520 px) it is stacked ABOVE the text, where the drift landed on
    // the eyebrow line (Michael, iPhone, 8 Oct), so it stays still there.
    if (window.ScrollTrigger && !(window.matchMedia && matchMedia("(max-width: 520px)").matches)) $$(".case-num").forEach(function (n) {
      gsap.fromTo(n, { y: 40 }, { y: -40, ease: "none", scrollTrigger: { trigger: n.closest(".case"), start: "top bottom", end: "bottom top", scrub: true } });
    });
  }

  /* ── One piece of media at a time ── */
  function pauseAll(except) {
    $$("video").forEach(function (v) {
      if (v === except || v.muted) return;     // muted loops (previews, motion test) keep running
      if (!v.paused) v.pause();
    });
  }

  /* ── Index cards: hover to preview ── */
  $$(".card").forEach(function (c) {
    var v = $("video", c); if (!v || RM) return;
    var start = function () { if (!v.src) v.src = v.getAttribute("data-src"); var p = v.play(); if (p && p.catch) p.catch(function () {}); c.classList.add("playing"); };
    var stop = function () { v.pause(); c.classList.remove("playing"); };
    if (HOVER) { c.addEventListener("pointerenter", start); c.addEventListener("pointerleave", stop); c.addEventListener("focus", start); c.addEventListener("blur", stop); }
  });
  // Touch screens: play the preview of whichever card sits in the middle of the scroller.
  if (!HOVER && !RM && "IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        var c = en.target, v = $("video", c); if (!v) return;
        if (en.isIntersecting) { if (!v.src) v.src = v.getAttribute("data-src"); var p = v.play(); if (p && p.catch) p.catch(function () {}); c.classList.add("playing"); }
        else { v.pause(); c.classList.remove("playing"); }
      });
    }, { threshold: 0.85 });
    $$(".card").forEach(function (c) { cio.observe(c); });
  }

  /* ── Filters ── */
  $$(".filters button").forEach(function (b) {
    b.addEventListener("click", function () {
      var f = b.getAttribute("data-filter");
      $$(".filters button").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      $$(".card").forEach(function (c) { c.classList.toggle("off", f !== "all" && (" " + c.getAttribute("data-tags") + " ").indexOf(" " + f + " ") < 0); });
      track("portfolio_filter", { filter: f });
    });
  });

  /* ── Feature films ── */
  $$(".film").forEach(function (fig) {
    var v = $("video", fig), btn = $(".film-play", fig), title = fig.getAttribute("data-title") || "";
    btn.addEventListener("click", function () {
      if (!v.getAttribute("src")) { v.src = fig.getAttribute("data-src"); v.preload = "auto"; }
      v.controls = true; fig.classList.add("started");
      pauseAll(v);
      var p = v.play(); if (p && p.catch) p.catch(function () { fig.classList.remove("started"); v.controls = false; });
      track("video_start", { video_title: title, location: "portfolio" });
    });
    v.addEventListener("play", function () { pauseAll(v); });
    v.addEventListener("ended", function () { track("video_complete", { video_title: title, location: "portfolio" }); });
  });

  /* ── Theater ── */
  var th = $("#theater"), box = $("[data-box]", th), cap = $("[data-cap]", th), count = $("[data-count]", th);
  var list = [], idx = 0, lastFocus = null;
  function itemOf(el) {
    return { src: el.getAttribute("data-src"), poster: el.getAttribute("data-poster"), title: el.getAttribute("data-title") || "", v: el.getAttribute("data-ratio") === "v" };
  }
  function show(i) {
    idx = (i + list.length) % list.length;
    var it = list[idx];
    box.innerHTML = "";
    var isVideo = /\.mp4(\?|$)/.test(it.src);
    var node;
    if (isVideo) {
      node = document.createElement("video");
      node.controls = true; node.playsInline = true; node.autoplay = true; node.preload = "auto";
      node.setAttribute("controlslist", "nodownload noremoteplayback");
      if (it.poster) node.poster = it.poster;
      node.src = it.src;
      // Size to fit the box whatever the shape: fill the height for 9:16, the width for 16:9.
      if (it.v) node.style.height = "100%"; else node.style.width = "100%";
      track("video_start", { video_title: it.title, location: "portfolio_theater" });
    } else {
      node = document.createElement("img"); node.src = it.src; node.alt = it.title;
      node.style.objectFit = "contain";
    }
    box.appendChild(node);
    cap.innerHTML = ""; var b = document.createElement("b"); b.textContent = it.title; cap.appendChild(b);
    count.textContent = list.length > 1 ? (idx + 1) + " / " + list.length : "";
    $("[data-prev]", th).hidden = $("[data-next]", th).hidden = list.length < 2;
  }
  function openTheater(items, i) {
    list = items; lastFocus = document.activeElement;
    pauseAll(null);
    th.hidden = false; th.classList.add("open"); document.body.style.overflow = "hidden";
    if (lenis) lenis.stop();
    show(i); $(".theater-x", th).focus({ preventScroll: true });
  }
  function closeTheater() {
    var v = $("video", box); if (v) v.pause();
    box.innerHTML = ""; th.classList.remove("open"); th.hidden = true; document.body.style.overflow = "";
    if (lenis) lenis.start();
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-gal] [data-src]"); if (!el) return;
    e.preventDefault();
    var gal = el.closest("[data-gal]"), items = $$("[data-src]", gal);
    openTheater(items.map(itemOf), items.indexOf(el));
  });
  $$("[data-close]", th).forEach(function (b) { b.addEventListener("click", closeTheater); });
  $("[data-prev]", th).addEventListener("click", function () { show(idx - 1); });
  $("[data-next]", th).addEventListener("click", function () { show(idx + 1); });
  document.addEventListener("keydown", function (e) {
    if (th.hidden) return;
    if (e.key === "Escape") closeTheater();
    else if (e.key === "ArrowRight") show(idx + 1);
    else if (e.key === "ArrowLeft") show(idx - 1);
    else if (e.key === "Tab") {   // keep focus inside the dialog
      var f = $$("button:not([hidden]), video", th); if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  var tx = null;
  th.addEventListener("touchstart", function (e) { tx = e.touches[0].clientX; }, { passive: true });
  th.addEventListener("touchend", function (e) {
    if (tx === null || list.length < 2) return;
    var dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
  });

  /* ── Softlips storyboard ── */
  var SHOTS = [
    ["00:00 — 00:02", "The Touch", "Extreme macro: the balm tip meets her lower lip at a quarter speed and the gloss blooms. Under it, a whispered hush."],
    ["00:02 — 00:04.5", "Shhh", "Frontal: she holds the stick upright to her lips like a secret. Serene eye contact and a slow push-in."],
    ["00:04.5 — 00:07", "The Glow", "Three-quarter angle: applying at the corner of a smile while the camera drifts around her in warm rim light."],
    ["00:07 — 00:09", "The Glide", "The signature shot: a side-macro glide across the upper lip at a fifth of real speed, leaving a cherry sheen."],
    ["00:09 — 00:11", "The Payoff", "Medium close-up: the finished gloss and a closed-lip, knowing smile."],
    ["00:11 — 00:13", "Product Hero", "Repair Cherry on pink silk, with two cherries and a single droplet."],
    ["00:13 — 00:15", "End Card", "“What your lips say about you,” the Softlips wordmark and where to buy it, with the line spoken softly: “So… what do your lips say about you?”"],
  ];
  var board = $("#board");
  if (board) {
    var bi = 0, auto = null, touched = false;
    var bImg = $("[data-board-img]", board), tabs = $$(".timeline button", board);
    var setShot = function (i) {
      bi = (i + SHOTS.length) % SHOTS.length;
      var s = SHOTS[bi];
      bImg.style.opacity = 0;
      setTimeout(function () { bImg.src = "/work/assets/still/softlips-" + (bi + 1) + ".webp"; bImg.alt = "Shot " + (bi + 1) + ": " + s[1]; bImg.onload = function () { bImg.style.opacity = 1; }; }, RM ? 0 : 180);
      $("[data-board-tc]", board).textContent = s[0];
      $("[data-board-n]", board).textContent = "Shot " + String(bi + 1).padStart(2, "0") + " / 07";
      $("[data-board-t]", board).textContent = s[1];
      $("[data-board-d]", board).textContent = s[2];
      $("[data-board-bar]", board).style.width = ((bi + 1) / SHOTS.length * 100) + "%";
      tabs.forEach(function (t, k) { t.setAttribute("aria-current", k === bi ? "true" : "false"); });
    };
    var stopAuto = function () { touched = true; clearInterval(auto); auto = null; };
    tabs.forEach(function (t, k) { t.addEventListener("click", function () { stopAuto(); setShot(k); }); });
    $("[data-board-prev]", board).addEventListener("click", function () { stopAuto(); setShot(bi - 1); });
    $("[data-board-next]", board).addEventListener("click", function () { stopAuto(); setShot(bi + 1); });
    $(".board-shot", board).addEventListener("click", function () {
      stopAuto();
      openTheater(SHOTS.map(function (s, k) { return { src: "/work/assets/still/softlips-" + (k + 1) + ".webp", title: "Shot " + (k + 1) + " · " + s[1] + " · " + s[0] }; }), bi);
    });
    if (!RM && "IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (en) {
          if (en.isIntersecting && !touched && !auto) auto = setInterval(function () { setShot(bi + 1); }, 3200);
          if (!en.isIntersecting && auto) { clearInterval(auto); auto = null; }
        });
      }, { threshold: 0.5 }).observe(board);
    }
  }

  /* ── Muted motion loops: load and play only while visible ── */
  $$("video[data-autoplay]").forEach(function (v) {
    if (RM) { v.removeAttribute("data-autoplay"); return; }
    if (!("IntersectionObserver" in window)) { v.src = v.getAttribute("data-src"); return; }
    new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting) { if (!v.getAttribute("src")) v.src = v.getAttribute("data-src"); var p = v.play(); if (p && p.catch) p.catch(function () {}); }
        else v.pause();
      });
    }, { threshold: 0.3 }).observe(v);
  });

  /* ── Laurie's live site, inside a browser frame ── */
  $$(".browser-view").forEach(function (view) {
    var btn = $(".go button", view), frame = null, W = 1440;
    var fit = function () {
      if (!frame) return;
      var s = view.clientWidth / W;
      frame.style.width = W + "px"; frame.style.height = (view.clientHeight / s) + "px";
      frame.style.transform = "scale(" + s + ")";
    };
    btn.addEventListener("click", function () {
      if (window.innerWidth < 700) { window.open(view.getAttribute("data-site"), "_blank", "noopener"); return; }  // too small to explore in a frame
      frame = document.createElement("iframe");
      frame.src = view.getAttribute("data-site"); frame.title = "The Thriving Project website (live)";
      frame.setAttribute("loading", "lazy"); frame.setAttribute("referrerpolicy", "no-referrer");
      view.appendChild(frame); view.classList.add("live"); fit();
      pauseAll(null);
      track("portfolio_live_site", { site: "thrivingincollege.org" });
    });
    addEventListener("resize", fit);
  });

  /* ── CTA tracking ── */
  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-cta]"); if (a) track("portfolio_cta", { cta: a.getAttribute("data-cta") });
  });
  track("portfolio_view", {});
})();
