// Cloudflare Pages Function — PUBLIC token endpoint for ACCU AVA, the AI loan agent prototype for America's Christian
// Credit Union, on the unlisted pitch page /clients/accu/ (Michael, 2026-10-22). Built from maya-nv2-token.js.
// Anyone with the page link can talk to her, so it is ORIGIN-CHECKED and RATE-LIMITED per IP, with its own budget.
// No viewer record and no name: she never greets anyone by name. Visitor cookies are scoped to /api so they reach this
// endpoint (the stage sets aa_accu_seen with data-seen-path="/api").
//
// Required env var: NAPSTER_API_KEY. Optional binding: AISO_KV (per-IP rate limit).
//
// ✅ Agent 0f7ffaaa "Ava - ACCU AI Loan Agent (NV2)", created 2026-10-22 by livebrand-ops/accu-ava/build-accu-agent.ps1:
//    her OWN twin d0bf8c0f (Ava's face and voice; never the homepage twin 93d5c657), language "en" from birth,
//    knowledge collection 9ed1dd91 (26 files), FAQ collection 2f820af8 (50), web search off, nearField + turn detection
//    0.8/500/800. Her panel tools are DEMO only (clients/accu/accu-stage.js): nothing reaches ACCU.

const AGENT_ID = '0f7ffaaa-ed52-4302-b2c3-ddd888c0ac8d'; // Ava - ACCU AI Loan Agent (NV2); livebrand-ops/accu-ava/.agent-id
const ALLOWED_ORIGINS = ['https://avataragency.ai', 'https://www.avataragency.ai'];
const PER_IP_PER_HOUR = 8;
const VISITOR_COOKIE = 'aa_accu_vid';
const VISITOR_MAX_AGE = 60 * 60 * 24 * 365;
const COOKIE_PATH = '/api';   // the visitor cookies must reach this endpoint

export async function onRequest(context) {
  const { request, env } = context;
  if (request.method !== 'POST') return json({ error: 'POST only' }, 405);

  const origin = request.headers.get('Origin') || '';
  if (!ALLOWED_ORIGINS.includes(origin)) return json({ error: 'Forbidden' }, 403);

  const API_KEY = env.NAPSTER_API_KEY;
  if (!API_KEY) return json({ error: 'Server misconfigured' }, 500);

  if (env.AISO_KV) {
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const key = 'rl:accu-ava-public:' + ip + ':' + new Date().toISOString().slice(0, 13);
    const n = parseInt((await env.AISO_KV.get(key)) || '0', 10);
    if (n >= PER_IP_PER_HOUR) return json({ error: 'Too many sessions' }, 429);
    await env.AISO_KV.put(key, String(n + 1), { expirationTtl: 3700 });
  }

  const cookies = request.headers.get('Cookie') || '';
  const known = cookies.match(new RegExp('(?:^|;\\s*)' + VISITOR_COOKIE + '=([a-f0-9]{32})(?:;|$)'));
  const visitorId = known ? known[1] : crypto.randomUUID().replace(/-/g, '');
  // accu-stage.js sets aa_accu_seen once a live conversation has really started in this browser.
  const seen = /(?:^|;\s*)aa_accu_seen=1(?:;|$)/.test(cookies);
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
      console.error('Napster token error (ACCU Ava):', r.status, detail);
      return json({ error: 'Could not create session' }, r.status === 429 ? 429 : 502);
    }
    const data = await r.json();
    const setCookie = `${VISITOR_COOKIE}=${visitorId}; Path=${COOKIE_PATH}; Max-Age=${VISITOR_MAX_AGE}; Secure; HttpOnly; SameSite=Lax`;
    return json({ token: data.token }, 200, { 'Set-Cookie': setCookie });
  } catch (err) {
    console.error('ACCU Ava token function error:', err);
    return json({ error: 'Internal error' }, 500);
  }
}

// Guidance, not a script — the model paraphrases initialSpeech. The visitor has usually just watched her video
// introduction, so the live greeting is short. Matches the OPENING in her instructions.
const FIRST_VISIT = "Speak first, immediately, before the visitor says anything, in English. Greet them warmly and briefly: " +
  "you're Ava, A-C-C-U's A-I loan agent. Then ask what they are planning - a car, something for their home, college, " +
  "or something else. Under ten seconds, warm and natural.";

const WELCOME_BACK = "Speak first, immediately, before the visitor says anything, in English. This visitor has talked with " +
  "you before. Welcome them back warmly - do not repeat your introduction. If you remember what you talked about last " +
  "time, mention it in a few words and offer to pick up there; otherwise ask what brings them back today. Under ten " +
  "seconds, warm and natural.";

function json(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...extraHeaders },
  });
}
