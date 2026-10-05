/* Sign-in for the avatar dashboard: email -> one-time link + 6-digit code (/api/dash-auth). */
(() => {
  "use strict";
  const $ = (s) => document.querySelector(s);
  const token = new URLSearchParams(location.search).get("t") || "";
  if (token) history.replaceState(null, "", location.pathname);      // the one-time token stays out of history
  let email = "";

  async function post(body) {
    let r;
    try {
      r = await fetch("/api/dash-auth", { method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    } catch (e) { throw new Error("No connection. Check your internet and try again."); }
    let j = null;
    try { j = await r.json(); } catch (e) { /* not JSON */ }
    if (!r.ok || !j || !j.ok) throw new Error((j && j.error) || "Something went wrong. Try again.");
    return j;
  }
  function step(id) {
    for (const s of ["stEmail", "stCode", "stToken"]) $("#" + s).hidden = s !== id;
    const f = { stEmail: "#email", stCode: "#code", stToken: "#goBtn" }[id];
    setTimeout(() => $(f).focus(), 30);
  }
  function busy(btn, on, label) {
    btn.disabled = on;
    if (on) { btn.dataset.label = btn.textContent; btn.textContent = label; } else if (btn.dataset.label) btn.textContent = btn.dataset.label;
  }
  const enter = () => location.replace("/dashboard/");

  $("#emailForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const v = $("#email").value.trim().toLowerCase();
    $("#errEmail").textContent = "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) { $("#errEmail").textContent = "Enter a valid email address."; return; }
    busy($("#emailBtn"), true, "Sending…");
    try { await post({ action: "request", email: v }); email = v; $("#sentTo").textContent = v; $("#code").value = ""; $("#errCode").textContent = ""; step("stCode"); }
    catch (er) { $("#errEmail").textContent = er.message; }
    busy($("#emailBtn"), false);
  });

  $("#codeForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const code = $("#code").value.replace(/\D/g, "");
    $("#errCode").textContent = "";
    if (code.length !== 6) { $("#errCode").textContent = "Enter the 6-digit code from the email."; return; }
    busy($("#codeBtn"), true, "Signing in…");
    try { await post({ action: "verify", email, code }); enter(); return; }
    catch (er) { $("#errCode").textContent = er.message; }
    busy($("#codeBtn"), false);
  });
  $("#code").addEventListener("input", (e) => {
    const v = e.target.value.replace(/\D/g, "").slice(0, 6);
    e.target.value = v;
    if (v.length === 6 && !$("#codeBtn").disabled) $("#codeForm").requestSubmit();
  });
  $("#otherEmail").addEventListener("click", () => step("stEmail"));
  $("#resend").addEventListener("click", async () => {
    $("#errCode").textContent = "";
    try { await post({ action: "request", email }); $("#errCode").textContent = "Sent. A new email can go out once a minute, so give it a moment."; }
    catch (er) { $("#errCode").textContent = er.message; }
  });

  $("#goBtn").addEventListener("click", async () => {
    $("#errToken").textContent = "";
    busy($("#goBtn"), true, "Signing in…");
    try { await post({ action: "verify", token }); enter(); return; }
    catch (er) { $("#errToken").textContent = er.message; $("#tokenAlt").hidden = false; }
    busy($("#goBtn"), false);
  });
  $("#newLink").addEventListener("click", () => step("stEmail"));

  if (token) step("stToken");
  else {
    step("stEmail");
    // Already signed in on this browser? Go straight in.
    fetch("/api/dash/me", { credentials: "same-origin" }).then((r) => { if (r.ok) enter(); }).catch(() => {});
  }
})();
