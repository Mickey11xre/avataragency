// Cloudflare Pages Function — mints a short-lived Napster session token for Ava.
// The API key never reaches the browser; only the short-lived token does.
//
// Required env var (set in Cloudflare Pages → Settings → Environment variables):
//   NAPSTER_API_KEY  — your Napster Managed API key

const AGENT_ID = 'ab48656c-4120-4ec1-8247-310c4e219dd8'; // Ava — AvatarAgency Real Estate (digital twin, cloned voice)

export async function onRequest(context) {
  const API_KEY = context.env.NAPSTER_API_KEY;

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
    console.error('Ava token function error:', err);
    return json({ error: 'Internal error' }, 500);
  }
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}
