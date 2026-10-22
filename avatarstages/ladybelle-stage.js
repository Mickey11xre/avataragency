/* Lady Belle's stage: the fifth stage on the private /avatarstages page (below Matt), and case 10 on /work (Michael,
 * 9 Oct: "create a Lady Belle stage using the avatar stage specifications and place it below Matt the Plumber").
 * Lady Belle is the white Snoodle puppy of Adele Harrison's "Tales of Lady Belle: Fruit of the Spirit" picture books
 * (an AvatarAgency client). Her talkers are CHILDREN: nothing on this panel asks a child for anything.
 *
 * Built from matt-stage.js (same look, layout, one-live-avatar rules and live-session code).
 * Panel, top to bottom (Michael, 9 Oct): "Tales of Lady Belle: Fruit of the Spirit Book Series", "Fruit of the Spirit
 * Values", "Join Our Mailing List" (for grown-ups; a DEMO like the other stages: nothing is sent anywhere).
 *
 * Intro: the photoreal NV2 take (Seedance 2.5 job 0977dd5c, approved 9 Oct); the poster is that take's own frame 0.
 * "Talk to Lady Belle" runs her NV2 avatar (twin 876cbc62, her own stage agent) through the gated
 * functions/avatarstages/api/ladybelle-token.js. Until 9 Oct it borrowed the NV1 agent 8ef4a703 of /ladybelle as a
 * placeholder; that agent and its public /api/ladybelle-token are untouched.
 *
 * One live avatar at a time, across all five stages: she ends Ava, Maya, Paul or Matt before she starts, and her
 * capture-phase guard ends her before any of theirs starts. Their scripts are unchanged.
 */
