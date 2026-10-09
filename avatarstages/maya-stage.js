/* Maya's stage — the second stage on the private /avatarstages page. Ava's stage above it is run, unchanged, by
 * /home-next/ava-panel.js (the homepage template).
 *
 * Same look and live hand-off as Ava's (livebrand-ops/AVATAR-STAGE-SPEC.md): her muted intro loops as the cue,
 * the sound icon replays it from the start with captions, and "Talk to Maya" starts a live session (Napster SDK
 * 1.5.0). Her panel has Ava's layout, worded for a dental practice (Michael, 5 Oct): the practice video, "Schedule
 * an appointment with Dr. Nawrocki", "Explore our dental services", "Leave my contact info".
 *
 * THE PANEL IS A DEMO (Michael, 5 Oct: bookings and contact requests go "nowhere — it's just a demo where it will
 * display when Maya is booking an appointment or getting contact info"). Maya drives it live through her OWN page
 * tools, the way Ava drives hers: the visitor watches the times, their details and the "Is this correct?" card fill
 * in as they talk. Sample times sit inside the practice's real office hours; nothing is booked or sent anywhere.
 *
 * Two rules exist because this page has TWO stages and ava-panel.js was written for one:
 *  1. ONE LIVE AVATAR AT A TIME. Starting Maya ends Ava first, and pressing "Talk to Ava" while Maya is live ends
 *     Maya first. Each one clears the other's video container at once, because the SDK always names its container
 *     #np_companion-avatar-container. Two live sessions would share one microphone and two of the account's five
 *     session slots.
 *  2. MAYA ONLY EVER SEES HER OWN TOOLS. document.modelContext is one object per page, and ava-panel.js fills it with
 *     Ava's tools; Ava's confirm_booking books REAL calls on Michael's calendar. The SDK builds a fresh tool bridge on
 *     every init and reads getTools() once when it attaches (checked in the 1.5.0 source, 5 Oct), so Maya's demo
 *     tools are installed right before Maya's init, replacing Ava's. Ava's script restores her own whenever Ava starts.
 *     Maya's tools have different names from Ava's and call no server.
 */
