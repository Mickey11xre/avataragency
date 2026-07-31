// Cloudflare Pages Function — Claude Coaching post-intake document uploads.
// Reuses the existing REVIEWS KV binding (same namespace as /api/review) so no
// new infrastructure is needed. Keys are prefixed "docs:" / "docsidx:".
//
// API:
//   GET  /api/intake-docs?c=<slug>                 → { files:[{fn,size,ts}] }  (names only — used
//                                                     by the page + the T-48h chaser task)
//   POST /api/intake-docs?c=<slug>                 → body { files:[{fn,type,data(base64)}] }
//                                                     stores each file, updates the index
//   GET  /api/intake-docs?c=<slug>&get=<ts-fn>&k=<DOCS_KEY>  → file download (Michael only;
//                                                     requires DOCS_KEY env var to be set)
//
// Limits: 8 MB/file (binary), 12 files per client, whitelisted extensions.

const SLUG_RE = /^[a-z0-9-]{1,64}$/;
const EXT_RE = /\.(pdf|docx?|txt|md|csv|xlsx|png|jpe?g)$/i;
const MAX_B64 = 11.5 * 1024 * 1024; // ≈8.6 MB binary
const MAX_FILES = 12;

export async function onRequest(context) {
  const { request, env } = context;
  if (!env.REVIEWS) return json({ error: 'Storage not configured' }, 503);

  const url = new URL(request.url);
  const slug = (url.searchParams.get('c') || '').toLowerCase();
  if (!SLUG_RE.test(slug)) return json({ error: 'Invalid or missing ?c=' }, 400);
  const idxKey = `docsidx:${slug}`;

  if (request.method === 'GET') {
    const get = url.searchParams.get('get');
    if (get) {
      // download path — gated behind DOCS_KEY env var
      if (!env.DOCS_KEY || url.searchParams.get('k') !== env.DOCS_KEY) {
        return json({ error: 'Not authorized' }, 403);
      }
      const meta = await readIdx(env, idxKey);
      const entry = meta.find((f) => f.key === get);
      if (!entry) return json({ error: 'No such file' }, 404);
      const data = await env.REVIEWS.get(`docs:${slug}:${get}`);
      if (!data) return json({ error: 'File data missing' }, 404);
      const bytes = Uint8Array.from(atob(data), (ch) => ch.charCodeAt(0));
      return new Response(bytes, {
        headers: {
          'Content-Type': entry.type || 'application/octet-stream',
          'Content-Disposition': `attachment; filename="${entry.fn.replace(/[^\w. -]/g, '_')}"`,
          'Cache-Control': 'no-store',
        },
      });
    }
    const meta = await readIdx(env, idxKey);
    return json({ files: meta.map(({ fn, size, ts, key }) => ({ fn, size, ts, key })) });
  }

  if (request.method === 'POST') {
    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Invalid JSON' }, 400);
    }
    const files = Array.isArray(body && body.files) ? body.files : [];
    if (!files.length) return json({ error: 'No files' }, 400);

    const meta = await readIdx(env, idxKey);
    if (meta.length + files.length > MAX_FILES) return json({ error: 'Too many files for this client' }, 413);

    const saved = [];
    for (const f of files) {
      const fn = String((f && f.fn) || '').slice(0, 120);
      const data = String((f && f.data) || '');
      if (!EXT_RE.test(fn)) return json({ error: `File type not accepted: ${fn}` }, 415);
      if (!data || data.length > MAX_B64) return json({ error: `File too large: ${fn}` }, 413);
      const ts = Date.now();
      const key = `${ts}-${fn.replace(/[^\w.-]/g, '_')}`;
      await env.REVIEWS.put(`docs:${slug}:${key}`, data);
      const entry = { key, fn, type: String((f && f.type) || '').slice(0, 80), size: Math.round(data.length * 0.75), ts };
      meta.push(entry);
      saved.push(entry.fn);
    }
    await env.REVIEWS.put(idxKey, JSON.stringify(meta));
    return json({ ok: true, saved, total: meta.length });
  }

  return json({ error: 'Method not allowed' }, 405);
}

async function readIdx(env, idxKey) {
  try {
    const raw = await env.REVIEWS.get(idxKey);
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
