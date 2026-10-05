/**
 * GET /api/dash/overview?avatar=ava&days=30 — the home screen: headline numbers against the period before, a daily
 * series for the chart, the leads still marked New, and the latest conversations.
 */
import {
  json, avatarFrom, rangeFrom, listSessions, collectLeads, matchLeads, markReturning, detailsFor, previewOf,
  leadOut, dayKey, ms, publicAvatar,
} from "../../_lib/dash.js";

export async function onRequestGet(context) {
  const avatar = avatarFrom(context);
  if (!avatar) return json({ ok: false, error: "unknown avatar" }, 404);
  const { env } = context;
  const r = rangeFrom(context);
  const tz = avatar.timezone;
  // If conversations can't be read right now, the leads still show (they live in our own storage).
  let unavailable = false;
  const [sessions, leads] = await Promise.all([
    listSessions(env, avatar).catch((e) => { console.log("overview: conversations unavailable:", String(e)); unavailable = true; return []; }),
    collectLeads(env, avatar),
  ]);
  markReturning(sessions);
  const outcomes = matchLeads(sessions, leads);

  const talks = sessions.filter((s) => !s.failed);
  const within = (t, a, b) => t != null && t >= a && t < b;
  const cur = talks.filter((s) => within(s.startedAt, r.start, r.end + 1));
  const prev = talks.filter((s) => within(s.startedAt, r.prevStart, r.start));
  const leadsCur = leads.filter((l) => within(ms(l.createdAt), r.start, r.end + 1));
  const leadsPrev = leads.filter((l) => within(ms(l.createdAt), r.prevStart, r.start));
  const visitors = (list) => new Set(list.map((s) => s.visitor || s.id)).size;
  const avgSec = (list) => {
    const d = list.map((s) => s.durationSec).filter((x) => x != null && x > 0);
    return d.length ? Math.round(d.reduce((a, b) => a + b, 0) / d.length) : null;
  };
  const booked = (list) => list.filter((l) => l.kind === "booking" && l.booked).length;
  const converted = (list) => list.filter((s) => outcomes.has(s.id)).length;

  // One point per calendar day in the avatar's time zone, oldest first. The page groups 12 months into weeks.
  const today = dayKey(r.end, tz).split("-").map(Number);
  const days = [];
  for (let i = r.days - 1; i >= 0; i--) days.push(new Date(Date.UTC(today[0], today[1] - 1, today[2] - i)).toISOString().slice(0, 10));
  const series = new Map(days.map((d) => [d, { day: d, conversations: 0, leads: 0, calls: 0 }]));
  for (const s of cur) { const p = series.get(dayKey(s.startedAt, tz)); if (p) p.conversations++; }
  for (const l of leadsCur) {
    const p = series.get(dayKey(ms(l.createdAt), tz));
    if (p) { p.leads++; if (l.kind === "booking" && l.booked) p.calls++; }
  }

  const fresh = leads.filter((l) => l.status === "new");
  const recentTalks = talks.slice(0, 6);
  const { map } = await detailsFor(env, recentTalks, 6);

  return json({
    ok: true,
    unavailable,
    avatar: publicAvatar(avatar),
    range: { days: r.days, start: r.start, end: r.end },
    kpis: {
      conversations: [cur.length, prev.length],
      visitors: [visitors(cur), visitors(prev)],
      returning: cur.filter((s) => s.returning).length,
      leads: [leadsCur.length, leadsPrev.length],
      calls: [booked(leadsCur), booked(leadsPrev)],
      avgSec: [avgSec(cur), avgSec(prev)],
      converted: [converted(cur), converted(prev)],
      didNotConnect: sessions.filter((s) => s.failed && within(s.startedAt, r.start, r.end + 1)).length,
    },
    series: [...series.values()],
    attention: { count: fresh.length, items: fresh.slice(0, 6).map(leadOut) },
    totals: { leads: leads.length, newLeads: leads.filter((l) => l.status === "new").length, conversations: talks.length },
    lastConversationAt: talks.length ? talks[0].startedAt : null,
    recent: recentTalks.map((s) => {
      const d = map.get(s.id);
      const o = outcomes.get(s.id);
      return { id: s.id, startedAt: s.startedAt, durationSec: s.durationSec, returning: !!s.returning,
        preview: d ? previewOf(d) : null, outcomes: o ? o.kinds : [], leadName: o ? o.leads[0].name : "" };
    }),
  });
}
