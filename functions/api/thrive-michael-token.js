// Cloudflare Pages Function — mints a Napster session token for SPECIAL AGENT RIVERA,
// the THRIVE speaking agent on Michael's digital twin (avataragency.ai/thrive).
//
// Required env var (Pages → Settings → Environment variables): NAPSTER_API_KEY
//
// ⚠️ ONE-LINE WIRE-UP: paste the AGENT_ID from build-thrive-agent.ps1 below.
// Until then this returns 503 and the page shows a graceful "suiting up" state.

const AGENT_ID = '4250be63-f988-4749-b771-929ef35a84ac'; // Special Agent Rivera — THRIVE (v3 2026-07-14: Jeter respelling + Stephanie-live update)

export async function onRequest(context) {
  const API_KEY = context.env.NAPSTER_API_KEY;

  if (!AGENT_ID) {
    return json({ error: 'Special Agent Rivera is suiting up.' }, 503);
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
        body: JSON.stringify({ channelType: 'webrtc', initialSpeech: "Speak first, immediately, before the visitor says anything. In character, introduce yourself as Special Agent Rivera — Michael Rivera's digital twin and one half of the THRIVE speaking duo — and welcome them to THRIVE. Offer to share what THRIVE's trainings and seminars cover, or how to book Michael and Dr. Stephanie Geter for their next event. Keep it under fifteen seconds, energetic and warm." }),
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
    console.error('thrive-michael token function error:', err);
    return json({ error: 'Internal error' }, 500);
  }
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}
