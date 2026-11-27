/* Homepage hero roll call (hero v12, 26 Nov 2026). Loaded only from /index.html, after home-next.js.
   Names each AI agent as its ring flies past in the hero loop: "YOUR AI" eyebrow + the role in gold Cormorant italic,
   each word sliding up inside a mask, blurred to sharp. Driven by the hero video's own clock (video.currentTime), so it
   can never drift from the picture. Times are seconds on the 25 fps loop; nothing shows after CLOSE.
   Also: while the gold planet sits behind the headline (PLANET), the gold italic subhead eases to cream and gets a denser
   halo, so it stays readable (measured 1.9-2.5:1 without, 3.1-3.7:1 with). Styles live in home-hero-rollcall.css.
   Phone label: sits in the ring's lower edge, then is clamped to stay >=12px above the lede box. If there isn't room
   (portrait and viewport height < ~700px, or the clamp would collide with the heading), the label hides; the ring and
   video still play. Desktop (landscape) position is unchanged. The rAF clock pauses while the hero is off-screen
   (scrolled past its in-flow box, or IntersectionObserver, or the tab is hidden) and resumes when it returns.
   Reduced motion still bails out above. */
(function () {
  var html = document.documentElement;
  if (html.classList.contains('rm')) return;                     // reduced motion: poster only, no video clock, no roll call
  var hero = document.querySelector('.hero'), vid = document.querySelector('.hero-video');
  if (!hero || !vid) return;

  var ROLES = ['Chief of Staff', 'Customer Support', 'Accounting', 'Website Developer'];
  var EYEBROW = 'Your AI';
  var ENTER = [1.00, 3.80, 7.55, 11.45];                         // the first entry waits for the page headline to land
  var CLOSE = 15.20;
  var TOP_LAND = 810;                                             // block top in landscape-video px (1920x1080), above the rail
  var TOP_PORT = 672;                                             // phone: in portrait-video px (720x1280), inside the ring's lower edge
  var IN = 0.62, OUT = 0.36, STAG = 0.085, GAP = 0.30;
  var EXIT_PORT = [2.05, 5.80, 9.68, 12.75];                     // phone: each role leaves before its face swings out of the tall frame
                                                                  // (swings start at 2.92, 6.68, 10.56 s; the last face leaves at ~13.6 s)
  var PLANET = [13.6, 24.0], RAMP = 0.9, GOLD = [228, 201, 122], CREAM = [245, 240, 232];
  var LEDE_GAP = 12;                                              // min px between label bottom and the lede box top
  var SHORT_H = 700;                                              // portrait shorter than this: hide the label (no room above the lede)

  var rc = document.createElement('div'); rc.className = 'rc'; rc.setAttribute('aria-hidden', 'true');
  function words(text) { return text.split(' ').map(function (w) { return '<span class="m"><span class="w">' + w + '</span></span>'; }).join(' '); }
  rc.innerHTML = '<p class="rc-eyebrow"><span class="rc-eb">' + words(EYEBROW) + '</span></p><div class="rc-role">' +
    ROLES.map(function (r) { return '<div class="rc-line">' + words(r) + '</div>'; }).join('') + '</div>';
  hero.appendChild(rc);
  var lines = [].slice.call(rc.querySelectorAll('.rc-line')).map(function (l) { return [].slice.call(l.querySelectorAll('.w')); });
  var eb = [].slice.call(rc.querySelectorAll('.rc-eb .w')), ebRule = rc.querySelector('.rc-eyebrow');
  var content = document.querySelector('.hero-content');
  var h1 = document.getElementById('hero-title'), em = h1 && h1.querySelector('em');
  var lede = document.querySelector('.hero-lede');

  var port = false;
  function place() {
    var w = hero.clientWidth, h = hero.clientHeight;
    port = vid.videoWidth ? vid.videoHeight > vid.videoWidth : w / h < 0.8;       // follow the file actually playing
    var vw = port ? 720 : 1920, vh = port ? 1280 : 1080, s = Math.max(w / vw, h / vh), oy = (h - vh * s) / 2;
    rc.classList.toggle('rc-port', port);
    rc.classList.remove('rc-hide');
    rc.style.top = Math.round(oy + (port ? TOP_PORT : TOP_LAND) * s) + 'px';
    if (!port || !lede) return;                                   // desktop / landscape: leave the rail-relative position alone
    var heroR = hero.getBoundingClientRect(), ledeR = lede.getBoundingClientRect(), rcR = rc.getBoundingClientRect();
    var rcH = rcR.height;
    if (!rcH) return;
    if (ledeR.top - rcR.bottom >= LEDE_GAP) return;              // already clear of the lede box
    var maxTop = ledeR.top - LEDE_GAP - rcH - heroR.top;
    var titleR = h1 ? h1.getBoundingClientRect() : null;
    var ceiling = titleR ? (titleR.bottom - heroR.top + LEDE_GAP) : 0;
    if (h < SHORT_H || maxTop < ceiling) { rc.classList.add('rc-hide'); return; }  // no room: hide label, ring/video keep playing
    rc.style.top = Math.round(maxTop) + 'px';
  }
  window.addEventListener('resize', place); vid.addEventListener('loadedmetadata', place); place();
  if (window.visualViewport) visualViewport.addEventListener('resize', place);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(place);
  if (typeof ResizeObserver === 'function') {
    var ro = new ResizeObserver(place);
    ro.observe(hero);
    if (lede) ro.observe(lede);
  }

  function qOut(x) { return 1 - Math.pow(1 - x, 4); }
  function cIn(x) { return x * x * x; }
  function pose(el, enter, exit, t, j) {
    var a = t - (enter + j * STAG), y = 104, blur = 7;
    if (a >= 0) { var p = qOut(Math.min(a / IN, 1)); y = 104 * (1 - p); blur = 7 * (1 - p); }
    var op = 1;
    if (t >= exit + j * STAG * 0.6) { var e = cIn(Math.min((t - exit - j * STAG * 0.6) / OUT, 1)); y = -104 * e; blur = 3 * e; op = e > 0.7 ? (1 - e) / 0.3 : 1; }
    el.style.opacity = op < 1 ? op.toFixed(3) : '';                 // fades in the last part of the exit: no hairline left at the mask edge
    el.style.transform = 'translate3d(0,' + y.toFixed(2) + '%,0)';
    el.style.visibility = (y > 103.9 || y < -103.9) ? 'hidden' : '';   // parked words hidden, so no clipped shadow edge shows
    el.style.filter = blur > 0.05 ? 'blur(' + blur.toFixed(2) + 'px)' : 'none';
  }
  function planet(t) {
    if (!em) return;
    var u = Math.min(Math.max((t - PLANET[0]) / RAMP, 0), 1) * Math.min(Math.max((PLANET[1] - t) / RAMP, 0), 1);
    u = u * u * (3 - 2 * u);
    h1.classList.toggle('rc-planet', u > 0.02);
    em.style.color = u > 0.001 ? 'rgb(' + GOLD.map(function (g, i) { return Math.round(g + (CREAM[i] - g) * u); }).join(',') + ')' : '';
  }
  function render(t) {
    place();                                                      // re-measure after intro/fonts so the label tracks the lede
    for (var i = 0; i < lines.length; i++) {
      var exit = port ? EXIT_PORT[i] : (i + 1 < ENTER.length ? ENTER[i + 1] - GAP : CLOSE);
      var enter = (port && i === 0) ? 0.50 : ENTER[i];             // phone: the first face is centered from frame 0
      for (var j = 0; j < lines[i].length; j++) pose(lines[i][j], enter, exit, t, j);
    }
    for (var k = 0; k < eb.length; k++) pose(eb[k], ENTER[0] - 0.25, CLOSE + 0.12, t, k);
    var r = t < ENTER[0] - 0.25 ? 0 : t < CLOSE + 0.12 ? Math.min((t - ENTER[0] + 0.25) / 0.6, 1) : Math.max(1 - (t - CLOSE - 0.12) / 0.3, 0);
    ebRule.style.setProperty('--rule', qOut(Math.max(0, Math.min(r, 1))).toFixed(3));
    planet(t);
    if (content) rc.style.opacity = getComputedStyle(content).opacity;   // fades with the hero copy when the page scrolls
  }
  window.__rcRender = render;                                     // QA captures seek the video and call this directly
  var raf = 0, inView = true, ioSeen = true;
  function flowInView() {                                         // sticky hero stays in the viewport box inside <main>;
    var y = 0, el = hero;                                         // use its in-flow box so "off screen" means scrolled past
    while (el) { y += el.offsetTop; el = el.offsetParent; }
    var top = y, bottom = y + hero.offsetHeight;
    var sy = window.pageYOffset, vh = window.innerHeight;
    return sy < bottom - 1 && sy + vh > top + 1;
  }
  function visible() { return ioSeen && flowInView() && !document.hidden; }
  function syncView() {
    var next = visible();
    if (next === inView) return;
    inView = next;
    if (inView) kick(); else stop();
  }
  function ticking() { return inView && !document.hidden; }
  function loop() {
    raf = 0;
    if (!ticking()) { window.__rcTicking = false; return; }        // do not schedule the next frame while paused
    if (!window.__rcFrozen) render(vid.currentTime || 0);
    window.__rcTicking = true;
    window.__rcFrames = (window.__rcFrames || 0) + 1;              // QA: count only while the loop is actually running
    raf = requestAnimationFrame(loop);
  }
  function kick() { if (ticking() && !raf) { place(); window.__rcTicking = true; raf = requestAnimationFrame(loop); } }
  function stop() { if (raf) { cancelAnimationFrame(raf); raf = 0; } window.__rcTicking = false; }
  document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); else { inView = visible(); if (inView) kick(); } });
  window.addEventListener('scroll', syncView, { passive: true });
  window.addEventListener('resize', syncView);
  if (typeof IntersectionObserver === 'function') {
    var io = new IntersectionObserver(function (ents) {
      ioSeen = !!(ents[0] && ents[0].isIntersecting);
      syncView();
    });
    io.observe(hero);
  }
  inView = visible();
  kick();
})();
