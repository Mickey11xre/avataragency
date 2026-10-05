/**
 * GET /api/dash/conversation?avatar=ava&id=<conversation id> — one full transcript, with the leads it produced.
 * The conversation must belong to one of this avatar's faces; anything else is "not found".
 */
import {
  json, clip, avatarFrom, listSessions, collectLeads, matchLeads, markReturning, sessionDetail, couldNotAnswer, leadOut,
} from "../../_lib/dash.js";

export async function onRequestGet(context) {
  const avatar = avatarFrom(context);
  if (!avatar) return json({ ok: false, error: "unknown avatar" }, 404);
  const { env } = context;
  const id = clip(new URL(context.request.url).searchParams.get("id"), 80);
  if (!/^[A-Za-z0-9-]{8,80}$/.test(id)) return json({ ok: false, error: "not found" }, 404);
  let d;
  try { d = await sessionDetail(env, id); } catch (e) { return json({ ok: false, error: "not found" }, 404); }
  if (!avatar.companionIds.includes(d.companionId)) return json({ ok: false, error: "not found" }, 404);

  const [sessions, leads] = await Promise.all([listSessions(env, avatar).catch(() => []), collectLeads(env, avatar)]);
  markReturning(sessions);
  matchLeads(sessions.length ? sessions : [d], leads);
  const s = sessions.find((x) => x.id === id);
  return json({
    ok: true,
    conversation: {
      id, startedAt: d.startedAt, endedAt: d.endedAt, durationSec: d.durationSec, returning: !!(s && s.returning),
      live: !!d.live,
      messages: d.messages.map((m) => ({ ...m, gap: m.who === "avatar" && couldNotAnswer(m.text) })),
      leads: leads.filter((l) => l.sessionId === id).map(leadOut),
    },
  });
}
