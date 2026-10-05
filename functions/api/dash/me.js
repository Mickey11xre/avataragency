/** GET /api/dash/me — who is signed in and which avatars they can open. */
import { json, AVATARS, publicAvatar } from "../../_lib/dash.js";

export async function onRequestGet(context) {
  const s = context.data.session;
  return json({
    ok: true,
    me: { email: s.email, role: s.role, since: s.since },
    avatars: s.avatars.map((id) => publicAvatar(AVATARS[id])),
  });
}
