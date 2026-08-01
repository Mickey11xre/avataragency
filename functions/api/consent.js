// Cloudflare Pages Function — Claude Coaching client acknowledgment records.
//
// Purpose: evidence, not decoration. A disclaimer that is merely displayed is weak;
// a timestamped record of who agreed, to which version of the text, from which IP,
// is what actually holds up. Reuses the existing REVIEWS KV binding (keys "consent:*").
//
// API:
//   POST /api/consent            → body { name, email, items:[ids], version, page }
//                                  stores a record; returns { ok, id }
//   GET  /api/consent?k=<DOCS_KEY>            → { records:[...] }  (Michael only)
//   GET  /api/consent?k=<DOCS_KEY>&e=<email>  → records for one client
//
// Records are append-only. Nothing here is ever exposed without DOCS_KEY.

const MAX_LEN = 200;
const IDX = 'consentidx';
const MAX_IDX = 2000;

export async function onRequest(context) {
  const { request, env } = context;
  if (!env.REVIEWS) return json({ error: 'Storage not configured' }, 503);
  const url = new URL(request.url);

  if (request.method === 'GET') {
    if (!env.DOCS_KEY || url.searchParams.get('k') !== env.DOCS_KEY) {
      return json({ error: 'Not authorized' }, 403);
    }
    const idx = await readIdx(env);
    const email = (url.searchParams.get('e') || '').toLowerCase().trim();
    const records = email ? idx.filter((r) => r.email === email) : idx;
    return json({ count: records.length, records });
  }

  if (request.method === 'POST') {
    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Invalid JSON' }, 400);
    }

    const name = clean(body && body.name);
    const email = clean(body && body.email).toLowerCase();
    const items = Array.isArray(body && body.items) ? body.items.map(clean).slice(0, 20) : [];
    const version = clean(body && body.version) || 'unknown';

    if (name.length < 2) return json({ error: 'Please type your full name.' }, 400);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json({ error: 'Please enter a valid email.' }, 400);
    if (items.length < 5) return json({ error: 'All acknowledgments must be checked.' }, 400);

    const ts = Date.now();
    const id = `${ts}-${Math.random().toString(36).slice(2, 10)}`;
    const record = {
      id,
      ts,
      iso: new Date(ts).toISOString(),
      name,
      email,
      items,
      version,
      page: clean(body && body.page) || url.pathname,
      ip: request.headers.get('CF-Connecting-IP') || '',
      country: (request.cf && request.cf.country) || '',
      ua: (request.headers.get('User-Agent') || '').slice(0, 300),
    };

    await env.REVIEWS.put(`consent:${id}`, JSON.stringify(record));

    const idx = await readIdx(env);
    idx.push({ id, ts, iso: record.iso, name, email, version });
    if (idx.length > MAX_IDX) idx.splice(0, idx.length - MAX_IDX);
    await env.REVIEWS.put(IDX, JSON.stringify(idx));

    return json({ ok: true, id, iso: record.iso });
  }

  return json({ error: 'Method not allowed' }, 405);
}

function clean(v) {
  return String(v == null ? '' : v).trim().slice(0, MAX_LEN);
}

async function readIdx(env) {
  try {
    const raw = await env.REVIEWS.get(IDX);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}
