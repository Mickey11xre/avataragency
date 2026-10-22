/* ACCU Ava's stage: the talking AI loan agent on the /clients/accu pitch page (a working prototype for America's
 * Christian Credit Union; Michael, 2026-10-22). Built from /avatarstages/matt-stage.js (same look, demo panel,
 * two-step confirmation and live-session code). This page has ONE stage, so the multi-stage coordination is gone.
 *
 * Panel, top to bottom (Michael, 10-22): Auto Loans · Personal & Home Loans · Student Loans · Schedule a call back ·
 * Leave my contact info.
 *
 * THE PANEL IS A DEMO: no ACCU system is connected. It shows sample call-back times and the same "Is this correct?"
 * card, and nothing is scheduled or sent anywhere. No rates, payments, fees or dollar amounts appear anywhere: every
 * loan card is worded from her approved FAQ (livebrand-ops/accu-ava/faq/accu-faq.json).
 *
 * Agent 0f7ffaaa (twin d0bf8c0f, created 10-22) through the public, origin-checked /api/accu-ava-token. The tool
 * names below match her instructions (livebrand-ops/accu-ava/instructions.md, THE PANEL BESIDE YOU): change both.
 */
(function () {
  "use strict";
  var stage = document.getElementById("accu-stage");
  if (!stage) return;
  var RM = document.documentElement.classList.contains("rm");
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var track = function (n, p) { try { if (window.gtag) gtag("event", n, p || {}); } catch (e) {} };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var CFG = {
    LIVE: true,
    TOKEN_ENDPOINT: stage.getAttribute("data-token") || "/api/accu-ava-token",
    SEEN_PATH: stage.getAttribute("data-seen-path") || "/api",
    SDK_URL: "https://cdn.jsdelivr.net/npm/@touchcastllc/napster-companion-api@1.5.0/lib/index.standalone.js",
    CAP_S: 600,          // ten-minute session cap, as on every stage
    INTRO_END: 18.8,     // media/accu-ava-intro.mp4 is 19.0 s: speech ends at about 18.4 s
  };

  var avStage = $(".stage-av", stage), vid = $(".ava-video", stage), capBox = $(".ava-caption", stage), hearBtn = $(".ava-sound", stage),
    talkBtn = $(".ava-talk", stage), toast = $(".ava-toast", stage), mount = $("#accu-mount");
  var panel = $("#accu-panel"), body = $(".panel-body", panel), titleEl = $(".panel-title", panel), backBtn = $(".panel-back", panel), flag = $(".panel-flag", panel);
  var instance = null, liveState = "idle";   // idle | connecting | live

  /* ═════════ Content ═════════ */
  var IC = {
    cal: '<svg viewBox="0 0 24 24"><rect x="4" y="5.5" width="16" height="14.5" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    chat: '<svg viewBox="0 0 24 24"><path d="M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 19 16.5h-7l-4.5 3.5v-3.5H5A1.5 1.5 0 0 1 3.5 15V7A1.5 1.5 0 0 1 5 5.5z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
    car: '<svg viewBox="0 0 24 24"><path d="M5 16.5V12l1.8-4.6A2 2 0 0 1 8.7 6h6.6a2 2 0 0 1 1.9 1.4L19 12v4.5M5 12h14M5 16.5h14v1.5a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-1.5M8.5 16.5V18a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-1.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><circle cx="8" cy="14.2" r=".9" fill="currentColor"/><circle cx="16" cy="14.2" r=".9" fill="currentColor"/></svg>',
    home: '<svg viewBox="0 0 24 24"><path d="M4 11.5 12 5l8 6.5M6.5 9.8V19h11V9.8M10 19v-5h4v5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    cap: '<svg viewBox="0 0 24 24"><path d="M2.5 9.5 12 5l9.5 4.5L12 14z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M6.5 11.5v4c0 1.4 2.5 2.8 5.5 2.8s5.5-1.4 5.5-2.8v-4M21.5 9.5v5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    phone: '<svg viewBox="0 0 24 24"><path d="M6.6 4.5h2.6l1.3 3.6-1.8 1.2a10 10 0 0 0 6 6l1.2-1.8 3.6 1.3v2.6a1.6 1.6 0 0 1-1.7 1.6A15.3 15.3 0 0 1 5 6.2a1.6 1.6 0 0 1 1.6-1.7z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
    ext: '<svg viewBox="0 0 24 24" width="14" height="14"><path d="M14 5h5v5M19 5l-8 8M18 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    arrow: '<svg><use href="#i-arrow"/></svg>',
  };
  var SITE = "https://americaschristiancu.com";
  /* The three loan groups and their products, from her approved FAQ and knowledge base (Tier 2 detail). Terms in
     months and loan-to-value percentages are allowed (Michael, 10-22); rates, payments, fees and dollar amounts are not. */
  var CATS = {
    auto: { name: "Auto Loans", lead: "Vehicle loans for whatever you drive, ride or tow.", items: [
      { id: "auto", name: "New and used auto loans", text: "New and used cars, trucks and SUVs, with fixed rates and terms up to 84 months. Get pre-approved before you shop. A new vehicle can be financed up to 100%, including tax and license.", url: "/personal/auto-loan/" },
      { id: "autorefi", name: "Auto loan refinance", text: "Move a car loan from another lender to ACCU. Have your mileage, the VIN, your current loan details, your driver's license and proof of income ready.", url: "/personal/auto-loan-refinance/" },
      { id: "ev", name: "Electric vehicle loans", text: "New and used electric vehicles, plus refinancing, with the same features as ACCU's auto loan, including terms up to 84 months.", url: "/personal/electric-vehicle-ev-loan/" },
      { id: "firstcar", name: "First-time car buyers", text: "For people with limited credit history. No credit history is required, but you need your own way to repay, or a qualified co-signer.", url: "/personal/auto-loan/" },
      { id: "rv", name: "RV, motorhome and trailer", text: "Terms up to 144 months, financing up to 80% of the MSRP or NADA value.", url: "/personal/recreational-vehicle-loan/" },
      { id: "moto", name: "Motorcycle, UTV and ATV", text: "Motorcycles, side-by-sides, ATVs and dirt bikes, with terms up to 84 months and financing up to 90% of the MSRP or NADA value.", url: "/personal/motorcycle-loan/" },
      { id: "boat", name: "Boats and small watercraft", text: "Boat loans up to 144 months, and small watercraft loans up to 84 months.", url: "/personal/boat-loan/" },
    ] },
    personal_home: { name: "Personal & Home Loans", lead: "For life's big moments, at home and beyond.", items: [
      { id: "personal", name: "Personal (Signature) loans", text: "An unsecured loan with a fixed rate and a fixed term up to 60 months, with no collateral. For weddings, medical bills, mission trips, home improvements and emergencies. Decisions usually take one to two business days.", url: "/personal/personal-loan/" },
      { id: "consolidation", name: "Debt consolidation", text: "ACCU pays off the debts you list and combines them into one loan with one monthly payment. Terms up to 60 months, with no prepayment penalty.", url: "/personal/debt-consolidation-personal-loan/" },
      { id: "adoption", name: "Adoption loans", text: "Domestic and international adoption: agency, court and lawyer fees, the home study and travel. Terms up to 84 months, and funding within one to two days once your documents and membership are in place.", url: "/personal/adoption-loans/" },
      { id: "adoptionloc", name: "Adoption line of credit", text: "Draw funds as adoption expenses come up during a two-year draw period, then repay over five years. You only pay interest on what you use.", url: "/personal/adoption-line-of-credit/" },
      { id: "savings", name: "Savings secured loans", text: "Backed by your ACCU savings or a term share certificate. Your savings keep earning dividends, and it can help build or repair credit. Apply by phone.", url: "/personal/savings-secured-personal-loan/" },
      { id: "heloc", name: "Home equity line of credit", text: "Draw for ten years, then repay over twenty, paying interest only on what you use. Borrow up to 80% of your home's appraised value, minus what you owe. Available in every state except Texas.", url: "/personal/home-equity/" },
      { id: "mortgage", name: "Mortgages", text: "Home purchase and refinance loans, with fixed-rate and adjustable-rate options and low down payment programs. A Mortgage Advisor walks you through them.", url: "/personal/mortgages/" },
    ] },
    student: { name: "Student Loans", lead: "Ways to pay for college, for students and parents.", items: [
      { id: "undergrad", name: "Undergraduate and graduate loans", text: "Deferred, interest-only or immediate repayment, with terms up to 15 years. They fill the gap after scholarships, grants and federal aid.", url: "/personal/student-lending/" },
      { id: "studentloc", name: "Student line of credit", text: "Apply once, then request funds each academic year without reapplying. Up to 25 years to repay, with no origination fee.", url: "/personal/student-lending/" },
      { id: "parent", name: "Parent loans", text: "Parents, family members or friends can help a student with education costs, with terms up to 15 years.", url: "/personal/student-lending/" },
      { id: "studentrefi", name: "Student loan refinancing", text: "Fixed and variable options. Refinancing federal loans into a private loan generally gives up federal benefits like income-driven repayment and forgiveness.", url: "/personal/student-lending/" },
      { id: "planning", name: "College Planning Tool", text: "Free resources from ACCU on planning, saving and paying for college, and on life in college.", url: "/personal/student-lending/" },
    ] },
  };
  var CAT_IDS = Object.keys(CATS);
  var ALL = []; CAT_IDS.forEach(function (c) { CATS[c].items.forEach(function (it) { ALL.push({ cat: c, it: it }); }); });
  var findItem = function (id) { return ALL.filter(function (x) { return x.it.id === id; })[0] || null; };
  var INTERESTS = ["Auto loan", "Personal loan", "Debt consolidation", "Adoption loan", "Home equity line of credit", "Mortgage", "Student loan", "Something else"];

  /* ═════════ State + rendering ═════════ */
  var S = { mode: "home", hist: [], slots: null, day: null, slot: null, viewAll: false, booked: null, cat: null, item: null, review: null,
    book: { name: "", email: "", phone: "", interest: "" }, lead: { name: "", email: "", phone: "", need: "", callback: false } };
  var TITLES = { home: "How can I help?", days: "Schedule a call back", times: "Schedule a call back", details: "Schedule a call back",
    booked: "Demo call back", lead: "Leave your contact info", leadDone: "Demo" };
  var DEMO_DONE = "Demo only - no call was scheduled and nothing was sent to ACCU.";
  /* Tells the live Ava what the visitor just did on the panel, so she never re-asks for something they typed.
     "[Loan panel]" is the prefix her instructions react to; speak=true only when she should answer aloud. */
  var emit = function (text, speak) {
    if (!instance || !instance.sendCommand) return;
    try { instance.sendCommand({ type: "send_message", data: { text: "[Loan panel] " + text, role: "system", trigger_response: !!speak } }); } catch (e) {}
  };

  function go(mode, opts) {
    opts = opts || {};
    if (!opts.replace && S.mode !== mode) S.hist.push(S.mode);
    if (S.mode !== mode) S.review = null;
    S.mode = mode; render(opts);
  }
  function goBack() { S.mode = S.hist.pop() || "home"; S.review = null; render({}); }
  backBtn.addEventListener("click", goBack);

  /* Sample CALL-BACK times for the demo: Monday to Friday, inside the loan officers' hours (eight in the morning to five
     in the afternoon, Pacific). Plain strings: nothing is scheduled. */
  var STARTS = [[9, 0], [10, 30], [13, 0], [14, 30], [16, 0]];
  var DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var clock = function (h, m) { return ((h + 11) % 12 + 1) + ":" + (m < 10 ? "0" : "") + m + " " + (h < 12 ? "AM" : "PM"); };
  function demoSlots() {
    var p = {}; new Intl.DateTimeFormat("en-US", { timeZone: "America/Los_Angeles", year: "numeric", month: "numeric", day: "numeric" }).formatToParts(new Date()).forEach(function (x) { p[x.type] = +x.value; });
    var out = [];
    for (var n = 1, open = 0; n <= 14 && open < 5; n++) {
      var d = new Date(Date.UTC(p.year, p.month - 1, p.day + n)), dow = d.getUTCDay();
      if (dow === 0 || dow === 6) continue;          // loan officers: Monday to Friday
      open++;
      var key = d.toISOString().slice(0, 10), shortDay = DAYS[dow].slice(0, 3) + ", " + MONTHS[d.getUTCMonth()].slice(0, 3) + " " + d.getUTCDate();
      STARTS.forEach(function (hm, i) {
        if ((n * 5 + i * 3) % 4 === 0) return;       // some times already taken, so the calendar looks real
        var t = clock(hm[0], hm[1]);
        out.push({ id: key + "T" + hm[0] + "-" + hm[1], date: key, time: t, day: shortDay, long: DAYS[dow] + ", " + MONTHS[d.getUTCMonth()] + " " + d.getUTCDate() });
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
    // a different time of day on each suggested day (morning, early afternoon, late afternoon), so it reads like a real calendar
    days().forEach(function (x, i) { if (out.length < n) out.push(x.slots[Math.min([0, 2, x.slots.length - 1][i % 3], x.slots.length - 1)]); });
    return out;
  }
  var label = function (s) { return s.long + " at " + s.time; };
  var info = function (s) { return { date: s.date, time: s.time, label: label(s) }; };
  var normTime = function (t) { return String(t || "").toLowerCase().replace(/\s+/g, "").replace(/^0(\d:)/, "$1"); };
  function findSlot(date, time) { return (S.slots || []).filter(function (s) { return s.date === date && normTime(s.time) === normTime(time); })[0]; }

  var steps = function (n) { return '<div class="p-steps" aria-hidden="true">' + [1, 2, 3].map(function (i) { return '<span class="' + (i <= n ? "on" : "") + '"></span>'; }).join("") + "</div>"; };
  var field = function (id, lbl, type, val, opt, attrs) {
    return '<div class="p-field"><label for="ac-' + id + '">' + lbl + (opt ? " <span>(optional)</span>" : "") + "</label>" +
      (type === "textarea" ? '<textarea id="ac-' + id + '" rows="3" ' + (attrs || "") + ">" + esc(val) + "</textarea>"
        : '<input id="ac-' + id + '" type="' + type + '" value="' + esc(val) + '" ' + (attrs || "") + ">") + "</div>";
  };
  var interestField = function (val) {
    return '<div class="p-field"><label for="ac-interest">Which loan are you interested in? <span>(optional)</span></label><select id="ac-interest" data-bind="book.interest"><option value="">Choose one</option>' +
      INTERESTS.concat(val && INTERESTS.indexOf(val) < 0 ? [val] : []).map(function (x) { return '<option' + (x === val ? " selected" : "") + ">" + esc(x) + "</option>"; }).join("") + "</select></div>";
  };
  function act(id, icon, title, sub) { return '<button class="p-act" type="button" data-act="' + id + '"><i>' + icon + "</i><span><b>" + title + "</b><small>" + sub + "</small></span>" + IC.arrow + "</button>"; }
  var tr = function (v) { return String(v || "").trim(); };
  var validEmail = function (e) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e); };

  /* "Is this correct?": nothing is scheduled or sent until the visitor confirms what is on screen. Any change to the
     details cancels the confirmation. */
  var REVIEW_MODE = { book: "details", lead: "lead" };
  function sigOf(k) {
    if (k === "book") return [S.slot ? S.slot.id : "", tr(S.book.name), tr(S.book.email).toLowerCase(), tr(S.book.phone), tr(S.book.interest)].join("|");
    return [tr(S.lead.name), tr(S.lead.email).toLowerCase(), tr(S.lead.phone), tr(S.lead.need), S.lead.callback ? "cb" : ""].join("|");
  }
  var inReview = function (k) { return !!(S.review && S.review.kind === k); };
  var reviewFresh = function (k) { return inReview(k) && S.review.sig === sigOf(k); };
  function reviewRows(k) {
    var r = k === "book" ? [["Call back", S.slot ? S.slot.long + ", " + S.slot.time + " PT" : ""], ["Name", S.book.name], ["Email", S.book.email], ["Phone", S.book.phone], ["Interested in", S.book.interest]]
      : [["Name", S.lead.name], ["Email", S.lead.email], ["Phone", S.lead.phone], ["Callback", S.lead.callback ? "Yes, please call me" : ""], ["What you're planning", S.lead.need]];
    return r.filter(function (x) { return tr(x[1]); });
  }
  function reviewCard(k) {
    return (k === "book" ? steps(3) : "") + '<div class="p-review"><p class="p-label">Is this correct?</p><dl class="p-rv">' +
      reviewRows(k).map(function (x) { return "<div><dt>" + x[0] + "</dt><dd>" + esc(tr(x[1])) + "</dd></div>"; }).join("") +
      '</dl><p class="p-sub">Please check your details. Nothing is ' + (k === "book" ? "scheduled" : "sent") + ' until you confirm.</p><div class="p-rv-acts"><button class="btn btn-gold btn-sm p-go" type="button" data-act="review-yes">' +
      (k === "book" ? "Yes, schedule my call" : "Yes, send it") + " " + IC.arrow + '</button><button class="btn btn-ghost btn-sm" type="button" data-act="review-edit">Edit</button></div></div>';
  }
  function openReview(k, fromTwin) {
    if (S.mode !== REVIEW_MODE[k]) go(REVIEW_MODE[k]);
    S.review = { kind: k, sig: sigOf(k), at: Date.now(), ok: false }; render({});
    var b = $('[data-act="review-yes"]', body); if (b && !fromTwin) b.focus({ preventScroll: true });
    if (fromTwin) return;
    var list = reviewRows(k).map(function (x) { return x[0].toLowerCase() + " " + tr(x[1]); }).join(", ");
    emit(k === "book"
      ? "The visitor pressed Confirm. Nothing is scheduled yet: the panel shows their details for review (" + list + "). Read the time, name and email back, spelling the email, and ask whether everything is correct. Fix anything they correct with fill_callback_details. Schedule only after a clear yes, with confirm_callback, or when they press Yes on the panel."
      : "The visitor is reviewing their contact details (" + list + "). Nothing is sent yet. Read the email back and ask whether it is correct. Send only after a clear yes, with submit_contact_details, or when they press Yes on the panel.", true);
  }

  var VIEWS = {
    home: function () {
      return '<p class="p-sub">Tap an option below — or press Talk to Ava to speak with me.</p><div class="p-actions">' +
        act("cat-auto", IC.car, "Auto Loans", "Cars, EVs, RVs, boats and more") +
        act("cat-personal_home", IC.home, "Personal &amp; Home Loans", "Personal, adoption, home equity, mortgages") +
        act("cat-student", IC.cap, "Student Loans", "Undergrad, grad, parent and refinancing") +
        act("book", IC.phone, "Schedule a call back", "Pick a time for a loan officer to call") +
        act("lead", IC.chat, "Leave my contact info", "The lending team gets back to you") + "</div>";
    },
    cat: function () {
      var c = CATS[S.cat] || CATS.auto;
      return '<p class="p-sub">' + esc(c.lead) + '</p><div class="p-svcs">' + c.items.map(function (it) { return '<button class="p-svc" type="button" data-item="' + it.id + '"><span>' + esc(it.name) + "</span>" + IC.arrow + "</button>"; }).join("") +
        '</div><p class="p-sub">Rates change and depend on your credit and term: see ACCU\'s rates page, and a loan officer confirms your exact rate.</p>';
    },
    item: function () {
      var x = findItem(S.item) || ALL[0], it = x.it;
      return '<div class="p-card"><div><h4>' + esc(it.name) + "</h4><p>" + esc(it.text) + "</p></div></div>" +
        '<div class="p-svc-actions"><button class="btn btn-gold btn-sm" type="button" data-act="book">Schedule a call back ' + IC.arrow + "</button>" +
        '<a class="btn btn-ghost btn-sm" href="' + SITE + it.url + '" target="_blank" rel="noopener noreferrer">Apply on ACCU\'s site ' + IC.ext + "</a></div>";
    },
    days: function () {
      var d = days();
      if (!S.viewAll) {
        return steps(1) + '<p class="p-label">Suggested call-back times · PT</p><div class="p-picks">' + pickSlots(3).map(function (s) {
          return '<button class="p-chip p-pick' + (S.slot && S.slot.id === s.id ? " on" : "") + '" type="button" data-slot="' + s.id + '">' + esc(s.day) + "<small>" + esc(s.time) + "</small></button>";
        }).join("") + '</div><button class="link p-week" type="button" data-act="week">See the whole week ' + IC.arrow + '</button><p class="p-sub">A loan officer calls you at the time you pick.</p>';
      }
      return steps(1) + '<p class="p-label">Pick a day · PT</p><div class="p-days">' + d.map(function (x) {
        return '<button class="p-chip' + (S.day === x.key ? " on" : "") + '" type="button" data-day="' + x.key + '">' + esc(x.label) + "<small>" + x.slots.length + (x.slots.length === 1 ? " time" : " times") + "</small></button>";
      }).join("") + '</div><p class="p-sub">Sample times, Monday to Friday, eight to five Pacific.</p>';
    },
    times: function () {
      var d = days().filter(function (x) { return x.key === S.day; })[0];
      if (!d) return VIEWS.days();
      return steps(2) + '<p class="p-label">' + esc(d.slots[0].long) + ' · PT</p><div class="p-times">' + d.slots.map(function (s) {
        return '<button class="p-chip' + (S.slot && S.slot.id === s.id ? " on" : "") + '" type="button" data-slot="' + s.id + '">' + esc(s.time) + "</button>";
      }).join("") + "</div>";
    },
    details: function () {
      if (inReview("book")) return reviewCard("book");
      return steps(3) + '<div class="p-summary">' + IC.cal.replace("<svg", '<svg width="18" height="18"') + "<span><b>" + esc(S.slot.long) + "</b> at <b>" + esc(S.slot.time) + '</b> PT</span></div><form class="p-form" novalidate>' +
        field("name", "Your name", "text", S.book.name, false, 'autocomplete="name" required data-bind="book.name"') +
        field("email", "Email", "email", S.book.email, false, 'autocomplete="email" required data-bind="book.email"') +
        field("phone", "Phone", "tel", S.book.phone, false, 'autocomplete="tel" required data-bind="book.phone"') +
        interestField(S.book.interest) +
        '<button class="btn btn-gold btn-sm p-go" type="submit">Confirm my call back ' + IC.arrow + '</button><p class="p-msg" role="status"></p></form>';
    },
    booked: function () {
      return '<div class="p-done"><span class="tick">✓</span><h4>That\'s how a call back works.</h4><p>' + esc((S.booked ? S.booked.show + ". " : "") + DEMO_DONE) + '</p><button class="btn btn-ghost btn-sm" type="button" data-act="home">Back to Ava</button></div>';
    },
    lead: function () {
      if (inReview("lead")) return reviewCard("lead");
      return '<p class="p-sub">Tell us a little about what you are planning, and the lending team gets back to you.</p><form class="p-form" novalidate>' +
        field("lname", "Your name", "text", S.lead.name, false, 'autocomplete="name" required data-bind="lead.name"') +
        field("lemail", "Email", "email", S.lead.email, false, 'autocomplete="email" required data-bind="lead.email"') +
        field("lphone", "Phone", "tel", S.lead.phone, true, 'autocomplete="tel" data-bind="lead.phone"') +
        '<label class="p-check"><input type="checkbox" id="ac-lcallback" data-bind="lead.callback"' + (S.lead.callback ? " checked" : "") + '><span>Request a callback</span></label>' +
        field("lneed", "What are you planning?", "textarea", S.lead.need, true, 'data-bind="lead.need"') +
        '<button class="btn btn-gold btn-sm p-go" type="submit">Send to ACCU ' + IC.arrow + '</button><p class="p-msg" role="status"></p></form>';
    },
    leadDone: function () { return '<div class="p-done"><span class="tick">✓</span><h4>Got it.</h4><p>Demo only - nothing was sent to ACCU.</p><button class="btn btn-ghost btn-sm" type="button" data-act="home">Back to Ava</button></div>'; },
  };
  function render(opts) {
    opts = opts || {};
    titleEl.textContent = S.mode === "cat" ? (CATS[S.cat] || {}).name || "Loans"
      : S.mode === "item" ? ((findItem(S.item) || {}).it || {}).name || "Loan"
      : (TITLES[S.mode] || "Ava");
    panel.classList.toggle("is-home", S.mode === "home");
    backBtn.hidden = S.mode === "home";
    flag.hidden = S.mode === "home" || S.mode === "cat" || S.mode === "item";   // "Demo" on the call-back and contact views
    body.innerHTML = (VIEWS[S.mode] || VIEWS.home)();
    body.scrollTop = 0;
    body.style.animation = "none"; void body.offsetWidth; body.style.animation = "";
    var form = $("form", body);
    if (form) form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (S.mode === "details") TOOLS_IMPL.confirm_callback({}); else TOOLS_IMPL.submit_contact_details({});
    });
    if (opts.focus) { var f = $("input, button", body); if (f) f.focus({ preventScroll: true }); }
  }
  function setMsg(text) { var m = $(".p-msg", body); if (m) { m.classList.add("err"); m.textContent = text; } }
  function flash(el) { el.classList.add("flash"); setTimeout(function () { el.classList.remove("flash"); }, 1100); reveal(el); }
  // Scroll the panel (never the page) so a field Ava just filled is in view.
  function reveal(el) {
    if (!el || body.scrollHeight <= body.clientHeight + 1) return;
    var b = body.getBoundingClientRect(), r = el.getBoundingClientRect();
    if (r.top < b.top) body.scrollTop -= (b.top - r.top) + 8;
    else if (r.bottom > b.bottom) body.scrollTop += (r.bottom - b.bottom) + 8;
  }

  /* ═════════ Visitor clicks and typing (each one is reported to the live Ava) ═════════ */
  body.addEventListener("click", function (e) {
    var t = e.target.closest("[data-act], [data-item], [data-day], [data-slot]"); if (!t) return;
    var a = t.getAttribute("data-act");
    if (a && a.indexOf("cat-") === 0) { var c = a.slice(4); TOOLS_IMPL.show_loan_category({ category: c }); emit("The visitor opened " + CATS[c].name + ".", false); track("accu_panel", { action: "cat_" + c }); }
    else if (a === "book") { TOOLS_IMPL.show_callback_times({ view: "suggested" }); emit("The visitor opened the schedule-a-call-back panel.", false); track("accu_panel", { action: "book_open" }); }
    else if (a === "week") { S.viewAll = true; render({}); emit("The visitor is looking at the whole week.", false); }
    else if (a === "lead") { go("lead", { focus: true }); emit("The visitor opened the leave-your-contact-info form.", false); track("accu_panel", { action: "lead_open" }); }
    else if (a === "home") { S.hist = []; go("home", { replace: true }); }
    else if (a === "review-yes") { if (!S.review) return; S.review.ok = true; (S.review.kind === "book" ? TOOLS_IMPL.confirm_callback : TOOLS_IMPL.submit_contact_details)({}); }
    else if (a === "review-edit") { S.review = null; render({ focus: true }); emit("The visitor chose to edit their details. Nothing has been scheduled or sent.", false); }
    else if (t.hasAttribute("data-item")) { var x = findItem(t.getAttribute("data-item")); if (x) { S.cat = x.cat; S.item = x.it.id; go("item"); emit("The visitor is looking at " + x.it.name + ".", false); track("accu_loan", { loan: x.it.id }); } }
    else if (t.hasAttribute("data-day")) { S.day = t.getAttribute("data-day"); S.slot = null; go("times"); emit("The visitor picked " + days().filter(function (x) { return x.key === S.day; })[0].slots[0].long + " and is choosing a call-back time.", false); }
    else if (t.hasAttribute("data-slot")) { var sl = (S.slots || []).filter(function (x) { return x.id === t.getAttribute("data-slot"); })[0]; if (sl) { selectSlot(sl, false); emit("The visitor selected a call back on " + label(sl) + ".", false); } }
  });
  var BIND_LABEL = { "book.name": "name", "book.email": "email", "book.phone": "phone number", "book.interest": "loan of interest",
    "lead.name": "name", "lead.email": "email", "lead.phone": "phone number", "lead.need": "note" };
  body.addEventListener("input", function (e) {
    var b = e.target.getAttribute && e.target.getAttribute("data-bind"); if (!b) return;
    var p = b.split("."); S[p[0]][p[1]] = e.target.type === "checkbox" ? e.target.checked : e.target.value;
  });
  body.addEventListener("change", function (e) {
    var b = e.target.getAttribute && e.target.getAttribute("data-bind"); if (!b) return;
    var p = b.split("."); S[p[0]][p[1]] = e.target.type === "checkbox" ? e.target.checked : e.target.value;   // <select> fires change only
    if (!BIND_LABEL[b] || !String(e.target.value).trim()) return;
    emit("The visitor entered their " + BIND_LABEL[b] + ": " + String(e.target.value).trim() + ".", false);
  });

  /* ═════════ Ava's DEMO tools: the one way anything changes the panel ═════════
     No tool calls a server: "scheduled" and "sent" only change what the panel shows. */
  function selectSlot(s, fromTwin) { S.slot = s; S.day = s.date; go("details", { focus: !fromTwin }); }
  function stillNeeded(k) {
    var n = [], o = k === "book" ? S.book : S.lead;
    if (k === "book" && !S.slot) n.push("call-back time");
    if (!tr(o.name)) n.push("name");
    if (!validEmail(tr(o.email))) n.push("email");
    if ((k === "book" || o.callback) && String(o.phone).replace(/\D/g, "").length < 7) n.push("phone");   // a call back needs a number
    return n;
  }
  function bookState() { return { call_back: S.slot ? label(S.slot) : null, name: S.book.name, email: S.book.email, phone: S.book.phone, interest: S.book.interest }; }
  function leadState() { return { name: S.lead.name, email: S.lead.email, phone: S.lead.phone, need: S.lead.need, callback: !!S.lead.callback }; }
  function needConfirm(k) {
    return { ok: false, needs_confirmation: true, details: k === "book" ? bookState() : leadState(),
      message: "Nothing is " + (k === "book" ? "scheduled" : "sent") + " yet. The panel now shows these details to the visitor for review. Read them back (spell the email) and ask: 'Is all of that correct?' Fix anything they correct, then call " + (k === "book" ? "confirm_callback" : "submit_contact_details") + " again only after they clearly say yes." };
  }
  // What is already on the panel when a session starts, so she never re-asks for what the visitor already did.
  function panelSummary() {
    var bits = ["The demo panel is visible beside you"];
    if (S.booked) bits.push("a demo call back is already confirmed for " + S.booked.when);
    else {
      if (S.slot) bits.push("the visitor has selected a call back on " + label(S.slot));
      var have = [S.book.name && "name " + S.book.name, S.book.email && "email " + S.book.email, S.book.phone && "phone " + S.book.phone, S.book.interest && "interest " + S.book.interest].filter(Boolean);
      if (have.length) bits.push("they have entered their " + have.join(", "));
    }
    if (S.mode === "cat" && S.cat) bits.push("they are looking at " + CATS[S.cat].name);
    if (S.mode === "item" && S.item) bits.push("they are looking at " + ((findItem(S.item) || {}).it || {}).name);
    return bits.join("; ") + ".";
  }

  var TOOLS_IMPL = {
    show_loan_category: function (a) {
      a = a || {}; var c = a.category;
      if (!CATS[c]) { go("home"); return { ok: false, error: "Unknown category", categories: CAT_IDS }; }
      if (a.product) {
        var x = findItem(a.product);
        if (x && x.cat === c) { S.cat = c; S.item = x.it.id; if (S.mode === "item") render({}); else go("item"); track("accu_loan", { loan: x.it.id }); return { ok: true, category: CATS[c].name, product: x.it.name, summary: x.it.text, note: "The loan is on the panel. Say one or two sentences about it." }; }
      }
      S.cat = c; if (S.mode === "cat") render({}); else go("cat"); track("accu_category", { category: c });
      return { ok: true, category: CATS[c].name, products: CATS[c].items.map(function (it) { return { id: it.id, name: it.name }; }), note: "The category is on the panel. Say one or two sentences about it, then ask what they are planning." };
    },
    show_callback_times: function (a) {
      a = a || {}; S.slots = S.slots || demoSlots(); S.slot = null; S.day = null; S.viewAll = a.view === "all"; S.booked = null;
      if (a.date) { var hit = days().filter(function (x) { return x.key === a.date; })[0]; if (hit) { S.day = hit.key; S.viewAll = true; } }
      go("days"); if (S.day) go("times");
      return { ok: true, demo: true, timezone: "Pacific time", note: "Call-back times, Monday to Friday. Pass the date and the time to select_callback_time.",
        suggested: pickSlots(3).map(info), days: days().map(function (x) { return { date: x.key, label: x.slots[0].long, open: x.slots.length }; }) };
    },
    select_callback_time: function (a) {
      a = a || {};
      if (!S.slots) return { ok: false, error: "Call show_callback_times first." };
      var s = findSlot(a.date, a.time);
      if (!s) return { ok: false, error: "That time is not available", alternatives: pickSlots(3).map(info) };
      selectSlot(s, TOOLS_IMPL.__fromTwin); return { ok: true, selected: info(s) };
    },
    fill_callback_details: function (a) {
      a = a || {}; var changed = [];
      ["name", "email", "phone", "interest"].forEach(function (k) { if (a[k] != null && String(a[k]).trim() !== "") { S.book[k] = String(a[k]).trim(); changed.push(k); } });
      if (S.slot && S.mode !== "details") go("details");
      else if (S.mode === "details") { if (changed.indexOf("interest") >= 0) render({}); else changed.forEach(function (k) { var el = $("#ac-" + k, body); if (el) el.value = S.book[k]; }); }
      changed.forEach(function (k) { var el = $("#ac-" + k, body); if (el) flash(el); });   // the visitor sees Ava writing
      if (changed.length && inReview("book") && !reviewFresh("book")) { openReview("book", true); return { ok: true, form: bookState(), still_needed: stillNeeded("book"), note: "The details changed, so the visitor must confirm again. Read them back and ask whether everything is correct before calling confirm_callback." }; }
      return { ok: true, form: bookState(), still_needed: stillNeeded("book") };
    },
    confirm_callback: function () {
      if (S.booked) return { ok: true, demo: true, already_scheduled: true, when: S.booked.when };
      var missing = stillNeeded("book");
      if (missing.length) { if (S.review) { S.review = null; render({}); } setMsg("Still needed: " + missing.join(", ") + "."); return { ok: false, missing: missing, error: "Still needed before scheduling: " + missing.join(", ") }; }
      var fromTwin = TOOLS_IMPL.__fromTwin;
      if (!reviewFresh("book")) { openReview("book", fromTwin); return needConfirm("book"); }
      if (fromTwin && Date.now() - S.review.at < 4000) return { ok: false, needs_confirmation: true, message: "Nothing is scheduled. The visitor has not answered yet. Wait for a clear yes before calling confirm_callback again." };
      if (!fromTwin && !S.review.ok) return needConfirm("book");
      S.booked = { when: label(S.slot) + " (Pacific time)", show: S.slot.long + " at " + S.slot.time + " PT" }; S.review = null; go("booked"); track("accu_demo_callback", {});
      if (!fromTwin) emit("The visitor confirmed the demo call back for " + S.booked.when + ". Nothing was sent: this page is a demonstration. Tell them, briefly, that this is how a call back works.", true);
      return { ok: true, demo: true, scheduled: true, when: S.booked.when,
        message: "DEMO: the panel shows the call back as scheduled, but nothing was sent to ACCU. Tell the visitor, briefly, that this is how a call back works on this demonstration page." };
    },
    show_contact_form: function () { go("lead"); return { ok: true, demo: true, note: "The contact form is open on the panel. Ask for their details one at a time, fill them in with fill_contact_details, or let them type." }; },
    fill_contact_details: function (a) {
      a = a || {}; var changed = [];
      ["name", "email", "phone", "need"].forEach(function (k) { if (a[k] != null && String(a[k]).trim() !== "") { S.lead[k] = String(a[k]).trim(); changed.push(k); } });
      if (a.callback != null) { S.lead.callback = a.callback === true || a.callback === "true"; changed.push("callback"); }
      var ID = { name: "lname", email: "lemail", phone: "lphone", need: "lneed", callback: "lcallback" };
      if (S.mode !== "lead") go("lead");
      else changed.forEach(function (k) { var el = $("#ac-" + ID[k], body); if (el) { if (k === "callback") el.checked = !!S.lead.callback; else el.value = S.lead[k]; } });
      changed.forEach(function (k) { var el = $("#ac-" + ID[k], body); if (el && k !== "callback") flash(el); });
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
      S.review = null; go("leadDone"); track("accu_demo_contact", {});
      if (!fromTwin) emit("The visitor confirmed their contact details. Nothing was sent: this page is a demonstration. Tell them, briefly, that this is how it works.", true);
      return { ok: true, demo: true, sent: false, message: "DEMO: the panel shows the details as sent, but nothing went to ACCU. Tell the visitor, briefly, that this is how it works on this demonstration page." };
    },
  };

  var str = function (d) { return { type: "string", description: d }; };
  var TOOLS = [
    { name: "show_loan_category", description: "Show one of ACCU's three loan groups on the panel beside you, which the visitor can see. Call it the moment you start talking about that kind of loan: \"auto\" (cars, electric vehicles, RVs, motorcycles, boats, refinancing, first-time buyers), \"personal_home\" (personal loans, debt consolidation, adoption, savings secured, home equity lines of credit, mortgages) or \"student\" (undergraduate, graduate, student line of credit, parent loans, refinancing). Optionally pass a product id to open that loan's card. Product ids - auto: auto, autorefi, ev, firstcar, rv, moto, boat; personal_home: personal, consolidation, adoption, adoptionloc, savings, heloc, mortgage; student: undergrad, studentloc, parent, studentrefi, planning.",
      inputSchema: { type: "object", properties: { category: { type: "string", enum: CAT_IDS }, product: { type: "string", enum: ALL.map(function (x) { return x.it.id; }) } }, required: ["category"] } },
    { name: "show_callback_times", description: "DEMO call-back panel. Show open call-back times on the panel beside you, which the visitor can see. Call it as soon as the visitor wants to talk with a loan officer. view \"suggested\" shows three picks; \"all\" shows the whole week. Offer two or three times in natural speech, never the whole list, each said in words. Times are Pacific time, Monday to Friday.",
      inputSchema: { type: "object", properties: { view: { type: "string", enum: ["suggested", "all"] }, date: str("Optional day to open, YYYY-MM-DD") } } },
    { name: "select_callback_time", description: "Select the call-back time the visitor chose. Use the date (YYYY-MM-DD) and time (e.g. \"10:30 AM\") exactly as show_callback_times returned them. If it is not available, offer the returned alternatives.",
      inputSchema: { type: "object", properties: { date: str("YYYY-MM-DD, exactly as returned"), time: str("e.g. 10:30 AM, exactly as returned") }, required: ["date", "time"] } },
    { name: "fill_callback_details", description: "Fill in the call-back form on the panel each time you learn a detail: the visitor's name, email, phone number, or which loan they are interested in (for example Auto loan, Mortgage, Student loan). Only include the fields you just learned. Never ask for a Social Security number, account number, date of birth or income. Read each detail back; spell the email back.",
      inputSchema: { type: "object", properties: { name: str("Full name"), email: str("Email address"), phone: str("Phone number"), interest: str("The loan they are interested in, in a few words") } } },
    { name: "confirm_callback", description: "Confirm the DEMO call back. The first call never confirms: it shows the visitor their details for review and returns needs_confirmation. Read back the time, name and email (spell the email), ask whether everything is correct, fix anything with fill_callback_details, and call confirm_callback again only after a clear yes. Nothing is ever sent - this page is a demonstration.",
      inputSchema: { type: "object", properties: {} }, annotations: { destructiveHint: true } },
    { name: "show_contact_form", description: "Open the leave-your-contact-info form on the panel, for a visitor who would rather leave their details for the lending team.",
      inputSchema: { type: "object", properties: {} } },
    { name: "fill_contact_details", description: "Fill in the contact form on the panel each time you learn a detail: name, email, phone number, a short note about what they are planning, and callback (true if they want a phone call). Only include the fields you just learned. Read each detail back; spell the email back.",
      inputSchema: { type: "object", properties: { name: str("Full name"), email: str("Email address"), phone: str("Phone number"), need: str("A short note about what they are planning"), callback: { type: "boolean", description: "true if they would like a phone call" } } } },
    { name: "submit_contact_details", description: "Send the DEMO contact form. The first call never sends: it shows the visitor their details for review. Read them back (spell the email), ask whether they are correct, and call again only after a clear yes. Nothing is ever sent - this page is a demonstration.",
      inputSchema: { type: "object", properties: {} }, annotations: { destructiveHint: true } },
  ];
  function execTool(name, args) {
    var fn = TOOLS.some(function (t) { return t.name === name; }) && TOOLS_IMPL[name];
    if (!fn) return Promise.resolve({ ok: false, error: "Unknown tool " + name });
    TOOLS_IMPL.__fromTwin = true; track("accu_tool", { tool: name });
    var done = function (m) { TOOLS_IMPL.__fromTwin = false; return m; };
    try { return Promise.resolve(fn(args || {})).then(done, function (e) { return done({ ok: false, error: String(e && e.message || e) }); }); }
    catch (e) { return Promise.resolve(done({ ok: false, error: String(e && e.message || e) })); }
  }
  // Must run right BEFORE sdk.init(): the SDK reads the page's tools when it attaches.
  function installTools() {
    var mc = document.modelContext;
    if (!mc) { mc = new EventTarget(); try { Object.defineProperty(document, "modelContext", { value: mc, configurable: true }); } catch (e) { document.modelContext = mc; } }
    mc.getTools = function () { return Promise.resolve(TOOLS.map(function (t) { return { name: t.name, description: t.description, inputSchema: t.inputSchema, annotations: t.annotations }; })); };
    mc.executeTool = function (tool, jsonArgs) {
      var args = {}; try { args = typeof jsonArgs === "string" ? JSON.parse(jsonArgs || "{}") : (jsonArgs || {}); } catch (e) {}
      return execTool(tool && tool.name ? tool.name : tool, args);
    };
  }

  /* ═════════ Her intro: muted loop; the sound icon replays it from the start with captions ═════════ */
  // Timed to the intro's speech (silencedetect, 10-22); the source of truth is C:\VideoProjects\ACCU_AVA\STAGE\accu-ava-intro.vtt.
  var LINES = [[0.2, 2.6, "Hi, I'm Ava, the AI loan agent"], [2.6, 4.6, "for America's Christian Credit Union."],
    [4.9, 6.3, "I'm a digital assistant,"], [6.3, 8.95, "here day or night to help you find the right loan,"],
    [9.0, 11.6, "whether it's a new car, a home equity line,"], [11.6, 13.9, "a personal loan, or paying for college."],
    [14.2, 16.7, "Tap \"Talk to Ava,\" tell me what you're planning,"], [16.7, 18.7, "and I'll walk you through your next step."]];
  var hasIntro = !!vid.getAttribute("data-src");
  var hearing = false, lastT = 0, visible = false, capKey = "";
  function caption(lines) { var k = JSON.stringify(lines || []); if (k === capKey) return; capKey = k; capBox.innerHTML = (lines || []).map(function (l) { return '<span class="cap">' + esc(l) + "</span>"; }).join(""); }
  function ensureSrc() { if (hasIntro && !vid.getAttribute("src")) vid.src = vid.getAttribute("data-src"); }
  function playQuiet() { if (!hasIntro || RM || hearing || liveState !== "idle") return; ensureSrc(); vid.muted = true; var p = vid.play(); if (p && p.catch) p.catch(function () {}); }
  function soundIcon(on) { hearBtn.setAttribute("aria-pressed", on ? "true" : "false"); $("use", hearBtn).setAttribute("href", on ? "#i-vol" : "#i-sound-off"); var l = on ? "Mute Ava's introduction" : "Play Ava's introduction with sound"; hearBtn.setAttribute("aria-label", l); hearBtn.title = l; }
  function stopHearing() { hearing = false; vid.muted = true; soundIcon(false); caption([]); if (RM) vid.pause(); }
  if (!hasIntro) hearBtn.style.display = "none";
  hearBtn.addEventListener("click", function () {
    if (!hasIntro || liveState !== "idle") return;
    if (hearing) { stopHearing(); return; }
    ensureSrc(); hearing = true; vid.currentTime = 0; vid.muted = false; lastT = 0;
    var p = vid.play(); if (p && p.catch) p.catch(function () { stopHearing(); });
    soundIcon(true); track("accu_hear", {});
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

  /* ═════════ "Talk to Ava": the live conversation ═════════ */
  var sdkLoading = null, capTimer = null, readyTimer = null, revealed = false;
  var htmlBg = getComputedStyle(document.documentElement).backgroundColor, bodyBg = getComputedStyle(document.body).backgroundColor;
  // The SDK injects `body,html{background:transparent}` the moment its script loads: re-assert the page colors.
  function pinBg() { document.documentElement.style.setProperty("background-color", htmlBg, "important"); document.body.style.setProperty("background-color", bodyBg, "important"); }
  function say_(text, ms) { toast.textContent = text; toast.hidden = !text; if (text && ms) setTimeout(function () { if (toast.textContent === text) toast.hidden = true; }, ms); }
  function setTalk(lbl, on) { $("span", talkBtn).textContent = lbl; talkBtn.disabled = liveState === "connecting"; talkBtn.classList.toggle("is-on", !!on); }
  function rememberSeen() { try { document.cookie = "aa_accu_seen=1; Path=" + CFG.SEEN_PATH + "; Max-Age=31536000; Secure; SameSite=Lax"; } catch (e) {} }
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
    track("accu_live_session", {});
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
    avStage.classList.remove("live", "live-ready"); setTalk("Talk to Ava", false);
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
    endLive(st === 503 || st === 404 ? "Ava's live conversation is arriving very soon. In the meantime, try the panel beside her." :
      st === 403 ? "Ava's live conversation only runs on avataragency.ai." :
      st === 429 || st >= 500 ? "Ava is talking with other visitors right now — try again in a few minutes." :
      "I couldn't start the live conversation just now. The panel beside me still works.", true);
  }
  async function startLive() {
    if (liveState !== "idle") return;
    liveState = "connecting"; if (hearing) fadeOutVoice(); else caption([]);
    // A page film or clip playing with sound pauses: never two voices.
    $$("video").forEach(function (v) { if (v !== vid && !v.paused && !v.muted) v.pause(); });
    setTalk("Connecting…", false); say_("Connecting to Ava…", 0); avStage.classList.add("live"); stage.classList.add("is-live");
    if (hasIntro && !RM && vid.paused) { ensureSrc(); vid.muted = true; var pq = vid.play(); if (pq && pq.catch) pq.catch(function () {}); }
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
        // The SDK's default 4px border (red while muted or idle) stays off on every stage (AVATAR-STAGE-SPEC §8).
        mountContainer: "#accu-mount", avatarStyle: { view: "rectangle", borderWidth: "0px", borderStyle: "none" }, debug: /[?&]debug\b/.test(location.search),
        features: { showSDKLoader: { enabled: false }, screenShare: { enabled: true }, pictureInPicture: { enabled: true } },
        onAvatarReady: armReveal, onDestroy: function () { if (instance) endedState(""); },
      });
      instance.showAvatar(); pinBg();
      setTimeout(function () { if (instance) armReveal(); }, 3000);
      capTimer = setTimeout(function () { endLive("That's the ten-minute limit — press Talk to Ava to keep going."); }, CFG.CAP_S * 1000);
      emit(panelSummary(), false);
    } catch (e) { liveError(e); }
  }
  talkBtn.addEventListener("click", function () {
    if (liveState === "live") { endLive(""); return; }
    startLive();
  });

  // For the console and tests: what the live Ava would see.
  window.AccuPanel = { tools: TOOLS, exec: execTool, state: function () { return S; } };
  render({});
})();
