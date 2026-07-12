/* ============================================================
   AvatarAgency founder concierge — Michael Rivera's digital twin.
   Drop on any page:  <script src="/assist.js" defer></script>
   Same machine as Lisa on livebrand.ai (mic-first auto-greet,
   2-min anonymous preview, registration gate, 5-min session /
   5-min daily caps) in the Atelier design language.
   ============================================================ */
(function () {
  if (window.__aaTwinLoaded) return;
  window.__aaTwinLoaded = true;

  var LS_USER = 'aa_twin_user';
  var LS_USAGE = 'aa_twin_usage';
  var LS_AUTOPOP = 'aa_autopop';        // YYYY-MM-DD of last auto-open (once/day cap)
  var LS_PREVIEW = 'aa_preview_used';   // anonymous preview consumed flag
  var LEAD_ENDPOINT = 'https://livebrand-assistant-leads.michaelrivera.workers.dev/api/register';
  var GOOGLE_LEAD_ENDPOINT = 'https://livebrand-assistant-leads.michaelrivera.workers.dev/api/register-google';
  var GOOGLE_CLIENT_ID = '993426065147-61qf99h9fse85johvbh8dt1aocso42oc.apps.googleusercontent.com';
  var TOKEN_ENDPOINT = '/api/michael-token'; // same-origin Pages Function
  var SDK_URL = 'https://cdn.jsdelivr.net/npm/@touchcastllc/napster-companion-api@latest/lib/index.standalone.js';
  var CALENDLY = 'https://calendly.com/michaelrivera007/free-consultation-meeting';
  var SESSION_CAP = 300;   // 5 min hard per session
  var DAILY_CAP = 300;     // 5 min per visitor per day (Michael, 2026-07-11 — was 20)
  var WARN_AT = 120;       // countdown pill for the last 2 minutes
  var AUTO_DELAY = 4000;   // page dwell before the mic-first auto flow starts
  var READY_WAIT = 45000;  // max ms to wait for the avatar to be genuinely ready
  var PREVIEW_CAP = 120;   // anonymous preview length (seconds)
  var PREVIEW_WARN = 30;   // banner + twin nudge at 30s remaining
  var IDLE_GUARD = 75;     // s after auto-open with no conversation -> stop metering

  /* ---- styles (Atelier: cream / ink / gold, Cormorant + General Sans) ---- */
  var css = ''
    + '.aat-launcher{position:fixed;bottom:24px;right:24px;z-index:60;display:flex;align-items:center;gap:12px;background:var(--ink,#0a0a0a);color:#fff;border:1px solid rgba(201,168,76,.35);border-radius:999px;padding:10px 22px 10px 10px;cursor:pointer;box-shadow:0 8px 30px rgba(0,0,0,.35);transition:transform 160ms ease,border-color 160ms ease;font-family:var(--f-body,\'General Sans\',sans-serif)}'
    + '.aat-launcher:hover{transform:translateY(-2px);border-color:var(--gold,#C9A84C)}'
    + '.aat-launcher .t{text-align:left}.aat-launcher .t .a{font-size:13.5px;font-weight:600;letter-spacing:.01em}.aat-launcher .t .b{font-size:11px;color:var(--gold,#C9A84C)}'
    + '.aat-mark{position:relative;display:inline-flex;flex-shrink:0}'
    + '.aat-mark img{width:44px;height:44px;border-radius:50%;object-fit:cover;object-position:center 20%;border:1.5px solid var(--gold,#C9A84C)}'
    + '.aat-mark .dot{position:absolute;right:-1px;bottom:1px;width:11px;height:11px;border-radius:50%;background:#1F9D63;border:2px solid #0a0a0a;z-index:2}'
    + '.aat-panel{position:fixed;top:0;right:0;bottom:0;width:400px;max-width:100vw;background:var(--cream,#fbfaf6);border-left:1px solid var(--line,rgba(28,26,22,.09));z-index:70;transform:translateX(105%);transition:transform 240ms ease;display:flex;flex-direction:column;box-shadow:0 8px 30px rgba(10,10,10,.12)}'
    + '.aat-panel.open{transform:translateX(0)}'
    + '.aat-head{display:flex;align-items:center;gap:12px;padding:16px 24px;border-bottom:1px solid var(--line,rgba(28,26,22,.09));background:#fff}'
    + '.aat-logo{font-family:var(--f-body,\'General Sans\',sans-serif);font-size:16px;font-weight:600;letter-spacing:.01em}'
    + '.aat-logo .c{color:var(--ink,#0a0a0a)}.aat-logo .l{color:var(--gold,#C9A84C)}'
    + '.aat-head .who{border-left:1px solid var(--line,rgba(28,26,22,.09));padding-left:12px}'
    + '.aat-head .nm{font-family:var(--f-body,\'General Sans\',sans-serif);font-size:13px;font-weight:600;color:var(--ink,#0a0a0a);margin:0}'
    + '.aat-head .st{font-family:var(--f-body,\'General Sans\',sans-serif);font-size:11px;color:#1F9D63;margin:0}'
    + '.aat-close{margin-left:auto;background:none;border:none;font-size:20px;color:var(--text-mute,#8a8278);cursor:pointer;line-height:1}'
    + '.aat-body{flex:1;overflow-y:auto;padding:28px 24px;font-family:var(--f-body,\'General Sans\',sans-serif)}'
    + '.aat-body h3{font-family:var(--f-serif,\'Cormorant Garamond\',serif);font-weight:500;font-size:26px;color:var(--ink,#0a0a0a);margin:0 0 8px;line-height:1.2}'
    + '.aat-body p.sub{font-size:13.5px;line-height:1.65;color:var(--text-mid,#4a4640);margin:0 0 22px}'
    + '.aat-field{display:flex;flex-direction:column;gap:6px;margin-bottom:14px}'
    + '.aat-field label{font-size:12.5px;font-weight:500;color:var(--text,#1c1a16)}'
    + '.aat-field input{font-family:inherit;font-size:14px;color:var(--ink,#0a0a0a);background:#fff;border:1px solid var(--line-strong,rgba(28,26,22,.18));border-radius:8px;padding:11px 14px;outline:none;transition:border-color 160ms,box-shadow 160ms}'
    + '.aat-field input:focus{border-color:var(--gold,#C9A84C);box-shadow:0 0 0 3px rgba(201,168,76,.15)}'
    + '.aat-field input.err{border-color:#D92D20}'
    + '.aat-submit{width:100%;height:48px;margin-top:6px;background:var(--gold,#C9A84C);color:var(--ink,#0a0a0a);border:none;border-radius:999px;font-family:inherit;font-size:14.5px;font-weight:600;cursor:pointer;transition:background 160ms}'
    + '.aat-submit:hover{background:var(--gold-light,#E4C97A)}'
    + '.aat-fine{font-size:11px;color:var(--text-mute,#8a8278);line-height:1.6;margin-top:12px;text-align:center}'
    + '.aat-stage{position:relative;aspect-ratio:16/10;background:#0A0A0A;border-radius:12px;display:grid;place-items:center;margin-bottom:18px;overflow:hidden}'
    + '.aat-stage .ph{text-align:center;color:var(--text-on-dark-mute,rgba(255,255,255,.6));font-size:12.5px;line-height:1.6;padding:0 20px}'
    + '.aat-sil{width:74px;height:74px;border-radius:50%;background:#1c1a16;display:grid;place-items:center;margin:0 auto 12px}'
    + '#aat-mount{position:absolute;inset:0;opacity:1;transition:opacity 400ms ease}'
    + '.aat-stage.aat-preload #aat-mount{opacity:0}'
    + '#aat-mount>*,#aat-mount video,#aat-mount canvas{width:100%!important;height:100%!important;object-fit:cover;object-position:center top}'
    + '#aat-mount>*{position:absolute!important;inset:0!important;max-width:none!important;max-height:none!important;margin:0!important;border-radius:0!important}'
    + '.aat-timer{position:absolute;top:10px;right:10px;z-index:6;display:none;font-family:inherit;font-size:11px;font-weight:600;letter-spacing:.04em;color:#fff;background:rgba(217,45,32,.92);border-radius:999px;padding:5px 12px}'
    + '.aat-timer.show{display:block}'
    + '.aat-endcard{position:absolute;inset:0;z-index:5;display:none;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:radial-gradient(120% 120% at 50% 0%,#1c1a16 0%,#0A0A0A 70%);text-align:center;padding:20px}'
    + '.aat-endcard.show{display:flex}'
    + '.aat-endcard .wave{font-size:30px;line-height:1}'
    + '.aat-endcard h4{font-family:var(--f-serif,\'Cormorant Garamond\',serif);font-weight:500;font-size:21px;color:#fff;margin:2px 0 0}'
    + '.aat-endcard p{font-size:12.5px;color:var(--text-on-dark-mute,rgba(255,255,255,.6));line-height:1.55;max-width:30ch;margin:0 0 8px}'
    + '.aat-endcard .row{display:flex;gap:8px}'
    + '.aat-again{font-family:inherit;font-size:13px;font-weight:600;color:var(--ink,#0a0a0a);background:var(--gold,#C9A84C);border:none;border-radius:999px;padding:10px 20px;cursor:pointer}'
    + '.aat-again:hover{background:var(--gold-light,#E4C97A)}'
    + '.aat-book{font-family:inherit;font-size:13px;font-weight:500;color:var(--text-on-dark,#f5f0e8);background:transparent;border:1px solid rgba(255,255,255,.25);border-radius:999px;padding:10px 20px;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center}'
    + '.aat-book:hover{border-color:var(--gold,#C9A84C);color:var(--gold-light,#E4C97A)}'
    + '.aat-note{background:var(--gold-faint,rgba(201,168,76,.08));border:1px solid rgba(201,168,76,.25);border-radius:8px;padding:12px 14px;font-size:12.5px;line-height:1.6;color:var(--gold-deep,#8a7330)}'
    + '.aat-note a{color:inherit;font-weight:600}'
    + '.aat-pill{display:none;margin-left:auto;font-family:var(--f-body,\'General Sans\',sans-serif);font-size:11px;font-weight:600;letter-spacing:.04em;color:var(--text-mid,#4a4640);background:#fff;border:1px solid var(--line-strong,rgba(28,26,22,.18));border-radius:999px;padding:4px 11px;white-space:nowrap}'
    + '.aat-pill.show{display:inline-block}'
    + '.aat-pill.show~.aat-close{margin-left:12px}'
    + '.aat-pill.warn{color:#fff;background:#D92D20;border-color:#D92D20}'
    + '.aat-banner{display:none;background:var(--gold-faint,rgba(201,168,76,.08));border:1px solid rgba(201,168,76,.35);border-radius:8px;padding:12px 14px;font-size:12.5px;line-height:1.6;color:var(--gold-deep,#8a7330);margin:0 0 14px}'
    + '.aat-banner.show{display:block}'
    + '.aat-toast{position:fixed;bottom:96px;right:24px;z-index:65;max-width:300px;background:var(--ink,#0a0a0a);color:#fff;border:1px solid rgba(201,168,76,.35);border-radius:14px;box-shadow:0 12px 40px rgba(0,0,0,.35);padding:14px 16px;font-family:var(--f-body,\'General Sans\',sans-serif);font-size:13px;line-height:1.55;opacity:0;transform:translateY(8px);transition:opacity 240ms ease,transform 240ms ease;pointer-events:none}'
    + '.aat-toast.show{opacity:1;transform:translateY(0)}'
    + '.aat-toast strong{color:var(--gold-light,#E4C97A)}'
    + '@media (max-width:640px){.aat-panel{width:100vw}.aat-launcher .t .b{display:none}.aat-toast{left:24px;right:24px;max-width:none;bottom:100px}}';
  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ---- DOM ---- */
  var wrap = document.createElement('div');
  wrap.innerHTML = ''
    + '<button class="aat-launcher" id="aat-open" aria-label="Meet Michael Rivera">'
    + '<span class="aat-mark"><img src="/assets/michael-twin.jpg" alt=""><span class="dot"></span></span>'
    + '<span class="t"><span class="a">Meet Michael Rivera</span><br><span class="b">Founder &middot; Live now</span></span>'
    + '</button>'
    + '<div class="aat-toast" id="aat-toast"></div>'
    + '<aside class="aat-panel" id="aat-panel" aria-hidden="true">'
    + '<div class="aat-head"><span class="aat-logo"><span class="c">Avatar</span><span class="l">Agency</span></span>'
    + '<div class="who"><p class="nm">Michael Rivera</p><p class="st">&#9679; AI Digital Twin &middot; Live</p></div>'
    + '<span class="aat-pill" id="aat-pill"></span>'
    + '<button class="aat-close" id="aat-close" aria-label="Close">&times;</button></div>'
    + '<div class="aat-body">'
    /* register state */
    + '<div id="aat-register">'
    + '<h3 id="aat-reg-title">Meet Michael — the founder, live.</h3>'
    + '<p class="sub">You’ll be talking with Michael Rivera’s AI digital twin — his real face and voice, built by AvatarAgency. Register once and start the conversation.</p>'
    + '<div id="aat-gsi" style="display:none;margin:0 0 6px;"></div>'
    + '<p id="aat-gsi-or" style="display:none;text-align:center;font-family:var(--f-body,\'General Sans\',sans-serif);font-size:11.5px;font-weight:500;color:var(--text-mute,#8a8278);margin:10px 0 12px;">&mdash; or register with email &mdash;</p>'
    + '<form id="aat-form" novalidate>'
    + '<div class="aat-field"><label for="aat-name">Full name</label><input type="text" id="aat-name" autocomplete="name" placeholder="Your name"></div>'
    + '<div class="aat-field"><label for="aat-email">Email</label><input type="email" id="aat-email" autocomplete="email" placeholder="you@company.com"></div>'
    + '<div class="aat-field"><label for="aat-phone">Phone <span style="color:var(--text-mute,#8a8278);font-weight:400;">(optional)</span></label><input type="tel" id="aat-phone" autocomplete="tel" placeholder="(310) 555-0100"></div>'
    + '<button type="submit" class="aat-submit">Register &amp; meet Michael</button>'
    + '<p class="aat-fine">By registering you agree to our <a href="/terms.html" target="_blank" rel="noopener" style="color:inherit;">Terms</a> &amp; <a href="/privacy.html" target="_blank" rel="noopener" style="color:inherit;">Privacy Policy</a> and to hearing from AvatarAgency. You’ll be speaking with an AI digital twin; conversations may be recorded.</p>'
    + '</form></div>'
    /* ready state */
    + '<div id="aat-ready" style="display:none;">'
    + '<div class="aat-stage" id="aat-stage">'
    + '<div id="aat-mount"></div>'
    + '<div class="ph" id="aat-msg"><span class="aat-sil"><svg width="40" height="40" viewBox="0 0 44 44" fill="none"><circle cx="22" cy="16" r="8" fill="#8a8278"/><path d="M6 40c2.5-9 9-13 16-13s13.5 4 16 13" fill="#8a8278"/></svg></span><span id="aat-msg-text">Connecting to Michael…</span></div>'
    + '<span class="aat-timer" id="aat-timer"></span>'
    + '<div class="aat-endcard" id="aat-endcard">'
    + '<span class="wave" id="aat-end-icon">👋</span>'
    + '<h4 id="aat-end-title">Thanks for the conversation!</h4>'
    + '<p id="aat-end-sub">Michael’s twin is here whenever you need — or take the next step.</p>'
    + '<div class="row"><button class="aat-again" id="aat-again">Talk again</button>'
    + '<a class="aat-book" id="aat-book" href="' + CALENDLY + '" target="_blank" rel="noopener">Book a call</a></div>'
    + '</div></div>'
    + '<div class="aat-banner" id="aat-banner">Enjoying the conversation? Register free in 30 seconds to keep talking.</div>'
    + '<h3 id="aat-hello">You’re in.</h3>'
    + '<p class="sub">Just start talking — Michael can hear you. Ask about digital twins, AI video, or what AvatarAgency can build for you.</p>'
    + '<div class="aat-note">💡 Want a digital twin like this — or cinematic AI video — for <em>your</em> business? <a href="' + CALENDLY + '" id="aat-note-book" target="_blank" rel="noopener">Book a free consultation &rarr;</a></div>'
    + '</div>'
    + '</div></aside>';
  document.body.appendChild(wrap);

  /* ---- helpers ---- */
  var panel = document.getElementById('aat-panel');
  var instance = null, starting = false, sdkLoading = null, tick = null, sessionS = 0, tokenPrefetch = null, tokenPrefetchAt = 0;
  var previewMode = false, previewExpired = false, previewTick = null, previewLeft = 0;
  var convStarted = false, idleTimer = null, idleFired = false, autoLoading = false;
  var avatarReady = false, canvasSince = 0;

  function $(id) { return document.getElementById(id); }
  function user() { try { return JSON.parse(localStorage.getItem(LS_USER) || 'null'); } catch (_) { return null; } }
  function todayKey() { var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function usage() {
    try {
      var u = JSON.parse(localStorage.getItem(LS_USAGE) || 'null');
      if (!u || u.d !== todayKey()) return { d: todayKey(), s: 0 };
      return u;
    } catch (_) { return { d: todayKey(), s: 0 }; }
  }
  function saveUsage(u) { try { localStorage.setItem(LS_USAGE, JSON.stringify(u)); } catch (_) {} }
  function fmt(s) { return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }
  function msg(text) { var el = $('aat-msg'); if (el) { el.style.display = text ? '' : 'none'; $('aat-msg-text').textContent = text || ''; } }
  function clearMount() { var m = $('aat-mount'); if (m) m.innerHTML = ''; }
  function timerPill(text) { var t = $('aat-timer'); t.textContent = text || ''; t.classList.toggle('show', !!text); }
  function pill(text, warn) { var p = $('aat-pill'); p.textContent = text || ''; p.classList.toggle('show', !!text); p.classList.toggle('warn', !!warn); }
  function banner(show) { $('aat-banner').classList.toggle('show', !!show); }
  function toast(html) { var t = $('aat-toast'); if (html) { t.innerHTML = html; t.classList.add('show'); } else t.classList.remove('show'); }
  function stagePreload(on) { $('aat-stage').classList.toggle('aat-preload', !!on); }
  function regHeading(preview) { $('aat-reg-title').textContent = preview ? 'Keep talking with Michael — it’s free. Register to continue.' : 'Meet Michael — the founder, live.'; }
  function track(name) { if (typeof gtag === 'function') gtag('event', name, { event_category: 'AvatarAgency' }); }
  function previewUsed() { try { return !!localStorage.getItem(LS_PREVIEW); } catch (_) { return true; } }
  function isStandalone() {
    try {
      return (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true;
    } catch (_) { return false; }
  }
  function mintToken(u) {
    return fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: (u && u.name) || '', email: (u && u.email) || '' })
    }).then(function (r) { if (!r.ok) throw new Error('token ' + r.status); return r.json(); });
  }
  function micPermission() {
    return new Promise(function (res) {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { res(false); return; }
      navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
        try { stream.getTracks().forEach(function (t) { t.stop(); }); } catch (_) {}
        res(true);
      }).catch(function () { res(false); });
    });
  }

  /* ---- "Continue with Google" — verified one-click registration ---- */
  var gsiReady = false;
  function initGsi() {
    if (!GOOGLE_CLIENT_ID || gsiReady) return;
    var mount = function () {
      if (gsiReady || !window.google || !window.google.accounts || !window.google.accounts.id) return;
      gsiReady = true;
      window.google.accounts.id.initialize({ client_id: GOOGLE_CLIENT_ID, callback: onGoogleCred });
      window.google.accounts.id.renderButton($('aat-gsi'), { type: 'standard', theme: 'outline', size: 'large', text: 'continue_with', shape: 'pill', logo_alignment: 'left', width: 300 });
      $('aat-gsi').style.display = '';
      $('aat-gsi-or').style.display = '';
    };
    if (window.google && window.google.accounts) { mount(); return; }
    var s = document.createElement('script');
    s.src = 'https://accounts.google.com/gsi/client';
    s.async = true; s.defer = true; s.onload = mount;
    document.body.appendChild(s);
  }
  function onGoogleCred(resp) {
    if (!resp || !resp.credential) return;
    fetch(GOOGLE_LEAD_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: resp.credential, brand: 'avataragency', source: 'twin-google:' + location.pathname })
    }).then(function (r) { return r.json(); }).then(function (d) {
      if (!d || !d.ok || !d.lead) throw new Error('register failed');
      try { localStorage.setItem(LS_USER, JSON.stringify({ name: d.lead.name, email: d.lead.email, phone: '', source: 'twin-google', registeredAt: new Date().toISOString() })); } catch (_) {}
      if (typeof gtag === 'function') gtag('event', 'sign_up', { method: 'google', event_category: 'AvatarAgency' });
      if (previewExpired) { previewExpired = false; regHeading(false); track('aa_twin_preview_registered'); }
      render();
    }).catch(function () {
      var el = $('aat-gsi-or');
      if (el) el.textContent = 'Google sign-in hiccuped — please use the email form below.';
    });
  }

  function endCard(mode) {
    var c = $('aat-endcard');
    if (!mode) { c.classList.remove('show'); return; }
    var icon = $('aat-end-icon'), title = $('aat-end-title'), sub = $('aat-end-sub'), again = $('aat-again');
    if (mode === 'session') {
      icon.textContent = '⏱️'; title.textContent = 'That’s our 5 minutes!';
      sub.textContent = 'Great talk. Start a fresh conversation anytime — or book a call with the real Michael.';
      again.style.display = '';
    } else if (mode === 'daily') {
      icon.textContent = '🌙'; title.textContent = 'That’s today’s twin time.';
      sub.textContent = 'Michael’s twin is back tomorrow — or book a call with the real one right now.';
      again.style.display = 'none';
    } else {
      icon.textContent = '👋'; title.textContent = 'Thanks for the conversation!';
      sub.textContent = 'Michael’s twin is here whenever you need — or take the next step.';
      again.style.display = '';
    }
    timerPill('');
    c.classList.add('show');
  }

  function stopTick() { if (tick) { clearInterval(tick); tick = null; } }
  function stopPreview() { if (previewTick) { clearInterval(previewTick); previewTick = null; } }
  function clearIdle() { if (idleTimer) { clearTimeout(idleTimer); idleTimer = null; } }

  function endSession() {
    stopTick(); stopPreview(); clearIdle();
    autoLoading = false;
    if (instance) { try { if (instance.destroy) instance.destroy(); } catch (_) {} instance = null; }
    starting = false;
    previewMode = false; convStarted = false; idleFired = false;
    endCard(null);
    clearMount();
    timerPill(''); pill(''); banner(false);
    regHeading(false);
  }

  function render() {
    var u = user();
    $('aat-register').style.display = u ? 'none' : '';
    $('aat-ready').style.display = u ? '' : 'none';
    if (!u) initGsi();
    if (u && u.name) $('aat-hello').textContent = "You're in, " + u.name.split(' ')[0] + '.';
    if (u && panel.classList.contains('open')) start();
  }

  function loadSdk() {
    if (window.napsterCompanionApiSDK || window.NapsterCompanionApiSdk) return Promise.resolve();
    if (sdkLoading) return sdkLoading;
    sdkLoading = new Promise(function (res, rej) {
      var s = document.createElement('script');
      s.src = SDK_URL; s.onload = res; s.onerror = rej;
      document.body.appendChild(s);
    });
    return sdkLoading;
  }

  var SDK_FEATURES = {
    showSDKLoader: { enabled: false },       // our poster covers loading
    screenShare: { enabled: true },          // visitor can show Michael their screen
    pictureInPicture: { enabled: true }      // he follows into a floating window on tab switch
  };

  async function start() {
    if (instance || starting) return;
    var used = usage().s;
    if (DAILY_CAP - used < 60) { endCard('daily'); msg(''); return; } // less than a minute left = done for today
    starting = true;
    avatarReady = false; canvasSince = 0;
    endCard(null);
    stagePreload(true);
    msg('Connecting to Michael…');
    try {
      await loadSdk();
      var u = user() || {};
      var data = (tokenPrefetch && Date.now() - tokenPrefetchAt < 60000) ? await tokenPrefetch : null; // minted during the mic prompt
      tokenPrefetch = null;
      if (!data) data = await mintToken(u);
      if (!autoLoading && !panel.classList.contains('open')) { starting = false; return; } // closed mid-connect — don't meter
      var sdk = window.napsterCompanionApiSDK || window.NapsterCompanionApiSdk;
      if (!sdk) throw new Error('sdk missing');
      instance = await sdk.init(data.token, {
        mountContainer: '#aat-mount',
        avatarStyle: { view: 'rectangle' },
        features: SDK_FEATURES,
        onAvatarReady: function () { avatarReady = true; },
        onStateChange: stateHandler,
        onDestroy: function () {
          stopTick();
          instance = null; starting = false;
          clearMount(); timerPill('');
          if (panel.classList.contains('open')) {
            msg('');
            endCard('bye');
            track('aa_twin_hangup');
          }
        }
      });
      if (!autoLoading && !panel.classList.contains('open')) { // closed while connecting — stop metering
        var dead = instance; instance = null;
        try { if (dead && dead.destroy) dead.destroy(); } catch (_) {}
        starting = false; clearMount();
        return;
      }
      instance.showAvatar();
      // keep our poster over the SDK's connecting animation; reveal on real frames
      waitForReady(READY_WAIT).then(function (ready) {
        if (!instance) return;
        if (ready) { stagePreload(false); msg(''); convStart(); }
        else msg('Michael is taking longer than usual — hang tight or tap to retry.');
      });
      track('aa_twin_session');

      /* ---- caps: 5-min session, 5-min day ---- */
      sessionS = 0;
      var cap = Math.min(SESSION_CAP, DAILY_CAP - usage().s);
      stopTick();
      tick = setInterval(function () {
        sessionS++;
        var un = usage(); un.s++; if (un.s % 5 === 0 || sessionS >= cap) saveUsage(un);
        var left = cap - sessionS;
        if (left <= WARN_AT && left > 0) timerPill(fmt(left) + ' left');
        if (left <= 0) {
          var reason = (DAILY_CAP - un.s < 60) ? 'daily' : 'session';
          saveUsage(un);
          stopTick();
          var inst = instance; instance = null; // prevent onDestroy 'bye' card overriding
          try { if (inst && inst.destroy) inst.destroy(); } catch (_) {}
          clearMount(); msg('');
          endCard(reason);
          track('aa_twin_cap');
        }
      }, 1000);
    } catch (e) {
      msg('Michael is warming up — please try again in a minute.');
      starting = false;
      return;
    }
    starting = false;
  }

  /* ---- concierge auto-greet machinery (same flow as Lisa on livebrand.ai) ---- */

  function stateHandler(state) {
    try { console.debug('[aat] sdk state:', state); } catch (_) {}
    var s = '';
    try { s = String((state && (state.state || state.status || state.type)) || state).toLowerCase(); } catch (_) {}
    if (/(activ|connect|convers|listen|speak|talk|start)/.test(s) && !/(disconnect|inactiv|end|stop|clos)/.test(s)) convStart();
  }

  function convStart() {
    if (convStarted || !instance) return;
    convStarted = true;
    clearIdle();
    if (previewMode) startPreviewCountdown();
  }

  function armIdleGuard() {
    clearIdle();
    idleTimer = setTimeout(function () {
      idleTimer = null;
      if (convStarted || !instance) return;
      idleFired = true;
      stopTick(); stopPreview();
      var inst = instance; instance = null; // skip onDestroy UI — this is a quiet cost stop
      try { if (inst && inst.destroy) inst.destroy(); } catch (_) {}
      clearMount(); timerPill(''); pill('');
      msg('Tap here to start a live conversation with Michael.');
    }, IDLE_GUARD * 1000);
  }

  function twinSay(text) {
    var names = ['sendMessage', 'sendText', 'say', 'message'];
    var have = [];
    for (var i = 0; i < names.length; i++) { if (instance && typeof instance[names[i]] === 'function') have.push(names[i]); }
    if (!have.length) return;
    try { instance[have[0]](text); } catch (_) {}
  }

  function startPreviewCountdown() {
    if (previewTick) return;
    try { localStorage.setItem(LS_PREVIEW, '1'); } catch (_) {}
    track('aa_twin_preview_started');
    previewLeft = PREVIEW_CAP;
    pill(fmt(previewLeft) + ' preview', false);
    previewTick = setInterval(function () {
      previewLeft--;
      var un = usage(); un.s++; if (un.s % 5 === 0 || previewLeft <= 0) saveUsage(un);
      pill(fmt(Math.max(previewLeft, 0)) + ' preview', previewLeft <= PREVIEW_WARN);
      if (previewLeft === PREVIEW_WARN) {
        banner(true);
        track('aa_twin_preview_warning');
        twinSay('[SYSTEM: 30 seconds remain in this preview. Tell the visitor: if you\'d like to continue chatting, please register when the form appears.]');
      }
      if (previewLeft <= 0) expirePreview();
    }, 1000);
  }

  function expirePreview() {
    stopPreview(); clearIdle();
    previewMode = false; previewExpired = true;
    var inst = instance; instance = null; // skip onDestroy UI
    try { if (inst && inst.destroy) inst.destroy(); } catch (_) {}
    starting = false;
    clearMount(); timerPill(''); pill(''); banner(false);
    msg('Connecting to Michael…');
    regHeading(true);
    $('aat-register').style.display = '';
    $('aat-ready').style.display = 'none';
    initGsi();
    track('aa_twin_preview_expired');
  }

  function waitForReady(timeoutMs) {
    // "Ready" = actual picture frames are flowing, NOT the SDK's ready callback —
    // that fires (and a canvas can exist) while its connecting animation is still up.
    return new Promise(function (res) {
      var t0 = Date.now(), lastCT = -1;
      var iv = setInterval(function () {
        if (!instance && !starting) { clearInterval(iv); res(false); return; } // aborted / died
        var ok = false;
        var m = $('aat-mount');
        var v = m && m.querySelector('video');
        var c = m && m.querySelector('canvas');
        if (v && v.videoWidth > 0 && v.currentTime > 0.2) {
          if (lastCT >= 0 && v.currentTime > lastCT) ok = true; // frames advancing between samples
          lastCT = v.currentTime;
        } else if (!v && c && avatarReady) { // canvas renderer: SDK ready signal + generous settle
          if (!canvasSince) canvasSince = Date.now();
          if (Date.now() - canvasSince > 2500) ok = true;
        }
        if (ok) { clearInterval(iv); res(!!instance); }
        else if (Date.now() - t0 > timeoutMs) { clearInterval(iv); res(false); }
      }, 250);
    });
  }

  async function previewInit(silent) {
    if (instance || starting) return false;
    starting = true;
    avatarReady = false; canvasSince = 0;
    stagePreload(true);
    if (!silent) { endCard(null); msg('Connecting to Michael…'); }
    try {
      await loadSdk();
      var data = (tokenPrefetch && Date.now() - tokenPrefetchAt < 60000) ? await tokenPrefetch : null; // minted during the mic prompt
      tokenPrefetch = null;
      if (!data) data = await mintToken(null);
      if ((silent && !autoLoading) || (!silent && !panel.classList.contains('open'))) { starting = false; return false; } // cancelled mid-connect
      var sdk = window.napsterCompanionApiSDK || window.NapsterCompanionApiSdk;
      if (!sdk) throw new Error('sdk missing');
      instance = await sdk.init(data.token, {
        mountContainer: '#aat-mount',
        avatarStyle: { view: 'rectangle' },
        features: SDK_FEATURES,
        onAvatarReady: function () { avatarReady = true; },
        onStateChange: stateHandler,
        onDestroy: function () {
          stopPreview();
          instance = null; starting = false;
          clearMount(); pill('');
        }
      });
      if ((silent && !autoLoading) || (!silent && !panel.classList.contains('open'))) { // cancelled while connecting — stop metering
        var dead = instance; instance = null;
        try { if (dead && dead.destroy) dead.destroy(); } catch (_) {}
        starting = false; clearMount();
        return false;
      }
      instance.showAvatar();
      if (!silent) { // manual open: hold our poster until real frames flow
        waitForReady(READY_WAIT).then(function (ready) {
          if (!instance) return;
          if (ready) { stagePreload(false); msg(''); convStart(); }
          else msg('Michael is taking longer than usual — hang tight or tap to retry.');
        });
      }
      starting = false;
      return true;
    } catch (e) {
      starting = false;
      if (!silent) msg('Michael is warming up — please try again in a minute.');
      return false;
    }
  }

  function abortAuto() {
    previewMode = false;
    stopTick(); stopPreview(); clearIdle();
    var inst = instance; instance = null; // skip onDestroy UI — silent abort
    try { if (inst && inst.destroy) inst.destroy(); } catch (_) {}
    starting = false;
    clearMount(); timerPill(''); pill(''); toast('');
    msg('Connecting to Michael…');
  }

  function openAuto(isPreview) {
    if (panel.classList.contains('open')) return; // visitor beat us to it via the launcher
    try { localStorage.setItem(LS_AUTOPOP, todayKey()); } catch (_) {}
    msg('');
    endCard(null);
    if (isPreview) {
      $('aat-register').style.display = 'none';
      $('aat-ready').style.display = '';
      $('aat-hello').textContent = 'Michael is live — just say hello.';
      pill(fmt(PREVIEW_CAP) + ' preview', false);
    } else {
      render(); // registered: show the stage + greeting (start() no-ops onto the live session)
    }
    stagePreload(false); // avatar is verified frame-ready by autoGreet before we get here
    idleFired = false;
    toast('');
    panel.classList.add('open');
    convStart(); // mic is granted, so the SDK auto-starts and Michael greets — clock runs from open
    track('aa_twin_autopop_shown');
  }

  async function autoGreet() {
    if (isStandalone()) return; // browser pages only, not installed PWAs
    if (panel.classList.contains('open') || instance || starting) return;
    try { if (localStorage.getItem(LS_AUTOPOP) === todayKey()) return; } catch (_) { return; }
    if (DAILY_CAP - usage().s < 60) return; // nothing left to meter today
    var u = user();
    if (!u && previewUsed()) return; // anonymous preview already consumed
    autoLoading = true;
    /* Mic first, WITH context: browsers only unlock the twin's voice once the mic is
       granted, and a naked permission prompt bewilders new visitors. */
    var perm = 'prompt';
    try { perm = (await navigator.permissions.query({ name: 'microphone' })).state; } catch (_) {}
    if (perm === 'denied') { autoLoading = false; return; } // can't converse — leave the launcher
    /* warm-start: download the SDK + mint the token WHILE the visitor reads the
       prompt, so the wait after "Allow" is pure connection time */
    loadSdk().catch(function () {});
    tokenPrefetch = mintToken(u).catch(function () { return null; });
    tokenPrefetchAt = Date.now();
    if (perm !== 'granted') {
      toast('&#128075; <strong>Michael Rivera</strong>, our founder &mdash; well, his AI twin &mdash; is here. Allow your microphone and he&#8217;ll say hello.');
      var got = await micPermission();
      if (!autoLoading) { toast(''); return; } // a manual open raced the prompt
      if (!got) { // declined or dismissed — don't ask again today
        toast('');
        try { localStorage.setItem(LS_AUTOPOP, todayKey()); } catch (_) {}
        autoLoading = false;
        return;
      }
      toast('One moment &mdash; Michael is stepping in&#8230;');
    }
    var ok;
    if (u) {
      await start(); // panel is closed, so any status copy stays off-screen
      ok = !!instance;
    } else {
      previewMode = true;
      ok = await previewInit(true);
    }
    if (ok) ok = await waitForReady(READY_WAIT);
    if (!autoLoading) return; // a manual open cancelled the auto flow mid-load
    autoLoading = false;
    if (!ok) { abortAuto(); return; }
    openAuto(!u);
  }

  /* ---- events ---- */
  $('aat-open').addEventListener('click', function () {
    toast('');
    if (autoLoading) { // manual open wins over the silent preload
      autoLoading = false;
      if (previewMode) { previewMode = false; if (!starting) abortAuto(); } // in-flight preview init self-cancels
      // a registered preload is simply adopted — render()/start() below no-op onto the live session
    }
    panel.classList.add('open');
    render();
  });
  $('aat-close').addEventListener('click', function () { panel.classList.remove('open'); endSession(); });
  $('aat-stage').addEventListener('pointerdown', function () {
    if (instance) { convStart(); return; } // SDK click-to-start doubles as our conversation signal
    if (!idleFired || starting || !panel.classList.contains('open')) return;
    idleFired = false; convStarted = false; // idle guard fired earlier — the tap re-inits
    if (previewMode) {
      previewInit(false).then(function (ok) { if (ok) armIdleGuard(); });
    } else if (user()) {
      start().then(function () { if (instance) armIdleGuard(); });
    }
  });
  $('aat-again').addEventListener('click', function () { endCard(null); start(); });
  $('aat-book').addEventListener('click', function () { track('aa_twin_book_click'); });
  $('aat-note-book').addEventListener('click', function () { track('aa_twin_book_click'); });

  $('aat-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var name = $('aat-name'), email = $('aat-email'), phone = $('aat-phone');
    var ok = true;
    name.classList.toggle('err', name.value.trim().length < 2); if (name.value.trim().length < 2) ok = false;
    var em = email.value.trim().toLowerCase();
    email.classList.toggle('err', !em || em.indexOf('@') < 0); if (!em || em.indexOf('@') < 0) ok = false;
    if (!ok) return;
    var lead = { name: name.value.trim(), email: em, phone: phone.value.trim(), brand: 'avataragency', source: 'twin:' + location.pathname, registeredAt: new Date().toISOString() };
    try { localStorage.setItem(LS_USER, JSON.stringify(lead)); } catch (_) {}
    fetch(LEAD_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lead) }).catch(function () {});
    if (typeof gtag === 'function') gtag('event', 'sign_up', { method: 'twin', event_category: 'AvatarAgency' });
    if (previewExpired) { previewExpired = false; regHeading(false); track('aa_twin_preview_registered'); }
    render();
  });

  setTimeout(function () { autoGreet(); }, AUTO_DELAY);
})();
