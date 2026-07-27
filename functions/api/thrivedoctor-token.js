// Cloudflare Pages Function — mints a Napster session token for THRIVE DOCTOR's
// digital-twin-MARKETING agent on avataragency.ai/thrivedoctor (Stephanie selling
// branded digital twins). Separate agent from /thrive (which sells speaking).
//
// Required env var (Pages → Settings → Environment variables): NAPSTER_API_KEY
//
// ⚠️ ONE-LINE WIRE-UP: paste the AGENT_ID from thrive-doctor-marketing/build-agent.ps1 below.
// Until then this returns 503 and the page shows a graceful "on her way" state.

const AGENT_ID = '163956c4-0061-4708-bb91-fcaca5c89298'; // THRIVE DOCTOR digital-twin-marketing (2026-07-24)

// initialSpeech: she speaks first at connect — pitching getting-your-own-twin, not booking a talk.
const INITIAL_SPEECH =
  'Speak first, immediately, before the visitor says anything. Warmly welcome them and make ' +
  'the point that you ARE a branded digital twin — Dr. Stephanie Jeter\'s real face and cloned ' +
  'voice, talking with them right now — and this is exactly what AvatarAgency can build for ' +
  'them: a second them, always on, greeting every visitor to their site day and night. Then ' +
  'ask what they do, so you can make it specific. If — and only if — the session profile ' +
  'explicitly includes their name, greet them by that name; otherwise greet warmly without a ' +
  'name and never invent one. Never mention any platform or vendor — only AvatarAgency. Keep ' +
  'it under fifteen seconds, warm and rising.';

export async function onRequest(context) {
  const API_KEY = context.env.NAPSTER_API_KEY;
  if (!AGENT_ID) return json({ error: 'THRIVE DOCTOR is on her way.' }, 503);
  if (!API_KEY) return json({ error: 'Server misconfigured' }, 500);

  // optional returning-visitor memory
  let name = '', email = '';
  if (context.request.method === 'POST') {
    try {
      const b = await context.request.json();
      name = String(b.name || '').trim().slice(0, 80);
      email = String(b.email || '').trim().toLowerCase().slice(0, 120);
    } catch {}
  }
  const body = { channelType: 'webrtc', initialSpeech: INITIAL_SPEECH };
  if (email) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(email));
    body.externalClientId = [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 32);
    if (name) body.externalClientProfile = { name };
  }

  try {
    const r = await fetch(
      `https://companion-api.napster.com/public/agents/${AGENT_ID}/connections`,
      {
        method: 'POST',
        headers: { 'X-Api-Key': API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );
    if (!r.ok) {
      const detail = await r.text();
      console.error('THRIVE DOCTOR token error:', r.status, detail);
      return json({ error: 'Could not create session' }, 502);
    }
    const data = await r.json();
    return json({ token: data.token });
  } catch (err) {
    console.error('thrivedoctor token function error:', err);
    return json({ error: 'Internal error' }, 500);
  }
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}
