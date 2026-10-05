/**
 * GET /api/dash/insights?avatar=ava&days=30 — what the transcripts say: how conversations turn into leads, what
 * visitors ask about, when they come, and the questions the avatar couldn't fully answer (knowledge to add).
 */
import {
  json, avatarFrom, rangeFrom, listSessions, collectLeads, matchLeads, detailsFor, weekHour, couldNotAnswer,
  substantive, firstQuestion,
} from "../../_lib/dash.js";

export async function onRequestGet(context) {
  const avatar = avatarFrom(context);
  if (!avatar) return json({ ok: false, error: "unknown avatar" }, 404);
  const { env } = context;
  const r = rangeFrom(context);
  const tz = avatar.timezone;
  const [sessions, leads] = await Promise.all([listSessions(env, avatar), collectLeads(env, avatar)]);
  const outcomes = matchLeads(sessions, leads);
  const cur = sessions.filter((s) => !s.failed && s.startedAt >= r.start);
  const { map, missing } = await detailsFor(env, cur);

  const heat = Array.from({ length: 7 }, () => Array(24).fill(0));
  for (const s of cur) { const [wd, h] = weekHour(s.startedAt, tz); if (wd >= 0) heat[wd][h]++; }

  const topics = (avatar.topics || []).map(([label, src]) => ({ label, re: new RegExp(src, "i"), count: 0 }));
  const gaps = [], firsts = [];
  let engaged = 0;
  for (const s of cur) {
    const d = map.get(s.id);
    if (!d) continue;
    const said = d.messages.filter((m) => m.who === "visitor");
    if (said.filter((m) => substantive(m.text)).length >= 2 || said.length >= 3) engaged++;
    const all = said.map((m) => m.text).join(" \n ");
    for (const t of topics) if (t.re.test(all)) t.count++;
    const fq = firstQuestion(d);
    if (fq && firsts.length < 15) firsts.push({ text: fq.slice(0, 280), sessionId: s.id, at: s.startedAt });
    d.messages.forEach((m, i) => {
      if (m.who !== "avatar" || !couldNotAnswer(m.text) || gaps.length >= 25) return;
      // The question = the visitor's words just before this answer (speech often arrives in several pieces).
      const asked = [];
      for (let j = i - 1; j >= 0 && d.messages[j].who === "visitor"; j--) asked.unshift(d.messages[j].text);
      gaps.push({ question: asked.join(" ").slice(0, 280), answer: m.text.slice(0, 280), sessionId: s.id, at: m.at || s.startedAt });
    });
  }
  const withLead = cur.filter((s) => outcomes.has(s.id)).length;
  const withCall = cur.filter((s) => (outcomes.get(s.id) || { kinds: [] }).kinds.includes("booking")).length;

  return json({
    ok: true,
    range: { days: r.days, start: r.start, end: r.end },
    analyzed: map.size, missing, total: cur.length,
    funnel: [
      { label: "Conversations", value: cur.length },
      { label: "Real back-and-forth", value: engaged, hint: "The visitor said at least two things" },
      { label: "Left their details", value: withLead },
      { label: "Booked a call", value: withCall },
    ],
    topics: topics.map(({ label, count }) => ({ label, count })).sort((a, b) => b.count - a.count),
    heat,
    gaps,
    firsts,
  });
}
