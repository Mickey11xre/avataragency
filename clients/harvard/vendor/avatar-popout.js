/* avatar-popout.js — the stage-standard pop-out (Michael 10-24: "always default to a new small window on top of the
 * shared screen; when you go back to the page, the avatar goes back into her normal position on the stage").
 * Proven on Ethica's preview first (bdf6549), then rolled to every stage. AVATAR-STAGE-SPEC: "Pop-out on screen share".
 *
 * - The moment the visitor starts sharing their screen, the avatar opens in a small always-on-top window above what
 *   they share. Chrome only opens that window inside a click, so it opens in the SAME click as the SDK's Share Screen
 *   button: getDisplayMedia is wrapped below, the picker starts first (the share never depends on the pop-out), and a
 *   cancelled picker closes the window.
 * - Back on the page (this window regains focus, or the tab is shown again) = back on the stage: the window closes.
 * - Chrome cannot re-float the avatar without a click, so while sharing with the avatar back on the stage, a
 *   "Pop <name> out" button shows on the stage as the manual way.
 * - Like the SDK's own PiP, the window clones the SDK's video muted; the voice keeps playing from the page. Where the
 *   floating-document window is refused (embedded browsers, Safari), it falls back to plain video picture-in-picture.
 *
 * Use (one line per stage, inside sdk.init's options):
 *   onScreenShareStateChange: window.AvatarPopout ? AvatarPopout.hook("#paul-mount", { name: "Paul" }) : undefined,
 * Load this file BEFORE the session can start (a plain <script src="/avatar-popout.js?v=1"> anywhere).
 */
