// Cloudflare Pages Function — PUBLIC token endpoint for the STAFF on Harrison's stage (Harvard Investment Group preview,
// /clients/harvard/, Michael 2026-11-08: "click on any of the agents… talk with each one of them, and they replace
// Harrison in the avatar area"). Built from hig-harrison-token.js: origin-checked, rate-limited per IP, same visitor
// cookie (aa_hig_vid, Path=/api) so a returning visitor is the same person to every staff member.
//
// POST { slot: "office" | "research" | "properties" }  →  { token }
// One conversation at a time: the stage ends Harrison's (or another staff member's) session before it asks for this.
//
// Required env var: NAPSTER_API_KEY. Optional binding: AISO_KV (per-IP rate limit).
//
// AGENTS: one agent per staff slot, created by C:\Dev\livebrand-ops\hig-staff\build-hig-staff.ps1 (-Mode create writes
// .agent-id-<slot>). While a slot is blank this endpoint answers 503 {error:"not live"} for it and the stage shows the
// "arriving soon" toast; nothing metered starts. The staff's NAMES are not here: the page reads them from the roster
// (functions/_lib/hig-staff.js), and each agent's instructions carry its own name.

const AGENTS = {
  office: '9495aae6-6138-4e6c-a525-315831d4ba2d',       // Sterling  — livebrand-ops/hig-staff/.agent-id-office (created 11-08)
  research: '34d10ece-9d09-414d-a71e-41a51b094ecb',     // Whitmore  — livebrand-ops/hig-staff/.agent-id-research
  properties: '9720460a-4792-44e0-b659-47a588d3e9de',   // Hale      — livebrand-ops/hig-staff/.agent-id-properties
};
const ALLOWED_ORIGINS = ['https://avataragency.ai', 'https://www.avataragency.ai'];
const PER_IP_PER_HOUR = 12;   // three staff members; Harrison keeps his own counter (8)
const VISITOR_COOKIE = 'aa_hig_vid';
const VISITOR_MAX_AGE = 60 * 60 * 24 * 365;
const COOKIE_PATH = '/api';

// Guidance, not a script — the model paraphrases initialSpeech. Each agent's instructions carry its name and role.
const GREETING = 'Speak first, immediately, before the visitor says anything, in English. Introduce yourself in one ' +
  'sentence with your name and what you cover on the team, then ask what they would like to go through with you. ' +
  'Under eight seconds, warm and natural.';

export async function onRequest(context) {
  const { request, env } = context;
  if (request.method !== 'POST') return json({ error: 'POST only' }, 405);
  if (!ALLOWED_ORIGINS.includes(request.headers.get('Origin') || '')) return json({ error: 'Forbidden' }, 403);

  let slot = '';
  try { slot = String((await request.json()).slot || ''); } catch {}
  if (!Object.prototype.hasOwnProperty.call(AGENTS, slot)) return json({ error: 'Unknown staff member' }, 400);
  const agentId = AGENTS[slot];
  if (!agentId) return json({ error: 'not live' }, 503);

  const API_KEY = env.NAPSTER_API_KEY;
  if (!API_KEY) return json({ error: 'Server misconfigured' }, 500);

  if (env.AISO_KV) {
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const key = 'rl:hig-staff-public:' + ip + ':' + new Date().toISOString().slice(0, 13);
    const n = parseInt((await env.AISO_KV.get(key)) || '0', 10);
    if (n >= PER_IP_PER_HOUR) return json({ error: 'Too many sessions' }, 429);
    await env.AISO_KV.put(key, String(n + 1), { expirationTtl: 3700 });
  }

  const cookies = request.headers.get('Cookie') || '';
  const known = cookies.match(new RegExp('(?:^|;\\s*)' + VISITOR_COOKIE + '=([a-f0-9]{32})(?:;|$)'));
  const visitorId = known ? known[1] : crypto.randomUUID().replace(/-/g, '');

  try {
    const r = await fetch(`https://companion-api.napster.com/public/agents/${agentId}/connections`, {
      method: 'POST',
      headers: { 'X-Api-Key': API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ channelType: 'webrtc', externalClientId: visitorId, initialSpeech: GREETING }),
    });
    if (!r.ok) {
      console.error('Token error (HIG staff ' + slot + '):', r.status, await r.text());
      return json({ error: 'Could not create session' }, r.status === 429 ? 429 : 502);
    }
    const data = await r.json();
    const setCookie = `${VISITOR_COOKIE}=${visitorId}; Path=${COOKIE_PATH}; Max-Age=${VISITOR_MAX_AGE}; Secure; HttpOnly; SameSite=Lax`;
    return json({ token: data.token }, 200, { 'Set-Cookie': setCookie });
  } catch (err) {
    console.error('HIG staff token function error:', err);
    return json({ error: 'Internal error' }, 500);
  }
}

function json(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...extraHeaders } });
}
