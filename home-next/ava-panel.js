/* Ava's stage — the Talking AI Agents showcase on the homepage.
 *
 * One panel, four modes (book a strategy call · find the right service · leave your details ·
 * private portfolio). Every change goes through the TOOLS below, so the visitor's clicks, the
 * scripted demo, and — later — the live Ava all drive the panel the same way.
 *
 * Going live (Napster SDK 1.5.0+, see memory napster-page-tools / napster-fleet-standard #4):
 *   call AvaPanel.installModelContext() BEFORE sdk.init(); the SDK picks up the tools from
 *   document.modelContext. Set AvaPanel.onEvent = function (text) { instance.sendCommand({ type:
 *   "send_message", data: { text: text, role: "system", trigger_response: false } }); } so the
 *   twin hears about the visitor's own clicks ("[Ava panel] Visitor picked Thu, Oct 2 at 10:30 AM").
 *
 * Booking is REAL: /api/ava-availability (Michael's open Calendly times, each slot signed) and
 * /api/ava-booking (POST /invitees → Calendly's own invite + the 🔥 alert). The demo never posts.
 */
(function () {
  "use strict";
  var stage = document.getElementById("ava-stage");
  if (!stage) return;
  var html = document.documentElement, RM = html.classList.contains("rm");
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var track = function (n, p) { try { if (window.gtag) gtag("event", n, p || {}); } catch (e) {} };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var wait = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  var CAL = "https://calendly.com/michaelrivera007/free-consultation-meeting";
  var TZ = (function () { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || "America/Los_Angeles"; } catch (e) { return "America/Los_Angeles"; } })();
  var SESSION = Math.random().toString(36).slice(2) + Date.now().toString(36);

  var panel = $("#ava-panel"), body = $(".panel-body", panel), titleEl = $(".panel-title", panel), backBtn = $(".panel-back", panel), flag = $(".panel-flag", panel);
  var vid = $(".ava-video", stage), capBox = $(".ava-caption", stage), hearBtn = $(".ava-hear", stage), demoBtn = $(".ava-demo", stage);

  var IC = {
    cal: '<svg viewBox="0 0 24 24"><rect x="4" y="5.5" width="16" height="14.5" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    compass: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M15.5 8.5l-2 5-5 2 2-5z" fill="currentColor"/></svg>',
    chat: '<svg viewBox="0 0 24 24"><path d="M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 19 16.5h-7l-4.5 3.5v-3.5H5A1.5 1.5 0 0 1 3.5 15V7A1.5 1.5 0 0 1 5 5.5z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
    lock: '<svg><use href="#i-lock"/></svg>',
    arrow: '<svg><use href="#i-arrow"/></svg>',
  };
  var SERVICES = [
    { id: "agents", name: "Talking AI Agents", line: "An agent like me, working on your website", img: "media/agents/angela-collins.jpg", text: "A digital twin of you, a custom brand avatar, or a ready-to-go presenter — answering questions, booking appointments and capturing leads around the clock.", film: null, page: "#agents" },
    { id: "strategist", name: "Creative Strategist", line: "Your whole content engine, run by one strategist", img: "media/poster-strategist.jpg", text: "Brand and story strategy, a digital twin capture, cinematic AI production and every format for every platform — run end to end for you.", film: "#ch-strategist", page: "/strategist/" },
    { id: "realestate", name: "Real Estate", line: "Listing videos, market updates and tours", img: "media/poster-re.jpg", text: "Your digital avatar delivers listing videos, market updates and neighborhood tours — no film crew, no drone operator, no three-week turnaround.", film: "#ch-realestate", page: "/real-estate" },
    { id: "business", name: "Business & Influencers", line: "One session. Endless content.", img: "media/poster-biz.jpg", text: "Your clone or an original AI spokesperson, fresh videos every month, and your YouTube channel managed for you.", film: "#ch-business", page: "/business" },
    { id: "authors", name: "Authors & Publishers", line: "From the page to the screen", img: "media/poster-authors.jpg", text: "Cinematic book trailers, a talking author avatar, an author website and a launch campaign.", film: "#ch-authors", page: "/authors" },
    { id: "aro", name: "AI Referral Optimization", line: "Get recommended by ChatGPT, Gemini and more", img: "media/poster-aro.jpg", text: "We test real customer questions on ChatGPT, Gemini, Grok, Perplexity and Claude — and make your business the answer.", film: "#ch-aro", page: "/aiso/" },
    { id: "claude", name: "Claude Coaching", line: "Master Claude in 90 minutes", img: "media/poster-claude.jpg", text: "A private, hands-on session in your own account. You leave with AI already running your busywork.", film: "#ch-claude", page: "/claudecoaching/" },
  ];

  /* ═════════ State + rendering ═════════ */
  var S = { mode: "home", hist: [], demo: false, slots: null, slotsAt: 0, slotsErr: null, day: null, slot: null,
    book: { name: "", email: "", phone: "", notes: "" }, lead: { name: "", email: "", phone: "", need: "" }, pf: { name: "", email: "" }, svc: null, busy: false };
  var TITLES = { home: "How can I help?", services: "Our services", service: "Service", days: "Book a strategy call", times: "Book a strategy call", details: "Book a strategy call", booked: "You're booked", lead: "Leave your details", leadDone: "Thank you", portfolio: "Private portfolio", portfolioDone: "Check your inbox" };
  var emit = function (text) { try { if (typeof AvaPanel.onEvent === "function") AvaPanel.onEvent("[Ava panel] " + text); } catch (e) {} };

  function go(mode, opts) {
    opts = opts || {};
    if (!opts.replace && S.mode !== mode) S.hist.push(S.mode);
    S.mode = mode; render(opts);
  }
  function goBack() { var m = S.hist.pop() || "home"; S.mode = m; render({}); }
  backBtn.addEventListener("click", function () { if (S.demo) return; goBack(); });

  function dayKey(iso) { return new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(iso)); }
  function fmtDay(iso, long) { return new Date(iso).toLocaleDateString("en-US", { timeZone: TZ, weekday: long ? "long" : "short", month: "short", day: "numeric" }); }
  function fmtWeekday(iso) { return new Date(iso).toLocaleDateString("en-US", { timeZone: TZ, weekday: "long" }); }
  function fmtTime(iso) { return new Date(iso).toLocaleTimeString("en-US", { timeZone: TZ, hour: "numeric", minute: "2-digit" }); }
  function tzShort() { try { return new Date().toLocaleTimeString("en-US", { timeZone: TZ, timeZoneName: "short" }).split(" ").pop(); } catch (e) { return ""; } }
  function days() {
    var map = {}, order = [];
    (S.slots || []).forEach(function (s) { var k = dayKey(s.start_time); if (!map[k]) { map[k] = []; order.push(k); } map[k].push(s); });
    return order.map(function (k) { return { key: k, slots: map[k], label: fmtDay(map[k][0].start_time) }; });
  }

  function render(opts) {
    opts = opts || {};
    titleEl.textContent = TITLES[S.mode] || "Ava";
    backBtn.hidden = S.mode === "home" || S.demo;
    flag.hidden = !S.demo;
    var v = VIEWS[S.mode] || VIEWS.home;
    body.innerHTML = v();
    body.style.animation = "none"; void body.offsetWidth; body.style.animation = "";
    if (WIRE[S.mode]) WIRE[S.mode]();
    if (opts.focus) { var f = $("input, button", body); if (f) f.focus({ preventScroll: true }); }
  }
  var steps = function (n) { return '<div class="p-steps" aria-hidden="true">' + [1, 2, 3].map(function (i) { return '<span class="' + (i <= n ? "on" : "") + '"></span>'; }).join("") + "</div>"; };
  var field = function (id, label, type, val, opt, attrs) {
    return '<div class="p-field"><label for="ap-' + id + '">' + label + (opt ? " <span>(optional)</span>" : "") + "</label>" +
      (type === "textarea" ? '<textarea id="ap-' + id + '" rows="3" ' + (attrs || "") + ">" + esc(val) + "</textarea>"
        : '<input id="ap-' + id + '" type="' + type + '" value="' + esc(val) + '" ' + (attrs || "") + ">") + "</div>";
  };
  var hp = '<div class="hp" aria-hidden="true"><label>Leave this empty<input name="hp" tabindex="-1" autocomplete="off"></label></div>';

  var VIEWS = {
    home: function () {
      return '<p class="p-greet">Hi, I\'m Ava. What brings you here today?</p><p class="p-sub">Tap an option — or ask me, once my live voice arrives.</p><div class="p-actions">' +
        act("book", IC.cal, "Book a strategy call", "30 minutes with Michael · free") +
        act("services", IC.compass, "Find the right service", "See what fits your business") +
        act("lead", IC.chat, "Leave my details", "Michael will be in touch") +
        act("portfolio", IC.lock, "See the private portfolio", "Client films, by email link") + "</div>";
    },
    services: function () {
      return '<div class="p-svcs">' + SERVICES.map(function (s) { return '<button class="p-svc" type="button" data-svc="' + s.id + '"><span>' + esc(s.name) + "<small>" + esc(s.line) + "</small></span>" + IC.arrow + "</button>"; }).join("") + "</div>";
    },
    service: function () {
      var s = SERVICES.filter(function (x) { return x.id === S.svc; })[0] || SERVICES[0];
      return '<div class="p-card"><img src="' + s.img + '" alt=""><div><h4>' + esc(s.name) + "</h4><p>" + esc(s.text) + '</p><div class="row">' +
        (s.film ? '<a class="link" href="' + s.film + '" data-jump>Watch the film ' + IC.arrow + "</a>" : "") +
        '<a class="link" href="' + s.page + '"' + (s.page.charAt(0) === "#" ? " data-jump" : "") + ">" + (s.page.charAt(0) === "#" ? "Learn more " : "Explore the page ") + IC.arrow + "</a></div></div></div>" +
        '<button class="btn btn-gold btn-sm p-go" type="button" data-act="book">Talk it through with Michael ' + IC.arrow + "</button>";
    },
    days: function () {
      if (S.slotsErr && !S.slots) return '<p class="p-msg err">I couldn\'t load Michael\'s calendar just now.</p><a class="btn btn-gold btn-sm p-go" href="' + CAL + '" target="_blank" rel="noopener">Pick a time on Calendly ' + IC.arrow + "</a>";
      if (!S.slots) return steps(1) + '<p class="p-sub">Checking Michael\'s calendar…</p>';
      var d = days();
      if (!d.length) return '<p class="p-sub">Michael\'s calendar is full this week.</p><a class="btn btn-gold btn-sm p-go" href="' + CAL + '" target="_blank" rel="noopener">See later dates ' + IC.arrow + "</a>";
      return steps(1) + '<p class="p-label">Pick a day · ' + esc(tzShort()) + '</p><div class="p-days">' + d.map(function (x) {
        return '<button class="p-chip' + (S.day === x.key ? " on" : "") + '" type="button" data-day="' + x.key + '">' + esc(x.label) + "<small>" + x.slots.length + (x.slots.length === 1 ? " time" : " times") + "</small></button>";
      }).join("") + '</div><p class="p-sub">A free 30-minute strategy call with Michael Rivera.</p>';
    },
    times: function () {
      var d = days().filter(function (x) { return x.key === S.day; })[0];
      if (!d) return VIEWS.days();
      return steps(2) + '<p class="p-label">' + esc(fmtDay(d.slots[0].start_time, true)) + " · " + esc(tzShort()) + '</p><div class="p-times">' + d.slots.map(function (s) {
        return '<button class="p-chip' + (S.slot && S.slot.start_time === s.start_time ? " on" : "") + '" type="button" data-slot="' + s.start_time + '">' + esc(fmtTime(s.start_time)) + "</button>";
      }).join("") + "</div>";
    },
    details: function () {
      return steps(3) + '<div class="p-summary">' + IC.cal.replace("<svg", '<svg width="18" height="18"') + "<span><b>" + esc(fmtDay(S.slot.start_time, true)) + "</b> at <b>" + esc(fmtTime(S.slot.start_time)) + "</b> " + esc(tzShort()) + '</span></div><form class="p-form" novalidate>' +
        field("name", "Your name", "text", S.book.name, false, 'autocomplete="name" required') +
        field("email", "Email", "email", S.book.email, false, 'autocomplete="email" required') +
        field("phone", "Phone", "tel", S.book.phone, true, 'autocomplete="tel"') +
        field("notes", "Anything Michael should know?", "textarea", S.book.notes, true, "") + hp +
        '<button class="btn btn-gold btn-sm p-go" type="submit">' + (S.demo ? "Confirm (demo)" : "Confirm my call") + " " + IC.arrow + '</button><p class="p-msg" role="status"></p></form>';
    },
    booked: function () {
      return '<div class="p-done"><span class="tick">✓</span><h4>' + (S.demo ? "That's how booking works." : "You're all set.") + "</h4><p>" + esc(S.doneMsg || "") + "</p>" +
        (S.demo ? "" : '<button class="btn btn-ghost btn-sm" type="button" data-act="home">Back to Ava</button>') + "</div>";
    },
    lead: function () {
      return '<p class="p-sub">Tell us a little about what you need. Michael will be in touch.</p><form class="p-form" novalidate>' +
        field("lname", "Your name", "text", S.lead.name, false, 'autocomplete="name" required') +
        field("lemail", "Email", "email", S.lead.email, false, 'autocomplete="email" required') +
        field("lphone", "Phone", "tel", S.lead.phone, true, 'autocomplete="tel"') +
        field("lneed", "What can we help with?", "textarea", S.lead.need, true, "") + hp +
        '<button class="btn btn-gold btn-sm p-go" type="submit">Send to Michael ' + IC.arrow + '</button><p class="p-msg" role="status"></p></form>';
    },
    leadDone: function () { return '<div class="p-done"><span class="tick">✓</span><h4>Got it.</h4><p>' + esc(S.doneMsg || "") + '</p><button class="btn btn-ghost btn-sm" type="button" data-act="home">Back to Ava</button></div>'; },
    portfolio: function () {
      return '<p class="p-sub">Our clients\' films stay private by agreement. I\'ll email you a private link to the full portfolio.</p><form class="p-form" novalidate>' +
        field("pname", "First name", "text", S.pf.name, false, 'autocomplete="given-name" required') +
        field("pemail", "Email", "email", S.pf.email, false, 'autocomplete="email" required') + hp +
        '<button class="btn btn-gold btn-sm p-go" type="submit">Email me the link ' + IC.arrow + '</button><p class="p-msg" role="status"></p></form>';
    },
    portfolioDone: function () { return '<div class="p-done"><span class="tick">✓</span><h4>Check your inbox.</h4><p>' + esc(S.doneMsg || "") + '</p><button class="btn btn-ghost btn-sm" type="button" data-act="home">Back to Ava</button></div>'; },
  };
  function act(id, icon, title, sub) { return '<button class="p-act" type="button" data-act="' + id + '"><i>' + icon + "</i><span><b>" + title + "</b><small>" + sub + "</small></span>" + IC.arrow + "</button>"; }

  var validEmail = function (e) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e); };
  var WIRE = {
    details: function () { wireForm(function (f) { S.book.name = f("name"); S.book.email = f("email"); S.book.phone = f("phone"); S.book.notes = f("notes"); return TOOLS_IMPL.confirm_booking({}); }); },
    lead: function () { wireForm(function (f) { S.lead.name = f("lname"); S.lead.email = f("lemail"); S.lead.phone = f("lphone"); S.lead.need = f("lneed"); return TOOLS_IMPL.submit_lead({}); }); },
    portfolio: function () { wireForm(function (f) { S.pf.name = f("pname"); S.pf.email = f("pemail"); return TOOLS_IMPL.submit_portfolio({}); }); },
  };
  function wireForm(onSubmit) {
    var form = $("form", body); if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault(); if (S.demo) return;
      var get = function (id) { var el = $("#ap-" + id, form); return el ? el.value.trim() : ""; };
      if ($('input[name="hp"]', form).value) return;               // bot
      onSubmit(get);
    });
  }

  // Panel clicks (delegated): every visitor action is also reported to the live twin via onEvent.
  body.addEventListener("click", function (e) {
    if (S.demo) { e.preventDefault(); return; }
    var t = e.target.closest("[data-act], [data-svc], [data-day], [data-slot], [data-jump]"); if (!t) return;
    if (t.hasAttribute("data-jump")) return;                         // the page's own anchor handler scrolls
    var a = t.getAttribute("data-act");
    if (a === "book") { TOOLS_IMPL.show_booking_times({}); emit("Visitor opened booking."); track("ava_panel", { action: "book_open" }); }
    else if (a === "services") { go("services"); emit("Visitor is browsing services."); track("ava_panel", { action: "services" }); }
    else if (a === "lead") { go("lead", { focus: true }); emit("Visitor opened the lead form."); track("ava_panel", { action: "lead_open" }); }
    else if (a === "portfolio") { go("portfolio", { focus: true }); emit("Visitor opened the private portfolio form."); track("ava_panel", { action: "portfolio_open" }); }
    else if (a === "home") { S.hist = []; go("home", { replace: true }); }
    else if (t.hasAttribute("data-svc")) { TOOLS_IMPL.show_service({ service: t.getAttribute("data-svc") }); emit("Visitor is looking at " + S.svc + "."); }
    else if (t.hasAttribute("data-day")) { S.day = t.getAttribute("data-day"); S.slot = null; go("times"); emit("Visitor picked " + fmtDay(days().filter(function (x) { return x.key === S.day; })[0].slots[0].start_time, true) + "."); }
    else if (t.hasAttribute("data-slot")) { TOOLS_IMPL.select_booking_time({ start_time: t.getAttribute("data-slot") }); emit("Visitor picked " + fmtDay(S.slot.start_time, true) + " at " + fmtTime(S.slot.start_time) + "."); }
  });

  /* ═════════ Data ═════════ */
  function sampleSlots() {   // demo only, when the live calendar can't be reached (e.g. a local preview)
    var out = [], d = new Date(); d.setMinutes(0, 0, 0);
    for (var n = 1; out.length < 24 && n < 14; n++) {
      var day = new Date(d.getTime() + n * 864e5); if (day.getDay() === 0 || day.getDay() === 6) continue;
      [9, 10.5, 11, 13, 14.5, 15].forEach(function (h) { var t = new Date(day); t.setHours(Math.floor(h), h % 1 ? 30 : 0, 0, 0); out.push({ start_time: t.toISOString(), token: null }); });
    }
    return out;
  }
  function loadSlots(force) {
    if (!force && S.slots && Date.now() - S.slotsAt < 10 * 60e3) return Promise.resolve(S.slots);
    return fetch("/api/ava-availability?days=7", { headers: { Accept: "application/json" } })
      .then(function (r) { return r.json(); })
      .then(function (j) { if (!j || !j.ok) throw new Error((j && j.error) || "unavailable"); S.slots = j.slots || []; S.slotsAt = Date.now(); S.slotsErr = null; return S.slots; })
      .catch(function (e) { S.slotsErr = String(e.message || e); if (S.demo) { S.slots = sampleSlots(); S.slotsAt = Date.now(); return S.slots; } throw e; });
  }
  function post(url, data) {
    return fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
      .then(function (r) { return r.json().catch(function () { return { ok: false, error: "HTTP " + r.status }; }).then(function (j) { j.__status = r.status; return j; }); })
      .catch(function () { return { ok: false, error: "network" }; });
  }
  function setMsg(text, err, htmlStr) { var m = $(".p-msg", body); if (!m) return; m.classList.toggle("err", !!err); if (htmlStr) m.innerHTML = htmlStr; else m.textContent = text; }
  function busy(on) { var b = $(".p-go", body); if (b) b.disabled = !!on; S.busy = !!on; }

  /* ═════════ Tools — the one way anything changes the panel ═════════ */
  var TOOLS_IMPL = {
    show_home: function () { S.hist = []; go("home", { replace: true }); return "Panel shows the four options: book a strategy call, find the right service, leave details, private portfolio."; },
    show_booking_times: function (a) {
      S.day = null; S.slot = null; go("days");
      return loadSlots().then(function () {
        var d = days(); if (a && a.day) { var hit = d.filter(function (x) { return x.key === a.day; })[0]; if (hit) S.day = hit.key; }
        render({}); if (S.day) go("times");
        return d.length ? "Open days: " + d.map(function (x) { return x.label + " (" + x.slots.map(function (s) { return fmtTime(s.start_time); }).join(", ") + ")"; }).join("; ") + ". Times are in the visitor's zone, " + tzShort() + "."
          : "No open times this week. Offer the Calendly link for later dates.";
      }, function () { render({}); return "The calendar didn't load. Offer the Calendly link instead."; });
    },
    select_booking_time: function (a) {
      var s = (S.slots || []).filter(function (x) { return x.start_time === (a && a.start_time); })[0];
      if (!s) return "That time isn't open. Call show_booking_times and offer one of the listed times.";
      S.slot = s; S.day = dayKey(s.start_time); go("details", { focus: !S.demo && !TOOLS_IMPL.__fromTwin });
      return "Selected " + fmtDay(s.start_time, true) + " at " + fmtTime(s.start_time) + ". Now collect name, email and (optionally) phone, one at a time with read-back.";
    },
    fill_booking_details: function (a) {
      a = a || {}; ["name", "email", "phone", "notes"].forEach(function (k) { if (a[k] != null) { S.book[k] = String(a[k]); var el = $("#ap-" + k, body); if (el) { el.value = S.book[k]; flash(el); } } });
      return "Details on screen: " + [S.book.name, S.book.email, S.book.phone].filter(Boolean).join(", ") + ". Read them back and ask for a yes before confirm_booking.";
    },
    confirm_booking: function () {
      if (!S.slot) return Promise.resolve("No time selected yet.");
      if (!S.book.name || !validEmail(S.book.email)) { setMsg(!S.book.name ? "Please add your name." : "Please enter a valid email.", true); return Promise.resolve("Need a name and a valid email first."); }
      if (S.demo) { S.doneMsg = "In a real conversation I'd confirm " + fmtDay(S.slot.start_time, true) + " at " + fmtTime(S.slot.start_time) + " — and Calendly would email the invite."; go("booked"); return Promise.resolve("Demo booking shown."); }
      busy(true); setMsg("Booking your call…");
      return post("/api/ava-booking", { start_time: S.slot.start_time, token: S.slot.token, name: S.book.name, email: S.book.email, phone: S.book.phone, notes: S.book.notes, timezone: TZ, sessionId: SESSION })
        .then(function (r) {
          busy(false);
          if (r.ok && r.booked) { S.doneMsg = "Your strategy call with Michael is confirmed for " + (r.when || fmtDay(S.slot.start_time, true) + " at " + fmtTime(S.slot.start_time)) + ". Calendly has emailed your confirmation and calendar invite."; go("booked"); track("generate_lead", { lead_source: "ava_panel_booking" }); return r.message || "Booked."; }
          if (r.retry) { setMsg("That time was just taken — here are fresh options."); return wait(900).then(function () { return loadSlots(true).then(function () { S.slot = null; go("days", { replace: true }); return r.message || "Time taken; fresh times shown."; }); }); }
          if (r.stored) { S.doneMsg = "Michael has your details and will confirm a time with you directly."; go("booked"); return r.message || "Stored; Michael will confirm."; }
          if (r.__status === 429) { setMsg("", true, 'Too many tries for now. <a href="' + CAL + '" target="_blank" rel="noopener">Pick a time on Calendly</a> instead.'); return "Rate limited; offered Calendly."; }
          setMsg("", true, 'Something went wrong. <a href="' + CAL + '" target="_blank" rel="noopener">Pick a time on Calendly</a> and we\'ll see you there.'); return "Booking failed; offered Calendly.";
        });
    },
    show_service: function (a) { var id = a && a.service; if (!SERVICES.some(function (s) { return s.id === id; })) { go("services"); return "Showing the service list: " + SERVICES.map(function (s) { return s.name; }).join(", ") + "."; } S.svc = id; go("service"); return "Showing " + SERVICES.filter(function (s) { return s.id === id; })[0].name + "."; },
    show_lead_form: function () { go("lead"); return "Lead form open. Collect name, email, phone (optional) and what they need."; },
    fill_lead_details: function (a) {
      a = a || {}; var map = { name: "lname", email: "lemail", phone: "lphone", need: "lneed" };
      if (S.mode !== "lead") go("lead");
      Object.keys(map).forEach(function (k) { if (a[k] != null) { S.lead[k] = String(a[k]); var el = $("#ap-" + map[k], body); if (el) { el.value = S.lead[k]; flash(el); } } });
      return "Lead details on screen. Read back and ask for a yes before submit_lead.";
    },
    submit_lead: function () {
      if (!S.lead.name || !validEmail(S.lead.email)) { setMsg(!S.lead.name ? "Please add your name." : "Please enter a valid email.", true); return Promise.resolve("Need a name and a valid email first."); }
      if (S.demo) { S.doneMsg = "Demo — nothing was sent."; go("leadDone"); return Promise.resolve("Demo."); }
      busy(true); setMsg("Sending…");
      return post("/api/agent-lead", { name: S.lead.name, email: S.lead.email, phone: S.lead.phone, need: S.lead.need, source: "ava-panel" }).then(function (r) {
        busy(false);
        if (r.ok) { S.doneMsg = r.message || "Michael has your details and will be in touch soon."; go("leadDone"); track("generate_lead", { lead_source: "ava_panel_lead" }); return S.doneMsg; }
        setMsg("", true, 'That didn\'t go through. Email <a href="mailto:michael@avataragency.ai">michael@avataragency.ai</a> and we\'ll reply directly.'); return "Lead failed.";
      });
    },
    show_portfolio_form: function () { go("portfolio"); return "Portfolio form open. Collect first name and email."; },
    submit_portfolio: function () {
      if (!S.pf.name || !validEmail(S.pf.email)) { setMsg(!S.pf.name ? "Please add your first name." : "Please enter a valid email.", true); return Promise.resolve("Need a first name and a valid email."); }
      if (S.demo) { S.doneMsg = "Demo — nothing was sent."; go("portfolioDone"); return Promise.resolve("Demo."); }
      busy(true); setMsg("Sending your private link…");
      return post("/api/portfolio-signup", { name: S.pf.name, email: S.pf.email, company: "", hp: "" }).then(function (r) {
        busy(false);
        if (r.ok) { S.doneMsg = "Your private portfolio link is on its way to " + S.pf.email + ". (Not there? Check promotions or spam.)"; go("portfolioDone"); track("generate_lead", { lead_source: "ava_panel_portfolio" }); return "Portfolio link sent."; }
        setMsg("", true, 'That didn\'t go through. Email <a href="mailto:michael@avataragency.ai?subject=Private%20portfolio">michael@avataragency.ai</a> for the link.'); return "Portfolio signup failed.";
      });
    },
  };
  function flash(el) { el.classList.add("flash"); setTimeout(function () { el.classList.remove("flash"); }, 1100); }

  var str = function (d) { return { type: "string", description: d }; };
  var TOOLS = [
    { name: "show_home", description: "Return Ava's panel to its four options.", inputSchema: { type: "object", properties: {} } },
    { name: "show_booking_times", description: "Show Michael Rivera's real open days and times for the free 30-minute strategy call. Returns the list in the visitor's time zone.", inputSchema: { type: "object", properties: { day: str("Optional day to open, YYYY-MM-DD") } } },
    { name: "select_booking_time", description: "Select one of the offered times (exact start_time ISO string from show_booking_times).", inputSchema: { type: "object", properties: { start_time: str("ISO start time exactly as offered") }, required: ["start_time"] } },
    { name: "fill_booking_details", description: "Type the visitor's details into the booking form as you collect them (one at a time, with read-back).", inputSchema: { type: "object", properties: { name: str("Full name"), email: str("Email address"), phone: str("Phone, optional"), notes: str("Anything Michael should know, optional") } } },
    { name: "confirm_booking", description: "Book the selected time on Michael's calendar. Only after the visitor says yes to the read-back.", inputSchema: { type: "object", properties: {} } },
    { name: "show_service", description: "Show one AvatarAgency service in the panel.", inputSchema: { type: "object", properties: { service: { type: "string", enum: SERVICES.map(function (s) { return s.id; }) } } } },
    { name: "show_lead_form", description: "Open the leave-your-details form.", inputSchema: { type: "object", properties: {} } },
    { name: "fill_lead_details", description: "Type the visitor's details into the lead form.", inputSchema: { type: "object", properties: { name: str("Full name"), email: str("Email"), phone: str("Phone, optional"), need: str("What they need") } } },
    { name: "submit_lead", description: "Send the lead to Michael. Only after a yes to the read-back.", inputSchema: { type: "object", properties: {} } },
    { name: "show_portfolio_form", description: "Open the private client portfolio form (emails a private link).", inputSchema: { type: "object", properties: {} } },
    { name: "submit_portfolio", description: "Email the private portfolio link to the visitor (needs first name + email typed in the form).", inputSchema: { type: "object", properties: {} } },
  ];
  function execTool(name, args) {
    var fn = TOOLS_IMPL[name]; if (!fn) return Promise.resolve("Unknown tool " + name);
    TOOLS_IMPL.__fromTwin = true;
    try { return Promise.resolve(fn(args || {})).then(function (m) { TOOLS_IMPL.__fromTwin = false; return m; }); } catch (e) { TOOLS_IMPL.__fromTwin = false; return Promise.resolve("Tool error: " + e.message); }
  }
  var AvaPanel = window.AvaPanel = {
    tools: TOOLS, exec: execTool, onEvent: null, state: function () { return S; },
    installModelContext: function () {   // call BEFORE the Napster SDK's init()
      var mc = document.modelContext || new EventTarget();
      mc.getTools = function () { return TOOLS; };
      mc.executeTool = function (tool, jsonArgs) { var args = {}; try { args = typeof jsonArgs === "string" ? JSON.parse(jsonArgs || "{}") : (jsonArgs || {}); } catch (e) {} return execTool(tool && tool.name ? tool.name : tool, args); };
      document.modelContext = mc; return mc;
    },
  };

  /* ═════════ Ava's clip: muted loop, "Hear Ava" with captions ═════════ */
  var LINES = [[0.6, 3.5, "Hey there — I'm Ava, and I'm not real."], [4.0, 7.6, "I'm a digital avatar created by AvatarAgency."], [8.4, 12.9, "When someone lands on this website, I'm the first one to say hello."],
    [13.4, 17.1, "I answer questions, I explain how everything works,"], [17.1, 20.4, "and when you're ready, I can book a call with the team for you."], [21.3, 27.5, "So tell me — what brought you here today?"]];
  var hearing = false, lastT = 0, visible = false, demoRun = 0;
  function caption(lines) { capBox.innerHTML = (lines || []).map(function (l) { return '<span class="cap' + (l.you ? " you" : "") + '"><b>' + (l.you ? "You" : "Ava") + "</b>" + esc(l.text) + "</span>"; }).join(""); }
  function ensureSrc() { if (!vid.getAttribute("src")) { vid.src = vid.getAttribute("data-src"); } }
  function playQuiet() { if (RM || hearing) return; ensureSrc(); vid.muted = true; var p = vid.play(); if (p && p.catch) p.catch(function () {}); }
  function stopHearing() { hearing = false; vid.muted = true; hearBtn.setAttribute("aria-pressed", "false"); $("use", hearBtn).setAttribute("href", "#i-vol"); $("span", hearBtn).textContent = "Hear Ava"; if (!demoRun) caption([]); if (RM) vid.pause(); }
  hearBtn.addEventListener("click", function () {
    if (hearing) { stopHearing(); return; }
    stopDemo(); ensureSrc(); hearing = true; vid.currentTime = 0; vid.muted = false; lastT = 0;
    var p = vid.play(); if (p && p.catch) p.catch(function () { stopHearing(); });
    hearBtn.setAttribute("aria-pressed", "true"); $("use", hearBtn).setAttribute("href", "#i-mute"); $("span", hearBtn).textContent = "Mute";
    track("ava_hear", {});
  });
  vid.addEventListener("timeupdate", function () {
    var t = vid.currentTime;
    if (hearing) {
      if (t + 0.3 < lastT || t > 29.3) { stopHearing(); pulseActions(); }
      else { var on = LINES.filter(function (l) { return t >= l[0] && t < l[1]; })[0]; caption(on ? [{ text: on[2] }] : []); }
    }
    lastT = t;
  });
  function pulseActions() { if (S.mode !== "home") return; $$(".p-act", body).forEach(function (b, i) { setTimeout(function () { flash(b); }, i * 160); }); }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (visible) playQuiet(); else { vid.pause(); if (hearing) stopHearing(); } }, { threshold: 0.25 }).observe(stage);
  }

  /* ═════════ The scripted demo ("See how it works") ═════════ */
  function stopDemo() { if (!demoRun) return; demoRun = 0; S.demo = false; demoBtn.classList.remove("is-on"); $("span", demoBtn).textContent = "See how it works"; caption([]); S.hist = []; S.book = { name: "", email: "", phone: "", notes: "" }; go("home", { replace: true }); }
  function typeInto(id, text, run) {
    var el = $("#ap-" + id, body); if (!el) return Promise.resolve();
    el.classList.add("flash"); var i = 0;
    return new Promise(function (res) { (function tickType() { if (run !== demoRun) return res(); el.value = text.slice(0, ++i); if (i < text.length) setTimeout(tickType, 45); else { el.classList.remove("flash"); res(); } })(); });
  }
  demoBtn.addEventListener("click", function () {
    if (demoRun) { stopDemo(); return; }
    if (hearing) stopHearing();
    var run = demoRun = Date.now(); S.demo = true; S.hist = []; S.book = { name: "", email: "", phone: "", notes: "" };
    demoBtn.classList.add("is-on"); $("span", demoBtn).textContent = "Stop demo"; track("ava_demo", {}); playQuiet();
    var alive = function () { return run === demoRun; };
    var say = function (who, text, ms) { if (!alive()) return Promise.reject("stopped"); caption(who === "you" ? [{ text: text, you: true }] : [{ text: text }]); return wait(ms); };
    go("home", { replace: true });
    say("ava", "Hi, I'm Ava, AvatarAgency's AI agent. What brings you here today?", 2600)
      .then(function () { return say("you", "I'd like to talk to Michael about a digital twin.", 1500); })
      .then(function () { var b = $('[data-act="book"]', body); if (b) flash(b); return wait(900); })
      .then(function () { if (!alive()) throw "stopped"; return TOOLS_IMPL.show_booking_times({}); })
      .then(function () { return say("ava", "Happy to set that up. Here are Michael's next open days.", 2500); })
      .then(function () {
        var d = days(); var pick = d[Math.min(1, d.length - 1)]; if (!pick) throw "stopped";
        S.__demoDay = pick; var chip = $('[data-day="' + pick.key + '"]', body); if (chip) flash(chip);
        return say("you", fmtWeekday(pick.slots[0].start_time) + " works for me.", 1500).then(function () { S.day = pick.key; go("times"); });
      })
      .then(function () { return say("ava", "These times are open on " + fmtWeekday(S.__demoDay.slots[0].start_time) + ". Which suits you?", 2400); })
      .then(function () {
        var sl = S.__demoDay.slots, s = sl[Math.min(1, sl.length - 1)]; var chip = $('[data-slot="' + s.start_time + '"]', body); if (chip) flash(chip);
        return say("you", fmtTime(s.start_time) + ", please.", 1400).then(function () { TOOLS_IMPL.select_booking_time({ start_time: s.start_time }); });
      })
      .then(function () { return say("ava", "Perfect. What's your name and the best email for the invite?", 2300); })
      .then(function () { caption([{ text: "Jordan Lee — jordan@example.com", you: true }]); return typeInto("name", "Jordan Lee", run); })
      .then(function () { return typeInto("email", "jordan@example.com", run); })
      .then(function () { S.book.name = "Jordan Lee"; S.book.email = "jordan@example.com"; return say("ava", "Thanks, Jordan. Booking you in now.", 1500); })
      .then(function () { if (!alive()) throw "stopped"; return TOOLS_IMPL.confirm_booking({}); })
      .then(function () { return say("ava", "You're all set — Calendly emails the invite. That's me at work.", 3300); })
      .then(function () { return say("ava", "Now it's your turn. Tap any option to try the real thing.", 2600); })
      .then(function () { if (alive()) { stopDemo(); pulseActions(); } })
      .catch(function () { /* stopped */ });
  });

  render({});
})();