(function () {
  if (window.AvatarPopout) return;
  var STYLE = ".av-popout{position:absolute;z-index:7;top:var(--av-popout-top,16px);left:50%;transform:translateX(-50%);" +
    "display:inline-flex;align-items:center;gap:8px;height:38px;padding:0 14px;border-radius:999px;border:1px solid rgba(255,255,255,.22);" +
    "background:rgba(0,0,0,.6);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);color:#fff;font-family:inherit;font-size:13px;font-weight:600;line-height:1;" +
    "white-space:nowrap;cursor:pointer}.av-popout:hover{border-color:rgba(255,255,255,.5)}.av-popout svg{width:16px;height:16px}" +
    ".av-popout[hidden]{display:none}";
  var ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><rect x="12" y="12" width="7" height="5" rx="1" fill="currentColor"/></svg>';
  var stages = [], popWin = null, leftPage = false, awayFrom = 0, watch = null;

  function track(n, p) { try { if (window.gtag) gtag("event", n, p || {}); } catch (e) {} }
  function liveVideo(root) {
    var vs = (root || document).querySelectorAll(".np_companion-avatar-video");
    for (var i = 0; i < vs.length; i++) if (vs[i].srcObject) return vs[i];
    return null;
  }
  function liveStage() { for (var i = 0; i < stages.length; i++) if (liveVideo(stages[i].mount)) return stages[i]; return null; }
  function isOpen() { return !!(popWin || document.pictureInPictureElement); }
  function sharingAny() { return stages.some(function (s) { return s.sharing; }); }
  function refresh() { stages.forEach(function (s) { s.render(); }); }
  function close() {
    leftPage = false;
    if (popWin) { try { popWin.close(); } catch (e) {} popWin = null; }
    else if (document.pictureInPictureElement) document.exitPictureInPicture().catch(function () {});
  }
  // The window request is made synchronously inside the click (nothing is awaited before it).
  async function open(st, auto) {
    var v = liveVideo(st && st.mount); if (!v || isOpen()) return;
    var name = (st && st.name) || "Avatar";
    var videoPip = function () { return v.requestPictureInPicture().then(function () { v.addEventListener("leavepictureinpicture", refresh, { once: true }); }); };
    try {
      if (window.documentPictureInPicture) {
        var w;
        try { w = await window.documentPictureInPicture.requestWindow({ width: 384, height: 216 }); }
        catch (e1) { if (!document.pictureInPictureEnabled) throw e1; await videoPip(); track("avatar_popout", { avatar: name, auto: !!auto, kind: "video" }); refresh(); return; }
        popWin = w;
        var c = w.document.createElement("video");
        c.srcObject = v.srcObject; c.autoplay = true; c.muted = true; c.playsInline = true;
        c.style.cssText = "position:fixed;inset:0;width:100%;height:100%;object-fit:cover;object-position:center";
        w.document.body.style.cssText = "margin:0;background:#000;overflow:hidden";
        w.document.title = name;
        w.document.body.appendChild(c);
        w.addEventListener("pagehide", function () { if (popWin === w) popWin = null; refresh(); });
      } else await videoPip();
      track("avatar_popout", { avatar: name, auto: !!auto });
    } catch (e) { if (window.console) console.warn("[avatar-popout]", e && e.name, e && e.message); }
    refresh();
  }
  // The session ended without a share-state callback (hang-up, time cap): close and hide.
  function watchEnd() {
    if (watch) return;
    watch = setInterval(function () {
      stages.forEach(function (s) { if (s.sharing && !liveVideo(s.mount)) s.sharing = false; });
      if (!sharingAny()) { clearInterval(watch); watch = null; close(); refresh(); }
    }, 1000);
  }

  // Same click as the SDK's Share Screen button: start the picker, then open the window while the click still counts.
  var md = navigator.mediaDevices;
  if (md && typeof md.getDisplayMedia === "function") {
    var orig = md.getDisplayMedia.bind(md);
    md.getDisplayMedia = function (opts) {
      var p = orig(opts), st = liveStage();
      if (st && !isOpen()) { open(st, true); p.then(null, function () { if (!sharingAny()) close(); }); }
      return p;
    };
  }
  // Back on this page = back on the stage. Leaving = this window loses focus, or the tab is hidden, while it floats.
  function backToPage() { if (leftPage && isOpen()) { close(); refresh(); track("avatar_popout_return", {}); } leftPage = false; }
  window.addEventListener("blur", function () { if (sharingAny() && isOpen() && Date.now() > awayFrom) leftPage = true; });
  window.addEventListener("focus", backToPage);
  document.addEventListener("visibilitychange", function () { if (document.hidden) { if (isOpen()) leftPage = true; } else backToPage(); });

  window.AvatarPopout = {
    // Returns the onScreenShareStateChange callback for one stage. opts: { name, top } (top = the button's CSS top).
    hook: function (mount, opts) {
      opts = opts || {};
      var el = typeof mount === "string" ? document.querySelector(mount) : mount;
      if (!el) return function () {};
      var st = stages.filter(function (s) { return s.mount === el; })[0];
      if (!st) {
        if (!document.getElementById("av-popout-style")) { var s = document.createElement("style"); s.id = "av-popout-style"; s.textContent = STYLE; document.head.appendChild(s); }
        st = { mount: el, name: opts.name || "", sharing: false, btn: null };
        st.render = function () {
          if (!st.btn) {
            st.btn = document.createElement("button"); st.btn.type = "button"; st.btn.className = "av-popout";
            st.btn.innerHTML = ICON + "<span>Pop " + (st.name || "the avatar") + " out</span>";
            if (opts.top) st.btn.style.setProperty("--av-popout-top", opts.top);
            st.btn.addEventListener("click", function () { open(st, false); });
            (el.parentElement || el).appendChild(st.btn);
          }
          st.btn.hidden = !(st.sharing && !isOpen() && liveVideo(el) && (window.documentPictureInPicture || document.pictureInPictureEnabled));
        };
        stages.push(st);
      } else if (opts.name && opts.name !== st.name) {   // one overlay, several twins (e.g. /thrive/): follow the current one
        st.name = opts.name;
        if (st.btn) st.btn.querySelector("span").textContent = "Pop " + st.name + " out";
      }
      return function (on) {
        st.sharing = !!on;
        if (st.sharing) { awayFrom = Date.now() + 1200; track("avatar_screen_share", { avatar: st.name }); watchEnd(); }   // ignore focus noise as the picker closes
        else if (!sharingAny()) close();
        refresh();
      };
    },
    // For tests: is a pop-out window open right now?
    isOpen: isOpen,
  };
})();
