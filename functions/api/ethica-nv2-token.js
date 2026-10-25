// Cloudflare Pages Function — PUBLIC token endpoint for ETHICA NV2, the fraud-fighting hero on the redesigned landing
// page /ethica/thrive/new/ (preview; Michael, 2026-10-23). Built from accu-ava-token.js.
// Anyone with the page link can talk to her, so it is ORIGIN-CHECKED and RATE-LIMITED per IP, with its own budget.
// The page's own free-minutes gate (anonymous 15 min once, registered 15 min/day for 7 days, then subscribe; Michael
// 10-24, was 5) runs in ethica/thrive/new/ethica-stage.js.
//
// Required env var: NAPSTER_API_KEY. Optional binding: AISO_KV (per-IP rate limit).
//
// Agent created 2026-10-24 09:00 by livebrand-ops/ethica-nv2/build-ethica-agent.ps1 -Mode agent, on twin e6777190 (v2,
// persona fixed). Her 11 page tools must match ethica-stage.js `TOOLS`. Empty AGENT_ID = 503 ("arriving very soon").

const AGENT_ID = 'c7578eeb-5d6c-4211-9e27-6e44889650d8'; // NV2 Ethica (livebrand-ops/ethica-nv2/.agent-id)
const ALLOWED_ORIGINS = ['https://avataragency.ai', 'https://www.avataragency.ai'];
const PER_IP_PER_HOUR = 8;
const VISITOR_COOKIE = 'aa_ethica_vid';
const VISITOR_MAX_AGE = 60 * 60 * 24 * 365;
const COOKIE_PATH = '/api';   // the visitor cookies must reach this endpoint

export async function onRequest(context) {
  const { request, env } = context;
  if (request.method !== 'POST') return json({ error: 'POST only' }, 405);

  const origin = request.headers.get('Origin') || '';
  if (!ALLOWED_ORIGINS.includes(origin)) return json({ error: 'Forbidden' }, 403);

  if (!AGENT_ID) return json({ error: 'Ethica NV2 is not configured yet' }, 503);

  const API_KEY = env.NAPSTER_API_KEY;
  if (!API_KEY) return json({ error: 'Server misconfigured' }, 500);

  if (env.AISO_KV) {
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const key = 'rl:ethica-nv2-public:' + ip + ':' + new Date().toISOString().slice(0, 13);
    const n = parseInt((await env.AISO_KV.get(key)) || '0', 10);
    if (n >= PER_IP_PER_HOUR) return json({ error: 'Too many sessions' }, 429);
    await env.AISO_KV.put(key, String(n + 1), { expirationTtl: 3700 });
  }

  const cookies = request.headers.get('Cookie') || '';
  const known = cookies.match(new RegExp('(?:^|;\\s*)' + VISITOR_COOKIE + '=([a-f0-9]{32})(?:;|$)'));
  const visitorId = known ? known[1] : crypto.randomUUID().replace(/-/g, '');
  // ethica-stage.js sets aa_ethica_seen once a live conversation has really started in this browser.
  const seen = /(?:^|;\s*)aa_ethica_seen=1(?:;|$)/.test(cookies);
  const returning = Boolean(known && seen);
  // aa_ethica_name = the first name the visitor typed into the panel's booking or contact form (fleet #2, like Ava).
  const firstName = readFirstName(cookies);
  const connection = { channelType: 'webrtc', externalClientId: visitorId, initialSpeech: returning ? welcomeBack(firstName) : FIRST_VISIT };
  if (firstName) {
    connection.externalClientProfile = { name: firstName, context: 'Visitor on the Ethica page at Avatar Agency' + (returning ? ', who has talked with Ethica before.' : '.') };
  }

  try {
    const r = await fetch(`https://companion-api.napster.com/public/agents/${AGENT_ID}/connections`, {
      method: 'POST',
      headers: { 'X-Api-Key': API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify(connection),
    });
    if (!r.ok) {
      const detail = await r.text();
      console.error('Napster token error (Ethica NV2):', r.status, detail);
      return json({ error: 'Could not create session' }, r.status === 429 ? 429 : 502);
    }
    const data = await r.json();
    const setCookie = `${VISITOR_COOKIE}=${visitorId}; Path=${COOKIE_PATH}; Max-Age=${VISITOR_MAX_AGE}; Secure; HttpOnly; SameSite=Lax`;
    return json({ token: data.token }, 200, { 'Set-Cookie': setCookie });
  } catch (err) {
    console.error('Ethica NV2 token function error:', err);
    return json({ error: 'Internal error' }, 500);
  }
}

// Guidance, not a script — the model paraphrases initialSpeech. Matches the OPENING in her instructions.
const FIRST_VISIT = "Speak first, immediately, before the visitor says anything, in English. Greet them warmly and " +
  "briefly: you're Ethica, the hero who fights fraud in accounting. Then ask what brings them here - protecting their " +
  "money, a scheme they're worried about, or a document they'd like her to check. Under ten seconds, confident and warm.";

function welcomeBack(name) {
  return "Speak first, immediately, before the visitor says anything, in English. This visitor has talked with you " +
    "before" + (name ? ", and their first name is " + name : "") + ". Welcome them back warmly" + (name ? " by name" : "") +
    " - do not repeat your introduction. If you remember what you talked about last time, mention it in a few words and " +
    "offer to pick up there; otherwise ask what brings them back today. Under ten seconds, confident and warm.";
}

// Letters only, 30 max: the cookie is written by our own page from the visitor's own form input, and this keeps
// anything else out of the session's opening guidance. (Same as ava-nv2-token.js.)
function readFirstName(cookies) {
  const m = cookies.match(/(?:^|;\s*)aa_ethica_name=([^;]{1,90})/);
  if (!m) return '';
  let v = '';
  try { v = decodeURIComponent(m[1]); } catch { return ''; }
  return v.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ'-]/g, '').slice(0, 30);
}

function json(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...extraHeaders },
  });
}
