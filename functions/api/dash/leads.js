/**
 * /api/dash/leads?avatar=ava
 *   GET  — every lead the avatar has captured (all time, newest first), each tied to its conversation when we can.
 *   POST {id, status?, note?} — set a lead's status (new / contacted / won / lost) and the owner's note.
 * The lead records themselves are never changed here; status and note live in KV dash:leadstate:<avatar>.
 */
import {
  json, clip, avatarFrom, listSessions, collectLeads, matchLeads, leadOut, leadExists, leadStates, LEAD_STATUSES,
} from "../../_lib/dash.js";

export async function onRequestGet(context) {
  const avatar = avatarFrom(context);
  if (!avatar) return json({ ok: false, error: "unknown avatar" }, 404);
  const { env } = context;
  const [leads, sessions] = await Promise.all([
    collectLeads(env, avatar),
    listSessions(env, avatar).catch(() => []),               // leads still load if conversations can't
  ]);
  matchLeads(sessions, leads);
  const counts = Object.fromEntries(LEAD_STATUSES.map((s) => [s, leads.filter((l) => l.status === s).length]));
  return json({ ok: true, leads: leads.map(leadOut), counts });
}

export async function onRequestPost(context) {
  const avatar = avatarFrom(context);
  if (!avatar) return json({ ok: false, error: "unknown avatar" }, 404);
  const { env } = context;
  let b; try { b = await context.request.json(); } catch { return json({ ok: false, error: "bad request" }, 400); }
  const id = clip(b.id, 220);
  if (!id || !(await leadExists(env, avatar, id))) return json({ ok: false, error: "lead not found" }, 404);
  const states = await leadStates(env, avatar);
  const cur = states[id] || { status: "new", note: "" };
  if (b.status !== undefined) {
    if (!LEAD_STATUSES.includes(b.status)) return json({ ok: false, error: "unknown status" }, 400);
    cur.status = b.status;
  }
  if (b.note !== undefined) cur.note = clip(b.note, 2000);
  cur.at = new Date().toISOString();
  cur.by = context.data.session.email;
  states[id] = cur;
  await env.AISO_KV.put("dash:leadstate:" + avatar.id, JSON.stringify(states));
  return json({ ok: true, id, status: cur.status, note: cur.note, statusAt: Date.parse(cur.at) });
}
