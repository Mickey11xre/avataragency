// Cloudflare Pages Function — mints a short-lived Napster session token for LADY BELLE's NV2 avatar (the photoreal
// Lady Belle of Adele Harrison's "Tales of Lady Belle: Fruit of the Spirit" books) on /work and /avatarstages
// (avatarstages/ladybelle-stage.js → TOKEN_ENDPOINT). Lives under /avatarstages/ so the page's gate
// (functions/avatarstages/_middleware.js) protects it: only viewers with portfolio access can open a session.
//
// Built from paul-token.js. Her own agent, cookies and rate-limit budget, and a CHILD-SAFE opening. The public
// /api/ladybelle-token (the NV1 agent 8ef4a703 on /ladybelle) is untouched.
//
// Required env var: NAPSTER_API_KEY. Optional binding: AISO_KV (per-IP rate limit).
// Agent 4bb4c9da "Lady Belle - Storybook Puppy (NV2 stage)", created 2026-10-09 04:56 PT by
// livebrand-ops/lady-belle/nv2-real/build-ladybelle-agent.ps1 on her NV2 twin 876cbc62: language en at birth, no KB,
// FAQ collection, web search off, nearField + 0.8/500/800, temperature 0.6.

const AGENT_ID = '4bb4c9da-2959-4c0c-9949-aee16f379c93'; // livebrand-ops/lady-belle/nv2-real/.agent-id
const ALLOWED_ORIGINS = ['https://avataragency.ai', 'https://www.avataragency.ai'];
const PER_IP_PER_HOUR = 8;
const VISITOR_COOKIE = 'aa_belle_vid';
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
    const key = 'rl:ladybelle-nv2-token:' + ip + ':' + new Date().toISOString().slice(0, 13);
    const n = parseInt((await env.AISO_KV.get(key)) || '0', 10);
    if (n >= PER_IP_PER_HOUR) return json({ error: 'Too many sessions' }, 429);
    await env.AISO_KV.put(key, String(n + 1), { expirationTtl: 3700 });
  }

  const cookies = request.headers.get('Cookie') || '';
  const known = cookies.match(new RegExp('(?:^|;\\s*)' + VISITOR_COOKIE + '=([a-f0-9]{32})(?:;|$)'));
  const visitorId = known ? known[1] : crypto.randomUUID().replace(/-/g, '');
  // ladybelle-stage.js sets aa_belle_seen once a live conversation has really started in this browser.
  const seen = /(?:^|;\s*)aa_belle_seen=1(?:;|$)/.test(cookies);
  const returning = Boolean(known && seen);
  const firstName = cleanName((context.data && context.data.viewer && context.data.viewer.name) || '');
  const connection = { channelType: 'webrtc', externalClientId: visitorId, initialSpeech: returning ? welcomeBack(firstName) : firstVisit(firstName) };
  if (firstName) {
    connection.externalClientProfile = { name: firstName, context: 'Visitor talking with Lady Belle, a storybook puppy character' + (returning ? ', who has talked with her before.' : '.') };
  }

  try {
    const r = await fetch(`https://companion-api.napster.com/public/agents/${AGENT_ID}/connections`, {
      method: 'POST',
      headers: { 'X-Api-Key': API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify(connection),
    });
    if (!r.ok) {
      const detail = await r.text();
      console.error('Napster token error (Lady Belle):', r.status, detail);
      return json({ error: 'Could not create session' }, r.status === 429 ? 429 : 502);
    }
    const data = await r.json();
    const setCookie = `${VISITOR_COOKIE}=${visitorId}; Path=${COOKIE_PATH}; Max-Age=${VISITOR_MAX_AGE}; Secure; HttpOnly; SameSite=Lax`;
    return json({ token: data.token }, 200, { 'Set-Cookie': setCookie });
  } catch (err) {
    console.error('Lady Belle token function error:', err);
    return json({ error: 'Internal error' }, 500);
  }
}

// Guidance, not a script — the model paraphrases initialSpeech. Visitors have usually just watched her video
// introduction, so the live greeting is short. Child-safe: no questions about the visitor beyond what they enjoy.
function firstVisit(name) {
  return "Speak first, immediately, before the visitor says anything, in English. Greet them warmly and briefly" +
    (name ? " by their first name, " + name : "") + ", as Lady Belle the little Snoodle puppy, happy they came to talk " +
    "with you, then ask what their favorite thing to do is. Under ten seconds, gentle, cheerful and child-safe.";
}

function welcomeBack(name) {
  return "Speak first, immediately, before the visitor says anything, in English. This friend has talked with you " +
    "before" + (name ? ", and their first name is " + name : "") + ". Welcome them back warmly" + (name ? " by name" : "") +
    " - do not repeat your introduction. If you remember what you talked about last time, mention it in a few words; " +
    "otherwise ask what they would like to talk about today. Under ten seconds, gentle, cheerful and child-safe.";
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
