/* ETHICA's stage on the redesigned landing page /ethica/thrive/new/ (preview; Michael, 2026-10-23). Built from
 * /clients/accu/accu-stage.js (same look, panel and live-session code), with Ethica's own panel and the current
 * /ethica/thrive/ free-minutes gate.
 *
 * Panel (Michael, 10-23): The PDR Framework · The schemes she fights · The Fraud Fighter Collection (merch) · Subscribe.
 * The visitor can tap them, and Ethica opens them herself when the conversation turns to them (page tools below).
 *
 * ACCESS (unchanged from /ethica/thrive/, build:v6): anonymous = 5 minutes once per browser → register;
 * registered = 5 minutes a day for 7 days → subscribe (Starter $9 / Guardian $19 a month, from subscribe.html). localStorage keys `ethica_user` / `ethica_anon`
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
  };

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
  // { stage: "anonymous"|"registered", seconds } or { stage: "blocked", why: "free_used"|"trial_over"|"day_used" }
  function grantAccess() {
    var user = get("ethica_user");
    if (user && user.email) {
      var days = user.trialDays || 7, start = Date.parse(user.registeredAt || "") || Date.now();
      var dayNum = Math.floor((Date.now() - start) / 86400000) + 1;
      if (dayNum > days) return { stage: "blocked", why: "trial_over" };
      var k = todayKey();
      if (user.dayKey !== k) { user.dayKey = k; user.daySecondsLeft = user.dailySeconds || 300; put("ethica_user", user); }
      if ((user.daySecondsLeft || 0) <= 0) return { stage: "blocked", why: "day_used" };
      return { stage: "registered", seconds: user.daySecondsLeft, day: dayNum, days: days };
    }
    var anon = get("ethica_anon");
    if (!anon) { anon = { secondsLeft: 300, used: false }; put("ethica_anon", anon); }
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
    if (access.stage === "anonymous") put("ethica_anon", { secondsLeft: Math.max(0, secondsLeft), used: secondsLeft <= 0 });
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
  var S = { mode: "home", hist: [], pillar: null, scheme: null, product: null, out: null };
  var TITLES = { home: "How can I help?", pdr: "The PDR Framework", schemes: "The schemes she fights", scheme: "The schemes she fights",
    merch: "The Fraud Fighter Collection", subscribe: "Keep talking to Ethica" };
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
        act("subscribe", IC.star, "Subscribe", "Plans from $9 a month") + "</div>";
    },
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
      if (S.out === "free_used" || a.why === "free_used") note = "Your free session has ended. Register for free to talk with Ethica five minutes a day for seven days — or choose a plan.";
      else if (S.out === "day_used" || a.why === "day_used") note = "That's today's five minutes. Come back tomorrow — or choose a plan.";
      else if (a.why === "trial_over") note = "Your seven-day trial is over. Subscribe to keep talking to Ethica.";
      else if (a.stage === "anonymous") note = "Your first conversation is free: " + mmss(a.seconds) + " left.";
      else note = "Day " + a.day + " of " + a.days + " of your free trial: " + mmss(a.seconds) + " left today.";
      var anon = !get("ethica_user");
      // The plans are the live subscribe.html's (Stripe checkout lives there): Starter $9 / 60 min, Guardian $19 / 180 min.
      return '<p class="p-sub">' + esc(note) + '</p><div class="eth-plans">' + PLANS.map(function (p) {
          return '<a class="eth-plan' + (p.top ? " top" : "") + '" href="' + CFG.SUBSCRIBE + '" data-sub="' + p.id + '">' + (p.top ? '<span class="eth-plan-tag">Most popular</span>' : "") +
            "<h4>" + p.name + '</h4><div class="eth-price"><b>' + p.price + "</b><span>per month</span></div><small>" + esc(p.minutes) + "</small></a>";
        }).join("") + "</div>" +
        (anon ? '<div class="p-svc-actions"><a class="btn btn-ghost btn-sm" href="' + CFG.REGISTER + '" data-sub="register">Register free · 5 min a day for 7 days</a></div>' : "") +
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
    var on = $(".on", body); if (on) { flash(on); }
    if (opts.focus) { var f = $("button, a", body); if (f) f.focus({ preventScroll: true }); }
  }
  function flash(el) { el.classList.add("flash"); setTimeout(function () { el.classList.remove("flash"); }, 1100); reveal(el); }
  function reveal(el) {   // scroll the panel (never the page) so what she just highlighted is in view
    if (!el || body.scrollHeight <= body.clientHeight + 1) return;
    var b = body.getBoundingClientRect(), r = el.getBoundingClientRect();
    if (r.top < b.top) body.scrollTop -= (b.top - r.top) + 8;
    else if (r.bottom > b.bottom) body.scrollTop += (r.bottom - b.bottom) + 8;
  }

  /* ═════════ Visitor taps (each one is reported to the live Ethica) ═════════ */
  body.addEventListener("click", function (e) {
    var t = e.target.closest("[data-act], [data-scheme], [data-pillar], [data-buy], [data-sub]"); if (!t) return;
    var a = t.getAttribute("data-act");
    if (a === "pdr") { S.pillar = null; go("pdr"); emit("The visitor opened The PDR Framework.", false); track("ethica_panel", { action: "pdr" }); }
    else if (a === "schemes") { S.scheme = null; go("schemes"); emit("The visitor opened The schemes she fights.", false); track("ethica_panel", { action: "schemes" }); }
    else if (a === "merch") { S.product = null; go("merch"); emit("The visitor opened The Fraud Fighter Collection.", false); track("ethica_panel", { action: "merch" }); }
    else if (a === "subscribe") { go("subscribe"); emit("The visitor opened the subscription panel.", false); track("ethica_panel", { action: "subscribe" }); }
    else if (t.hasAttribute("data-scheme")) { S.scheme = t.getAttribute("data-scheme"); go("scheme"); emit("The visitor is reading about " + findIn(SCHEMES, S.scheme).name + ".", false); track("ethica_scheme", { scheme: S.scheme }); }
    else if (t.hasAttribute("data-pillar")) { S.pillar = t.getAttribute("data-pillar"); render({}); emit("The visitor is reading about " + findIn(PDR, S.pillar).name + ".", false); }
    else if (t.hasAttribute("data-buy")) { track("ethica_merch_click", { product: t.getAttribute("data-buy") }); emit("The visitor opened the store page for " + findIn(MERCH, t.getAttribute("data-buy")).name + ".", false); }
    else if (t.hasAttribute("data-sub")) { track("ethica_sub_click", { action: t.getAttribute("data-sub") }); if (instance) endLive(""); }
  });

  /* ═════════ Ethica's page tools: the one way she changes the panel ═════════ */
  var TOOLS_IMPL = {
    show_menu: function () { S.hist = []; go("home", { replace: true }); return { ok: true, options: ["The PDR Framework", "The schemes she fights", "The Fraud Fighter Collection", "Subscribe"] }; },
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
  };
  var TOOLS = [
    { name: "show_menu", description: "Return the panel beside you to its main menu (The PDR Framework, The schemes she fights, The Fraud Fighter Collection, Subscribe).", inputSchema: { type: "object", properties: {} } },
    { name: "show_pdr_framework", description: "Show The PDR Framework (Prevention, Detection, Remediation) on the panel beside you, which the visitor can see. Call it the moment you start explaining how to fight fraud, or one of the three pillars. Pass pillar to highlight one.",
      inputSchema: { type: "object", properties: { pillar: { type: "string", enum: PDR.items.map(function (x) { return x.id; }) } } } },
    { name: "show_fraud_scheme", description: "Show the schemes you fight on the panel beside you. Pass scheme to open one (e.g. when the visitor mentions an investment that sounds too good to be true, open investment_scams). Without scheme, shows the list of all eight.",
      inputSchema: { type: "object", properties: { scheme: { type: "string", enum: SCHEMES.items.map(function (x) { return x.id; }) } } } },
    { name: "show_merch", description: "Show The Fraud Fighter Collection (official Ethica tees and hoodie, with prices and Get yours buttons) on the panel beside you. Call it when the visitor asks about merch, shirts, the hoodie or supporting the mission. Pass product to highlight one.",
      inputSchema: { type: "object", properties: { product: { type: "string", enum: MERCH.items.map(function (x) { return x.id; }) } } } },
    { name: "show_subscription", description: "Show the subscription plans beside you: Starter, $9 a month for 60 minutes, and Guardian, $19 a month for 180 minutes; cancel anytime. Call it when the visitor asks how to keep talking, about the price, or when their free time is almost up.",
      inputSchema: { type: "object", properties: {} } },
  ];
  function execTool(name, args) {
    var fn = TOOLS.some(function (t) { return t.name === name; }) && TOOLS_IMPL[name];
    if (!fn) return Promise.resolve({ ok: false, error: "Unknown tool " + name });
    track("ethica_tool", { tool: name });
    try { return Promise.resolve(fn(args || {})).then(null, function (e) { return { ok: false, error: String(e && e.message || e) }; }); }
    catch (e) { return Promise.resolve({ ok: false, error: String(e && e.message || e) }); }
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
    return "The panel beside you is visible and showing " + where + ". The visitor has " + mmss(secondsLeft) +
      (access && access.stage === "anonymous" ? " of free conversation." : " left today.");
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
