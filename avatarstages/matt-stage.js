/* Matt's stage: the fourth stage on the private /avatarstages page, below Paul. Matt is the AI version of the owner of
 * Matt's Valley Plumbing, a FICTIONAL local plumbing company in the San Fernando Valley (Michael, 5-6 Oct: "a local
 * plumber... Obviously, a fictitious business, but just for demonstration").
 *
 * Built from paul-stage.js (same look, layout, demo panel and one-live-avatar rules) with Maya's services list.
 * Panel, top to bottom: "Schedule a visit with Matt", "Explore our plumbing services", "Leave my contact info".
 *
 * THE PANEL IS A DEMO, like Maya's and Paul's. It shows sample arrival windows and the same "Is this correct?" card,
 * and nothing is booked or sent anywhere. It asks for a neighborhood or city, never a street address.
 *
 * "Talk to Matt" is COMING SOON until his NV2 twin (417f2a8e, created 6 Oct) reaches v2 and his agent exists.
 * CFG.LIVE switches the live session on; set the agent id in functions/avatarstages/api/matt-token.js at the same time.
 *
 * One live avatar at a time, across all four stages: Matt ends Ava, Maya or Paul before he starts, and his capture-
 * phase guard ends him before any of theirs starts. Their scripts are unchanged - this file does all the
 * coordinating. His intro never plays over another voice.
 */
