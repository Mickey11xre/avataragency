/* ETHICA's stage on the redesigned landing page /ethica/thrive/new/ (preview; Michael, 2026-10-23). Built from
 * /clients/accu/accu-stage.js (same look, panel and live-session code), with Ethica's own panel and the current
 * /ethica/thrive/ free-minutes gate.
 *
 * Panel (Michael, 10-23): The PDR Framework · The schemes she fights · The Fraud Fighter Collection (merch) · Subscribe,
 * plus the fleet-standard Book a call (Michael's real Calendly, Ava's engine) and Leave my contact info (10-24).
 * The visitor can tap them, and Ethica opens them herself when the conversation turns to them (page tools below).
 *
 * ACCESS (from /ethica/thrive/ build:v6; Michael 10-24: 15 minutes, was 5): anonymous = 15 minutes once per browser → register;
 * registered = 15 minutes a day for 7 days → subscribe (Starter $9 / Guardian $19 a month, from subscribe.html). localStorage keys `ethica_user` / `ethica_anon`
 * are shared with the current page, register.html and subscribe.html. `?demo` seeds a throwaway registered session.
 *
 * Live: NV2 Ethica through the public, origin-checked /api/ethica-nv2-token (503 until her agent id is set there).
 * ⚠️ The TOOL NAMES below must match her agent instructions: livebrand-ops/ethica-nv2/HANDOFF_ETHICA_NV2_PAGE_TOOLS.md.
 */
