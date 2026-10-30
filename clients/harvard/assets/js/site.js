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
  // Talk to Harrison (under the film): go to the stage and put the Talk button in the visitor's hand
  d.querySelectorAll("[data-talk]").forEach(function (a) {
    a.addEventListener("click", function () {
      var st = d.getElementById("stage"); if (!st) return;
      var talk = st.querySelector(".ava-talk");
      setTimeout(function () { if (talk) { talk.classList.add("flash"); talk.focus({ preventScroll: true }); setTimeout(function () { talk.classList.remove("flash"); }, 2600); } }, 900);
      /* when the live avatar exists: start the conversation here instead of only highlighting Talk */
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
      gsap.to(amb, { scale: 1.07, ease: "none", scrollTrigger: { trigger: hh, start: "top top", end: "bottom top", scrub: true } });
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

  /* ── Avatar stage (placeholder behavior until the live avatar exists) ──
     Talk shows the "arriving soon" toast; the sound icon only appears once an intro clip is wired (data-intro). */
  var stage = d.getElementById("stage");
  if (stage) {
    var av = stage.querySelector(".stage-av"), toast = stage.querySelector(".ava-toast"), talk = stage.querySelector(".ava-talk"), name = stage.getAttribute("data-name") || "our host";
    var tt;
    function say(t) { toast.textContent = t; toast.hidden = false; clearTimeout(tt); tt = setTimeout(function () { toast.hidden = true; }, 6000); }
    talk.addEventListener("click", function () { say("The live conversation with " + name + " is arriving very soon. In the meantime, the options beside me open the right page."); });
    /* His intro (AVATAR-STAGE-SPEC §5-6, ported from the ACCU stage): one clip is both the silent idle loop and the
       sound-on intro. The loop plays only while the stage is on screen and never under reduced motion; the sound icon
       replays it from 0:00 with captions timed to his voice; hearing stops when the clip wraps, passes INTRO_END or
       scrolls away, and the panel options pulse once he has finished. */
    var vid = stage.querySelector(".ava-video"), intro = stage.getAttribute("data-intro"), snd = stage.querySelector(".ava-sound"), capBox = stage.querySelector(".ava-caption");
    if (vid && intro && snd) {
      var INTRO_END = 28.4;
      // Source of truth: C:\VideoProjects\HarvardInvestmentGroup\AVATAR\HARRISON\STAGE\harrison-intro.vtt
      var LINES = [[0.78, 2.12, "Hi, my name is Harrison,"], [2.12, 4.40, "and I'm Harvard Investment Group's AI agent."],
        [5.49, 7.60, "Since 1995, founder Greg Cullen"], [7.60, 10.00, "has been investing in, and building,"],
        [10.00, 12.20, "Southern California's most coveted real estate,"], [12.47, 14.10, "along with early stage businesses."],
        [15.34, 17.95, "I can walk you through our investments,"], [17.95, 19.15, "our developments,"],
        [19.60, 20.90, "or Hope for the Hurting,"], [20.90, 22.40, "the charity Greg founded to help people rebuild their lives."],
        [23.42, 26.00, "Just tap the \"Talk to Harrison\" button and ask me anything,"], [26.44, 28.20, "or tap any of the options beside me."]];
      var hearing = false, lastT = 0, capKey = "";
      var escT = function (s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); };
      function caption(lines) { var k = JSON.stringify(lines || []); if (k === capKey) return; capKey = k; capBox.innerHTML = (lines || []).map(function (l) { return '<span class="cap">' + escT(l) + "</span>"; }).join(""); }
      function ensureSrc() { if (!vid.getAttribute("src")) vid.src = intro; }
      function playQuiet() { if (RM || hearing) return; ensureSrc(); vid.muted = true; var p = vid.play(); if (p && p.catch) p.catch(function () {}); }
      function soundIcon(on) { snd.setAttribute("aria-pressed", on ? "true" : "false"); snd.querySelector("use").setAttribute("href", on ? "#i-vol" : "#i-sound-off"); var l = on ? "Mute " + name + "\u2019s introduction" : "Play " + name + "\u2019s introduction with sound"; snd.setAttribute("aria-label", l); snd.title = l; }
      function stopHearing() { hearing = false; vid.muted = true; soundIcon(false); caption([]); if (RM) vid.pause(); }
      function pulseActions() { stage.querySelectorAll(".p-act").forEach(function (b, i) { setTimeout(function () { b.classList.add("flash"); setTimeout(function () { b.classList.remove("flash"); }, 700); }, i * 160); }); }
      snd.addEventListener("click", function () {
        if (hearing) { stopHearing(); return; }
        ensureSrc(); hearing = true; vid.currentTime = 0; vid.muted = false; lastT = 0;
        d.querySelectorAll("video").forEach(function (o) { if (o !== vid && !o.paused && !o.muted) o.pause(); });
        var p = vid.play(); if (p && p.catch) p.catch(function () { stopHearing(); });
        soundIcon(true);
      });
      vid.addEventListener("timeupdate", function () {
        var t = vid.currentTime;
        if (hearing) {
          if (t + 0.3 < lastT || t > INTRO_END) { stopHearing(); pulseActions(); }
          else { var on = LINES.filter(function (l) { return t >= l[0] && t < l[1]; })[0]; caption(on ? [on[2]] : []); }
        }
        lastT = t;
      });
      vid.addEventListener("ended", function () { if (hearing) { stopHearing(); pulseActions(); } });   // reduced motion: loop is off there
      if (RM) vid.loop = false;
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (es) { if (es[0].isIntersecting) playQuiet(); else { vid.pause(); if (hearing) stopHearing(); } }, { threshold: 0.25 }).observe(stage);
      } else playQuiet();
      d.addEventListener("visibilitychange", function () { if (d.hidden) { vid.pause(); if (hearing) stopHearing(); } });
    }
  }
})();
