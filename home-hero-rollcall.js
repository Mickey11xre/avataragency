/* Homepage hero roll call (hero v12, 26 Nov 2026). Loaded only from /index.html, after home-next.js.
   Names each AI agent as its ring flies past in the hero loop: "YOUR AI" eyebrow + the role in gold Cormorant italic,
   each word sliding up inside a mask, blurred to sharp. Driven by the hero video's own clock (video.currentTime), so it
   can never drift from the picture. Times are seconds on the 25 fps loop; nothing shows after CLOSE.
   Also: while the gold planet sits behind the headline (PLANET), the gold italic subhead eases to cream and gets a denser
   halo, so it stays readable (measured 1.9-2.5:1 without, 3.1-3.7:1 with). Styles live in home-hero-rollcall.css.
   Phone (portrait) label: sits in the ring's lower edge, then is clamped to stay >=12px above the lede box. If there
   isn't room (portrait and viewport height < ~700px, or the clamp would collide with the heading), the label hides;
   the ring and video still play.
   Landscape / desktop label: sits above the rail in video space, then is clamped to stay >=12px from the CTA group,
   service rail, header/nav, and lede (and not to cover the heading). If it can't fit, the label hides; the ring and
   video still play. Tall desktops already clear the rail, so they stay at the natural position.
   Mode (portrait vs landscape rules) follows the current viewport (width/height < 0.8), and is re-evaluated on resize,
   orientationchange, and matchMedia — not the video file chosen at load. After any clamp, every no-go zone is
   re-checked; if the label still overlaps or the gap is under 12px, it hides. Placement is recomputed on resize,
   orientation change, role change, and fonts/metadata — not on every animation frame.
   The rAF clock pauses while the hero is off-screen (next section covers the sticky hero, or IntersectionObserver,
   or the tab is hidden) and resumes when it returns. Reduced motion still bails out above. */
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
  var LEDE_GAP = 12;                                              // min px between the label and any no-go box
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
  var ctas = document.querySelector('.hero-ctas');
  var rail = document.querySelector('.hero-rail');
  var hdr = document.getElementById('hdr') || document.querySelector('.hdr');

  var port = false, lastRole = -3, swapping = false;
  function viewportPort() { return window.innerWidth / window.innerHeight < 0.8; }
  function overlaps(a, b, gap) {                                  // true if the boxes come within `gap` px (axis-aligned)
    return a.left < b.right + gap && a.right > b.left - gap && a.top < b.bottom + gap && a.bottom > b.top - gap;
  }
  function labelBox() {                                           // .rc is full-width; use the text's real left/right
    var box = rc.getBoundingClientRect(), nodes = rc.querySelectorAll('.m'), l = Infinity, r = -Infinity, any = false, i, rec;
    for (i = 0; i < nodes.length; i++) {
      rec = nodes[i].getBoundingClientRect();
      if (rec.width < 1 || rec.height < 1) continue;
      any = true; l = Math.min(l, rec.left); r = Math.max(r, rec.right);
    }
    return { top: box.top, bottom: box.bottom, height: box.height, left: any ? l : box.left, right: any ? r : box.right };
  }
  function zoneRect(el) {
    if (!el) return null;
    var r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return null;
    return r;
  }
  function clearOfZones() {                                       // after a clamp: hide unless every no-go is still >=12px away
    var lab = labelBox(), zs, i;
    if (!lab.height) return true;
    zs = [zoneRect(ctas), zoneRect(rail), zoneRect(hdr), zoneRect(lede)];
    for (i = 0; i < zs.length; i++) if (zs[i] && overlaps(lab, zs[i], LEDE_GAP)) return false;
    return true;
  }
  function hideLabel() { rc.classList.add('rc-hide'); }

  function fileOf(url) { return (url || '').split('?')[0].split('/').pop(); }
  function syncVideo() {                                          // optional: swap land/port file to match orientation, keep the clock
    var want = viewportPort(), next = vid.getAttribute(want ? 'data-src-port' : 'data-src-land'), poster, t, keep, cur, media, done;
    if (!next || html.classList.contains('rm')) return;
    cur = vid.currentSrc || vid.getAttribute('src') || '';
    if (fileOf(cur) === fileOf(next)) return;
    if (swapping) return;
    swapping = true;
    t = vid.currentTime || 0;
    keep = !vid.paused;
    poster = want ? vid.getAttribute('data-poster-port') : vid.getAttribute('poster');
    if (want && poster) {
      vid.setAttribute('poster', poster);
      media = document.querySelector('.hero-media');
      if (media) media.style.backgroundImage = 'url("' + poster + '")';
    }
    done = function () {
      vid.removeEventListener('loadeddata', done);
      vid.removeEventListener('canplay', done);
      swapping = false;
      try { if (isFinite(t) && vid.readyState >= 1) vid.currentTime = t; } catch (e) {}
      if (keep) { var p = vid.play(); if (p && p.catch) p.catch(function () {}); }
      place();
    };
    vid.addEventListener('loadeddata', done);
    vid.addEventListener('canplay', done);
    vid.src = next;
  }

  function place() {
    var w = window.innerWidth, h = window.innerHeight, heroW = hero.clientWidth, heroH = hero.clientHeight;
    port = viewportPort();                                        // follow the current orientation, not the file chosen at load
    var vw = port ? 720 : 1920, vh = port ? 1280 : 1080, s = Math.max(heroW / vw, heroH / vh), oy = (heroH - vh * s) / 2;
    rc.classList.toggle('rc-port', port);
    rc.classList.remove('rc-hide');
    rc.style.top = Math.round(oy + (port ? TOP_PORT : TOP_LAND) * s) + 'px';
    if (port) {
      if (!lede) return;
      var heroR = hero.getBoundingClientRect(), ledeR = lede.getBoundingClientRect(), rcR = rc.getBoundingClientRect();
      var rcH = rcR.height;
      if (!rcH) return;
      if (heroH < SHORT_H || h < SHORT_H) { hideLabel(); return; } // portrait shorter than ~700px: hide, ring/video keep playing
      if (ledeR.top - rcR.bottom < LEDE_GAP) {
        var maxTop = ledeR.top - LEDE_GAP - rcH - heroR.top;
        var titleR = h1 ? h1.getBoundingClientRect() : null;
        var ceiling = titleR ? (titleR.bottom - heroR.top + LEDE_GAP) : 0;
        if (maxTop < ceiling) { hideLabel(); return; }
        rc.style.top = Math.round(maxTop) + 'px';
      }
      if (!clearOfZones()) hideLabel();
      return;
    }
    var heroL = hero.getBoundingClientRect(), lab = labelBox();
    if (!lab.height) return;
    var zs = [zoneRect(ctas), zoneRect(rail), zoneRect(hdr), zoneRect(lede)], i, z, hit = false, maxTopL = Infinity, ceilingL, hOverlap;
    for (i = 0; i < zs.length; i++) {
      z = zs[i];
      if (z && overlaps(lab, z, LEDE_GAP)) hit = true;
    }
    if (hit) {
      ceilingL = LEDE_GAP;
      if (hdr) {
        z = zoneRect(hdr);
        if (z) ceilingL = Math.max(ceilingL, z.bottom - heroL.top + LEDE_GAP);
      }
      if (h1) {
        z = zoneRect(h1);
        if (z) ceilingL = Math.max(ceilingL, z.bottom - heroL.top + LEDE_GAP);
      }
      for (i = 0; i < zs.length; i++) {
        z = zs[i];
        if (!z) continue;
        hOverlap = lab.left < z.right + LEDE_GAP && lab.right > z.left - LEDE_GAP;
        if (!hOverlap) continue;
        if (z.bottom + LEDE_GAP <= lab.top) continue;              // header/nav sit above: they set the ceiling, not the floor
        maxTopL = Math.min(maxTopL, z.top - LEDE_GAP - lab.height - heroL.top);
      }
      if (!(maxTopL >= ceilingL) || maxTopL === Infinity) { hideLabel(); return; }
      rc.style.top = Math.floor(maxTopL) + 'px';
    }
    if (!clearOfZones()) hideLabel();                             // after any move, re-check lede, CTAs, rail, and header
  }
  function onLayout() { syncVideo(); place(); }
  window.addEventListener('resize', onLayout);
  window.addEventListener('orientationchange', onLayout);
  vid.addEventListener('loadedmetadata', place);
  if (window.visualViewport) visualViewport.addEventListener('resize', onLayout);
  if (window.matchMedia) {
    var mq = window.matchMedia('(max-aspect-ratio: 4/5)');
    if (mq.addEventListener) mq.addEventListener('change', onLayout);
    else if (mq.addListener) mq.addListener(onLayout);
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(place);
  if (typeof ResizeObserver === 'function') {
    var ro = new ResizeObserver(place);
    ro.observe(hero);
    if (lede) ro.observe(lede);
    if (ctas) ro.observe(ctas);
    if (rail) ro.observe(rail);
  }
  onLayout();

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
  function roleIndex(t) {
    var i, enter, exit;
    for (i = 0; i < ENTER.length; i++) {
      exit = port ? EXIT_PORT[i] : (i + 1 < ENTER.length ? ENTER[i + 1] - GAP : CLOSE);
      enter = (port && i === 0) ? 0.50 : ENTER[i];
      if (t >= enter && t < exit) return i;
    }
    return -1;
  }
  function render(t) {
    var ri = roleIndex(t);
    if (ri !== lastRole) { lastRole = ri; place(); }              // re-measure only when the visible role (or empty slot) changes
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
  var raf = 0, inView = true, ioSeen = true;
  function flowInView() {                                         // sticky hero stays in the viewport box inside <main>,
    var next = hero.nextElementSibling;                           // so measure the next section: once it reaches the top, the hero is covered
    if (next) return next.getBoundingClientRect().top > 1;
    var r = hero.getBoundingClientRect();
    return r.bottom > 1 && r.top < window.innerHeight - 1;
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
    if (!ticking()) return;                                       // do not schedule the next frame while paused
    render(vid.currentTime || 0);
    raf = requestAnimationFrame(loop);
  }
  function kick() { if (ticking() && !raf) { place(); raf = requestAnimationFrame(loop); } }
  function stop() { if (raf) { cancelAnimationFrame(raf); raf = 0; } }
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
