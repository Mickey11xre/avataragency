// Cloudflare Pages Function — shared review state for client storyboards.
// Stores each storyboard's approvals + comments server-side so BOTH the client
// and Michael see the same state from any device/browser.
//
// Required binding (Cloudflare Pages → Settings → Functions → KV namespace bindings):
//   REVIEWS  →  a Workers KV namespace (create one named e.g. "client-reviews")
//
// API:
//   GET  /api/review?doc=psmall-hermosa   → { state } (or {} if none yet)
//   POST /api/review?doc=psmall-hermosa   → body: { name, items:{ "01":{approved,comment}, ... } }
//                                            saves + stamps updatedAt; last write wins.

const DOC_RE = /^[a-z0-9-]{1,64}$/;
const MAX_BODY = 64 * 1024; // 64 KB is plenty for approvals + notes

export async function onRequest(context) {
  const { request, env } = context;

  if (!env.REVIEWS) {
    return json(
      { error: 'Review storage not configured', hint: 'Bind a KV namespace as REVIEWS in Pages → Settings → Functions' },
      503
    );
  }

  const url = new URL(request.url);
  const doc = (url.searchParams.get('doc') || '').toLowerCase();
  if (!DOC_RE.test(doc)) {
    return json({ error: 'Invalid or missing ?doc=' }, 400);
  }
  const key = `review:${doc}`;

  if (request.method === 'GET') {
    const stored = await env.REVIEWS.get(key);
    return json(stored ? JSON.parse(stored) : {});
  }

  if (request.method === 'POST') {
    let body;
    try {
      const text = await request.text();
      if (text.length > MAX_BODY) return json({ error: 'Payload too large' }, 413);
      body = JSON.parse(text);
    } catch {
      return json({ error: 'Invalid JSON' }, 400);
    }
    if (typeof body !== 'object' || body === null || Array.isArray(body)) {
      return json({ error: 'Body must be an object' }, 400);
    }
    const state = {
      name: typeof body.name === 'string' ? body.name.slice(0, 120) : '',
      items: typeof body.items === 'object' && body.items !== null ? body.items : {},
      updatedAt: new Date().toISOString(),
    };
    await env.REVIEWS.put(key, JSON.stringify(state));
    return json({ ok: true, updatedAt: state.updatedAt });
  }

  return json({ error: 'Method not allowed' }, 405);
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
}
