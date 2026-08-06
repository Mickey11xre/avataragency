// Cloudflare Pages Function — Avatar Prospecting token resolution.
//
// This is the REAL per-prospect path, not a demo hardcode: a link carries an
// opaque token, this function resolves it server-side, and mints a Napster
// session whose initialSpeech is personalized for that one prospect.
// One page + one agent serve N prospects; scaling = more rows, never more builds.
//
// NO PII EVER APPEARS IN THE URL. The token is random and meaningless on its own.
//
// Storage: KV namespace binding `PROSPECTS` if bound (production path), otherwise
// the SEED map below. Flipping KV on later requires no code change — bind the
// namespace and write rows keyed by token; KV wins whenever it has the key.
//
// Required env:
//   NAPSTER_API_KEY  — Napster Managed API key
// Optional env:
//   PROSPECTS        — KV namespace binding (rows: <token> -> JSON prospect record)
//
// POST { t: "<token>" } -> { token, firstName } | 410 expired/revoked | 404 unknown

// The dedicated prospecting agent: partner-mode brain, prepared answers for the
// scale + CRM questions, temperature 0.6. Created by
// livebrand-ops/twin-michael-prospecting/build-agent.ps1 — paste its AGENT_ID here.
const PROSPECTING_AGENT_ID = ''; // <-- paste here

// Until that exists, fall back to the live site twin so the link is REVIEWABLE.
// initialSpeech and externalClientProfile are per-CONNECTION, so the personalized
// greeting is byte-identical either way; only the agent's knowledge base differs
// (the fallback has the general site brain, not the partner-mode one).
const FALLBACK_AGENT_ID = 'fc21d1f6-aaaf-464b-a835-5ba138df5079'; // Michael Rivera Digital v1.4

const AGENT_ID = PROSPECTING_AGENT_ID || FALLBACK_AGENT_ID;

// --- Seed rows (used until the KV namespace is bound) -----------------------
// context = why we're reaching out, in Michael's own words, about a connection
// the prospect will RECOGNIZE. Never scraped, never surveillance.
const SEED = {
  // Morgan Greenwald — Napster. Warm: real meeting, real questions she asked.
  'mg7k2p9x': {
    firstName: 'Morgan',
    company: 'Napster',
    context:
      "we met on July twenty-first to talk about the Companion API, and you asked how this scales and how the data gets into a business's CRM",
    mode: 'napster', // partner framing, not a sales pitch
  },
  // Self-test row — send yourself the identical email path before the real one.
  'test1234': {
    firstName: 'Michael',
    company: 'AvatarAgency',
    context: 'you built this, and you are testing the exact path a prospect will take',
    mode: 'napster',
  },
};

export async function onRequest(context) {
  const API_KEY = context.env.NAPSTER_API_KEY;
  if (!API_KEY) return json({ error: 'Server misconfigured' }, 500);
  if (context.request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  let t = '';
  try {
    const b = await context.request.json();
    t = String(b.t || '').trim();
  } catch {}
  if (!/^[A-Za-z0-9_-]{4,64}$/.test(t)) return json({ error: 'Invalid link' }, 404);

  const rec = await lookup(context.env, t);
  if (!rec) return json({ error: 'Unknown link' }, 404);
  if (rec.revoked) return json({ error: 'This link has been turned off.' }, 410);
  if (rec.expiresAt && Date.parse(rec.expiresAt) < Date.now()) {
    return json({ error: 'This link has expired.' }, 410);
  }

  const body = {
    channelType: 'webrtc',
    initialSpeech: buildSpeech(rec),
    // Stable per-prospect id -> returning-visitor memory. Same prospect clicking
    // twice is recognized. Must match ^[A-Za-z0-9_-]{1,32}$.
    externalClientId: (await sha256hex('twinlink:' + t)).slice(0, 32),
    externalClientProfile: {
      name: rec.firstName || '',
      company: rec.company || '',
      context: rec.context || '',
    },
  };

  try {
    const r = await fetch(
      `https://companion-api.napster.com/public/agents/${AGENT_ID}/connections`,
      {
        method: 'POST',
        headers: { 'X-Api-Key': API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );
    if (!r.ok) {
      console.error('Napster token error:', r.status, await r.text());
      return json({ error: 'Could not create session' }, 502);
    }
    const data = await r.json();

    // Fire-and-forget open stamp; never let bookkeeping break the greeting.
    context.waitUntil(stampOpen(context.env, t, rec));

    return json({ token: data.token, firstName: rec.firstName || '' });
  } catch (err) {
    console.error('meet-token error:', err);
    return json({ error: 'Internal error' }, 500);
  }
}

// KV first (production), seed second (works with zero dashboard setup).
async function lookup(env, t) {
  if (env.PROSPECTS) {
    try {
      const raw = await env.PROSPECTS.get(t);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.error('KV read failed, falling back to seed:', e);
    }
  }
  return SEED[t] || null;
}

async function stampOpen(env, t, rec) {
  if (!env.PROSPECTS) return; // seed rows are read-only
  try {
    const next = {
      ...rec,
      opened: rec.opened || new Date().toISOString(),
      sessions: (rec.sessions || 0) + 1,
    };
    await env.PROSPECTS.put(t, JSON.stringify(next));
  } catch (e) {
    console.error('open stamp failed:', e);
  }
}

// The greeting IS the product. Guidance, delivered in the twin's own voice.
function buildSpeech(rec) {
  const name = (rec.firstName || '').trim();
  const ctx = (rec.context || '').trim();

  const greet = name
    ? `Greet ${name} warmly and BY NAME — say her or his name in the very first sentence.`
    : 'Greet the visitor warmly. Do NOT use a name and NEVER invent one.';

  const why = ctx
    ? `In one natural sentence, reference why you're glad they came: "${ctx}". Say it conversationally, not as a quotation.`
    : '';

  // Partner framing: Morgan is not a prospect for avatar services. The point is
  // that HER platform did this, and that it is a machine, not a party trick.
  const napster =
    rec.mode === 'napster'
      ? `Then make two points, briefly and confidently: first, that this page was generated for them specifically from one row in a prospect table — not hand-built — and there are others going out the same way. Second, that every one of these conversations runs on the Napster Companion API, so the outreach itself is metered platform usage. Then invite them to ask you anything — especially how it scales, or how the lead data lands in a CRM. Do NOT pitch AvatarAgency's services to them and do NOT try to sell them an avatar; they are a partner, not a customer.`
      : `Then introduce yourself as Michael Rivera's digital twin from AvatarAgency and offer to answer their questions or get a strategy meeting on the calendar.`;

  return [
    'Speak first, immediately, before the visitor says anything.',
    greet,
    why,
    "Say clearly that you are Michael Rivera's digital twin — never imply you are the real Michael.",
    napster,
    'Keep the whole opening under twenty-five seconds. Warm, direct, and confident. Never invent facts, names, numbers, or prices.',
  ]
    .filter(Boolean)
    .join(' ');
}

async function sha256hex(s) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}
