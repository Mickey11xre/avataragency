/* Mobile navigation drawer — nav spec 2026-09-03 §5–6.
   Opens on the hamburger; closes on X, swipe-down, system back and Esc.
   Focus is trapped inside and returned to the trigger; body scroll is
   locked and restored. The links are real <a href> in the served HTML —
   this file only adds the overlay behaviour. */
(function () {
  'use strict';
  var drawer = document.getElementById('drawer');
  var btn = document.querySelector('.hamburger');
  if (!drawer || !btn) return;
  var closeBtn = drawer.querySelector('.drawer__close');
  var focusables = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
  var scrollY = 0, openedByUs = false, touchY0 = null, touchX0 = null;

  function isOpen() { return !drawer.hidden; }

  function open() {
    if (isOpen()) return;
    scrollY = window.pageYOffset;
    drawer.hidden = false;
    // next frame so the opacity transition runs
    requestAnimationFrame(function () { drawer.classList.add('is-open'); });
    document.body.classList.add('drawer-open');
    document.body.style.top = -scrollY + 'px';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    btn.setAttribute('aria-expanded', 'true');
    try { history.pushState({ drawer: true }, ''); openedByUs = true; } catch (e) { openedByUs = false; }
    var first = drawer.querySelector(focusables);
    (first || closeBtn).focus();
  }

  function close(fromPop) {
    if (!isOpen()) return;
    drawer.classList.remove('is-open');
    drawer.hidden = true;
    document.body.classList.remove('drawer-open');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollY);
    btn.setAttribute('aria-expanded', 'false');
    btn.focus();
    if (openedByUs && !fromPop) { openedByUs = false; try { history.back(); } catch (e) {} }
    openedByUs = false;
  }

  btn.addEventListener('click', function () { isOpen() ? close() : open(); });
  closeBtn.addEventListener('click', function () { close(); });

  // system back gesture closes it instead of leaving the page
  window.addEventListener('popstate', function () { if (isOpen()) close(true); });

  document.addEventListener('keydown', function (e) {
    if (!isOpen()) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key === 'Tab') {
      var items = Array.prototype.slice.call(drawer.querySelectorAll(focusables));
      if (!items.length) return;
      var firstEl = items[0], lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) { e.preventDefault(); lastEl.focus(); }
      else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); firstEl.focus(); }
    }
  });

  // swipe down to close: a mostly-vertical downward gesture of 70px+
  drawer.addEventListener('touchstart', function (e) {
    if (e.touches.length !== 1) return;
    touchY0 = e.touches[0].clientY; touchX0 = e.touches[0].clientX;
  }, { passive: true });
  drawer.addEventListener('touchend', function (e) {
    if (touchY0 === null) return;
    var t = e.changedTouches[0];
    var dy = t.clientY - touchY0, dx = Math.abs(t.clientX - touchX0);
    touchY0 = null;
    if (dy > 70 && dx < dy * 0.6 && drawer.scrollTop <= 0) close();
  }, { passive: true });

  // a link tap closes the drawer before navigation restores scroll state
  drawer.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (a) { document.body.classList.remove('drawer-open'); document.body.style.position = ''; document.body.style.top = ''; }
  });
})();
