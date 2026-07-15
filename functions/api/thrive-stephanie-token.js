// Cloudflare Pages Function — mints a Napster session token for THRIVE DOCTOR,
// the THRIVE speaking agent on Stephanie Geter's digital twin (avataragency.ai/thrive).
//
// Required env var (Pages → Settings → Environment variables): NAPSTER_API_KEY
//
// ⚠️ ONE-LINE WIRE-UP: paste the AGENT_ID from build-stephanie-twin.ps1 -Mode create-agent below.
// Until then this returns 503 and the page shows a graceful "on her way" state.

const AGENT_ID = 'de8a2f1e-2ef4-4cf7-ad86-a1b47867c04e'; // THRIVE DOCTOR — Stephanie Geter (v3 2026-07-14: her verbatim greeting + Jeter respelling)

export async function onRequest(context) {
  const API_KEY = context.env.NAPSTER_API_KEY;

  if (!AGENT_ID) {
    return json({ error: 'THRIVE DOCTOR is on her way.' }, 503);
  }
  if (!API_KEY) {
    return json({ error: 'Server misconfigured' }, 500);
  }

  try {
    const r = await fetch(
      `https://companion-api.napster.com/public/agents/${AGENT_ID}/connections`,
      {
        method: 'POST',
        headers: { 'X-Api-Key': API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ channelType: 'webrtc' }),
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
    console.error('thrive-stephanie token function error:', err);
    return json({ error: 'Internal error' }, 500);
  }
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}
