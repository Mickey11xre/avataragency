// Cloudflare Pages Function — mints a short-lived Napster session token for Paul's avatar.
// The API key never reaches the browser; only the short-lived token does.
//
// Required env var (Cloudflare Pages → Settings → Environment variables):
//   NAPSTER_API_KEY  — your Napster Managed API key
//
// ⚠️ ONE-LINE WIRE-UP: paste Paul's agent id (PAUL_AGENT_ID from setup-paul-twin.js)
// into AGENT_ID below once his v2 twin finishes processing and the agent is created.
// Until then this returns 503 and the case-study page shows a graceful "coming soon" state.

const AGENT_ID = ''; // <-- PAUL_AGENT_ID goes here (e.g. 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')

export async function onRequest(context) {
  const API_KEY = context.env.NAPSTER_API_KEY;

  if (!AGENT_ID) {
    return json({ error: 'Paul’s avatar is being finalized.' }, 503);
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
    console.error('Paul token function error:', err);
    return json({ error: 'Internal error' }, 500);
  }
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}
