/* The Thriving Project homepage — scroll-scrubbed growth film.
   Ported from the approved concept (thriveproject/_src/template.html) and
   generalised to N movements. It is a <canvas> frame sequence, NOT a
   <video>: scroll position indexes an array of images, so reverse is free
   and pixel-identical. Do not "simplify" it into a video element.

   Performance rules (Michael, 2026-09-11: higher resolution must not
   degrade navigation): frames are separate files under /assets/frames/,
   phones load every 2nd frame (STEP=2), the loader waits only for a sparse
   first pass, the rest streams in behind, and everything ticks in ONE rAF
   loop. The carousel and the butterfly share that loop — never add a second. */
(function () {
  "use strict";
  var root = document.getElementById("stage"); if (!root) return;
  var ASSETS = root.getAttribute("data-assets") || "/assets/";
  var FRAME_COUNT = 472;
  var ANCHORS_F = [0, 95, 180, 253, 375, 471];      // film frame each movement rests on
  var HIRES = [0, 1, 2, 3, 4, 5].map(function (k) { return ASSETS + "hires/hi" + k + ".webp"; });
  var LABELS = ["What is thriving", "The researcher", "The instruments", "The research", "Packages", "Start here"];
  var N = ANCHORS_F.length;
  var ANCHORS_P = [0.07, 0.24, 0.41, 0.58, 0.75, 0.92];
  var WINDOW_P = 0.10;
  var SECTION_VH = 1.6;
  var FRAME_ZOOM = 1.18, FRAME_DROP = 0.85, FRAMING_HOLD_TO = 150, FRAMING_OUT_BY = 253;

  var html = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) { html.classList.add("static"); return; }   // stacked page; no engine
  /* iOS Safari holds DECODED bitmaps, not files, and caps what a tab may
     hold. 472 frames at 1280x720 is 1.66 GB decoded; every 2nd frame is
     still 830 MB and Safari simply refuses — the canvas then never paints
     and the page sits black (found on Michael's iPhone, 2026-09-11).
     Phones therefore get their own set: every 4th frame at 960x540 =
     118 frames = 233 MB, the same profile the approved concept ran and was
     verified working on that phone. Hi-res anchors are skipped there too
     (6 x 2560x1440 = another 84 MB, and pointless at 390 px wide).
     A short desktop window is not a phone — width and pointer decide. */
  var isSmall = window.innerWidth < 760 || window.matchMedia("(pointer: coarse)").matches;
  var STEP = isSmall ? 4 : 1;
  var FRAME_DIR = isSmall ? "frames-mobile/" : "frames/";

  var cv = document.getElementById("film"), ctx = cv.getContext("2d", { alpha: false });
  var track = document.getElementById("track"), scrim = document.getElementById("scrim");
  var hint = document.getElementById("hint"), loader = document.getElementById("loader"), lbar = document.getElementById("lbar");
  var mast = document.getElementById("mast");
  var leaves = [].slice.call(document.querySelectorAll(".leaf"));

  /* ---- Engagements carousel: cylinder, one card per swipe, snap, arrows ---- */
  window.CAR = (function () {
    var car = document.getElementById("pkgcar"), stage = document.getElementById("pkgstage");
    if (!car || !stage) return null;
    var cards = [].slice.call(stage.querySelectorAll(".pkg")), M = cards.length;
    var S = { p: 1, target: null, drag: false, moved: 0, lastX: 0, resume: 0, mx: 0, my: 0, tx: 0, ty: 0, cw: 232, v: 0, lastT: 0, hx: null, lastSpin: 0 };
    function sizes() {
      S.cw = cards[0].offsetWidth || 232; S.rw = car.clientWidth || S.cw * 3;
      var narrow = S.rw < 560;
      S.x1 = Math.min(S.cw * 1.02 + 38, S.rw * (narrow ? 0.335 : 0.375));
      S.x2 = Math.min(S.cw * 1.86, S.rw * (narrow ? 0.60 : 0.68));
    }
    sizes(); window.addEventListener("resize", sizes, { passive: true });
    function nearest(i) { return i + M * Math.round((S.p - i) / M); }
    function mouseGear() { return S.cw * 0.92; }
    function touchGear() { return S.cw * 0.72; }
    function hoverGear() { return S.cw * 1.50; }
    /* One card per gesture: a flick carries at most one card past where the
       finger left it, so a swipe reads as "next" rather than a spin. */
    function settle() {
      var paused = performance.now() - S.lastT > 90;
      var fling = paused ? 0 : S.v * 150;
      fling = Math.max(-1, Math.min(1, fling));
      S.target = Math.round(S.p + fling); S.v = 0; S.resume = Date.now() + 6000;
    }
    function vel(dp) { var now = performance.now(), dt = Math.max(1, now - S.lastT); S.lastT = now; S.v = S.v * 0.55 + (dp / dt) * 0.45; }
    function front() { var i = ((Math.round(S.p) % M) + M) % M; return i; }
    function step(d) { S.target = Math.round(S.p) + d; S.resume = Date.now() + 8000; }
    car.querySelector(".carr.prev").addEventListener("click", function () { step(-1); });
    car.querySelector(".carr.next").addEventListener("click", function () { step(1); });
    car.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
      if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
    });

    car.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "touch") return;
      S.drag = true; S.moved = 0; S.lastX = e.clientX; S.target = null; S.v = 0; S.lastT = performance.now();
      car.classList.add("grabbing"); car.setPointerCapture(e.pointerId);
    });
    car.addEventListener("pointermove", function (e) {
      if (e.pointerType === "touch") return;
      if (S.drag) { var dx = e.clientX - S.lastX; S.lastX = e.clientX; S.moved += Math.abs(dx); var dp = -dx / mouseGear(); S.p += dp; vel(dp); }
      else if (S.hx !== null) {
        var hdx = e.clientX - S.hx; S.hx = e.clientX;
        if (hdx) { S.p -= hdx / hoverGear(); S.target = null; if (Math.abs(hdx) > 1.5) S.lastSpin = Date.now(); S.resume = Date.now() + 900; }
      }
      var r = car.getBoundingClientRect();
      S.tx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 2)));
      S.ty = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height / 2)));
    });
    function endDrag() { if (!S.drag) return; S.drag = false; car.classList.remove("grabbing"); settle(); }
    car.addEventListener("pointerup", function (e) { if (e.pointerType !== "touch") endDrag(); });
    car.addEventListener("pointercancel", function (e) { if (e.pointerType !== "touch") endDrag(); });
    car.addEventListener("pointerenter", function (e) { if (e.pointerType !== "touch") S.hx = e.clientX; });
    car.addEventListener("pointerleave", function () { S.tx = 0; S.ty = 0; S.hx = null; if (!S.drag && S.target === null) S.target = Math.round(S.p); });

    var T = null;
    car.addEventListener("touchstart", function (e) {
      if (e.touches.length !== 1) return;
      T = { x0: e.touches[0].clientX, y0: e.touches[0].clientY, lock: null };
      S.moved = 0; S.lastX = T.x0; S.v = 0; S.lastT = performance.now();
    }, { passive: true });
    car.addEventListener("touchmove", function (e) {
      if (!T || e.touches.length !== 1) return;
      var x = e.touches[0].clientX, y = e.touches[0].clientY;
      if (T.lock === null) { var ax = Math.abs(x - T.x0), ay = Math.abs(y - T.y0); if (ax > 7 || ay > 7) T.lock = ax > ay ? "x" : "y"; }
      if (T.lock === "x") { e.preventDefault(); S.drag = true; S.target = null; var dx = x - S.lastX; S.lastX = x; S.moved += Math.abs(dx); var dp = -dx / touchGear(); S.p += dp; vel(dp); }
    }, { passive: false });
    function endTouch() { if (!T) return; T = null; if (S.drag) { S.drag = false; settle(); } }
    car.addEventListener("touchend", endTouch); car.addEventListener("touchcancel", endTouch);

    /* Every card IS an <a href> to its own /packages/<tier>/ page, and the
       whole card is the link — not just the "Read more" label. So the default
       browser navigation is left alone and we only CANCEL it when the gesture
       was really a drag. The previous version called preventDefault() on every
       click and then re-implemented navigation, guarded by a 220 ms
       "still being steered" timer — but the cylinder turns on hover, so simply
       moving the mouse toward a card kept that timer fresh and the click never
       fired. Reported as "clicking a card does nothing", 2026-09-11. */
    cards.forEach(function (c) {
      c.addEventListener("click", function (e) {
        if (S.moved > 6) e.preventDefault();             // a drag, not a click
      });
    });

    function sm(t) { return t * t * (3 - 2 * t); }
    function lerp(a, b, t) { return a + (b - a) * t; }
    /* The idle drift runs only while the packages panel is actually on screen,
       so the reader always arrives with the Survey Package in front. */
    var visible = false;
    function setVisible(v) { if (v && !visible) S.resume = Date.now() + 5000; visible = v; }
    function tick() {
      if (S.target !== null) { S.p += (S.target - S.p) * 0.13; if (Math.abs(S.target - S.p) < 0.002) { S.p = S.target; S.target = null; } }
      else if (visible && !S.drag && Date.now() > S.resume) { S.p += 0.0026; }
      S.mx += (S.tx - S.mx) * 0.08; S.my += (S.ty - S.my) * 0.08;
      stage.style.transform = "rotateY(" + (S.mx * 5).toFixed(2) + "deg) rotateX(" + (-S.my * 3).toFixed(2) + "deg)";
      var x1 = S.x1, x2 = S.x2, z0 = 80, z1 = -95, z2 = -250, r1 = 40, r2 = 58, f = front();
      for (var i = 0; i < M; i++) {
        var off = i - S.p, half = M / 2;
        while (off > half) off -= M; while (off < -half) off += M;
        var a = Math.abs(off), s = Math.sign(off) || 0, x, z, ry, op;
        if (a <= 1) { var e = sm(a); x = s * e * x1; z = lerp(z0, z1, e); ry = s * e * r1; op = lerp(1, .92, e); }
        else if (a <= 2) { var t = a - 1, e2 = sm(t); x = s * lerp(x1, x2, e2); z = lerp(z1, z2, e2); ry = s * lerp(r1, r2, e2); op = lerp(.92, 0, e2); }
        else { op = 0; x = s * x2; z = z2; ry = s * r2; }
        var c = cards[i];
        c.style.visibility = op < 0.02 ? "hidden" : "visible";
        c.style.opacity = op.toFixed(3); c.style.zIndex = Math.round(1000 + z);
        c.style.transform = "translateX(" + x.toFixed(1) + "px) translateZ(" + z.toFixed(1) + "px) rotateY(" + ry.toFixed(2) + "deg)";
        c.setAttribute("aria-hidden", i === f ? "false" : "true");
        c.tabIndex = i === f ? 0 : -1;
      }
    }
    return { tick: tick, setVisible: setVisible };
  })();

  /* ---- hero brand film: rests on the poster, plays only on the button ---- */
  (function () {
    var vid = document.getElementById("vid"); if (!vid) return;
    var v = vid.querySelector("video"); if (!v) return;
    var prog = vid.querySelector(".vprog"), bar = prog.querySelector("i"), tm = vid.querySelector(".vtime");
    var pp = vid.querySelector(".vpp"), mu = vid.querySelector(".vmute"), fs = vid.querySelector(".vfs"), ppPath = pp.querySelector("path");
    var PLAY = "M2 1.4v13.2L13 8z", PAUSE = "M2.5 1.5h3.6v13H2.5zM8.9 1.5h3.6v13H8.9z";
    function fmt(s) { s = Math.max(0, Math.floor(s || 0)); return Math.floor(s / 60) + ":" + ("0" + (s % 60)).slice(-2); }
    function paint() { var d = v.duration || 0; bar.style.width = (d ? (v.currentTime / d * 100) : 0).toFixed(2) + "%"; tm.textContent = fmt(v.currentTime) + " / " + fmt(d); }
    function icon() { ppPath.setAttribute("d", v.paused ? PLAY : PAUSE); pp.setAttribute("aria-label", v.paused ? "Play" : "Pause"); }
    function showFilm() {
      var pz = vid.querySelector(".vposter"); if (pz) pz.style.transition = "none";
      vid.classList.add("playing");
      if (pz) requestAnimationFrame(function () { requestAnimationFrame(function () { pz.style.transition = ""; }); });
    }
    /* iOS: with preload="none" the element has no media yet when the first
       tap arrives, and play() can reject before it has fetched anything.
       Retry once inside the SAME gesture after an explicit load() — a second
       attempt from the original tap is still user-activated, so it is allowed.
       Failures used to be swallowed silently, which is why a tap looked like
       it did nothing at all on Michael's iPhone (2026-09-11). */
    function attempt(retry) {
      var pr = v.play();
      if (!pr || !pr.then) { showFilm(); return; }
      pr.then(showFilm).catch(function (err) {
        if (retry) { try { v.load(); } catch (e) {} attempt(false); return; }
        console.warn("hero film could not start:", err && err.name, err && err.message);
      });
    }
    function toggle() { if (v.paused) attempt(true); else v.pause(); }
    vid.querySelector(".vplay").addEventListener("click", toggle);
    pp.addEventListener("click", function (e) { e.stopPropagation(); toggle(); });
    v.addEventListener("play", function () { showFilm(); vid.classList.add("rolling"); icon(); });
    v.addEventListener("pause", function () { vid.classList.remove("rolling"); icon(); });
    v.addEventListener("timeupdate", paint); v.addEventListener("loadedmetadata", paint);
    v.addEventListener("ended", function () { vid.classList.remove("playing"); vid.classList.remove("rolling"); icon(); setTimeout(function () { if (v.paused) { v.currentTime = 0; paint(); } }, 340); });
    mu.addEventListener("click", function (e) { e.stopPropagation(); v.muted = !v.muted; mu.querySelector(".wv").style.display = v.muted ? "none" : ""; mu.querySelector(".xm").style.display = v.muted ? "" : "none"; mu.setAttribute("aria-label", v.muted ? "Unmute" : "Mute"); });
    fs.addEventListener("click", function (e) { e.stopPropagation(); if (document.fullscreenElement) document.exitFullscreen(); else if (vid.requestFullscreen) vid.requestFullscreen(); else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen(); });
    prog.addEventListener("click", function (e) { e.stopPropagation(); var d = v.duration; if (!d) return; var r = prog.getBoundingClientRect(); v.currentTime = Math.min(d, Math.max(0, (e.clientX - r.left) / r.width * d)); paint(); });
    /* Only a real error event retires the transport. The old version also
       gave up after a 4 s readyState probe, which on a phone just means
       "still downloading" — it hid the play button on a perfectly good file. */
    function dead() { vid.classList.remove("playing"); var b = vid.querySelector(".vbar"); if (b) b.style.display = "none"; var pl = vid.querySelector(".vplay"); if (pl) pl.style.display = "none"; }
    v.addEventListener("error", dead);
    icon(); paint();
  })();

  /* ---- section rail ---- */
  var rail = document.getElementById("rail");
  LABELS.forEach(function (l) { var d = document.createElement("div"); d.className = "d"; d.innerHTML = '<span class="lbl">' + l + '</span><span class="dot"></span>'; rail.appendChild(d); });
  var dots = [].slice.call(rail.children);
  var tweening = null;
  function scrollToP(target) {
    var max = track.offsetHeight - VH, from = window.pageYOffset, to = Math.round(max * target), dist = to - from;
    if (Math.abs(dist) < 2) return;
    var dur = 700, t0 = null; if (tweening) cancelAnimationFrame(tweening);
    (function step(ts) { if (t0 === null) t0 = ts; var k = Math.min(1, (ts - t0) / dur); var e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; window.scrollTo(0, from + dist * e); if (k < 1) tweening = requestAnimationFrame(step); else tweening = null; })(performance.now());
  }
  dots.forEach(function (d, i) {
    d.setAttribute("role", "button"); d.setAttribute("tabindex", "0"); d.setAttribute("aria-label", "Go to " + LABELS[i]);
    d.addEventListener("click", function () { scrollToP(ANCHORS_P[i]); });
    d.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); scrollToP(ANCHORS_P[i]); } });
  });
  ["wheel", "touchstart"].forEach(function (ev) { window.addEventListener(ev, function () { if (tweening) { cancelAnimationFrame(tweening); tweening = null; } }, { passive: true }); });
  // in-page "#start"-style links from the mast scroll the film rather than jumping
  [].slice.call(document.querySelectorAll('a[data-go]')).forEach(function (a) {
    a.addEventListener("click", function (e) { e.preventDefault(); scrollToP(ANCHORS_P[+a.getAttribute("data-go")]); });
  });

  /* ---- the frame engine ---- */
  var VH = window.innerHeight, VW = window.innerWidth;
  function layout() {
    VH = window.innerHeight; VW = window.innerWidth;
    var dpr = Math.min(window.devicePixelRatio || 1, isSmall ? 1.5 : 2);
    cv.width = Math.round(VW * dpr); cv.height = Math.round(VH * dpr);
    cv.style.width = VW + "px"; cv.style.height = VH + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    track.style.height = Math.round(VH * SECTION_VH * N) + "px";
    draw(true);
  }
  var imgs = new Array(FRAME_COUNT), ready = new Uint8Array(FRAME_COUNT);
  var hi = new Array(N), hiReady = new Uint8Array(N);
  var firstPass = 0, firstPassTarget = 0, dirty = true, painted = false;
  function src(i) { return ASSETS + FRAME_DIR + String(i).padStart(4, "0") + ".webp"; }
  function request(i, isFirst) {
    if (imgs[i]) return;
    var im = new Image(); im.decoding = "async";
    im.onload = function () { ready[i] = 1; dirty = true; if (isFirst) { firstPass++; lbar.style.width = Math.round(100 * firstPass / firstPassTarget) + "%"; if (firstPass >= firstPassTarget) revealSite(); } };
    im.onerror = function () { if (isFirst) { firstPass++; if (firstPass >= firstPassTarget) revealSite(); } };
    im.src = src(i); imgs[i] = im;
  }
  function loadHires() {
    if (isSmall) return;                      // 84 MB of 2560x1440 a phone cannot hold
    for (var k = 0; k < N; k++) (function (k) { var im = new Image(); im.decoding = "async"; im.onload = function () { hiReady[k] = 1; dirty = true; }; im.src = HIRES[k]; hi[k] = im; })(k);
  }
  function loadAll() {
    var sparse = []; for (var i = 0; i < FRAME_COUNT; i += STEP * 8) sparse.push(i);
    var last = FRAME_COUNT - 1; last -= (last % STEP); if (sparse[sparse.length - 1] !== last) sparse.push(last);
    firstPassTarget = sparse.length; sparse.forEach(function (i) { request(i, true); });
    var rest = []; for (var j = 0; j < FRAME_COUNT; j += STEP) if (imgs[j] === undefined) rest.push(j);
    var k = 0; (function pump() { var b = 6; while (b-- > 0 && k < rest.length) request(rest[k++], false); if (k < rest.length) setTimeout(pump, 90); })();
    loadHires();
    setTimeout(revealSite, 9000);                        // never hold a slow connection hostage
    /* Last-resort safety net. If not one frame has painted — decode refused,
       frames 404, memory denied — hide the canvas (which is opaque black
       under alpha:false) and show the finished-tree still behind the panels.
       A still backdrop is a a legible page; a black rectangle is a broken one. */
    setTimeout(function () {
      if (painted) return;
      cv.style.display = "none";
      root.style.background = "#0B0F0C url(" + ASSETS + "hires/hi5.webp) center/cover no-repeat";
      console.warn("film: no frame painted in 7s — showing the still instead");
    }, 7000);
  }
  var revealed = false;
  function revealSite() { if (revealed) return; revealed = true; loader.style.opacity = "0"; setTimeout(function () { loader.style.display = "none"; }, 750); }
  function nearestReady(i) { if (i < 0) i = 0; if (i > FRAME_COUNT - 1) i = FRAME_COUNT - 1; if (ready[i]) return i; for (var r = 1; r < FRAME_COUNT; r++) { if (i - r >= 0 && ready[i - r]) return i - r; if (i + r < FRAME_COUNT && ready[i + r]) return i + r; } return -1; }
  function smooth(t) { return t * t * (3 - 2 * t); }
  function clamp01(v) { return v < 0 ? 0 : (v > 1 ? 1 : v); }
  function frameAt(p) {
    if (p <= ANCHORS_P[0]) return ANCHORS_F[0];
    if (p >= ANCHORS_P[N - 1]) return ANCHORS_F[N - 1];
    for (var i = 0; i < N - 1; i++) { var a = ANCHORS_P[i], b = ANCHORS_P[i + 1]; if (p >= a && p <= b) { var t = smooth((p - a) / (b - a)); return ANCHORS_F[i] + (ANCHORS_F[i + 1] - ANCHORS_F[i]) * t; } }
    return ANCHORS_F[N - 1];
  }
  function framingAmt(f) { if (f <= FRAMING_HOLD_TO) return 1; if (f >= FRAMING_OUT_BY) return 0; return 1 - smooth((f - FRAMING_HOLD_TO) / (FRAMING_OUT_BY - FRAMING_HOLD_TO)); }
  function boxFor(iw, ih, amt) {
    var drop = FRAME_DROP * (VW > 860 ? 1 : 0.4), zoom = 1 + (FRAME_ZOOM - 1) * amt * (VW > 860 ? 1 : 0.55);
    var s = Math.max(VW / iw, VH / ih) * zoom, w = iw * s, h = ih * s, x = (VW - w) / 2, y = (VH - h) / 2;
    y += ((h - VH) / 2) * drop * amt; return [x, y, w, h];
  }
  var lastDrawn = -1;
  function paintFrame(f) {
    var i0 = Math.floor(f); i0 -= (i0 % STEP); var i1 = Math.min(i0 + STEP, FRAME_COUNT - 1);
    var a = clamp01(STEP === 1 ? (f - i0) : (f - i0) / STEP);
    var r0 = nearestReady(i0); if (r0 < 0) return false;
    var im0 = imgs[r0], amt = framingAmt(f), box = boxFor(im0.naturalWidth, im0.naturalHeight, amt);
    ctx.globalAlpha = 1; ctx.drawImage(im0, box[0], box[1], box[2], box[3]); painted = true;
    if (a > 0.01 && ready[i1] && i1 !== r0) { ctx.globalAlpha = a; ctx.drawImage(imgs[i1], box[0], box[1], box[2], box[3]); ctx.globalAlpha = 1; }
    for (var k = 0; k < N; k++) {
      if (!hiReady[k]) continue;
      var w = clamp01(1 - Math.abs(f - ANCHORS_F[k]) / (2.2 * STEP)); if (w <= 0.01) continue;
      var hb = boxFor(hi[k].naturalWidth, hi[k].naturalHeight, amt);
      ctx.globalAlpha = w; ctx.drawImage(hi[k], hb[0], hb[1], hb[2], hb[3]); ctx.globalAlpha = 1;
    }
    return true;
  }
  function draw(force) {
    var max = track.offsetHeight - VH, p = max > 0 ? clamp01(window.pageYOffset / max) : 0, f = frameAt(p);
    if (force || lastDrawn < 0 || Math.abs(f - lastDrawn) > 0.02) { if (paintFrame(f)) lastDrawn = f; }
    var activeIdx = 0, activeAmt = 0, sx = 50;
    for (var i = 0; i < leaves.length; i++) {
      var v = (i === 0 && p < ANCHORS_P[0]) ? 1 : (i === leaves.length - 1 && p > ANCHORS_P[i]) ? 1 : clamp01(1 - Math.abs(p - ANCHORS_P[i]) / WINDOW_P);
      var el = leaves[i], left = el.classList.contains("l");
      var t = clamp01((v - 0.30) / 0.50), open = smooth(t), sc = 0.30 + 0.70 * open, pop = 1 + 0.02 * Math.sin(Math.PI * open), fade = clamp01(t / 0.18);
      if (VW > 860) { el.style.transformOrigin = left ? "16% 50%" : "84% 50%"; el.style.transform = "translateY(-50%) scale(" + (sc * pop) + ")"; }
      else { el.style.transformOrigin = "50% 60%"; el.style.transform = "translate(-50%,-50%) scale(" + (sc * pop) + ")"; }
      el.style.opacity = fade;
      el.style.setProperty("--c1", clamp01((open - 0.40) / 0.35)); el.style.setProperty("--c2", clamp01((open - 0.58) / 0.34));
      var e = smooth(v);
      el.style.pointerEvents = e > 0.6 ? "auto" : "none";
      el.setAttribute("aria-hidden", e > 0.6 ? "false" : "true");
      if (window.CAR && el.querySelector("#pkgcar")) window.CAR.setVisible(e > 0.6);
      if (e > activeAmt) { activeAmt = e; activeIdx = i; sx = left ? 32 : 68; }
    }
    scrim.style.opacity = activeAmt * 0.95; scrim.style.setProperty("--sx", (VW > 860 ? sx : 50) + "%");
    for (var j = 0; j < dots.length; j++) dots[j].classList.toggle("on", j === activeIdx && activeAmt > 0.25);
    hint.style.opacity = p < 0.012 ? "1" : "0";
    if (mast) mast.classList.toggle("past", p > ANCHORS_P[0] + 0.04);
  }
  var ticking = false;
  window.addEventListener("scroll", function () { dirty = true; if (!ticking) { ticking = true; requestAnimationFrame(function () { ticking = false; if (dirty) { dirty = false; draw(false); } }); } }, { passive: true });
  window.addEventListener("resize", function () { if (Math.abs(window.innerWidth - VW) < 2 && Math.abs(window.innerHeight - VH) < 140) return; layout(); }, { passive: true });

  /* ---- cursor butterfly: desktop pointers only (Michael, 2026-08-10 and 09-11) ---- */
  window.FLY = (function () {
    if (!matchMedia("(hover:hover) and (pointer:fine)").matches) return null;
    var el = document.getElementById("fly"); if (!el) return null;
    var tx = innerWidth * .5, ty = innerHeight * .4, x = tx, y = ty, px = x, py = y, t = 0, seen = false;
    addEventListener("mousemove", function (e) { tx = e.clientX; ty = e.clientY; if (!seen) { seen = true; x = tx + 40; y = ty - 40; px = x; py = y; }
      var onCard = !!(e.target && e.target.closest && e.target.closest(".leaf, #mast, .drawer")); el.classList.toggle("on", !onCard); }, { passive: true });
    addEventListener("mouseleave", function () { el.classList.remove("on"); }, { passive: true });
    addEventListener("blur", function () { el.classList.remove("on"); }, { passive: true });
    return { tick: function () {
      t += 1 / 60;
      var ox = Math.cos(t * 1.6) * 12 + Math.cos(t * 0.63) * 7, oy = Math.sin(t * 2.0) * 8 + Math.sin(t * 0.81) * 6;
      var gx = tx + 40 + ox, gy = ty - 46 + oy; x += (gx - x) * .035; y += (gy - y) * .035;
      var vx = x - px, vy = y - py; px = x; py = y;
      var face = vx < -.3 ? -1 : 1, bank = Math.max(-24, Math.min(24, vy * 3.4));
      el.style.transform = "translate3d(" + (x - 75).toFixed(1) + "px," + (y - 80.6).toFixed(1) + "px,0) rotate(" + bank.toFixed(1) + "deg) scaleX(" + face + ")";
    } };
  })();

  (function poll() { if (dirty) { dirty = false; draw(false); } if (window.CAR) window.CAR.tick(); if (window.FLY) window.FLY.tick(); requestAnimationFrame(poll); })();
  layout(); loadAll();
})();