(function () {
  "use strict";
  var stage = document.getElementById("ethica-stage");
  if (!stage) return;
  var RM = document.documentElement.classList.contains("rm");
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var track = function (n, p) { try { if (window.gtag) gtag("event", n, p || {}); } catch (e) {} };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var CFG = {
    TOKEN_ENDPOINT: stage.getAttribute("data-token") || "/api/ethica-nv2-token",
    SEEN_PATH: stage.getAttribute("data-seen-path") || "/api",
    SDK_URL: "https://cdn.jsdelivr.net/npm/@touchcastllc/napster-companion-api@1.5.0/lib/index.standalone.js",
    REGISTER: "/ethica/thrive/register.html", SUBSCRIBE: "/ethica/thrive/subscribe.html",
    INTRO_END: 22.2,     // media/ethica-intro.mp4 is 23.04 s: speech ends at about 21.6 s
    SOURCE: "ethica-panel",
  };
  /* Fleet #4, booking + lead capture (Michael, 10-24): Ava's REAL engine, unchanged. /api/ava-availability = Michael's open
     Calendly times (each slot signed), /api/ava-booking = POST /invitees (Calendly sends the invite) + the 🔥 alert,
     /api/agent-lead = the contact form (+ "Request a callback"), alerts to michael@avataragency.ai. */
  var CAL = "https://calendly.com/michaelrivera007/free-consultation-meeting";
  var TZ = (function () { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || "America/Los_Angeles"; } catch (e) { return "America/Los_Angeles"; } })();
  var TZ_NAME = TZ.replace(/_/g, " ");
  var SESSION = Math.random().toString(36).slice(2) + Date.now().toString(36);

  var avStage = $(".stage-av", stage), vid = $(".ava-video", stage), capBox = $(".ava-caption", stage), hearBtn = $(".ava-sound", stage),
    talkBtn = $(".ava-talk", stage), toast = $(".ava-toast", stage), mount = $("#ethica-mount"), timerEl = $(".eth-timer", stage);
  var panel = $("#ethica-panel"), body = $(".panel-body", panel), titleEl = $(".panel-title", panel), backBtn = $(".panel-back", panel);
  var instance = null, liveState = "idle";   // idle | connecting | live

  /* ═════════ Content (word for word from the current /ethica/thrive/ page) ═════════ */
  var IC = {
    shield: '<svg viewBox="0 0 24 24"><path d="M12 3.5 5 6.2v5.3c0 4.3 3 7.9 7 9 4-1.1 7-4.7 7-9V6.2z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="m9 12 2.2 2.2L15.5 10" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    alert: '<svg viewBox="0 0 24 24"><path d="M12 4 3 19.5h18z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M12 10v4.2M12 17v.01" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    shirt: '<svg viewBox="0 0 24 24"><path d="M8.5 4 4 6.5l1.8 4 2-1V20h8.4V9.5l2 1 1.8-4L15.5 4a3.5 3.5 0 0 1-7 0z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
    star: '<svg viewBox="0 0 24 24"><path d="m12 4 2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 16.4l-4.8 2.5.9-5.4-3.9-3.8 5.4-.8z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
    ext: '<svg viewBox="0 0 24 24" width="14" height="14"><path d="M14 5h5v5M19 5l-8 8M18 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    arrow: '<svg><use href="#i-arrow"/></svg>',
    cal: '<svg viewBox="0 0 24 24"><rect x="4" y="5.5" width="16" height="14.5" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    chat: '<svg viewBox="0 0 24 24"><path d="M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 19 16.5h-7l-4.5 3.5v-3.5H5A1.5 1.5 0 0 1 3.5 15V7A1.5 1.5 0 0 1 5 5.5z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
  };
  var PDR = {
    lead: "Every fraud Ethica fights is met the same way — prevent it before it starts, detect it while it's happening, and remediate the damage once it's found.",
    items: [
      { id: "prevention", n: "01", name: "Prevention", text: "Policies, password controls, approved vendor lists, and internal controls put in place before fraud has a chance to occur." },
      { id: "detection", n: "02", name: "Detection", text: "Forensic accounting, data analysis, audit trails, and anomaly detection to spot fraud in progress before losses mount." },
      { id: "remediation", n: "03", name: "Remediation", text: "Restoring financial integrity, recovering losses, reporting to the right authorities, and educating victims so it never happens twice." },
    ],
  };
  var SCHEMES = {
    lead: "Know the threats. Then beat them.",
    items: [
      { id: "money_laundering", name: "Money Laundering", text: "Making illegally obtained money look legitimate through complex layered transactions." },
      { id: "pyramid_schemes", name: "Pyramid Schemes", text: "Fraudulent structures paying \"returns\" with new investor money rather than real profit." },
      { id: "investment_scams", name: "Investment Scams", text: "False promises of high returns engineered to steal investor funds." },
      { id: "counterfeit_currency", name: "Counterfeit Currency", text: "Fake money pushed into circulation to defraud businesses and individuals." },
      { id: "corporate_fraud", name: "Corporate Fraud", text: "Manipulated records, false reporting, and embezzlement by company insiders." },
      { id: "point_of_sale_theft", name: "Point-of-Sale Theft", text: "Employees skimming registers or manipulating sales transactions." },
      { id: "credit_card_fraud", name: "Credit Card Fraud", text: "Unauthorized use of payment information to make fraudulent purchases." },
      { id: "embezzlement", name: "Embezzlement", text: "Trusted insiders diverting company funds for personal gain over time." },
    ],
  };
  var MERCH = {
    lead: "Wear the mission. Official Ethica gear for everyone who believes fraud dies and truth thrives.",
    items: [
      { id: "logo_tee", name: "Ethica Logo Tee", tag: "ETHICA logo · heather grey · fitted tee", price: "$29",
        img: "https://cdn.printful.me/t/quick-stores/variants/w339/164908836a51afe739296__825", url: "https://ethica.printful.me/product/ethica-logo-tee" },
      { id: "liar_catcher_tee", name: "Ethica Liar Catcher Tee", tag: "\"Let ETHICA help you catch that LIAR!\" · navy, royal blue & grey", price: "$29",
        img: "https://cdn.printful.me/t/quick-stores/variants/w339/164908566a5146c58838c__825", url: "https://ethica.printful.me/product/ethica-liar-catcher-tee" },
      { id: "crop_hoodie", name: "Ethica Crop Hoodie", tag: "Military green & peach · women's crop hoodie", price: "$49",
        img: "https://cdn.printful.me/t/quick-stores/variants/w339/164907876a5145d08fc56__825", url: "https://ethica.printful.me/product/ethica-crop-hoodie" },
    ],
  };
  // From the live /ethica/thrive/subscribe.html (Michael, 10-24: the July tiers; never mention the removed $39 Defender).
  var PLANS = [
    { id: "starter", name: "Starter", price: "$9", minutes: "60 minutes a month · live conversations, fraud prevention and detection questions, PDR guidance" },
    { id: "guardian", name: "Guardian", price: "$19", minutes: "180 minutes a month · everything in Starter, with three times the conversation time", top: true },
  ];
  var findIn = function (list, id) { return list.items.filter(function (x) { return x.id === id; })[0] || null; };

  /* ═════════ Free minutes (ported from /ethica/thrive/ build:v6, same keys) ═════════ */
  var get = function (k) { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch (e) { return null; } };
  var put = function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  var todayKey = function () { return new Date().toISOString().slice(0, 10); };
  var FREE_SECONDS = 900;   // Michael, 10-24: 15 free minutes (anonymous once; registered per day), was 300
  var GATE_V = 2;           // records without gateV 2 were written under the 5-minute gate: topped up once to 15
  // { stage: "anonymous"|"registered", seconds } or { stage: "blocked", why: "free_used"|"trial_over"|"day_used" }
  function grantAccess() {
    var user = get("ethica_user");
    if (user && user.email) {
      var days = user.trialDays || 7, start = Date.parse(user.registeredAt || "") || Date.now();
      var dayNum = Math.floor((Date.now() - start) / 86400000) + 1;
      if (dayNum > days) return { stage: "blocked", why: "trial_over" };
      var k = todayKey();
      // One-time top-up to the 15-minute allowance (records written under the old 5-minute gate have no gateV 2).
      if (user.gateV !== GATE_V) { user.dailySeconds = FREE_SECONDS; user.dayKey = k; user.daySecondsLeft = FREE_SECONDS; user.gateV = GATE_V; put("ethica_user", user); }
      if (user.dayKey !== k) { user.dayKey = k; user.daySecondsLeft = user.dailySeconds || FREE_SECONDS; put("ethica_user", user); }
      if ((user.daySecondsLeft || 0) <= 0) return { stage: "blocked", why: "day_used" };
      return { stage: "registered", seconds: user.daySecondsLeft, day: dayNum, days: days };
    }
    var anon = get("ethica_anon");
    if (!anon || anon.gateV !== GATE_V) { anon = { secondsLeft: FREE_SECONDS, used: false, gateV: GATE_V }; put("ethica_anon", anon); }
    if (anon.used || anon.secondsLeft <= 0) return { stage: "blocked", why: "free_used" };
    return { stage: "anonymous", seconds: anon.secondsLeft };
  }
  var access = null, secondsLeft = 0, tickTimer = null;
  var mmss = function (s) { s = Math.max(0, s); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); };
  function showTimer() {
    if (!timerEl) return;
    var on = liveState !== "idle" && access && access.stage !== "blocked";
    timerEl.hidden = !on; if (!on) return;
    timerEl.textContent = mmss(secondsLeft) + (access.stage === "anonymous" ? " free" : " left today");
    timerEl.classList.toggle("warn", secondsLeft <= 60 && secondsLeft > 30); timerEl.classList.toggle("crit", secondsLeft <= 30);
  }
  function persist() {
    if (!access) return;
    if (access.stage === "anonymous") put("ethica_anon", { secondsLeft: Math.max(0, secondsLeft), used: secondsLeft <= 0, gateV: GATE_V });   // keep gateV, or every visit tops up again
    else if (access.stage === "registered") { var u = get("ethica_user"); if (u) { u.daySecondsLeft = Math.max(0, secondsLeft); put("ethica_user", u); } }
  }
  function startClock() {
    stopClock(); showTimer();
    tickTimer = setInterval(function () {
      if (liveState !== "live") return;      // only count time she is actually on screen
      secondsLeft--; showTimer(); if (secondsLeft % 10 === 0) persist();
      if (secondsLeft <= 0) {
        persist(); var was = access.stage; endLive("");
        S.out = was === "anonymous" ? "free_used" : "day_used"; go("subscribe"); track("ethica_time_up", { stage: was });
      }
    }, 1000);
  }
  function stopClock() { if (tickTimer) { clearInterval(tickTimer); tickTimer = null; } if (access && liveState !== "idle") persist(); }

  /* ═════════ State + rendering ═════════ */
  var S = { mode: "home", hist: [], pillar: null, scheme: null, product: null, out: null,
    slots: null, slotsAt: 0, slotsErr: null, day: null, slot: null, viewAll: false, booked: null, review: null, busy: false, doneMsg: "",
    book: { name: "", email: "", phone: "", notes: "" }, lead: { name: "", email: "", phone: "", need: "", callback: false } };
  var BOOK_TITLE = "Book a call with Avatar Agency";
  var TITLES = { home: "How can I help?", pdr: "The PDR Framework", schemes: "The schemes she fights", scheme: "The schemes she fights",
    merch: "The Fraud Fighter Collection", subscribe: "Keep talking to Ethica",
    days: BOOK_TITLE, times: BOOK_TITLE, details: BOOK_TITLE, booked: "You're booked", lead: "Leave your contact info", leadDone: "Thank you" };
  /* Memory (fleet #2): aa_ethica_seen (set when a live session really starts) + aa_ethica_name = the first name the
     visitor typed into the booking or contact form. /api/ethica-nv2-token reads both: a returning visitor is welcomed back
     by name (externalClientProfile). Path=/api so they reach the token endpoint; first-party, this browser only. */
  function rememberName(full) {
    var first = (String(full || "").trim().split(/\s+/)[0] || "").replace(/[^A-Za-zÀ-ÖØ-öø-ÿ'-]/g, "").slice(0, 30);
    // Path=/ (10-24): the page must READ it too (to know whether Ethica should ask), and /api still receives it.
    if (first) { try { document.cookie = "aa_ethica_name=" + encodeURIComponent(first) + "; Path=/; Max-Age=31536000; Secure; SameSite=Lax"; } catch (e) {} }
    return first;
  }
  function knownName() {
    var m = document.cookie.match(/(?:^|;\s*)aa_ethica_name=([^;]{1,90})/); if (!m) return "";
    try { return decodeURIComponent(m[1]).replace(/[^A-Za-zÀ-ÖØ-öø-ÿ'-]/g, "").slice(0, 30); } catch (e) { return ""; }
  }

  /* ═════════ Booking + contact helpers (from home-next/ava-panel.js) ═════════ */
  var tr = function (v) { return String(v || "").trim(); };
  var validEmail = function (e) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e); };
  var wait = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  var CONSENT_TEXT = "By submitting, you agree that AvatarAgency may email you additional information about our services, offers and promotions. You can unsubscribe at any time.";
  var CONSENT = '<p class="p-consent">' + CONSENT_TEXT + ' <a href="/privacy" target="_blank" rel="noopener">Privacy Policy</a></p>';
  // Field ids keep Ava's "ap-" prefix: stages.css hides Phone's "(optional)" via #ap-lcallback:checked.
  var field = function (id, label, type, val, opt, attrs) {
    return '<div class="p-field"><label for="ap-' + id + '">' + label + (opt ? " <span>(optional)</span>" : "") + "</label>" +
      (type === "textarea" ? '<textarea id="ap-' + id + '" rows="3" ' + (attrs || "") + ">" + esc(val) + "</textarea>"
        : '<input id="ap-' + id + '" type="' + type + '" value="' + esc(val) + '" ' + (attrs || "") + ">") + "</div>";
  };
  var hp = '<div class="hp" aria-hidden="true"><label>Leave this empty<input name="hp" tabindex="-1" autocomplete="off"></label></div>';
  var steps = function (n) { return '<div class="p-steps" aria-hidden="true">' + [1, 2, 3].map(function (i) { return '<span class="' + (i <= n ? "on" : "") + '"></span>'; }).join("") + "</div>"; };
  function dayKey(iso) { return new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(iso)); }
  function fmtDay(iso, long) { return new Date(iso).toLocaleDateString("en-US", { timeZone: TZ, weekday: long ? "long" : "short", month: "short", day: "numeric" }); }
  function fmtTime(iso) { return new Date(iso).toLocaleTimeString("en-US", { timeZone: TZ, hour: "numeric", minute: "2-digit" }); }
  function tzShort() { try { return new Date().toLocaleTimeString("en-US", { timeZone: TZ, timeZoneName: "short" }).split(" ").pop(); } catch (e) { return ""; } }
  function fmtLabel(iso) { return new Date(iso).toLocaleDateString("en-US", { timeZone: TZ, weekday: "long", month: "long", day: "numeric" }) + " at " + fmtTime(iso); }
  function info(s) { return { date: dayKey(s.start_time), time: fmtTime(s.start_time), label: fmtLabel(s.start_time) }; }
  function days() {
    var map = {}, order = [];
    (S.slots || []).forEach(function (s) { var k = dayKey(s.start_time); if (!map[k]) { map[k] = []; order.push(k); } map[k].push(s); });
    return order.map(function (k) { return { key: k, slots: map[k], label: fmtDay(map[k][0].start_time) }; });
  }
  function pickSlots(n) {
    var out = [], d = days();
    d.forEach(function (x) { if (out.length < n) out.push(x.slots[Math.min(1, x.slots.length - 1)]); });
    (S.slots || []).forEach(function (s) { if (out.length < n && out.indexOf(s) < 0) out.push(s); });
    return out.sort(function (a, b) { return Date.parse(a.start_time) - Date.parse(b.start_time); });
  }
  var normTime = function (t) { return String(t || "").toLowerCase().replace(/\s+/g, "").replace(/^0(\d:)/, "$1"); };
  function findSlot(date, time) { return (S.slots || []).filter(function (s) { return dayKey(s.start_time) === date && normTime(fmtTime(s.start_time)) === normTime(time); })[0] || null; }

  /* "Is this correct?" — nothing is booked or sent until the visitor confirms what is on screen. */
  var REVIEW_MODE = { book: "details", lead: "lead" };
  function sigOf(k) {
    if (k === "book") return [S.slot ? S.slot.start_time : "", tr(S.book.name), tr(S.book.email).toLowerCase(), tr(S.book.phone), tr(S.book.notes)].join("|");
    return [tr(S.lead.name), tr(S.lead.email).toLowerCase(), tr(S.lead.phone), tr(S.lead.need), S.lead.callback ? "cb" : ""].join("|");
  }
  var inReview = function (k) { return !!(S.review && S.review.kind === k); };
  var reviewFresh = function (k) { return inReview(k) && S.review.sig === sigOf(k); };
  function reviewRows(k) {
    var r = k === "book" ? [["Time", S.slot ? info(S.slot).label + " " + tzShort() : ""], ["Name", S.book.name], ["Email", S.book.email], ["Phone", S.book.phone], ["Note", S.book.notes]]
      : [["Name", S.lead.name], ["Email", S.lead.email], ["Phone", S.lead.phone], ["Callback", S.lead.callback ? "Yes, please call me" : ""], ["What you need", S.lead.need]];
    return r.filter(function (x) { return tr(x[1]); });
  }
  function reviewCard(k) {
    var yes = k === "book" ? "Yes, book my call" : "Yes, send to Michael";
    return (k === "book" ? steps(3) : "") + '<div class="p-review"><p class="p-label">Is this correct?</p><dl class="p-rv">' +
      reviewRows(k).map(function (x) { return "<div><dt>" + x[0] + "</dt><dd>" + esc(tr(x[1])) + "</dd></div>"; }).join("") +
      '</dl><p class="p-sub">Please check your details. Nothing is ' + (k === "book" ? "booked" : "sent") + ' until you confirm.</p><div class="p-rv-acts"><button class="btn btn-gold btn-sm p-go" type="button" data-act="review-yes">' + yes + " " + IC.arrow +
      '</button><button class="btn btn-ghost btn-sm" type="button" data-act="review-edit">Edit</button></div>' + (k === "book" ? "" : CONSENT) + '<p class="p-msg" role="status"></p></div>';
  }
  function openReview(k, fromTwin) {
    if (S.mode !== REVIEW_MODE[k]) go(REVIEW_MODE[k]);
    S.review = { kind: k, sig: sigOf(k), at: Date.now(), ok: false }; render({});
    var b = $('[data-act="review-yes"]', body); if (b && !fromTwin) b.focus({ preventScroll: true });
    if (fromTwin) return;
    var list = reviewRows(k).map(function (x) { return x[0].toLowerCase() + " " + tr(x[1]); }).join(", ");
    emit(k === "book"
      ? "The visitor pressed Confirm. Nothing is booked yet: the panel is showing their details for review (" + list + "). Read the time, name and email back to them, spelling the email, and ask whether everything is correct. Fix anything they correct with fill_booking_details. Book only after a clear yes, with confirm_booking, or when they press Yes on the panel."
      : "The visitor is reviewing their details for Avatar Agency (" + list + "). Nothing is sent yet. Read the email back and ask whether it is correct. It is sent only when they press Yes on the panel.", true);
  }
  /* Tells the live Ethica what the visitor just did on the panel. "[Ethica panel]" is the prefix her instructions react
     to; speak=true only when she should answer aloud. */
  var emit = function (text, speak) {
    if (!instance || !instance.sendCommand) return;
    try { instance.sendCommand({ type: "send_message", data: { text: "[Ethica panel] " + text, role: "system", trigger_response: !!speak } }); } catch (e) {}
  };
  function go(mode, opts) { opts = opts || {}; if (!opts.replace && S.mode !== mode) S.hist.push(S.mode); S.mode = mode; render(opts); }
  function goBack() { S.mode = S.hist.pop() || "home"; render({}); }
  backBtn.addEventListener("click", goBack);
  function act(id, icon, title, sub) { return '<button class="p-act" type="button" data-act="' + id + '"><i>' + icon + "</i><span><b>" + title + "</b><small>" + sub + "</small></span>" + IC.arrow + "</button>"; }

  var VIEWS = {
    home: function () {
      return '<p class="p-sub">Tap an option below — or press Talk to Ethica to speak with her.</p><div class="p-actions">' +
        act("pdr", IC.shield, "The PDR Framework", "Prevention · Detection · Remediation") +
        act("schemes", IC.alert, "The schemes she fights", "Laundering, pyramids, scams and more") +
        act("merch", IC.shirt, "The Fraud Fighter Collection", "Official Ethica tees and hoodie") +
        act("subscribe", IC.star, "Subscribe", "Plans from $9 a month") +
        // Fleet #4 (standard on every stage): book + contact info.
        act("book", IC.cal, "Book a call with Avatar Agency", "Want an avatar like Ethica? 30 min with Michael") +
        act("lead", IC.chat, "Leave my contact info", "Avatar Agency gets back to you") + "</div>";
    },
    days: function () {
      if (S.slotsErr && !S.slots) return '<p class="p-msg err">I couldn\'t load Michael\'s calendar just now.</p><a class="btn btn-gold btn-sm p-go" href="' + CAL + '" target="_blank" rel="noopener">Pick a time on Calendly ' + IC.arrow + "</a>";
      if (!S.slots) return steps(1) + '<p class="p-sub">Checking Michael\'s calendar…</p>';
      var d = days();
      if (!d.length) return '<p class="p-sub">Michael\'s calendar is full this week.</p><a class="btn btn-gold btn-sm p-go" href="' + CAL + '" target="_blank" rel="noopener">See later dates ' + IC.arrow + "</a>";
      if (!S.viewAll) {
        return steps(1) + '<p class="p-label">Suggested times · ' + esc(tzShort()) + '</p><div class="p-picks">' + pickSlots(3).map(function (s) {
          return '<button class="p-chip p-pick" type="button" data-slot="' + s.start_time + '">' + esc(fmtDay(s.start_time)) + "<small>" + esc(fmtTime(s.start_time)) + "</small></button>";
        }).join("") + '</div><button class="link p-week" type="button" data-act="week">See the whole week ' + IC.arrow + '</button><p class="p-sub">A free 30-minute strategy call with Michael Rivera of Avatar Agency, about an AI avatar like Ethica for your business.</p>';
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
        '<button class="btn btn-gold btn-sm p-go" type="submit">Confirm my call ' + IC.arrow + '</button><p class="p-msg" role="status"></p></form>';
    },
    booked: function () {
      return '<div class="p-done"><span class="tick">✓</span><h4>You\'re all set.</h4><p>' + esc(S.doneMsg || "") + '</p><button class="btn btn-ghost btn-sm" type="button" data-act="home">Back to Ethica</button></div>';
    },
    lead: function () {
      if (inReview("lead")) return reviewCard("lead");
      return '<p class="p-sub">Tell us a little about what you need. Michael Rivera of Avatar Agency will be in touch.</p><form class="p-form" novalidate>' +
        field("lname", "Your name", "text", S.lead.name, false, 'autocomplete="name" required data-bind="lead.name"') +
        field("lemail", "Email", "email", S.lead.email, false, 'autocomplete="email" required data-bind="lead.email"') +
        field("lphone", "Phone", "tel", S.lead.phone, true, 'autocomplete="tel" data-bind="lead.phone"') +
        '<label class="p-check"><input type="checkbox" id="ap-lcallback" data-bind="lead.callback"' + (S.lead.callback ? " checked" : "") + '><span>Request a callback</span></label>' +
        field("lneed", "What can we help with?", "textarea", S.lead.need, true, 'data-bind="lead.need"') + hp +
        '<button class="btn btn-gold btn-sm p-go" type="submit">Send to Michael ' + IC.arrow + '</button>' + CONSENT + '<p class="p-msg" role="status"></p></form>';
    },
    leadDone: function () { return '<div class="p-done"><span class="tick">✓</span><h4>Got it.</h4><p>' + esc(S.doneMsg || "") + '</p><button class="btn btn-ghost btn-sm" type="button" data-act="home">Back to Ethica</button></div>'; },
    pdr: function () {
      return '<p class="p-sub">' + esc(PDR.lead) + '</p><div class="eth-pillars">' + PDR.items.map(function (p) {
        return '<div class="eth-pillar' + (S.pillar === p.id ? " on" : "") + '" data-pillar="' + p.id + '"><span class="n">' + p.n + "</span><div><h4><b>" + p.name.charAt(0) + "</b>" + esc(p.name.slice(1)) + "</h4><p>" + esc(p.text) + "</p></div></div>";
      }).join("") + "</div>";
    },
    schemes: function () {
      return '<p class="p-sub">' + esc(SCHEMES.lead) + '</p><div class="p-svcs">' + SCHEMES.items.map(function (x) {
        return '<button class="p-svc' + (S.scheme === x.id ? " on" : "") + '" type="button" data-scheme="' + x.id + '"><span>' + esc(x.name) + "</span>" + IC.arrow + "</button>";
      }).join("") + "</div>";
    },
    scheme: function () {
      var x = findIn(SCHEMES, S.scheme) || SCHEMES.items[0];
      return '<div class="p-card"><div><h4>' + esc(x.name) + "</h4><p>" + esc(x.text) + '</p></div></div><p class="p-sub">Ask Ethica how to spot it — and what to do if it is already happening.</p>';
    },
    merch: function () {
      return '<p class="p-sub">' + esc(MERCH.lead) + '</p><div class="eth-merch">' + MERCH.items.map(function (m) {
        return '<div class="eth-prod' + (S.product === m.id ? " on" : "") + '" data-product="' + m.id + '"><img src="' + m.img + '" alt="' + esc(m.name) + '" loading="lazy"><div><h4>' + esc(m.name) + "</h4><small>" + esc(m.tag) + '</small><div class="eth-prod-row"><b>' + m.price +
          '</b><a class="btn btn-gold btn-sm" href="' + m.url + '" target="_blank" rel="noopener" data-buy="' + m.id + '">Get yours ' + IC.ext + "</a></div></div></div>";
      }).join("") + '</div><p class="p-sub eth-fine">Secure checkout &amp; worldwide fulfillment by Printful · Merch storefronts by LiveBrand.ai</p>';
    },
    subscribe: function () {
      var a = grantAccess(), note;
      if (S.out === "free_used" || a.why === "free_used") note = "Your free session has ended. Register for free to talk with Ethica fifteen minutes a day for seven days — or choose a plan.";
      else if (S.out === "day_used" || a.why === "day_used") note = "That's today's fifteen minutes. Come back tomorrow — or choose a plan.";
      else if (a.why === "trial_over") note = "Your seven-day trial is over. Subscribe to keep talking to Ethica.";
      else if (a.stage === "anonymous") note = "Your first conversation is free: " + mmss(a.seconds) + " left.";
      else note = "Day " + a.day + " of " + a.days + " of your free trial: " + mmss(a.seconds) + " left today.";
      var anon = !get("ethica_user");
      // The plans are the live subscribe.html's (Stripe checkout lives there): Starter $9 / 60 min, Guardian $19 / 180 min.
      return '<p class="p-sub">' + esc(note) + '</p><div class="eth-plans">' + PLANS.map(function (p) {
          return '<a class="eth-plan' + (p.top ? " top" : "") + '" href="' + CFG.SUBSCRIBE + '" data-sub="' + p.id + '">' + (p.top ? '<span class="eth-plan-tag">Most popular</span>' : "") +
            "<h4>" + p.name + '</h4><div class="eth-price"><b>' + p.price + "</b><span>per month</span></div><small>" + esc(p.minutes) + "</small></a>";
        }).join("") + "</div>" +
        (anon ? '<div class="p-svc-actions"><a class="btn btn-ghost btn-sm" href="' + CFG.REGISTER + '" data-sub="register">Register free · 15 min a day for 7 days</a></div>' : "") +
        '<p class="p-sub eth-fine">Minutes count only during a live conversation. Cancel anytime. Secured by Stripe.</p>';
    },
  };
  function render(opts) {
    opts = opts || {};
    titleEl.textContent = S.mode === "scheme" ? ((findIn(SCHEMES, S.scheme) || {}).name || TITLES.schemes) : (TITLES[S.mode] || "Ethica");
    panel.classList.toggle("is-home", S.mode === "home");
    backBtn.hidden = S.mode === "home";
    body.innerHTML = (VIEWS[S.mode] || VIEWS.home)();
    body.scrollTop = 0;
    body.style.animation = "none"; void body.offsetWidth; body.style.animation = "";
    var on = $(".on", body); if (on && !/^(days|times)$/.test(S.mode)) { flash(on); }
    if (WIRE[S.mode] && !inReview(S.mode === "details" ? "book" : "lead")) WIRE[S.mode]();
    if (opts.focus) { var f = $("input, button, a", body); if (f) f.focus({ preventScroll: true }); }
  }
  var WIRE = {
    details: function () { wireForm(function (f) { S.book.name = f("name"); S.book.email = f("email"); S.book.phone = f("phone"); S.book.notes = f("notes"); return TOOLS_IMPL.confirm_booking({}); }); },
    lead: function () { wireForm(function (f) { S.lead.name = f("lname"); S.lead.email = f("lemail"); S.lead.phone = f("lphone"); S.lead.need = f("lneed"); S.lead.callback = !!($("#ap-lcallback", body) || {}).checked; return TOOLS_IMPL.submit_lead({}); }); },
  };
  function wireForm(onSubmit) {
    var form = $("form", body); if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var get = function (id) { var el = $("#ap-" + id, form); return el ? el.value.trim() : ""; };
      if ($('input[name="hp"]', form).value) return;   // bot
      onSubmit(get);
    });
  }
  function setMsg(text, err, htmlStr) { var m = $(".p-msg", body); if (!m) return; m.classList.toggle("err", !!err); if (htmlStr) m.innerHTML = htmlStr; else m.textContent = text; }
  function busy(on) { var b = $(".p-go", body); if (b) b.disabled = !!on; S.busy = !!on; }
  function post(url, data) {
    return fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
      .then(function (r) { return r.json().catch(function () { return { ok: false, error: "HTTP " + r.status }; }).then(function (j) { j.__status = r.status; return j; }); })
      .catch(function () { return { ok: false, error: "network" }; });
  }
  // Each slot's signed token lasts 30 minutes, so reuse a fetch only while it is fresh (default 2 minutes).
  function loadSlots(force, maxAgeMs) {
    if (!force && S.slots && Date.now() - S.slotsAt < (maxAgeMs || 120e3)) return Promise.resolve(S.slots);
    return fetch("/api/ava-availability?days=7", { headers: { Accept: "application/json" } })
      .then(function (r) { return r.json(); })
      .then(function (j) { if (!j || !j.ok) throw new Error((j && j.error) || "unavailable"); S.slots = j.slots || []; S.slotsAt = Date.now(); S.slotsErr = null; return S.slots; })
      .catch(function (e) { S.slotsErr = String(e.message || e); throw e; });
  }
  function selectSlot(s, fromTwin) { S.slot = s; S.day = dayKey(s.start_time); go("details", { focus: !fromTwin }); }
  function stillNeeded() { var n = []; if (!S.slot) n.push("time"); if (!S.book.name.trim()) n.push("name"); if (!validEmail(S.book.email.trim())) n.push("email"); return n; }
  function formState() { return { time: S.slot ? info(S.slot).label : null, name: S.book.name, email: S.book.email, phone: S.book.phone, notes: S.book.notes }; }
  function clean(r) { var o = Object.assign({}, r); delete o.__status; return o; }
  function needConfirm() {
    return { ok: false, booked: false, needs_confirmation: true, details: formState(),
      message: "Nothing is booked yet. The panel is now showing these details to the visitor for review. Read back the time, name and email (spell the email) and ask: 'Is all of that correct?' Fix anything they correct with fill_booking_details. Call confirm_booking again only after they clearly say yes." };
  }
  function bookingFallback(extra) { return Object.assign({ fallback_email: "michael@avataragency.ai", calendly: CAL }, extra || {}); }
  function flash(el) { el.classList.add("flash"); setTimeout(function () { el.classList.remove("flash"); }, 1100); reveal(el); }
  function reveal(el) {   // scroll the panel (never the page) so what she just highlighted is in view
    if (!el || body.scrollHeight <= body.clientHeight + 1) return;
    var b = body.getBoundingClientRect(), r = el.getBoundingClientRect();
    if (r.top < b.top) body.scrollTop -= (b.top - r.top) + 8;
    else if (r.bottom > b.bottom) body.scrollTop += (r.bottom - b.bottom) + 8;
  }

  /* ═════════ Visitor taps (each one is reported to the live Ethica) ═════════ */
  body.addEventListener("click", function (e) {
    var t = e.target.closest("[data-act], [data-scheme], [data-pillar], [data-buy], [data-sub], [data-day], [data-slot]"); if (!t) return;
    var a = t.getAttribute("data-act");
    if (a === "book") { S.viewAll = false; S.booked = null; TOOLS_IMPL.show_booking_times({ view: "suggested" }); emit("The visitor opened the booking panel.", false); track("ethica_panel", { action: "book_open" }); return; }
    if (a === "week") { S.viewAll = true; render({}); emit("The visitor is looking at the whole week.", false); return; }
    if (a === "lead") { go("lead", { focus: true }); emit("The visitor opened the leave-your-contact-info form.", false); track("ethica_panel", { action: "lead_open" }); return; }
    if (a === "home") { S.hist = []; go("home", { replace: true }); return; }
    if (a === "review-yes") { if (!S.review || S.busy) return; S.review.ok = true; (S.review.kind === "book" ? TOOLS_IMPL.confirm_booking : TOOLS_IMPL.submit_lead)({}); return; }
    if (a === "review-edit") { S.review = null; render({ focus: true }); emit("The visitor chose to edit their details. Nothing has been booked or sent.", false); return; }
    if (t.hasAttribute("data-day")) { S.day = t.getAttribute("data-day"); S.slot = null; go("times"); emit("The visitor picked " + fmtDay(days().filter(function (x) { return x.key === S.day; })[0].slots[0].start_time, true) + " and is choosing a time.", false); return; }
    if (t.hasAttribute("data-slot")) { var sl = (S.slots || []).filter(function (x) { return x.start_time === t.getAttribute("data-slot"); })[0]; if (sl) { selectSlot(sl, false); emit("The visitor selected " + info(sl).label + ".", false); } return; }
    if (a === "pdr") { S.pillar = null; go("pdr"); emit("The visitor opened The PDR Framework.", false); track("ethica_panel", { action: "pdr" }); }
    else if (a === "schemes") { S.scheme = null; go("schemes"); emit("The visitor opened The schemes she fights.", false); track("ethica_panel", { action: "schemes" }); }
    else if (a === "merch") { S.product = null; go("merch"); emit("The visitor opened The Fraud Fighter Collection.", false); track("ethica_panel", { action: "merch" }); }
    else if (a === "subscribe") { go("subscribe"); emit("The visitor opened the subscription panel.", false); track("ethica_panel", { action: "subscribe" }); }
    else if (t.hasAttribute("data-scheme")) { S.scheme = t.getAttribute("data-scheme"); go("scheme"); emit("The visitor is reading about " + findIn(SCHEMES, S.scheme).name + ".", false); track("ethica_scheme", { scheme: S.scheme }); }
    else if (t.hasAttribute("data-pillar")) { S.pillar = t.getAttribute("data-pillar"); render({}); emit("The visitor is reading about " + findIn(PDR, S.pillar).name + ".", false); }
    else if (t.hasAttribute("data-buy")) { track("ethica_merch_click", { product: t.getAttribute("data-buy") }); emit("The visitor opened the store page for " + findIn(MERCH, t.getAttribute("data-buy")).name + ".", false); }
    else if (t.hasAttribute("data-sub")) { track("ethica_sub_click", { action: t.getAttribute("data-sub") }); if (instance) endLive(""); }
  });
  // Keep what the visitor types (so a tool update never wipes it) and tell the live Ethica about it.
  var BIND_LABEL = { "book.name": "name", "book.email": "email", "book.phone": "phone number", "book.notes": "note" };
  body.addEventListener("input", function (e) {
    var b = e.target.getAttribute && e.target.getAttribute("data-bind"); if (!b) return;
    var p = b.split("."); S[p[0]][p[1]] = e.target.type === "checkbox" ? e.target.checked : e.target.value;
  });
  body.addEventListener("change", function (e) {
    var b = e.target.getAttribute && e.target.getAttribute("data-bind"); if (!b) return;
    var p = b.split("."); if (e.target.type === "checkbox") S[p[0]][p[1]] = e.target.checked;
    if (!BIND_LABEL[b] || !String(e.target.value).trim()) return;
    emit("The visitor typed their " + BIND_LABEL[b] + ": " + e.target.value.trim() + ".", false);
  });

  /* ═════════ Ethica's page tools: the one way she changes the panel ═════════ */
  var TOOLS_IMPL = {
    show_menu: function () { S.hist = []; go("home", { replace: true }); return { ok: true, options: ["The PDR Framework", "The schemes she fights", "The Fraud Fighter Collection", "Subscribe", "Book a call with Avatar Agency", "Leave my contact info"] }; },
    show_pdr_framework: function (a) {
      a = a || {}; var p = a.pillar && findIn(PDR, a.pillar);
      S.pillar = p ? p.id : null; if (S.mode === "pdr") render({}); else go("pdr"); track("ethica_tool_view", { view: "pdr", pillar: S.pillar || "" });
      return { ok: true, shown: "The PDR Framework", highlighted: p ? p.name : null, pillars: PDR.items.map(function (x) { return { id: x.id, name: x.name, text: x.text }; }),
        note: "The framework is on the panel beside you. Talk the visitor through it in plain words; don't read the panel out." };
    },
    show_fraud_scheme: function (a) {
      a = a || {}; var x = a.scheme && findIn(SCHEMES, a.scheme);
      if (x) { S.scheme = x.id; if (S.mode === "scheme") render({}); else go("scheme"); }
      else { S.scheme = null; if (S.mode === "schemes") render({}); else go("schemes"); }
      track("ethica_tool_view", { view: "schemes", scheme: x ? x.id : "" });
      return { ok: true, shown: x ? x.name : "The schemes she fights", text: x ? x.text : null, schemes: SCHEMES.items.map(function (s) { return { id: s.id, name: s.name }; }) };
    },
    show_merch: function (a) {
      a = a || {}; var m = a.product && findIn(MERCH, a.product);
      S.product = m ? m.id : null; if (S.mode === "merch") render({}); else go("merch"); track("ethica_tool_view", { view: "merch", product: S.product || "" });
      return { ok: true, shown: "The Fraud Fighter Collection", highlighted: m ? m.name : null,
        products: MERCH.items.map(function (p) { return { id: p.id, name: p.name, description: p.tag, price: p.price }; }),
        note: "The products are on the panel with Get yours buttons; checkout happens on Ethica's Printful store. Never take an order or payment yourself." };
    },
    show_subscription: function () {
      go("subscribe"); var g = grantAccess(); track("ethica_tool_view", { view: "subscribe" });
      return { ok: true, plans: PLANS.map(function (p) { return { name: p.name, price: p.price + " per month", includes: p.minutes }; }), cancel: "anytime", visitor: g.stage === "blocked" ? g.why : g.stage,
        free_seconds_left: g.seconds || 0, note: "The subscription panel is open. Never collect payment details: the visitor subscribes with the button on the panel." };
    },

    // ── Fleet #4: booking (Ava's contract, unchanged) ──
    show_booking_times: function (a) {
      a = a || {}; S.slot = null; S.day = null; S.viewAll = a.view === "all"; S.booked = null;
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
      changed.forEach(function (k) { var el = $("#ap-" + k, body); if (el) flash(el); });   // the visitor sees Ethica writing
      if (changed.length && inReview("book") && !reviewFresh("book")) { openReview("book", true); return { ok: true, form: formState(), still_needed: stillNeeded(), note: "The details changed, so the visitor must confirm again. Read the updated details back and ask whether everything is correct before calling confirm_booking." }; }
      return { ok: true, form: formState(), still_needed: stillNeeded() };
    },
    confirm_booking: function () {
      if (S.booked) return Promise.resolve({ ok: true, already_booked: true, when: S.booked.when });
      var missing = stillNeeded();
      if (missing.length) { if (S.review) { S.review = null; render({}); } setMsg("Still needed: " + missing.join(", ") + ".", true); return Promise.resolve({ ok: false, missing: missing, error: "Still needed before booking: " + missing.join(", ") }); }
      var fromTwin = TOOLS_IMPL.__fromTwin;
      // Never book on the first call: the visitor must see the details and say yes (to Ethica) or press Yes (on the panel).
      if (!reviewFresh("book")) { openReview("book", fromTwin); return Promise.resolve(needConfirm()); }
      if (fromTwin && Date.now() - S.review.at < 4000) return Promise.resolve({ ok: false, booked: false, needs_confirmation: true, message: "Nothing is booked. The visitor has not answered yet. Wait for a clear yes before calling confirm_booking again." });
      if (!fromTwin && !S.review.ok) return Promise.resolve(needConfirm());
      busy(true); setMsg("Booking your call…");
      return loadSlots(false, 25 * 60e3).then(function () { return null; }, function () { return null; })
        .then(function () { var f = (S.slots || []).filter(function (x) { return x.start_time === S.slot.start_time; })[0]; if (f) S.slot = f; return !f; })
        .then(function (gone) {
          if (gone) return { ok: false, retry: true, __status: 409, message: "That time is no longer held. Call show_booking_times again and offer fresh options." };
          return post("/api/ava-booking", { start_time: S.slot.start_time, token: S.slot.token, name: S.book.name.trim(), email: S.book.email.trim(), phone: S.book.phone.trim(), notes: S.book.notes.trim(), timezone: TZ, sessionId: (instance && instance.sessionId) || SESSION, source: "Ethica page" });
        })
        .then(function (r) {
          busy(false);
          if (r.ok && r.booked) {
            var when = r.when || info(S.slot).label; S.booked = { when: when };
            S.doneMsg = "Your strategy call with Michael is confirmed for " + when + ". Calendly has emailed your confirmation and calendar invite to " + S.book.email.trim() + ".";
            go("booked"); track("ethica_booking_confirmed", {}); track("generate_lead", { lead_source: "ethica_panel_booking" }); rememberName(S.book.name);
            if (!fromTwin) emit("Booking confirmed for " + when + ". Calendly emailed " + S.book.email.trim() + ".", true);
            return clean(r);
          }
          if (r.retry || r.__status === 409) {
            setMsg("That time is no longer held — here are fresh options.");
            return wait(900).then(function () { return loadSlots(true); }).then(function () {
              S.slot = null; S.day = null; S.viewAll = false; go("days", { replace: true });
              return Object.assign(clean(r), { alternatives: pickSlots(3).map(info) });
            }, function () { return clean(r); });
          }
          if (r.stored) { S.doneMsg = "Michael has your details and will confirm a time with you directly."; go("booked"); rememberName(S.book.name); return clean(r); }
          if (r.__status === 429) { setMsg("", true, 'Too many tries for now. Email <a href="mailto:michael@avataragency.ai">michael@avataragency.ai</a> or <a href="' + CAL + '" target="_blank" rel="noopener">pick a time on Calendly</a>.'); return clean(r); }
          setMsg("", true, 'Something went wrong. Email <a href="mailto:michael@avataragency.ai">michael@avataragency.ai</a> or <a href="' + CAL + '" target="_blank" rel="noopener">pick a time on Calendly</a>.');
          return bookingFallback(clean(r));
        });
    },
    // Name memory (Michael, 10-24): she asks "By the way, what's your name?" once and saves the first name here.
    remember_visitor_name: function (a) {
      var first = rememberName(a && a.name);
      if (!first) return { ok: false, error: "No usable first name. Ask once more, or carry on without it." };
      track("ethica_name_saved", {});
      return { ok: true, saved: first, note: "Saved in this visitor's browser. Use their first name naturally from now on, and you will greet them by it next time." };
    },
    // Michael, 10-24: Ethica fills the contact form by voice (like Ava's fill_lead_details). SENDING stays the visitor's
    // tap on the review card (stage spec: contact info goes out only on the visitor's tap; the consent line sits there).
    fill_lead_details: function (a) {
      a = a || {}; var changed = [];
      ["name", "email", "phone", "need"].forEach(function (k) { if (a[k] != null && String(a[k]).trim() !== "") { S.lead[k] = String(a[k]).trim(); changed.push(k); } });
      if (typeof a.callback === "boolean" && a.callback !== S.lead.callback) { S.lead.callback = a.callback; changed.push("callback"); }
      var ids = { name: "lname", email: "lemail", phone: "lphone", need: "lneed" };
      if (S.mode !== "lead") go("lead");
      else if (!inReview("lead")) changed.forEach(function (k) { var el = $("#ap-" + (ids[k] || "lcallback"), body); if (!el) return; if (k === "callback") el.checked = S.lead.callback; else el.value = S.lead[k]; });
      if (!inReview("lead")) changed.forEach(function (k) { var el = $("#ap-" + (ids[k] || "lcallback"), body); if (el) flash(el); });   // the visitor sees Ethica writing
      var missing = [];
      if (!S.lead.name.trim()) missing.push("name");
      if (!validEmail(S.lead.email.trim())) missing.push("email");
      if (S.lead.callback && S.lead.phone.replace(/\D/g, "").length < 7) missing.push("phone (needed for a callback)");
      var form = { name: S.lead.name, email: S.lead.email, phone: S.lead.phone, need: S.lead.need, callback: S.lead.callback };
      if (missing.length) { if (inReview("lead")) { S.review = null; render({}); } return { ok: true, form: form, still_needed: missing }; }
      if (!reviewFresh("lead")) openReview("lead", true);
      return { ok: true, form: form, still_needed: [], sent: false,
        note: "The review card is on the panel. Read back their name and email (spell the email), then ask them to check it and tap \"Yes, send to Michael\". You cannot send it yourself. If they correct something, call fill_lead_details again." };
    },
    // Panel tap only (never in TOOLS): the visitor sends from the review card.
    submit_lead: function () {
      if (!S.lead.name.trim() || !validEmail(S.lead.email.trim())) { setMsg(!S.lead.name.trim() ? "Please add your name." : "Please enter a valid email.", true); return Promise.resolve({ ok: false }); }
      if (S.lead.callback && S.lead.phone.replace(/\D/g, "").length < 7) { setMsg("Please add a phone number so Michael can call you back.", true); var ph = $("#ap-lphone", body); if (ph) { ph.setAttribute("aria-invalid", "true"); ph.focus(); } return Promise.resolve({ ok: false }); }
      if (!reviewFresh("lead") || !S.review.ok) { openReview("lead", false); return Promise.resolve({ ok: false, needs_confirmation: true }); }
      busy(true); setMsg("Sending…");
      return post("/api/agent-lead", { name: S.lead.name.trim(), email: S.lead.email.trim(), phone: S.lead.phone.trim(), need: S.lead.need.trim(), callback: !!S.lead.callback, source: CFG.SOURCE, consent: true, consent_text: CONSENT_TEXT }).then(function (r) {
        busy(false);
        if (r.ok) { S.doneMsg = r.message || "Michael has your details and will be in touch soon."; go("leadDone"); track("generate_lead", { lead_source: "ethica_panel_lead" }); rememberName(S.lead.name); emit("The visitor sent their contact details to Avatar Agency" + (S.lead.callback ? " and asked for a callback" : "") + ". Thank them briefly.", true); return r; }
        setMsg("", true, 'That didn\'t go through. Email <a href="mailto:michael@avataragency.ai">michael@avataragency.ai</a> and we\'ll reply directly.'); return r;
      });
    },
  };
  var TOOLS = [
    { name: "show_menu", description: "Return the panel beside you to its main menu (The PDR Framework, The schemes she fights, The Fraud Fighter Collection, Subscribe, Book a call with Avatar Agency, Leave my contact info).", inputSchema: { type: "object", properties: {} } },
    { name: "show_pdr_framework", description: "Show The PDR Framework (Prevention, Detection, Remediation) on the panel beside you, which the visitor can see. Call it the moment you start explaining how to fight fraud, or one of the three pillars. Pass pillar to highlight one.",
      inputSchema: { type: "object", properties: { pillar: { type: "string", enum: PDR.items.map(function (x) { return x.id; }) } } } },
    { name: "show_fraud_scheme", description: "Show the schemes you fight on the panel beside you. Pass scheme to open one (e.g. when the visitor mentions an investment that sounds too good to be true, open investment_scams). Without scheme, shows the list of all eight.",
      inputSchema: { type: "object", properties: { scheme: { type: "string", enum: SCHEMES.items.map(function (x) { return x.id; }) } } } },
    { name: "show_merch", description: "Show The Fraud Fighter Collection (official Ethica tees and hoodie, with prices and Get yours buttons) on the panel beside you. Call it when the visitor asks about merch, shirts, the hoodie or supporting the mission. Pass product to highlight one.",
      inputSchema: { type: "object", properties: { product: { type: "string", enum: MERCH.items.map(function (x) { return x.id; }) } } } },
    { name: "show_subscription", description: "Show the subscription plans beside you: Starter, $9 a month for 60 minutes, and Guardian, $19 a month for 180 minutes; cancel anytime. Call it when the visitor asks how to keep talking, about the price, or when their free time is almost up.",
      inputSchema: { type: "object", properties: {} } },
    // Fleet #4 booking: Ava's contract (names, arguments, two-step confirm), adapted to who Ethica books for.
    { name: "show_booking_times", description: "Show Michael Rivera's real open times for a free 30-minute strategy call with Avatar Agency on the booking panel beside you, which the visitor can see. Call it when the visitor wants an AI avatar like you for their own business, or wants to talk with Avatar Agency or Michael. view \"suggested\" shows three picks; \"all\" shows the full week. Read back two or three options in natural speech, never the whole list, and mention the time zone.",
      inputSchema: { type: "object", properties: { view: { type: "string", enum: ["suggested", "all"] }, date: { type: "string", description: "Optional day to open, YYYY-MM-DD" } } } },
    { name: "select_booking_time", description: "Select the time the visitor chose on the booking panel. Use the date (YYYY-MM-DD) and time (e.g. \"10:00 AM\") from show_booking_times. If it is no longer available, offer the returned alternatives.",
      inputSchema: { type: "object", properties: { date: { type: "string", description: "YYYY-MM-DD, exactly as returned" }, time: { type: "string", description: "e.g. 10:00 AM, exactly as returned" } }, required: ["date", "time"] } },
    { name: "fill_booking_details", description: "Fill in the booking form on the panel each time you learn a detail - name, email, phone number, or a short note about their business and what they want to discuss. Only include the fields you just learned. Never build, guess or complete an email yourself: ask the visitor to type it on the panel or spell it, and read it back letter by letter.",
      inputSchema: { type: "object", properties: { name: { type: "string", description: "Full name" }, email: { type: "string", description: "Email address" }, phone: { type: "string", description: "Phone number" }, notes: { type: "string", description: "A short note about their business and what they want to discuss" } } } },
    { name: "confirm_booking", description: "Book the strategy call. The first call never books: it shows the visitor their details for review and returns needs_confirmation. Then read back the time, name and email (spell the email), ask whether everything is correct, fix anything with fill_booking_details, and call confirm_booking again only after the visitor clearly says yes. Relay the returned message in your own words.",
      inputSchema: { type: "object", properties: {} }, annotations: { destructiveHint: true } },
    { name: "remember_visitor_name", description: "Save the visitor's first name so you can greet them by name next time. After your first answer to a new visitor, ask once, warmly: \"By the way, what's your name?\" When they tell you, call this with their first name only, then use it naturally. If they would rather not say, carry on without it and never ask again. Never ask for a last name or any other personal detail.",
      inputSchema: { type: "object", properties: { name: { type: "string", description: "The visitor's first name, as they said it" } }, required: ["name"] } },
    { name: "fill_lead_details", description: "Fill in the \"Leave my contact info\" form on the panel when the visitor wants Avatar Agency to get back to them (for example about an AI avatar for their business) but would rather not book a time. Call it each time you learn a detail; only include the fields you just learned. Set callback true if they want a phone call back (then a phone number is required). Never build, guess or complete an email: ask them to type it on the panel or spell it, and read it back letter by letter. When name and email are in, the panel shows a review card; the visitor checks it and taps send themselves. You never send it.",
      inputSchema: { type: "object", properties: { name: { type: "string", description: "Full name" }, email: { type: "string", description: "Email address" }, phone: { type: "string", description: "Phone number" }, need: { type: "string", description: "A short note on what they want help with" }, callback: { type: "boolean", description: "true if they want a phone call back" } } } },
  ];
  function execTool(name, args) {
    var fn = TOOLS.some(function (t) { return t.name === name; }) && TOOLS_IMPL[name];   // the twin can only reach the listed tools
    if (!fn) return Promise.resolve({ ok: false, error: "Unknown tool " + name });
    TOOLS_IMPL.__fromTwin = true; track("ethica_tool", { tool: name });
    var done = function (m) { TOOLS_IMPL.__fromTwin = false; return m; };
    try { return Promise.resolve(fn(args || {})).then(done, function (e) { return done({ ok: false, error: String(e && e.message || e) }); }); }
    catch (e) { return Promise.resolve(done({ ok: false, error: String(e && e.message || e) })); }
  }
  // Must run right BEFORE sdk.init(): the SDK reads the page's tools when it attaches.
  function installTools() {
    var mc = document.modelContext;
    if (!mc) { mc = new EventTarget(); try { Object.defineProperty(document, "modelContext", { value: mc, configurable: true }); } catch (e) { document.modelContext = mc; } }
    mc.getTools = function () { return Promise.resolve(TOOLS.map(function (t) { return { name: t.name, description: t.description, inputSchema: t.inputSchema }; })); };
    mc.executeTool = function (tool, jsonArgs) {
      var args = {}; try { args = typeof jsonArgs === "string" ? JSON.parse(jsonArgs || "{}") : (jsonArgs || {}); } catch (e) {}
      return execTool(tool && tool.name ? tool.name : tool, args);
    };
  }
  function panelSummary() {
    var where = S.mode === "home" ? "the main menu" : S.mode === "scheme" ? findIn(SCHEMES, S.scheme).name : TITLES[S.mode];
    var bits = ["The panel beside you is visible and showing " + where];
    if (S.booked) bits.push("a strategy call with Avatar Agency is already booked for " + S.booked.when);
    else {
      if (S.slot) bits.push("the visitor has selected a call on " + info(S.slot).label);
      var have = [S.book.name && "name " + S.book.name, S.book.email && "email " + S.book.email, S.book.phone && "phone " + S.book.phone].filter(Boolean);
      if (have.length) bits.push("they have typed their " + have.join(", "));
    }
    // Name ask (Michael, 10-24): exact wording, once, only when the name is not known yet.
    var nm = knownName();
    var nameLine = nm ? " The visitor's first name is " + nm + "."
      : " You don't know the visitor's name yet. After your first answer, ask once, warmly: \"By the way, what's your name?\" When they tell you, call remember_visitor_name with their first name. If they would rather not say, carry on and never ask again.";
    return bits.join("; ") + ". The visitor has " + mmss(secondsLeft) + (access && access.stage === "anonymous" ? " of free conversation." : " left today.") + nameLine;
  }

  /* ═════════ Her intro: muted loop; the sound icon replays it from the start with captions ═════════ */
  // Source of truth: C:\VideoProjects\ETHICA\STAGE\ethica-intro.vtt (cut on the take's pauses; spoken "P-D-R", shown "PDR").
  var LINES = [[0.3, 3.7, "Hi, I'm Ethica, your fraud-fighting superhero."], [4.3, 6.0, "See the PDR on my suit?"],
    [6.5, 9.95, "It stands for Prevention, Detection and Remediation,"], [10.1, 12.2, "my three ways to keep your money safe."],
    [12.9, 16.6, "Investment scams, phishing emails, credit card fraud,"], [16.7, 17.8, "I've seen them all."],
    [18.2, 19.8, "Tap \"Talk to Ethica,\""], [19.85, 21.75, "and tell me what's worrying you today."]];
  var hasIntro = !!(vid && vid.getAttribute("data-src"));
  var hearing = false, visible = false, lastT = 0, capKey = "";
  function caption(lines) { var k = JSON.stringify(lines || []); if (k === capKey) return; capKey = k; capBox.innerHTML = (lines || []).map(function (l) { return '<span class="cap">' + esc(l) + "</span>"; }).join(""); }
  function ensureSrc() { if (hasIntro && !vid.getAttribute("src")) vid.src = vid.getAttribute("data-src"); }
  function playQuiet() { if (!hasIntro || RM || hearing || liveState !== "idle") return; ensureSrc(); vid.muted = true; var p = vid.play(); if (p && p.catch) p.catch(function () {}); }
  function soundIcon(on) {
    hearBtn.setAttribute("aria-pressed", on ? "true" : "false"); $("use", hearBtn).setAttribute("href", on ? "#i-vol" : "#i-sound-off");
    var l = on ? "Mute Ethica's introduction" : "Play Ethica's introduction with sound"; hearBtn.setAttribute("aria-label", l); hearBtn.title = l;
  }
  function stopHearing() { hearing = false; if (vid) vid.muted = true; soundIcon(false); caption([]); if (RM && vid) vid.pause(); }
  if (!hasIntro && hearBtn) hearBtn.style.display = "none";
  if (hearBtn) hearBtn.addEventListener("click", function () {
    if (!hasIntro || liveState !== "idle") return;
    if (hearing) { stopHearing(); return; }
    // Another video playing with sound (the trailer) pauses: one voice at a time.
    $$("video").forEach(function (v) { if (v !== vid && !v.paused && !v.muted) v.pause(); });
    ensureSrc(); hearing = true; vid.currentTime = 0; vid.muted = false; lastT = 0;
    var p = vid.play(); if (p && p.catch) p.catch(function () { stopHearing(); });
    soundIcon(true); track("ethica_hear", {});
  });
  if (vid) vid.addEventListener("timeupdate", function () {
    var t = vid.currentTime;
    if (hearing) {
      if (t + 0.3 < lastT || t > CFG.INTRO_END) stopHearing();
      else { var on = LINES.filter(function (l) { return t >= l[0] && t < l[1]; })[0]; caption(on ? [on[2]] : []); }
    }
    lastT = t;
  });
  // The trailer (or any other page video) starting with sound silences her intro.
  document.addEventListener("play", function (e) { var v = e.target; if (hearing && v && v.tagName === "VIDEO" && v !== vid && !v.muted && !(v.closest && v.closest(".stage"))) stopHearing(); }, true);
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (liveState !== "idle" || !vid) return; if (visible) playQuiet(); else { vid.pause(); if (hearing) stopHearing(); } }, { threshold: 0.35 }).observe(stage);
  }

  /* ═════════ "Talk to Ethica": the live conversation ═════════ */
  var sdkLoading = null, readyTimer = null, revealed = false;
  var htmlBg = getComputedStyle(document.documentElement).backgroundColor, bodyBg = getComputedStyle(document.body).backgroundColor;
  // The SDK injects `body,html{background:transparent}` the moment its script loads: re-assert the page colors.
  function pinBg() { document.documentElement.style.setProperty("background-color", htmlBg, "important"); document.body.style.setProperty("background-color", bodyBg, "important"); }
  function say_(text, ms) { toast.textContent = text; toast.hidden = !text; if (text && ms) setTimeout(function () { if (toast.textContent === text) toast.hidden = true; }, ms); }
  function setTalk(lbl, on) { $("span", talkBtn).textContent = lbl; talkBtn.disabled = liveState === "connecting"; talkBtn.classList.toggle("is-on", !!on); }
  function rememberSeen() { try { document.cookie = "aa_ethica_seen=1; Path=" + CFG.SEEN_PATH + "; Max-Age=31536000; Secure; SameSite=Lax"; } catch (e) {} }
  function loadSdk() {
    if (window.napsterCompanionApiSDK || window.NapsterCompanionApiSdk) return Promise.resolve();
    if (sdkLoading) return sdkLoading;
    sdkLoading = new Promise(function (res, rej) { var s = document.createElement("script"); s.src = CFG.SDK_URL; s.onload = res; s.onerror = function () { sdkLoading = null; rej(new Error("sdk load")); }; document.head.appendChild(s); });
    return sdkLoading;
  }
  function waitForVideo(tries, cb) { var v = $("video", mount); if (v || tries <= 0) return cb(v); setTimeout(function () { waitForVideo(tries - 1, cb); }, 120); }
  /* Reveal ONLY when her video really has frames (an empty SDK <video> before the mic is allowed = a black stage). */
  var MEDIA_WAIT_MS = 45000;
  function noMedia() { if (instance && !revealed) endLive("Ethica couldn't start. Allow the microphone for this site (the icon in the address bar), then press Talk to Ethica again.", true); }
  function onFirstFrame(v, cb) {
    var fired = false, t0 = Date.now(), go_ = function () { if (!fired) { fired = true; cb(); } };
    if (!v) return noMedia();
    (function poll() {
      if (fired || !instance || revealed) return;
      if (v.videoWidth > 0 && v.readyState >= 2) return go_();
      if (Date.now() - t0 > MEDIA_WAIT_MS) { fired = true; return noMedia(); }
      setTimeout(poll, 200);
    })();
    if ("requestVideoFrameCallback" in v) { try { v.requestVideoFrameCallback(function () { if (v.videoWidth > 0) go_(); }); } catch (e) {} }
  }
  function whenSharp(v, cb) {
    var t0 = Date.now(), fired = false, fin = function () { if (!fired) { fired = true; cb(); } };
    var want = Math.min(960, Math.round((mount.clientWidth || 640) * Math.min(window.devicePixelRatio || 1, 2) * 0.75));
    (function check() { if (fired) return; if (!v || (v.videoWidth || 0) >= want || Date.now() - t0 > 2000) return fin(); setTimeout(check, 120); })();
  }
  function armReveal() { if (!revealed && instance) waitForVideo(250, function (v) { onFirstFrame(v, function () { whenSharp(v, revealLive); }); }); }
  function revealLive() {
    if (revealed || !instance) return; revealed = true; liveState = "live";
    if (readyTimer) { clearTimeout(readyTimer); readyTimer = null; }
    avStage.classList.add("live-ready"); say_("", 0); setTalk("End conversation", true); pinBg(); showTimer();
    rememberSeen();
    setTimeout(function () { if (liveState === "live" && vid) vid.pause(); }, 900);
    track("ethica_live_session", { stage: access ? access.stage : "" });
  }
  function endedState(msg, now) {
    stopClock();
    instance = null; revealed = false; liveState = "idle";
    if (readyTimer) { clearTimeout(readyTimer); readyTimer = null; }
    if (visible) playQuiet();
    avStage.classList.remove("live", "live-ready"); setTalk("Talk to Ethica", false); showTimer();
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
    endLive(st === 503 || st === 404 ? "Ethica's live conversation is arriving very soon. In the meantime, explore the panel beside her." :
      st === 403 ? "Ethica's live conversation only runs on avataragency.ai." :
      st === 429 || st >= 500 ? "Ethica is talking with other visitors right now — try again in a few minutes." :
      "I couldn't start the live conversation just now. The panel beside me still works.", true);
  }
  async function startLive() {
    if (liveState !== "idle") return;
    access = grantAccess();
    if (access.stage === "blocked") { S.out = access.why; go("subscribe"); say_("Your free time with Ethica is used up — see your options in the panel.", 6000); track("ethica_blocked", { why: access.why }); return; }
    secondsLeft = access.seconds;
    liveState = "connecting"; if (hearing) stopHearing();
    $$("video").forEach(function (v) { if (v !== vid && !v.paused && !v.muted) v.pause(); });   // never two voices
    setTalk("Connecting…", false); say_("Connecting to Ethica…", 0); avStage.classList.add("live"); stage.classList.add("is-live");
    readyTimer = setTimeout(function () { if (liveState === "connecting") say_("Almost there… allow the microphone if your browser asks.", 0); }, 5000);
    try {
      installTools();
      await loadSdk(); pinBg();
      var res = await fetch(CFG.TOKEN_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
      if (!res.ok) { var err = new Error("token " + res.status); err.status = res.status; throw err; }
      var data = await res.json(); var sdk = window.napsterCompanionApiSDK || window.NapsterCompanionApiSdk;
      if (!sdk) throw new Error("sdk missing");
      if (liveState !== "connecting") return;        // ended while the token was on its way
      installTools(); pinBg();
      instance = await sdk.init(data.token, {
        // The SDK's default 4px border stays off on every stage (AVATAR-STAGE-SPEC §8).
        mountContainer: "#ethica-mount", avatarStyle: { view: "rectangle", borderWidth: "0px", borderStyle: "none" }, debug: /[?&]debug\b/.test(location.search),
        features: { showSDKLoader: { enabled: false }, screenShare: { enabled: true }, pictureInPicture: { enabled: true } },
        onAvatarReady: armReveal, onDestroy: function () { if (instance) endedState(""); },
      });
      instance.showAvatar(); pinBg();
      setTimeout(function () { if (instance) armReveal(); }, 3000);
      startClock();
      emit(panelSummary(), false);
    } catch (e) { liveError(e); }
  }
  talkBtn.addEventListener("click", function () {
    if (liveState === "live") { endLive(""); return; }
    startLive();
  });
  window.addEventListener("pagehide", persist);

  // For the console and tests: what the live Ethica would see.
  window.EthicaPanel = { tools: TOOLS, exec: execTool, state: function () { return S; }, access: grantAccess };
  render({});
})();
