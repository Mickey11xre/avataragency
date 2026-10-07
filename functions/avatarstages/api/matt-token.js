// Cloudflare Pages Function — mints a short-lived Napster session token for MATT, the AI version of the owner of
// Matt's Valley Plumbing (a fictional demo business), on the private stages page (/avatarstages,
// avatarstages/matt-stage.js → TOKEN_ENDPOINT). Lives under /avatarstages/ so the page's gate
// (functions/avatarstages/_middleware.js) protects it too: only viewers with portfolio access can open a session.
// The gate also hands over the viewer's record (context.data.viewer), which gives Matt their first name.
//
// Built from maya-token.js. Differences: Matt's agent, his own visitor cookies (scoped to /avatarstages), his own
// rate-limit budget, and his own opening.
//
// Required env var: NAPSTER_API_KEY. Optional binding: AISO_KV (per-IP rate limit; the gate needs it anyway).
//
// ✅ Agent 28428453 "Matt - Matt's Valley Plumbing (NV2)", created 2026-10-07 04:45 PT by
//    livebrand-ops/matt-nv2/build-matt-agent.ps1: twin r2 4296254a (V2 at 7.4 h; frame 0 aligned to the take; r1
//    417f2a8e is unused), language "en" from birth, knowledge collection 4cdf7121 (28 files), FAQ collection a8c1ff7f
//    (50), web search off, nearField + turn detection 0.8/500/800, temperature 0.6. Instructions identical to
//    matt-nv2/instructions.md (14,331 chars). His panel tools are DEMO only (matt-stage.js).

const AGENT_ID = '28428453-3cd9-43b6-8537-e5238441e6bc'; // Matt - Matt's Valley Plumbing (NV2); livebrand-ops/matt-nv2/.agent-id
const ALLOWED_ORIGINS = ['https://avataragency.ai', 'https://www.avataragency.ai'];
const PER_IP_PER_HOUR = 8;
const VISITOR_COOKIE = 'aa_matt_vid';
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
    const key = 'rl:matt-nv2-token:' + ip + ':' + new Date().toISOString().slice(0, 13);
    const n = parseInt((await env.AISO_KV.get(key)) || '0', 10);
    if (n >= PER_IP_PER_HOUR) return json({ error: 'Too many sessions' }, 429);
    await env.AISO_KV.put(key, String(n + 1), { expirationTtl: 3700 });
  }

  const cookies = request.headers.get('Cookie') || '';
  const known = cookies.match(new RegExp('(?:^|;\\s*)' + VISITOR_COOKIE + '=([a-f0-9]{32})(?:;|$)'));
  const visitorId = known ? known[1] : crypto.randomUUID().replace(/-/g, '');
  // matt-stage.js sets aa_matt_seen once a live conversation has really started in this browser.
  const seen = /(?:^|;\s*)aa_matt_seen=1(?:;|$)/.test(cookies);
  const returning = Boolean(known && seen);
  const firstName = cleanName((context.data && context.data.viewer && context.data.viewer.name) || '');
  const connection = { channelType: 'webrtc', externalClientId: visitorId, initialSpeech: returning ? welcomeBack(firstName) : firstVisit(firstName) };
  if (firstName) {
    connection.externalClientProfile = { name: firstName, context: "Visitor talking with Matt's Valley Plumbing's AI demo" + (returning ? ', who has talked with Matt before.' : '.') };
  }

  try {
    const r = await fetch(`https://companion-api.napster.com/public/agents/${AGENT_ID}/connections`, {
      method: 'POST',
      headers: { 'X-Api-Key': API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify(connection),
    });
    if (!r.ok) {
      const detail = await r.text();
      console.error('Napster token error (Matt):', r.status, detail);
      return json({ error: 'Could not create session' }, r.status === 429 ? 429 : 502);
    }
    const data = await r.json();
    const setCookie = `${VISITOR_COOKIE}=${visitorId}; Path=${COOKIE_PATH}; Max-Age=${VISITOR_MAX_AGE}; Secure; HttpOnly; SameSite=Lax`;
    return json({ token: data.token }, 200, { 'Set-Cookie': setCookie });
  } catch (err) {
    console.error('Matt token function error:', err);
    return json({ error: 'Internal error' }, 500);
  }
}

// Guidance, not a script — the model paraphrases initialSpeech. The visitor has usually just watched his video
// introduction, so the live greeting is short.
function firstVisit(name) {
  return "Speak first, immediately, before the visitor says anything, in English. Greet them warmly and briefly" +
    (name ? " by their first name, " + name : "") + ": you're Matt from Matt's Valley Plumbing, the AI version. " +
    "Then ask what's going on with their plumbing today. Under ten seconds, friendly and natural.";
}

function welcomeBack(name) {
  return "Speak first, immediately, before the visitor says anything, in English. This visitor has talked with you " +
    "before" + (name ? ", and their first name is " + name : "") + ". Welcome them back warmly" + (name ? " by name" : "") +
    " - do not repeat your introduction. If you remember what you talked about last time, mention it in a few " +
    "words and offer to pick up there; otherwise ask what's going on today. Under ten seconds, friendly and natural.";
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
