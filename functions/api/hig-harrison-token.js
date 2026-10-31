// Cloudflare Pages Function — PUBLIC token endpoint for HARRISON, Harvard Investment Group's AI agent, on the unlisted
// preview /clients/harvard/ (Michael, 2026-10-30). Built from accu-ava-token.js. Anyone with the page link can talk to
// him, so it is ORIGIN-CHECKED and RATE-LIMITED per IP. Visitor cookies are scoped to /api so they reach this endpoint
// (the stage sets aa_hig_seen with Path=/api once a conversation has really started).
//
// Required env var: NAPSTER_API_KEY. Optional binding: AISO_KV (per-IP rate limit).
//
// Harrison (livebrand-ops/hig-harrison): companion db4a8897-ed1c-4ebc-94ba-f92b9a53d24e (his own face and voice),
// knowledge collection 89a96d05-b675-49a6-ad05-657da1c1f671 (22 files), FAQ collection a88c2e3e-7e28-4972-bc79-b77bc6951847
// (48 items), language "en" from birth, web search off. Agent: 51acf130-ee2a-4cf2-a576-69c99b82edf5
// (created 10-30 20:31 PT, live since Part B). If AGENT_ID is ever blanked, this endpoint answers 503 {error:"not live"}
// and the stage shows the "arriving soon" toast.
//
// ⚠️ The panel form beside him is LIVE: submit_contact_details posts to /clients/harvard/api/contact, which emails
// Greg's office (HIG_CONTACT_TO; michael@ while the site is a preview).

const AGENT_ID = '51acf130-ee2a-4cf2-a576-69c99b82edf5'; // livebrand-ops/hig-harrison/.agent-id (created 10-30 20:31 PT)
const ALLOWED_ORIGINS = ['https://avataragency.ai', 'https://www.avataragency.ai'];
const PER_IP_PER_HOUR = 8;
const VISITOR_COOKIE = 'aa_hig_vid';
const SEEN_COOKIE = 'aa_hig_seen';
const VISITOR_MAX_AGE = 60 * 60 * 24 * 365;
const COOKIE_PATH = '/api';   // the visitor cookies must reach this endpoint

export async function onRequest(context) {
  const { request, env } = context;
  if (request.method !== 'POST') return json({ error: 'POST only' }, 405);

  const origin = request.headers.get('Origin') || '';
  if (!ALLOWED_ORIGINS.includes(origin)) return json({ error: 'Forbidden' }, 403);

  if (!AGENT_ID) return json({ error: 'not live' }, 503);

  const API_KEY = env.NAPSTER_API_KEY;
  if (!API_KEY) return json({ error: 'Server misconfigured' }, 500);

  if (env.AISO_KV) {
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const key = 'rl:hig-harrison-public:' + ip + ':' + new Date().toISOString().slice(0, 13);
    const n = parseInt((await env.AISO_KV.get(key)) || '0', 10);
    if (n >= PER_IP_PER_HOUR) return json({ error: 'Too many sessions' }, 429);
    await env.AISO_KV.put(key, String(n + 1), { expirationTtl: 3700 });
  }

  const cookies = request.headers.get('Cookie') || '';
  const known = cookies.match(new RegExp('(?:^|;\\s*)' + VISITOR_COOKIE + '=([a-f0-9]{32})(?:;|$)'));
  const visitorId = known ? known[1] : crypto.randomUUID().replace(/-/g, '');
  // site.js sets aa_hig_seen once a live conversation has really started in this browser.
  const seen = new RegExp('(?:^|;\\s*)' + SEEN_COOKIE + '=1(?:;|$)').test(cookies);
  const returning = Boolean(known && seen);
  const connection = { channelType: 'webrtc', externalClientId: visitorId, initialSpeech: returning ? WELCOME_BACK : FIRST_VISIT };

  try {
    const r = await fetch(`https://companion-api.napster.com/public/agents/${AGENT_ID}/connections`, {
      method: 'POST',
      headers: { 'X-Api-Key': API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify(connection),
    });
    if (!r.ok) {
      const detail = await r.text();
      console.error('Token error (Harrison):', r.status, detail);
      return json({ error: 'Could not create session' }, r.status === 429 ? 429 : 502);
    }
    const data = await r.json();
    const setCookie = `${VISITOR_COOKIE}=${visitorId}; Path=${COOKIE_PATH}; Max-Age=${VISITOR_MAX_AGE}; Secure; HttpOnly; SameSite=Lax`;
    return json({ token: data.token }, 200, { 'Set-Cookie': setCookie });
  } catch (err) {
    console.error('Harrison token function error:', err);
    return json({ error: 'Internal error' }, 500);
  }
}

// Guidance, not a script — the model paraphrases initialSpeech. The visitor has usually just watched his video
// introduction, so the live greeting is short. Matches the OPENING in his instructions.
const FIRST_VISIT = "Speak first, immediately, before the visitor says anything, in English. Greet them warmly and briefly: " +
  "you're Harrison, Harvard Investment Group's A-I agent. Then ask whether they're here about investing, real estate, " +
  "Hope for the Hurting, or something else. Under ten seconds, polished and natural.";

const WELCOME_BACK = "Speak first, immediately, before the visitor says anything, in English. This visitor has talked with " +
  "you before. Welcome them back warmly - do not repeat your introduction. If you remember what you talked about last " +
  "time, mention it in a few words and offer to pick up there; otherwise ask what brings them back today. Under ten " +
  "seconds, polished and natural.";

function json(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...extraHeaders },
  });
}