(function () {
  "use strict";
  var stage = document.getElementById("ladybelle-stage");
  if (!stage) return;
  var RM = document.documentElement.classList.contains("rm");
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var track = function (n, p) { try { if (window.gtag) gtag("event", n, p || {}); } catch (e) {} };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var CFG = {
    LIVE: true,          // her NV2 agent (9 Oct); false = "Talk to Lady Belle · coming soon"
    // Gated by default (/work, /avatarstages). A page can override both with data-token / data-seen-path on the stage:
    // Adele's portal embed uses the public, origin-checked /api/ladybelle-nv2-token. /api/ladybelle-token stays NV1.
    TOKEN_ENDPOINT: stage.getAttribute("data-token") || "/avatarstages/api/ladybelle-token",
    SEEN_PATH: stage.getAttribute("data-seen-path") || "/avatarstages",
    SDK_URL: "https://cdn.jsdelivr.net/npm/@touchcastllc/napster-companion-api@1.5.0/lib/index.standalone.js",
    CAP_S: 600,          // ten-minute session cap, as on every stage
    INTRO_END: 26.9,     // media/ladybelle-intro.mp4 is 27.1 s: speech ends at 26.4 s
  };

  var avStage = $(".stage-av", stage), vid = $(".ava-video", stage), capBox = $(".ava-caption", stage), hearBtn = $(".ava-sound", stage),
    talkBtn = $(".ava-talk", stage), toast = $(".ava-toast", stage), mount = $("#ladybelle-mount");
  var panel = $("#ladybelle-panel"), body = $(".panel-body", panel), titleEl = $(".panel-title", panel), backBtn = $(".panel-back", panel), flag = $(".panel-flag", panel);
  var instance = null, liveState = "idle";   // idle | connecting | live

  /* ═════════ Content ═════════ */
  var IC = {
    book: '<svg viewBox="0 0 24 24"><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v15H5.5A1.5 1.5 0 0 1 4 17.5zM20 5.5A1.5 1.5 0 0 0 18.5 4H13v15h5.5a1.5 1.5 0 0 0 1.5-1.5z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
    heart: '<svg viewBox="0 0 24 24"><path d="M12 19.5s-7.5-4.4-7.5-9.6A4.1 4.1 0 0 1 12 7.4a4.1 4.1 0 0 1 7.5 2.5c0 5.2-7.5 9.6-7.5 9.6z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
    mail: '<svg viewBox="0 0 24 24"><rect x="3.5" y="5.5" width="17" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
    arrow: '<svg><use href="#i-arrow"/></svg>',
    star: '<svg viewBox="0 0 24 24"><path d="M12 3.8l2.4 5 5.4.7-4 3.7 1 5.4L12 16l-4.8 2.6 1-5.4-4-3.7 5.4-.7z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
  };
  /* ═════════ Kindness Story Time (PROTOTYPE, Michael 20 Oct): Lady Belle reads Book One to the child ═════════
     Pages 1-4 of Adele Harrison's manuscript (Book_One_Kindness_V-8-26-2026.docx), text VERBATIM. The pictures are
     not drawn yet: each page shows Adele's illustration note as a placeholder. Lady Belle turns the pages herself with
     show_page (the page appears, and the tool hands her that page's exact text); the child can stop her at any time.
     ⚠️ Prototype only: the real version serves the book from a paid, server-side endpoint, never from this file. */
  var STORY = { title: "Lady Belle Finds a Forever Home", pages: [
    { text: ["The little white dog watched the caretakers going up and down the hall all morning. She wagged her tail excitedly when she saw the caretakers getting closer to her kennel. “Oh, I hope one stops at my door!”, thought the little dog."],
      art: "A bank of kennels in an animal shelter, with dogs of many breeds in black and white. In one kennel near the front, a little white dog, in color, sits watching expectantly. In front of the kennels, the legs and feet of several people go in different directions." },
    { text: ["You see, when a caretaker stopped at your kennel it meant one of two things. If he went back up the hall to the door with the window, you were going for a walk. If he turned the opposite direction toward the big solid door, it meant you were going to the “visit” room and might get adopted.",
      "At first, she jumped up every time someone came near her kennel, but as the morning wore on and no caretaker stopped, she just lay waiting for the day to go by."],
      art: "The same bank of kennels. The little white dog, in color, lies down facing out, front paws crossed." },
    { text: ["“What’s this?”, asked the little dog. A caretaker DID stop at her kennel, reached in, and clipped a leash to her collar. “Maybe this is it!” the dog thought. “Maybe this is the day I’ll be adopted to a new home rather than just go for a walk!”"],
      art: "The same kennel. Lady Belle lies at the door, looking up as black-and-white hands clip a blue lead to her red collar." },
    { text: ["“Turn toward the solid door! Turn toward the solid door!, begged the little white dog. The caretaker heard happy little barks."],
      art: "Lady Belle leaving the kennel. The caretaker is seen from the knees down, in jeans and running shoes." },
  ] };
  var NPAGES = STORY.pages.length;
  var pageText = function (n) { return STORY.pages[n - 1].text.join("\n\n"); };
  // What she READS: the same words, with "..." between sentences so her voice takes a breath (Michael, 21 Oct: she read too fast).
  var readText = function (n) { return pageText(n).replace(/([.!?][”"]?)\s+(?=[“"A-Z])/g, "$1 ... "); };
  var PAGE_PAUSE_MS = 2500;   // a turned page shows its picture this long before she starts reading it
  // From the approved /ladybelle page ("about the books") and the series bible: no invented titles, dates or prices.
  var SERIES = [
    "Tales of Lady Belle: Fruit of the Spirit is a Christian children's picture-book series by Adele Harrison.",
    "Each book follows Lady Belle, a little white Snoodle puppy, through her first year in her new home, one season and one virtue at a time.",
    "The first book is about kindness.",
    "The pictures show the world from the pets' point of view: mostly black and white, except for the animal in focus.",
  ];
  // Galatians 5:22-23, the nine fruits the series teaches, each in words a young child can hold on to.
  var FRUITS = [
    { id: "love", name: "Love", text: "Caring for others, even when it isn't easy." },
    { id: "joy", name: "Joy", text: "A happy heart that keeps shining, even on gray days." },
    { id: "peace", name: "Peace", text: "Feeling calm inside, and helping others feel calm too." },
    { id: "patience", name: "Patience", text: "Waiting kindly, without fussing." },
    { id: "kindness", name: "Kindness", text: "Doing something nice for someone, just because." },
    { id: "goodness", name: "Goodness", text: "Choosing what is right, even when no one is watching." },
    { id: "faithfulness", name: "Faithfulness", text: "Keeping your promises and being a friend others can count on." },
    { id: "gentleness", name: "Gentleness", text: "Soft words and soft paws, with everyone." },
    { id: "selfcontrol", name: "Self-control", text: "Stopping to think before you act." },
  ];

  /* ═════════ State + rendering ═════════ */
  var S = { mode: "home", hist: [], review: null, list: { name: "", email: "", adult: false },
    story: { page: 1, reading: false, paused: false, pendingRead: false, waiting: false } };
  var TITLES = { home: "Hi, friend!", story: "Kindness Story Time", storyEnd: "Kindness Story Time", books: "The book series", values: "Fruit of the Spirit", list: "Join our mailing list", listDone: "Demo" };
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

  var field = function (id, lbl, type, val, attrs) {
    return '<div class="p-field"><label for="lb-' + id + '">' + lbl + '</label><input id="lb-' + id + '" type="' + type + '" value="' + esc(val) + '" ' + (attrs || "") + "></div>";
  };
  function act(id, icon, title, sub) { return '<button class="p-act" type="button" data-act="' + id + '"><i>' + icon + "</i><span><b>" + title + "</b><small>" + sub + "</small></span>" + IC.arrow + "</button>"; }
  var tr = function (v) { return String(v || "").trim(); };
  var validEmail = function (e) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e); };

  // "Is this correct?" before anything is "sent", as on every stage.
  var sigOf = function () { return [tr(S.list.name), tr(S.list.email).toLowerCase(), S.list.adult ? "a" : ""].join("|"); };
  var reviewFresh = function () { return !!(S.review && S.review.sig === sigOf()); };
  function reviewCard() {
    return '<div class="p-review"><p class="p-label">Is this correct?</p><dl class="p-rv"><div><dt>Name</dt><dd>' + esc(tr(S.list.name)) + "</dd></div><div><dt>Email</dt><dd>" + esc(tr(S.list.email)) +
      '</dd></div></dl><p class="p-sub">Please check your details. Nothing is sent until you confirm.</p><div class="p-rv-acts"><button class="btn btn-gold btn-sm p-go" type="button" data-act="review-yes">Yes, sign me up ' +
      IC.arrow + '</button><button class="btn btn-ghost btn-sm" type="button" data-act="review-edit">Edit</button></div></div>';
  }
  function openReview(fromTwin) {
    if (S.mode !== "list") go("list");
    S.review = { sig: sigOf(), at: Date.now(), ok: false }; render({});
    var b = $('[data-act="review-yes"]', body); if (b && !fromTwin) b.focus({ preventScroll: true });
    if (!fromTwin) emit("A grown-up is reviewing their mailing-list details (name " + tr(S.list.name) + ", email " + tr(S.list.email) + "). Nothing is sent yet.", false);
  }

  var VIEWS = {
    home: function () {
      return '<p class="p-sub">' + (CFG.LIVE ? "Tap an option below — or press Talk to Lady Belle to talk with me." : "Tap an option below. Lady Belle's live conversation is coming soon.") + '</p><div class="p-actions">' +
        act("story", IC.star, "Kindness Story Time", "Lady Belle reads her story to you") +
        act("books", IC.book, "Tales of Lady Belle: Fruit of the Spirit Book Series", "Meet the books") +
        act("values", IC.heart, "Fruit of the Spirit Values", "Love, joy, peace and more") +
        act("list", IC.mail, "Join Our Mailing List", "For grown-ups: book news") + "</div>";
    },
    story: function () {
      var n = S.story.page, p = STORY.pages[n - 1], st = S.story, live = liveState !== "idle", reading = st.reading && live;
      var ctrl = reading
        ? (st.paused ? '<button class="btn btn-gold btn-sm" type="button" data-act="story-continue">Keep reading ' + IC.arrow + "</button>"
          : '<button class="btn btn-ghost btn-sm" type="button" data-act="story-question">✋ I have a question</button>')
        : '<button class="btn btn-gold btn-sm" type="button" data-act="story-read">' + (n === 1 ? "Read to me" : "Read from here") + " " + IC.arrow + "</button>";
      // While she reads, Next becomes "Turn the page" - it glows once she has finished the page and is waiting for the child.
      var next = reading
        ? '<button class="btn btn-sm ' + (st.waiting ? "btn-gold lb-turn-ready" : "btn-ghost") + '" type="button" data-act="story-next"' + (n === NPAGES ? " hidden" : "") + ">Turn the page ›</button>"
        : '<button class="btn btn-ghost btn-sm" type="button" data-act="story-next"' + (n === NPAGES ? " disabled" : "") + ">Next ›</button>";
      return '<div class="lb-story"><p class="p-label">' + esc(STORY.title) + " · Page " + n + " of " + NPAGES + "</p>" +
        '<div class="lb-book"><div class="lb-page"><figure class="lb-art"><span>Illustration coming soon</span><figcaption>' + esc(p.art) + "</figcaption></figure>" +
        // The page's words are NOT shown on the panel (Michael, 21 Oct): Lady Belle reads them and live captions under her
        // carry them on the stage. Kept in the page for screen readers only. Same as talesofladybelle 683f988.
        '<div class="lb-text lb-sr">' + p.text.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") + "</div></div></div>" +
        '<p class="lb-cap" aria-live="polite">' + esc(LC.shown || "") + '</p>' +   // her words while she reads (live captions)
        '<div class="lb-ctrls"><button class="btn btn-ghost btn-sm" type="button" data-act="story-prev"' + (n === 1 ? " disabled" : "") + '>‹ Back</button>' + ctrl + next + "</div></div>";
    },
    storyEnd: function () {
      return '<div class="p-done"><span class="tick">★</span><h4>The end — for now!</h4><p>That\'s the first four pages of ' + esc(STORY.title) + '. The rest of the story is coming soon.</p>' +
        '<div class="p-rv-acts"><button class="btn btn-gold btn-sm" type="button" data-act="story-again">Read it again ' + IC.arrow + '</button><button class="btn btn-ghost btn-sm" type="button" data-act="home">Back to Lady Belle</button></div></div>';
    },
    books: function () {
      return '<div class="p-card"><div><h4>Tales of Lady Belle: Fruit of the Spirit</h4>' + SERIES.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</div></div>" +
        '<div class="p-svc-actions"><button class="btn btn-gold btn-sm" type="button" data-act="values">The nine values ' + IC.arrow + "</button></div>";
    },
    values: function () {
      return '<p class="p-sub">"Love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control." Galatians 5:22-23</p><div class="p-svcs">' +
        FRUITS.map(function (f) { return '<div class="p-card" id="lb-fruit-' + f.id + '"><div><h4>' + esc(f.name) + "</h4><p>" + esc(f.text) + "</p></div></div>"; }).join("") + "</div>";
    },
    list: function () {
      if (S.review) return reviewCard();
      return '<p class="p-sub">For parents, grandparents and teachers: hear first about new Lady Belle books.</p><form class="p-form" novalidate>' +
        field("name", "Your name", "text", S.list.name, 'autocomplete="name" required data-bind="list.name"') +
        field("email", "Email", "email", S.list.email, 'autocomplete="email" required data-bind="list.email"') +
        '<label class="p-check"><input type="checkbox" id="lb-adult" data-bind="list.adult"' + (S.list.adult ? " checked" : "") + "><span>I'm a grown-up (18 or older)</span></label>" +
        '<button class="btn btn-gold btn-sm p-go" type="submit">Join the list ' + IC.arrow + '</button><p class="p-msg" role="status"></p></form>';
    },
    listDone: function () { return '<div class="p-done"><span class="tick">✓</span><h4>Thank you!</h4><p>Demo only - nothing was sent.</p><button class="btn btn-ghost btn-sm" type="button" data-act="home">Back to Lady Belle</button></div>'; },
  };
  function render(opts) {
    opts = opts || {};
    titleEl.textContent = TITLES[S.mode] || "Lady Belle";
    panel.classList.toggle("is-home", S.mode === "home");
    backBtn.hidden = S.mode === "home";
    flag.hidden = !(S.mode === "list" || S.mode === "listDone");   // "Demo" on the mailing-list views
    var samePageView = S.mode === "story" && body.classList.contains("is-story");   // turning pages: no fade-in, the page-flip is the transition
    body.classList.toggle("is-story", S.mode === "story");   // Story Time: the buttons stay in view, only the page text scrolls
    body.innerHTML = (VIEWS[S.mode] || VIEWS.home)();
    body.scrollTop = 0;
    if (!samePageView) { body.style.animation = "none"; void body.offsetWidth; body.style.animation = ""; }
    var form = $("form", body);
    if (form) form.addEventListener("submit", function (e) { e.preventDefault(); TOOLS_IMPL.submit_mailing_list({}); });
    if (opts.focus) { var f = $("input, button", body); if (f) f.focus({ preventScroll: true }); }
  }
  function setMsg(text) { var m = $(".p-msg", body); if (m) { m.classList.add("err"); m.textContent = text; } }
  function flash(el) { el.classList.add("flash"); setTimeout(function () { el.classList.remove("flash"); }, 1100); reveal(el); }
  function reveal(el) {
    if (!el || body.scrollHeight <= body.clientHeight + 1) return;
    var b = body.getBoundingClientRect(), r = el.getBoundingClientRect();
    if (r.top < b.top) body.scrollTop -= (b.top - r.top) + 8;
    else if (r.bottom > b.bottom) body.scrollTop += (r.bottom - b.bottom) + 8;
  }

  /* ═════════ The other four stages: never two voices at once ═════════ */
  var OTHERS = [{ name: "Ava", stage: "ava-stage", mount: "ava-mount", panel: "ava-panel" }, { name: "Maya", stage: "maya-stage", mount: "maya-mount", panel: "maya-panel" },
    { name: "Paul", stage: "paul-stage", mount: "paul-mount", panel: "paul-panel" }, { name: "Matt", stage: "matt-stage", mount: "matt-mount", panel: "matt-panel" }];
  var ownClick = false;
  function clickOther(b) { ownClick = true; try { b.click(); } finally { ownClick = false; } }
  function otherState(o) {
    var st = document.getElementById(o.stage);
    if (!st || !st.classList.contains("is-live")) return "idle";
    var b = $(".ava-talk", st);
    return b && b.classList.contains("is-on") ? "live" : "connecting";
  }
  function liveOther() { return OTHERS.filter(function (o) { return otherState(o) !== "idle"; })[0] || null; }
  function othersQuiet() {
    OTHERS.forEach(function (o) {
      var b = $("#" + o.stage + " .ava-sound"); if (b && b.getAttribute("aria-pressed") === "true") clickOther(b);
      $$("#" + o.panel + " video").forEach(function (v) { if (!v.paused) v.pause(); });
    });
  }
  function endOther(o) {
    var b = $("#" + o.stage + " .ava-talk"); if (b && !b.disabled) clickOther(b);
    var m = document.getElementById(o.mount); if (m) m.innerHTML = "";
  }
  // Clicks on the other stages while Lady Belle is busy. Capture phase, so this runs before their own scripts see it.
  document.addEventListener("click", function (e) {
    var t = e.target && e.target.closest ? e.target.closest(OTHERS.map(function (o) { return "#" + o.stage + " .ava-talk, #" + o.stage + " .ava-sound, #" + o.panel + " .sv-play"; }).join(", ")) : null;
    if (!t || ownClick) return;
    if (hearing) stopHearing();
    if (t.classList.contains("is-soon") || liveState === "idle") return;
    if (t.classList.contains("ava-sound") && t.getAttribute("aria-pressed") === "true") return;
    if (liveState === "connecting") { e.stopPropagation(); e.preventDefault(); say_("Lady Belle is still connecting — end her conversation first.", 5000); return; }
    endLive("", true);
  }, true);

  /* ═════════ Visitor clicks and typing ═════════ */
  body.addEventListener("click", function (e) {
    var t = e.target.closest("[data-act]"); if (!t) return;
    var a = t.getAttribute("data-act");
    if (a === "story") { S.story.page = S.story.page || 1; go("story"); emit("The visitor opened Kindness Story Time, on page " + S.story.page + ".", false); track("ladybelle_panel", { action: "story_open" }); }
    else if (a === "story-prev" || a === "story-next") {
      var to = Math.min(NPAGES, Math.max(1, S.story.page + (a === "story-next" ? 1 : -1))); S.story.waiting = false; showStoryPage(to);
      if (S.story.reading && liveState !== "idle") turnPage(to);
    }
    else if (a === "story-read" || a === "story-again") { if (a === "story-again") { S.story.page = 1; go("story", { replace: true }); } readStory(); }
    else if (a === "story-question") { askQuestion(); }
    else if (a === "story-continue") { S.story.paused = false; render({}); emit("[Story time] The child pressed 'Keep reading'. Call get_story_position, then read that page again, slowly, from its very first word. Then call page_finished and wait for the child to turn the page.", true); }
    else if (a === "books") { TOOLS_IMPL.show_book_series({}); emit("The visitor opened the book series.", false); }
    else if (a === "values") { TOOLS_IMPL.show_fruit_of_the_spirit({}); emit("The visitor opened the Fruit of the Spirit values.", false); }
    else if (a === "list") { go("list", { focus: true }); emit("A grown-up opened the mailing-list form.", false); track("ladybelle_panel", { action: "list_open" }); }
    else if (a === "home") { S.hist = []; go("home", { replace: true }); }
    else if (a === "review-yes") { if (!S.review) return; S.review.ok = true; TOOLS_IMPL.submit_mailing_list({}); }
    else if (a === "review-edit") { S.review = null; render({ focus: true }); }
  });
  body.addEventListener("input", function (e) {
    var b = e.target.getAttribute && e.target.getAttribute("data-bind"); if (!b) return;
    var p = b.split("."); S[p[0]][p[1]] = e.target.type === "checkbox" ? e.target.checked : e.target.value;
  });

  /* ═════════ Story time: start, pause for a question ═════════ */
  function readStory() {
    track("ladybelle_story", { action: "read", page: S.story.page });
    if (liveState === "live" && instance) {
      S.story.reading = true; S.story.paused = false; render({});
      emit("[Story time] The visitor pressed 'Read to me'. Read your story now, starting at page " + S.story.page + ": call show_page with page " + S.story.page + ", read that one page slowly, then call page_finished and wait for the child to turn the page.", true);
      return;
    }
    if (liveState === "connecting") return;
    S.story.pendingRead = true; S.story.reading = true; S.story.paused = false; render({});
    startLive();                                     // the token request carries mode "story": she opens by starting the story
  }
  /* Page turn (Michael, 21 Oct): the old page lifts at its right edge and folds over to the left, revealing the new
     one underneath. Going back, the earlier page folds in from the left. Off with reduced motion. */
  function showStoryPage(to) {
    var from = S.story.page, old = S.mode === "story" && $(".lb-page", body);
    var oldHtml = old ? old.innerHTML : null;
    S.story.page = to;
    if (S.mode !== "story") { go("story"); return; }
    render({});
    if (!oldHtml || from === to || document.documentElement.classList.contains("rm")) return;
    var book = $(".lb-book", body), cur = $(".lb-page", body); if (!book || !cur) return;
    var fwd = to > from, leaf = document.createElement("div");
    leaf.className = "lb-page lb-leaf " + (fwd ? "is-fwd" : "is-back");
    leaf.innerHTML = fwd ? oldHtml : cur.innerHTML;          // forward: the old page turns away; back: the earlier page turns in
    leaf.setAttribute("aria-hidden", "true");
    book.appendChild(leaf);
    leaf.addEventListener("animationend", function () { leaf.remove(); });
    setTimeout(function () { leaf.remove(); }, 1500);
  }
  // The child turned the page: the new picture shows first, she is quiet for a moment, then she reads it.
  var turnTimer = null;
  function turnPage(to) {
    try { instance && instance.sendCommand({ type: "cancel" }); } catch (e) {}   // if she was still talking, she stops
    S.story.paused = false; S.story.waiting = false; render({}); track("ladybelle_story", { action: "turn", page: to });
    clearTimeout(turnTimer);
    turnTimer = setTimeout(function () {
      if (liveState === "idle" || !S.story.reading || S.story.page !== to) return;
      emit("[Story time] The child turned the page to page " + to + " and has looked at the picture. Call show_page with page " + to + " and read it, slowly, from its first word.", true);
    }, PAGE_PAUSE_MS);
  }
  function askQuestion() {
    if (!instance) return;
    try { instance.sendCommand({ type: "cancel" }); } catch (e) {}   // the SDK's own "stop talking" command
    clearTimeout(turnTimer);
    S.story.paused = true; S.story.waiting = false; render({}); track("ladybelle_story", { action: "question", page: S.story.page });
    emit("[Story time] The child pressed 'I have a question'. Stop reading right away. In one short, warm sentence, ask what their question is, then listen. Answer gently and simply. Then ask if they are ready to keep reading; when they are, call get_story_position and read that page again from its first word.", true);
  }

  /* ═════════ Her DEMO tools (for the NV2 agent; the NV1 placeholder has none) ═════════ */
  function stillNeeded() {
    var n = [];
    if (!tr(S.list.name)) n.push("name");
    if (!validEmail(tr(S.list.email))) n.push("email");
    if (!S.list.adult) n.push("the grown-up checkbox");
    return n;
  }
  var READ_RULE = "Read ONLY this one page to the child, EXACTLY as written, word for word: never add, skip or change a word, and never read the page number or describe the picture. " +
    "Read it SLOWLY, like a bedtime story - much slower than you normally talk - with a little pause at every comma and a full, quiet breath wherever you see '...' (the dots are pauses, never words). " +
    "When you finish the page, STOP reading and call page_finished, then do what it says. Never read the next page until the child turns the page. " +
    "If the child interrupts, stop, answer them gently, then call get_story_position and read that page again from the beginning.";
  var TOOLS_IMPL = {
    start_story: function () {
      S.story.reading = true; S.story.paused = false; S.story.pendingRead = false;
      if (S.mode !== "story") go("story"); else render({});
      track("ladybelle_story", { action: "start" });
      return { ok: true, title: STORY.title, pages: NPAGES, start_at: S.story.page, note: "Call show_page with page " + S.story.page + " now, then read it." };
    },
    show_page: function (a) {
      var n = Math.round(+(a && a.page)); if (!(n >= 1 && n <= NPAGES)) return { ok: false, error: "There are " + NPAGES + " pages in this story so far.", pages: NPAGES };
      S.story.reading = true; S.story.paused = false; S.story.waiting = false; clearTimeout(turnTimer);
      if (S.story.page !== n) showStoryPage(n); else if (S.mode !== "story") go("story"); else render({});
      track("ladybelle_story", { action: "page", page: n });
      return { ok: true, page: n, of: NPAGES, text: readText(n), last_page: n === NPAGES, rule: READ_RULE };
    },
    get_story_position: function () {
      return { ok: true, page: S.story.page, of: NPAGES, text: readText(S.story.page), last_page: S.story.page === NPAGES, rule: READ_RULE };
    },
    page_finished: function () {
      if (S.story.page >= NPAGES) return { ok: true, last_page: true, note: "That was the last page. Call finish_story now." };
      S.story.waiting = true; render({}); track("ladybelle_story", { action: "wait", page: S.story.page });
      return { ok: true, note: "The 'Turn the page' button is now glowing on the panel. Say warmly, in a few words, 'Ready? Turn the page!' Then STOP and wait quietly. " +
        "When a message says the child turned the page, read the new page. If the child SAYS to turn the page (or 'next', or 'keep going'), call show_page with page " + (S.story.page + 1) + " yourself." };
    },
    finish_story: function () {
      S.story.reading = false; S.story.paused = false; go("storyEnd"); track("ladybelle_story", { action: "finish" });
      return { ok: true, note: "Say, warmly, that this is the end for now and the rest of the story is coming soon. Then ask the child one gentle question, such as who was kind in the story." };
    },
    show_book_series: function () { go("books"); track("ladybelle_panel", { action: "books" }); return { ok: true, about: SERIES.join(" "), note: "The book series is on the panel. Say one or two warm sentences about it." }; },
    show_fruit_of_the_spirit: function (a) {
      if (S.mode !== "values") go("values"); track("ladybelle_panel", { action: "values" });
      var f = a && FRUITS.filter(function (x) { return x.id === a.fruit; })[0];
      if (f) { var el = $("#lb-fruit-" + f.id, body); if (el) flash(el); }
      return { ok: true, fruits: FRUITS.map(function (x) { return { id: x.id, name: x.name, meaning: x.text }; }), note: "The nine Fruit of the Spirit values are on the panel." };
    },
    show_mailing_list_form: function () { go("list"); return { ok: true, demo: true, note: "The mailing-list form is open. It is for GROWN-UPS only: never ask a child for a name or email. If the visitor sounds like a child, say a grown-up can fill it in." }; },
    fill_mailing_list: function (a) {
      a = a || {}; var changed = [];
      ["name", "email"].forEach(function (k) { if (a[k] != null && String(a[k]).trim() !== "") { S.list[k] = String(a[k]).trim(); changed.push(k); } });
      if (S.mode !== "list") go("list");
      else changed.forEach(function (k) { var el = $("#lb-" + k, body); if (el) el.value = S.list[k]; });
      changed.forEach(function (k) { var el = $("#lb-" + k, body); if (el) flash(el); });
      if (changed.length && S.review && !reviewFresh()) { S.review = null; render({}); }
      return { ok: true, form: { name: S.list.name, email: S.list.email }, still_needed: stillNeeded() };
    },
    submit_mailing_list: function () {
      var missing = stillNeeded();
      if (missing.length) { if (S.review) { S.review = null; render({}); } setMsg("Still needed: " + missing.join(", ") + "."); return { ok: false, missing: missing }; }
      var fromTwin = TOOLS_IMPL.__fromTwin;
      if (!reviewFresh()) { openReview(fromTwin); return { ok: false, needs_confirmation: true, message: "Nothing is sent yet. Read the email back and ask whether it is correct; call again only after a clear yes." }; }
      if (fromTwin && Date.now() - S.review.at < 4000) return { ok: false, needs_confirmation: true, message: "Wait for a clear yes." };
      if (!fromTwin && !S.review.ok) return { ok: false, needs_confirmation: true };
      S.review = null; go("listDone"); track("ladybelle_demo_list", {});
      if (!fromTwin) emit("The grown-up confirmed their mailing-list details. Nothing was sent: this page is a demonstration.", false);
      return { ok: true, demo: true, sent: false, message: "DEMO: nothing was sent. Say thank you, briefly." };
    },
  };
  var str = function (d) { return { type: "string", description: d }; };
  var TOOLS = [
    { name: "start_story", description: "Start Kindness Story Time: open your storybook, Lady Belle Finds a Forever Home, on the panel beside you. Call it when the child wants you to read your story, then call show_page.", inputSchema: { type: "object", properties: {} } },
    { name: "show_page", description: "Turn to a page of your storybook on the panel and get that page's exact words. Read the returned text EXACTLY, word for word and slowly, then call page_finished. Never read on to the next page by yourself.", inputSchema: { type: "object", properties: { page: { type: "integer", description: "Page number, starting at 1" } }, required: ["page"] } },
    { name: "page_finished", description: "Call it as soon as you finish reading a page. It lights up the 'Turn the page' button for the child and tells you what to say; then wait for the child to turn the page.", inputSchema: { type: "object", properties: {} } },
    { name: "get_story_position", description: "Get the page you are on and its exact words. Call it after answering a child's question, then read that page again from the beginning.", inputSchema: { type: "object", properties: {} } },
    { name: "finish_story", description: "Close the story after the last page.", inputSchema: { type: "object", properties: {} } },
    { name: "show_book_series", description: "Show the Tales of Lady Belle: Fruit of the Spirit book series on the panel beside you, when someone asks about your books.", inputSchema: { type: "object", properties: {} } },
    { name: "show_fruit_of_the_spirit", description: "Show the nine Fruit of the Spirit values on the panel beside you. Optionally highlight one.", inputSchema: { type: "object", properties: { fruit: { type: "string", enum: FRUITS.map(function (f) { return f.id; }) } } } },
    { name: "show_mailing_list_form", description: "Open the mailing-list form for GROWN-UPS (parents, grandparents, teachers) who want news about new books. Never for a child.", inputSchema: { type: "object", properties: {} } },
    { name: "fill_mailing_list", description: "Fill in a grown-up's name or email on the mailing-list form, only after they gave it. Spell the email back.", inputSchema: { type: "object", properties: { name: str("Grown-up's name"), email: str("Email address") } } },
    { name: "submit_mailing_list", description: "Send the DEMO mailing-list form. The first call shows a review card; call again only after a clear yes. Nothing is ever sent - this page is a demonstration.", inputSchema: { type: "object", properties: {} }, annotations: { destructiveHint: true } },
  ];
  function execTool(name, args) {
    var fn = TOOLS.some(function (t) { return t.name === name; }) && TOOLS_IMPL[name];
    if (!fn) return Promise.resolve({ ok: false, error: "Unknown tool " + name });
    TOOLS_IMPL.__fromTwin = true; track("ladybelle_tool", { tool: name });
    var done = function (m) { TOOLS_IMPL.__fromTwin = false; return m; };
    try { return Promise.resolve(fn(args || {})).then(done, function (e) { return done({ ok: false, error: String(e && e.message || e) }); }); }
    catch (e) { return Promise.resolve(done({ ok: false, error: String(e && e.message || e) })); }
  }
  // Must run right BEFORE her sdk.init(): replaces whatever tools are on the page with her own.
  function installBelleTools() {
    var mc = document.modelContext;
    if (!mc) { mc = new EventTarget(); try { Object.defineProperty(document, "modelContext", { value: mc, configurable: true }); } catch (e) { document.modelContext = mc; } }
    mc.getTools = function () { return Promise.resolve(TOOLS.map(function (t) { return { name: t.name, description: t.description, inputSchema: t.inputSchema, annotations: t.annotations }; })); };
    mc.executeTool = function (tool, jsonArgs) {
      var args = {}; try { args = typeof jsonArgs === "string" ? JSON.parse(jsonArgs || "{}") : (jsonArgs || {}); } catch (e) {}
      return execTool(tool && tool.name ? tool.name : tool, args);
    };
  }

  /* ═════════ Her intro: muted loop; the sound icon replays it from the start with captions ═════════ */
  // Timed to the intro's speech (ffmpeg silencedetect, 9 Oct).
  var LINES = [[0.2, 1.2, "Hi there!"], [1.2, 4.0, "I'm Lady Belle, a little Snoodle puppy"], [4.0, 7.9, "from the Tales of Lady Belle: Fruit of the Spirit storybooks."],
    [7.9, 10.6, "I'm learning all about things like love, joy and kindness,"], [10.6, 14.5, "and I'd love to share it with you!"], [14.8, 16.0, "And guess what?"],
    [16.0, 20.4, "I'm so excited about my first new book about kindness!"], [20.5, 22.2, "If you'd like to talk with me,"],
    [22.2, 24.9, "just click the Talk to Lady Belle button."], [24.9, 26.6, "I can't wait to meet you!"]];
  var hasIntro = !!vid.getAttribute("data-src");
  var hearing = false, lastT = 0, visible = false, capKey = "";
  function caption(lines) { var k = JSON.stringify(lines || []); if (k === capKey) return; capKey = k; capBox.innerHTML = (lines || []).map(function (l) { return '<span class="cap">' + esc(l) + "</span>"; }).join(""); }
  function ensureSrc() { if (hasIntro && !vid.getAttribute("src")) vid.src = vid.getAttribute("data-src"); }
  function playQuiet() { if (!hasIntro || RM || hearing || liveState !== "idle") return; ensureSrc(); vid.muted = true; var p = vid.play(); if (p && p.catch) p.catch(function () {}); }
  function soundIcon(on) { hearBtn.setAttribute("aria-pressed", on ? "true" : "false"); $("use", hearBtn).setAttribute("href", on ? "#i-vol" : "#i-sound-off"); var l = on ? "Mute Lady Belle's introduction" : "Play Lady Belle's introduction with sound"; hearBtn.setAttribute("aria-label", l); hearBtn.title = l; }
  function stopHearing() { hearing = false; vid.muted = true; soundIcon(false); caption([]); if (RM) vid.pause(); }
  if (!hasIntro) hearBtn.style.display = "none";
  hearBtn.addEventListener("click", function () {
    if (!hasIntro || liveState !== "idle") return;
    if (hearing) { stopHearing(); return; }
    var lo = liveOther();
    if (lo) { say_(lo.name + " is live right now — end that conversation first.", 5000); return; }
    othersQuiet();
    ensureSrc(); hearing = true; vid.currentTime = 0; vid.muted = false; lastT = 0;
    var p = vid.play(); if (p && p.catch) p.catch(function () { stopHearing(); });
    soundIcon(true); track("ladybelle_hear", {});
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

  /* ═════════ Live captions in Story Time (Michael, 21 Oct): her words under her, like the intro captions ═════════
     The SDK hands every data-channel message to onData. Measured in a real session (10-21):
       - each reply's TEXT arrives in well under a second (message_received assistant/delta…/completed), long before
         its audio: the page text was complete 4 s into the session but she spoke it from 8.6 s to 20.6 s;
       - her AUDIO is bracketed per reply, in order: talk_state_changed "started" … "ended" ("preparing" and
         "in_progress" also arrive and are ignored); empty assistant/completed messages belong to tool calls.
     So replies QUEUE as their text arrives, and each "started" takes the next one off the queue. Inside a reply the
     caption advances one sentence at a time on a reading clock (she reads ~18-20 characters a second). */
  var LC = { q: [], fill: null, cur: null, idx: -1, talking: false, timer: null, clear: null, since: 0, shown: "" };
  var LC_CPS = 20;              // measured 10-21: page 1 (237 chars, pauses included) took 12 s
  function lcOn() { return S.mode === "story" || S.mode === "storyEnd"; }
  function lcChunks(text) {
    var clean = String(text || "")
      .replace(/(\w)\s*(\.\.\.|…)\s+(?=["“‘A-Z])/g, "$1. ")   // a "…" breath between sentences stands for the full stop
      .replace(/\s*(\.\.\.|…)\s*/g, " ").replace(/\s+/g, " ").trim();
    var out = [];
    // A sentence ends at . ! ? (plus a closing quote) only when a NEW sentence starts after it - so
    // '“…at my door!”, thought the little dog.' stays one caption.
    clean.split(/(?<=[.!?]["”’]?)\s+(?=["“‘A-Z])/).forEach(function (s) {
      s = s.trim(); if (!s) return;
      while (s.length > 95) {                            // long sentence: break at the last comma (or space) before 95 chars
        var cut = s.lastIndexOf(",", 95); if (cut < 40) cut = s.lastIndexOf(" ", 95); if (cut < 1) cut = 95;
        out.push(s.slice(0, cut + 1).trim()); s = s.slice(cut + 1).trim();
      }
      if (s) out.push(s);
    });
    return out;
  }
  // Captions live in the Story Time panel, between the illustration and the buttons (Michael, 10-21: on phones the
  // caption over the video covered her face, pushed up by Napster's control bar). LC.shown survives a panel re-render.
  function lcHide() { LC.shown = ""; var el = $(".lb-cap", body); if (el) el.textContent = ""; }
  function lcReset() { clearTimeout(LC.timer); clearTimeout(LC.clear); LC.q = []; LC.fill = null; LC.cur = null; LC.idx = -1; LC.talking = false; lcHide(); }
  function lcShow() {
    var c = LC.cur; if (!lcOn() || !c || LC.idx < 0 || !c.chunks[LC.idx]) return;
    LC.shown = c.chunks[LC.idx]; var el = $(".lb-cap", body); if (el) el.textContent = LC.shown;
  }
  // A 150 ms clock: the caption moves on once the current sentence has been up long enough for her to say it, and only
  // to a sentence that has fully arrived (the last one is complete only once the reply is "completed").
  function lcTick() {
    clearTimeout(LC.timer);
    if (!LC.talking || !LC.cur) return;
    LC.timer = setTimeout(function () {
      var c = LC.cur; if (!c) return;
      if (LC.idx < 0) { if (c.chunks.length) { LC.idx = 0; LC.since = Date.now(); lcShow(); } }
      else {
        var s = c.chunks[LC.idx] || "", need = Math.max(1200, s.length / LC_CPS * 1000 + 300);
        var nextReady = LC.idx < c.chunks.length - 1 && (c.done || LC.idx < c.chunks.length - 2);
        if (nextReady && Date.now() - LC.since >= need) { LC.idx++; LC.since = Date.now(); lcShow(); }
      }
      lcTick();
    }, 150);
  }
  function lcData(e) {
    if (!e || !e.event) return;
    if (e.event === "message_received") {
      var m = e.data && e.data.message;
      if (!m || m.role !== "assistant" || typeof m.content !== "string" || (m.action !== "delta" && m.action !== "completed")) return;
      if (!m.content) return;                          // empty completions belong to tool calls
      if (!LC.fill) {                                  // the first text of a new reply
        LC.fill = { text: "", done: false, chunks: [] };
        if (LC.talking && !LC.cur) { LC.cur = LC.fill; LC.idx = -1; lcTick(); } else LC.q.push(LC.fill);
      }
      var f = LC.fill;
      if (m.action === "completed") { f.text = m.content; f.done = true; LC.fill = null; }
      else f.text = m.content.indexOf(f.text) === 0 ? m.content : f.text + m.content;   // cumulative or chunked deltas
      f.chunks = lcChunks(f.text);
      if (f === LC.cur && LC.idx >= 0) lcShow();       // the sentence on screen may have grown
    } else if (e.event === "talk_state_changed") {
      var st = e.data && e.data.state;
      if (st === "started") {
        clearTimeout(LC.clear); LC.talking = true;
        LC.cur = LC.q.shift() || (LC.fill && !LC.fill.claimed ? LC.fill : null); LC.idx = -1;
        if (LC.cur) LC.cur.claimed = true;
        lcTick();
      } else if (st === "ended" || st === "canceled") {
        LC.talking = false; clearTimeout(LC.timer);
        var c = LC.cur; LC.cur = null;
        if (st === "canceled") { LC.q = []; LC.fill = null; }   // "I have a question": everything queued is dropped too
        else if (c && c.done && c.chunks.length && LC.idx < c.chunks.length - 1) { LC.cur = c; LC.idx = c.chunks.length - 1; lcShow(); LC.cur = null; }
        clearTimeout(LC.clear);
        LC.clear = setTimeout(function () { if (!LC.talking) lcHide(); }, st === "canceled" ? 200 : 1200);
      }
    }
  }
  if (/[?&]debug\b/.test(location.search)) window.__lbCaptionTest = lcData;   // test hook (?debug only)

  /* ═════════ "Talk to Lady Belle": the live conversation ═════════ */
  var sdkLoading = null, capTimer = null, readyTimer = null, revealed = false;
  var htmlBg = getComputedStyle(document.documentElement).backgroundColor, bodyBg = getComputedStyle(document.body).backgroundColor;
  function pinBg() { document.documentElement.style.setProperty("background-color", htmlBg, "important"); document.body.style.setProperty("background-color", bodyBg, "important"); }
  function say_(text, ms) { toast.textContent = text; toast.hidden = !text; if (text && ms) setTimeout(function () { if (toast.textContent === text) toast.hidden = true; }, ms); }
  function setTalk(lbl, on) { $("span", talkBtn).textContent = lbl; talkBtn.disabled = liveState === "connecting"; talkBtn.classList.toggle("is-on", !!on); }
  function rememberSeen() { try { document.cookie = "aa_belle_seen=1; Path=" + CFG.SEEN_PATH + "; Max-Age=31536000; Secure; SameSite=Lax"; } catch (e) {} }
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
    if (S.mode === "story") render({});               // story controls switch to "I have a question"
    setTimeout(function () { if (liveState === "live") vid.pause(); }, 900);
    track("ladybelle_live_session", {});
  }
  function fadeOutVoice(ms) {
    ms = ms || 450; var v0 = vid.volume, t0 = Date.now(), done = false, iv = null;
    var finish = function () { if (done) return; done = true; if (iv) clearInterval(iv); stopHearing(); try { vid.volume = v0; } catch (e) {} };
    iv = setInterval(function () { var k = Math.min(1, (Date.now() - t0) / ms); try { vid.volume = Math.max(0, v0 * (1 - k)); } catch (e) {} if (k >= 1) finish(); }, 30);
    setTimeout(finish, ms + 120);
  }
  function endedState(msg, now) {
    S.story.reading = false; S.story.paused = false; S.story.pendingRead = false; S.story.waiting = false; clearTimeout(turnTimer); if (S.mode === "story") setTimeout(function () { render({}); }, 0);
    instance = null; revealed = false; liveState = "idle"; lcReset();
    [capTimer, readyTimer].forEach(function (t) { if (t) clearTimeout(t); }); capTimer = readyTimer = null;
    if (visible) playQuiet();
    avStage.classList.remove("live", "live-ready"); setTalk("Talk to Lady Belle", false);
    if (now) mount.innerHTML = "";
    else setTimeout(function () { if (liveState === "idle") mount.innerHTML = ""; }, 850);
    stage.classList.remove("is-live"); say_(msg || "", msg ? 9000 : 0); pinBg();
  }
  function endLive(msg, now) {
    var inst = instance; instance = null;
    if (inst) { try { inst.destroy && inst.destroy(); } catch (e) {} }
    endedState(msg, now);
  }
  function liveError(e) {
    var st = e && e.status;
    endLive(st === 503 || st === 404 ? "Lady Belle's live conversation is arriving very soon. In the meantime, try the panel beside her." :
      st === 401 ? "This private page needs your portfolio link — open it again from your email." :
      st === 429 || st >= 500 ? "Lady Belle is talking with other friends right now — try again in a few minutes." :
      "I couldn't start the live conversation just now. The panel beside me still works.", true);
  }
  async function startLive() {
    if (liveState !== "idle") return;
    var o = liveOther();
    if (o && otherState(o) === "connecting") { say_(o.name + " is still connecting — end that conversation first.", 5000); return; }
    liveState = "connecting"; if (hearing) fadeOutVoice(); else caption([]);
    othersQuiet();
    if (o) endOther(o);
    setTalk("Connecting…", false); say_("Connecting to Lady Belle…", 0); avStage.classList.add("live"); stage.classList.add("is-live");
    if (hasIntro && !RM && vid.paused) { ensureSrc(); vid.muted = true; var pq = vid.play(); if (pq && pq.catch) pq.catch(function () {}); }
    readyTimer = setTimeout(function () { if (liveState === "connecting") say_("Almost there… allow the microphone if your browser asks.", 0); }, 5000);
    try {
      installBelleTools();
      await loadSdk(); pinBg();
      var res = await fetch(CFG.TOKEN_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(S.story.pendingRead ? { mode: "story", page: S.story.page } : {}) });
      if (!res.ok) { var err = new Error("token " + res.status); err.status = res.status; throw err; }
      var data = await res.json(); var sdk = window.napsterCompanionApiSDK || window.NapsterCompanionApiSdk;
      if (!sdk) throw new Error("sdk missing");
      if (liveState !== "connecting") return;
      installBelleTools(); pinBg();
      instance = await sdk.init(data.token, {
        mountContainer: "#ladybelle-mount", avatarStyle: { view: "rectangle", borderWidth: "0px", borderStyle: "none" }, debug: /[?&]debug\b/.test(location.search),
        features: { showSDKLoader: { enabled: false }, screenShare: { enabled: false }, pictureInPicture: { enabled: true } },
        onAvatarReady: armReveal, onDestroy: function () { if (instance) endedState(""); },
        onData: function (e) { try { lcData(e); } catch (err) {} },
      });
      instance.showAvatar(); pinBg();
      setTimeout(function () { if (instance) armReveal(); }, 3000);
      capTimer = setTimeout(function () { endLive("That's the ten-minute limit — press Talk to Lady Belle to keep going."); }, CFG.CAP_S * 1000);
      emit("The panel beside you is showing: " + (TITLES[S.mode] || "the home view") + ".", false);
    } catch (e) { liveError(e); }
  }
  if (!CFG.LIVE) { talkBtn.classList.add("is-soon"); $("span", talkBtn).textContent = "Talk to Lady Belle · coming soon"; }
  talkBtn.addEventListener("click", function () {
    if (!CFG.LIVE) { say_("Lady Belle's live conversation is coming soon. Until then, try the panel beside her.", 6000); return; }
    if (liveState === "live") { endLive(""); return; }
    startLive();
  });

  window.BellePanel = { tools: TOOLS, exec: execTool, state: function () { return S; } };
  render({});
})();
