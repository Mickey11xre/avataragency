// Cloudflare Pages Function — mints a short-lived Napster session token for
// Michael Rivera's digital twin (the founder concierge on avataragency.ai).
// The API key never reaches the browser; only the short-lived token does.
//
// Required env var (Cloudflare Pages → Settings → Environment variables):
//   NAPSTER_API_KEY  — Napster Managed API key (rotated 2026-07-11: livebrand-2026-07)
//
// POST {name?, email?} — registered visitors get persistent memory:
// externalClientId = SHA-256(email)[:32], same recipe as Lisa's token Worker.

const AGENT_ID = 'c6f4f5ed-a007-4754-9477-4aa13f2211c4'; // Michael Rivera Digital v1.2

export async function onRequest(context) {
  const API_KEY = context.env.NAPSTER_API_KEY;
  if (!API_KEY) {
    return json({ error: 'Server misconfigured' }, 500);
  }

  let name = '', email = '';
  if (context.request.method === 'POST') {
    try {
      const b = await context.request.json();
      name = String(b.name || '').trim();
      email = String(b.email || '').trim().toLowerCase();
    } catch {}
  }

  const body = { channelType: 'webrtc', initialSpeech: "Speak first, immediately, before the visitor says anything. Warmly welcome them to AvatarAgency and introduce yourself as Michael Rivera's digital twin — a live example of exactly what AvatarAgency builds. If — and only if — the session profile explicitly includes the visitor's name, greet them by that name as a returning visitor; otherwise greet warmly without any name and never invent one. Then offer to help with AI cinematic videos, digital twins for their business, or booking a strategy meeting with the real Michael. Keep it under fifteen seconds, warm and confident." };
  if (email) {
    body.externalClientId = (await sha256hex(email)).slice(0, 32);
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
      console.error('Napster token error:', r.status, detail);
      return json({ error: 'Could not create session' }, 502);
    }

    const data = await r.json();
    return json({ token: data.token });
  } catch (err) {
    console.error('michael-token function error:', err);
    return json({ error: 'Internal error' }, 500);
  }
}

async function sha256hex(s) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}