(function () {
  "use strict";
  var stage = document.getElementById("maya-stage");
  if (!stage) return;
  var RM = document.documentElement.classList.contains("rm");
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var track = function (n, p) { try { if (window.gtag) gtag("event", n, p || {}); } catch (e) {} };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var wait = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  var CFG = {
    // Gated by default (/work, /avatarstages). A page without the portfolio gate (Dr. Nawrocki's landing page embed,
    // /clients/dental-arts/maya/) overrides these with data-token / data-seen-path / data-film / data-film-poster on the stage.
    TOKEN_ENDPOINT: stage.getAttribute("data-token") || "/avatarstages/api/maya-token",
    SEEN_PATH: stage.getAttribute("data-seen-path") || "/avatarstages",
    SDK_URL: "https://cdn.jsdelivr.net/npm/@touchcastllc/napster-companion-api@1.5.0/lib/index.standalone.js",
    CAP_S: 600,          // ten-minute session cap, as for Ava
    INTRO_END: 26.3,     // media/maya-intro.mp4 is 26.4 s (take 3, cut before its repeated last line)
  };

  var avStage = $(".stage-av", stage), vid = $(".ava-video", stage), capBox = $(".ava-caption", stage), hearBtn = $(".ava-sound", stage),
    talkBtn = $(".ava-talk", stage), toast = $(".ava-toast", stage), mount = $("#maya-mount");
  var panel = $("#maya-panel"), body = $(".panel-body", panel), titleEl = $(".panel-title", panel), backBtn = $(".panel-back", panel), flag = $(".panel-flag", panel);
  var ava = document.getElementById("ava-stage");
  var instance = null, liveState = "idle";   // idle | connecting | live

  /* ═════════ Content ═════════ */
  var IC = {
    cal: '<svg viewBox="0 0 24 24"><rect x="4" y="5.5" width="16" height="14.5" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    compass: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M15.5 8.5l-2 5-5 2 2-5z" fill="currentColor"/></svg>',
    chat: '<svg viewBox="0 0 24 24"><path d="M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 19 16.5h-7l-4.5 3.5v-3.5H5A1.5 1.5 0 0 1 3.5 15V7A1.5 1.5 0 0 1 5 5.5z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
    play: '<svg><use href="#i-play"/></svg>',
    arrow: '<svg><use href="#i-arrow"/></svg>',
  };
  /* "Dental Arts San Diego Video" (Michael, 5 Oct): the practice's final 9-3-26 film. It is served by the private
     portfolio's film route (functions/work/film/[[path]].js, slug alena-practice = clients/anawrocki/service-video-02.mp4,
     the web encode of ALENA_NAWROCKI_VIDEO_9-3-26.mp4, matched frame by frame), behind the same aa_pf gate as this page. */
  var FILM = { src: stage.getAttribute("data-film") || "/work/film/alena-practice.mp4",
    poster: stage.getAttribute("data-film-poster") || "/work/assets/poster/alena-service.webp", dur: "1:13" };
  /* "Explore our dental services" (Michael, 5 Oct): the same list, in the same order, as the Services menu on
     dentalartssandiego.com (read from the live site's navigation, 5 Oct). Each text is that page's own opening, kept to
     what Maya may say: the page's "best way" / "only solution" / "last a lifetime" claims are left out, and sedation,
     emergencies and consultations follow Dr. Nawrocki's written answers (all in Maya's FAQ and knowledge base). */
  var SITE = "https://www.dentalartssandiego.com";
  var SERVICES = [
    { id: "preventive", name: "Preventive Dentistry", path: "/service-categories/preventive-dentistry", text: "Regular exams and professional cleanings keep your smile free from decay and gum disease, and catch small issues before they become bigger ones. New patients: your first visit is $125, with a comprehensive exam, a professional cleaning and digital X-rays." },
    { id: "cosmetic", name: "Cosmetic Dentistry", path: "/service-categories/cosmetic-dentistry", text: "From subtle improvements to full smile makeovers: in-office whitening, veneers, bonding and more. Veneer consultations are free." },
    { id: "restorative", name: "Restorative Dentistry", path: "/service-categories/restorative-dentistry", text: "Fillings, crowns, bridges, dentures and root canal therapy repair decayed or damaged teeth, so you can eat, laugh and smile with confidence." },
    { id: "implantology", name: "Implantology", path: "/service-categories/implantology", text: "Dental implants replace missing teeth with a titanium post that takes the place of the tooth's root, for one tooth, several or a whole arch. Dr. Nawrocki places and restores implants at the El Cajon office, and the consultation is free." },
    { id: "oralsurgery", name: "Oral Surgery", path: "/service-categories/oral-surgery", text: "Extractions, bone grafting with PRF, gum grafting and more, done at the El Cajon office. The area is numbed with local anesthesia, and oral sedation is available if you ask for it." },
    { id: "fullmouth", name: "Full-Mouth Rehabilitation", path: "/services/full-mouth-rehabilitation", text: "Not a single treatment, but a custom combination of procedures, planned over time to restore your oral health and your confidence. Dr. Nawrocki lays out the plan at your consultation." },
    { id: "allonx", name: "All-on-X Implants", path: "/services/all-on-x-implants", text: "A full arch of teeth on as few as four implants, placed and restored by Dr. Nawrocki at the El Cajon office. In some cases you can leave with a new smile the same day. The implant consultation is free." },
    { id: "aligners", name: "Clear Aligners", path: "/services/clear-aligners", text: "Invisalign and other clear aligners: removable, nearly invisible trays, custom-made to straighten your teeth. The consultation is free." },
    { id: "wisdom", name: "Wisdom Teeth Removal", path: "/services/wisdom-teeth-removal", text: "Problem wisdom teeth are removed at the El Cajon office, with local anesthesia, and oral sedation if you ask for it. Not every wisdom tooth has to come out: an exam and X-rays show whether yours do." },
    { id: "emergencies", name: "Emergencies", path: "/services/emergencies", text: "During office hours the practice is your first stop, with same-day appointments whenever possible. When the office is closed, go to the nearest emergency room." },
  ];

  /* ═════════ State + rendering ═════════ */
  var S = { mode: "home", hist: [], slots: null, day: null, slot: null, viewAll: false, booked: null, svc: null, review: null,
    book: { name: "", email: "", phone: "", reason: "" }, lead: { name: "", email: "", phone: "", need: "", callback: false } };
  var TITLES = { home: "How can I help?", video: "Dental Arts San Diego", services: "Our dental services", service: "Service", days: "Schedule an appointment",
    times: "Schedule an appointment", details: "Schedule an appointment", booked: "Demo booking", lead: "Leave your contact info", leadDone: "Demo" };
  var DEMO_DONE = "Demo only - no appointment was made and nothing was sent to the office.";
  /* Tells the live Maya what the visitor just did on the panel, so she never re-asks for something they typed.
     "[Booking panel]" is the prefix her instructions react to; speak=true only when she should answer aloud. */
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

  /* Sample times: the practice's real office hours, Pacific time (it is a local practice, so times are shown in its
     own time zone). Mon/Wed/Fri 8-5, Tue 8-7, Sat 8-2; never Thursday or Sunday. Plain strings - nothing is booked. */
  var HOURS = { 1: [8, 17], 2: [8, 19], 3: [8, 17], 5: [8, 17], 6: [8, 14] };
  var DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  function demoSlots() {
    var p = {}; new Intl.DateTimeFormat("en-US", { timeZone: "America/Los_Angeles", year: "numeric", month: "numeric", day: "numeric" }).formatToParts(new Date()).forEach(function (x) { p[x.type] = +x.value; });
    var out = [];
    for (var n = 1, open = 0; n <= 14 && open < 7; n++) {
      var d = new Date(Date.UTC(p.year, p.month - 1, p.day + n)), dow = d.getUTCDay(), h = HOURS[dow];
      if (!h) continue;
      open++;
      var key = d.toISOString().slice(0, 10), shortDay = DAYS[dow].slice(0, 3) + ", " + MONTHS[d.getUTCMonth()].slice(0, 3) + " " + d.getUTCDate();
      for (var m = h[0] * 60, i = 0; m <= (h[1] - 1) * 60; m += 30, i++) {
        if ((n * 7 + i * 3) % 5 === 0) continue;   // some times already taken, so the calendar looks real
        var hh = Math.floor(m / 60), mm = m % 60, t = ((hh + 11) % 12 + 1) + ":" + (mm ? "30" : "00") + (hh < 12 ? " AM" : " PM");
        out.push({ id: key + "T" + m, date: key, time: t, day: shortDay, long: DAYS[dow] + ", " + MONTHS[d.getUTCMonth()] + " " + d.getUTCDate() });
      }
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
    days().forEach(function (x) { if (out.length < n) out.push(x.slots[Math.min(2, x.slots.length - 1)]); });
    return out;
  }
  var label = function (s) { return s.long + " at " + s.time; };
  var info = function (s) { return { date: s.date, time: s.time, label: label(s) }; };
  var normTime = function (t) { return String(t || "").toLowerCase().replace(/\s+/g, "").replace(/^0(\d:)/, "$1"); };
  function findSlot(date, time) { return (S.slots || []).filter(function (s) { return s.date === date && normTime(s.time) === normTime(time); })[0]; }

  var steps = function (n) { return '<div class="p-steps" aria-hidden="true">' + [1, 2, 3].map(function (i) { return '<span class="' + (i <= n ? "on" : "") + '"></span>'; }).join("") + "</div>"; };
  var field = function (id, lbl, type, val, opt, attrs) {
    return '<div class="p-field"><label for="mp-' + id + '">' + lbl + (opt ? " <span>(optional)</span>" : "") + "</label>" +
      (type === "textarea" ? '<textarea id="mp-' + id + '" rows="3" ' + (attrs || "") + ">" + esc(val) + "</textarea>"
        : '<input id="mp-' + id + '" type="' + type + '" value="' + esc(val) + '" ' + (attrs || "") + ">") + "</div>";
  };
  function act(id, icon, title, sub) { return '<button class="p-act" type="button" data-act="' + id + '"><i>' + icon + "</i><span><b>" + title + "</b><small>" + sub + "</small></span>" + IC.arrow + "</button>"; }
  var tr = function (v) { return String(v || "").trim(); };
  var validEmail = function (e) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e); };

  /* "Is this correct?" — nothing is "booked" or "sent" until the visitor confirms what is on screen (Ava's rule:
     a voice-only email is never trusted). S.review = { kind: "book" | "lead", sig, at, ok }; any change to the
     details (sig) cancels the confirmation. */
  var REVIEW_MODE = { book: "details", lead: "lead" };
  function sigOf(k) {
    if (k === "book") return [S.slot ? S.slot.id : "", tr(S.book.name), tr(S.book.email).toLowerCase(), tr(S.book.phone), tr(S.book.reason)].join("|");
    return [tr(S.lead.name), tr(S.lead.email).toLowerCase(), tr(S.lead.phone), tr(S.lead.need), S.lead.callback ? "cb" : ""].join("|");
  }
  var inReview = function (k) { return !!(S.review && S.review.kind === k); };
  var reviewFresh = function (k) { return inReview(k) && S.review.sig === sigOf(k); };
  function reviewRows(k) {
    var r = k === "book" ? [["Time", S.slot ? label(S.slot) + " PT" : ""], ["Name", S.book.name], ["Email", S.book.email], ["Phone", S.book.phone], ["Visit for", S.book.reason]]
      : [["Name", S.lead.name], ["Email", S.lead.email], ["Phone", S.lead.phone], ["Callback", S.lead.callback ? "Yes, please call me" : ""], ["What you need", S.lead.need]];
    return r.filter(function (x) { return tr(x[1]); });
  }
  function reviewCard(k) {
    return (k === "book" ? steps(3) : "") + '<div class="p-review"><p class="p-label">Is this correct?</p><dl class="p-rv">' +
      reviewRows(k).map(function (x) { return "<div><dt>" + x[0] + "</dt><dd>" + esc(tr(x[1])) + "</dd></div>"; }).join("") +
      '</dl><p class="p-sub">Please check your details. Nothing is ' + (k === "book" ? "booked" : "sent") + ' until you confirm.</p><div class="p-rv-acts"><button class="btn btn-gold btn-sm p-go" type="button" data-act="review-yes">' +
      (k === "book" ? "Yes, book my appointment" : "Yes, send it") + " " + IC.arrow + '</button><button class="btn btn-ghost btn-sm" type="button" data-act="review-edit">Edit</button></div></div>';
  }
  function openReview(k, fromTwin) {
    if (S.mode !== REVIEW_MODE[k]) go(REVIEW_MODE[k]);
    S.review = { kind: k, sig: sigOf(k), at: Date.now(), ok: false }; render({});
    var b = $('[data-act="review-yes"]', body); if (b && !fromTwin) b.focus({ preventScroll: true });
    if (fromTwin) return;
    var list = reviewRows(k).map(function (x) { return x[0].toLowerCase() + " " + tr(x[1]); }).join(", ");
    emit(k === "book"
      ? "The visitor pressed Confirm. Nothing is booked yet: the panel shows their details for review (" + list + "). Read the time, name and email back, spelling the email, and ask whether everything is correct. Fix anything they correct with fill_appointment_details. Book only after a clear yes, with confirm_appointment, or when they press Yes on the panel."
      : "The visitor is reviewing their contact details (" + list + "). Nothing is sent yet. Read the email back and ask whether it is correct. Send only after a clear yes, with submit_contact_details, or when they press Yes on the panel.", true);
  }

  var VIEWS = {
    home: function () {
      return '<p class="p-sub">Tap an option below — or press Talk to Maya to speak with me.</p><div class="p-actions">' +
        act("video", IC.play, "Dental Arts San Diego Video", FILM.dur + " · Meet the practice") +
        act("book", IC.cal, "Schedule an appointment with Dr. Nawrocki", "New patient visit · $125") +
        act("services", IC.compass, "Explore our dental services", "See what fits your smile") +
        act("lead", IC.chat, "Leave my contact info", "The office will be in touch") + "</div>";
    },
    video: function () {
      return '<div class="p-card"><div class="sv-film"><video playsinline preload="none" controlslist="nodownload noremoteplayback" poster="' + FILM.poster + '" aria-label="Dental Arts San Diego video"></video>' +
        '<button class="sv-play" type="button" aria-label="Play the Dental Arts San Diego video (' + FILM.dur + ')"><span class="ring">' + IC.play + '</span><span class="lbl"><b>Watch the video</b><small>' + FILM.dur + "</small></span></button></div>" +
        "<div><h4>Dental Arts San Diego</h4><p>A look inside Dr. Nawrocki's practice in El Cajon.</p></div></div>" +
        '<div class="p-svc-actions"><button class="btn btn-gold btn-sm" type="button" data-act="book">Schedule an appointment ' + IC.arrow + "</button></div>";
    },
    services: function () {
      return '<div class="p-svcs">' + SERVICES.map(function (s) { return '<button class="p-svc" type="button" data-svc="' + s.id + '"><span>' + esc(s.name) + "</span>" + IC.arrow + "</button>"; }).join("") + "</div>";
    },
    service: function () {
      var s = SERVICES.filter(function (x) { return x.id === S.svc; })[0] || SERVICES[0];
      // noreferrer: the practice's analytics never see this private page's address
      return '<div class="p-card"><div><h4>' + esc(s.name) + "</h4><p>" + esc(s.text) + "</p></div></div>" +
        '<div class="p-svc-actions"><button class="btn btn-gold btn-sm" type="button" data-act="book">Schedule an appointment ' + IC.arrow + "</button>" +
        '<a class="link" href="' + SITE + s.path + '" target="_blank" rel="noopener noreferrer">Open the full page ' + IC.arrow + "</a></div>";
    },
    days: function () {
      var d = days();
      if (!S.viewAll) {
        return steps(1) + '<p class="p-label">Suggested times · PT</p><div class="p-picks">' + pickSlots(3).map(function (s) {
          return '<button class="p-chip p-pick' + (S.slot && S.slot.id === s.id ? " on" : "") + '" type="button" data-slot="' + s.id + '">' + esc(s.day) + "<small>" + esc(s.time) + "</small></button>";
        }).join("") + '</div><button class="link p-week" type="button" data-act="week">See the whole week ' + IC.arrow + '</button><p class="p-sub">An appointment with Dr. Nawrocki in El Cajon.</p>';
      }
      return steps(1) + '<p class="p-label">Pick a day · PT</p><div class="p-days">' + d.map(function (x) {
        return '<button class="p-chip' + (S.day === x.key ? " on" : "") + '" type="button" data-day="' + x.key + '">' + esc(x.label) + "<small>" + x.slots.length + (x.slots.length === 1 ? " time" : " times") + "</small></button>";
      }).join("") + '</div><p class="p-sub">Closed Thursdays and Sundays.</p>';
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
        field("phone", "Phone", "tel", S.book.phone, true, 'autocomplete="tel" data-bind="book.phone"') +
        field("reason", "What would you like to be seen for?", "textarea", S.book.reason, true, 'data-bind="book.reason"') +
        '<button class="btn btn-gold btn-sm p-go" type="submit">Confirm my appointment ' + IC.arrow + '</button><p class="p-msg" role="status"></p></form>';
    },
    booked: function () {
      return '<div class="p-done"><span class="tick">✓</span><h4>That\'s how booking works.</h4><p>' + esc((S.booked ? S.booked.when + ". " : "") + DEMO_DONE) + '</p><button class="btn btn-ghost btn-sm" type="button" data-act="home">Back to Maya</button></div>';
    },
    lead: function () {
      if (inReview("lead")) return reviewCard("lead");
      return '<p class="p-sub">Tell us a little about what you need. The office will be in touch.</p><form class="p-form" novalidate>' +
        field("lname", "Your name", "text", S.lead.name, false, 'autocomplete="name" required data-bind="lead.name"') +
        field("lemail", "Email", "email", S.lead.email, false, 'autocomplete="email" required data-bind="lead.email"') +
        field("lphone", "Phone", "tel", S.lead.phone, true, 'autocomplete="tel" data-bind="lead.phone"') +
        '<label class="p-check"><input type="checkbox" id="mp-lcallback" data-bind="lead.callback"' + (S.lead.callback ? " checked" : "") + '><span>Request a callback</span></label>' +
        field("lneed", "What can we help with?", "textarea", S.lead.need, true, 'data-bind="lead.need"') +
        '<button class="btn btn-gold btn-sm p-go" type="submit">Send to the office ' + IC.arrow + '</button><p class="p-msg" role="status"></p></form>';
    },
    leadDone: function () { return '<div class="p-done"><span class="tick">✓</span><h4>Got it.</h4><p>Demo only - nothing was sent to the office.</p><button class="btn btn-ghost btn-sm" type="button" data-act="home">Back to Maya</button></div>'; },
  };
  function render(opts) {
    opts = opts || {};
    titleEl.textContent = TITLES[S.mode] || "Maya";
    panel.classList.toggle("is-home", S.mode === "home");
    backBtn.hidden = S.mode === "home";
    flag.hidden = S.mode === "home";                 // "Demo" on every view past the opening one
    body.innerHTML = (VIEWS[S.mode] || VIEWS.home)();
    body.scrollTop = 0;                              // the panel scrolls on desktop (the stage keeps its size): start each view at the top
    body.style.animation = "none"; void body.offsetWidth; body.style.animation = "";
    var form = $("form", body);
    if (form) form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (S.mode === "details") TOOLS_IMPL.confirm_appointment({}); else TOOLS_IMPL.submit_contact_details({});
    });
    if (S.mode === "video") wireFilm();
    if (opts.focus) { var f = $("input, button", body); if (f) f.focus({ preventScroll: true }); }
  }
  function setMsg(text) { var m = $(".p-msg", body); if (m) { m.classList.add("err"); m.textContent = text; } }
  function flash(el) { el.classList.add("flash"); setTimeout(function () { el.classList.remove("flash"); }, 1100); reveal(el); }
  // Scroll the panel (never the page) so a field Maya just filled is in view.
  function reveal(el) {
    if (!el || body.scrollHeight <= body.clientHeight + 1) return;
    var b = body.getBoundingClientRect(), r = el.getBoundingClientRect();
    if (r.top < b.top) body.scrollTop -= (b.top - r.top) + 8;
    else if (r.bottom > b.bottom) body.scrollTop += (r.bottom - b.bottom) + 8;
  }

  // The practice video plays in the panel, with controls, and never on top of another voice.
  function wireFilm() {
    var box = $(".sv-film", body); if (!box) return;
    var v = $("video", box), btn = $(".sv-play", box);
    btn.addEventListener("click", function () {
      if (hearing) stopHearing();
      avaSoundOff();
      if (!v.getAttribute("src")) v.src = FILM.src;
      v.controls = true; box.classList.add("playing");
      var p = v.play(); if (p && p.catch) p.catch(function () { box.classList.remove("playing"); v.controls = false; });
      track("maya_practice_video", {});
    });
    v.addEventListener("play", function () { emit("The visitor is playing the practice video (" + FILM.dur + "). Stay quiet until it ends or they pause it.", false); });
    v.addEventListener("pause", function () { if (!v.ended) emit("The visitor paused the practice video. You may speak again.", false); });
    v.addEventListener("ended", function () { emit("The visitor finished watching the practice video. You may speak again.", false); });
  }
  function pauseFilm() { var v = $(".sv-film video", body); if (v && !v.paused) v.pause(); }

  /* ═════════ Visitor clicks and typing (each one is reported to the live Maya) ═════════ */
  body.addEventListener("click", function (e) {
    var t = e.target.closest("[data-act], [data-svc], [data-day], [data-slot]"); if (!t) return;
    var a = t.getAttribute("data-act");
    if (a === "book") { TOOLS_IMPL.show_appointment_times({ view: "suggested" }); emit("The visitor opened the appointment panel.", false); track("maya_panel", { action: "book_open" }); }
    else if (a === "week") { S.viewAll = true; render({}); emit("The visitor is looking at the whole week.", false); }
    else if (a === "video") { go("video"); emit("The visitor opened the practice video. It plays only when they press play.", false); track("maya_panel", { action: "video_open" }); }
    else if (a === "services") { go("services"); emit("The visitor is browsing the list of dental services.", false); track("maya_panel", { action: "services" }); }
    else if (a === "lead") { go("lead", { focus: true }); emit("The visitor opened the leave-your-contact-info form.", false); track("maya_panel", { action: "lead_open" }); }
    else if (a === "home") { S.hist = []; go("home", { replace: true }); }
    else if (a === "review-yes") { if (!S.review) return; S.review.ok = true; (S.review.kind === "book" ? TOOLS_IMPL.confirm_appointment : TOOLS_IMPL.submit_contact_details)({}); }
    else if (a === "review-edit") { S.review = null; render({ focus: true }); emit("The visitor chose to edit their details. Nothing has been booked or sent.", false); }
    else if (t.hasAttribute("data-svc")) { TOOLS_IMPL.show_dental_service({ service: t.getAttribute("data-svc") }); emit("The visitor is looking at " + S.svc + " (" + (SERVICES.filter(function (s) { return s.id === S.svc; })[0] || {}).name + ").", false); }
    else if (t.hasAttribute("data-day")) { S.day = t.getAttribute("data-day"); S.slot = null; go("times"); emit("The visitor picked " + days().filter(function (x) { return x.key === S.day; })[0].slots[0].long + " and is choosing a time.", false); }
    else if (t.hasAttribute("data-slot")) { var sl = (S.slots || []).filter(function (x) { return x.id === t.getAttribute("data-slot"); })[0]; if (sl) { selectSlot(sl, false); emit("The visitor selected " + label(sl) + ".", false); } }
  });
  var BIND_LABEL = { "book.name": "name", "book.email": "email", "book.phone": "phone number", "book.reason": "reason for the visit", "lead.name": "name", "lead.email": "email", "lead.phone": "phone number", "lead.need": "note" };
  body.addEventListener("input", function (e) {
    var b = e.target.getAttribute && e.target.getAttribute("data-bind"); if (!b) return;
    var p = b.split("."); S[p[0]][p[1]] = e.target.type === "checkbox" ? e.target.checked : e.target.value;
  });
  body.addEventListener("change", function (e) {
    var b = e.target.getAttribute && e.target.getAttribute("data-bind"); if (!b || !BIND_LABEL[b] || !String(e.target.value).trim()) return;
    emit("The visitor typed their " + BIND_LABEL[b] + ": " + String(e.target.value).trim() + ".", false);
  });

  /* ═════════ Maya's DEMO tools — the one way anything changes the panel ═════════
     Same shapes and two-step confirmation as Ava's contract (livebrand-ops/ava-nv2/PANEL-INTEGRATION-SPEC.md), with
     dental wording and different names. They call no server: "booked" and "sent" only change what the panel shows. */
  function selectSlot(s, fromTwin) { S.slot = s; S.day = s.date; go("details", { focus: !fromTwin }); }
  function stillNeeded(k) {
    var n = [], o = k === "book" ? S.book : S.lead;
    if (k === "book" && !S.slot) n.push("time");
    if (!tr(o.name)) n.push("name");
    if (!validEmail(tr(o.email))) n.push("email");
    if (k === "lead" && o.callback && String(o.phone).replace(/\D/g, "").length < 7) n.push("phone");
    return n;
  }
  function bookState() { return { time: S.slot ? label(S.slot) : null, name: S.book.name, email: S.book.email, phone: S.book.phone, reason: S.book.reason }; }
  function leadState() { return { name: S.lead.name, email: S.lead.email, phone: S.lead.phone, need: S.lead.need, callback: !!S.lead.callback }; }
  function needConfirm(k) {
    return { ok: false, needs_confirmation: true, details: k === "book" ? bookState() : leadState(),
      message: "Nothing is " + (k === "book" ? "booked" : "sent") + " yet. The panel now shows these details to the visitor for review. Read them back (spell the email) and ask: 'Is all of that correct?' Fix anything they correct, then call " + (k === "book" ? "confirm_appointment" : "submit_contact_details") + " again only after they clearly say yes." };
  }
  // What is already on the panel when a session starts, so she never re-asks for what the visitor already did.
  function panelSummary() {
    var bits = ["The demo panel is visible beside you"];
    if (S.booked) bits.push("a demo appointment is already confirmed for " + S.booked.when);
    else {
      if (S.slot) bits.push("the visitor has selected " + label(S.slot));
      var have = [S.book.name && "name " + S.book.name, S.book.email && "email " + S.book.email, S.book.phone && "phone " + S.book.phone].filter(Boolean);
      if (have.length) bits.push("they have typed their " + have.join(", "));
    }
    return bits.join("; ") + ".";
  }

  var TOOLS_IMPL = {
    show_appointment_times: function (a) {
      a = a || {}; S.slots = S.slots || demoSlots(); S.slot = null; S.day = null; S.viewAll = a.view === "all"; S.booked = null;
      if (a.date) { var hit = days().filter(function (x) { return x.key === a.date; })[0]; if (hit) { S.day = hit.key; S.viewAll = true; } }
      go("days"); if (S.day) go("times");
      return { ok: true, demo: true, timezone: "Pacific time, the practice's own time zone", suggested: pickSlots(3).map(info),
        days: days().map(function (x) { return { date: x.key, label: x.slots[0].long, open: x.slots.length }; }), note: "The office is closed on Thursdays and Sundays." };
    },
    select_appointment_time: function (a) {
      a = a || {};
      if (!S.slots) return { ok: false, error: "Call show_appointment_times first." };
      var s = findSlot(a.date, a.time);
      if (!s) return { ok: false, error: "That time is not available", alternatives: pickSlots(3).map(info) };
      selectSlot(s, TOOLS_IMPL.__fromTwin); return { ok: true, selected: info(s) };
    },
    fill_appointment_details: function (a) {
      a = a || {}; var changed = [];
      ["name", "email", "phone", "reason"].forEach(function (k) { if (a[k] != null && String(a[k]).trim() !== "") { S.book[k] = String(a[k]).trim(); changed.push(k); } });
      if (S.slot && S.mode !== "details") go("details");
      else changed.forEach(function (k) { var el = $("#mp-" + k, body); if (el) el.value = S.book[k]; });
      changed.forEach(function (k) { var el = $("#mp-" + k, body); if (el) flash(el); });   // the visitor sees Maya writing
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
      S.booked = { when: label(S.slot) + " (Pacific time)" }; S.review = null; go("booked"); track("maya_demo_booking", {});
      if (!fromTwin) emit("The visitor confirmed the demo appointment for " + S.booked.when + ". Nothing was sent to the office: this page is a demonstration. Tell them, briefly, that this is how booking works, and that for a real appointment they can call 619-444-1001.", true);
      return { ok: true, demo: true, booked: true, when: S.booked.when,
        message: "DEMO: the panel shows the appointment as confirmed, but nothing was sent to the office. Tell the visitor, briefly, that this is how booking works on this demonstration page, and that for a real appointment they can call 619-444-1001." };
    },
    show_contact_form: function () { go("lead"); return { ok: true, demo: true, note: "The contact form is open on the panel. Ask for their details one at a time, fill them in with fill_contact_details, or let them type." }; },
    fill_contact_details: function (a) {
      a = a || {}; var changed = [];
      ["name", "email", "phone", "need"].forEach(function (k) { if (a[k] != null && String(a[k]).trim() !== "") { S.lead[k] = String(a[k]).trim(); changed.push(k); } });
      if (a.callback != null) { S.lead.callback = a.callback === true || a.callback === "true"; changed.push("callback"); }
      var ID = { name: "lname", email: "lemail", phone: "lphone", need: "lneed", callback: "lcallback" };
      if (S.mode !== "lead") go("lead");
      else changed.forEach(function (k) { var el = $("#mp-" + ID[k], body); if (el) { if (k === "callback") el.checked = !!S.lead.callback; else el.value = S.lead[k]; } });
      changed.forEach(function (k) { var el = $("#mp-" + ID[k], body); if (el && k !== "callback") flash(el); });
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
      S.review = null; go("leadDone"); track("maya_demo_contact", {});
      if (!fromTwin) emit("The visitor confirmed their contact details. Nothing was sent to the office: this page is a demonstration. Tell them, briefly, that this is how it works, and that they can reach the office at 619-444-1001.", true);
      return { ok: true, demo: true, sent: false, message: "DEMO: the panel shows the details as sent, but nothing went to the office. Tell the visitor, briefly, that this is how it works on this demonstration page, and that they can reach the office at 619-444-1001." };
    },
    show_dental_service: function (a) {
      var id = a && a.service, s = SERVICES.filter(function (x) { return x.id === id; })[0];
      if (!s) { go("services"); return { ok: false, error: "Unknown service", services: SERVICES.map(function (x) { return { id: x.id, name: x.name }; }) }; }
      S.svc = id; go("service"); track("maya_service", { service: id });
      return { ok: true, service: s.name, summary: s.text };
    },
    show_practice_video: function () { go("video"); return { ok: true, note: "The panel shows the practice video, " + FILM.dur + " long. The visitor presses play themselves; stay quiet while it plays." }; },
  };

  var str = function (d) { return { type: "string", description: d }; };
  var TOOLS = [
    { name: "show_appointment_times", description: "DEMO booking panel. Show open appointment times with Dr. Nawrocki on the panel beside you, which the visitor can see. Call it as soon as the visitor wants to book, schedule or come in. view \"suggested\" shows three picks; \"all\" shows the whole week. Read back two or three options in natural speech, never the whole list. Times are Pacific time. The office is closed Thursdays and Sundays.",
      inputSchema: { type: "object", properties: { view: { type: "string", enum: ["suggested", "all"] }, date: str("Optional day to open, YYYY-MM-DD") } } },
    { name: "select_appointment_time", description: "Select the time the visitor chose on the panel. Use the date (YYYY-MM-DD) and time (e.g. \"9:30 AM\") exactly as show_appointment_times returned them. If it is not available, offer the returned alternatives.",
      inputSchema: { type: "object", properties: { date: str("YYYY-MM-DD, exactly as returned"), time: str("e.g. 9:30 AM, exactly as returned") }, required: ["date", "time"] } },
    { name: "fill_appointment_details", description: "Fill in the appointment form on the panel each time you learn a detail: the visitor's name, email, phone number, or a short reason for the visit (a few words, such as cleaning or toothache - never medical history). Only include the fields you just learned. Read each detail back; spell the email back.",
      inputSchema: { type: "object", properties: { name: str("Full name"), email: str("Email address"), phone: str("Phone number"), reason: str("A short reason for the visit, a few words") } } },
    { name: "confirm_appointment", description: "Confirm the DEMO appointment. The first call never confirms: it shows the visitor their details for review and returns needs_confirmation. Read back the time, name and email (spell the email), ask whether everything is correct, fix anything with fill_appointment_details, and call confirm_appointment again only after a clear yes. Nothing is ever sent to the office - this page is a demonstration.",
      inputSchema: { type: "object", properties: {} }, annotations: { destructiveHint: true } },
    { name: "show_contact_form", description: "Open the leave-your-contact-info form on the panel, for a visitor who would like the office to get in touch instead of booking now.",
      inputSchema: { type: "object", properties: {} } },
    { name: "fill_contact_details", description: "Fill in the contact form on the panel each time you learn a detail: name, email, phone number, a short note about what they need, and callback (true if they want a phone call). Only include the fields you just learned. Read each detail back; spell the email back.",
      inputSchema: { type: "object", properties: { name: str("Full name"), email: str("Email address"), phone: str("Phone number"), need: str("A short note about what they need"), callback: { type: "boolean", description: "true if they would like a phone call" } } } },
    { name: "submit_contact_details", description: "Send the DEMO contact form. The first call never sends: it shows the visitor their details for review. Read them back (spell the email), ask whether they are correct, and call again only after a clear yes. Nothing is ever sent to the office - this page is a demonstration.",
      inputSchema: { type: "object", properties: {} }, annotations: { destructiveHint: true } },
    { name: "show_dental_service", description: "Show one of the practice's dental services on the panel beside you, so the visitor sees what you are describing. Call it when you start talking about one of these. Ids: preventive, cosmetic, restorative, implantology, oralsurgery, fullmouth, allonx (All-on-X and All-on-4 implants), aligners (Invisalign and clear aligners), wisdom, emergencies.",
      inputSchema: { type: "object", properties: { service: { type: "string", enum: SERVICES.map(function (s) { return s.id; }) } }, required: ["service"] } },
    { name: "show_practice_video", description: "Open the practice's video (" + FILM.dur + ") on the panel beside you, for a visitor who wants to see the practice or meet Dr. Nawrocki. The visitor presses play themselves. Stay quiet while it plays.",
      inputSchema: { type: "object", properties: {} } },
  ];
  function execTool(name, args) {
    var fn = TOOLS.some(function (t) { return t.name === name; }) && TOOLS_IMPL[name];   // Maya can only reach her own tools
    if (!fn) return Promise.resolve({ ok: false, error: "Unknown tool " + name });
    TOOLS_IMPL.__fromTwin = true; track("maya_tool", { tool: name });
    var done = function (m) { TOOLS_IMPL.__fromTwin = false; return m; };
    try { return Promise.resolve(fn(args || {})).then(done, function (e) { return done({ ok: false, error: String(e && e.message || e) }); }); }
    catch (e) { return Promise.resolve(done({ ok: false, error: String(e && e.message || e) })); }
  }
  // Must run right BEFORE Maya's sdk.init(): replaces whatever tools are on the page (Ava's) with Maya's own.
  function installMayaTools() {
    var mc = document.modelContext;
    if (!mc) { mc = new EventTarget(); try { Object.defineProperty(document, "modelContext", { value: mc, configurable: true }); } catch (e) { document.modelContext = mc; } }
    mc.getTools = function () { return Promise.resolve(TOOLS.map(function (t) { return { name: t.name, description: t.description, inputSchema: t.inputSchema, annotations: t.annotations }; })); };
    mc.executeTool = function (tool, jsonArgs) {
      var args = {}; try { args = typeof jsonArgs === "string" ? JSON.parse(jsonArgs || "{}") : (jsonArgs || {}); } catch (e) {}
      return execTool(tool && tool.name ? tool.name : tool, args);
    };
  }

  /* ═════════ Her intro: muted loop; the sound icon replays it from the start with captions ═════════ */
  // Timed to take 3's speech (ffmpeg silencedetect, 5 Oct): each line appears just before she says it.
  var LINES = [[0.3, 6.3, "Hi, I'm Maya, Dr. Alena Nawrocki's AI assistant at Dental Arts San Diego."], [6.3, 9.3, "From cleanings to implants and All-on-4,"],
    [9.3, 12.9, "Invisalign, veneers, crowns and root canals,"], [12.9, 16.75, "wisdom teeth, gum care, sleep apnea and same-day emergencies —"],
    [16.75, 18.9, "we do it all in one place."], [18.9, 23.15, "Our team speaks English, Russian, Spanish, Tagalog and Japanese."],
    [23.15, 26.4, "Tap the Talk to Maya button and ask me anything."]];
  var hearing = false, lastT = 0, visible = false, capKey = "";
  function caption(lines) { var k = JSON.stringify(lines || []); if (k === capKey) return; capKey = k; capBox.innerHTML = (lines || []).map(function (l) { return '<span class="cap">' + esc(l) + "</span>"; }).join(""); }
  function ensureSrc() { if (!vid.getAttribute("src")) vid.src = vid.getAttribute("data-src"); }
  function playQuiet() { if (RM || hearing || liveState !== "idle") return; ensureSrc(); vid.muted = true; var p = vid.play(); if (p && p.catch) p.catch(function () {}); }
  function soundIcon(on) { hearBtn.setAttribute("aria-pressed", on ? "true" : "false"); $("use", hearBtn).setAttribute("href", on ? "#i-vol" : "#i-sound-off"); var l = on ? "Mute Maya's introduction" : "Play Maya's introduction with sound"; hearBtn.setAttribute("aria-label", l); hearBtn.title = l; }
  function stopHearing() { hearing = false; vid.muted = true; soundIcon(false); caption([]); if (RM) vid.pause(); }
  var ownClick = false;                              // our own clicks on Ava's buttons skip the guard below
  function clickAva(b) { ownClick = true; try { b.click(); } finally { ownClick = false; } }
  function avaSoundOff() { var b = ava && $(".ava-sound", ava); if (b && b.getAttribute("aria-pressed") === "true") clickAva(b); }
  hearBtn.addEventListener("click", function () {
    if (liveState !== "idle") return;
    if (hearing) { stopHearing(); return; }
    avaSoundOff(); pauseFilm();                      // never two voices at once
    ensureSrc(); hearing = true; vid.currentTime = 0; vid.muted = false; lastT = 0;
    var p = vid.play(); if (p && p.catch) p.catch(function () { stopHearing(); });
    soundIcon(true); track("maya_hear", {});
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

  /* ═════════ Ava's stage: one live avatar at a time ═════════ */
  function avaState() {
    if (!ava || !ava.classList.contains("is-live")) return "idle";
    var b = $(".ava-talk", ava);
    return b && b.classList.contains("is-on") ? "live" : "connecting";
  }
  function endAva() {
    var b = $(".ava-talk", ava); if (b && !b.disabled) clickAva(b);        // her own "End conversation"
    var m = document.getElementById("ava-mount"); if (m) m.innerHTML = "";  // free the SDK's container id now, not after her fade
  }
  // Clicks on Ava's stage while Maya is busy. Capture phase, so this runs before ava-panel.js sees the click.
  document.addEventListener("click", function (e) {
    var t = e.target && e.target.closest ? e.target.closest("#ava-stage .ava-talk, #ava-stage .ava-sound") : null;
    if (!t || ownClick) return;
    pauseFilm();                                     // Ava's intro or Ava live: the practice video stops
    if (t.classList.contains("ava-sound")) { if (hearing) stopHearing(); return; }
    if (liveState === "idle") return;
    if (liveState === "connecting") { e.stopPropagation(); e.preventDefault(); say_("Maya is still connecting — end her conversation first.", 5000); return; }
    endLive("", true);                               // Maya live: end her, then Ava's own handler starts Ava
  }, true);

  /* ═════════ "Talk to Maya" — the live conversation ═════════ */
  var sdkLoading = null, capTimer = null, readyTimer = null, revealed = false;
  var htmlBg = getComputedStyle(document.documentElement).backgroundColor, bodyBg = getComputedStyle(document.body).backgroundColor;
  // The SDK injects `body,html{background:transparent}` the moment its script loads — re-assert the page colors.
  function pinBg() { document.documentElement.style.setProperty("background-color", htmlBg, "important"); document.body.style.setProperty("background-color", bodyBg, "important"); }
  function say_(text, ms) { toast.textContent = text; toast.hidden = !text; if (text && ms) setTimeout(function () { if (toast.textContent === text) toast.hidden = true; }, ms); }
  function setTalk(lbl, on) { $("span", talkBtn).textContent = lbl; talkBtn.disabled = liveState === "connecting"; talkBtn.classList.toggle("is-on", !!on); }
  function rememberSeen() { try { document.cookie = "aa_maya_seen=1; Path=" + CFG.SEEN_PATH + "; Max-Age=31536000; Secure; SameSite=Lax"; } catch (e) {} }
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
  function armReveal() { if (!revealed && instance) waitForVideo(45, function (v) { onFirstFrame(v, function () { whenSharp(v, reveal); }); }); }
  function reveal() {
    if (revealed || !instance) return; revealed = true; liveState = "live";
    if (readyTimer) { clearTimeout(readyTimer); readyTimer = null; }
    avStage.classList.add("live-ready"); say_("", 0); setTalk("End conversation", true); pinBg();
    rememberSeen();
    setTimeout(function () { if (liveState === "live") vid.pause(); }, 900);
    track("maya_live_session", {});
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
    avStage.classList.remove("live", "live-ready"); setTalk("Talk to Maya", false);
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
    endLive(st === 503 || st === 404 ? "Maya's live conversation is arriving very soon. In the meantime, try the panel beside her." :
      st === 401 ? "This private page needs your portfolio link — open it again from your email." :
      st === 429 || st >= 500 ? "Maya's talking with other visitors right now — try again in a few minutes." :
      "I couldn't start the live conversation just now. The panel beside me still works.", true);
  }
  async function startLive() {
    if (liveState !== "idle") return;
    var a = avaState();
    if (a === "connecting") { say_("Ava is still connecting — end her conversation first.", 5000); return; }
    liveState = "connecting"; if (hearing) fadeOutVoice(); else caption([]);
    avaSoundOff(); pauseFilm();
    if (a === "live") endAva();
    setTalk("Connecting…", false); say_("Connecting to Maya…", 0); avStage.classList.add("live"); stage.classList.add("is-live");
    if (!RM && vid.paused) { ensureSrc(); vid.muted = true; var pq = vid.play(); if (pq && pq.catch) pq.catch(function () {}); }
    readyTimer = setTimeout(function () { if (liveState === "connecting") say_("Almost there… allow the microphone if your browser asks.", 0); }, 5000);
    try {
      installMayaTools();                            // before init: the SDK reads the page's tools when it attaches
      await loadSdk(); pinBg();
      var res = await fetch(CFG.TOKEN_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
      if (!res.ok) { var err = new Error("token " + res.status); err.status = res.status; throw err; }
      var data = await res.json(); var sdk = window.napsterCompanionApiSDK || window.NapsterCompanionApiSdk;
      if (!sdk) throw new Error("sdk missing");
      if (liveState !== "connecting") return;        // ended while the token was on its way
      installMayaTools(); pinBg();
      instance = await sdk.init(data.token, {
        // The SDK's default 4px border (red while muted or idle) stays off on every stage (AVATAR-STAGE-SPEC §8).
        mountContainer: "#maya-mount", avatarStyle: { view: "rectangle", borderWidth: "0px", borderStyle: "none" }, debug: /[?&]debug\b/.test(location.search),
        features: { showSDKLoader: { enabled: false }, screenShare: { enabled: true }, pictureInPicture: { enabled: true } },
        onAvatarReady: armReveal, onDestroy: function () { if (instance) endedState(""); },
      });
      instance.showAvatar(); pinBg();
      setTimeout(function () { if (instance) armReveal(); }, 3000);
      capTimer = setTimeout(function () { endLive("That's the ten-minute limit — press Talk to Maya to keep going."); }, CFG.CAP_S * 1000);
      emit(panelSummary(), false);
    } catch (e) { liveError(e); }
  }
  talkBtn.addEventListener("click", function () {
    if (liveState === "live") { endLive(""); return; }
    startLive();
  });

  // For the console and tests: what the live Maya would see.
  window.MayaPanel = { tools: TOOLS, exec: execTool, state: function () { return S; } };
  render({});
})();
