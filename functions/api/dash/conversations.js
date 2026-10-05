/**
 * /api/dash/conversations?avatar=ava&days=30 — the conversation list for the period, newest first, with a preview of
 * what the visitor asked, what came of it (booked a call, left details...), whether they had been here before, and
 * whether the avatar hit a question she couldn't answer.
 *   GET            the list
 *   POST {q}       the list, filtered to conversations whose transcript contains q. A POST keeps what was searched
 *                  for (often a name) out of URLs and logs.
 */
import {
  json, clip, avatarFrom, rangeFrom, listSessions, collectLeads, matchLeads, markReturning, detailsFor, previewOf,
  couldNotAnswer,
} from "../../_lib/dash.js";

async function list(context, q) {
  const avatar = avatarFrom(context);
  if (!avatar) return json({ ok: false, error: "unknown avatar" }, 404);
  const { env } = context;
  const r = rangeFrom(context);
  const [sessions, leads] = await Promise.all([listSessions(env, avatar), collectLeads(env, avatar)]);
  markReturning(sessions);
  const outcomes = matchLeads(sessions, leads);
  const inRange = sessions.filter((s) => !s.failed && s.startedAt >= r.start);
  const { map, missing } = await detailsFor(env, inRange);

  let items = inRange.map((s) => {
    const d = map.get(s.id);
    const o = outcomes.get(s.id);
    return {
      id: s.id, startedAt: s.startedAt, durationSec: s.durationSec, returning: !!s.returning,
      live: !!s.live, preview: d ? previewOf(d) : null,
      turns: d ? d.messages.filter((m) => m.who === "visitor").length : null,
      gap: d ? d.messages.some((m) => m.who === "avatar" && couldNotAnswer(m.text)) : false,
      outcomes: o ? o.kinds : [], leadName: o ? o.leads[0].name : "",
    };
  });
  if (q) {
    items = items.filter((it) => {
      const d = map.get(it.id);
      return (it.leadName || "").toLowerCase().includes(q) || (d && d.messages.some((m) => m.text.toLowerCase().includes(q)));
    });
  }
  return json({
    ok: true, items, total: inRange.length, missing, searched: q || "",
    didNotConnect: sessions.filter((s) => s.failed && s.startedAt >= r.start).length,
  });
}

export async function onRequestGet(context) { return list(context, ""); }

export async function onRequestPost(context) {
  let b; try { b = await context.request.json(); } catch { return json({ ok: false, error: "bad request" }, 400); }
  return list(context, clip(b.q, 80).toLowerCase());
}
