/* Paid-ad landing pages (/sprint/*): the homepage's film players and "Ready-to-go avatars" carousel,
   lifted from home-next/home-next.js (PLAYERS + CAST blocks) so these pages don't need the homepage
   engine (which expects the homepage's menu, login and hero). Keep in step with home-next.js if those change. */
(function () {
  "use strict";
  var html = document.documentElement;
  var RM = html.classList.contains("rm");
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var track = function (name, params) { try { if (window.gtag) gtag("event", name, params || {}); } catch (e) {} };
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function fmt(t) { if (!isFinite(t)) t = 0; t = Math.floor(t); return Math.floor(t / 60) + ":" + pad(t % 60); }

  /* ═════════════ PLAYERS (from home-next.js) ═════════════ */
  var players = [];
  $$(".player").forEach(function (fig) {
    var title = fig.getAttribute("data-title"), dur = fig.getAttribute("data-duration");
    var label = fig.getAttribute("data-label") || "AvatarAgency film";
    var loop = document.createElement("video");
    loop.className = "p-loop"; loop.muted = true; loop.loop = true; loop.playsInline = true; loop.setAttribute("playsinline", ""); loop.setAttribute("muted", ""); loop.preload = "none"; loop.setAttribute("aria-hidden", "true");
    var film = document.createElement("video");
    film.className = "p-film"; film.playsInline = true; film.setAttribute("playsinline", ""); film.preload = "none";
    film.setAttribute("aria-label", title);
    fig.appendChild(loop); fig.appendChild(film);
    fig.insertAdjacentHTML("beforeend",
      '<div class="vf" aria-hidden="true"><i class="vf-c tl"></i><i class="vf-c tr"></i><i class="vf-c bl"></i><i class="vf-c br"></i>' +
      '<span class="vf-rec"><b></b>PREVIEW</span><span class="vf-tc">' + label.toUpperCase() + '</span><span class="vf-meta">RUNTIME ' + dur + "</span></div>" +
      '<button class="p-play" type="button" aria-label="Play the film: ' + title + " (" + dur + ')"><span class="ring"><svg><use href="#i-play"/></svg></span><span class="lbl"><b>Watch the film</b><small>' + dur + " · sound on</small></span></button>" +
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
    function state(s) { fig.classList.toggle("is-playing", s === "playing"); fig.classList.toggle("is-paused", s === "paused"); if (s !== "playing") fig.classList.remove("idle"); }
    P.play = function () {
      players.forEach(function (o) { if (o !== P) o.pause(); });
      $$(".sv-film video").forEach(function (pv) { pv.pause(); });   // Ava's panel film yields to a page film
      miniStop();                                                     // so does a hero player with its sound on
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
    fig.addEventListener("click", function (e) { if (e.target === loop || e.target.classList.contains("player-poster")) P.play(); });
    function poke() { fig.classList.remove("idle"); clearTimeout(P.idle); P.idle = setTimeout(function () { if (!film.paused) fig.classList.add("idle"); }, 2600); }
    fig.addEventListener("mousemove", poke); fig.addEventListener("touchstart", poke, { passive: true });
    players.push(P);
  });
  window.AAFilms = { pauseAll: function () { players.forEach(function (p) { p.pause(); }); } };   // used by Ava's panel
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

  /* ═════════════ CAST: cylinder carousel (from home-next.js) ═════════════
     Keep its fixes: no setPointerCapture (it breaks clicks), NaN trap in tick, flat
     transform-style, hover never spins the wheel. */
  var CYL = (function () {
    var car = $("#agents-cyl"), stage = car && $(".cyl-stage", car);
    var roleBox = $(".roster-role"), roleT = roleBox && $("[data-role]", roleBox), roleD = roleBox && $("[data-role-desc]", roleBox), lastFront = -1;
    function showRole(i) {
      if (!roleBox || i === lastFront) return; lastFront = i; var c = cards[i];
      roleBox.classList.add("swap");
      setTimeout(function () { roleT.textContent = c.getAttribute("data-role"); roleD.textContent = c.getAttribute("data-desc"); roleBox.classList.remove("swap"); }, 180);
    }
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
      showRole(f);
    }
    tick(); visible = false;
    return { tick: tick, setVisible: setVisible };
  })();
  if (CYL) {
    if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { CYL.setVisible(es[0].isIntersecting); }, { threshold: 0.15 }).observe($("#agents-cyl"));
    (function loop() { CYL.tick(); requestAnimationFrame(loop); })();
  }

  /* ═════════════ Hero players (Michael 10-29): played like the idle state of Ava's stage (home-next/ava-panel.js) ═════════════
     A muted loop while on screen; the MUTED button replays from the start with sound, and the loop coming round turns
     the sound off again. Website Agent's is a copy of Ava's stage with her captions (data-ava-lines); the sample films
     have theirs burned in. Each one's Talk to Ava is a [data-talk] (below). A player hidden by CSS (Ava's copy on
     phones) never intersects, so it never loads. */
  // The stage's caption timings (LINES in ava-panel.js) - keep in step if her intro changes.
  var AVA_LINES = [[0.62, 4.05, "Hey there — I'm Ava, and I'm not real."], [4.05, 8.4, "I'm a digital avatar created by AvatarAgency."], [8.4, 13.42, "When someone lands on this website, I'm the first one to say hello."],
    [13.42, 17.12, "I answer questions, I explain how everything works,"], [17.12, 20.8, "and when you're ready, I can book a call with the team for you."], [21.32, 26.5, "So tell me — what brought you here today?"]];
  var miniStops = [];
  function miniStop() { miniStops.forEach(function (f) { f(); }); }
  $$(".sp-mini-stage").forEach(function (mini) {
    var v = $(".ava-video", mini), cap = $(".ava-caption", mini), snd = $(".ava-sound", mini);
    var what = mini.getAttribute("data-what") || "the video", lines = mini.hasAttribute("data-ava-lines") ? AVA_LINES : null;
    var end = parseFloat(mini.getAttribute("data-end")) || Infinity;
    var hearing = false, lastT = 0, shown = null;
    function src() { if (!v.getAttribute("src")) v.src = v.getAttribute("data-src"); }
    function quiet() { if (RM || hearing) return; src(); v.muted = true; var p = v.play(); if (p && p.catch) p.catch(function () {}); }
    function caption(t) { if (!cap || t === shown) return; shown = t; cap.textContent = ""; if (t) { var s = document.createElement("span"); s.className = "cap"; s.textContent = t; cap.appendChild(s); } }
    function icon(on) {
      snd.setAttribute("aria-pressed", on ? "true" : "false"); $("use", snd).setAttribute("href", on ? "#i-vol" : "#i-sound-off");
      var l = on ? "Mute " + what : "Play " + what + " with sound"; snd.setAttribute("aria-label", l); snd.title = l;
    }
    function stop() { hearing = false; v.muted = true; icon(false); caption(""); if (RM) v.pause(); }
    miniStops.push(function () { if (hearing) stop(); });
    snd.addEventListener("click", function () {
      if (hearing) { stop(); return; }
      miniStop(); src(); hearing = true; v.currentTime = 0; v.muted = false; lastT = 0;
      var p = v.play(); if (p && p.catch) p.catch(stop);
      icon(true); track("sprint_hero_hear", { what: what });
    });
    v.addEventListener("timeupdate", function () {
      var t = v.currentTime;
      if (hearing) {
        if (t + 0.3 < lastT || t > end) stop();
        else if (lines) { var on = lines.filter(function (l) { return t >= l[0] && t < l[1]; })[0]; caption(on ? on[2] : ""); }
      }
      lastT = t;
    });
    if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { if (es[0].isIntersecting) quiet(); else { v.pause(); if (hearing) stop(); } }, { threshold: 0.25 }).observe(mini);
  });

  /* ═════════════ "Talk to Ava" (Michael 10-29): one click jumps to her stage AND starts the live conversation ═════════════
     Links scroll to #ava-stage on their own; buttons (on the hero players) scroll here. Either way this presses the
     stage's own Talk button in the same click, so the browser counts it as the visitor's gesture (mic + audio). Skipped
     while she's connecting or live: pressing the button then would end the conversation. Anything playing in the hero
     is silenced so two Avas don't talk at once. */
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("[data-talk]") : null;
    if (!a) return;
    var stage = $("#ava-stage"), talk = $("#ava-stage .ava-talk"), av = $("#ava-stage .stage-av");
    miniStop();
    if (a.tagName !== "A" && stage) stage.scrollIntoView({ block: "start" });   // an instant jump, like the links' own
    if (!talk || !av || av.classList.contains("live") || talk.disabled) return;
    track("sprint_talk_link", { link: a.textContent.trim() });
    talk.click();
  });
})();
