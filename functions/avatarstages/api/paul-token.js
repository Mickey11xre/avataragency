// Cloudflare Pages Function — mints a short-lived Napster session token for PAUL SMALL's digital twin (Paul Small,
// a Compass real estate advisor in West Los Angeles, an AvatarAgency client) on the private stages page
// (/avatarstages, avatarstages/paul-stage.js → TOKEN_ENDPOINT). Lives under /avatarstages/ so the page's gate
// (functions/avatarstages/_middleware.js) protects it too: only viewers with portfolio access can open a session.
// The gate also hands over the viewer's record (context.data.viewer), which gives Paul their first name.
//
// Built from matt-token.js. Differences: Paul's stage agent, his own visitor cookies (scoped to /avatarstages), his own
// rate-limit budget, and his own opening. NOT the case-study agent 7c7c46f9 (/casestudy keeps its own).
//
// Required env var: NAPSTER_API_KEY. Optional binding: AISO_KV (per-IP rate limit; the gate needs it anyway).
//
// ✅ Agent 49597fcb "Paul Small - Compass (NV2 stage)", created 2026-10-07 16:42 PT (FAQ collection d249d0bd, 35 items).
// Stage agent: created by livebrand-ops/paul-small/stage-agent/build-paul-agent.ps1 on his NV2 twin
//    6a0f69cd-4ce3-493a-8d0c-8d305db26faa (created 2026-10-07 04:50 PT from the approved R6 intro), language "en" from
//    birth, FAQ collection, web search off, nearField + turn detection 0.8/500/800. His panel tools are DEMO only.

const AGENT_ID = '49597fcb-2ad8-450b-bd00-52b60a34f42d'; // livebrand-ops/paul-small/stage-agent/.agent-id
const ALLOWED_ORIGINS = ['https://avataragency.ai', 'https://www.avataragency.ai'];
const PER_IP_PER_HOUR = 8;
const VISITOR_COOKIE = 'aa_paul_vid';
const VISITOR_MAX_AGE = 60 * 60 * 24 * 365;
const COOKIE_PATH = '/avatarstages';

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
    const key = 'rl:paul-nv2-token:' + ip + ':' + new Date().toISOString().slice(0, 13);
    const n = parseInt((await env.AISO_KV.get(key)) || '0', 10);
    if (n >= PER_IP_PER_HOUR) return json({ error: 'Too many sessions' }, 429);
    await env.AISO_KV.put(key, String(n + 1), { expirationTtl: 3700 });
  }

  const cookies = request.headers.get('Cookie') || '';
  const known = cookies.match(new RegExp('(?:^|;\\s*)' + VISITOR_COOKIE + '=([a-f0-9]{32})(?:;|$)'));
  const visitorId = known ? known[1] : crypto.randomUUID().replace(/-/g, '');
  // paul-stage.js sets aa_paul_seen once a live conversation has really started in this browser.
  const seen = /(?:^|;\s*)aa_paul_seen=1(?:;|$)/.test(cookies);
  const returning = Boolean(known && seen);
  const firstName = cleanName((context.data && context.data.viewer && context.data.viewer.name) || '');
  const connection = { channelType: 'webrtc', externalClientId: visitorId, initialSpeech: returning ? welcomeBack(firstName) : firstVisit(firstName) };
  if (firstName) {
    connection.externalClientProfile = { name: firstName, context: "Visitor talking with Paul Small's digital twin (Compass, West Los Angeles)" + (returning ? ", who has talked with Paul's twin before." : '.') };
  }

  try {
    const r = await fetch(`https://companion-api.napster.com/public/agents/${AGENT_ID}/connections`, {
      method: 'POST',
      headers: { 'X-Api-Key': API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify(connection),
    });
    if (!r.ok) {
      const detail = await r.text();
      console.error('Napster token error (Paul):', r.status, detail);
      return json({ error: 'Could not create session' }, r.status === 429 ? 429 : 502);
    }
    const data = await r.json();
    const setCookie = `${VISITOR_COOKIE}=${visitorId}; Path=${COOKIE_PATH}; Max-Age=${VISITOR_MAX_AGE}; Secure; HttpOnly; SameSite=Lax`;
    return json({ token: data.token }, 200, { 'Set-Cookie': setCookie });
  } catch (err) {
    console.error('Paul token function error:', err);
    return json({ error: 'Internal error' }, 500);
  }
}

// Guidance, not a script — the model paraphrases initialSpeech. The visitor has usually just watched his video
// introduction, so the live greeting is short.
// Guidance, not a script — the model paraphrases initialSpeech. The visitor has usually just watched his video
// introduction, so the live greeting is short.
function firstVisit(name) {
  return "Speak first, immediately, before the visitor says anything, in English. Greet them warmly and briefly" +
    (name ? " by their first name, " + name : "") + ": you're Paul Small's digital twin - Paul is a real estate advisor " +
    "with Compass in West Los Angeles. Then ask what brings them here today. Under ten seconds, warm and unhurried.";
}

function welcomeBack(name) {
  return "Speak first, immediately, before the visitor says anything, in English. This visitor has talked with you " +
    "before" + (name ? ", and their first name is " + name : "") + ". Welcome them back warmly" + (name ? " by name" : "") +
    " - do not repeat your introduction. If you remember what you talked about last time, mention it in a few " +
    "words and offer to pick up there; otherwise ask what brings them back today. Under ten seconds, warm and unhurried.";
}

// Letters only, 30 max, first word only: the name comes from the visitor's own portfolio request.
function cleanName(v) {
  return String(v).trim().split(/\s+/)[0].replace(/[^A-Za-zÀ-ÖØ-öø-ÿ'-]/g, '').slice(0, 30);
}

function json(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...extraHeaders },
  });
}
