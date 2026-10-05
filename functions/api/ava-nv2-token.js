// Cloudflare Pages Function — mints a short-lived Napster session token for Ava NV2, the live talking
// agent on the avataragency.ai homepage ("Talk to Ava", home-next/ava-panel.js → CFG.TOKEN_ENDPOINT).
//
// ✅ WIRED 2026-10-05 (Michael's go) to agent 1b0d0cb1 "Ava - Avatar Agency website (NV2-S) [en TEST]", created
//    English-locked from birth (`language: "en"` at creation). Same Seedance twin 93d5c657, same knowledge base
//    2c1980f2, same instructions and audio settings as before. Why: agent 5d72dc62 (2026-10-01 to 10-05, born WITHOUT a
//    language, `en` PATCHed on 10-02) still answered English questions in Spanish and German. ROLLBACK = put
//    '5d72dc62-ab7d-43b5-b781-0dc91e9a690b' back below; that agent is kept untouched.
//    Which agent id is which: livebrand-ops/AGENT-ROSTER.md.
//
// Required env var (Cloudflare Pages → Settings → Environment variables):
//   NAPSTER_API_KEY — the Napster Managed API key  (a redeploy is needed for a changed env var)
// Optional binding: AISO_KV — enables the per-IP rate limit below.
//
// Napster allows 5 concurrent sessions for the whole account, and every session is metered, so this
// endpoint only answers requests from our own pages and limits how fast one visitor can open sessions.

const AGENT_ID = '1b0d0cb1-231a-48fe-8f31-5cbaa317417d'; // Ava - Avatar Agency website (NV2-S) [en TEST], English from birth
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
  // Returning visitors, "like Lisa on livebrand.ai" (Michael, 2 Oct). ava-panel.js sets aa_ava_seen once a live
  // conversation has really started in this browser, and aa_ava_name when the visitor typed their first name into
  // one of the panel's forms. A returning visitor is welcomed BACK instead of hearing the first-time intro, and a
  // known name goes to Napster as the session profile (the same shape Lisa's token Worker sends).
  const seen = /(?:^|;\s*)aa_ava_seen=1(?:;|$)/.test(cookies);
  const firstName = readFirstName(cookies);
  const returning = Boolean(known && seen);
  const connection = { channelType: 'webrtc', externalClientId: visitorId, initialSpeech: returning ? welcomeBack(firstName) : FIRST_VISIT };
  if (firstName) {
    connection.externalClientProfile = { name: firstName, context: 'Visitor on the Avatar Agency website' + (returning ? ' who has talked with Ava before.' : '.') };
  }

  try {
    const r = await fetch(
      `https://companion-api.napster.com/public/agents/${AGENT_ID}/connections`,
      {
        method: 'POST',
        headers: { 'X-Api-Key': API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify(connection),
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

// Guidance, not a script — the model paraphrases initialSpeech. The brand is two words because the voice says exactly
// what it reads ("AvatarAgency" comes out as one jumbled word). No "I'm not real" (Michael, 2 Oct: too redundant).
const FIRST_VISIT =
  "Speak first, immediately, before the visitor says anything, in English. Open warmly: you're Ava, " +
  "a digital avatar created by Avatar Agency. When someone lands on this website you're the first " +
  "to say hello; you answer questions, explain how everything works, and when they're ready you " +
  "can book a call with the team for them. Then ask what brought them here today. " +
  "Under fifteen seconds, friendly and natural. Do not mention pricing.";

function welcomeBack(name) {
  return "Speak first, immediately, before the visitor says anything, in English. This visitor has talked with you " +
    "before" + (name ? ", and their first name is " + name : "") + ". Welcome them back warmly" + (name ? " by name" : "") +
    " - do not repeat your full introduction. If you remember what you talked about last time, mention it in a few " +
    "words and offer to pick up there; otherwise ask what brings them back today. Under ten seconds, friendly and " +
    "natural. Do not mention pricing.";
}

// Letters only, 30 max: the cookie is written by our own page from the visitor's own form input, and this keeps
// anything else out of the session's opening guidance.
function readFirstName(cookies) {
  const m = cookies.match(/(?:^|;\s*)aa_ava_name=([^;]{1,90})/);
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
