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
  /* ── Live-session config. Ava's agent may switch after the HeyGen-vs-Seedance A/B, so the endpoint
     path lives in ONE place. The SDK is pinned: the tool bridge ships in 1.5.0. ── */
  var CFG = {
    TOKEN_ENDPOINT: "/api/ava-nv2-token",
    SDK_URL: "https://cdn.jsdelivr.net/npm/@touchcastllc/napster-companion-api@1.5.0/lib/index.standalone.js",
    CAP_S: 600,   // ten-minute session cap, as on Laurie's page
  };
  var CAL = "https://calendly.com/michaelrivera007/free-consultation-meeting";
  var TZ = (function () { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || "America/Los_Angeles"; } catch (e) { return "America/Los_Angeles"; } })();
  var SESSION = Math.random().toString(36).slice(2) + Date.now().toString(36);

  var panel = $("#ava-panel"), body = $(".panel-body", panel), titleEl = $(".panel-title", panel), backBtn = $(".panel-back", panel), flag = $(".panel-flag", panel);
  var avStage = $(".stage-av", stage), vid = $(".ava-video", stage), capBox = $(".ava-caption", stage), hearBtn = $(".ava-hear", stage), talkBtn = $(".ava-talk", stage), demoBtn = $(".panel-demo", stage), toast = $(".ava-toast", stage);
  var instance = null, liveState = "idle";   // idle | connecting | live

  var IC = {
    cal: '<svg viewBox="0 0 24 24"><rect x="4" y="5.5" width="16" height="14.5" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    compass: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M15.5 8.5l-2 5-5 2 2-5z" fill="currentColor"/></svg>',
    chat: '<svg viewBox="0 0 24 24"><path d="M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 19 16.5h-7l-4.5 3.5v-3.5H5A1.5 1.5 0 0 1 3.5 15V7A1.5 1.5 0 0 1 5 5.5z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
    lock: '<svg><use href="#i-lock"/></svg>',
    arrow: '<svg><use href="#i-arrow"/></svg>',
  };
  var SERVICES = [
    { id: "agents", name: "Talking AI Agents", line: "An agent like me, working on your website", img: "media/agents/angela-collins.jpg", text: "A digital twin of you, a custom brand avatar, or a ready-to-go presenter — answering questions, booking appointments and capturing leads around the clock.", film: null, dur: null, page: null },
    { id: "strategist", name: "Creative Strategist", line: "Your whole content engine, run by one strategist", img: "media/poster-strategist.jpg", text: "Brand and story strategy, a digital twin capture, cinematic AI production and every format for every platform — run end to end for you.", film: "/strategist/vsl.mp4?v=1", dur: "1:25", page: "/strategist/" },
    { id: "realestate", name: "Real Estate", line: "Listing videos, market updates and tours", img: "media/poster-re.jpg", text: "Your digital avatar delivers listing videos, market updates and neighborhood tours — no film crew, no drone operator, no three-week turnaround.", film: "media/film-re.mp4?v=1", dur: "1:46", page: "/real-estate" },
    { id: "business", name: "Business & Influencers", line: "One session. Endless content.", img: "media/poster-biz.jpg", text: "Your clone or an original AI spokesperson, fresh videos every month, and your YouTube channel managed for you.", film: "media/film-biz.mp4?v=1", dur: "0:55", page: "/business" },
    { id: "authors", name: "Authors & Publishers", line: "From the page to the screen", img: "media/poster-authors.jpg", text: "Cinematic book trailers, a talking author avatar, an author website and a launch campaign.", film: "media/film-authors.mp4?v=1", dur: "3:14", page: "/authors" },
    { id: "aro", name: "AI Referral Optimization", line: "Get recommended by ChatGPT, Gemini and more", img: "media/poster-aro.jpg", text: "We test real customer questions on ChatGPT, Gemini, Grok, Perplexity and Claude — and make your business the answer.", film: "/aiso/video/aro-sales.mp4?v=1", dur: "1:34", page: "/aiso/" },
    { id: "claude", name: "Claude Coaching", line: "Master Claude in 90 minutes", img: "media/poster-claude.jpg", text: "A private, hands-on session in your own account. You leave with AI already running your busywork.", film: "/claudecoaching/vsl.mp4?v=2", dur: "2:03", page: "/claudecoaching/" },
  ];

  /* ═════════ State + rendering ═════════ */
  var S = { mode: "home", hist: [], demo: false, slots: null, slotsAt: 0, slotsErr: null, day: null, slot: null, viewAll: false, booked: null,
    book: { name: "", email: "", phone: "", notes: "" }, lead: { name: "", email: "", phone: "", need: "" }, pf: { name: "", email: "" }, svc: null, busy: false };
  var TITLES = { home: "How can I help?", services: "Our services", service: "Service", days: "Book a strategy call", times: "Book a strategy call", details: "Book a strategy call", booked: "You're booked", lead: "Leave your details", leadDone: "Thank you", portfolio: "Private portfolio", portfolioDone: "Check your inbox" };
  /* Tells the live twin what the visitor just did, so she never re-asks for something they typed.
     "[Booking panel]" is the prefix her instructions react to; speak=true only for moments she should
     answer aloud (a confirmed booking). The brand is written as two words — she says exactly what she reads. */
  var emit = function (text, speak) {
    if (!instance || !instance.sendCommand) return;
    try { instance.sendCommand({ type: "send_message", data: { text: "[Booking panel] " + String(text).replace(/AvatarAgency/g, "Avatar Agency"), role: "system", trigger_response: !!speak } }); } catch (e) {}
  };
  var TZ_NAME = TZ.replace(/_/g, " ");

  function go(mode, opts) {
    opts = opts || {};
    if (!opts.replace && S.mode !== mode) S.hist.push(S.mode);
    if (S.mode !== mode) S.review = null;
    S.mode = mode; render(opts);
  }
  function goBack() { var m = S.hist.pop() || "home"; S.mode = m; S.review = null; render({}); }
  backBtn.addEventListener("click", function () { if (S.demo) return; goBack(); });

  function dayKey(iso) { return new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(iso)); }
  function fmtDay(iso, long) { return new Date(iso).toLocaleDateString("en-US", { timeZone: TZ, weekday: long ? "long" : "short", month: "short", day: "numeric" }); }
  function fmtWeekday(iso) { return new Date(iso).toLocaleDateString("en-US", { timeZone: TZ, weekday: "long" }); }
  function fmtTime(iso) { return new Date(iso).toLocaleTimeString("en-US", { timeZone: TZ, hour: "numeric", minute: "2-digit" }); }
  function tzShort() { try { return new Date().toLocaleTimeString("en-US", { timeZone: TZ, timeZoneName: "short" }).split(" ").pop(); } catch (e) { return ""; } }
  function fmtLabel(iso) { return new Date(iso).toLocaleDateString("en-US", { timeZone: TZ, weekday: "long", month: "long", day: "numeric" }) + " at " + fmtTime(iso); }
  function info(s) { return { date: dayKey(s.start_time), time: fmtTime(s.start_time), label: fmtLabel(s.start_time) }; }
  // Up to n picks, one per day first (so the visitor sees range), then topped up from the earliest slots.
  function pickSlots(n) {
    var d = days(), out = [];
    d.forEach(function (x) { if (out.length < n) out.push(x.slots[Math.min(1, x.slots.length - 1)]); });
    (S.slots || []).forEach(function (s) { if (out.length < n && out.indexOf(s) < 0) out.push(s); });
    return out.sort(function (a, b) { return Date.parse(a.start_time) - Date.parse(b.start_time); });
  }
  var normTime = function (t) { return String(t || "").toLowerCase().replace(/\s+/g, "").replace(/^0(\d:)/, "$1"); };
  function findSlot(date, time) {
    return (S.slots || []).filter(function (s) { return dayKey(s.start_time) === date && normTime(fmtTime(s.start_time)) === normTime(time); })[0];
  }
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
  // Express consent to marketing email — shown wherever a visitor gives us their email for the portfolio or a follow-up.
  var CONSENT_TEXT = "By submitting, you agree that AvatarAgency may email you additional information about our services, offers and promotions. You can unsubscribe at any time.";
  var CONSENT = '<p class="p-consent">' + CONSENT_TEXT + ' <a href="/privacy.html" target="_blank" rel="noopener">Privacy Policy</a></p>';

  /* "Is this correct?" — nothing is booked or sent until the visitor confirms what is on screen.
     S.review = { kind: "book" | "pf" | "lead", sig, at, ok }. Any change to the details (sig) cancels the confirmation. */
  var REVIEW_MODE = { book: "details", pf: "portfolio", lead: "lead" };
  var tr = function (v) { return String(v || "").trim(); };
  function sigOf(k) {
    if (k === "book") return [S.slot ? S.slot.start_time : "", tr(S.book.name), tr(S.book.email).toLowerCase(), tr(S.book.phone), tr(S.book.notes)].join("|");
    if (k === "pf") return [tr(S.pf.name), tr(S.pf.email).toLowerCase()].join("|");
    return [tr(S.lead.name), tr(S.lead.email).toLowerCase(), tr(S.lead.phone), tr(S.lead.need)].join("|");
  }
  var inReview = function (k) { return !!(S.review && S.review.kind === k); };
  var reviewFresh = function (k) { return inReview(k) && S.review.sig === sigOf(k); };
  function reviewRows(k) {
    var r = k === "book" ? [["Time", S.slot ? info(S.slot).label + " " + tzShort() : ""], ["Name", S.book.name], ["Email", S.book.email], ["Phone", S.book.phone], ["Note", S.book.notes]]
      : k === "pf" ? [["First name", S.pf.name], ["Email", S.pf.email]]
      : [["Name", S.lead.name], ["Email", S.lead.email], ["Phone", S.lead.phone], ["What you need", S.lead.need]];
    return r.filter(function (x) { return tr(x[1]); });
  }
  function reviewCard(k) {
    var yes = { book: "Yes, book my call", pf: "Yes, email me the link", lead: "Yes, send to Michael" }[k] + (S.demo ? " (demo)" : "");
    return (k === "book" ? steps(3) : "") + '<div class="p-review"><p class="p-label">Is this correct?</p><dl class="p-rv">' +
      reviewRows(k).map(function (x) { return "<div><dt>" + x[0] + "</dt><dd>" + esc(tr(x[1])) + "</dd></div>"; }).join("") +
      '</dl><p class="p-sub">Please check your details. Nothing is ' + (k === "book" ? "booked" : "sent") + ' until you confirm.</p><div class="p-rv-acts"><button class="btn btn-gold btn-sm p-go" type="button" data-act="review-yes">' + yes + " " + IC.arrow +
      '</button><button class="btn btn-ghost btn-sm" type="button" data-act="review-edit">Edit</button></div>' + (k === "book" ? "" : CONSENT) + '<p class="p-msg" role="status"></p></div>';
  }
  function openReview(k, fromTwin) {
    if (S.mode !== REVIEW_MODE[k]) go(REVIEW_MODE[k]);
    S.review = { kind: k, sig: sigOf(k), at: Date.now(), ok: false }; render({});
    var b = $('[data-act="review-yes"]', body); if (b && !fromTwin) b.focus({ preventScroll: true });
    if (fromTwin || S.demo) return;
    var list = reviewRows(k).map(function (x) { return x[0].toLowerCase() + " " + tr(x[1]); }).join(", ");
    emit(k === "book"
      ? "The visitor pressed Confirm. Nothing is booked yet: the panel is showing their details for review (" + list + "). Read the time, name and email back to them, spelling the email, and ask whether everything is correct. Fix anything they correct with fill_booking_details. Book only after a clear yes, with confirm_booking, or when they press Yes on the panel."
      : "The visitor is reviewing their " + (k === "pf" ? "private-portfolio request" : "details for Michael") + " (" + list + "). Nothing is sent yet. Read the email back and ask whether it is correct. It is sent only when they press Yes on the panel.", true);
  }

  var VIEWS = {
    home: function () {
      return '<p class="p-greet">Hi, I\'m Ava. What brings you here today?</p><p class="p-sub">Tap an option below — or press Talk to Ava to speak with me.</p><div class="p-actions">' +
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
      var media = s.film
        ? '<div class="sv-film"><video playsinline preload="none" poster="' + s.img + '" aria-label="' + esc(s.name) + ' film"></video><button class="sv-play" type="button" aria-label="Play the ' + esc(s.name) + ' film (' + s.dur + ')"><span class="ring"><svg><use href="#i-play"/></svg></span><span class="lbl"><b>Watch the film</b><small>' + s.dur + "</small></span></button></div>"
        : '<img class="sv-still" src="' + s.img + '" alt="">';
      return '<div class="p-card">' + media + "<div><h4>" + esc(s.name) + "</h4><p>" + esc(s.text) + "</p></div></div>" +
        '<div class="p-svc-actions"><button class="btn btn-gold btn-sm" type="button" data-act="book">Book a strategy call ' + IC.arrow + "</button>" +
        (s.page ? '<a class="link" href="' + s.page + '" target="_blank" rel="noopener">Open the full page ' + IC.arrow + "</a>" : "") + "</div>";
    },
    days: function () {
      if (S.slotsErr && !S.slots) return '<p class="p-msg err">I couldn\'t load Michael\'s calendar just now.</p><a class="btn btn-gold btn-sm p-go" href="' + CAL + '" target="_blank" rel="noopener">Pick a time on Calendly ' + IC.arrow + "</a>";
      if (!S.slots) return steps(1) + '<p class="p-sub">Checking Michael\'s calendar…</p>';
      var d = days();
      if (!d.length) return '<p class="p-sub">Michael\'s calendar is full this week.</p><a class="btn btn-gold btn-sm p-go" href="' + CAL + '" target="_blank" rel="noopener">See later dates ' + IC.arrow + "</a>";
      if (!S.viewAll) {   // three suggested times first — one tap and they are on the details step
        return steps(1) + '<p class="p-label">Suggested times · ' + esc(tzShort()) + '</p><div class="p-picks">' + pickSlots(3).map(function (s) {
          return '<button class="p-chip p-pick" type="button" data-slot="' + s.start_time + '">' + esc(fmtDay(s.start_time)) + "<small>" + esc(fmtTime(s.start_time)) + "</small></button>";
        }).join("") + '</div><button class="link p-week" type="button" data-act="week">See the whole week ' + IC.arrow + '</button><p class="p-sub">A free 30-minute strategy call with Michael Rivera.</p>';
      }
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
      if (inReview("book")) return reviewCard("book");
      return steps(3) + '<div class="p-summary">' + IC.cal.replace("<svg", '<svg width="18" height="18"') + "<span><b>" + esc(fmtDay(S.slot.start_time, true)) + "</b> at <b>" + esc(fmtTime(S.slot.start_time)) + "</b> " + esc(tzShort()) + '</span></div><form class="p-form" novalidate>' +
        field("name", "Your name", "text", S.book.name, false, 'autocomplete="name" required data-bind="book.name"') +
        field("email", "Email", "email", S.book.email, false, 'autocomplete="email" required data-bind="book.email"') +
        field("phone", "Phone", "tel", S.book.phone, true, 'autocomplete="tel" data-bind="book.phone"') +
        field("notes", "What would you like to talk about?", "textarea", S.book.notes, true, 'data-bind="book.notes"') + hp +
        '<button class="btn btn-gold btn-sm p-go" type="submit">' + (S.demo ? "Confirm (demo)" : "Confirm my call") + " " + IC.arrow + '</button><p class="p-msg" role="status"></p></form>';
    },
    booked: function () {
      return '<div class="p-done"><span class="tick">✓</span><h4>' + (S.demo ? "That's how booking works." : "You're all set.") + "</h4><p>" + esc(S.doneMsg || "") + "</p>" +
        (S.demo ? "" : '<button class="btn btn-ghost btn-sm" type="button" data-act="home">Back to Ava</button>') + "</div>";
    },
    lead: function () {
      if (inReview("lead")) return reviewCard("lead");
      return '<p class="p-sub">Tell us a little about what you need. Michael will be in touch.</p><form class="p-form" novalidate>' +
        field("lname", "Your name", "text", S.lead.name, false, 'autocomplete="name" required data-bind="lead.name"') +
        field("lemail", "Email", "email", S.lead.email, false, 'autocomplete="email" required data-bind="lead.email"') +
        field("lphone", "Phone", "tel", S.lead.phone, true, 'autocomplete="tel" data-bind="lead.phone"') +
        field("lneed", "What can we help with?", "textarea", S.lead.need, true, 'data-bind="lead.need"') + hp +
        '<button class="btn btn-gold btn-sm p-go" type="submit">Send to Michael ' + IC.arrow + '</button>' + CONSENT + '<p class="p-msg" role="status"></p></form>';
    },
    leadDone: function () { return '<div class="p-done"><span class="tick">✓</span><h4>Got it.</h4><p>' + esc(S.doneMsg || "") + '</p><button class="btn btn-ghost btn-sm" type="button" data-act="home">Back to Ava</button></div>'; },
    portfolio: function () {
      if (inReview("pf")) return reviewCard("pf");
      return '<p class="p-sub">Our clients\' films stay private by agreement. I\'ll email you a private link to the full portfolio.</p><form class="p-form" novalidate>' +
        field("pname", "First name", "text", S.pf.name, false, 'autocomplete="given-name" required data-bind="pf.name"') +
        field("pemail", "Email", "email", S.pf.email, false, 'autocomplete="email" required data-bind="pf.email"') + hp +
        '<button class="btn btn-gold btn-sm p-go" type="submit">Email me the link ' + IC.arrow + '</button>' + CONSENT + '<p class="p-msg" role="status"></p></form>';
    },
    portfolioDone: function () { return '<div class="p-done"><span class="tick">✓</span><h4>Check your inbox.</h4><p>' + esc(S.doneMsg || "") + '</p><button class="btn btn-ghost btn-sm" type="button" data-act="home">Back to Ava</button></div>'; },
  };
  function act(id, icon, title, sub) { return '<button class="p-act" type="button" data-act="' + id + '"><i>' + icon + "</i><span><b>" + title + "</b><small>" + sub + "</small></span>" + IC.arrow + "</button>"; }

  var validEmail = function (e) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e); };
  function wireFilm() {
    var box = $(".sv-film", body); if (!box) return;
    var s = SERVICES.filter(function (x) { return x.id === S.svc; })[0], v = $("video", box), btn = $(".sv-play", box);
    btn.addEventListener("click", function () {
      if (hearing) stopHearing();
      if (window.AAFilms) AAFilms.pauseAll();            // never two films (or a film and Ava's recording) at once
      if (!v.getAttribute("src")) v.src = s.film;
      v.controls = true; box.classList.add("playing");
      var p = v.play(); if (p && p.catch) p.catch(function () { box.classList.remove("playing"); v.controls = false; });
      track("ava_service_film", { service: s.id });
    });
    v.addEventListener("play", function () { emit("The visitor is playing the " + s.name + " film (" + s.dur + "). Stay quiet until it ends or they pause it.", false); });
    v.addEventListener("pause", function () { if (!v.ended) emit("The visitor paused the " + s.name + " film. You may speak again.", false); });
    v.addEventListener("ended", function () { emit("The visitor finished watching the " + s.name + " film. You may speak again.", false); });
  }
  var WIRE = {
    service: wireFilm,
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
    if (a === "book") { S.viewAll = false; S.booked = null; TOOLS_IMPL.show_booking_times({ view: "suggested" }); emit("The visitor opened the booking panel.", false); track("ava_panel", { action: "book_open" }); }
    else if (a === "week") { S.viewAll = true; render({}); emit("The visitor is looking at the whole week.", false); }
    else if (a === "services") { go("services"); emit("The visitor is browsing the services list.", false); track("ava_panel", { action: "services" }); }
    else if (a === "lead") { go("lead", { focus: true }); emit("The visitor opened the leave-your-details form.", false); track("ava_panel", { action: "lead_open" }); }
    else if (a === "portfolio") { go("portfolio", { focus: true }); emit("The visitor opened the private portfolio form.", false); track("ava_panel", { action: "portfolio_open" }); }
    else if (a === "home") { S.hist = []; go("home", { replace: true }); }
    else if (a === "review-yes") { if (!S.review || S.busy) return; S.review.ok = true; var rk = S.review.kind; (rk === "book" ? TOOLS_IMPL.confirm_booking : rk === "pf" ? TOOLS_IMPL.submit_portfolio : TOOLS_IMPL.submit_lead)({}); }
    else if (a === "review-edit") { S.review = null; render({ focus: true }); emit("The visitor chose to edit their details. Nothing has been booked or sent.", false); }
    else if (t.hasAttribute("data-svc")) { TOOLS_IMPL.show_service({ service: t.getAttribute("data-svc") }); emit("The visitor is looking at the " + SERVICES.filter(function (s) { return s.id === S.svc; })[0].name + " service.", false); }
    else if (t.hasAttribute("data-day")) { S.day = t.getAttribute("data-day"); S.slot = null; go("times"); emit("The visitor picked " + fmtDay(days().filter(function (x) { return x.key === S.day; })[0].slots[0].start_time, true) + " and is choosing a time.", false); }
    else if (t.hasAttribute("data-slot")) { var sl = (S.slots || []).filter(function (x) { return x.start_time === t.getAttribute("data-slot"); })[0]; if (sl) { selectSlot(sl, false); emit("The visitor selected " + info(sl).label + ".", false); } }
  });

  // Keep what the visitor types (so an Ava update never wipes it) and tell the live twin about it.
  var BIND_LABEL = { "book.name": "name", "book.email": "email", "book.phone": "phone number", "book.notes": "note" };
  body.addEventListener("input", function (e) {
    var b = e.target.getAttribute && e.target.getAttribute("data-bind"); if (!b) return;
    var p = b.split("."); S[p[0]][p[1]] = e.target.value;
  });
  body.addEventListener("change", function (e) {
    var b = e.target.getAttribute && e.target.getAttribute("data-bind"); if (!b || !BIND_LABEL[b] || !e.target.value.trim()) return;
    emit("The visitor typed their " + BIND_LABEL[b] + ": " + e.target.value.trim() + ".", false);
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
  // Each slot's signed token lasts 30 minutes, so reuse a fetch only while it is fresh (default 2 minutes).
  function loadSlots(force, maxAgeMs) {
    if (!force && S.slots && Date.now() - S.slotsAt < (maxAgeMs || 120e3)) return Promise.resolve(S.slots);
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

  /* ═════════ Tools — the one way anything changes the panel ═════════
     The first four are Ava's CONTRACT (names, argument shapes and return values come from
     livebrand-ops/ava-nv2/PANEL-INTEGRATION-SPEC.md §4; her instructions call them by name).
     The rest drive the panel's other modes for the visitor's clicks and the scripted demo. */
  function selectSlot(s, fromTwin) { S.slot = s; S.day = dayKey(s.start_time); go("details", { focus: !fromTwin && !S.demo }); }
  function stillNeeded() {
    var n = []; if (!S.slot) n.push("time"); if (!S.book.name.trim()) n.push("name"); if (!validEmail(S.book.email.trim())) n.push("email"); return n;
  }
  function formState() { return { time: S.slot ? info(S.slot).label : null, name: S.book.name, email: S.book.email, phone: S.book.phone, notes: S.book.notes }; }
  function clean(r) { var o = Object.assign({}, r); delete o.__status; return o; }
  // What is already on the panel when a session starts, so she never re-asks for what the visitor already did.
  function panelSummary() {
    var bits = ["The booking panel is visible beside you"];
    if (S.booked) bits.push("a call is already booked for " + S.booked.when);
    else {
      if (S.slot) bits.push("the visitor has selected " + info(S.slot).label);
      var have = [S.book.name && "name " + S.book.name, S.book.email && "email " + S.book.email, S.book.phone && "phone " + S.book.phone].filter(Boolean);
      if (have.length) bits.push("they have typed their " + have.join(", "));
    }
    return bits.join("; ") + ".";
  }
  function needConfirm() {
    return { ok: false, booked: false, needs_confirmation: true, details: formState(),
      message: "Nothing is booked yet. The panel is now showing these details to the visitor for review. Read back the time, name and email (spell the email) and ask: 'Is all of that correct?' Fix anything they correct with fill_booking_details. Call confirm_booking again only after they clearly say yes." };
  }
  function bookingFallback(extra) { return Object.assign({ fallback_email: "michael@avataragency.ai", calendly: CAL }, extra || {}); }

  var TOOLS_IMPL = {
    show_booking_times: function (a) {
      a = a || {}; S.slot = null; S.day = null; S.viewAll = a.view === "all";
      go("days");
      return loadSlots(false).then(function () {
        if (a.date) { var hit = days().filter(function (x) { return x.key === a.date; })[0]; if (hit) { S.day = hit.key; S.viewAll = true; } }
        render({}); if (S.day) go("times");
        return { ok: true, timezone: TZ_NAME, suggested: pickSlots(3).map(info), days: days().map(function (x) { return { date: x.key, label: x.label, open: x.slots.length }; }) };
      }, function () { render({}); return bookingFallback({ ok: false, error: "The calendar didn't load. Offer Michael's email or the Calendly link instead." }); });
    },
    select_booking_time: function (a) {
      a = a || {};
      if (!S.slots) return { ok: false, error: "Call show_booking_times first." };
      var s = findSlot(a.date, a.time);
      if (!s) return { ok: false, error: "That time is no longer available", alternatives: pickSlots(3).map(info) };
      selectSlot(s, TOOLS_IMPL.__fromTwin); return { ok: true, selected: info(s) };
    },
    fill_booking_details: function (a) {
      a = a || {}; var changed = [];
      ["name", "email", "phone", "notes"].forEach(function (k) { if (a[k] != null && String(a[k]).trim() !== "") { S.book[k] = String(a[k]).trim(); changed.push(k); } });
      if (S.slot && S.mode !== "details") go("details");
      else changed.forEach(function (k) { var el = $("#ap-" + k, body); if (el) el.value = S.book[k]; });
      changed.forEach(function (k) { var el = $("#ap-" + k, body); if (el) flash(el); });    // visitor sees Ava writing
      if (changed.length && inReview("book") && !reviewFresh("book")) { openReview("book", true); return { ok: true, form: formState(), still_needed: stillNeeded(), note: "The details changed, so the visitor must confirm again. Read the updated details back and ask whether everything is correct before calling confirm_booking." }; }
      return { ok: true, form: formState(), still_needed: stillNeeded() };
    },
    confirm_booking: function () {
      if (S.booked) return Promise.resolve({ ok: true, already_booked: true, when: S.booked.when });
      var missing = stillNeeded();
      if (missing.length) { if (S.review) { S.review = null; render({}); } setMsg("Still needed: " + missing.join(", ") + ".", true); return Promise.resolve({ ok: false, missing: missing, error: "Still needed before booking: " + missing.join(", ") }); }
      var fromTwin = TOOLS_IMPL.__fromTwin;
      // Never book on the first call: the visitor must see the details and say yes (to Ava) or press Yes (on the panel).
      if (!reviewFresh("book")) { openReview("book", fromTwin); return Promise.resolve(needConfirm()); }
      if (fromTwin && Date.now() - S.review.at < 4000) return Promise.resolve({ ok: false, booked: false, needs_confirmation: true, message: "Nothing is booked. The visitor has not answered yet. Wait for a clear yes before calling confirm_booking again." });
      if (!fromTwin && !S.review.ok) return Promise.resolve(needConfirm());
      if (S.demo) { S.doneMsg = "In a real conversation I'd confirm " + info(S.slot).label + " — and Calendly would email the invite."; go("booked"); return Promise.resolve({ ok: true, demo: true }); }
      busy(true); setMsg("Booking your call…");
      // A slot's token lasts 30 minutes: if the list is older than ~25, refetch and re-match the chosen time to its fresh token.
      return loadSlots(false, 25 * 60e3).then(function () { return null; }, function () { return null; })
        .then(function () { var f = (S.slots || []).filter(function (x) { return x.start_time === S.slot.start_time; })[0]; if (f) S.slot = f; return !f; })
        .then(function (gone) {
          if (gone) return { ok: false, retry: true, __status: 409, message: "That time is no longer held. Call show_booking_times again and offer fresh options." };
          return post("/api/ava-booking", { start_time: S.slot.start_time, token: S.slot.token, name: S.book.name.trim(), email: S.book.email.trim(), phone: S.book.phone.trim(), notes: S.book.notes.trim(), timezone: TZ, sessionId: (instance && instance.sessionId) || SESSION });
        })
        .then(function (r) {
          busy(false);
          if (r.ok && r.booked) {
            var when = r.when || info(S.slot).label; S.booked = { when: when };
            S.doneMsg = "Your strategy call with Michael is confirmed for " + when + ". Calendly has emailed your confirmation and calendar invite to " + S.book.email.trim() + ".";
            go("booked"); track("ava_booking_confirmed", {}); track("generate_lead", { lead_source: "ava_panel_booking" });
            if (!fromTwin) emit("Booking confirmed for " + when + ". Calendly emailed " + S.book.email.trim() + ".", true);   // she reacts aloud
            return clean(r);
          }
          if (r.retry || r.__status === 409) {
            setMsg("That time is no longer held — here are fresh options.");
            return wait(900).then(function () { return loadSlots(true); }).then(function () {
              S.slot = null; S.day = null; S.viewAll = false; go("days", { replace: true });
              return Object.assign(clean(r), { alternatives: pickSlots(3).map(info) });
            }, function () { return clean(r); });
          }
          if (r.stored) { S.doneMsg = "Michael has your details and will confirm a time with you directly."; go("booked"); return clean(r); }
          if (r.__status === 429) { setMsg("", true, 'Too many tries for now. Email <a href="mailto:michael@avataragency.ai">michael@avataragency.ai</a> or <a href="' + CAL + '" target="_blank" rel="noopener">pick a time on Calendly</a>.'); return clean(r); }
          setMsg("", true, 'Something went wrong. Email <a href="mailto:michael@avataragency.ai">michael@avataragency.ai</a> or <a href="' + CAL + '" target="_blank" rel="noopener">pick a time on Calendly</a>.');
          return bookingFallback(clean(r));
        });
    },

    // ── Panel-only tools (not given to the twin until her instructions mention them) ──
    show_home: function () { S.hist = []; go("home", { replace: true }); return { ok: true }; },
    show_service: function (a) {
      var id = a && a.service, s = SERVICES.filter(function (x) { return x.id === id; })[0];
      if (!s) { go("services"); return { ok: false, error: "Unknown service", services: SERVICES.map(function (x) { return { id: x.id, name: x.name }; }) }; }
      S.svc = id; go("service"); track("ava_service", { service: id });
      return { ok: true, service: s.name, summary: s.text, has_film: !!s.film, film_length: s.dur || null,
        note: s.film ? "The panel now shows this service with its sales film. The visitor chooses to play it — offer it, and stay quiet while it plays." : "The panel now shows this service." };
    },
    show_lead_form: function () { go("lead"); return { ok: true }; },
    submit_lead: function () {
      if (!S.lead.name.trim() || !validEmail(S.lead.email.trim())) { setMsg(!S.lead.name.trim() ? "Please add your name." : "Please enter a valid email.", true); return Promise.resolve({ ok: false }); }
      if (!reviewFresh("lead") || !S.review.ok) { openReview("lead", false); return Promise.resolve({ ok: false, needs_confirmation: true }); }
      if (S.demo) { S.doneMsg = "Demo — nothing was sent."; go("leadDone"); return Promise.resolve({ ok: true }); }
      busy(true); setMsg("Sending…");
      return post("/api/agent-lead", { name: S.lead.name.trim(), email: S.lead.email.trim(), phone: S.lead.phone.trim(), need: S.lead.need.trim(), source: "ava-panel", consent: true, consent_text: CONSENT_TEXT }).then(function (r) {
        busy(false);
        if (r.ok) { S.doneMsg = r.message || "Michael has your details and will be in touch soon."; go("leadDone"); track("generate_lead", { lead_source: "ava_panel_lead" }); return r; }
        setMsg("", true, 'That didn\'t go through. Email <a href="mailto:michael@avataragency.ai">michael@avataragency.ai</a> and we\'ll reply directly.'); return r;
      });
    },
    show_portfolio_form: function () { go("portfolio"); return { ok: true }; },
    submit_portfolio: function () {
      if (!S.pf.name.trim() || !validEmail(S.pf.email.trim())) { setMsg(!S.pf.name.trim() ? "Please add your first name." : "Please enter a valid email.", true); return Promise.resolve({ ok: false }); }
      if (!reviewFresh("pf") || !S.review.ok) { openReview("pf", false); return Promise.resolve({ ok: false, needs_confirmation: true }); }
      if (S.demo) { S.doneMsg = "Demo — nothing was sent."; go("portfolioDone"); return Promise.resolve({ ok: true }); }
      busy(true); setMsg("Sending your private link…");
      return post("/api/portfolio-signup", { name: S.pf.name.trim(), email: S.pf.email.trim(), company: "", hp: "", consent: true, consent_text: CONSENT_TEXT, source: "ava-panel" }).then(function (r) {
        busy(false);
        if (r.ok) { S.doneMsg = "Your private portfolio link is on its way to " + S.pf.email.trim() + ". (Not there? Check promotions or spam.)"; go("portfolioDone"); track("generate_lead", { lead_source: "ava_panel_portfolio" }); return r; }
        setMsg("", true, 'That didn\'t go through. Email <a href="mailto:michael@avataragency.ai?subject=Private%20portfolio">michael@avataragency.ai</a> for the link.'); return r;
      });
    },
  };
  function flash(el) { el.classList.add("flash"); setTimeout(function () { el.classList.remove("flash"); }, 1100); }

  var str = function (d) { return { type: "string", description: d }; };
  // Descriptions are verbatim from the spec — Ava's instructions were written against them.
  var TOOLS = [
    { name: "show_booking_times", description: "Show Michael's real open times for a free 30-minute strategy call on the booking panel beside you, which the visitor can see. Call this as soon as the visitor wants to book, schedule, or talk with Michael. view \"suggested\" shows three picks; \"all\" shows the full week. Read back two or three options in natural speech, never the whole list, and mention the time zone.",
      inputSchema: { type: "object", properties: { view: { type: "string", enum: ["suggested", "all"] }, date: str("Optional day to open, YYYY-MM-DD") } } },
    { name: "select_booking_time", description: "Select the time the visitor chose on the booking panel. Use the date (YYYY-MM-DD) and time (e.g. \"10:00 AM\") from show_booking_times. If it is no longer available, offer the returned alternatives.",
      inputSchema: { type: "object", properties: { date: str("YYYY-MM-DD, exactly as returned"), time: str("e.g. 10:00 AM, exactly as returned") }, required: ["date", "time"] } },
    { name: "fill_booking_details", description: "Fill in the booking form on the panel each time you learn a detail - name, email, phone number, or a short note about their business and what they want to discuss. Only include the fields you just learned. Read each detail back; spell the email back where it is unclear.",
      inputSchema: { type: "object", properties: { name: str("Full name"), email: str("Email address"), phone: str("Phone number"), notes: str("A short note about their business and what they want to discuss") } } },
    { name: "confirm_booking", description: "Book the strategy call. The first call never books: it shows the visitor their details for review and returns needs_confirmation. Then read back the time, name and email (spell the email), ask whether everything is correct, fix anything with fill_booking_details, and call confirm_booking again only after the visitor clearly says yes. Relay the returned message in your own words.",
      inputSchema: { type: "object", properties: {} }, annotations: { destructiveHint: true } },
  ];
  TOOLS.push({ name: "show_service", description: "Show one Avatar Agency service on the panel beside you, with its short sales film that the visitor can choose to play. Call it as soon as you start talking about a specific service, so the visitor sees what you are describing. Service ids: agents (talking AI agents like you), strategist (creative strategist), realestate (real estate agents and brokers), business (businesses and influencers), authors (authors and publishers), aro (AI referral optimization), claude (Claude coaching).",
    inputSchema: { type: "object", properties: { service: { type: "string", enum: SERVICES.map(function (s) { return s.id; }) } }, required: ["service"] } });
  function execTool(name, args) {
    var fn = TOOLS.some(function (t) { return t.name === name; }) && TOOLS_IMPL[name];   // the twin can only reach the contract tools
    if (!fn) return Promise.resolve({ ok: false, error: "Unknown tool " + name });
    TOOLS_IMPL.__fromTwin = true; track("ava_tool", { tool: name });
    var done = function (m) { TOOLS_IMPL.__fromTwin = false; return m; };
    try { return Promise.resolve(fn(args || {})).then(done, function (e) { return done({ ok: false, error: String(e && e.message || e) }); }); }
    catch (e) { return Promise.resolve(done({ ok: false, error: String(e && e.message || e) })); }
  }
  var AvaPanel = window.AvaPanel = {
    tools: TOOLS, exec: execTool, state: function () { return S; }, config: CFG,
    // Must run BEFORE sdk.init(): the SDK looks for document.modelContext for ~1.5 s and registers the tools mid-session.
    installModelContext: function () {
      var mc = document.modelContext || new EventTarget();
      mc.getTools = function () { return Promise.resolve(TOOLS.map(function (t) { return { name: t.name, description: t.description, inputSchema: t.inputSchema, annotations: t.annotations }; })); };
      mc.executeTool = function (tool, jsonArgs) {
        var args = {}; try { args = typeof jsonArgs === "string" ? JSON.parse(jsonArgs || "{}") : (jsonArgs || {}); } catch (e) {}
        return execTool(tool && tool.name ? tool.name : tool, args);
      };
      if (!document.modelContext) { try { Object.defineProperty(document, "modelContext", { value: mc, configurable: true }); } catch (e) { document.modelContext = mc; } }
      return mc;
    },
  };
  AvaPanel.installModelContext();   // harmless until a session starts; guarantees it exists before any sdk.init()

  /* ═════════ Ava's clip: muted loop (it's the cue to click), "Hear Ava" with captions ═════════ */
  // Timed to her voice (ffmpeg silencedetect on media/ava-intro.mp4): each line appears just before she says it and holds through short pauses.
  var LINES = [[0.62, 4.05, "Hey there — I'm Ava, and I'm not real."], [4.05, 8.4, "I'm a digital avatar created by AvatarAgency."], [8.4, 13.42, "When someone lands on this website, I'm the first one to say hello."],
    [13.42, 17.12, "I answer questions, I explain how everything works,"], [17.12, 20.8, "and when you're ready, I can book a call with the team for you."], [21.32, 26.5, "So tell me — what brought you here today?"]];
  var hearing = false, lastT = 0, visible = false, demoRun = 0;
  var capKey = "";
  // Redraw only when the text changes — rewriting it on every timeupdate restarted the fade-in, which read as flicker.
  function caption(lines) { var k = JSON.stringify(lines || []); if (k === capKey) return; capKey = k; capBox.innerHTML = (lines || []).map(function (l) { return '<span class="cap' + (l.you ? " you" : "") + '">' + (l.you ? "<b>You</b>" : "") + esc(l.text) + "</span>"; }).join(""); }
  function ensureSrc() { if (!vid.getAttribute("src")) { vid.src = vid.getAttribute("data-src"); } }
  function playQuiet() { if (RM || hearing || liveState !== "idle") return; ensureSrc(); vid.muted = true; var p = vid.play(); if (p && p.catch) p.catch(function () {}); }
  function stopHearing() { hearing = false; vid.muted = true; hearBtn.setAttribute("aria-pressed", "false"); $("use", hearBtn).setAttribute("href", "#i-vol"); $("span", hearBtn).textContent = "Hear Ava"; if (!demoRun) caption([]); if (RM) vid.pause(); }
  hearBtn.addEventListener("click", function () {
    if (liveState !== "idle") return;
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
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (liveState !== "idle") return; if (visible) playQuiet(); else { vid.pause(); if (hearing) stopHearing(); } }, { threshold: 0.25 }).observe(stage);
  }

  /* ═════════ "Talk to Ava" — the live conversation (Napster SDK 1.5.0; pattern proven on /thriving-twin/) ═════════
     Starts ONLY on this click (a user gesture — mic + autoplay policy, and every session is metered).
     Until Ava's agent exists, /api/ava-nv2-token answers 503 and the visitor gets a friendly note; the panel keeps working. */
  var mount = $("#ava-mount"), sdkLoading = null, capTimer = null, readyTimer = null, revealed = false;
  var htmlBg = getComputedStyle(document.documentElement).backgroundColor, bodyBg = getComputedStyle(document.body).backgroundColor;
  // The SDK injects `body,html{background:transparent}` the moment its SCRIPT loads — re-assert the real colors at every step.
  function pinBg() { document.documentElement.style.setProperty("background-color", htmlBg, "important"); document.body.style.setProperty("background-color", bodyBg, "important"); }
  function say_(text, ms) { toast.textContent = text; toast.hidden = !text; if (text && ms) setTimeout(function () { if (toast.textContent === text) toast.hidden = true; }, ms); }
  function setTalk(label, on) { $("span", talkBtn).textContent = label; talkBtn.disabled = liveState === "connecting"; talkBtn.classList.toggle("is-on", !!on); }
  function loadSdk() {
    if (window.napsterCompanionApiSDK || window.NapsterCompanionApiSdk) return Promise.resolve();
    if (sdkLoading) return sdkLoading;
    sdkLoading = new Promise(function (res, rej) { var s = document.createElement("script"); s.src = CFG.SDK_URL; s.onload = res; s.onerror = function () { sdkLoading = null; rej(new Error("sdk load")); }; document.body.appendChild(s); });
    return sdkLoading;
  }
  // onAvatarReady fires BEFORE the first frame paints; reveal only once a frame is really composited, or the visitor sees a black void.
  function waitForVideo(tries, cb) { var v = $("video", mount); if (v || tries <= 0) return cb(v); setTimeout(function () { waitForVideo(tries - 1, cb); }, 120); }
  function onFirstFrame(v, cb) {
    var fired = false, go_ = function () { if (!fired) { fired = true; cb(); } };
    setTimeout(go_, 6000); if (!v) return go_();
    if ("requestVideoFrameCallback" in v) { try { v.requestVideoFrameCallback(go_); return; } catch (e) {} }
    if (v.readyState >= 3) return go_(); v.addEventListener("playing", go_, { once: true }); v.addEventListener("loadeddata", go_, { once: true });
  }
  function armReveal() { if (!revealed && instance) waitForVideo(45, function (v) { onFirstFrame(v, reveal); }); }
  function reveal() {
    if (revealed || !instance) return; revealed = true; liveState = "live";
    if (readyTimer) { clearTimeout(readyTimer); readyTimer = null; }
    avStage.classList.add("live-ready"); say_("", 0); setTalk("End conversation", true); pinBg();
    track("ava_live_session", {});
  }
  function endedState(msg) {
    instance = null; revealed = false; liveState = "idle";
    [capTimer, readyTimer].forEach(function (t) { if (t) clearTimeout(t); }); capTimer = readyTimer = null;
    avStage.classList.remove("live", "live-ready"); mount.innerHTML = ""; setTalk("Talk to Ava", false);
    stage.classList.remove("is-live"); say_(msg || "", msg ? 9000 : 0); pinBg();
    if (visible) playQuiet();
  }
  function liveError(e) {
    var st = e && e.status;
    if (instance) { try { instance.destroy && instance.destroy(); } catch (x) {} }
    endedState(st === 503 || st === 404 ? "Ava's live conversation is arriving very soon. In the meantime, the panel beside her books real calls." :
      st === 429 || (st >= 500) ? "Ava's talking with other visitors right now — you can still book on the panel." :
      "I couldn't start the live conversation just now. The panel beside me still works.");
  }
  async function startLive() {
    if (liveState !== "idle") return;
    liveState = "connecting"; stopDemo(); if (hearing) stopHearing(); caption([]);
    setTalk("Connecting…", false); say_("Connecting to Ava…", 0); avStage.classList.add("live"); stage.classList.add("is-live");
    vid.pause(); readyTimer = setTimeout(function () { if (liveState === "connecting") say_("Almost there… allow the microphone if your browser asks.", 0); }, 5000);
    try {
      AvaPanel.installModelContext();                       // before init — the tools are registered from here
      await loadSdk(); pinBg();
      var res = await fetch(CFG.TOKEN_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
      if (!res.ok) { var err = new Error("token " + res.status); err.status = res.status; throw err; }
      var data = await res.json(); var sdk = window.napsterCompanionApiSDK || window.NapsterCompanionApiSdk;
      if (!sdk) throw new Error("sdk missing");
      pinBg();
      instance = await sdk.init(data.token, {
        mountContainer: "#ava-mount", avatarStyle: { view: "rectangle" }, debug: /[?&]debug\b/.test(location.search),
        features: { showSDKLoader: { enabled: false }, screenShare: { enabled: true }, pictureInPicture: { enabled: true } },
        onAvatarReady: armReveal, onDestroy: function () { endedState(""); },
      });
      instance.showAvatar(); pinBg();
      setTimeout(function () { if (instance) armReveal(); }, 3000);       // some browsers never fire onAvatarReady cleanly
      capTimer = setTimeout(function () { if (instance) { try { instance.destroy && instance.destroy(); } catch (e) {} } endedState("That's the ten-minute limit — press Talk to Ava to keep going."); }, CFG.CAP_S * 1000);
      emit(panelSummary(), false);
    } catch (e) { liveError(e); }
  }
  talkBtn.addEventListener("click", function () {
    if (liveState === "live") { if (instance) { try { instance.destroy && instance.destroy(); } catch (e) {} } endedState(""); return; }
    startLive();
  });

  /* ═════════ The scripted demo ("Watch a 30-second demo") — never posts anything ═════════ */
  function demoLabel(on) { demoBtn.textContent = on ? "Stop demo" : "Watch a 30-second demo"; }
  function stopDemo() { if (!demoRun) return; demoRun = 0; S.demo = false; demoLabel(false); caption([]); S.hist = []; S.slot = null; S.booked = null; S.viewAll = false; S.book = { name: "", email: "", phone: "", notes: "" }; go("home", { replace: true }); }
  function typeInto(id, text, run) {
    var el = $("#ap-" + id, body); if (!el) return Promise.resolve();
    el.classList.add("flash"); var i = 0;
    return new Promise(function (res) { (function tickType() { if (run !== demoRun) return res(); el.value = text.slice(0, ++i); if (i < text.length) setTimeout(tickType, 45); else { el.classList.remove("flash"); res(); } })(); });
  }
  demoBtn.addEventListener("click", function () {
    if (demoRun) { stopDemo(); return; }
    if (liveState !== "idle") return;
    if (hearing) stopHearing();
    var run = demoRun = Date.now(); S.demo = true; S.hist = []; S.booked = null; S.slot = null; S.viewAll = false; S.book = { name: "", email: "", phone: "", notes: "" };
    demoLabel(true); track("ava_demo", {}); playQuiet();
    var alive = function () { return run === demoRun; };
    var say = function (who, text, ms) { if (!alive()) return Promise.reject("stopped"); caption(who === "you" ? [{ text: text, you: true }] : [{ text: text }]); return wait(ms); };
    var pick;
    go("home", { replace: true });
    say("ava", "Hi, I'm Ava, AvatarAgency's AI agent. What brings you here today?", 2600)
      .then(function () { return say("you", "I'd like to talk to Michael about a digital twin.", 1500); })
      .then(function () { var b = $('[data-act="book"]', body); if (b) flash(b); return wait(900); })
      .then(function () { if (!alive()) throw "stopped"; return TOOLS_IMPL.show_booking_times({ view: "suggested" }); })
      .then(function () { return say("ava", "Happy to set that up. Here are three times Michael has open.", 2700); })
      .then(function () {
        pick = pickSlots(3); pick = pick[Math.min(1, pick.length - 1)]; if (!pick) throw "stopped";
        var chip = $('[data-slot="' + pick.start_time + '"]', body); if (chip) flash(chip);
        return say("you", fmtWeekday(pick.start_time) + " at " + fmtTime(pick.start_time) + " works.", 1700);
      })
      .then(function () { if (!alive()) throw "stopped"; selectSlot(pick, true); return say("ava", "Perfect. What's your name and the best email for the invite?", 2400); })
      .then(function () { caption([{ text: "Jordan Lee — jordan@example.com", you: true }]); return typeInto("name", "Jordan Lee", run); })
      .then(function () { return typeInto("email", "jordan@example.com", run); })
      .then(function () { S.book.name = "Jordan Lee"; S.book.email = "jordan@example.com"; if (!alive()) throw "stopped"; return TOOLS_IMPL.confirm_booking({}); })
      .then(function () { return say("ava", fmtWeekday(pick.start_time) + " at " + fmtTime(pick.start_time) + ", Jordan Lee, jordan@example.com — is all of that correct?", 3200); })
      .then(function () { return say("you", "Yes, that's right.", 1300); })
      .then(function () { if (!alive()) throw "stopped"; var y = $('[data-act="review-yes"]', body); if (y) flash(y); if (S.review) S.review.ok = true; return wait(800); })
      .then(function () { if (!alive()) throw "stopped"; return TOOLS_IMPL.confirm_booking({}); })
      .then(function () { return say("ava", "You're all set — Calendly emails the invite. That's me at work.", 3300); })
      .then(function () { return say("ava", "Now it's your turn. Tap any option to try the real thing.", 2600); })
      .then(function () { if (alive()) { stopDemo(); pulseActions(); } })
      .catch(function () { /* stopped */ });
  });

  render({});
})();
