/* Client sign-in pages (/login/ and /login/change/) — talks to /api/client-auth. 2026-11-24. */
(function () {
  var API = "/api/client-auth";
  var qs = new URLSearchParams(location.search);
  var next = qs.get("next") || "";
  function $(s) { return document.querySelector(s); }
  function show(el, text, kind) { el.textContent = text; el.className = "msg " + (kind || "err"); el.hidden = !text; }
  function post(body) {
    return fetch(API, { method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      .then(function (r) { return r.json().catch(function () { return { ok: false, error: "Something went wrong. Try again." }; }); })
      .catch(function () { return { ok: false, error: "Couldn't reach the server. Check your connection and try again." }; });
  }
  function me() { return fetch(API + "?action=me", { credentials: "same-origin" }).then(function (r) { return r.json(); }).catch(function () { return { ok: false }; }); }

  var loginForm = $("#login-form");
  if (loginForm) {
    var msg = $("#login-msg"), chooser = $("#chooser");
    if (qs.get("out")) show(msg, "You're signed out.", "ok");
    me().then(function (m) {
      if (!m || !m.ok) return;
      if (m.must_change) { location.replace("/login/change/" + (next ? "?next=" + encodeURIComponent(next) : "")); return; }
      if (next && m.role !== "admin" && m.portals.some(function (p) { return next.indexOf(p.href) === 0; })) { location.replace(next); return; }
      if (m.role !== "admin" && m.portals.length === 1 && !qs.get("out")) { location.replace(m.portals[0].href); return; }
      loginForm.hidden = true; chooser.hidden = false;
      $("#who").textContent = m.name || m.email;
      var ul = $("#portal-list");
      m.portals.forEach(function (p) {
        var li = document.createElement("li"), a = document.createElement("a");
        a.href = p.href; a.textContent = p.name; var s = document.createElement("span"); s.textContent = "Open →"; a.appendChild(s);
        li.appendChild(a); ul.appendChild(li);
      });
    });
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = $("#login-btn"); btn.disabled = true; show(msg, "");
      post({ action: "login", email: $("#email").value, password: $("#password").value, next: next }).then(function (r) {
        btn.disabled = false;
        if (r.ok) { location.href = r.next || "/login/"; return; }
        show(msg, r.error || "Sign-in failed."); $("#password").value = ""; $("#password").focus();
      });
    });
    var out = $("#signout");
    if (out) out.addEventListener("click", function () { post({ action: "logout" }).then(function () { location.href = "/login/?out=1"; }); });
  }

  var changeForm = $("#change-form");
  if (changeForm) {
    var cmsg = $("#change-msg");
    me().then(function (m) {
      if (!m || !m.ok) { location.replace("/login/" + (next ? "?next=" + encodeURIComponent(next) : "")); return; }
      $("#who").textContent = m.name || m.email;
      if (!m.must_change) $("#lede").textContent = "Choose a new password for your client portal.";
    });
    changeForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var pw = $("#new").value, again = $("#confirm").value;
      if (pw.length < 10) { show(cmsg, "Use at least 10 characters."); $("#new").focus(); return; }
      if (pw !== again) { show(cmsg, "The two new passwords don't match."); $("#confirm").focus(); return; }
      var btn = $("#change-btn"); btn.disabled = true; show(cmsg, "");
      post({ action: "change", current: $("#current").value, password: pw, next: next }).then(function (r) {
        btn.disabled = false;
        if (r.ok) { show(cmsg, "Password saved. Opening your portal…", "ok"); setTimeout(function () { location.href = r.next || "/login/"; }, 600); return; }
        show(cmsg, r.error || "Couldn't save your password.");
        if (r.field === "current") $("#current").focus(); else $("#new").focus();
      });
    });
  }
})();
