// Cloudflare Pages Function — mints a short-lived Napster session token for Lady Belle's avatar.
// Required env var (Cloudflare Pages → Settings → Environment variables):
//   NAPSTER_API_KEY  — your Napster Managed API key

const AGENT_ID = '8ef4a703-b5f7-4e70-bb18-55fd1ff15364';

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
        body: JSON.stringify({ channelType: 'webrtc', initialSpeech: "Speak first, immediately, before the visitor says anything. Deliver your warm puppy introduction right away: you're Lady Belle, the little Snoodle puppy from the Tales of Lady Belle storybooks, learning all about the fruit of the Spirit, and you'd love to chat. Gentle, cheerful, completely child-safe, with a happy little tail wag. Keep it short and sweet." }),
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
    console.error('Lady Belle token function error:', err);
    return json({ error: 'Internal error' }, 500);
  }
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}
