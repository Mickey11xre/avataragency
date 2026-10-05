/* AvatarAgency avatar dashboard. One page with hash routes:
 *   #/overview  #/leads  #/conversations[/<id>]  #/insights  #/knowledge  #/settings
 * Every number, lead and transcript comes from /api/dash/* (signed-in only). Anything a visitor said or typed is
 * escaped before it reaches the page. */
(() => {
  "use strict";
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const store = {
    get(k, d) { try { const v = localStorage.getItem("aadash:" + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("aadash:" + k, JSON.stringify(v)); } catch (e) { /* private mode: fine */ } },
  };
  const DAYS_OK = [7, 30, 90, 365];
  const S = {
    me: null, avatars: [], av: null, days: DAYS_OK.includes(store.get("days", 30)) ? store.get("days", 30) : 30,
    view: 0, leads: null, leadIndex: new Map(), lf: { status: "all", kind: "all", q: "" },
    convo: null, cq: "", cfilter: "all", convoTok: 0, tTok: 0, chart: null, hiddenAt: 0,
  };

  const ICONS = {
    chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    user: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/>',
    cal: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
    film: '<rect x="2" y="3" width="20" height="18" rx="2"/><path d="M7 3v18M17 3v18M2 9h5M2 15h5M17 9h5M17 15h5"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    ext: '<path d="M15 3h6v6M10 14L21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    play: '<path d="M8 5v14l11-7z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
    x: '<path d="M18 6L6 18M6 6l12 12"/>',
    left: '<path d="M15 18l-6-6 6-6"/>',
    check: '<path d="M20 6L9 17l-5-5"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
    out: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
    spark: '<path d="M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z"/>',
  };
  const icon = (n) => `<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ""}</svg>`;

  const KIND = { booking: "Strategy call", contact: "Contact form", callback: "Callback request", portfolio: "Portfolio request" };
  const KIND_DONE = { booking: "Booked a call", contact: "Left details", callback: "Wants a call back", portfolio: "Asked for portfolio" };
  const KIND_ICON = { booking: "cal", contact: "mail", callback: "phone", portfolio: "film" };
  const STATUS = { new: "New", contacted: "Contacted", won: "Won", lost: "Lost" };
  const TITLES = { overview: "Overview", leads: "Leads", conversations: "Conversations", insights: "Insights", knowledge: "Knowledge", settings: "Settings" };
  const RANGED = new Set(["overview", "conversations", "insights"]);
  const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // ---------- data ----------
  async function api(path, { method = "GET", body, avatar = true } = {}) {
    let url = "/api/dash/" + path;
    if (avatar && S.av) url += (url.includes("?") ? "&" : "?") + "avatar=" + encodeURIComponent(S.av.id);
    let r;
    try {
      r = await fetch(url, { method, credentials: "same-origin", headers: body ? { "Content-Type": "application/json" } : undefined, body: body ? JSON.stringify(body) : undefined });
    } catch (e) { throw new Error("No connection. Check your internet and try again."); }
    if (r.status === 401) { location.replace("/dashboard/login/"); throw new Error("Signed out"); }
    let j = null;
    try { j = await r.json(); } catch (e) { /* not JSON */ }
    if (!r.ok || !j || !j.ok) throw new Error((j && j.error) || "Couldn't load this (" + r.status + ").");
    return j;
  }
  function indexLead(l) { S.leadIndex.set(l.id, l); return l; }

  // ---------- formatting ----------
  const nf = new Intl.NumberFormat("en-US");
  const fmts = {};
  function dfmt(opts) {
    const tz = (S.av && S.av.timezone) || undefined;
    const k = JSON.stringify(opts) + tz;
    return fmts[k] || (fmts[k] = new Intl.DateTimeFormat("en-US", { timeZone: tz, ...opts }));
  }
  const dayStr = (t) => dfmt({ year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(t));
  const timeOnly = (t) => dfmt({ hour: "numeric", minute: "2-digit" }).format(new Date(t));
  function when(t) {
    if (!t) return "";
    const now = Date.now();
    if (dayStr(t) === dayStr(now)) return "Today, " + timeOnly(t);
    if (dayStr(t) === dayStr(now - 86400000)) return "Yesterday, " + timeOnly(t);
    const sameYear = dfmt({ year: "numeric" }).format(new Date(t)) === dfmt({ year: "numeric" }).format(new Date(now));
    return dfmt(sameYear ? { month: "short", day: "numeric" } : { month: "short", day: "numeric", year: "numeric" }).format(new Date(t)) + ", " + timeOnly(t);
  }
  const dateOnly = (t) => dfmt({ month: "short", day: "numeric", year: "numeric" }).format(new Date(t));
  function ago(t) {
    if (!t) return "";
    const s = Math.round((Date.now() - t) / 1000);
    if (s < 60) return "just now";
    const m = Math.round(s / 60); if (m < 60) return m + " min ago";
    const h = Math.round(m / 60); if (h < 24) return h + (h === 1 ? " hour ago" : " hours ago");
    const d = Math.round(h / 24); if (d < 30) return d + (d === 1 ? " day ago" : " days ago");
    return dateOnly(t);
  }
  function dur(sec) {
    if (sec == null) return "—";
    if (sec < 60) return sec + " sec";
    const m = Math.floor(sec / 60), s = sec % 60;
    return m + " min" + (s ? " " + s + " sec" : "");
  }
  const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);
  const plural = (n, one, many) => nf.format(n) + " " + (n === 1 ? one : many || one + "s");
  const rangeWords = () => ({ 7: "7 days", 30: "30 days", 90: "90 days", 365: "12 months" })[S.days];
  const shortDay = (key) => new Intl.DateTimeFormat("en-US", { timeZone: "UTC", month: "short", day: "numeric" }).format(new Date(key + "T12:00:00Z"));
  const hourLabel = (h) => (h % 12 || 12) + (h < 12 ? "a" : "p");
  function tzName() {
    try { return new Intl.DateTimeFormat("en-US", { timeZone: S.av.timezone, timeZoneName: "long" }).formatToParts(new Date()).find((p) => p.type === "timeZoneName").value; }
    catch (e) { return S.av.timezone; }
  }
  function leadAsk(l) {
    if (l.kind === "booking") return (l.booked ? "Call booked for " + (l.callLabel || when(l.callAt)) : "Tried to book a call") + (l.detail ? " · " + l.detail : "");
    if (l.kind === "portfolio") return (l.openedAt ? "Opened the private portfolio" : "Portfolio link sent, not opened yet") + (l.detail ? " · " + l.detail : "");
    return l.detail || (l.kind === "callback" ? "Asked for a phone call back" : "Left their contact details");
  }
  const telHref = (p) => "tel:" + String(p || "").replace(/[^\d+]/g, "");

  // ---------- small UI pieces ----------
  const sk = (h, w) => `<div class="sk" style="height:${h}px;width:${w || "100%"}"></div>`;
  const empty = (ic, title, text) => `<div class="empty">${icon(ic)}<b>${esc(title)}</b>${esc(text || "")}</div>`;
  const errBox = (e) => `<div class="err"><span>${esc(e.message || e)}</span><button class="btn sm" type="button" data-act="retry">Try again</button></div>`;
  function fail(v, tok, e) { if (tok === S.view && e.message !== "Signed out") v.innerHTML = errBox(e); }
  function delta(cur, prev) {
    if (cur == null || prev == null) return "";
    if (!prev) return cur ? '<span class="delta up">New</span>' : '<span class="delta flat">—</span>';
    const p = Math.round(((cur - prev) / prev) * 100);
    if (cur >= prev * 3) return `<span class="delta up">▲ ${Math.round(cur / prev)}×</span>`;   // "▲ 11×" reads better than "▲ 1000%"
    if (p > 0) return `<span class="delta up">▲ ${p}%</span>`;
    if (p < 0) return `<span class="delta down">▼ ${Math.abs(p)}%</span>`;
    return '<span class="delta flat">0%</span>';
  }
  function bigDur(sec) {
    if (sec == null) return "—";
    if (sec < 60) return `${sec}<small>sec</small>`;
    return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}<small>min</small>`;
  }
  function kpi(label, ic, pair, extra, fmt) {
    const [cur, prev] = pair;
    const val = cur == null ? "—" : fmt ? fmt(cur) : nf.format(cur);
    return `<div class="card kpi"><div class="lab">${icon(ic)}${esc(label)}</div><div class="val">${val}</div>
      <div class="foot">${delta(cur, prev)}<span>vs. previous ${rangeWords()}</span></div>${extra ? `<div class="foot2">${esc(extra)}</div>` : ""}</div>`;
  }
  function outcomeChips(c) {
    let h = (c.outcomes || []).map((k) => `<span class="chip ${k}">${esc(KIND_DONE[k] || k)}</span>`).join("");
    if (c.live) h += '<span class="chip live">Live now</span>';
    if (c.returning) h += '<span class="chip returning">Returning</span>';
    if (c.gap) h += `<span class="chip gap">Couldn't answer</span>`;
    return h;
  }
  function leadRow(l) {
    return `<button class="row" type="button" data-act="lead" data-id="${esc(l.id)}"><span class="ico">${icon(KIND_ICON[l.kind])}</span>
      <span class="grow"><span class="t1"><span class="nm">${esc(l.name || l.email)}</span>${l.problem ? '<span class="chip warn">Needs a time</span>' : ""}</span>
      <span class="t2">${esc(KIND[l.kind])} · ${esc(leadAsk(l))}</span></span><span class="when">${esc(ago(l.createdAt))}</span></button>`;
  }
  function convRow(c) {
    return `<a class="row" href="#/conversations/${encodeURIComponent(c.id)}"><span class="ico">${icon("chat")}</span>
      <span class="grow"><span class="t1"><span class="nm">${c.preview ? "“" + esc(c.preview) + "”" : c.preview === "" ? `<span class="muted">The visitor listened but didn't speak</span>` : '<span class="muted">Conversation</span>'}</span></span>
      <span class="t2">${esc(when(c.startedAt))} · ${esc(dur(c.durationSec))}${c.leadName ? " · " + esc(c.leadName) : ""}</span></span>
      <span class="chips">${outcomeChips(c)}</span></a>`;
  }
  let toastT;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg; t.classList.add("on");
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("on"), 2400);
  }
  async function copy(text, done) {
    try { await navigator.clipboard.writeText(text); toast(done || "Copied"); }
    catch (e) { window.prompt("Copy this link:", text); }
  }
  function setNewCount(n) {
    $$("[data-newcount]").forEach((b) => { b.textContent = n > 99 ? "99+" : String(n); b.hidden = !n; });
  }

  // ---------- overlays ----------
  function show(el) { el.hidden = false; requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("on"))); }
  function hide(el) {
    if (el.hidden) return;
    el.classList.remove("on");
    setTimeout(() => { if (!el.classList.contains("on")) el.hidden = true; }, 260);
  }
  function closeOverlays() { hide($("#drawer")); hide($("#sheet")); hide($("#backdrop")); $("#swMenu").hidden = true; $("#switcher").setAttribute("aria-expanded", "false"); }

  // ---------- shell ----------
  function paintShell() {
    const a = S.av;
    $("#swImg").src = a.photo;
    $("#swName").textContent = a.name;
    $("#swSub").textContent = a.role + " · " + a.business;
    const multi = S.avatars.length > 1;
    $("#switcher").dataset.multi = multi ? "1" : "0";
    $("#swChev").hidden = !multi;
    $("#me").innerHTML = `<b>${S.me.role === "admin" ? "Owner" : "Signed in"}</b>${esc(S.me.email)}`;
    $("#crumb").textContent = a.name + " · " + a.business;
    $("#stageBtn").href = a.stageUrl;
    $("#sheetStage").href = a.stageUrl;
    $$("#range button").forEach((b) => b.setAttribute("aria-pressed", String(+b.dataset.days === S.days)));
    document.title = a.name + " · Avatar dashboard";
  }
  function toggleSwitcher() {
    if (S.avatars.length < 2) { location.hash = "#/overview"; return; }
    const m = $("#swMenu");
    const opening = m.hidden;
    m.innerHTML = S.avatars.map((a) => `<button type="button" data-av="${esc(a.id)}" aria-current="${a.id === S.av.id}"><span class="face"><img src="${esc(a.photo)}" alt=""></span><span class="who"><b>${esc(a.name)}</b><span>${esc(a.business)}</span></span></button>`).join("");
    m.hidden = !opening;
    $("#switcher").setAttribute("aria-expanded", String(opening));
  }
  function switchAvatar(id) {
    const a = S.avatars.find((x) => x.id === id);
    if (!a || a.id === S.av.id) { $("#swMenu").hidden = true; return; }
    S.av = a; store.set("avatar", id);
    S.leads = null; S.convo = null; S.leadIndex.clear(); S.lf = { status: "all", kind: "all", q: "" };
    for (const k of Object.keys(fmts)) delete fmts[k];
    paintShell(); closeOverlays(); setNewCount(0);
    route(); refreshNewCount();
  }
  async function signOut() {
    try { await fetch("/api/dash-auth", { method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "logout" }) }); }
    catch (e) { /* the cookie dies with the session record either way */ }
    location.replace("/dashboard/login/");
  }
  async function refreshNewCount() {
    try { const d = await api("leads"); S.leads = d.leads.map(indexLead); setNewCount(d.counts.new); } catch (e) { /* badge only */ }
  }

  // ---------- routing ----------
  function parse() {
    const [r, ...rest] = location.hash.replace(/^#\/?/, "").split("/");
    let arg = "";
    try { arg = decodeURIComponent(rest.join("/")); } catch (e) { /* bad link */ }
    return { r: TITLES[r] ? r : "overview", arg };
  }
  let lastRoute = "";
  function route() {
    const { r, arg } = parse();
    const keepList = r === "conversations" && lastRoute === "conversations" && S.convo && S.convo.days === S.days && $("#convo");
    lastRoute = r;
    closeOverlays();
    $("#title").textContent = TITLES[r];
    $("#range").hidden = !RANGED.has(r);
    $$("[data-route]").forEach((a) => (a.dataset.route === r ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current")));
    const tok = ++S.view;
    const v = $("#view");
    if (r === "conversations") { if (!keepList) window.scrollTo(0, 0); return viewConversations(v, tok, arg, keepList); }
    S.chart = null;
    window.scrollTo(0, 0);
    ({ overview: viewOverview, leads: viewLeads, insights: viewInsights, knowledge: viewKnowledge, settings: viewSettings })[r](v, tok);
  }

  // ---------- overview ----------
  async function viewOverview(v, tok) {
    v.innerHTML = `<div class="grid">${sk(196)}<div class="kpis">${sk(128).repeat(4)}</div>${sk(320)}</div>`;
    let d;
    try { d = await api("overview?days=" + S.days); } catch (e) { return fail(v, tok, e); }
    if (tok !== S.view) return;
    setNewCount(d.totals.newLeads);
    d.attention.items.forEach(indexLead);
    const a = S.av, k = d.kpis;
    const live = a.status === "live";
    v.innerHTML = `${d.unavailable ? `<div class="err" style="margin-bottom:14px"><span>Conversations couldn't load just now, so those numbers are missing. Your leads below are up to date.</span><button class="btn sm" type="button" data-act="retry">Try again</button></div>` : ""}<div class="ov">
      <section class="hero">
        <div class="poster"><img src="${esc(a.photo)}" alt="${esc(a.name)}"><a href="${esc(a.stageUrl)}" target="_blank" rel="noopener"><span>${icon("play")}Talk to ${esc(a.name)}</span></a></div>
        <div class="body">
          <div class="hero-id"><span class="face lg hero-face"><img src="${esc(a.photo)}" alt=""></span><div>
            ${live ? `<div class="livebadge"><i></i>Live on ${esc(a.site)}</div>` : '<span class="chip callback">Not live yet</span>'}
            <h2>${esc(a.name)}</h2>
            <div class="sub">${esc(a.role)} · ${esc(a.business)}</div></div></div>
          <div class="stage-url"><code title="${esc(a.stageUrl)}">${esc(a.stageUrl.replace(/^https?:\/\//, ""))}</code>
            <button class="btn sm ghost" type="button" data-act="copy" data-text="${esc(a.stageUrl)}" data-done="Stage link copied">${icon("copy")}Copy link</button>
            <a class="btn sm gold" href="${esc(a.stageUrl)}" target="_blank" rel="noopener">${icon("ext")}Open live stage</a></div>
          <div class="meta">${d.lastConversationAt ? "Last conversation " + esc(ago(d.lastConversationAt)) : "No conversations yet"} · ${plural(d.totals.conversations, "conversation")} in the last 12 months</div>
        </div>
      </section>
      <div class="kpis">
        ${kpi("Conversations", "chat", k.conversations, plural(k.visitors[0], "visitor") + (k.returning ? " · " + k.returning + " came back" : ""))}
        ${kpi("Leads captured", "user", k.leads, k.conversations[0] ? pct(k.converted[0], k.conversations[0]) + "% of conversations led to a lead" : "")}
        ${kpi("Calls booked", "cal", k.calls, "")}
        ${kpi("Average conversation", "clock", k.avgSec, k.didNotConnect ? plural(k.didNotConnect, "visitor") + " couldn't connect" : "", bigDur)}
      </div>
      <section class="card chart">
        <div class="card-h"><div><h2>Conversations and leads</h2><p>Last ${rangeWords()}, ${S.days > 90 ? "by week" : "by day"}</p></div>
          <div class="legend"><span><i style="background:#1c1a16"></i>Conversations</span><span><i style="background:#C9A84C"></i>Leads</span></div></div>
        <div class="plot" id="chartPlot"></div>
      </section>
      <section class="card attn">
        <div class="card-h"><div><h2>New leads</h2><p>${d.attention.count ? plural(d.attention.count, "lead") + " waiting for you" : "You're all caught up"}</p></div><a class="more" href="#/leads">All leads →</a></div>
        <div class="list">${d.attention.items.length ? d.attention.items.map(leadRow).join("") : empty("check", "Nothing waiting", "New leads land here the moment someone books a call or leaves their details.")}</div>
      </section>
      <section class="card recent">
        <div class="card-h"><div><h2>Latest conversations</h2><p>Open one to read the full transcript</p></div><a class="more" href="#/conversations">All conversations →</a></div>
        <div class="list">${d.recent.length ? d.recent.map(convRow).join("") : empty("chat", "No conversations yet", "Share the live stage link and they'll appear here.")}</div>
      </section>
    </div>`;
    drawChart($("#chartPlot"), d.series);
  }

  function niceMax(v) {
    for (const m of [2, 4, 6, 8, 10]) if (v <= m) return m;
    const p = Math.pow(10, Math.floor(Math.log10(v)));
    for (const m of [2, 4, 6, 8, 10]) if (v <= m * p) return m * p;
    return 10 * p;
  }
  function drawChart(el, series) {
    if (!el) return;
    S.chart = { el, series };
    let pts = series;
    if (series.length > 90) {
      pts = [];
      for (let i = series.length; i > 0; i -= 7) {
        const c = series.slice(Math.max(0, i - 7), i);
        pts.unshift({ day: c[0].day, week: true, conversations: c.reduce((a, b) => a + b.conversations, 0), leads: c.reduce((a, b) => a + b.leads, 0) });
      }
    }
    el.innerHTML = "";                                   // measure the space the card gives the chart, not the old drawing
    const W = Math.max(260, Math.round(el.clientWidth || 600)), H = Math.min(420, Math.max(230, Math.round(el.clientHeight || 230)));
    const L = 30, R = 6, T = 10, B = 26;
    const max = niceMax(Math.max(1, ...pts.map((p) => Math.max(p.conversations, p.leads))));
    const step = (W - L - R) / pts.length;
    const y = (val) => T + (H - T - B) * (1 - val / max);
    const bw = Math.max(2, Math.min(26, step * 0.62)), lw = Math.max(2, bw * 0.46);
    let g = "";
    for (const val of [0, max / 2, max]) {
      g += `<line x1="${L}" x2="${W - R}" y1="${y(val)}" y2="${y(val)}" stroke="rgba(28,26,22,${val ? 0.07 : 0.16})"/><text x="${L - 8}" y="${y(val) + 4}" text-anchor="end" font-size="11" fill="#8a8278">${nf.format(val)}</text>`;
    }
    pts.forEach((p, i) => {
      const cx = L + step * i + step / 2;
      if (p.conversations) g += `<rect x="${(cx - bw / 2).toFixed(1)}" y="${y(p.conversations).toFixed(1)}" width="${bw.toFixed(1)}" height="${(y(0) - y(p.conversations)).toFixed(1)}" rx="${Math.min(4, bw / 2).toFixed(1)}" fill="#1c1a16"/>`;
      if (p.leads) g += `<rect x="${(cx - lw / 2).toFixed(1)}" y="${y(p.leads).toFixed(1)}" width="${lw.toFixed(1)}" height="${(y(0) - y(p.leads)).toFixed(1)}" rx="${Math.min(3, lw / 2).toFixed(1)}" fill="#C9A84C"/>`;
    });
    const n = Math.min(pts.length, W < 520 ? 4 : 7);
    for (let k = 0; k < n; k++) {
      const i = n === 1 ? 0 : Math.round(((pts.length - 1) * k) / (n - 1));
      const cx = L + step * i + step / 2;
      g += `<text x="${cx.toFixed(1)}" y="${H - 6}" text-anchor="${k === 0 && n > 1 ? "start" : k === n - 1 && n > 1 ? "end" : "middle"}" font-size="11" fill="#8a8278">${shortDay(pts[i].day)}</text>`;
    }
    pts.forEach((p, i) => { g += `<rect data-i="${i}" x="${(L + step * i).toFixed(1)}" y="${T}" width="${step.toFixed(1)}" height="${H - T - B}" fill="transparent"/>`; });
    el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Conversations and leads per ${pts[0] && pts[0].week ? "week" : "day"}">${g}</svg><div class="tip" hidden></div>`;
    const svg = $("svg", el), tip = $(".tip", el);
    svg.addEventListener("mousemove", (e) => {
      const hit = e.target.closest("rect[data-i]");
      if (!hit) { tip.hidden = true; return; }
      const p = pts[+hit.dataset.i], i = +hit.dataset.i;
      tip.innerHTML = `<b>${p.week ? "Week of " : ""}${shortDay(p.day)}</b> · ${plural(p.conversations, "conversation")} · ${plural(p.leads, "lead")}`;
      tip.style.left = ((L + step * i + step / 2) / W) * 100 + "%";
      tip.style.top = y(Math.max(p.conversations, p.leads)) + "px";
      tip.hidden = false;
    });
    svg.addEventListener("mouseleave", () => { tip.hidden = true; });
  }

  // ---------- leads ----------
  async function viewLeads(v, tok) {
    v.innerHTML = `<div class="grid">${sk(40)}${sk(360)}</div>`;
    let d;
    try { d = await api("leads"); } catch (e) { return fail(v, tok, e); }
    if (tok !== S.view) return;
    S.leads = d.leads.map(indexLead);
    setNewCount(d.counts.new);
    const kinds = S.av.leadKinds || Object.keys(KIND);
    v.innerHTML = `<div class="toolbar">
        <div class="seg" id="lfStatus" role="group" aria-label="Filter by status"></div>
        <span class="spacer"></span>
        <select class="field" id="lfKind" aria-label="Lead type"><option value="all">All types</option>${kinds.map((k) => `<option value="${k}">${esc(KIND[k])}</option>`).join("")}</select>
        <label class="search"><span class="sr">Search leads</span>${icon("search")}<input class="field" id="lfQ" type="search" placeholder="Search name, email, request" value="${esc(S.lf.q)}"></label>
        <button class="btn" type="button" id="csvBtn">${icon("download")}Export CSV</button>
      </div>
      <div class="card leads-card">
        <table class="tbl"><thead><tr><th>Name</th><th>Type</th><th>What they asked for</th><th>Received</th><th>Status</th><th><span class="sr">Conversation</span></th></tr></thead><tbody id="lfBody"></tbody></table>
        <div class="lead-cards" id="lfCards"></div><div id="lfEmpty"></div>
      </div>`;
    $("#lfKind").value = kinds.includes(S.lf.kind) ? S.lf.kind : "all";
    $("#lfStatus").addEventListener("click", (e) => { const b = e.target.closest("button[data-v]"); if (b) { S.lf.status = b.dataset.v; paintLeads(); } });
    $("#lfKind").addEventListener("change", (e) => { S.lf.kind = e.target.value; paintLeads(); });
    $("#lfQ").addEventListener("input", (e) => { S.lf.q = e.target.value; paintLeads(); });
    $("#csvBtn").addEventListener("click", exportCsv);
    paintLeads();
  }
  function filteredLeads() {
    const q = S.lf.q.trim().toLowerCase();
    return (S.leads || []).filter((l) => (S.lf.status === "all" || l.status === S.lf.status) && (S.lf.kind === "all" || l.kind === S.lf.kind) &&
      (!q || [l.name, l.email, l.phone, l.detail, l.note, KIND[l.kind]].join(" ").toLowerCase().includes(q)));
  }
  const statusSelect = (l) => `<select class="status-sel st-${l.status}" data-status="${esc(l.id)}" aria-label="Status for ${esc(l.name || l.email)}">${Object.keys(STATUS).map((s) => `<option value="${s}"${s === l.status ? " selected" : ""}>${STATUS[s]}</option>`).join("")}</select>`;
  function paintLeads() {
    if (!$("#lfBody")) return;
    const all = S.leads || [];
    const counts = { all: all.length };
    for (const s of Object.keys(STATUS)) counts[s] = all.filter((l) => l.status === s).length;
    $("#lfStatus").innerHTML = ["all", ...Object.keys(STATUS)].map((s) => `<button type="button" data-v="${s}" aria-pressed="${S.lf.status === s}">${s === "all" ? "All" : STATUS[s]}<b>${counts[s]}</b></button>`).join("");
    const L = filteredLeads();
    $("#lfBody").innerHTML = L.map((l) => `<tr data-act="lead" data-id="${esc(l.id)}">
        <td class="who"><b>${esc(l.name || "—")}</b><span>${esc(l.email)}${l.phone ? " · " + esc(l.phone) : ""}</span></td>
        <td><span class="chip ${l.kind}">${esc(KIND[l.kind])}</span>${l.problem ? ' <span class="chip warn">Needs a time</span>' : ""}</td>
        <td><div class="ask">${esc(leadAsk(l))}</div></td>
        <td class="when">${esc(when(l.createdAt))}</td>
        <td>${statusSelect(l)}</td>
        <td>${l.sessionId ? `<a class="iconbtn" href="#/conversations/${encodeURIComponent(l.sessionId)}" title="Read the conversation" aria-label="Read the conversation">${icon("chat")}</a>` : ""}</td></tr>`).join("");
    $("#lfCards").innerHTML = L.map((l) => `<button type="button" class="lcard" data-act="lead" data-id="${esc(l.id)}">
        <div class="top1"><b>${esc(l.name || l.email)}</b><span class="chip st-${l.status}">${STATUS[l.status]}</span></div>
        <div class="ask">${esc(leadAsk(l))}</div>
        <div class="bot"><span class="chip ${l.kind}">${esc(KIND[l.kind])}</span><span>${esc(ago(l.createdAt))}</span></div></button>`).join("");
    $("#lfEmpty").innerHTML = L.length ? "" : all.length ? empty("search", "No leads match", "Try another filter or search.")
      : empty("user", "No leads yet", `When someone books a call or leaves their details with ${S.av.name}, they show up here.`);
  }
  function exportCsv() {
    const L = filteredLeads();
    const cell = (v) => {
      let s = String(v == null ? "" : v);
      if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;                   // keep spreadsheets from running it as a formula
      return '"' + s.replace(/"/g, '""') + '"';
    };
    const rows = [["Received", "Type", "Name", "Email", "Phone", "What they asked for", "Call time", "Status", "Your note"]]
      .concat(L.map((l) => [when(l.createdAt), KIND[l.kind], l.name, l.email, l.phone, l.detail, l.kind === "booking" ? (l.callLabel || when(l.callAt)) : "", STATUS[l.status], l.note]));
    const blob = new Blob(["﻿" + rows.map((r) => r.map(cell).join(",")).join("\r\n")], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${S.av.name.toLowerCase()}-leads-${dayStr(Date.now()).replace(/\//g, "-")}.csv`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    toast(plural(L.length, "lead") + " exported");
  }
  async function saveLead(id, patch) {
    const l = S.leadIndex.get(id);
    if (!l) return;
    const before = { status: l.status, note: l.note };
    Object.assign(l, patch);
    reflectLead(l);
    try {
      const r = await api("leads", { method: "POST", body: { id, ...patch } });
      l.status = r.status; l.note = r.note; l.statusAt = r.statusAt;
      toast(patch.note !== undefined ? "Note saved" : "Marked " + STATUS[r.status].toLowerCase());
    } catch (e) {
      Object.assign(l, before);
      toast(e.message === "Signed out" ? "Signed out" : "Not saved: " + e.message);
    }
    reflectLead(l);
  }
  function reflectLead(l) {
    if (S.leads) setNewCount(S.leads.filter((x) => x.status === "new").length);
    if ($("#lfBody")) paintLeads();
    const dr = $("#drawer");
    if (!dr.hidden && dr.dataset.id === l.id) $$("[data-setstatus]", dr).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.setstatus === l.status)));
  }
  function openLead(id) {
    const l = S.leadIndex.get(id);
    if (!l) return;
    const dr = $("#drawer");
    dr.dataset.id = id;
    const subject = encodeURIComponent(l.kind === "booking" ? "Your strategy call" : `Following up from ${S.av.business}`);
    dr.innerHTML = `<header><div><span class="chip ${l.kind}">${esc(KIND[l.kind])}</span><h3 id="drawerTitle">${esc(l.name || l.email)}</h3><p class="muted small">Received ${esc(when(l.createdAt))}</p></div>
        <button class="x" type="button" data-close aria-label="Close">${icon("x")}</button></header>
      <div class="body">
        ${l.problem ? `<div class="alert">${esc(l.problem)}</div>` : ""}
        <dl class="kv">
          <dt>Email</dt><dd><a href="mailto:${esc(l.email)}">${esc(l.email)}</a></dd>
          ${l.phone ? `<dt>Phone</dt><dd><a href="${esc(telHref(l.phone))}">${esc(l.phone)}</a></dd>` : ""}
          ${l.kind === "booking" ? `<dt>Call</dt><dd>${l.booked ? esc(l.callLabel || when(l.callAt)) : "Not booked yet"}${/^https:\/\//.test(l.reschedule) ? ` · <a href="${esc(l.reschedule)}" target="_blank" rel="noopener">Reschedule</a>` : ""}</dd>` : ""}
          ${l.kind === "portfolio" ? `<dt>Portfolio</dt><dd>${l.openedAt ? "Opened " + esc(when(l.openedAt)) : "Link sent, not opened yet"}</dd>` : ""}
          ${l.kind === "callback" ? "<dt>Asked for</dt><dd>A phone call back</dd>" : ""}
        </dl>
        ${l.detail ? `<div class="block"><h4>${l.kind === "booking" ? "Their notes" : "What they asked for"}</h4><p class="quote">${esc(l.detail)}</p></div>` : ""}
        <div class="block"><h4>Status</h4><div class="status-pick">${Object.keys(STATUS).map((s) => `<button type="button" class="st-${s}" data-setstatus="${s}" aria-pressed="${l.status === s}">${STATUS[s]}</button>`).join("")}</div></div>
        <div class="block"><h4>Your note</h4><textarea class="field" id="leadNote" maxlength="2000" placeholder="Only people with dashboard access see this. E.g. called Tuesday, sending a proposal.">${esc(l.note)}</textarea>
          <div style="margin-top:8px;display:flex;justify-content:flex-end"><button class="btn sm" type="button" id="noteSave">Save note</button></div></div>
        ${l.sessionId ? `<a class="btn" href="#/conversations/${encodeURIComponent(l.sessionId)}">${icon("chat")}Read the conversation</a>`
          : `<p class="note">No conversation is linked to this lead. They used the form without talking to ${esc(S.av.name)}, or talked on another device.</p>`}
      </div>
      <footer><a class="btn gold" href="mailto:${esc(l.email)}?subject=${subject}">${icon("mail")}Reply by email</a>${l.phone ? `<a class="btn" href="${esc(telHref(l.phone))}">${icon("phone")}Call</a>` : ""}</footer>`;
    $$("[data-setstatus]", dr).forEach((b) => b.addEventListener("click", () => { if (l.status !== b.dataset.setstatus) saveLead(id, { status: b.dataset.setstatus }); }));
    $("#noteSave", dr).addEventListener("click", () => saveLead(id, { note: $("#leadNote", dr).value }));
    show($("#backdrop")); show(dr);
    setTimeout(() => { const x = $(".x", dr); if (x) x.focus(); }, 60);
  }

  // ---------- conversations ----------
  const CF = [["all", "All"], ["lead", "Led to a lead"], ["returning", "Returning"], ["gap", "Couldn't answer"]];
  function viewConversations(v, tok, id, keepList) {
    if (!keepList) {
      S.convo = { days: S.days, items: null, meta: null };
      v.innerHTML = `<div class="convo" id="convo">
        <section class="card listcol">
          <label class="search"><span class="sr">Search conversations</span>${icon("search")}<input class="field" id="cq" type="search" placeholder="Search what was said" value="${esc(S.cq)}"></label>
          <div class="seg" id="cf" role="group" aria-label="Filter">${CF.map(([k, lab]) => `<button type="button" data-v="${k}" aria-pressed="${S.cfilter === k}">${lab}</button>`).join("")}</div>
          <div class="citems" id="citems">${sk(74).repeat(5)}</div>
          <p class="note" id="cnote"></p>
        </section>
        <section class="card transcript" id="tview"></section>
      </div>`;
      let t;
      $("#cq").addEventListener("input", (e) => { S.cq = e.target.value; clearTimeout(t); t = setTimeout(loadConvos, 350); });
      $("#cf").addEventListener("click", (e) => {
        const b = e.target.closest("button[data-v]");
        if (!b) return;
        S.cfilter = b.dataset.v;
        $$("#cf button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
        paintConvos();
      });
      loadConvos();
    }
    showTranscript(id);
  }
  async function loadConvos() {
    const t = ++S.convoTok;
    const q = S.cq.trim();
    let d;
    try { d = q ? await api("conversations?days=" + S.days, { method: "POST", body: { q } }) : await api("conversations?days=" + S.days); }
    catch (e) { if (t === S.convoTok && $("#citems")) $("#citems").innerHTML = errBox(e); return; }
    if (t !== S.convoTok || !$("#citems")) return;
    S.convo.items = d.items; S.convo.meta = d;
    paintConvos();
  }
  function paintConvos() {
    if (!S.convo || !S.convo.items || !$("#citems")) return;
    const f = S.cfilter;
    const items = S.convo.items.filter((c) => f === "all" || (f === "lead" ? c.outcomes.length : f === "returning" ? c.returning : c.gap));
    const sel = parse().arg;
    $("#citems").innerHTML = items.length ? items.map((c) => `<a class="citem" href="#/conversations/${encodeURIComponent(c.id)}" aria-current="${c.id === sel}">
        <div class="l1"><b>${esc(when(c.startedAt))}</b><span>${esc(dur(c.durationSec))}</span></div>
        <div class="pv">${c.preview ? "“" + esc(c.preview) + "”" : c.preview === "" ? "<i>The visitor listened but didn't speak</i>" : "<i>Open to read</i>"}</div>
        <div class="chips">${outcomeChips(c)}</div></a>`).join("")
      : empty("chat", S.cq.trim() ? "Nothing found" : "No conversations here", S.cq.trim() ? "Try different words or a longer period." : `Pick a longer period, or share ${S.av.name}'s live stage link.`);
    const m = S.convo.meta;
    const bits = [`${plural(items.length, "conversation")}${items.length !== m.total ? " of " + m.total : ""} in the last ${rangeWords()}`];
    if (m.missing) bits.push(`${m.missing} more still loading, refresh in a minute`);
    if (m.didNotConnect) bits.push(`${plural(m.didNotConnect, "visitor")} couldn't connect`);
    $("#cnote").textContent = bits.join(" · ");
  }
  function messagesHtml(list) {
    if (!list.length) return empty("chat", "Nothing was said", "The visitor connected but didn't speak.");
    let out = "", prev = null;
    for (const m of list) {
      const first = !prev || prev.who !== m.who || (m.at && prev.at && m.at - prev.at > 120000);
      if (first) out += `<div class="stamp-row ${m.who}">${m.who === "avatar" ? esc(S.av.name) : "Visitor"}${m.at ? " · " + esc(timeOnly(m.at)) : ""}</div>`;
      out += `<div class="msg ${m.who}${m.gap ? " gap" : ""}">${m.who === "avatar" ? `<span class="face${first ? "" : " spacer"}"><img src="${esc(S.av.photo)}" alt=""></span>` : ""}<div class="bubble">${esc(m.text)}</div></div>`;
      if (m.gap) out += `<div class="gaplabel">${esc(S.av.name)} couldn't fully answer this. Worth adding to the knowledge.</div>`;
      prev = m;
    }
    return out;
  }
  async function showTranscript(id) {
    const box = $("#convo"), tv = $("#tview");
    if (!box || !tv) return;
    box.classList.toggle("has-sel", !!id);
    $$("#citems .citem").forEach((a) => a.setAttribute("aria-current", String(a.getAttribute("href") === "#/conversations/" + encodeURIComponent(id))));
    if (!id) { tv.innerHTML = `<div style="padding:40px 22px">${empty("chat", "Pick a conversation", "Choose one from the list to read everything that was said.")}</div>`; return; }
    const t = ++S.tTok;
    tv.innerHTML = `<div style="padding:22px;display:grid;gap:14px">${sk(30, "45%")}${sk(64, "70%")}${sk(64, "55%")}${sk(64, "62%")}</div>`;
    let d;
    try { d = await api("conversation?id=" + encodeURIComponent(id)); }
    catch (e) { if (t === S.tTok) tv.innerHTML = `<div style="padding:22px"><button class="btn sm back" type="button" data-act="back">${icon("left")}All conversations</button>${errBox(e)}</div>`; return; }
    if (t !== S.tTok) return;
    const c = d.conversation;
    c.leads.forEach(indexLead);
    const visitorTurns = c.messages.filter((m) => m.who === "visitor").length;
    const gaps = c.messages.filter((m) => m.gap).length;
    tv.innerHTML = `<div class="th"><div><button class="btn sm back" type="button" data-act="back">${icon("left")}All conversations</button>
          <h2>${esc(when(c.startedAt))}</h2><p>${esc(dur(c.durationSec))} · ${plural(visitorTurns, "message")} from the visitor${c.returning ? " · came back for another conversation" : ""}</p></div>
        <div class="chips">${outcomeChips({ outcomes: [...new Set(c.leads.map((l) => l.kind))], returning: c.returning, gap: gaps > 0, live: c.live })}</div></div>
      ${c.leads.length ? `<div class="linked">${icon("user")}<span>Led to:</span>${c.leads.map((l) => `<button type="button" data-act="lead" data-id="${esc(l.id)}">${esc(l.name || l.email)} · ${esc(KIND[l.kind])}</button>`).join("")}</div>` : ""}
      <div class="msgs">${messagesHtml(c.messages)}</div>`;
    if (matchMedia("(max-width: 900px)").matches) window.scrollTo(0, 0);
  }

  // ---------- insights ----------
  async function viewInsights(v, tok) {
    v.innerHTML = `<div class="grid">${sk(170)}<div class="ins">${sk(280)}${sk(280)}</div></div>`;
    let d;
    try { d = await api("insights?days=" + S.days); } catch (e) { return fail(v, tok, e); }
    if (tok !== S.view) return;
    const f = d.funnel, top = f[0].value;
    const topics = d.topics.filter((t) => t.count > 0).slice(0, 8);
    const tmax = Math.max(1, ...topics.map((t) => t.count));
    const hmax = Math.max(1, ...d.heat.flat());
    let heat = `<div class="heat"><span></span>${Array.from({ length: 24 }, (_, h) => `<span class="hh">${h % 3 === 0 ? hourLabel(h) : ""}</span>`).join("")}`;
    for (const wd of [1, 2, 3, 4, 5, 6, 0]) {
      heat += `<span>${WEEKDAYS[wd]}</span>` + d.heat[wd].map((n, h) => `<span class="c" title="${WEEKDAYS[wd]} ${hourLabel(h)}m: ${plural(n, "conversation")}"${n ? ` style="background:rgba(201,168,76,${(0.2 + (0.8 * n) / hmax).toFixed(2)})"` : ""}></span>`).join("");
    }
    heat += "</div>";
    const qItem = (q, main, sub) => `<a class="q" href="#/conversations/${encodeURIComponent(q.sessionId)}"><div class="qq">${main}</div>${sub ? `<div class="qa">${sub}</div>` : ""}<div class="qm">${esc(when(q.at))} · Read the conversation →</div></a>`;
    v.innerHTML = `<div class="ins">
      <section class="card wide"><div class="card-h"><div><h2>From conversation to lead</h2><p>Last ${rangeWords()}${d.missing ? ` · ${d.missing} transcripts still loading, refresh in a minute` : ""}</p></div></div>
        <div class="funnel">${f.map((s, i) => `<div class="fstep" ${s.hint ? `title="${esc(s.hint)}"` : ""}><div class="n">${nf.format(s.value)}</div><div class="lb">${esc(s.label)}</div>
          <div class="pc">${i ? pct(s.value, top) + "% of conversations" : "in the last " + rangeWords()}</div><div class="bar"><i style="width:${top ? Math.max(2, pct(s.value, top)) : 0}%"></i></div></div>`).join("")}</div></section>
      <section class="card"><div class="card-h"><div><h2>What visitors ask about</h2><p>Conversations that mention each topic</p></div></div>
        ${topics.length ? `<div class="bars">${topics.map((t) => `<div class="b"><span title="${esc(t.label)}">${esc(t.label)}</span><span class="track"><i style="width:${Math.max(3, pct(t.count, tmax))}%"></i></span><b>${t.count}</b></div>`).join("")}</div>`
          : empty("spark", "No topics yet", "Topics appear once visitors start asking questions.")}</section>
      <section class="card"><div class="card-h"><div><h2>When visitors talk to ${esc(S.av.name)}</h2><p>By day and hour, ${esc(tzName())}</p></div></div>${heat}</section>
      <section class="card"><div class="card-h"><div><h2>Questions ${esc(S.av.name)} couldn't fully answer</h2><p>Add these to the knowledge and the answers get better</p></div></div>
        ${d.gaps.length ? `<div class="qlist">${d.gaps.slice(0, 10).map((g) => qItem(g, g.question ? "“" + esc(g.question) + "”" : '<span class="muted">The question wasn\'t captured</span>', esc(S.av.name) + ": " + esc(g.answer))).join("")}</div>`
          : empty("check", "No gaps found", `${S.av.name} had an answer every time in this period.`)}</section>
      <section class="card"><div class="card-h"><div><h2>What visitors asked first</h2><p>The opening question of each conversation</p></div></div>
        ${d.firsts.length ? `<div class="qlist">${d.firsts.slice(0, 10).map((x) => qItem(x, "“" + esc(x.text) + "”", "")).join("")}</div>` : empty("chat", "Nothing yet", "Opening questions appear here.")}</section>
    </div>`;
  }

  // ---------- knowledge ----------
  async function viewKnowledge(v, tok) {
    v.innerHTML = `<div class="grid">${sk(92)}<div class="kgrid">${sk(110).repeat(6)}</div></div>`;
    let d;
    try { d = await api("knowledge"); } catch (e) { return fail(v, tok, e); }
    if (tok !== S.view) return;
    const a = S.av;
    const mail = `mailto:${a.contact}?subject=${encodeURIComponent("Knowledge update for " + a.name)}`;
    const STATE = { active: ["live", "Active"], updating: ["callback", "Updating"], attention: ["warn", "Needs attention"] };
    v.innerHTML = `<div class="banner"><div><b>${esc(a.name)} answers from ${plural(d.total, "source")}</b>
        <span>Something to add, correct or remove? Send us a note and we'll update ${esc(a.name)}'s knowledge.</span></div>
        <a class="btn gold" href="${esc(mail)}">${icon("mail")}Request a change</a></div>
      ${d.files.length ? `<div class="kgrid">${d.files.map((f) => { const st = STATE[f.state] || STATE.active; return `<div class="card kfile"><div class="kt"><b>${esc(f.title)}</b><span class="chip ${st[0]}">${st[1]}</span></div>
        ${f.summary ? `<p>${esc(f.summary)}</p>` : ""}${f.addedAt ? `<div class="kd">Added ${esc(dateOnly(f.addedAt))}</div>` : ""}</div>`; }).join("")}</div>`
        : `<div class="card">${empty("book", "No sources yet", "We're still loading this avatar's knowledge.")}</div>`}`;
  }

  // ---------- settings ----------
  function viewSettings(v) {
    const a = S.av;
    const triggers = (a.leadKinds || []).map((k) => ({ booking: "a booked strategy call", contact: "the contact form", callback: "a callback request", portfolio: "a portfolio request" })[k]);
    v.innerHTML = `<div class="settings">
      <section class="card"><div class="card-h"><div><h2>Avatar</h2></div></div>
        <div class="srow"><span>Name</span><span>${esc(a.name)}</span></div>
        <div class="srow"><span>Role</span><span>${esc(a.role)}</span></div>
        <div class="srow"><span>Business</span><span>${esc(a.business)}</span></div>
        <div class="srow"><span>Status</span><span>${a.status === "live" ? '<span class="chip live">Live</span>' : '<span class="chip callback">Not live yet</span>'}</span></div>
        <div class="srow"><span>Live stage</span><span><a href="${esc(a.stageUrl)}" target="_blank" rel="noopener">${esc(a.stageUrl)}</a>
          <button class="btn sm" type="button" data-act="copy" data-text="${esc(a.stageUrl)}" data-done="Stage link copied" style="margin-left:8px">${icon("copy")}Copy</button></span></div>
      </section>
      <section class="card"><div class="card-h"><div><h2>Lead alerts</h2><p>Every new lead is emailed the moment it arrives</p></div></div>
        <div class="srow"><span>Sent to</span><span>${(a.leadAlerts || []).map(esc).join(", ")}</span></div>
        <div class="srow"><span>Sent for</span><span>${esc(triggers.length ? triggers.join(", ").replace(/^./, (c) => c.toUpperCase()) : "—")}</span></div>
      </section>
      <section class="card"><div class="card-h"><div><h2>Your sign-in</h2></div></div>
        <div class="srow"><span>Signed in as</span><span>${esc(S.me.email)} ${S.me.role === "admin" ? '<span class="chip booking">Owner</span>' : ""}</span></div>
        <div class="srow"><span>How sign-in works</span><span>A one-time link or code sent to your email. This browser stays signed in for 30 days.</span></div>
        <div class="srow"><span></span><span><button class="btn" type="button" data-signout>${icon("out")}Sign out</button></span></div>
      </section>
      <section class="card"><div class="card-h"><div><h2>Your data</h2></div></div>
        <div class="srow"><span>Conversations</span><span>Kept and shown here for 12 months</span></div>
        <div class="srow"><span>Leads</span><span>Kept until you ask us to remove them. Export them any time from Leads.</span></div>
        <div class="srow"><span>Who can see this</span><span>Only people you approve, each signing in with their own email</span></div>
      </section>
    </div>`;
  }

  // ---------- wiring ----------
  function wire() {
    window.addEventListener("hashchange", route);
    $("#range").addEventListener("click", (e) => {
      const b = e.target.closest("button[data-days]");
      if (!b || +b.dataset.days === S.days) return;
      S.days = +b.dataset.days; store.set("days", S.days);
      paintShell(); lastRoute = ""; route();
    });
    $("#switcher").addEventListener("click", toggleSwitcher);
    $("#swMenu").addEventListener("click", (e) => { const b = e.target.closest("button[data-av]"); if (b) switchAvatar(b.dataset.av); });
    $("#moreBtn").addEventListener("click", () => { show($("#backdrop")); show($("#sheet")); });
    $("#backdrop").addEventListener("click", closeOverlays);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeOverlays(); });
    document.addEventListener("click", (e) => {
      if (e.target.closest("[data-signout]")) { e.preventDefault(); signOut(); return; }
      if (e.target.closest("[data-close]")) { closeOverlays(); if (e.target.closest("button[data-close]")) return; }
      const el = e.target.closest("[data-act]");
      if (!el) return;
      const act = el.dataset.act;
      if (act === "lead") {
        if (el.tagName === "TR" && e.target.closest("select, a, button")) return;   // the status menu and links in a row do their own thing
        e.preventDefault(); openLead(el.dataset.id);
      } else if (act === "copy") { e.preventDefault(); copy(el.dataset.text, el.dataset.done); }
      else if (act === "retry") { e.preventDefault(); lastRoute = ""; route(); }
      else if (act === "back") { e.preventDefault(); location.hash = "#/conversations"; }
    });
    document.addEventListener("change", (e) => {
      const sel = e.target.closest("select[data-status]");
      if (sel) saveLead(sel.dataset.status, { status: sel.value });
    });
    let rt;
    window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { if (S.chart && document.body.contains(S.chart.el)) drawChart(S.chart.el, S.chart.series); }, 160); });
    // Back to the tab after a while: show fresh numbers (but never yank a page someone is reading or typing in).
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) { S.hiddenAt = Date.now(); return; }
      const r = parse().r;
      if (S.hiddenAt && Date.now() - S.hiddenAt > 120000 && $("#drawer").hidden && (r === "overview" || r === "leads")) { lastRoute = ""; route(); }
    });
  }

  async function boot() {
    let j;
    try { j = await api("me", { avatar: false }); }
    catch (e) { if (e.message !== "Signed out") $("#view").innerHTML = errBox(e); return; }
    S.me = j.me; S.avatars = j.avatars;
    S.av = S.avatars.find((a) => a.id === store.get("avatar", "")) || S.avatars[0];
    if (!S.av) { $("#view").innerHTML = `<div class="card">${empty("user", "No avatar yet", "No avatar is linked to this sign-in yet. We'll let you know when yours is ready.")}</div>`; return; }
    paintShell();
    wire();
    route();
    const r = parse().r;
    if (r !== "overview" && r !== "leads") refreshNewCount();
  }
  boot();
})();
