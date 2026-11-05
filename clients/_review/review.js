/**
 * AvatarAgency review layer: numbered comment pins on a client site preview.
 *
 * Included by a site's page shell as  <script src="/clients/_review/review.js" data-site="<slug>" defer></script>.
 * Inert for every visitor until the page is opened once with ?review=<code> (a reviewer link); the code is then kept in
 * localStorage and the layer appears on every page of that site. Server: /api/review-pins (functions/api/review-pins.js).
 *
 * The reviewer clicks Add comment, taps a spot on the page, types a note. Pins anchor to the element under the tap
 * (CSS path + offset inside it) with a page-coordinate fallback, so they follow the layout on any screen size.
 * Send to Michael stamps a round on the unsent notes and emails a digest. The owner replies and resolves.
 */
(function () {
  "use strict";
  var S = document.currentScript, SITE = S && S.dataset.site;
  if (!SITE) return;
  var API = (S.dataset.api || "/api/review-pins") + "?site=" + encodeURIComponent(SITE);
  var KEY = "aa_review:" + SITE;

  var q = new URLSearchParams(location.search), given = q.get("review");
  if (given && /^[a-f0-9]{32}$/i.test(given)) {
    try { localStorage.setItem(KEY, given.toLowerCase()); } catch (e) {}
    q.delete("review");
    history.replaceState(null, "", location.pathname + (q.toString() ? "?" + q : "") + location.hash);
  }
  var code = null; try { code = localStorage.getItem(KEY); } catch (e) {}
  if (!code) return;

  // ---- state ----
  var me = null, site = null, comments = [], rounds = [], openId = null, composing = null, pinMode = false, panelOpen = false, hidden = false;
  var root, bar, layer, pop, panel, cap, toastEl, raf = 0, pinEls = {};
  var isMobile = function () { return innerWidth < 720; };

  // ---- helpers ----
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function when(iso) { try { return new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }); } catch (e) { return ""; } }
  function api(body) {
    var o = { method: body ? "POST" : "GET", headers: { "X-Review-Code": code } };
    if (body) { o.headers["Content-Type"] = "application/json"; o.body = JSON.stringify(body); }
    return fetch(API, o).then(function (r) { return r.json().then(function (j) { if (!r.ok || !j.ok) throw new Error(j.error || r.status); return j; }); });
  }
  function toast(msg, ms) {
    if (!toastEl) { toastEl = el("div", "aa-rv aa-rv-toast"); document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add("on");
    clearTimeout(toastEl._t); toastEl._t = setTimeout(function () { toastEl.classList.remove("on"); }, ms || 2600);
  }
  function pagePath() {
    var base = (site && site.base) || document.body.dataset.root || "";
    var p = location.pathname;
    if (base && p.indexOf(base) === 0) p = p.slice(base.length);
    if (!p) p = "/";
    if (p.slice(-1) !== "/") p += "/";
    return p.replace(/\/index\.html\/$/, "/");
  }
  function byId(id) { for (var i = 0; i < comments.length; i++) if (comments[i].id === id) return comments[i]; return null; }
  function mine(c) { return me && c.by === me.name && c.role === me.role; }
  function unsentMine() { return comments.filter(function (c) { return c.round === null && mine(c); }); }
  function onThisPage(c) { return c.page === pagePath(); }

  // ---- anchors ----
  function cssPath(e) {
    var parts = [];
    while (e && e.nodeType === 1 && e !== document.body && parts.length < 10) {
      if (e.id && /^[A-Za-z][\w-]*$/.test(e.id)) { parts.unshift("#" + e.id); return parts.join(">"); }
      var tag = e.tagName.toLowerCase(), i = 1, s = e;
      while ((s = s.previousElementSibling)) if (s.tagName === e.tagName) i++;
      parts.unshift(tag + ":nth-of-type(" + i + ")");
      e = e.parentElement;
    }
    return "body>" + parts.join(">");
  }
  function snippetOf(e) {
    var t = (e.getAttribute && (e.getAttribute("alt") || e.getAttribute("aria-label"))) || "";
    if (!t) t = (e.innerText || e.textContent || "").replace(/\s+/g, " ").trim();
    if (!t) t = e.tagName === "IMG" ? "image" : e.tagName === "VIDEO" ? "video" : e.tagName.toLowerCase();
    return t.slice(0, 80);
  }
  function targetAt(x, y) {
    var list = document.elementsFromPoint(x, y);
    for (var i = 0; i < list.length; i++) {
      var e = list[i];
      if (e.closest && e.closest(".aa-rv")) continue;
      if (e === document.documentElement || e === document.body) continue;
      return e;
    }
    return document.body;
  }
  function makeAnchor(x, y) {
    var t = targetAt(x, y), r = t.getBoundingClientRect();
    var ox = r.width ? (x - r.left) / r.width : 0.5, oy = r.height ? (y - r.top) / r.height : 0.5;
    return { sel: cssPath(t), ox: Math.min(1, Math.max(0, ox)), oy: Math.min(1, Math.max(0, oy)),
      px: x / document.documentElement.clientWidth, py: y + scrollY, snippet: snippetOf(t) };
  }
  function resolvePos(a) {
    var e = null;
    try { e = a.sel ? document.querySelector(a.sel) : null; } catch (err) {}
    if (e) {
      var r = e.getBoundingClientRect();
      if (r.width > 0 || r.height > 0) return { x: r.left + a.ox * r.width, y: r.top + a.oy * r.height, ok: true };
      return null;
    }
    return { x: a.px * document.documentElement.clientWidth, y: a.py - scrollY, ok: false };
  }

  // ---- pins ----
  function renderPins() {
    var seen = {};
    comments.forEach(function (c) {
      if (!onThisPage(c)) return;
      seen[c.id] = 1;
      var p = pinEls[c.id];
      if (!p) {
        p = el("button", "aa-rv aa-rv-pin"); p.type = "button"; p.dataset.id = c.id;
        p.addEventListener("click", function (ev) { ev.stopPropagation(); openPin(c.id); });
        layer.appendChild(p); pinEls[c.id] = p;
      }
      p.textContent = c.n; p.title = c.text.slice(0, 120);
      p.classList.toggle("done", c.status === "resolved");
      p.classList.toggle("unsent", c.round === null);
      p.classList.toggle("active", c.id === openId);
    });
    Object.keys(pinEls).forEach(function (id) { if (!seen[id]) { pinEls[id].remove(); delete pinEls[id]; } });
  }
  function tick() {
    for (var id in pinEls) {
      var c = byId(id), p = pinEls[id]; if (!c) continue;
      var pos = resolvePos(c.anchor);
      if (!pos) { p.style.display = "none"; continue; }
      p.style.display = ""; p.style.transform = "translate(" + Math.round(pos.x) + "px," + Math.round(pos.y) + "px)";
      if (id === openId && pop && !isMobile()) placePop(pos);
    }
    if (composing && composing.anchor && pop && !isMobile()) { var cp = resolvePos(composing.anchor); if (cp) placePop(cp); }
    raf = requestAnimationFrame(tick);
  }
  function placePop(pos) {
    var w = pop.offsetWidth, h = pop.offsetHeight, x = pos.x + 20, y = pos.y - 12;
    if (x + w > innerWidth - 10) x = pos.x - w - 20;
    if (x < 10) x = 10;
    if (y + h > innerHeight - 10) y = innerHeight - h - 10;
    if (y < 10) y = 10;
    pop.style.transform = "translate(" + Math.round(x) + "px," + Math.round(y) + "px)";
  }

  // ---- popover (thread / compose) ----
  function closePop() { if (pop) { pop.remove(); pop = null; } openId = null; composing = null; renderPins(); }
  function openPin(id) {
    var c = byId(id); if (!c) return;
    closePop(); openId = id; renderPins();
    pop = el("div", "aa-rv aa-rv-pop");
    var owner = me.role === "owner", canEdit = owner || (mine(c) && c.round === null);
    pop.innerHTML =
      '<div class="aa-rv-ph"><span class="aa-rv-n">' + c.n + '</span><span class="aa-rv-meta">' + esc(c.by) + ' · ' + when(c.at) +
      (c.round ? ' · sent round ' + c.round : ' · <em>not sent yet</em>') + '</span><span class="aa-rv-st ' + c.status + '">' + (c.status === "resolved" ? "Resolved" : "Open") + '</span><button type="button" class="aa-rv-x" data-act="close" aria-label="Close">&times;</button></div>' +
      (c.anchor.snippet ? '<div class="aa-rv-near">near “' + esc(c.anchor.snippet) + '”</div>' : "") +
      '<div class="aa-rv-text" data-text>' + esc(c.text) + '</div>' +
      '<div class="aa-rv-replies">' + c.replies.map(function (r) { return '<div class="aa-rv-reply"><b>' + esc(r.by) + '</b> <span>' + when(r.at) + '</span><div>' + esc(r.text) + '</div></div>'; }).join("") + '</div>' +
      '<textarea class="aa-rv-ta" data-reply placeholder="Reply…" rows="2"></textarea>' +
      '<div class="aa-rv-acts"><button type="button" class="aa-rv-b gold" data-act="reply">Reply</button>' +
      (owner ? '<button type="button" class="aa-rv-b" data-act="' + (c.status === "resolved" ? "reopen" : "resolve") + '">' + (c.status === "resolved" ? "Reopen" : "Mark resolved") + '</button>' : "") +
      (canEdit ? '<button type="button" class="aa-rv-b" data-act="edit">Edit</button><button type="button" class="aa-rv-b danger" data-act="delete">Delete</button>' : "") + '</div>';
    pop.addEventListener("click", function (ev) {
      var b = ev.target.closest("[data-act]"); if (!b) return;
      var act = b.dataset.act;
      if (act === "close") return closePop();
      if (act === "reply") { var t = pop.querySelector("[data-reply]").value.trim(); if (!t) return; b.disabled = true; return api({ action: "reply", id: c.id, text: t }).then(function (j) { replace(j.comment); openPin(c.id); toast("Reply saved"); }).catch(fail(b)); }
      if (act === "resolve" || act === "reopen") { b.disabled = true; return api({ action: act, id: c.id }).then(function (j) { replace(j.comment); openPin(c.id); toast(act === "resolve" ? "Marked resolved" : "Reopened"); }).catch(fail(b)); }
      if (act === "delete") { if (!confirm("Delete comment #" + c.n + "?")) return; b.disabled = true; return api({ action: "delete", id: c.id }).then(function () { comments = comments.filter(function (x) { return x.id !== c.id; }); closePop(); renderAll(); toast("Deleted"); }).catch(fail(b)); }
      if (act === "edit") {
        var box = pop.querySelector("[data-text]"); box.innerHTML = '<textarea class="aa-rv-ta" rows="4">' + esc(c.text) + '</textarea><div class="aa-rv-acts"><button type="button" class="aa-rv-b gold" data-act="save">Save</button><button type="button" class="aa-rv-b" data-act="cancel">Cancel</button></div>'; box.querySelector("textarea").focus(); return;
      }
      if (act === "cancel") return openPin(c.id);
      if (act === "save") { var nt = pop.querySelector("[data-text] textarea").value.trim(); if (!nt) return; b.disabled = true; return api({ action: "edit", id: c.id, text: nt }).then(function (j) { replace(j.comment); openPin(c.id); toast("Saved"); }).catch(fail(b)); }
    });
    root.appendChild(pop);
    var pos = resolvePos(c.anchor); if (pos && !isMobile()) placePop(pos);
  }
  function compose(anchor) {
    closePop(); composing = { anchor: anchor };
    pop = el("div", "aa-rv aa-rv-pop");
    pop.innerHTML = '<div class="aa-rv-ph"><span class="aa-rv-n">+</span><span class="aa-rv-meta">New comment' + (anchor.snippet ? ' · near “' + esc(anchor.snippet) + '”' : "") + '</span><button type="button" class="aa-rv-x" data-act="close" aria-label="Close">&times;</button></div>' +
      '<textarea class="aa-rv-ta" data-new rows="4" placeholder="What should change here?"></textarea>' +
      '<div class="aa-rv-acts"><button type="button" class="aa-rv-b gold" data-act="save">Save comment</button><button type="button" class="aa-rv-b" data-act="close">Cancel</button></div>';
    pop.addEventListener("click", function (ev) {
      var b = ev.target.closest("[data-act]"); if (!b) return;
      if (b.dataset.act === "close") return closePop();
      if (b.dataset.act === "save") {
        var t = pop.querySelector("[data-new]").value.trim(); if (!t) return; b.disabled = true;
        api({ action: "add", page: pagePath(), title: document.title.replace(/\s+[|·–-]\s+.*$/, "").slice(0, 120), anchor: anchor, text: t })
          .then(function (j) { comments.push(j.comment); closePop(); renderAll(); toast("Comment #" + j.comment.n + " saved." + (me.role === "owner" ? "" : " Add more, then Send to Michael.")); })
          .catch(fail(b));
      }
    });
    root.appendChild(pop);
    var pos = resolvePos(anchor); if (pos && !isMobile()) placePop(pos);
    pop.querySelector("textarea").focus();
  }
  function fail(b) { return function (e) { if (b) b.disabled = false; toast("Could not save (" + e.message + "). Try again."); }; }
  function replace(c) { for (var i = 0; i < comments.length; i++) if (comments[i].id === c.id) comments[i] = c; }

  // ---- pin mode ----
  function setPinMode(on) {
    pinMode = on; bar.classList.toggle("pinning", on); cap.hidden = !on; document.documentElement.classList.toggle("aa-rv-pinning", on);
    if (on) { closePop(); setPanel(false); toast("Tap the spot you want to comment on", 2200); }
  }
  function capClick(ev) {
    ev.preventDefault(); ev.stopPropagation();
    var x = ev.clientX, y = ev.clientY;
    cap.hidden = true; var anchor = makeAnchor(x, y); cap.hidden = !pinMode;
    setPinMode(false); compose(anchor);
  }

  // ---- panel (all comments) ----
  function setPanel(on) { panelOpen = on; panel.hidden = !on; bar.classList.toggle("listing", on); if (on) renderPanel(); }
  function renderPanel() {
    var groups = {}, order = [];
    comments.forEach(function (c) { if (!groups[c.page]) { groups[c.page] = []; order.push(c.page); } groups[c.page].push(c); });
    var open = comments.filter(function (c) { return c.status === "open"; }).length;
    var html = '<div class="aa-rv-pnh"><b>Comments</b> <span>' + comments.length + ' total · ' + open + ' open</span><button type="button" class="aa-rv-x" data-close aria-label="Close">&times;</button></div>';
    if (!comments.length) html += '<p class="aa-rv-empty">No comments yet. Press <b>Add comment</b>, then tap anything on the page.</p>';
    order.forEach(function (pg) {
      html += '<div class="aa-rv-pg">' + esc(pg === "/" ? "Home" : pg.replace(/\//g, "")) + (pg === pagePath() ? ' <em>this page</em>' : "") + '</div>';
      groups[pg].forEach(function (c) {
        html += '<button type="button" class="aa-rv-item ' + c.status + (c.round === null ? " unsent" : "") + '" data-id="' + c.id + '"><span class="aa-rv-n">' + c.n + '</span><span class="aa-rv-it"><span class="aa-rv-itt">' + esc(c.text.slice(0, 110)) + (c.text.length > 110 ? "…" : "") + '</span><span class="aa-rv-itm">' + esc(c.by) + ' · ' + when(c.at) + (c.round === null ? " · not sent" : "") + (c.replies.length ? " · " + c.replies.length + " repl" + (c.replies.length === 1 ? "y" : "ies") : "") + (c.status === "resolved" ? " · resolved" : "") + '</span></span></button>';
      });
    });
    panel.innerHTML = html;
  }
  function panelClick(ev) {
    if (ev.target.closest("[data-close]")) return setPanel(false);
    var it = ev.target.closest("[data-id]"); if (!it) return;
    var c = byId(it.dataset.id); if (!c) return;
    if (onThisPage(c)) { setPanel(false); goTo(c); }
    else location.href = site.base + c.page + "#aa-pin=" + c.id;
  }
  function goTo(c) {
    var pos = resolvePos(c.anchor);
    if (pos) scrollTo({ top: Math.max(0, scrollY + pos.y - innerHeight / 2), behavior: "smooth" });
    setTimeout(function () { openPin(c.id); }, 450);
  }

  // ---- bar ----
  function renderBar() {
    var unsent = unsentMine().length, owner = me.role === "owner";
    bar.innerHTML =
      '<span class="aa-rv-who"><b>Review</b> · ' + esc(me.name) + '</span>' +
      '<button type="button" class="aa-rv-b gold" data-act="pin"><i>+</i><span>Add comment</span></button>' +
      '<button type="button" class="aa-rv-b" data-act="list"><span>Comments</span> <u>' + comments.length + '</u></button>' +
      (owner ? '<a class="aa-rv-b" href="' + API + '&format=text&code=' + code + '" target="_blank" rel="noopener">Export</a>'
             : '<button type="button" class="aa-rv-b send" data-act="send"' + (unsent ? "" : " disabled") + '><span>Send to Michael</span>' + (unsent ? ' <u>' + unsent + '</u>' : "") + '</button>') +
      '<button type="button" class="aa-rv-b min" data-act="hide" title="Hide review bar">&ndash;</button>';
  }
  function barClick(ev) {
    var b = ev.target.closest("[data-act]"); if (!b) return;
    var act = b.dataset.act;
    if (act === "pin") return setPinMode(!pinMode);
    if (act === "list") return setPanel(!panelOpen);
    if (act === "hide") { hidden = true; bar.hidden = true; show.hidden = false; return; }
    if (act === "send") {
      var n = unsentMine().length; if (!n) return;
      if (!confirm("Send " + n + " comment" + (n === 1 ? "" : "s") + " to Michael now?")) return;
      b.disabled = true;
      api({ action: "send" }).then(function (j) {
        return api().then(function (d) { comments = d.comments; rounds = d.rounds; renderAll(); toast(j.emailed ? "Sent. Michael has been emailed " + j.count + " comment" + (j.count === 1 ? "" : "s") + "." : "Sent (" + j.count + "). Michael will see them on his next visit.", 4000); });
      }).catch(fail(b));
    }
  }
  var show;

  function renderAll() { renderPins(); renderBar(); if (panelOpen) renderPanel(); }

  // ---- boot ----
  function boot(d) {
    me = d.me; site = d.site; comments = d.comments; rounds = d.rounds;
    root = el("div", "aa-rv aa-rv-root"); document.body.appendChild(root);
    layer = el("div", "aa-rv aa-rv-layer"); root.appendChild(layer);
    cap = el("div", "aa-rv aa-rv-cap"); cap.hidden = true; cap.addEventListener("click", capClick); root.appendChild(cap);
    panel = el("aside", "aa-rv aa-rv-panel"); panel.hidden = true; panel.addEventListener("click", panelClick); root.appendChild(panel);
    bar = el("div", "aa-rv aa-rv-bar"); bar.addEventListener("click", barClick); root.appendChild(bar);
    show = el("button", "aa-rv aa-rv-show"); show.type = "button"; show.textContent = "Review"; show.hidden = true;
    show.addEventListener("click", function () { hidden = false; bar.hidden = false; show.hidden = true; }); root.appendChild(show);
    renderAll();
    document.addEventListener("keydown", function (ev) { if (ev.key === "Escape") { if (pinMode) setPinMode(false); else if (pop) closePop(); else if (panelOpen) setPanel(false); } });
    raf = requestAnimationFrame(tick);
    var m = /aa-pin=([a-z0-9]+)/.exec(location.hash);
    if (m) { var c = byId(m[1]); if (c && onThisPage(c)) setTimeout(function () { goTo(c); }, 900); }
  }
  function start() {
    api().then(boot).catch(function (e) {
      if (String(e.message) === "no access" || String(e.message) === "401") { try { localStorage.removeItem(KEY); } catch (x) {} }
      console.log("review layer: " + e.message);
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