(function () {
  "use strict";
  var stage = document.getElementById("matt-stage");
  if (!stage) return;
  var RM = document.documentElement.classList.contains("rm");
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var track = function (n, p) { try { if (window.gtag) gtag("event", n, p || {}); } catch (e) {} };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var CFG = {
    LIVE: false,         // "Talk to Matt" stays "coming soon" until his NV2 twin reaches v2 and his agent exists
    TOKEN_ENDPOINT: "/avatarstages/api/matt-token",
    SDK_URL: "https://cdn.jsdelivr.net/npm/@touchcastllc/napster-companion-api@1.5.0/lib/index.standalone.js",
    CAP_S: 600,          // ten-minute session cap, as for Ava, Maya and Paul
    INTRO_END: 25.0,     // media/matt-intro.mp4 is 30.5 s: speech ends at 24.3 s, then he listens silently
  };

  var avStage = $(".stage-av", stage), vid = $(".ava-video", stage), capBox = $(".ava-caption", stage), hearBtn = $(".ava-sound", stage),
    talkBtn = $(".ava-talk", stage), toast = $(".ava-toast", stage), mount = $("#matt-mount");
  var panel = $("#matt-panel"), body = $(".panel-body", panel), titleEl = $(".panel-title", panel), backBtn = $(".panel-back", panel), flag = $(".panel-flag", panel);
  var instance = null, liveState = "idle";   // idle | connecting | live

  /* ═════════ Content ═════════ */
  var IC = {
    cal: '<svg viewBox="0 0 24 24"><rect x="4" y="5.5" width="16" height="14.5" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    chat: '<svg viewBox="0 0 24 24"><path d="M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 19 16.5h-7l-4.5 3.5v-3.5H5A1.5 1.5 0 0 1 3.5 15V7A1.5 1.5 0 0 1 5 5.5z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
    tool: '<svg viewBox="0 0 24 24"><path d="M14.7 5.3a4 4 0 0 0-5.2 5.2L4.5 15.5a1.8 1.8 0 0 0 2.5 2.5l5-5a4 4 0 0 0 5.2-5.2l-2.4 2.4-2.3-.6-.6-2.3z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
    arrow: '<svg><use href="#i-arrow"/></svg>',
  };
  /* "Explore our plumbing services": the services list in his knowledge base (kb\00-business-facts.md, "What do you
     work on?"), one card each. Every text comes from his knowledge base: no prices, no promises, no brand names, and
     the gas line repeats the safety step first. */
  var SERVICES = [
    { id: "leaks", name: "Leaks and leak detection", text: "From a dripping pipe to a hidden leak behind a wall, we track down where the water is going and fix it. Slab leaks under the foundation can usually be pinpointed without tearing up your floors." },
    { id: "drains", name: "Clogged drains", text: "Slow sinks, backed-up tubs and stubborn clogs. We clear the line, and if it keeps coming back, a camera inspection shows exactly what is going on." },
    { id: "sewer", name: "Sewer lines and trenchless repair", text: "Sewer camera inspections, root intrusion, and sewer line repair or replacement, including trenchless options like pipe lining and pipe bursting when the line qualifies." },
    { id: "waterheaters", name: "Water heaters", text: "Tank, tankless and heat pump water heaters: repair, replacement and maintenance, plus the earthquake strapping California requires." },
    { id: "fixtures", name: "Toilets, faucets and disposals", text: "Running or clogged toilets, dripping faucets, garbage disposals, showers and tubs: repairs and new fixtures." },
    { id: "pressure", name: "Water pressure", text: "Low or high water pressure, pressure regulators, and pipes that bang when a faucet shuts off." },
    { id: "repiping", name: "Repiping", text: "When old pipes keep leaking or the water runs brown, a repipe replaces them. We walk you through the pipe options and the process before anything starts." },
    { id: "gas", name: "Gas lines", text: "Gas line repairs, appliance hookups and earthquake gas shutoff valves. If you ever smell gas, leave the home first and call your gas company or nine one one from outside." },
    { id: "water", name: "Water softeners and filtration", text: "San Fernando Valley water is moderately hard to hard. Softeners, filters and reverse osmosis systems can help with spots, buildup and taste." },
    { id: "backflow", name: "Backflow testing", text: "Backflow devices installed, tested and repaired, including the yearly test many water systems require." },
    { id: "remodel", name: "Remodel plumbing", text: "The plumbing side of kitchen and bathroom remodels: moving fixtures, new lines, and the permits that come with them." },
    { id: "homesale", name: "Buying or selling a home", text: "Plumbing checks and sewer scopes for buyers and sellers, plus what a Los Angeles sale requires, like water heater strapping and an earthquake gas valve." },
    { id: "emergencies", name: "Emergencies, day or night", text: "Burst pipes, sewage backups and other plumbing emergencies, twenty-four seven. For a burst pipe, shut off your main water valve first. If you smell gas, get outside and call from there." },
  ];

  /* ═════════ State + rendering ═════════ */
  var S = { mode: "home", hist: [], slots: null, day: null, slot: null, viewAll: false, booked: null, svc: null, review: null,
    book: { name: "", email: "", phone: "", area: "", problem: "" }, lead: { name: "", email: "", phone: "", need: "", callback: false } };
  var TITLES = { home: "How can I help?", services: "Our plumbing services", service: "Service", days: "Schedule a visit", times: "Schedule a visit", details: "Schedule a visit",
    booked: "Demo booking", lead: "Leave your contact info", leadDone: "Demo" };
  var DEMO_DONE = "Demo only - no visit was scheduled and nothing was sent.";
  /* Tells the live Matt what the visitor just did on the panel, so he never re-asks for something they typed.
     "[Booking panel]" is the prefix his instructions react to; speak=true only when he should answer aloud. */
  var emit = function (text, speak) {
    if (!instance || !instance.sendCommand) return;
    try { instance.sendCommand({ type: "send_message", data: { text: "[Booking panel] " + text, role: "system", trigger_response: !!speak } }); } catch (e) {}
  };

  function go(mode, opts) {
    opts = opts || {};
    if (!opts.replace && S.mode !== mode) S.hist.push(S.mode);
    if (S.mode !== mode) S.review = null;
    S.mode = mode; render(opts);
  }
  function goBack() { S.mode = S.hist.pop() || "home"; S.review = null; render({}); }
  backBtn.addEventListener("click", goBack);

  /* Sample two-hour ARRIVAL WINDOWS for the demo, Pacific time, Monday to Saturday inside his hours (seven in the
     morning to six in the evening). Plain strings: nothing is booked. `time` is the window's start, which is what
     select_appointment_time matches on. */
  var STARTS = [7, 9, 11, 13, 15];
  var DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var clock = function (h) { return ((h + 11) % 12 + 1) + ":00 " + (h < 12 ? "AM" : "PM"); };
  // On screen the window is compact ("9–11 AM", "11 AM–1 PM") so it fits a chip; the tools get the full clock times.
  var shortWin = function (h) { var a = h < 12 ? "AM" : "PM", b = h + 2 < 12 ? "AM" : "PM", n = function (x) { return (x + 11) % 12 + 1; }; return a === b ? n(h) + "–" + n(h + 2) + " " + a : n(h) + " " + a + "–" + n(h + 2) + " " + b; };
  function demoSlots() {
    var p = {}; new Intl.DateTimeFormat("en-US", { timeZone: "America/Los_Angeles", year: "numeric", month: "numeric", day: "numeric" }).formatToParts(new Date()).forEach(function (x) { p[x.type] = +x.value; });
    var out = [];
    for (var n = 1, open = 0; n <= 14 && open < 7; n++) {
      var d = new Date(Date.UTC(p.year, p.month - 1, p.day + n)), dow = d.getUTCDay();
      if (dow === 0) continue;                       // Sunday is for emergencies only
      open++;
      var key = d.toISOString().slice(0, 10), shortDay = DAYS[dow].slice(0, 3) + ", " + MONTHS[d.getUTCMonth()].slice(0, 3) + " " + d.getUTCDate();
      STARTS.forEach(function (h, i) {
        if ((n * 5 + i * 3) % 4 === 0) return;       // some windows already taken, so the calendar looks real
        out.push({ id: key + "T" + h, date: key, time: clock(h), window: clock(h) + " - " + clock(h + 2), win: shortWin(h), day: shortDay, long: DAYS[dow] + ", " + MONTHS[d.getUTCMonth()] + " " + d.getUTCDate() });
      });
    }
    return out;
  }
  function days() {
    var map = {}, order = [];
    (S.slots || []).forEach(function (s) { if (!map[s.date]) { map[s.date] = []; order.push(s.date); } map[s.date].push(s); });
    return order.map(function (k) { return { key: k, slots: map[k], label: map[k][0].day }; });
  }
  function pickSlots(n) {
    var out = [];
    days().forEach(function (x) { if (out.length < n) out.push(x.slots[Math.min(1, x.slots.length - 1)]); });
    return out;
  }
  var label = function (s) { return s.long + ", arrival between " + s.window; };
  var info = function (s) { return { date: s.date, time: s.time, window: s.window, label: label(s) }; };
  var normTime = function (t) { return String(t || "").toLowerCase().replace(/\s+/g, "").replace(/^0(\d:)/, "$1"); };
  function findSlot(date, time) { return (S.slots || []).filter(function (s) { return s.date === date && normTime(s.time) === normTime(time); })[0]; }

  var steps = function (n) { return '<div class="p-steps" aria-hidden="true">' + [1, 2, 3].map(function (i) { return '<span class="' + (i <= n ? "on" : "") + '"></span>'; }).join("") + "</div>"; };
  var field = function (id, lbl, type, val, opt, attrs) {
    return '<div class="p-field"><label for="mt-' + id + '">' + lbl + (opt ? " <span>(optional)</span>" : "") + "</label>" +
      (type === "textarea" ? '<textarea id="mt-' + id + '" rows="3" ' + (attrs || "") + ">" + esc(val) + "</textarea>"
        : '<input id="mt-' + id + '" type="' + type + '" value="' + esc(val) + '" ' + (attrs || "") + ">") + "</div>";
  };
  function act(id, icon, title, sub) { return '<button class="p-act" type="button" data-act="' + id + '"><i>' + icon + "</i><span><b>" + title + "</b><small>" + sub + "</small></span>" + IC.arrow + "</button>"; }
  var tr = function (v) { return String(v || "").trim(); };
  var validEmail = function (e) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e); };

  /* "Is this correct?": nothing is "booked" or "sent" until the visitor confirms what is on screen. This is Ava's
     rule: a voice-only email is never trusted. Any change to the details cancels the confirmation. */
  var REVIEW_MODE = { book: "details", lead: "lead" };
  function sigOf(k) {
    if (k === "book") return [S.slot ? S.slot.id : "", tr(S.book.name), tr(S.book.email).toLowerCase(), tr(S.book.phone), tr(S.book.area), tr(S.book.problem)].join("|");
    return [tr(S.lead.name), tr(S.lead.email).toLowerCase(), tr(S.lead.phone), tr(S.lead.need), S.lead.callback ? "cb" : ""].join("|");
  }
  var inReview = function (k) { return !!(S.review && S.review.kind === k); };
  var reviewFresh = function (k) { return inReview(k) && S.review.sig === sigOf(k); };
  function reviewRows(k) {
    var r = k === "book" ? [["Arrival", S.slot ? S.slot.long + ", " + S.slot.win + " PT" : ""], ["Name", S.book.name], ["Email", S.book.email], ["Phone", S.book.phone], ["Area", S.book.area], ["The problem", S.book.problem]]
      : [["Name", S.lead.name], ["Email", S.lead.email], ["Phone", S.lead.phone], ["Callback", S.lead.callback ? "Yes, please call me" : ""], ["What's going on", S.lead.need]];
    return r.filter(function (x) { return tr(x[1]); });
  }
  function reviewCard(k) {
    return (k === "book" ? steps(3) : "") + '<div class="p-review"><p class="p-label">Is this correct?</p><dl class="p-rv">' +
      reviewRows(k).map(function (x) { return "<div><dt>" + x[0] + "</dt><dd>" + esc(tr(x[1])) + "</dd></div>"; }).join("") +
      '</dl><p class="p-sub">Please check your details. Nothing is ' + (k === "book" ? "booked" : "sent") + ' until you confirm.</p><div class="p-rv-acts"><button class="btn btn-gold btn-sm p-go" type="button" data-act="review-yes">' +
      (k === "book" ? "Yes, book my visit" : "Yes, send it") + " " + IC.arrow + '</button><button class="btn btn-ghost btn-sm" type="button" data-act="review-edit">Edit</button></div></div>';
  }
  function openReview(k, fromTwin) {
    if (S.mode !== REVIEW_MODE[k]) go(REVIEW_MODE[k]);
    S.review = { kind: k, sig: sigOf(k), at: Date.now(), ok: false }; render({});
    var b = $('[data-act="review-yes"]', body); if (b && !fromTwin) b.focus({ preventScroll: true });
    if (fromTwin) return;
    var list = reviewRows(k).map(function (x) { return x[0].toLowerCase() + " " + tr(x[1]); }).join(", ");
    emit(k === "book"
      ? "The visitor pressed Confirm. Nothing is booked yet: the panel shows their details for review (" + list + "). Read the arrival window, name and email back, spelling the email, and ask whether everything is correct. Fix anything they correct with fill_appointment_details. Book only after a clear yes, with confirm_appointment, or when they press Yes on the panel."
      : "The visitor is reviewing their contact details (" + list + "). Nothing is sent yet. Read the email back and ask whether it is correct. Send only after a clear yes, with submit_contact_details, or when they press Yes on the panel.", true);
  }

  var VIEWS = {
    home: function () {
      return '<p class="p-sub">' + (CFG.LIVE ? "Tap an option below — or press Talk to Matt to speak with me." : "Tap an option below. Matt's live conversation is coming soon.") + '</p><div class="p-actions">' +
        act("book", IC.cal, "Schedule a visit with Matt", "Pick a two-hour arrival window") +
        act("services", IC.tool, "Explore our plumbing services", "From leaks to sewer lines") +
        act("lead", IC.chat, "Leave my contact info", "We'll give you a call back") + "</div>";
    },
    services: function () {
      return '<div class="p-svcs">' + SERVICES.map(function (s) { return '<button class="p-svc" type="button" data-svc="' + s.id + '"><span>' + esc(s.name) + "</span>" + IC.arrow + "</button>"; }).join("") + "</div>";
    },
    service: function () {
      var s = SERVICES.filter(function (x) { return x.id === S.svc; })[0] || SERVICES[0];
      return '<div class="p-card"><div><h4>' + esc(s.name) + "</h4><p>" + esc(s.text) + "</p></div></div>" +
        '<div class="p-svc-actions"><button class="btn btn-gold btn-sm" type="button" data-act="book">Schedule a visit ' + IC.arrow + "</button></div>";
    },
    days: function () {
      var d = days();
      if (!S.viewAll) {
        return steps(1) + '<p class="p-label">Suggested arrival windows · PT</p><div class="p-picks">' + pickSlots(3).map(function (s) {
          return '<button class="p-chip p-pick' + (S.slot && S.slot.id === s.id ? " on" : "") + '" type="button" data-slot="' + s.id + '">' + esc(s.day) + "<small>" + esc(s.win) + "</small></button>";
        }).join("") + '</div><button class="link p-week" type="button" data-act="week">See the whole week ' + IC.arrow + '</button><p class="p-sub">Matt or one of the plumbers calls when they are on the way.</p>';
      }
      return steps(1) + '<p class="p-label">Pick a day · PT</p><div class="p-days">' + d.map(function (x) {
        return '<button class="p-chip' + (S.day === x.key ? " on" : "") + '" type="button" data-day="' + x.key + '">' + esc(x.label) + "<small>" + x.slots.length + (x.slots.length === 1 ? " window" : " windows") + "</small></button>";
      }).join("") + '</div><p class="p-sub">Sample arrival windows, Monday to Saturday. Emergencies: day or night.</p>';
    },
    times: function () {
      var d = days().filter(function (x) { return x.key === S.day; })[0];
      if (!d) return VIEWS.days();
      return steps(2) + '<p class="p-label">' + esc(d.slots[0].long) + ' · PT</p><div class="p-times">' + d.slots.map(function (s) {
        return '<button class="p-chip' + (S.slot && S.slot.id === s.id ? " on" : "") + '" type="button" data-slot="' + s.id + '">' + esc(s.win) + "</button>";
      }).join("") + "</div>";
    },
    details: function () {
      if (inReview("book")) return reviewCard("book");
      return steps(3) + '<div class="p-summary">' + IC.cal.replace("<svg", '<svg width="18" height="18"') + "<span><b>" + esc(S.slot.long) + "</b>, arrival <b>" + esc(S.slot.win) + '</b> PT</span></div><form class="p-form" novalidate>' +
        field("name", "Your name", "text", S.book.name, false, 'autocomplete="name" required data-bind="book.name"') +
        field("email", "Email", "email", S.book.email, false, 'autocomplete="email" required data-bind="book.email"') +
        field("phone", "Phone", "tel", S.book.phone, true, 'autocomplete="tel" data-bind="book.phone"') +
        field("area", "Neighborhood or city", "text", S.book.area, true, 'autocomplete="address-level2" data-bind="book.area"') +
        field("problem", "What's going on?", "textarea", S.book.problem, true, 'data-bind="book.problem"') +
        '<button class="btn btn-gold btn-sm p-go" type="submit">Confirm my visit ' + IC.arrow + '</button><p class="p-msg" role="status"></p></form>';
    },
    booked: function () {
      return '<div class="p-done"><span class="tick">✓</span><h4>That\'s how scheduling works.</h4><p>' + esc((S.booked ? S.booked.show + ". " : "") + DEMO_DONE) + '</p><button class="btn btn-ghost btn-sm" type="button" data-act="home">Back to Matt</button></div>';
    },
    lead: function () {
      if (inReview("lead")) return reviewCard("lead");
      return '<p class="p-sub">Tell us a little about what is going on, and we\'ll give you a call back.</p><form class="p-form" novalidate>' +
        field("lname", "Your name", "text", S.lead.name, false, 'autocomplete="name" required data-bind="lead.name"') +
        field("lemail", "Email", "email", S.lead.email, false, 'autocomplete="email" required data-bind="lead.email"') +
        field("lphone", "Phone", "tel", S.lead.phone, true, 'autocomplete="tel" data-bind="lead.phone"') +
        '<label class="p-check"><input type="checkbox" id="mt-lcallback" data-bind="lead.callback"' + (S.lead.callback ? " checked" : "") + '><span>Request a callback</span></label>' +
        field("lneed", "What's going on?", "textarea", S.lead.need, true, 'data-bind="lead.need"') +
        '<button class="btn btn-gold btn-sm p-go" type="submit">Send to Matt ' + IC.arrow + '</button><p class="p-msg" role="status"></p></form>';
    },
    leadDone: function () { return '<div class="p-done"><span class="tick">✓</span><h4>Got it.</h4><p>Demo only - nothing was sent.</p><button class="btn btn-ghost btn-sm" type="button" data-act="home">Back to Matt</button></div>'; },
  };
  function render(opts) {
    opts = opts || {};
    titleEl.textContent = S.mode === "service" ? ((SERVICES.filter(function (x) { return x.id === S.svc; })[0] || {}).name || "Service") : (TITLES[S.mode] || "Matt");
    panel.classList.toggle("is-home", S.mode === "home");
    backBtn.hidden = S.mode === "home";
    flag.hidden = S.mode === "home" || S.mode === "services" || S.mode === "service";   // "Demo" on the booking and contact views
    body.innerHTML = (VIEWS[S.mode] || VIEWS.home)();
    body.scrollTop = 0;                              // the panel scrolls on desktop (the stage keeps its size): start each view at the top
    body.style.animation = "none"; void body.offsetWidth; body.style.animation = "";
    var form = $("form", body);
    if (form) form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (S.mode === "details") TOOLS_IMPL.confirm_appointment({}); else TOOLS_IMPL.submit_contact_details({});
    });
    if (opts.focus) { var f = $("input, button", body); if (f) f.focus({ preventScroll: true }); }
  }
  function setMsg(text) { var m = $(".p-msg", body); if (m) { m.classList.add("err"); m.textContent = text; } }
  function flash(el) { el.classList.add("flash"); setTimeout(function () { el.classList.remove("flash"); }, 1100); reveal(el); }
  // Scroll the panel (never the page) so a field Matt just filled is in view.
  function reveal(el) {
    if (!el || body.scrollHeight <= body.clientHeight + 1) return;
    var b = body.getBoundingClientRect(), r = el.getBoundingClientRect();
    if (r.top < b.top) body.scrollTop -= (b.top - r.top) + 8;
    else if (r.bottom > b.bottom) body.scrollTop += (r.bottom - b.bottom) + 8;
  }

  /* ═════════ The other three stages: never two voices at once ═════════ */
  var OTHERS = [{ name: "Ava", stage: "ava-stage", mount: "ava-mount", panel: "ava-panel" }, { name: "Maya", stage: "maya-stage", mount: "maya-mount", panel: "maya-panel" },
    { name: "Paul", stage: "paul-stage", mount: "paul-mount", panel: "paul-panel" }];
  var ownClick = false;                              // our own clicks on the other stages' buttons skip the guard below
  function clickOther(b) { ownClick = true; try { b.click(); } finally { ownClick = false; } }
  function otherState(o) {
    var st = document.getElementById(o.stage);
    if (!st || !st.classList.contains("is-live")) return "idle";
    var b = $(".ava-talk", st);
    return b && b.classList.contains("is-on") ? "live" : "connecting";
  }
  function liveOther() { return OTHERS.filter(function (o) { return otherState(o) !== "idle"; })[0] || null; }
  function othersQuiet() {                           // their intro sound off, their panel films paused
    OTHERS.forEach(function (o) {
      var b = $("#" + o.stage + " .ava-sound"); if (b && b.getAttribute("aria-pressed") === "true") clickOther(b);
      $$("#" + o.panel + " video").forEach(function (v) { if (!v.paused) v.pause(); });
    });
  }
  function endOther(o) {
    var b = $("#" + o.stage + " .ava-talk"); if (b && !b.disabled) clickOther(b);   // their own "End conversation"
    var m = document.getElementById(o.mount); if (m) m.innerHTML = "";             // free the SDK's container id now
  }
  // Clicks on the other stages while Matt is busy. Capture phase, so this runs before their own scripts see the click.
  document.addEventListener("click", function (e) {
    var t = e.target && e.target.closest ? e.target.closest(OTHERS.map(function (o) { return "#" + o.stage + " .ava-talk, #" + o.stage + " .ava-sound, #" + o.panel + " .sv-play"; }).join(", ")) : null;
    if (!t || ownClick) return;
    if (hearing) stopHearing();                      // another voice is about to start: Matt's intro goes quiet
    if (!t.classList.contains("ava-talk") || t.classList.contains("is-soon") || liveState === "idle") return;   // "coming soon" starts nobody
    if (liveState === "connecting") { e.stopPropagation(); e.preventDefault(); say_("Matt is still connecting — end his conversation first.", 5000); return; }
    endLive("", true);                               // Matt live: end him, then their own handler starts them
  }, true);

  /* ═════════ Visitor clicks and typing (each one is reported to the live Matt) ═════════ */
  body.addEventListener("click", function (e) {
    var t = e.target.closest("[data-act], [data-svc], [data-day], [data-slot]"); if (!t) return;
    var a = t.getAttribute("data-act");
    if (a === "book") { TOOLS_IMPL.show_appointment_times({ view: "suggested" }); emit("The visitor opened the scheduling panel.", false); track("matt_panel", { action: "book_open" }); }
    else if (a === "services") { go("services"); emit("The visitor opened the list of plumbing services.", false); track("matt_panel", { action: "services_open" }); }
    else if (a === "week") { S.viewAll = true; render({}); emit("The visitor is looking at the whole week.", false); }
    else if (a === "lead") { go("lead", { focus: true }); emit("The visitor opened the leave-your-contact-info form.", false); track("matt_panel", { action: "lead_open" }); }
    else if (a === "home") { S.hist = []; go("home", { replace: true }); }
    else if (a === "review-yes") { if (!S.review) return; S.review.ok = true; (S.review.kind === "book" ? TOOLS_IMPL.confirm_appointment : TOOLS_IMPL.submit_contact_details)({}); }
    else if (a === "review-edit") { S.review = null; render({ focus: true }); emit("The visitor chose to edit their details. Nothing has been booked or sent.", false); }
    else if (t.hasAttribute("data-svc")) { TOOLS_IMPL.show_plumbing_service({ service: t.getAttribute("data-svc") }); emit("The visitor is looking at " + ((SERVICES.filter(function (s) { return s.id === S.svc; })[0] || {}).name || S.svc) + ".", false); }
    else if (t.hasAttribute("data-day")) { S.day = t.getAttribute("data-day"); S.slot = null; go("times"); emit("The visitor picked " + days().filter(function (x) { return x.key === S.day; })[0].slots[0].long + " and is choosing an arrival window.", false); }
    else if (t.hasAttribute("data-slot")) { var sl = (S.slots || []).filter(function (x) { return x.id === t.getAttribute("data-slot"); })[0]; if (sl) { selectSlot(sl, false); emit("The visitor selected " + label(sl) + ".", false); } }
  });
  var BIND_LABEL = { "book.name": "name", "book.email": "email", "book.phone": "phone number", "book.area": "neighborhood or city", "book.problem": "description of the problem",
    "lead.name": "name", "lead.email": "email", "lead.phone": "phone number", "lead.need": "note" };
  body.addEventListener("input", function (e) {
    var b = e.target.getAttribute && e.target.getAttribute("data-bind"); if (!b) return;
    var p = b.split("."); S[p[0]][p[1]] = e.target.type === "checkbox" ? e.target.checked : e.target.value;
  });
  body.addEventListener("change", function (e) {
    var b = e.target.getAttribute && e.target.getAttribute("data-bind"); if (!b || !BIND_LABEL[b] || !String(e.target.value).trim()) return;
    emit("The visitor typed their " + BIND_LABEL[b] + ": " + String(e.target.value).trim() + ".", false);
  });

  /* ═════════ Matt's DEMO tools: the one way anything changes the panel ═════════
     The same shapes and two-step confirmation as Maya's and Paul's, with plumbing wording. No tool calls a server:
     "booked" and "sent" only change what the panel shows. */
  function selectSlot(s, fromTwin) { S.slot = s; S.day = s.date; go("details", { focus: !fromTwin }); }
  function stillNeeded(k) {
    var n = [], o = k === "book" ? S.book : S.lead;
    if (k === "book" && !S.slot) n.push("arrival window");
    if (!tr(o.name)) n.push("name");
    if (!validEmail(tr(o.email))) n.push("email");
    if (k === "lead" && o.callback && String(o.phone).replace(/\D/g, "").length < 7) n.push("phone");
    return n;
  }
  function bookState() { return { arrival: S.slot ? label(S.slot) : null, name: S.book.name, email: S.book.email, phone: S.book.phone, area: S.book.area, problem: S.book.problem }; }
  function leadState() { return { name: S.lead.name, email: S.lead.email, phone: S.lead.phone, need: S.lead.need, callback: !!S.lead.callback }; }
  function needConfirm(k) {
    return { ok: false, needs_confirmation: true, details: k === "book" ? bookState() : leadState(),
      message: "Nothing is " + (k === "book" ? "booked" : "sent") + " yet. The panel now shows these details to the visitor for review. Read them back (spell the email) and ask: 'Is all of that correct?' Fix anything they correct, then call " + (k === "book" ? "confirm_appointment" : "submit_contact_details") + " again only after they clearly say yes." };
  }
  // What is already on the panel when a session starts, so he never re-asks for what the visitor already did.
  function panelSummary() {
    var bits = ["The demo panel is visible beside you"];
    if (S.booked) bits.push("a demo visit is already confirmed for " + S.booked.when);
    else {
      if (S.slot) bits.push("the visitor has selected " + label(S.slot));
      var have = [S.book.name && "name " + S.book.name, S.book.email && "email " + S.book.email, S.book.phone && "phone " + S.book.phone, S.book.area && "area " + S.book.area].filter(Boolean);
      if (have.length) bits.push("they have typed their " + have.join(", "));
    }
    if (S.mode === "service" && S.svc) bits.push("they are looking at " + ((SERVICES.filter(function (s) { return s.id === S.svc; })[0] || {}).name || S.svc));
    return bits.join("; ") + ".";
  }

  var TOOLS_IMPL = {
    show_appointment_times: function (a) {
      a = a || {}; S.slots = S.slots || demoSlots(); S.slot = null; S.day = null; S.viewAll = a.view === "all"; S.booked = null;
      if (a.date) { var hit = days().filter(function (x) { return x.key === a.date; })[0]; if (hit) { S.day = hit.key; S.viewAll = true; } }
      go("days"); if (S.day) go("times");
      return { ok: true, demo: true, timezone: "Pacific time", note: "Two-hour arrival windows, Monday to Saturday. Pass the date and the window's start time to select_appointment_time.",
        suggested: pickSlots(3).map(info), days: days().map(function (x) { return { date: x.key, label: x.slots[0].long, open: x.slots.length }; }) };
    },
    select_appointment_time: function (a) {
      a = a || {};
      if (!S.slots) return { ok: false, error: "Call show_appointment_times first." };
      var s = findSlot(a.date, a.time);
      if (!s) return { ok: false, error: "That arrival window is not available", alternatives: pickSlots(3).map(info) };
      selectSlot(s, TOOLS_IMPL.__fromTwin); return { ok: true, selected: info(s) };
    },
    fill_appointment_details: function (a) {
      a = a || {}; var changed = [];
      ["name", "email", "phone", "area", "problem"].forEach(function (k) { if (a[k] != null && String(a[k]).trim() !== "") { S.book[k] = String(a[k]).trim(); changed.push(k); } });
      if (S.slot && S.mode !== "details") go("details");
      else changed.forEach(function (k) { var el = $("#mt-" + k, body); if (el) el.value = S.book[k]; });
      changed.forEach(function (k) { var el = $("#mt-" + k, body); if (el) flash(el); });   // the visitor sees Matt writing
      if (changed.length && inReview("book") && !reviewFresh("book")) { openReview("book", true); return { ok: true, form: bookState(), still_needed: stillNeeded("book"), note: "The details changed, so the visitor must confirm again. Read them back and ask whether everything is correct before calling confirm_appointment." }; }
      return { ok: true, form: bookState(), still_needed: stillNeeded("book") };
    },
    confirm_appointment: function () {
      if (S.booked) return { ok: true, demo: true, already_booked: true, when: S.booked.when };
      var missing = stillNeeded("book");
      if (missing.length) { if (S.review) { S.review = null; render({}); } setMsg("Still needed: " + missing.join(", ") + "."); return { ok: false, missing: missing, error: "Still needed before booking: " + missing.join(", ") }; }
      var fromTwin = TOOLS_IMPL.__fromTwin;
      if (!reviewFresh("book")) { openReview("book", fromTwin); return needConfirm("book"); }
      if (fromTwin && Date.now() - S.review.at < 4000) return { ok: false, needs_confirmation: true, message: "Nothing is booked. The visitor has not answered yet. Wait for a clear yes before calling confirm_appointment again." };
      if (!fromTwin && !S.review.ok) return needConfirm("book");
      S.booked = { when: label(S.slot) + " (Pacific time)", show: S.slot.long + ", arrival " + S.slot.win + " PT" }; S.review = null; go("booked"); track("matt_demo_booking", {});
      if (!fromTwin) emit("The visitor confirmed the demo visit for " + S.booked.when + ". Nothing was sent: this page is a demonstration. Tell them, briefly, that this is how scheduling works.", true);
      return { ok: true, demo: true, booked: true, when: S.booked.when,
        message: "DEMO: the panel shows the visit as confirmed, but nothing was sent. Tell the visitor, briefly, that this is how scheduling works on this demonstration page, and that Matt or one of the plumbers calls when they are on the way." };
    },
    show_contact_form: function () { go("lead"); return { ok: true, demo: true, note: "The contact form is open on the panel. Ask for their details one at a time, fill them in with fill_contact_details, or let them type." }; },
    fill_contact_details: function (a) {
      a = a || {}; var changed = [];
      ["name", "email", "phone", "need"].forEach(function (k) { if (a[k] != null && String(a[k]).trim() !== "") { S.lead[k] = String(a[k]).trim(); changed.push(k); } });
      if (a.callback != null) { S.lead.callback = a.callback === true || a.callback === "true"; changed.push("callback"); }
      var ID = { name: "lname", email: "lemail", phone: "lphone", need: "lneed", callback: "lcallback" };
      if (S.mode !== "lead") go("lead");
      else changed.forEach(function (k) { var el = $("#mt-" + ID[k], body); if (el) { if (k === "callback") el.checked = !!S.lead.callback; else el.value = S.lead[k]; } });
      changed.forEach(function (k) { var el = $("#mt-" + ID[k], body); if (el && k !== "callback") flash(el); });
      if (changed.length && inReview("lead") && !reviewFresh("lead")) { openReview("lead", true); return { ok: true, form: leadState(), still_needed: stillNeeded("lead"), note: "The details changed, so the visitor must confirm again before submit_contact_details." }; }
      return { ok: true, form: leadState(), still_needed: stillNeeded("lead") };
    },
    submit_contact_details: function () {
      var missing = stillNeeded("lead");
      if (missing.length) { if (S.review) { S.review = null; render({}); } setMsg("Still needed: " + missing.join(", ") + "."); return { ok: false, missing: missing, error: "Still needed: " + missing.join(", ") }; }
      var fromTwin = TOOLS_IMPL.__fromTwin;
      if (!reviewFresh("lead")) { openReview("lead", fromTwin); return needConfirm("lead"); }
      if (fromTwin && Date.now() - S.review.at < 4000) return { ok: false, needs_confirmation: true, message: "Nothing is sent. The visitor has not answered yet. Wait for a clear yes." };
      if (!fromTwin && !S.review.ok) return needConfirm("lead");
      S.review = null; go("leadDone"); track("matt_demo_contact", {});
      if (!fromTwin) emit("The visitor confirmed their contact details. Nothing was sent: this page is a demonstration. Tell them, briefly, that this is how it works.", true);
      return { ok: true, demo: true, sent: false, message: "DEMO: the panel shows the details as sent, but nothing went anywhere. Tell the visitor, briefly, that this is how it works on this demonstration page." };
    },
    show_plumbing_service: function (a) {
      var id = a && a.service, s = SERVICES.filter(function (x) { return x.id === id; })[0];
      if (!s) { go("services"); return { ok: false, error: "Unknown service", services: SERVICES.map(function (x) { return { id: x.id, name: x.name }; }) }; }
      S.svc = id; if (S.mode === "service") render({}); else go("service"); track("matt_service", { service: id });
      return { ok: true, service: s.name, summary: s.text, note: "The service is on the panel. Say one or two sentences about it." };
    },
  };

  var str = function (d) { return { type: "string", description: d }; };
  var TOOLS = [
    { name: "show_appointment_times", description: "DEMO scheduling panel. Show open two-hour arrival windows on the panel beside you, which the visitor can see. Call it as soon as the visitor wants someone to come out. view \"suggested\" shows three picks; \"all\" shows the whole week. Offer two or three windows in natural speech, never the whole list, each said in words. Times are Pacific time.",
      inputSchema: { type: "object", properties: { view: { type: "string", enum: ["suggested", "all"] }, date: str("Optional day to open, YYYY-MM-DD") } } },
    { name: "select_appointment_time", description: "Select the arrival window the visitor chose. Use the date (YYYY-MM-DD) and the window's start time (e.g. \"9:00 AM\") exactly as show_appointment_times returned them. If it is not available, offer the returned alternatives.",
      inputSchema: { type: "object", properties: { date: str("YYYY-MM-DD, exactly as returned"), time: str("The window's start, e.g. 9:00 AM, exactly as returned") }, required: ["date", "time"] } },
    { name: "fill_appointment_details", description: "Fill in the scheduling form on the panel each time you learn a detail: the visitor's name, email, phone number, neighborhood or city (never a street address), or a few words on the problem (for example a leaking water heater or a slow drain). Only include the fields you just learned. Read each detail back; spell the email back.",
      inputSchema: { type: "object", properties: { name: str("Full name"), email: str("Email address"), phone: str("Phone number"), area: str("Neighborhood or city only"), problem: str("A few words on the problem") } } },
    { name: "confirm_appointment", description: "Confirm the DEMO visit. The first call never confirms: it shows the visitor their details for review and returns needs_confirmation. Read back the arrival window, name and email (spell the email), ask whether everything is correct, fix anything with fill_appointment_details, and call confirm_appointment again only after a clear yes. Nothing is ever sent - this page is a demonstration.",
      inputSchema: { type: "object", properties: {} }, annotations: { destructiveHint: true } },
    { name: "show_contact_form", description: "Open the leave-your-contact-info form on the panel, for a visitor who would rather have the office call them back.",
      inputSchema: { type: "object", properties: {} } },
    { name: "fill_contact_details", description: "Fill in the contact form on the panel each time you learn a detail: name, email, phone number, a short note about the problem, and callback (true if they want a phone call). Only include the fields you just learned. Read each detail back; spell the email back.",
      inputSchema: { type: "object", properties: { name: str("Full name"), email: str("Email address"), phone: str("Phone number"), need: str("A short note about the problem"), callback: { type: "boolean", description: "true if they would like a phone call" } } } },
    { name: "submit_contact_details", description: "Send the DEMO contact form. The first call never sends: it shows the visitor their details for review. Read them back (spell the email), ask whether they are correct, and call again only after a clear yes. Nothing is ever sent - this page is a demonstration.",
      inputSchema: { type: "object", properties: {} }, annotations: { destructiveHint: true } },
    { name: "show_plumbing_service", description: "Show one of Matt's Valley Plumbing's services on the panel beside you, so the visitor sees what you are describing. Call it when you start talking about one of these. Ids: leaks, drains, sewer (sewer lines and trenchless repair), waterheaters, fixtures (toilets, faucets, disposals, showers and tubs), pressure, repiping, gas, water (softeners and filtration), backflow, remodel, homesale (buying or selling a home), emergencies.",
      inputSchema: { type: "object", properties: { service: { type: "string", enum: SERVICES.map(function (s) { return s.id; }) } }, required: ["service"] } },
  ];
  function execTool(name, args) {
    var fn = TOOLS.some(function (t) { return t.name === name; }) && TOOLS_IMPL[name];   // Matt can only reach his own tools
    if (!fn) return Promise.resolve({ ok: false, error: "Unknown tool " + name });
    TOOLS_IMPL.__fromTwin = true; track("matt_tool", { tool: name });
    var done = function (m) { TOOLS_IMPL.__fromTwin = false; return m; };
    try { return Promise.resolve(fn(args || {})).then(done, function (e) { return done({ ok: false, error: String(e && e.message || e) }); }); }
    catch (e) { return Promise.resolve(done({ ok: false, error: String(e && e.message || e) })); }
  }
  // Must run right BEFORE Matt's sdk.init(): replaces whatever tools are on the page (Ava's, Maya's or Paul's) with his own.
  function installMattTools() {
    var mc = document.modelContext;
    if (!mc) { mc = new EventTarget(); try { Object.defineProperty(document, "modelContext", { value: mc, configurable: true }); } catch (e) { document.modelContext = mc; } }
    mc.getTools = function () { return Promise.resolve(TOOLS.map(function (t) { return { name: t.name, description: t.description, inputSchema: t.inputSchema, annotations: t.annotations }; })); };
    mc.executeTool = function (tool, jsonArgs) {
      var args = {}; try { args = typeof jsonArgs === "string" ? JSON.parse(jsonArgs || "{}") : (jsonArgs || {}); } catch (e) {}
      return execTool(tool && tool.name ? tool.name : tool, args);
    };
  }

  /* ═════════ His intro: muted loop; the sound icon replays it from the start with captions ═════════ */
  // Timed to the intro's speech (ffmpeg silencedetect, 6 Oct; the file starts with a 0.33 s still lead-in).
  var LINES = [[0.35, 3.2, "Hey, I'm Matt, from Matt's Valley Plumbing,"], [3.2, 6.1, "and yes, I'm the AI version."],
    [6.5, 10.9, "We handle leaks, clogs, water heaters, sewer lines,"], [10.9, 14.6, "repipes and gas lines across the San Fernando Valley,"],
    [14.6, 17.4, "with upfront pricing and no surprises."], [17.5, 20.8, "And when a pipe bursts at two in the morning, we pick up."],
    [21.2, 24.3, "Tap the 'Talk to Matt' button and ask me anything."]];
  var hasIntro = !!vid.getAttribute("data-src");
  var hearing = false, lastT = 0, visible = false, capKey = "";
  function caption(lines) { var k = JSON.stringify(lines || []); if (k === capKey) return; capKey = k; capBox.innerHTML = (lines || []).map(function (l) { return '<span class="cap">' + esc(l) + "</span>"; }).join(""); }
  function ensureSrc() { if (hasIntro && !vid.getAttribute("src")) vid.src = vid.getAttribute("data-src"); }
  function playQuiet() { if (!hasIntro || RM || hearing || liveState !== "idle") return; ensureSrc(); vid.muted = true; var p = vid.play(); if (p && p.catch) p.catch(function () {}); }
  function soundIcon(on) { hearBtn.setAttribute("aria-pressed", on ? "true" : "false"); $("use", hearBtn).setAttribute("href", on ? "#i-vol" : "#i-sound-off"); var l = on ? "Mute Matt's introduction" : "Play Matt's introduction with sound"; hearBtn.setAttribute("aria-label", l); hearBtn.title = l; }
  function stopHearing() { hearing = false; vid.muted = true; soundIcon(false); caption([]); if (RM) vid.pause(); }
  if (!hasIntro) hearBtn.style.display = "none";
  hearBtn.addEventListener("click", function () {
    if (!hasIntro || liveState !== "idle") return;
    if (hearing) { stopHearing(); return; }
    othersQuiet();                                   // never two voices at once
    ensureSrc(); hearing = true; vid.currentTime = 0; vid.muted = false; lastT = 0;
    var p = vid.play(); if (p && p.catch) p.catch(function () { stopHearing(); });
    soundIcon(true); track("matt_hear", {});
  });
  vid.addEventListener("timeupdate", function () {
    var t = vid.currentTime;
    if (hearing) {
      if (t + 0.3 < lastT || t > CFG.INTRO_END) { stopHearing(); pulseActions(); }
      else { var on = LINES.filter(function (l) { return t >= l[0] && t < l[1]; })[0]; caption(on ? [on[2]] : []); }
    }
    lastT = t;
  });
  function pulseActions() { if (S.mode !== "home") return; $$(".p-act", body).forEach(function (b, i) { setTimeout(function () { flash(b); }, i * 160); }); }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (liveState !== "idle") return; if (visible) playQuiet(); else { vid.pause(); if (hearing) stopHearing(); } }, { threshold: 0.25 }).observe(stage);
  }

  /* ═════════ "Talk to Matt": the live conversation (off until CFG.LIVE) ═════════ */
  var sdkLoading = null, capTimer = null, readyTimer = null, revealed = false;
  var htmlBg = getComputedStyle(document.documentElement).backgroundColor, bodyBg = getComputedStyle(document.body).backgroundColor;
  // The SDK injects `body,html{background:transparent}` the moment its script loads: re-assert the page colors.
  function pinBg() { document.documentElement.style.setProperty("background-color", htmlBg, "important"); document.body.style.setProperty("background-color", bodyBg, "important"); }
  function say_(text, ms) { toast.textContent = text; toast.hidden = !text; if (text && ms) setTimeout(function () { if (toast.textContent === text) toast.hidden = true; }, ms); }
  function setTalk(lbl, on) { $("span", talkBtn).textContent = lbl; talkBtn.disabled = liveState === "connecting"; talkBtn.classList.toggle("is-on", !!on); }
  function rememberSeen() { try { document.cookie = "aa_matt_seen=1; Path=/avatarstages; Max-Age=31536000; Secure; SameSite=Lax"; } catch (e) {} }
  function loadSdk() {
    if (window.napsterCompanionApiSDK || window.NapsterCompanionApiSdk) return Promise.resolve();
    if (sdkLoading) return sdkLoading;
    sdkLoading = new Promise(function (res, rej) { var s = document.createElement("script"); s.src = CFG.SDK_URL; s.onload = res; s.onerror = function () { sdkLoading = null; rej(new Error("sdk load")); }; document.body.appendChild(s); });
    return sdkLoading;
  }
  function waitForVideo(tries, cb) { var v = $("video", mount); if (v || tries <= 0) return cb(v); setTimeout(function () { waitForVideo(tries - 1, cb); }, 120); }
  function onFirstFrame(v, cb) {
    var fired = false, go_ = function () { if (!fired) { fired = true; cb(); } };
    setTimeout(go_, 6000); if (!v) return go_();
    if ("requestVideoFrameCallback" in v) { try { v.requestVideoFrameCallback(go_); return; } catch (e) {} }
    if (v.readyState >= 3) return go_(); v.addEventListener("playing", go_, { once: true }); v.addEventListener("loadeddata", go_, { once: true });
  }
  function whenSharp(v, cb) {
    var t0 = Date.now(), fired = false, fin = function () { if (!fired) { fired = true; cb(); } };
    var want = Math.min(960, Math.round((mount.clientWidth || 640) * Math.min(window.devicePixelRatio || 1, 2) * 0.75));
    (function check() { if (fired) return; if (!v || (v.videoWidth || 0) >= want || Date.now() - t0 > 2000) return fin(); setTimeout(check, 120); })();
  }
  function armReveal() { if (!revealed && instance) waitForVideo(45, function (v) { onFirstFrame(v, function () { whenSharp(v, revealLive); }); }); }
  function revealLive() {
    if (revealed || !instance) return; revealed = true; liveState = "live";
    if (readyTimer) { clearTimeout(readyTimer); readyTimer = null; }
    avStage.classList.add("live-ready"); say_("", 0); setTalk("End conversation", true); pinBg();
    rememberSeen();
    setTimeout(function () { if (liveState === "live") vid.pause(); }, 900);
    track("matt_live_session", {});
  }
  function fadeOutVoice(ms) {
    ms = ms || 450; var v0 = vid.volume, t0 = Date.now(), done = false, iv = null;
    var finish = function () { if (done) return; done = true; if (iv) clearInterval(iv); stopHearing(); try { vid.volume = v0; } catch (e) {} };
    iv = setInterval(function () { var k = Math.min(1, (Date.now() - t0) / ms); try { vid.volume = Math.max(0, v0 * (1 - k)); } catch (e) {} if (k >= 1) finish(); }, 30);
    setTimeout(finish, ms + 120);
  }
  function endedState(msg, now) {
    instance = null; revealed = false; liveState = "idle";
    [capTimer, readyTimer].forEach(function (t) { if (t) clearTimeout(t); }); capTimer = readyTimer = null;
    if (visible) playQuiet();
    avStage.classList.remove("live", "live-ready"); setTalk("Talk to Matt", false);
    if (now) mount.innerHTML = "";
    else setTimeout(function () { if (liveState === "idle") mount.innerHTML = ""; }, 850);   // after the .8 s fade
    stage.classList.remove("is-live"); say_(msg || "", msg ? 9000 : 0); pinBg();
  }
  function endLive(msg, now) {
    var inst = instance; instance = null;
    if (inst) { try { inst.destroy && inst.destroy(); } catch (e) {} }
    endedState(msg, now);
  }
  function liveError(e) {
    var st = e && e.status;
    endLive(st === 503 || st === 404 ? "Matt's live conversation is arriving very soon. In the meantime, try the panel beside him." :
      st === 401 ? "This private page needs your portfolio link — open it again from your email." :
      st === 429 || st >= 500 ? "Matt is talking with other visitors right now — try again in a few minutes." :
      "I couldn't start the live conversation just now. The panel beside me still works.", true);
  }
  async function startLive() {
    if (liveState !== "idle") return;
    var o = liveOther();
    if (o && otherState(o) === "connecting") { say_(o.name + " is still connecting — end that conversation first.", 5000); return; }
    liveState = "connecting"; if (hearing) fadeOutVoice(); else caption([]);
    othersQuiet();
    if (o) endOther(o);
    setTalk("Connecting…", false); say_("Connecting to Matt…", 0); avStage.classList.add("live"); stage.classList.add("is-live");
    if (hasIntro && !RM && vid.paused) { ensureSrc(); vid.muted = true; var pq = vid.play(); if (pq && pq.catch) pq.catch(function () {}); }
    readyTimer = setTimeout(function () { if (liveState === "connecting") say_("Almost there… allow the microphone if your browser asks.", 0); }, 5000);
    try {
      installMattTools();                            // before init: the SDK reads the page's tools when it attaches
      await loadSdk(); pinBg();
      var res = await fetch(CFG.TOKEN_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
      if (!res.ok) { var err = new Error("token " + res.status); err.status = res.status; throw err; }
      var data = await res.json(); var sdk = window.napsterCompanionApiSDK || window.NapsterCompanionApiSdk;
      if (!sdk) throw new Error("sdk missing");
      if (liveState !== "connecting") return;        // ended while the token was on its way
      installMattTools(); pinBg();
      instance = await sdk.init(data.token, {
        // The SDK's default 4px border (red while muted or idle) stays off on every stage (AVATAR-STAGE-SPEC §8).
        mountContainer: "#matt-mount", avatarStyle: { view: "rectangle", borderWidth: "0px", borderStyle: "none" }, debug: /[?&]debug\b/.test(location.search),
        features: { showSDKLoader: { enabled: false }, screenShare: { enabled: true }, pictureInPicture: { enabled: true } },
        onAvatarReady: armReveal, onDestroy: function () { if (instance) endedState(""); },
      });
      instance.showAvatar(); pinBg();
      setTimeout(function () { if (instance) armReveal(); }, 3000);
      capTimer = setTimeout(function () { endLive("That's the ten-minute limit — press Talk to Matt to keep going."); }, CFG.CAP_S * 1000);
      emit(panelSummary(), false);
    } catch (e) { liveError(e); }
  }
  if (!CFG.LIVE) { talkBtn.classList.add("is-soon"); $("span", talkBtn).textContent = "Talk to Matt · coming soon"; }
  talkBtn.addEventListener("click", function () {
    if (!CFG.LIVE) { say_("Matt's live conversation is coming soon. Until then, try the panel beside him.", 6000); track("matt_panel", { action: "talk_soon" }); return; }
    if (liveState === "live") { endLive(""); return; }
    startLive();
  });

  // For the console and tests: what the live Matt would see.
  window.MattPanel = { tools: TOOLS, exec: execTool, state: function () { return S; } };
  render({});
})();
