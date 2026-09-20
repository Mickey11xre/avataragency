// Cloudflare Pages Function — mints a short-lived Napster session token for
// Dr. Laurie Schreiner's NV2 digital twin (private preview at /thriving-twin/).
//
// Companion ce705f38-fe95-43b2-be27-c16ff15a22b8 — confirmed v2 (versions: v1,v2) 2026-09-20.
//
// Required env var (Cloudflare Pages → Settings → Environment variables):
//   NAPSTER_API_KEY — the Napster Managed API key
//
// ⚠️ Pages needs a REDEPLOY for a changed env var to take effect (Workers apply on Deploy).

const AGENT_ID = '2b15ea74-ccf8-4950-b11e-1e2d5bdad8b8'; // created 2026-09-20, no `language` set

export async function onRequest(context) {
  const API_KEY = context.env.NAPSTER_API_KEY;
  if (!API_KEY) return json({ error: 'Server misconfigured' }, 500);
  if (AGENT_ID.startsWith('REPLACE_')) return json({ error: 'Agent not configured yet' }, 503);

  try {
    const r = await fetch(
      `https://companion-api.napster.com/public/agents/${AGENT_ID}/connections`,
      {
        method: 'POST',
        headers: { 'X-Api-Key': API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channelType: 'webrtc',
          // Guidance, not a script — the model paraphrases initialSpeech.
          initialSpeech:
            "Speak first, before the visitor says anything. Briefly introduce yourself: you are " +
            "Dr. Laurie Schreiner's digital twin, and you study what helps college students thrive. " +
            "Invite them to ask about thriving or the Thriving Quotient. Two sentences, warm and " +
            "scholarly. Do not pitch and do not mention pricing."
        }),
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
    console.error('Laurie token function error:', err);
    return json({ error: 'Internal error' }, 500);
  }
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}
