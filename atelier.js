/* ─────────────────────────────────────────────────────────────
   AvatarAgency · Atelier
   Behavior: nav, scroll-reveal, avatar carousel.
   ─────────────────────────────────────────────────────────────── */

(function () {
  'use strict';

  // ── Mobile nav toggle ──────────────────────────────────────
  function initNav() {
    const btn = document.querySelector('.nav-hamburger');
    const menu = document.querySelector('.nav-mobile');
    if (!btn || !menu) return;
    btn.addEventListener('click', function () {
      menu.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', menu.classList.contains('is-open'));
    });
    // Close after a link tap
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { menu.classList.remove('is-open'); });
    });
  }

  // ── Scroll reveal ──────────────────────────────────────────
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    if (!('IntersectionObserver' in window)) {
      // No IO support — just show everything immediately
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    // JS is working: apply hidden state now so reveal animation plays
    els.forEach(function (el) { el.classList.add('js-hidden'); });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var delay = Number(entry.target.dataset.delay) || 0;
        setTimeout(function () {
          entry.target.classList.remove('js-hidden');
          entry.target.classList.add('is-visible');
        }, delay);
        io.unobserve(entry.target);
      });
    }, { threshold: 0 });

    els.forEach(function (el) { io.observe(el); });

    // Safety net: unhide anything still hidden after 1s
    setTimeout(function () {
      document.querySelectorAll('.reveal.js-hidden').forEach(function (el) {
        el.classList.remove('js-hidden');
        el.classList.add('is-visible');
      });
    }, 1000);
  }

  // ── Avatar carousel (drag + touch + momentum) ──────────────
  function initCarousel() {
    const wrap = document.querySelector('[data-carousel-wrap]');
    const track = wrap && wrap.querySelector('[data-carousel-track]');
    if (!wrap || !track) return;

    let pos = 0, startX = 0, startPos = 0, lastX = 0, lastT = 0, velX = 0;
    let isDown = false, raf = null;

    function maxScroll() { return Math.max(0, track.scrollWidth - wrap.offsetWidth); }
    function clamp(v)    { return Math.max(0, Math.min(v, maxScroll())); }
    function setPos(v, animate) {
      pos = clamp(v);
      track.style.transition = animate ? 'transform 0.5s cubic-bezier(.22,.7,.3,1)' : 'none';
      track.style.transform = 'translateX(' + (-pos) + 'px)';
    }
    function momentum() {
      if (Math.abs(velX) < 0.4) { velX = 0; return; }
      pos = clamp(pos + velX);
      track.style.transition = 'none';
      track.style.transform = 'translateX(' + (-pos) + 'px)';
      velX *= 0.93;
      raf = requestAnimationFrame(momentum);
    }

    function pointerDown(x) {
      cancelAnimationFrame(raf);
      isDown = true;
      startX = x; startPos = pos;
      lastX = x; lastT = Date.now(); velX = 0;
      track.style.transition = 'none';
      wrap.classList.add('is-grabbing');
    }
    function pointerMove(x) {
      if (!isDown) return;
      const dx = startX - x;
      const now = Date.now();
      const dt = Math.max(1, now - lastT);
      velX = (x - lastX) / dt * -18;
      lastX = x; lastT = now;
      pos = clamp(startPos + dx);
      track.style.transform = 'translateX(' + (-pos) + 'px)';
    }
    function pointerUp() {
      if (!isDown) return;
      isDown = false;
      wrap.classList.remove('is-grabbing');
      if (Math.abs(velX) > 0.8) raf = requestAnimationFrame(momentum);
    }

    // Touch
    wrap.addEventListener('touchstart', function (e) { pointerDown(e.touches[0].clientX); }, { passive: true });
    wrap.addEventListener('touchmove',  function (e) { pointerMove(e.touches[0].clientX); }, { passive: true });
    wrap.addEventListener('touchend',   pointerUp);

    // Mouse
    wrap.addEventListener('mousedown',  function (e) { pointerDown(e.clientX); e.preventDefault(); });
    window.addEventListener('mousemove',function (e) { pointerMove(e.clientX); });
    window.addEventListener('mouseup',  pointerUp);

    // Resize
    window.addEventListener('resize', function () { setPos(pos, false); });
    setPos(0, false);
  }

  // ── Auto-mark current nav link as active ───────────────────
  // Uses [data-page] on body to flag, then matches nav links with [data-page].
  function initActiveNav() {
    const current = document.body.getAttribute('data-page');
    if (!current) return;
    document.querySelectorAll('[data-nav]').forEach(function (a) {
      if (a.getAttribute('data-nav') === current) a.classList.add('is-active');
    });
  }

  if (document.readyState 