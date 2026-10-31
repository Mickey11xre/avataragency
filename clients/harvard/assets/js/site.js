/* Harvard Investment Group — behavior: header, menu, scroll-driven animation (GSAP + ScrollTrigger + Lenis),
   galleries, contact form, YouTube on tap, and the avatar stage placeholder (AVATAR-STAGE-SPEC v1.3). */
(function () {
  "use strict";
  var d = document, html = d.documentElement, body = d.body;
  var RM = html.classList.contains("rm");
  var ROOT = body.getAttribute("data-root") || "";
  var hasGsap = typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined";
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);

  /* ── Smooth scroll (desktop pointer only; phones keep native scrolling) ── */
  var lenis = null;
  if (!RM && typeof Lenis !== "undefined" && matchMedia("(pointer: fine)").matches) {
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    html.classList.add("lenis");
    if (hasGsap) { lenis.on("scroll", ScrollTrigger.update); gsap.ticker.add(function (t) { lenis.raf(t * 1000); }); gsap.ticker.lagSmoothing(0); }
    else { (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0); }
    // anchor links scroll through Lenis so the header offset is respected
    d.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href*="#"]'); if (!a) return;
      var url = new URL(a.href, location.href); if (url.pathname !== location.pathname || !url.hash) return;
      var t = d.querySelector(url.hash); if (!t) return;
      e.preventDefault(); closeMenu(); lenis.scrollTo(t, { offset: -(parseInt(getComputedStyle(html).getPropertyValue("--hdr")) || 84) - 12 });
      history.pushState(null, "", url.hash);
    });
  }

  /* ── Header: solid after the hero's first 60px, hides on scroll down, returns on scroll up ── */
  var hdr = d.getElementById("hdr"), lastY = 0;
  function onScroll() {
    var y = window.scrollY || 0;
    hdr.classList.toggle("is-solid", y > 40);
    hdr.classList.toggle("is-hidden", y > 400 && y > lastY + 4 && !body.classList.contains("menu-open"));
    lastY = y;
  }
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* ── Mobile menu ── */
  var burger = d.querySelector(".burger"), menu = d.getElementById("menu");
  function closeMenu() { if (!menu || menu.hidden) return; menu.hidden = true; burger.setAttribute("aria-expanded", "false"); burger.setAttribute("aria-label", "Open menu"); body.classList.remove("menu-open"); if (lenis) lenis.start(); }
  if (burger) burger.addEventListener("click", function () {
    var open = menu.hidden; menu.hidden = !open; burger.setAttribute("aria-expanded", String(open)); burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    body.classList.toggle("menu-open", open); if (lenis) open ? lenis.stop() : lenis.start();
  });
  d.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeMenu(); closeTheater(); } });

  /* ── Hero entrance ── */
  var heroTitle = d.querySelector(".hero-title"), heroCopy = d.querySelector(".hero-copy, .about-hero-copy");
  if (heroTitle) {
    if (hasGsap && !RM) {
      gsap.to(heroTitle.querySelectorAll(".ln span"), { y: 0, duration: 1.3, ease: "power4.out", stagger: 0.14, delay: 0.15, onStart: function () { heroTitle.classList.add("is-in"); } });
      gsap.set(heroTitle.querySelectorAll(".ln span"), { y: "110%" });
    } else heroTitle.classList.add("is-in");
  }
  // a short timer, not requestAnimationFrame: rAF never fires in a background tab, and the copy would stay hidden
  if (heroCopy) setTimeout(function () { heroCopy.classList.add("is-in"); }, 60);

  /* ── Ambient loop layer (Home): cycles the approved clips with a crossfade; shows through the hero and the .peek
        breaks. Plays only while the hero or a break is on screen, never under reduced motion or in a hidden tab. ── */
  var amb = d.querySelector("[data-ambient]");
  if (amb && !RM) {
    var clips = []; try { clips = JSON.parse(amb.getAttribute("data-clips")) || []; } catch (e) {}
    var vids = amb.querySelectorAll(".amb-v"), cur = 0, active = 0, wanted = false, small = matchMedia("(max-width: 900px)").matches;
    var srcOf = function (c) { return small && c.small ? c.small : c.src; };
    function load(v, i) { var c = clips[i]; if (!c) return; if (v.getAttribute("data-i") !== String(i)) { v.src = srcOf(c); v.setAttribute("data-i", String(i)); v.load(); } }
    function start() {
      if (!clips.length) return;
      var v = vids[active]; load(v, cur);
      v.loop = clips.length === 1;
      v.play().catch(function () {});
      if (clips.length > 1) load(vids[1 - active], (cur + 1) % clips.length);   // preload the next one on the idle element
    }
    function next() {
      if (clips.length < 2) return;
      cur = (cur + 1) % clips.length; var from = vids[active]; active = 1 - active; var to = vids[active];
      load(to, cur); to.currentTime = 0; to.play().catch(function () {});
      to.classList.add("is-on"); from.classList.remove("is-on");
      setTimeout(function () { from.pause(); }, 1300);
      var caps = d.querySelectorAll("[data-peek]"); if (caps[0] && clips[cur].label) caps[0].textContent = clips[cur].label;
    }
    vids.forEach(function (v) { v.addEventListener("ended", function () { if (v === vids[active]) next(); }); });
    var watch = d.querySelectorAll(".hero-home, .peek"), seen = new Set();
    var aio = new IntersectionObserver(function (es) {
      es.forEach(function (en) { en.isIntersecting ? seen.add(en.target) : seen.delete(en.target); });
      wanted = seen.size > 0;
      if (wanted && !d.hidden) { if (vids[active].paused) start(); } else vids.forEach(function (v) { v.pause(); });
    }, { threshold: 0.05 });
    watch.forEach(function (el) { aio.observe(el); });
    d.addEventListener("visibilitychange", function () { if (d.hidden) vids.forEach(function (v) { v.pause(); }); else if (wanted) vids[active].play().catch(function () {}); });
    start();
  }
  /* Harrison's welcome film in the hero: loops muted while on screen; the stage's sound icon replays it from 0:00
     with sound, and when that sounded pass ends it goes back to the silent loop. "Talk to Harrison" below it jumps to
     the stage (and will start the live conversation once the avatar is built). */
  var filmCol = d.querySelector("[data-hero-film]"), film = d.querySelector("[data-film]");
  if (filmCol) setTimeout(function () { filmCol.classList.add("is-in"); }, 60);
  if (film) {
    var fv = film.querySelector("video"), fs = film.querySelector(".film-sound");
    if (fv && RM) { fv.removeAttribute("autoplay"); fv.pause(); }
    else if (fv) {
      var fio = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { if (fv.paused) fv.play().catch(function () {}); } else if (!fv.muted) { /* keep a sounded pass going */ } else fv.pause(); }); }, { threshold: 0.2 });
      fio.observe(film);
    }
    function filmQuiet() { fv.muted = true; fv.loop = true; fs.setAttribute("aria-pressed", "false"); fs.querySelector("use").setAttribute("href", "#i-sound-off"); fs.setAttribute("aria-label", "Play the welcome film with sound"); fs.title = fs.getAttribute("aria-label"); }
    // a tap anywhere on the frame toggles the sound (Michael, 10-30), not only the icon; the icon stays the accessible control
    if (fs && fv) film.addEventListener("click", function () {
      var on = fs.getAttribute("aria-pressed") !== "true";
      if (!on) { filmQuiet(); return; }
      // a sounded pass plays from the top, once, then the silent loop resumes
      d.querySelectorAll("video").forEach(function (o) { if (o !== fv && !o.paused && !o.muted) o.pause(); });
      fv.muted = false; fv.loop = false; fv.currentTime = 0; fv.play().catch(function () {});
      fs.setAttribute("aria-pressed", "true"); fs.querySelector("use").setAttribute("href", "#i-vol"); fs.setAttribute("aria-label", "Mute the welcome film"); fs.title = fs.getAttribute("aria-label");
    });
    if (fv) fv.addEventListener("ended", function () { filmQuiet(); fv.play().catch(function () {}); });
  }
  // Talk to Harrison (under the film): go to the stage and start the conversation in the same click (the browser's
  // activation for audio and the microphone comes from this tap); while the agent is not live the stage shows its toast.
  d.querySelectorAll("[data-talk]").forEach(function (a) {
    a.addEventListener("click", function () {
      var st = d.getElementById("stage"); if (!st) return;
      var talk = st.querySelector(".ava-talk");
      if (window.HigStage && window.HigStage.start) window.HigStage.start();
      else setTimeout(function () { if (talk) { talk.classList.add("flash"); talk.focus({ preventScroll: true }); setTimeout(function () { talk.classList.remove("flash"); }, 2600); } }, 900);
    });
  });

  /* ── Scroll animation ── */
  if (hasGsap && !RM) {
    // text/blocks rise in
    // after the tween, the .in class holds the final state and the inline styles are cleared (so CSS transforms/hover work)
    ScrollTrigger.batch(".rv", { start: "top 88%", once: true, onEnter: function (els) {
      gsap.to(els, { opacity: 1, y: 0, duration: 1.05, ease: "power3.out", stagger: 0.09, overwrite: true,
        onComplete: function () { els.forEach(function (el) { el.classList.add("in"); gsap.set(el, { clearProps: "all" }); }); } });
    } });
    // images: curtain reveal + settle from a slight zoom
    d.querySelectorAll(".rv-img").forEach(function (el) {
      var im = el.querySelector("img");
      gsap.timeline({ scrollTrigger: { trigger: el, start: "top 86%", once: true } })
        .to(el, { clipPath: "inset(0 0 0% 0)", duration: 1.25, ease: "power4.out" }, 0)
        .to(im, { scale: 1, duration: 1.6, ease: "power3.out" }, 0);
    });
    // gallery grids: staggered rise
    d.querySelectorAll(".gal, .mosaic").forEach(function (g) {
      var items = g.querySelectorAll(".gi"); if (!items.length) return;
      gsap.set(items, { opacity: 0, y: 30 });
      ScrollTrigger.create({ trigger: g, start: "top 88%", once: true, onEnter: function () { gsap.to(items, { opacity: 1, y: 0, duration: .9, ease: "power3.out", stagger: { each: 0.06, from: "start" }, clearProps: "transform" }); } });
    });
    // page heroes (image): parallax + push-in while the copy fades up and away
    var hm = d.querySelector(".hero-page .hero-media");
    if (hm) {
      gsap.to(hm, { yPercent: 18, scale: 1.08, ease: "none", scrollTrigger: { trigger: hm.parentNode, start: "top top", end: "bottom top", scrub: true } });
      var hc = d.querySelector(".hero-page .hero-copy"); if (hc) gsap.to(hc, { yPercent: -14, opacity: 0, ease: "none", scrollTrigger: { trigger: hm.parentNode, start: "40% top", end: "bottom top", scrub: true } });
    }
    // home hero: the fixed ambient layer breathes in slowly as the first screen scrolls away; copy and film drift up
    var hh = d.querySelector(".hero-home");
    if (hh && amb) {
      // scale the pictures INSIDE the layer, never the layer itself: a scaled fixed layer is wider than the screen, and
      // iPhone Safari then lets a pinch zoom out to that width (Michael saw the loop beside the page, 10-30)
      gsap.to(amb.querySelectorAll(".amb-poster, .amb-v"), { scale: 1.07, ease: "none", scrollTrigger: { trigger: hh, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(hh.querySelector(".hero-copy"), { yPercent: -10, opacity: 0, ease: "none", scrollTrigger: { trigger: hh, start: "45% top", end: "bottom top", scrub: true } });
      gsap.to(hh.querySelector(".hero-film-col"), { yPercent: -22, ease: "none", scrollTrigger: { trigger: hh, start: "top top", end: "bottom top", scrub: true } });
    }
    // featured 2201: the three layers float in from the sides as the block arrives, then keep drifting at their own
    // speeds (findrealestate-style depth) while it is in view
    var pin = d.querySelector("[data-pin]");
    if (pin) {
      var desk = matchMedia("(min-width: 901px)").matches;
      pin.querySelectorAll(".fl").forEach(function (fl, i) {
        var from = fl.getAttribute("data-from"), vw = innerWidth;
        var start = from === "left" ? { x: -(desk ? .22 : .35) * vw, y: 40 } : from === "right" ? { x: (desk ? .22 : .35) * vw, y: 60 } : { x: 0, y: (desk ? 260 : 160) };
        start.opacity = 0; start.rotate = from === "left" ? -2.5 : from === "right" ? 2.5 : 0;
        gsap.fromTo(fl, start, { x: 0, y: 0, opacity: 1, rotate: 0, ease: "power2.out", immediateRender: true,
          scrollTrigger: { trigger: pin, start: "top 92%", end: "top 28%", scrub: 0.7 } });
        var drift = [-30, 50, 90][i] || 0;   // continues after the entrance, each layer at its own speed
        gsap.to(fl, { y: -drift, ease: "none", scrollTrigger: { trigger: pin, start: "top 28%", end: "bottom top", scrub: true } });
      });
    }
    // counters (1995, 30+)
    d.querySelectorAll("[data-count]").forEach(function (el) {
      var end = parseInt(el.getAttribute("data-count"), 10); if (!end) return;
      var sup = el.querySelector("sup"), supHtml = sup ? sup.outerHTML : "";
      var o = { v: end > 1000 ? end - 60 : 0 };
      ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: function () { gsap.to(o, { v: end, duration: 1.6, ease: "power2.out", onUpdate: function () { el.innerHTML = Math.round(o.v) + supHtml; } }); } });
    });
    // page-hero image reveals immediately
    addEventListener("load", function () { ScrollTrigger.refresh(); });
  } else {
    d.querySelectorAll(".rv").forEach(function (el) { el.classList.add("in"); });
  }

  /* ── Theater (lightbox) over every [data-gal] group ── */
  var th = d.getElementById("theater"), thImg = th && th.querySelector("[data-img]"), thCap = th && th.querySelector("[data-cap]"), thCount = th && th.querySelector("[data-count]");
  var group = [], idx = 0, opener = null;
  function show(i) {
    idx = (i + group.length) % group.length; var b = group[idx];
    thImg.src = b.getAttribute("data-full"); thImg.alt = b.getAttribute("data-cap") || ""; thCap.textContent = b.getAttribute("data-cap") || "";
    thCount.textContent = group.length > 1 ? (idx + 1) + " / " + group.length : "";
    // preload neighbours
    [1, -1].forEach(function (k) { var n = group[(idx + k + group.length) % group.length]; if (n) { var p = new Image(); p.src = n.getAttribute("data-full"); } });
  }
  function openTheater(btn) {
    var g = btn.closest("[data-gal]"); group = g ? [].slice.call(g.querySelectorAll(".gi")) : [btn]; opener = btn;
    th.hidden = false; body.classList.add("menu-open"); if (lenis) lenis.stop(); show(group.indexOf(btn)); th.querySelector(".theater-x").focus();
  }
  function closeTheater() { if (!th || th.hidden) return; th.hidden = true; body.classList.remove("menu-open"); if (lenis) lenis.start(); thImg.removeAttribute("src"); if (opener) opener.focus(); }
  if (th) {
    d.addEventListener("click", function (e) {
      var b = e.target.closest && e.target.closest(".gi"); if (b) { e.preventDefault(); openTheater(b); return; }
      if (e.target.closest("[data-close]")) closeTheater();
      else if (e.target.closest("[data-prev]")) show(idx - 1);
      else if (e.target.closest("[data-next]")) show(idx + 1);
    });
    d.addEventListener("keydown", function (e) { if (th.hidden) return; if (e.key === "ArrowRight") show(idx + 1); if (e.key === "ArrowLeft") show(idx - 1); });
    var sx = null; th.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
    th.addEventListener("touchend", function (e) { if (sx === null) return; var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1)); sx = null; });
  }

  /* ── YouTube on tap (no third-party requests until the visitor asks) ── */
  d.querySelectorAll("[data-yt]").forEach(function (box) {
    box.querySelector(".yt-play").addEventListener("click", function () {
      var f = d.createElement("iframe"); f.src = "https://www.youtube-nocookie.com/embed/" + box.getAttribute("data-yt") + "?autoplay=1&rel=0"; f.allow = "autoplay; encrypted-media; picture-in-picture"; f.allowFullscreen = true; f.title = "Strike Out Against Drugs video";
      box.innerHTML = ""; box.appendChild(f);
    });
  });

  /* ── Contact form → POST /api/contact (JSON); falls back to a plain form post without JS ── */
  var form = d.getElementById("cform");
  if (form) {
    var msg = form.querySelector(".f-msg"), sent = d.getElementById("sent");
    if (/[?&]sent=1/.test(location.search)) { form.hidden = true; sent.hidden = false; }
    form.addEventListener("submit", function (e) {
      e.preventDefault(); msg.textContent = ""; msg.classList.remove("err");
      var bad = false;
      form.querySelectorAll("[required]").forEach(function (f) { var ok = f.value.trim().length > 1 && (f.type !== "email" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value)); f.setAttribute("aria-invalid", ok ? "false" : "true"); if (!ok) bad = true; });
      if (bad) { msg.textContent = "Please add your name, a valid email and a message."; msg.classList.add("err"); return; }
      var btn = form.querySelector("button[type=submit]"); btn.disabled = true; msg.textContent = "Sending…";
      var data = {}; new FormData(form).forEach(function (v, k) { data[k] = v; });
      fetch(form.action, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
        .then(function (res) {
          if (res.ok) { form.hidden = true; sent.hidden = false; sent.classList.add("in"); sent.scrollIntoView({ behavior: "smooth", block: "center" }); }
          else { msg.textContent = "The message could not be sent. Please email " + "greg@harvardinvestmentgroup.com" + " directly."; msg.classList.add("err"); btn.disabled = false; }
        })
        .catch(function () { msg.textContent = "The message could not be sent. Please email greg@harvardinvestmentgroup.com directly."; msg.classList.add("err"); btn.disabled = false; });
    });
  }

  /* ── Avatar stage: Harrison's intro loop, the live conversation and the panel he drives (AVATAR-STAGE-SPEC §5-8).
     Ported from the ACCU stage (clients/accu/accu-stage.js, live since 10-22). Differences: the panel's four cards are
     links to the site's pages, and the contact form REALLY sends (POST data-contact → the site's contact function,
     which emails Greg's office; michael@ while this is a preview). While the agent is not live, data-token answers 503
     and Talk shows the "arriving soon" toast; nothing metered ever starts. ── */
  var stage = d.getElementById("stage");
  if (stage) (function () {
    var $ = function (s, r) { return (r || stage).querySelector(s); }, $$ = function (s, r) { return [].slice.call((r || stage).querySelectorAll(s)); };
    var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
    var name = stage.getAttribute("data-name") || "Harrison";
    var CFG = {
      TOKEN: stage.getAttribute("data-token") || "/api/hig-harrison-token",
      SEEN_PATH: stage.getAttribute("data-seen-path") || "/api",
      CONTACT: stage.getAttribute("data-contact") || "/api/contact",
      POPOUT: stage.getAttribute("data-popout") || "",
      PHONE: stage.getAttribute("data-office-phone") || "", EMAIL: stage.getAttribute("data-office-email") || "",
      SDK_URL: "https://cdn.jsdelivr.net/npm/@touchcastllc/napster-companion-api@1.5.0/lib/index.standalone.js",
      CAP_S: 600,          // ten-minute session cap, as on every stage
      INTRO_END: 28.4,     // harrison-intro.mp4: speech ends at about 28.2 s (harrison-intro.vtt)
    };
    var av = $(".stage-av"), vid = $(".ava-video"), capBox = $(".ava-caption"), snd = $(".ava-sound"), talk = $(".ava-talk"), toast = $(".ava-toast"), mount = d.getElementById("hig-mount");
    var panel = d.getElementById("hig-panel"), body = $(".panel-body", panel), titleEl = $(".panel-title", panel), backBtn = $(".panel-back", panel);
    var intro = stage.getAttribute("data-intro"), hasIntro = !!(vid && intro && snd);
    var instance = null, liveState = "idle";   // idle | connecting | live
    var visible = false;
    var tt; function say(t, ms) { toast.textContent = t || ""; toast.hidden = !t; clearTimeout(tt); if (t && ms) tt = setTimeout(function () { if (toast.textContent === t) toast.hidden = true; }, ms); }

    /* ═════════ His intro: silent loop; the sound icon replays it from 0:00 with captions ═════════ */
    // Source of truth: C:\VideoProjects\HarvardInvestmentGroup\AVATAR\HARRISON\STAGE\harrison-intro.vtt
    var LINES = [[0.78, 2.12, "Hi, my name is Harrison,"], [2.12, 4.40, "and I'm Harvard Investment Group's AI agent."],
      [5.49, 7.60, "Since 1995, founder Greg Cullen"], [7.60, 10.00, "has been investing in, and building,"],
      [10.00, 12.20, "Southern California's most coveted real estate,"], [12.47, 14.10, "along with early stage businesses."],
      [15.34, 17.95, "I can walk you through our investments,"], [17.95, 19.15, "our developments,"],
      [19.60, 20.90, "or Hope for the Hurting,"], [20.90, 22.40, "the charity Greg founded to help people rebuild their lives."],
      [23.42, 26.00, "Just tap the \"Talk to Harrison\" button and ask me anything,"], [26.44, 28.20, "or tap any of the options beside me."]];
    var hearing = false, lastT = 0, capKey = "";
    function caption(lines) { var k = JSON.stringify(lines || []); if (k === capKey) return; capKey = k; capBox.innerHTML = (lines || []).map(function (l) { return '<span class="cap">' + esc(l) + "</span>"; }).join(""); }
    function ensureSrc() { if (hasIntro && !vid.getAttribute("src")) vid.src = intro; }
    function playQuiet() { if (!hasIntro || RM || hearing || liveState !== "idle") return; ensureSrc(); vid.muted = true; var p = vid.play(); if (p && p.catch) p.catch(function () {}); }
    function soundIcon(on) { snd.setAttribute("aria-pressed", on ? "true" : "false"); snd.querySelector("use").setAttribute("href", on ? "#i-vol" : "#i-sound-off"); var l = on ? "Mute " + name + "\u2019s introduction" : "Play " + name + "\u2019s introduction with sound"; snd.setAttribute("aria-label", l); snd.title = l; }
    function stopHearing() { hearing = false; vid.muted = true; soundIcon(false); caption([]); if (RM) vid.pause(); }
    function flash(el, ms) { if (!el) return; el.classList.add("flash"); setTimeout(function () { el.classList.remove("flash"); }, ms || 1100); }
    function pulseActions() { if (S.mode !== "home") return; $$(".p-act", body).forEach(function (b, i) { setTimeout(function () { flash(b, 700); }, i * 160); }); }
    if (hasIntro) {
      snd.addEventListener("click", function () {
        if (liveState !== "idle") return;
        if (hearing) { stopHearing(); return; }
        ensureSrc(); hearing = true; vid.currentTime = 0; vid.muted = false; lastT = 0;
        d.querySelectorAll("video").forEach(function (o) { if (o !== vid && !o.paused && !o.muted) o.pause(); });
        var p = vid.play(); if (p && p.catch) p.catch(function () { stopHearing(); });
        soundIcon(true);
      });
      vid.addEventListener("timeupdate", function () {
        var t = vid.currentTime;
        if (hearing) {
          if (t + 0.3 < lastT || t > CFG.INTRO_END) { stopHearing(); pulseActions(); }
          else { var on = LINES.filter(function (l) { return t >= l[0] && t < l[1]; })[0]; caption(on ? [on[2]] : []); }
        }
        lastT = t;
      });
      vid.addEventListener("ended", function () { if (hearing) { stopHearing(); pulseActions(); } });   // reduced motion: loop is off there
      if (RM) vid.loop = false;
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (liveState !== "idle") return; if (visible) playQuiet(); else { vid.pause(); if (hearing) stopHearing(); } }, { threshold: 0.25 }).observe(stage);
      } else { visible = true; playQuiet(); }
      d.addEventListener("visibilitychange", function () { if (liveState !== "idle") return; if (d.hidden) { vid.pause(); if (hearing) stopHearing(); } else if (visible) playQuiet(); });
    } else if (snd) snd.hidden = true;

    /* ═════════ The panel: four cards, each opening a view ON the panel (Michael, 10-30): Contact Us = the contact form
       and review card; the other three = a short version of their page, from the <template id="pv-…"> build.js renders
       from the site's own copy. The back arrow walks back through the views. ═════════ */
    var HOME_HTML = body.innerHTML;   // the cards as built, restored whenever the panel goes home
    var TOPICS = { contact: "Contact Us", investing: "Invest with Harvard Investment Group", development: "Development partnerships", philanthropy: "Hope for the Hurting" };
    var VT = {}; try { VT = JSON.parse((d.getElementById("pv-titles") || {}).textContent || "{}"); } catch (e) {}
    var PAGE_VIEWS = {}; ["investing", "development", "philanthropy"].forEach(function (k) { var tpl = d.getElementById("pv-" + k); if (tpl) PAGE_VIEWS[k] = tpl.innerHTML; });
    var INTERESTS = ["Investing", "Raising capital", "Real estate", "Development partnership", "Philanthropy", "Speaking", "Press", "Other"];
    var S = { mode: "home", hist: [], topic: null, form: { name: "", email: "", phone: "", interest: "", note: "" }, review: null, sent: null, fail: "" };
    var TITLES = { home: "", form: VT.contact || "Contact Us", investing: VT.investing || "Investments", development: VT.development || "Developments", philanthropy: VT.philanthropy || "Hope for the Hurting", done: "Sent", failed: "Not sent" };
    var tr = function (v) { return String(v || "").trim(); };
    var validEmail = function (e) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e); };
    var arrow = '<svg aria-hidden="true"><use href="#i-arrow"/></svg>';
    /* Tells the live Harrison what the visitor just did on the panel, so he never re-asks for something they typed.
       "[Panel]" is the prefix his instructions react to; speak=true only when he should answer aloud. */
    var emit = function (text, speak) {
      if (!instance || !instance.sendCommand) return;
      try { instance.sendCommand({ type: "send_message", data: { text: "[Panel] " + text, role: "system", trigger_response: !!speak } }); } catch (e) {}
    };
    var officeLine = function () { return "Please call " + esc(CFG.PHONE) + ' or email <a href="mailto:' + esc(CFG.EMAIL) + '">' + esc(CFG.EMAIL) + "</a>."; };
    var field = function (id, lbl, type, val, opt, attrs) {
      return '<div class="p-field"><label for="hp-' + id + '">' + lbl + (opt ? " <span>(optional)</span>" : "") + "</label>" +
        (type === "textarea" ? '<textarea id="hp-' + id + '" rows="3" ' + (attrs || "") + ">" + esc(val) + "</textarea>"
          : '<input id="hp-' + id + '" type="' + type + '" value="' + esc(val) + '" ' + (attrs || "") + ">") + "</div>";
    };
    function interestField(val) {
      var opts = INTERESTS.slice(); if (val && opts.indexOf(val) < 0) opts.push(val);
      return '<div class="p-field"><label for="hp-interest">What is this about?</label><select id="hp-interest" data-bind="interest"><option value="">Choose one</option>' +
        opts.map(function (x) { return '<option' + (x === val ? " selected" : "") + ">" + esc(x) + "</option>"; }).join("") + "</select></div>";
    }
    function sig() { var f = S.form; return [tr(f.name), tr(f.email).toLowerCase(), tr(f.phone), tr(f.interest), tr(f.note)].join("|"); }
    var inReview = function () { return !!S.review; }, reviewFresh = function () { return !!S.review && S.review.sig === sig(); };
    function fields() { var f = S.form; return { name: tr(f.name), email: tr(f.email), phone: tr(f.phone), interest: tr(f.interest), note: tr(f.note) }; }
    function missing() { var m = []; if (!tr(S.form.name)) m.push("name"); if (!validEmail(tr(S.form.email))) m.push("email"); return m; }
    function reviewRows() { var f = fields(); return [["Name", f.name], ["Email", f.email], ["Phone", f.phone], ["About", f.interest], ["Note", f.note]].filter(function (x) { return x[1]; }); }
    var VIEWS = {
      home: function () { return HOME_HTML; },
      investing: function () { return PAGE_VIEWS.investing || HOME_HTML; },
      development: function () { return PAGE_VIEWS.development || HOME_HTML; },
      philanthropy: function () { return PAGE_VIEWS.philanthropy || HOME_HTML; },
      form: function () {
        if (inReview()) return '<div class="p-review"><p class="p-label">Is this correct?</p><dl class="p-rv">' +
          reviewRows().map(function (x) { return "<div><dt>" + x[0] + "</dt><dd>" + esc(x[1]) + "</dd></div>"; }).join("") +
          '</dl><p class="p-sub">Please check your details. Nothing is sent until you confirm.</p><div class="p-rv-acts"><button class="btn btn-gold" type="button" data-act="review-yes">Yes, send it ' + arrow + '</button><button class="btn btn-ghost" type="button" data-act="review-edit">Edit</button></div></div>';
        return '<p class="p-sub">Leave your details and Greg\u2019s office will reach out.</p><form class="p-form" novalidate>' +
          field("name", "Your name", "text", S.form.name, false, 'autocomplete="name" required data-bind="name"') +
          field("email", "Email", "email", S.form.email, false, 'autocomplete="email" required data-bind="email"') +
          field("phone", "Phone", "tel", S.form.phone, true, 'autocomplete="tel" data-bind="phone"') +
          interestField(S.form.interest) +
          field("note", "A short note", "textarea", S.form.note, true, 'data-bind="note"') +
          '<div class="p-hp" aria-hidden="true"><label>Website <input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>' +
          '<button class="btn btn-gold" type="submit">Review and send ' + arrow + '</button><p class="p-msg" role="status"></p></form>';
      },
      done: function () { return '<div class="p-done"><span class="tick">\u2713</span><h4>Your message is on its way.</h4><p>Greg\u2019s office will reach out shortly.</p><button class="btn btn-ghost" type="button" data-act="home">Back to the options</button></div>'; },
      failed: function () { return '<div class="p-done"><h4>The message could not be sent.</h4><p>' + officeLine() + '</p><button class="btn btn-ghost" type="button" data-act="retry">Try again</button></div>'; },
    };
    function render(opts) {
      opts = opts || {};
      titleEl.textContent = TITLES[S.mode] || "";
      panel.classList.toggle("is-home", S.mode === "home");
      backBtn.hidden = S.mode === "home";
      body.innerHTML = (VIEWS[S.mode] || VIEWS.home)();
      body.scrollTop = 0;
      if (S.mode === "home") markTopic();
      var form = $("form", body);
      if (form) form.addEventListener("submit", function (e) { e.preventDefault(); TOOLS_IMPL.submit_contact_details({}); });
      if (opts.focus && window.innerWidth > 900) { var f = $("input, button", body); if (f) f.focus({ preventScroll: true }); }   // no keyboard pop-up on phones
    }
    // replace: true for result views (Sent / Not sent), so Back never returns to a form that was already sent
    function go(mode, opts) {
      opts = opts || {};
      if (S.mode !== mode) { S.review = null; if (mode === "home") S.hist = []; else if (!opts.replace && S.mode !== "done" && S.mode !== "failed") S.hist.push(S.mode); }
      S.mode = mode; render(opts);
    }
    function goBack() { var m = S.hist.pop() || "home"; S.review = null; S.mode = m; if (m === "home") S.hist = []; render({}); }
    // Open a card's view: Contact Us = the form; the rest = their page view
    // fromTwin: a view Harrison opens doesn't stack, so Back always returns to the four options
    function openTopic(t, fromTwin) {
      S.topic = t; var m = t === "contact" ? "form" : t;
      if (S.mode !== m) { if (fromTwin) { S.hist = []; go(m, { replace: true }); } else go(m); }
      if (window.innerWidth <= 900) panel.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
    function setMsg(text) { var m = $(".p-msg", body); if (m) { m.classList.add("err"); m.textContent = text; } }
    function markTopic() { $$(".p-act", body).forEach(function (c) { c.classList.toggle("is-on", !!S.topic && c.getAttribute("data-topic") === S.topic); }); }
    // Scroll the panel (never the page) so a field Harrison just filled is in view.
    function reveal(el) {
      if (!el || body.scrollHeight <= body.clientHeight + 1) return;
      var b = body.getBoundingClientRect(), r = el.getBoundingClientRect();
      if (r.top < b.top) body.scrollTop -= (b.top - r.top) + 8; else if (r.bottom > b.bottom) body.scrollTop += (r.bottom - b.bottom) + 8;
    }
    function openReview(fromTwin) {
      if (S.mode !== "form") go("form");
      S.review = { sig: sig(), at: Date.now(), ok: false }; render({});
      var b = $('[data-act="review-yes"]', body); if (b && !fromTwin) b.focus({ preventScroll: true });
      if (fromTwin) return;
      emit("The visitor pressed Review and send. Nothing is sent yet: the panel shows their details for review (" + reviewRows().map(function (x) { return x[0].toLowerCase() + " " + x[1]; }).join(", ") + "). Read the name, the email and the topic back, spelling the email, and ask whether everything is correct. Send only after a clear yes, with submit_contact_details, or when they press Yes on the panel.", true);
    }
    backBtn.addEventListener("click", function () {
      if (S.mode === "form" && inReview()) { S.review = null; render({ focus: true }); emit("The visitor chose to edit their details. Nothing has been sent.", false); return; }
      var from = S.mode; goBack();
      // Measured 10-30: after Back he answered a follow-up ("How can I donate?") without reopening the view. Remind him here.
      if (from !== "home") emit("The visitor went back from " + (TITLES[from] || from) + " to " + (S.mode === "home" ? "the four options" : TITLES[S.mode]) + "." +
        (S.mode === "home" ? " That view is closed now: before your next answer about investing, developments or Hope for the Hurting, call show_topic again, even for a follow-up." : ""), false);
    });
    body.addEventListener("click", function (e) {
      // While Harrison is talking, links out of a view open in a new tab, so the conversation keeps going
      var link = e.target.closest("a.pv-row, a.pv-more");
      if (link && liveState !== "idle") { e.preventDefault(); window.open(link.href, "_blank", "noopener"); return; }
      var t = e.target.closest("[data-act], [data-topic]"); if (!t) return;
      var a = t.getAttribute("data-act");
      if (a === "home") go("home");
      else if (a === "retry") { S.review = null; go("form", { focus: true, replace: true }); }
      else if (a === "review-yes") { if (!S.review) return; S.review.ok = true; TOOLS_IMPL.submit_contact_details({}); }
      else if (a === "review-edit") { S.review = null; render({ focus: true }); emit("The visitor chose to edit their details. Nothing has been sent.", false); }
      else if (a === "note") {          // "Send Greg's office a note" / "Discuss a partnership" inside a view
        var from = S.mode, it = t.getAttribute("data-interest");
        if (it && !tr(S.form.interest)) S.form.interest = it;
        S.topic = "contact"; go("form", { focus: true });
        emit("From " + (TITLES[from] || "the panel") + ", the visitor tapped " + JSON.stringify(t.textContent.trim()) + ": the contact form is open" + (it ? " with the topic set to " + S.form.interest : "") + ". Offer to take their details, one at a time.", true);
      }
      else if (t.hasAttribute("data-topic")) {     // a card: open its view on the panel (the href is only the no-JavaScript fallback)
        e.preventDefault();
        var topic = t.getAttribute("data-topic"); openTopic(topic);
        if (topic === "contact") emit("The visitor opened Contact Us: the contact form is now on the panel. Offer to take their details, one at a time.", true);
        else emit("The visitor opened " + TOPICS[topic] + ": a short version of that page is on the panel. Say one or two sentences about it.", true);
      }
    });
    var BIND_LABEL = { name: "name", email: "email", phone: "phone number", interest: "topic", note: "note" };
    body.addEventListener("input", function (e) { var b = e.target.getAttribute && e.target.getAttribute("data-bind"); if (b) S.form[b] = e.target.value; });
    body.addEventListener("change", function (e) {
      var b = e.target.getAttribute && e.target.getAttribute("data-bind"); if (!b) return;
      S.form[b] = e.target.value; var v = tr(e.target.value); if (!v) return;
      if (b === "email") { e.target.setAttribute("aria-invalid", validEmail(v) ? "false" : "true"); if (!validEmail(v)) return; }
      emit("The visitor typed their " + BIND_LABEL[b] + ": " + v + "." + (b === "email" ? " Read it back letter by letter and ask whether it is correct." : ""), false);
    });

    /* ═════════ Harrison's four tools (names match his instructions exactly) ═════════ */
    var FIELD_IDS = { name: "name", email: "email", phone: "phone", interest: "interest", note: "note" };
    function needConfirm() {
      return { status: "needs_confirmation", fields: fields(),
        message: "Nothing is sent yet. The panel now shows these details to the visitor for review. Read the name, the email and the topic back (spell the email) and ask: 'Is all of that correct?' Fix anything they correct with fill_contact_details, then call submit_contact_details again only after they clearly say yes." };
    }
    function sendForm() {
      var f = fields();
      var message = "[Via Harrison, the website AI agent]\nInterest: " + (f.interest || "(not given)") + "\n" + (f.note || "(no note)");
      return fetch(CFG.CONTACT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: f.name, email: f.email, phone: f.phone, message: message, website: "" }) })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok && j && j.ok === true, status: r.status, body: j }; }); })
        .catch(function (e) { return { ok: false, status: 0, body: { error: String(e && e.message || e) } }; });
    }
    var TOOLS_IMPL = {
      show_topic: function (a) {
        a = a || {}; var t = a.topic;
        if (!TOPICS[t]) return { ok: false, error: "Unknown topic", topics: Object.keys(TOPICS) };
        // He calls it on EVERY reply about a subject (Michael, 10-30): a call for the view already open changes nothing.
        if (S.mode === t || (t === "contact" && S.mode === "form")) return { ok: true, topic: t, view: t === "contact" ? TITLES.form : TITLES[t], note: "That view is already open on the panel. Answer the visitor." };
        openTopic(t, true);
        if (t === "contact") return { ok: true, topic: t, view: TITLES.form, note: "The contact form is open on the panel. Ask for their details one at a time and fill them in with fill_contact_details, or let them type; ask them to type their email." };
        return { ok: true, topic: t, view: TITLES[t], note: "A short version of the " + TITLES[t] + " page is now on the panel beside you. Say one or two sentences about it; the visitor can tap back to the four options." };
      },
      show_contact_form: function () {
        if (S.mode !== "form") go("form"); else if (inReview()) { S.review = null; render({}); }
        return { ok: true, note: "The contact form is open on the panel. Ask for their details one at a time and fill them in with fill_contact_details, or let them type; ask them to type their email." };
      },
      fill_contact_details: function (a) {
        a = a || {}; var changed = [];
        ["name", "email", "phone", "interest", "note"].forEach(function (k) { if (a[k] != null && String(a[k]).trim() !== "") { S.form[k] = String(a[k]).trim(); changed.push(k); } });
        if (changed.indexOf("email") >= 0 && !validEmail(S.form.email)) { var bad = S.form.email; S.form.email = ""; changed.splice(changed.indexOf("email"), 1); render({}); return { ok: false, error: "That is not a valid email address: " + bad + ". Ask the visitor to type it into the form, or to spell it letter by letter.", form: fields(), still_needed: missing() }; }
        if (S.mode !== "form") go("form");
        else if (inReview() && !reviewFresh()) { openReview(true); changed.forEach(function (k) { flash($("#hp-" + FIELD_IDS[k], body)); }); return { ok: true, form: fields(), still_needed: missing(), note: "The details changed, so the visitor must confirm again. Read them back and ask whether everything is correct before calling submit_contact_details." }; }
        else if (!inReview()) { if (changed.indexOf("interest") >= 0) render({}); else changed.forEach(function (k) { var el = $("#hp-" + FIELD_IDS[k], body); if (el) el.value = S.form[k]; }); }
        changed.forEach(function (k) { var el = $("#hp-" + FIELD_IDS[k], body); if (el) { flash(el); reveal(el); } });   // the visitor sees Harrison writing
        return { ok: true, form: fields(), still_needed: missing() };
      },
      submit_contact_details: function () {
        var m = missing();
        if (m.length) { if (S.mode !== "form") go("form"); if (S.review) { S.review = null; render({}); } setMsg("Still needed: " + m.join(" and ") + "."); return { status: "missing", fields: m }; }
        var fromTwin = TOOLS_IMPL.__fromTwin;
        if (!reviewFresh()) { openReview(fromTwin); return needConfirm(); }
        if (fromTwin && Date.now() - S.review.at < 4000) return { status: "needs_confirmation", fields: fields(), message: "Nothing is sent. The visitor has not answered yet. Wait for a clear yes before calling submit_contact_details again." };
        if (!fromTwin && !S.review.ok) return needConfirm();
        var yes = $('[data-act="review-yes"]', body); if (yes) { yes.disabled = true; yes.textContent = "Sending\u2026"; }
        return sendForm().then(function (r) {
          if (r.ok) {
            S.sent = fields(); S.review = null; go("done", { replace: true });
            if (!fromTwin) emit("The visitor pressed Yes on the review card and their message was sent to Greg Cullen's office. Tell them, briefly, that it is on its way and the office will reach out shortly.", true);
            return { status: "sent" };
          }
          var reason = (r.body && (r.body.error || (r.body.fields && Object.keys(r.body.fields).join(", ")))) || ("HTTP " + r.status);
          S.fail = reason; S.review = null; go("failed", { replace: true });
          if (!fromTwin) emit("Sending the visitor's message failed (" + reason + "). The panel shows the office phone and email. Give them those instead.", true);
          return { status: "failed", reason: reason, office_phone: CFG.PHONE, office_email: CFG.EMAIL };
        });
      },
    };
    var str = function (d_) { return { type: "string", description: d_ }; };
    var TOOLS = [
      { name: "show_topic", description: "REQUIRED before every answer about investing, developments or properties, or Hope for the Hurting, including follow-up questions: call it first, then speak. It opens that option on the panel beside you, which the visitor can see (a call for the view already open changes nothing): \"contact\" (Contact Us: opens the contact form), \"investing\" (Invest with Harvard Investment Group), \"development\" (Development partnerships) or \"philanthropy\" (Hope for the Hurting). The last three open a short version of that page on the panel; the visitor can tap back.",
        inputSchema: { type: "object", properties: { topic: { type: "string", enum: Object.keys(TOPICS) } }, required: ["topic"] } },
      { name: "show_contact_form", description: "Open the contact form on the panel, to take a visitor's details for Greg Cullen's office: name, email, phone, what it is about, and a short note. Call it before you ask for any detail. The visitor can type into it too.",
        inputSchema: { type: "object", properties: {} } },
      { name: "fill_contact_details", description: "Fill in the contact form on the panel each time you learn a detail: the visitor's name, email, phone number, interest (one of: investing, raising capital, real estate, development partnership, philanthropy, speaking, press, other) and a short note. Only include the fields you just learned. Read each detail back; spell the email back letter by letter, and never build or guess an email yourself.",
        inputSchema: { type: "object", properties: { name: str("Full name"), email: str("Email address, exactly as the visitor gave it"), phone: str("Phone number"), interest: str("investing, raising capital, real estate, development partnership, philanthropy, speaking, press or other"), note: str("A short note: the topic, and good times to talk if they want a meeting") } } },
      { name: "submit_contact_details", description: "Send the visitor's details to Greg Cullen's office. The first call never sends: it shows the visitor a review card and returns needs_confirmation. Read back the name, the email (spelled) and the topic, ask \"Is all of that correct?\", fix anything with fill_contact_details, and call submit_contact_details again only after a clear yes. It returns sent, missing (with the fields still needed) or failed (then give the office phone and email).",
        inputSchema: { type: "object", properties: {} }, annotations: { destructiveHint: true } },
    ];
    function execTool(nm, args) {
      var fn = TOOLS.some(function (t) { return t.name === nm; }) && TOOLS_IMPL[nm];
      if (!fn) return Promise.resolve({ ok: false, error: "Unknown tool " + nm });
      TOOLS_IMPL.__fromTwin = true;
      var done = function (m) { TOOLS_IMPL.__fromTwin = false; return m; };
      try { return Promise.resolve(fn(args || {})).then(done, function (e) { return done({ ok: false, error: String(e && e.message || e) }); }); }
      catch (e) { return Promise.resolve(done({ ok: false, error: String(e && e.message || e) })); }
    }
    // Must run right BEFORE sdk.init(): the SDK reads the page's tools when it attaches.
    function installTools() {
      var mc = d.modelContext;
      if (!mc) { mc = new EventTarget(); try { Object.defineProperty(d, "modelContext", { value: mc, configurable: true }); } catch (e) { d.modelContext = mc; } }
      mc.getTools = function () { return Promise.resolve(TOOLS.map(function (t) { return { name: t.name, description: t.description, inputSchema: t.inputSchema, annotations: t.annotations }; })); };
      mc.executeTool = function (tool, jsonArgs) {
        var args = {}; try { args = typeof jsonArgs === "string" ? JSON.parse(jsonArgs || "{}") : (jsonArgs || {}); } catch (e) {}
        return execTool(tool && tool.name ? tool.name : tool, args);
      };
    }
    // What is already on the panel when a session starts, so he never re-asks for what the visitor already did.
    function panelSummary() {
      var bits = ["The panel is visible beside you"]; var f = fields();
      if (S.sent) bits.push("a message was already sent to Greg's office from this page");
      else { var have = [f.name && "name " + f.name, f.email && "email " + f.email, f.phone && "phone " + f.phone, f.interest && "topic " + f.interest].filter(Boolean); if (have.length) bits.push("the visitor has entered their " + have.join(", ")); if (S.mode === "form") bits.push("the contact form is open"); }
      if (PAGE_VIEWS[S.mode]) bits.push("the " + TITLES[S.mode] + " view is open on the panel");
      return bits.join("; ") + ".";
    }

    /* ═════════ "Talk to Harrison": the live conversation ═════════ */
    var sdkLoading = null, popLoading = null, capTimer = null, readyTimer = null, revealed = false;
    var htmlBg = getComputedStyle(d.documentElement).backgroundColor, bodyBg = getComputedStyle(d.body).backgroundColor;
    // The SDK injects `body,html{background:transparent}` the moment its script loads: re-assert the page colors.
    function pinBg() { d.documentElement.style.setProperty("background-color", htmlBg, "important"); d.body.style.setProperty("background-color", bodyBg, "important"); }
    function setTalk(lbl, on) { talk.querySelector("span").textContent = lbl; talk.disabled = liveState === "connecting"; talk.classList.toggle("is-on", !!on); }
    function rememberSeen() { try { d.cookie = "aa_hig_seen=1; Path=" + CFG.SEEN_PATH + "; Max-Age=31536000; Secure; SameSite=Lax"; } catch (e) {} }
    function loadScript(src) { return new Promise(function (res, rej) { var s = d.createElement("script"); s.src = src; s.onload = res; s.onerror = function () { rej(new Error("load " + src)); }; d.body.appendChild(s); }); }
    function loadSdk() {
      if (window.napsterCompanionApiSDK || window.NapsterCompanionApiSdk) return Promise.resolve();
      if (!sdkLoading) sdkLoading = loadScript(CFG.SDK_URL).catch(function (e) { sdkLoading = null; throw e; });
      return sdkLoading;
    }
    function loadPopout() {   // the stage-standard pop-out on screen share (spec v1.3); optional, never blocks the session
      if (!CFG.POPOUT || window.AvatarPopout) return Promise.resolve();
      if (!popLoading) popLoading = loadScript(CFG.POPOUT).catch(function () {});
      return popLoading;
    }
    function waitForVideo(tries, cb) { var v = $("video", mount); if (v || tries <= 0) return cb(v); setTimeout(function () { waitForVideo(tries - 1, cb); }, 120); }
    /* Reveal ONLY when his video really has frames. Before the microphone is allowed the SDK's <video> exists but is
       EMPTY: revealing it shows a black stage. We keep the "allow the microphone" hint up and, after 45 s, end the
       attempt with a clear message instead. */
    var MEDIA_WAIT_MS = 45000;
    function noMedia() { if (instance && !revealed) endLive(name + " couldn\u2019t start. Allow the microphone for this site (the icon in the address bar), then press Talk to " + name + " again.", true); }
    function onFirstFrame(v, cb) {
      var fired = false, t0 = Date.now(), go_ = function () { if (!fired) { fired = true; cb(); } };
      if (!v) return noMedia();
      (function poll() {
        if (fired || !instance || revealed) return;
        if (v.videoWidth > 0 && v.readyState >= 2) return go_();
        if (Date.now() - t0 > MEDIA_WAIT_MS) { fired = true; return noMedia(); }
        setTimeout(poll, 200);
      })();
      if ("requestVideoFrameCallback" in v) { try { v.requestVideoFrameCallback(function () { if (v.videoWidth > 0) go_(); }); } catch (e) {} }
    }
    function whenSharp(v, cb) {
      var t0 = Date.now(), fired = false, fin = function () { if (!fired) { fired = true; cb(); } };
      var want = Math.min(960, Math.round((mount.clientWidth || 640) * Math.min(window.devicePixelRatio || 1, 2) * 0.75));
      (function check() { if (fired) return; if (!v || (v.videoWidth || 0) >= want || Date.now() - t0 > 2000) return fin(); setTimeout(check, 120); })();
    }
    /* The panel follows what he SAYS (Michael, 10-30: "show_topic fires every time"). Measured: answers he pulls from
       his knowledge (donating, the 2201 price) skip show_topic even with the instructions' no-exceptions rule. So each
       finished reply is read here: when it is about exactly ONE of the three subjects, that view opens. Never while the
       contact form, review card or sent card is up, and never on a reply touching several subjects (his greeting). */
    var AUTO_TOPICS = [
      ["philanthropy", /hope for the hurting|hope f t h|\bdonat|\bcharit|recovery|strike out against drugs|beacon of hope|wabash|oasis/i],
      ["development", /\bdevelop|bayside|twenty-two oh|hollywood hills|hermosa|redondo|corona del mar|townhome/i],
      ["investing", /\binvest|start-?ups?\b|early stage|raising capital|mid-five figures/i],
    ];
    function autoTopic(e) {
      if (!e || e.event !== "message_received" || !instance) return;
      var m = e.data && e.data.message;
      if (!m || m.role !== "assistant" || m.action !== "completed" || typeof m.content !== "string" || !m.content) return;
      if (S.mode !== "home" && !PAGE_VIEWS[S.mode]) return;          // form, review, sent: leave the visitor's form alone
      var text = m.content.replace(/harvard investment group/gi, " ");
      var hits = AUTO_TOPICS.filter(function (x) { return x[1].test(text); });
      if (hits.length !== 1 || S.mode === hits[0][0]) return;
      openTopic(hits[0][0], true);
    }
    function armReveal() { if (!revealed && instance) waitForVideo(250, function (v) { onFirstFrame(v, function () { whenSharp(v, revealLive); }); }); }
    function revealLive() {
      if (revealed || !instance) return; revealed = true; liveState = "live";
      if (readyTimer) { clearTimeout(readyTimer); readyTimer = null; }
      av.classList.add("live-ready"); say(""); setTalk("End conversation", true); pinBg();
      rememberSeen();
      setTimeout(function () { if (liveState === "live" && hasIntro) vid.pause(); }, 900);
    }
    function fadeOutVoice(ms) {
      ms = ms || 450; var v0 = vid.volume, t0 = Date.now(), done = false, iv = null;
      var finish = function () { if (done) return; done = true; if (iv) clearInterval(iv); stopHearing(); try { vid.volume = v0; } catch (e) {} };
      iv = setInterval(function () { var k = Math.min(1, (Date.now() - t0) / ms); try { vid.volume = Math.max(0, v0 * (1 - k)); } catch (e) {} if (k >= 1) finish(); }, 30);
      setTimeout(finish, ms + 120);
    }
    function endedState(msg, now) {
      instance = null; revealed = false; liveState = "idle";
      [capTimer, readyTimer].forEach(function (t) { if (t) clearTimeout(t); }); capTimer = readyTimer = null;
      if (visible) playQuiet();
      av.classList.remove("live", "live-ready"); setTalk("Talk to " + name, false);
      if (now) mount.innerHTML = "";
      else setTimeout(function () { if (liveState === "idle") mount.innerHTML = ""; }, 850);   // after the .8 s fade
      stage.classList.remove("is-live"); say(msg || "", msg ? 9000 : 0); pinBg();
    }
    function endLive(msg, now) {
      var inst = instance; instance = null;
      if (inst) { try { inst.destroy && inst.destroy(); } catch (e) {} }
      endedState(msg, now);
    }
    function liveError(e) {   // AVATAR-STAGE-SPEC §6, worded for this panel
      var st = e && e.status;
      endLive(st === 503 || st === 404 ? name + "\u2019s live conversation is arriving very soon. In the meantime, the options beside me open the right page." :
        st === 403 ? name + "\u2019s live conversation only runs on the site itself." :
        st === 429 || st >= 500 ? name + "\u2019s talking with other visitors right now \u2014 try again in a few minutes." :
        "I couldn\u2019t start the live conversation just now. The panel beside me still works.", true);
    }
    async function startLive() {
      if (liveState !== "idle") return;
      liveState = "connecting"; if (hearing) fadeOutVoice(); else caption([]);
      // A page film or clip playing with sound pauses: never two voices.
      d.querySelectorAll("video").forEach(function (v) { if (v !== vid && !v.paused && !v.muted) v.pause(); });
      setTalk("Connecting\u2026", false); say("Connecting to " + name + "\u2026", 0); av.classList.add("live"); stage.classList.add("is-live");
      if (hasIntro && !RM && vid.paused) { ensureSrc(); vid.muted = true; var pq = vid.play(); if (pq && pq.catch) pq.catch(function () {}); }
      readyTimer = setTimeout(function () { if (liveState === "connecting") say("Almost there\u2026 allow the microphone if your browser asks.", 0); }, 5000);
      try {
        installTools();
        // The token first: while the agent is not live the endpoint answers 503 and nothing else is loaded.
        var res = await fetch(CFG.TOKEN, { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: "{}" });
        if (!res.ok) { var err = new Error("token " + res.status); err.status = res.status; throw err; }
        var data = await res.json();
        await Promise.all([loadSdk(), loadPopout()]); pinBg();
        var sdk = window.napsterCompanionApiSDK || window.NapsterCompanionApiSdk;
        if (!sdk) throw new Error("sdk missing");
        if (liveState !== "connecting") return;        // ended while the token was on its way
        installTools(); pinBg();
        instance = await sdk.init(data.token, {
          // The SDK's default 4px border (red while muted or idle) stays off on every stage (AVATAR-STAGE-SPEC §8).
          mountContainer: "#hig-mount", avatarStyle: { view: "rectangle", borderWidth: "0px", borderStyle: "none" }, debug: /[?&]debug\b/.test(location.search),
          features: { showSDKLoader: { enabled: false }, screenShare: { enabled: true }, pictureInPicture: { enabled: true } },
          onScreenShareStateChange: window.AvatarPopout ? AvatarPopout.hook("#hig-mount", { name: name }) : undefined,
          onAvatarReady: armReveal, onDestroy: function () { if (instance) endedState(""); },
          onData: function (e) { try { autoTopic(e); } catch (err) {} },
        });
        instance.showAvatar(); pinBg();
        setTimeout(function () { if (instance) armReveal(); }, 3000);
        capTimer = setTimeout(function () { endLive("That\u2019s the ten-minute limit \u2014 press Talk to " + name + " to keep going."); }, CFG.CAP_S * 1000);
        emit(panelSummary(), false);
      } catch (e) { liveError(e); }
    }
    talk.addEventListener("click", function () { if (liveState === "live") { endLive(""); return; } startLive(); });

    // For the welcome film's button, the console and tests: what the live Harrison would see.
    window.HigStage = { start: startLive, end: function () { endLive(""); }, tools: TOOLS, exec: execTool, state: function () { return S; }, live: function () { return liveState; } };
    render({});
  })();
})();
