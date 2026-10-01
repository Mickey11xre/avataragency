// Cloudflare Pages Function — mints a short-lived Napster session token for Ava NV2, the live talking
// agent on the avataragency.ai homepage ("Talk to Ava", home-next/ava-panel.js → CFG.TOKEN_ENDPOINT).
//
// ✅ WIRED 2026-10-01 (Michael's go) to agent 5d72dc62 "Ava - Avatar Agency website (NV2-H)", currently on the
//    HeyGen twin b1df8c54, for live testing on /home-next/. When the HeyGen-vs-Seedance A/B is decided, the
//    WINNING twin goes onto this SAME agent (PATCH /agents/{id} companionId) — this file does not change.
//    Which agent id is which: livebrand-ops/AGENT-ROSTER.md.
//
// Required env var (Cloudflare Pages → Settings → Environment variables):
//   NAPSTER_API_KEY — the Napster Managed API key  (a redeploy is needed for a changed env var)
// Optional binding: AISO_KV — enables the per-IP rate limit below.
//
// Napster allows 5 concurrent sessions for the whole account, and every session is metered, so this
// endpoint only answers requests from our own pages and limits how fast one visitor can open sessions.

const AGENT_ID = '5d72dc62-ab7d-43b5-b781-0dc91e9a690b'; // Ava - Avatar Agency website (NV2-H)
const ALLOWED_ORIGINS = ['https://avataragency.ai', 'https://www.avataragency.ai'];
const PER_IP_PER_HOUR = 8;

// Fleet standard #2 — persistent memory. Napster only remembers a visitor when every session of theirs
// carries the same externalClientId (^[A-Za-z0-9_-]{1,32}$); the dashboard Memory switch alone is not
// enough. We mint an anonymous random id in a first-party cookie — no name, no email, nothing personal —
// so a returning visitor gets the same id and Ava picks up where they left off. The panel's same-origin
// fetch sends and stores the cookie on its own; no page change needed.
const VISITOR_COOKIE = 'aa_ava_vid';
const VISITOR_MAX_AGE = 60 * 60 * 24 * 365;

export async function onRequest(context) {
  const { request, env } = context;
  if (request.method !== 'POST') return json({ error: 'POST only' }, 405);

  const origin = request.headers.get('Origin') || '';
  if (!ALLOWED_ORIGINS.includes(origin)) return json({ error: 'Forbidden' }, 403);

  const API_KEY = env.NAPSTER_API_KEY;
  if (!API_KEY) return json({ error: 'Server misconfigured' }, 500);
  if (AGENT_ID.startsWith('REPLACE_')) return json({ error: 'Agent not configured yet' }, 503);

  if (env.AISO_KV) {
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const key = 'rl:ava-nv2-token:' + ip + ':' + new Date().toISOString().slice(0, 13);
    const n = parseInt((await env.AISO_KV.get(key)) || '0', 10);
    if (n >= PER_IP_PER_HOUR) return json({ error: 'Too many sessions' }, 429);
    await env.AISO_KV.put(key, String(n + 1), { expirationTtl: 3700 });
  }

  const cookies = request.headers.get('Cookie') || '';
  const known = cookies.match(new RegExp('(?:^|;\\s*)' + VISITOR_COOKIE + '=([a-f0-9]{32})(?:;|$)'));
  const visitorId = known ? known[1] : crypto.randomUUID().replace(/-/g, '');

  try {
    const r = await fetch(
      `https://companion-api.napster.com/public/agents/${AGENT_ID}/connections`,
      {
        method: 'POST',
        headers: { 'X-Api-Key': API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channelType: 'webrtc',
          externalClientId: visitorId,
          // Guidance, not a script — the model paraphrases initialSpeech. The brand is two words because
          // the voice says exactly what it reads ("AvatarAgency" comes out as one jumbled word).
          initialSpeech:
            "Speak first, immediately, before the visitor says anything. Open warmly: you're Ava, and you're " +
            "not real — you're a digital avatar created by Avatar Agency. When someone lands on this website " +
            "you're the first to say hello; you answer questions, explain how everything works, and when " +
            "they're ready you can book a call with the team for them. Then ask what brought them here today. " +
            "Under fifteen seconds, friendly and natural. Do not mention pricing."
        }),
      }
    );

    if (!r.ok) {
      const detail = await r.text();
      console.error('Napster token error:', r.status, detail);
      return json({ error: 'Could not create session' }, r.status === 429 ? 429 : 502);
    }

    const data = await r.json();
    // Re-sent on every session so the year counts from the visitor's LAST conversation.
    const setCookie = `${VISITOR_COOKIE}=${visitorId}; Path=/; Max-Age=${VISITOR_MAX_AGE}; Secure; HttpOnly; SameSite=Lax`;
    return json({ token: data.token }, 200, { 'Set-Cookie': setCookie });
  } catch (err) {
    console.error('Ava NV2 token function error:', err);
    return json({ error: 'Internal error' }, 500);
  }
}

function json(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...extraHeaders },
  });
}
