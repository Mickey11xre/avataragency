/* Paul's stage: the third stage on the private /avatarstages page. Michael, 6 Oct: "place him on the avatar private
 * page underneath Maya". It has the same look, layout and demo panel as Maya's (maya-stage.js), worded for Paul
 * Small, a Compass real estate advisor who specializes in West Los Angeles (an AvatarAgency client).
 *
 * Panel, top to bottom (Michael, 6 Oct): "Mar Vista" and "Hermosa Beach" (his two neighborhood films, played in the
 * panel), "Schedule an appointment with Paul", "Leave my contact info".
 *
 * THE PANEL IS A DEMO, like Maya's (Michael, 6 Oct). It shows sample times and the same "Is this correct?" card,
 * and nothing is booked or sent anywhere.
 *
 * "Talk to Paul" went LIVE on 7 Oct (Michael: "Paul's NV2 is now ready"); it was "coming soon" until then. CFG.LIVE switches the
 * live session on. That code mirrors Maya's: one live avatar at a time, and his own tools installed right before his
 * init. It has never run, so test it live on the day it is switched on.
 *
 * His films and intro never play over another voice. They pause when Ava's or Maya's intro sound, film or live
 * session starts, and they will not start while Ava or Maya is live.
 */
(function () {
  "use strict";
  var stage = document.getElementById("paul-stage");
  if (!stage) return;
  var RM = document.documentElement.classList.contains("rm");
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var track = function (n, p) { try { if (window.gtag) gtag("event", n, p || {}); } catch (e) {} };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var CFG = {
    LIVE: true,          // Talk to Paul is live (7 Oct): NV2 twin 6a0f69cd + his stage agent, via /avatarstages/api/paul-token
    TOKEN_ENDPOINT: "/avatarstages/api/paul-token",
    SDK_URL: "https://cdn.jsdelivr.net/npm/@touchcastllc/napster-companion-api@1.5.0/lib/index.standalone.js",
    CAP_S: 600,          // ten-minute session cap, as for Ava and Maya
    INTRO_END: 26.1,     // media/paul-intro.mp4 is 26.2 s (Seedance 2.0, three pieces joined at 11.9 s and 22.2 s)
  };

  var avStage = $(".stage-av", stage), vid = $(".ava-video", stage), capBox = $(".ava-caption", stage), hearBtn = $(".ava-sound", stage),
    talkBtn = $(".ava-talk", stage), toast = $(".ava-toast", stage), mount = $("#paul-mount");
  var panel = $("#paul-panel"), body = $(".panel-body", panel), titleEl = $(".panel-title", panel), backBtn = $(".panel-back", panel), flag = $(".panel-flag", panel);
  var instance = null, liveState = "idle";   // idle | connecting | live

  /* ═════════ Content ═════════ */
  var IC = {
    cal: '<svg viewBox="0 0 24 24"><rect x="4" y="5.5" width="16" height="14.5" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    chat: '<svg viewBox="0 0 24 24"><path d="M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 19 16.5h-7l-4.5 3.5v-3.5H5A1.5 1.5 0 0 1 3.5 15V7A1.5 1.5 0 0 1 5 5.5z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
    play: '<svg><use href="#i-play"/></svg>',
    arrow: '<svg><use href="#i-arrow"/></svg>',
  };
  /* His two films, both served behind the same aa_pf gate as this page:
     - Mar Vista: the private portfolio's own copy (work/assets/film). His portal shows it as a Drive embed.
     - Hermosa Beach: the portfolio's film route (functions/work/film/[[path]].js), slug paul-hermosa =
       clients/psmall/hermosa-beach-video-v4.mp4, the version Paul approved. */
  var FILMS = {
    marvista: { src: "/work/assets/film/paul-marvista.mp4", poster: "/work/assets/poster/paul-marvista.webp", dur: "1:32",
      title: "Mar Vista", sub: "Paul's first neighborhood film", blurb: "Paul's first neighborhood film: a look at Mar Vista, on LA's West Side." },
    hermosa: { src: "/work/film/paul-hermosa.mp4", poster: "/work/assets/poster/paul-hermosa.webp", dur: "1:49",
      title: "My Hermosa Beach", sub: "A \"My Los Angeles\" episode", blurb: "A \"My Los Angeles\" episode, with Paul as your guide to Hermosa Beach." },
  };

  /* ═════════ State + rendering ═════════ */
  var S = { mode: "home", hist: [], slots: null, day: null, slot: null, viewAll: false, booked: null, film: "marvista", review: null,
    book: { name: "", email: "", phone: "", topic: "" }, lead: { name: "", email: "", phone: "", need: "", callback: false } };
  var TITLES = { home: "How can I help?", days: "Schedule an appointment", times: "Schedule an appointment", details: "Schedule an appointment",
    booked: "Demo booking", lead: "Leave your contact info", leadDone: "Demo" };
  var DEMO_DONE = "Demo only - no appointment was made and nothing was sent to Paul.";
  /* Tells the live Paul what the visitor just did on the panel, so he never re-asks for something they typed.
     "[Booking panel]" is the prefix his instructions will react to; speak=true only when he should answer aloud. */
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
  function goBack() { pauseFilm(); S.mode = S.hist.pop() || "home"; S.review = null; render({}); }
  backBtn.addEventListener("click", goBack);

  /* Sample times for the demo, Pacific time: Monday to Friday 9-5, Saturday 10-2. Plain strings: nothing is booked. */
  var HOURS = { 1: [9, 17], 2: [9, 17], 3: [9, 17], 4: [9, 17], 5: [9, 17], 6: [10, 14] };
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
    return '<div class="p-field"><label for="pp-' + id + '">' + lbl + (opt ? " <span>(optional)</span>" : "") + "</label>" +
      (type === "textarea" ? '<textarea id="pp-' + id + '" rows="3" ' + (attrs || "") + ">" + esc(val) + "</textarea>"
        : '<input id="pp-' + id + '" type="' + type + '" value="' + esc(val) + '" ' + (attrs || "") + ">") + "</div>";
  };
  function act(id, icon, title, sub) { return '<button class="p-act" type="button" data-act="' + id + '"><i>' + icon + "</i><span><b>" + title + "</b><small>" + sub + "</small></span>" + IC.arrow + "</button>"; }
  var tr = function (v) { return String(v || "").trim(); };
  var validEmail = function (e) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e); };

  /* "Is this correct?": nothing is "booked" or "sent" until the visitor confirms what is on screen. This is Ava's
     rule: a voice-only email is never trusted. Any change to the details cancels the confirmation. */
  var REVIEW_MODE = { book: "details", lead: "lead" };
  function sigOf(k) {
    if (k === "book") return [S.slot ? S.slot.id : "", tr(S.book.name), tr(S.book.email).toLowerCase(), tr(S.book.phone), tr(S.book.topic)].join("|");
    return [tr(S.lead.name), tr(S.lead.email).toLowerCase(), tr(S.lead.phone), tr(S.lead.need), S.lead.callback ? "cb" : ""].join("|");
  }
  var inReview = function (k) { return !!(S.review && S.review.kind === k); };
  var reviewFresh = function (k) { return inReview(k) && S.review.sig === sigOf(k); };
  function reviewRows(k) {
    var r = k === "book" ? [["Time", S.slot ? label(S.slot) + " PT" : ""], ["Name", S.book.name], ["Email", S.book.email], ["Phone", S.book.phone], ["To talk about", S.book.topic]]
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
      return '<p class="p-sub">' + (CFG.LIVE ? "Tap an option below — or press Talk to Paul to speak with me." : "Tap an option below. Paul's live conversation is coming soon.") + '</p><div class="p-actions">' +
        act("film-marvista", IC.play, "Mar Vista", FILMS.marvista.dur + " · " + FILMS.marvista.sub) +
        act("film-hermosa", IC.play, "Hermosa Beach", FILMS.hermosa.dur + " · " + esc(FILMS.hermosa.sub)) +
        act("book", IC.cal, "Schedule an appointment with Paul", "A no-pressure conversation") +
        act("lead", IC.chat, "Leave my contact info", "Paul will be in touch") + "</div>";
    },
    film: function () {
      var f = FILMS[S.film];
      return '<div class="p-card"><div class="sv-film"><video playsinline preload="none" controlslist="nodownload noremoteplayback" poster="' + f.poster + '" aria-label="' + esc(f.title) + '"></video>' +
        '<button class="sv-play" type="button" aria-label="Play ' + esc(f.title) + " (" + f.dur + ')"><span class="ring">' + IC.play + '</span><span class="lbl"><b>Watch the film</b><small>' + f.dur + "</small></span></button></div>" +
        "<div><h4>" + esc(f.title) + "</h4><p>" + esc(f.blurb) + "</p></div></div>" +
        '<div class="p-svc-actions"><button class="btn btn-gold btn-sm" type="button" data-act="book">Schedule an appointment ' + IC.arrow + "</button></div>";
    },
    days: function () {
      var d = days();
      if (!S.viewAll) {
        return steps(1) + '<p class="p-label">Suggested times · PT</p><div class="p-picks">' + pickSlots(3).map(function (s) {
          return '<button class="p-chip p-pick' + (S.slot && S.slot.id === s.id ? " on" : "") + '" type="button" data-slot="' + s.id + '">' + esc(s.day) + "<small>" + esc(s.time) + "</small></button>";
        }).join("") + '</div><button class="link p-week" type="button" data-act="week">See the whole week ' + IC.arrow + '</button><p class="p-sub">A no-pressure conversation with Paul.</p>';
      }
      return steps(1) + '<p class="p-label">Pick a day · PT</p><div class="p-days">' + d.map(function (x) {
        return '<button class="p-chip' + (S.day === x.key ? " on" : "") + '" type="button" data-day="' + x.key + '">' + esc(x.label) + "<small>" + x.slots.length + (x.slots.length === 1 ? " time" : " times") + "</small></button>";
      }).join("") + '</div><p class="p-sub">Sample times, Monday to Saturday.</p>';
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
        field("topic", "What would you like to talk about?", "textarea", S.book.topic, true, 'data-bind="book.topic"') +
        '<button class="btn btn-gold btn-sm p-go" type="submit">Confirm my appointment ' + IC.arrow + '</button><p class="p-msg" role="status"></p></form>';
    },
    booked: function () {
      return '<div class="p-done"><span class="tick">✓</span><h4>That\'s how booking works.</h4><p>' + esc((S.booked ? S.booked.when + ". " : "") + DEMO_DONE) + '</p><button class="btn btn-ghost btn-sm" type="button" data-act="home">Back to Paul</button></div>';
    },
    lead: function () {
      if (inReview("lead")) return reviewCard("lead");
      return '<p class="p-sub">Tell Paul a little about what you need. He\'ll be in touch.</p><form class="p-form" novalidate>' +
        field("lname", "Your name", "text", S.lead.name, false, 'autocomplete="name" required data-bind="lead.name"') +
        field("lemail", "Email", "email", S.lead.email, false, 'autocomplete="email" required data-bind="lead.email"') +
        field("lphone", "Phone", "tel", S.lead.phone, true, 'autocomplete="tel" data-bind="lead.phone"') +
        '<label class="p-check"><input type="checkbox" id="pp-lcallback" data-bind="lead.callback"' + (S.lead.callback ? " checked" : "") + '><span>Request a callback</span></label>' +
        field("lneed", "What can Paul help with?", "textarea", S.lead.need, true, 'data-bind="lead.need"') +
        '<button class="btn btn-gold btn-sm p-go" type="submit">Send to Paul ' + IC.arrow + '</button><p class="p-msg" role="status"></p></form>';
    },
    leadDone: function () { return '<div class="p-done"><span class="tick">✓</span><h4>Got it.</h4><p>Demo only - nothing was sent to Paul.</p><button class="btn btn-ghost btn-sm" type="button" data-act="home">Back to Paul</button></div>'; },
  };
  function render(opts) {
    opts = opts || {};
    titleEl.textContent = S.mode === "film" ? FILMS[S.film].title : (TITLES[S.mode] || "Paul");
    panel.classList.toggle("is-home", S.mode === "home");
    backBtn.hidden = S.mode === "home";
    flag.hidden = S.mode === "home" || S.mode === "film";   // "Demo" on the booking and contact views
    body.innerHTML = (VIEWS[S.mode] || VIEWS.home)();
    body.scrollTop = 0;                              // the panel scrolls on desktop (the stage keeps its size): start each view at the top
    body.style.animation = "none"; void body.offsetWidth; body.style.animation = "";
    var form = $("form", body);
    if (form) form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (S.mode === "details") TOOLS_IMPL.confirm_appointment({}); else TOOLS_IMPL.submit_contact_details({});
    });
    if (S.mode === "film") wireFilm();
    if (opts.focus) { var f = $("input, button", body); if (f) f.focus({ preventScroll: true }); }
  }
  function setMsg(text) { var m = $(".p-msg", body); if (m) { m.classList.add("err"); m.textContent = text; } }
  function flash(el) { el.classList.add("flash"); setTimeout(function () { el.classList.remove("flash"); }, 1100); reveal(el); }
  // Scroll the panel (never the page) so a field Paul just filled is in view.
  function reveal(el) {
    if (!el || body.scrollHeight <= body.clientHeight + 1) return;
    var b = body.getBoundingClientRect(), r = el.getBoundingClientRect();
    if (r.top < b.top) body.scrollTop -= (b.top - r.top) + 8;
    else if (r.bottom > b.bottom) body.scrollTop += (r.bottom - b.bottom) + 8;
  }

  /* ═════════ The other three stages: never two voices at once ═════════ */
  var OTHERS = [{ name: "Ava", stage: "ava-stage", mount: "ava-mount", panel: "ava-panel" }, { name: "Maya", stage: "maya-stage", mount: "maya-mount", panel: "maya-panel" },
    { name: "Matt", stage: "matt-stage", mount: "matt-mount", panel: "matt-panel" }];
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
  // Clicks on the other stages while Paul is busy. Capture phase, so this runs before their own scripts see the click.
  document.addEventListener("click", function (e) {
    var t = e.target && e.target.closest ? e.target.closest(OTHERS.map(function (o) { return "#" + o.stage + " .ava-talk, #" + o.stage + " .ava-sound, #" + o.panel + " .sv-play"; }).join(", ")) : null;
    if (!t || ownClick) return;
    // Their sound button only turns their intro OFF when it is already on: nothing of Paul's needs to stop for that.
    if (t.classList.contains("ava-sound") && t.getAttribute("aria-pressed") === "true") return;
    pauseFilm();                                     // another voice is about to start: Paul's film stops
    if (hearing) stopHearing();                      // ...and his intro goes quiet
    if (t.classList.contains("is-soon") || liveState === "idle") return;   // "coming soon" starts nobody
    if (liveState === "connecting") { e.stopPropagation(); e.preventDefault(); say_("Paul is still connecting — end his conversation first.", 5000); return; }
    endLive("", true);                               // Paul live: he steps aside for their Talk, intro or film
  }, true);

  // His films play in the panel, with controls, and never on top of another voice.
  function wireFilm() {
    var box = $(".sv-film", body); if (!box) return;
    var f = FILMS[S.film], v = $("video", box), btn = $(".sv-play", box);
    btn.addEventListener("click", function () {
      var o = liveOther();
      if (o) { say_(o.name + " is live right now. End that conversation first, then play the film.", 6000); return; }
      if (hearing) stopHearing();
      othersQuiet();
      if (!v.getAttribute("src")) v.src = f.src;
      v.controls = true; box.classList.add("playing");
      var p = v.play(); if (p && p.catch) p.catch(function () { box.classList.remove("playing"); v.controls = false; });
      track("paul_film", { film: S.film });
    });
    v.addEventListener("play", function () { emit("The visitor is playing Paul's " + f.title + " film (" + f.dur + "). Stay quiet until it ends or they pause it.", false); });
    v.addEventListener("pause", function () { if (!v.ended) emit("The visitor paused the " + f.title + " film. You may speak again.", false); });
    v.addEventListener("ended", function () { emit("The visitor finished watching the " + f.title + " film. You may speak again.", false); });
  }
  function pauseFilm() { var v = $(".sv-film video", body); if (v && !v.paused) v.pause(); }
  function showFilm(id, fromTwin) {
    if (!FILMS[id]) return false;
    pauseFilm(); S.film = id;
    if (S.mode === "film") render({}); else go("film");
    if (!fromTwin) track("paul_panel", { action: "film_" + id });
    return true;
  }

  /* ═════════ Visitor clicks and typing (each one is reported to the live Paul) ═════════ */
  body.addEventListener("click", function (e) {
    var t = e.target.closest("[data-act], [data-day], [data-slot]"); if (!t) return;
    var a = t.getAttribute("data-act");
    if (a === "film-marvista" || a === "film-hermosa") { var id = a.slice(5); showFilm(id, false); emit("The visitor opened Paul's " + FILMS[id].title + " film. It plays only when they press play.", false); }
    else if (a === "book") { pauseFilm(); TOOLS_IMPL.show_appointment_times({ view: "suggested" }); emit("The visitor opened the appointment panel.", false); track("paul_panel", { action: "book_open" }); }
    else if (a === "week") { S.viewAll = true; render({}); emit("The visitor is looking at the whole week.", false); }
    else if (a === "lead") { go("lead", { focus: true }); emit("The visitor opened the leave-your-contact-info form.", false); track("paul_panel", { action: "lead_open" }); }
    else if (a === "home") { S.hist = []; go("home", { replace: true }); }
    else if (a === "review-yes") { if (!S.review) return; S.review.ok = true; (S.review.kind === "book" ? TOOLS_IMPL.confirm_appointment : TOOLS_IMPL.submit_contact_details)({}); }
    else if (a === "review-edit") { S.review = null; render({ focus: true }); emit("The visitor chose to edit their details. Nothing has been booked or sent.", false); }
    else if (t.hasAttribute("data-day")) { S.day = t.getAttribute("data-day"); S.slot = null; go("times"); emit("The visitor picked " + days().filter(function (x) { return x.key === S.day; })[0].slots[0].long + " and is choosing a time.", false); }
    else if (t.hasAttribute("data-slot")) { var sl = (S.slots || []).filter(function (x) { return x.id === t.getAttribute("data-slot"); })[0]; if (sl) { selectSlot(sl, false); emit("The visitor selected " + label(sl) + ".", false); } }
  });
  var BIND_LABEL = { "book.name": "name", "book.email": "email", "book.phone": "phone number", "book.topic": "topic", "lead.name": "name", "lead.email": "email", "lead.phone": "phone number", "lead.need": "note" };
  body.addEventListener("input", function (e) {
    var b = e.target.getAttribute && e.target.getAttribute("data-bind"); if (!b) return;
    var p = b.split("."); S[p[0]][p[1]] = e.target.type === "checkbox" ? e.target.checked : e.target.value;
  });
  body.addEventListener("change", function (e) {
    var b = e.target.getAttribute && e.target.getAttribute("data-bind"); if (!b || !BIND_LABEL[b] || !String(e.target.value).trim()) return;
    emit("The visitor typed their " + BIND_LABEL[b] + ": " + String(e.target.value).trim() + ".", false);
  });

  /* ═════════ Paul's DEMO tools: the one way anything changes the panel ═════════
     The same shapes and two-step confirmation as Maya's, with real estate wording. Each film has one tool. No tool
     calls a server: "booked" and "sent" only change what the panel shows. */
  function selectSlot(s, fromTwin) { S.slot = s; S.day = s.date; go("details", { focus: !fromTwin }); }
  function stillNeeded(k) {
    var n = [], o = k === "book" ? S.book : S.lead;
    if (k === "book" && !S.slot) n.push("time");
    if (!tr(o.name)) n.push("name");
    if (!validEmail(tr(o.email))) n.push("email");
    if (k === "lead" && o.callback && String(o.phone).replace(/\D/g, "").length < 7) n.push("phone");
    return n;
  }
  function bookState() { return { time: S.slot ? label(S.slot) : null, name: S.book.name, email: S.book.email, phone: S.book.phone, topic: S.book.topic }; }
  function leadState() { return { name: S.lead.name, email: S.lead.email, phone: S.lead.phone, need: S.lead.need, callback: !!S.lead.callback }; }
  function needConfirm(k) {
    return { ok: false, needs_confirmation: true, details: k === "book" ? bookState() : leadState(),
      message: "Nothing is " + (k === "book" ? "booked" : "sent") + " yet. The panel now shows these details to the visitor for review. Read them back (spell the email) and ask: 'Is all of that correct?' Fix anything they correct, then call " + (k === "book" ? "confirm_appointment" : "submit_contact_details") + " again only after they clearly say yes." };
  }
  // What is already on the panel when a session starts, so he never re-asks for what the visitor already did.
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
      return { ok: true, demo: true, timezone: "Pacific time", suggested: pickSlots(3).map(info),
        days: days().map(function (x) { return { date: x.key, label: x.slots[0].long, open: x.slots.length }; }), note: "Sample times, Monday to Saturday." };
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
      ["name", "email", "phone", "topic"].forEach(function (k) { if (a[k] != null && String(a[k]).trim() !== "") { S.book[k] = String(a[k]).trim(); changed.push(k); } });
      if (S.slot && S.mode !== "details") go("details");
      else changed.forEach(function (k) { var el = $("#pp-" + k, body); if (el) el.value = S.book[k]; });
      changed.forEach(function (k) { var el = $("#pp-" + k, body); if (el) flash(el); });   // the visitor sees Paul writing
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
      S.booked = { when: label(S.slot) + " (Pacific time)" }; S.review = null; go("booked"); track("paul_demo_booking", {});
      if (!fromTwin) emit("The visitor confirmed the demo appointment for " + S.booked.when + ". Nothing was sent to Paul: this page is a demonstration. Tell them, briefly, that this is how booking works.", true);
      return { ok: true, demo: true, booked: true, when: S.booked.when,
        message: "DEMO: the panel shows the appointment as confirmed, but nothing was sent to Paul. Tell the visitor, briefly, that this is how booking works on this demonstration page." };
    },
    show_contact_form: function () { go("lead"); return { ok: true, demo: true, note: "The contact form is open on the panel. Ask for their details one at a time, fill them in with fill_contact_details, or let them type." }; },
    fill_contact_details: function (a) {
      a = a || {}; var changed = [];
      ["name", "email", "phone", "need"].forEach(function (k) { if (a[k] != null && String(a[k]).trim() !== "") { S.lead[k] = String(a[k]).trim(); changed.push(k); } });
      if (a.callback != null) { S.lead.callback = a.callback === true || a.callback === "true"; changed.push("callback"); }
      var ID = { name: "lname", email: "lemail", phone: "lphone", need: "lneed", callback: "lcallback" };
      if (S.mode !== "lead") go("lead");
      else changed.forEach(function (k) { var el = $("#pp-" + ID[k], body); if (el) { if (k === "callback") el.checked = !!S.lead.callback; else el.value = S.lead[k]; } });
      changed.forEach(function (k) { var el = $("#pp-" + ID[k], body); if (el && k !== "callback") flash(el); });
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
      S.review = null; go("leadDone"); track("paul_demo_contact", {});
      if (!fromTwin) emit("The visitor confirmed their contact details. Nothing was sent to Paul: this page is a demonstration. Tell them, briefly, that this is how it works.", true);
      return { ok: true, demo: true, sent: false, message: "DEMO: the panel shows the details as sent, but nothing went to Paul. Tell the visitor, briefly, that this is how it works on this demonstration page." };
    },
    show_neighborhood_film: function (a) {
      var id = a && a.film;
      if (!showFilm(id, true)) return { ok: false, error: "Unknown film", films: Object.keys(FILMS).map(function (k) { return { id: k, title: FILMS[k].title }; }) };
      return { ok: true, film: FILMS[id].title, length: FILMS[id].dur, note: "The film is open on the panel. The visitor presses play themselves; stay quiet while it plays." };
    },
  };

  var str = function (d) { return { type: "string", description: d }; };
  var TOOLS = [
    { name: "show_appointment_times", description: "DEMO booking panel. Show open appointment times with Paul on the panel beside you, which the visitor can see. Call it as soon as the visitor wants to book, schedule or meet Paul. view \"suggested\" shows three picks; \"all\" shows the whole week. Read back two or three options in natural speech, never the whole list. Times are Pacific time.",
      inputSchema: { type: "object", properties: { view: { type: "string", enum: ["suggested", "all"] }, date: str("Optional day to open, YYYY-MM-DD") } } },
    { name: "select_appointment_time", description: "Select the time the visitor chose on the panel. Use the date (YYYY-MM-DD) and time (e.g. \"9:30 AM\") exactly as show_appointment_times returned them. If it is not available, offer the returned alternatives.",
      inputSchema: { type: "object", properties: { date: str("YYYY-MM-DD, exactly as returned"), time: str("e.g. 9:30 AM, exactly as returned") }, required: ["date", "time"] } },
    { name: "fill_appointment_details", description: "Fill in the appointment form on the panel each time you learn a detail: the visitor's name, email, phone number, or a few words on what they would like to talk about (buying, selling, downsizing). Only include the fields you just learned. Read each detail back; spell the email back.",
      inputSchema: { type: "object", properties: { name: str("Full name"), email: str("Email address"), phone: str("Phone number"), topic: str("What they would like to talk about, a few words") } } },
    { name: "confirm_appointment", description: "Confirm the DEMO appointment. The first call never confirms: it shows the visitor their details for review and returns needs_confirmation. Read back the time, name and email (spell the email), ask whether everything is correct, fix anything with fill_appointment_details, and call confirm_appointment again only after a clear yes. Nothing is ever sent to Paul - this page is a demonstration.",
      inputSchema: { type: "object", properties: {} }, annotations: { destructiveHint: true } },
    { name: "show_contact_form", description: "Open the leave-your-contact-info form on the panel, for a visitor who would like Paul to get in touch instead of booking now.",
      inputSchema: { type: "object", properties: {} } },
    { name: "fill_contact_details", description: "Fill in the contact form on the panel each time you learn a detail: name, email, phone number, a short note about what they need, and callback (true if they want a phone call). Only include the fields you just learned. Read each detail back; spell the email back.",
      inputSchema: { type: "object", properties: { name: str("Full name"), email: str("Email address"), phone: str("Phone number"), need: str("A short note about what they need"), callback: { type: "boolean", description: "true if they would like a phone call" } } } },
    { name: "submit_contact_details", description: "Send the DEMO contact form. The first call never sends: it shows the visitor their details for review. Read them back (spell the email), ask whether they are correct, and call again only after a clear yes. Nothing is ever sent to Paul - this page is a demonstration.",
      inputSchema: { type: "object", properties: {} }, annotations: { destructiveHint: true } },
    { name: "show_neighborhood_film", description: "Open one of Paul's neighborhood films on the panel beside you: marvista (Mar Vista, " + FILMS.marvista.dur + ") or hermosa (My Hermosa Beach, " + FILMS.hermosa.dur + "). The visitor presses play themselves. Stay quiet while it plays.",
      inputSchema: { type: "object", properties: { film: { type: "string", enum: Object.keys(FILMS) } }, required: ["film"] } },
  ];
  function execTool(name, args) {
    var fn = TOOLS.some(function (t) { return t.name === name; }) && TOOLS_IMPL[name];   // Paul can only reach his own tools
    if (!fn) return Promise.resolve({ ok: false, error: "Unknown tool " + name });
    TOOLS_IMPL.__fromTwin = true; track("paul_tool", { tool: name });
    var done = function (m) { TOOLS_IMPL.__fromTwin = false; return m; };
    try { return Promise.resolve(fn(args || {})).then(done, function (e) { return done({ ok: false, error: String(e && e.message || e) }); }); }
    catch (e) { return Promise.resolve(done({ ok: false, error: String(e && e.message || e) })); }
  }
  // Must run right BEFORE Paul's sdk.init(): replaces whatever tools are on the page (Ava's or Maya's) with Paul's own.
  function installPaulTools() {
    var mc = document.modelContext;
    if (!mc) { mc = new EventTarget(); try { Object.defineProperty(document, "modelContext", { value: mc, configurable: true }); } catch (e) { document.modelContext = mc; } }
    mc.getTools = function () { return Promise.resolve(TOOLS.map(function (t) { return { name: t.name, description: t.description, inputSchema: t.inputSchema, annotations: t.annotations }; })); };
    mc.executeTool = function (tool, jsonArgs) {
      var args = {}; try { args = typeof jsonArgs === "string" ? JSON.parse(jsonArgs || "{}") : (jsonArgs || {}); } catch (e) {}
      return execTool(tool && tool.name ? tool.name : tool, args);
    };
  }

  /* ═════════ His intro: muted loop; the sound icon replays it from the start with captions ═════════
     Until the approved 30 s intro is on the page (data-src on the video), the stage shows his still and no sound icon. */
  // Timed to the intro's speech (ffmpeg silencedetect, 6 Oct; last line re-timed for the 26 s cut, 7 Oct): each line
  // appears just before he says it.
  var LINES = [[0.25, 2.75, "Hi, I'm Paul Small's digital twin."], [2.75, 5.35, "Paul is a real estate advisor with Compass,"],
    [5.35, 8.1, "and he specializes in West Los Angeles:"], [8.1, 11.9, "Mar Vista, Santa Monica, Marina del Rey and Brentwood."],
    [12.15, 14.3, "Whether you're buying, selling,"], [14.3, 18.9, "or helping your parents downsize the family home,"],
    [18.9, 21.9, "he'll guide you through every step, at your own pace, with no pressure."], [22.3, 24.6, "Click Talk to Paul to learn more."]];
  var hasIntro = !!vid.getAttribute("data-src");
  var hearing = false, lastT = 0, visible = false, capKey = "";
  function caption(lines) { var k = JSON.stringify(lines || []); if (k === capKey) return; capKey = k; capBox.innerHTML = (lines || []).map(function (l) { return '<span class="cap">' + esc(l) + "</span>"; }).join(""); }
  function ensureSrc() { if (hasIntro && !vid.getAttribute("src")) vid.src = vid.getAttribute("data-src"); }
  function playQuiet() { if (!hasIntro || RM || hearing || liveState !== "idle") return; ensureSrc(); vid.muted = true; var p = vid.play(); if (p && p.catch) p.catch(function () {}); }
  function soundIcon(on) { hearBtn.setAttribute("aria-pressed", on ? "true" : "false"); $("use", hearBtn).setAttribute("href", on ? "#i-vol" : "#i-sound-off"); var l = on ? "Mute Paul's introduction" : "Play Paul's introduction with sound"; hearBtn.setAttribute("aria-label", l); hearBtn.title = l; }
  function stopHearing() { hearing = false; vid.muted = true; soundIcon(false); caption([]); if (RM) vid.pause(); }
  if (!hasIntro) hearBtn.style.display = "none";
  hearBtn.addEventListener("click", function () {
    if (!hasIntro || liveState !== "idle") return;
    if (hearing) { stopHearing(); return; }
    othersQuiet(); pauseFilm();                      // never two voices at once
    ensureSrc(); hearing = true; vid.currentTime = 0; vid.muted = false; lastT = 0;
    var p = vid.play(); if (p && p.catch) p.catch(function () { stopHearing(); });
    soundIcon(true); track("paul_hear", {});
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

  /* ═════════ "Talk to Paul": the live conversation (off until CFG.LIVE) ═════════ */
  var sdkLoading = null, capTimer = null, readyTimer = null, revealed = false;
  var htmlBg = getComputedStyle(document.documentElement).backgroundColor, bodyBg = getComputedStyle(document.body).backgroundColor;
  // The SDK injects `body,html{background:transparent}` the moment its script loads: re-assert the page colors.
  function pinBg() { document.documentElement.style.setProperty("background-color", htmlBg, "important"); document.body.style.setProperty("background-color", bodyBg, "important"); }
  function say_(text, ms) { toast.textContent = text; toast.hidden = !text; if (text && ms) setTimeout(function () { if (toast.textContent === text) toast.hidden = true; }, ms); }
  function setTalk(lbl, on) { $("span", talkBtn).textContent = lbl; talkBtn.disabled = liveState === "connecting"; talkBtn.classList.toggle("is-on", !!on); }
  function rememberSeen() { try { document.cookie = "aa_paul_seen=1; Path=/avatarstages; Max-Age=31536000; Secure; SameSite=Lax"; } catch (e) {} }
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
    track("paul_live_session", {});
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
    avStage.classList.remove("live", "live-ready"); setTalk("Talk to Paul", false);
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
    endLive(st === 503 || st === 404 ? "Paul's live conversation is arriving very soon. In the meantime, try the panel beside him." :
      st === 401 ? "This private page needs your portfolio link — open it again from your email." :
      st === 429 || st >= 500 ? "Paul's twin is talking with other visitors right now — try again in a few minutes." :
      "I couldn't start the live conversation just now. The panel beside me still works.", true);
  }
  async function startLive() {
    if (liveState !== "idle") return;
    var o = liveOther();
    if (o && otherState(o) === "connecting") { say_(o.name + " is still connecting — end that conversation first.", 5000); return; }
    liveState = "connecting"; if (hearing) fadeOutVoice(); else caption([]);
    othersQuiet(); pauseFilm();
    if (o) endOther(o);
    setTalk("Connecting…", false); say_("Connecting to Paul…", 0); avStage.classList.add("live"); stage.classList.add("is-live");
    if (hasIntro && !RM && vid.paused) { ensureSrc(); vid.muted = true; var pq = vid.play(); if (pq && pq.catch) pq.catch(function () {}); }
    readyTimer = setTimeout(function () { if (liveState === "connecting") say_("Almost there… allow the microphone if your browser asks.", 0); }, 5000);
    try {
      installPaulTools();                            // before init: the SDK reads the page's tools when it attaches
      await loadSdk(); pinBg();
      var res = await fetch(CFG.TOKEN_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
      if (!res.ok) { var err = new Error("token " + res.status); err.status = res.status; throw err; }
      var data = await res.json(); var sdk = window.napsterCompanionApiSDK || window.NapsterCompanionApiSdk;
      if (!sdk) throw new Error("sdk missing");
      if (liveState !== "connecting") return;        // ended while the token was on its way
      installPaulTools(); pinBg();
      instance = await sdk.init(data.token, {
        // The SDK's default 4px border (red while muted or idle) stays off on every stage (AVATAR-STAGE-SPEC §8).
        mountContainer: "#paul-mount", avatarStyle: { view: "rectangle", borderWidth: "0px", borderStyle: "none" }, debug: /[?&]debug\b/.test(location.search),
        features: { showSDKLoader: { enabled: false }, screenShare: { enabled: true }, pictureInPicture: { enabled: true } },
        onAvatarReady: armReveal, onDestroy: function () { if (instance) endedState(""); },
      });
      instance.showAvatar(); pinBg();
      setTimeout(function () { if (instance) armReveal(); }, 3000);
      capTimer = setTimeout(function () { endLive("That's the ten-minute limit — press Talk to Paul to keep going."); }, CFG.CAP_S * 1000);
      emit(panelSummary(), false);
    } catch (e) { liveError(e); }
  }
  if (!CFG.LIVE) { talkBtn.classList.add("is-soon"); $("span", talkBtn).textContent = "Talk to Paul · coming soon"; }
  talkBtn.addEventListener("click", function () {
    if (!CFG.LIVE) { say_("Paul's live conversation is coming soon. Until then, watch his films or try the panel beside him.", 6000); track("paul_panel", { action: "talk_soon" }); return; }
    if (liveState === "live") { endLive(""); return; }
    startLive();
  });

  // For the console and tests: what the live Paul would see.
  window.PaulPanel = { tools: TOOLS, exec: execTool, state: function () { return S; } };
  render({});
})();
