/**
 * GET /clients/dental-arts/film/<slug>.mp4 — the practice film for Maya's panel on Dr. Nawrocki's landing page
 * (/clients/dental-arts/maya/, data-film on the stage). The film already lives in her client portal; this route
 * fetches it server-side so the portal URL (/clients/anawrocki/, which carries billing paperwork) never reaches a
 * visitor's browser. PUBLIC (the landing page has no gate). Same byte-range handling as functions/work/film/[[path]].js,
 * copied so the gated portfolio route stays untouched. Added 2026-10-09.
 */
const FILMS = {
  "practice.mp4": "/clients/anawrocki/service-video-02.mp4",   // "Dental Arts San Diego Video", 1:13 (9-3-26 final)
};

async function serve(context) {
  const parts = context.params.path || [];
  const slug = Array.isArray(parts) ? parts.join("/") : String(parts);
  const src = FILMS[slug];
  if (!src || !context.env.ASSETS) return new Response("Not found", { status: 404 });

  const headers = new Headers();
  const range = context.request.headers.get("Range");
  if (range) headers.set("Range", range);
  const res = await context.env.ASSETS.fetch(new Request(new URL(src, context.request.url), { method: context.request.method, headers }));

  // The static server answers a missing path with an HTML page; never pass that off as a film.
  const type = res.headers.get("Content-Type") || "";
  if (!res.ok || !type.startsWith("video/")) return new Response("Not found", { status: 404 });

  const out = new Headers();
  for (const h of ["Content-Type", "Content-Length", "Content-Range", "ETag", "Last-Modified"]) {
    const v = res.headers.get(h); if (v) out.set(h, v);
  }
  out.set("Accept-Ranges", "bytes");
  if (!range || res.status === 206) return new Response(res.body, { status: res.status, headers: out });

  // The asset store ignored the Range header (it does locally): slice the bytes here. iOS Safari will not
  // play a <video> unless byte ranges come back as 206 Partial Content.
  let size = parseInt(res.headers.get("Content-Length") || "", 10), body = res.body;
  if (!Number.isFinite(size)) { const buf = await res.arrayBuffer(); size = buf.byteLength; body = new Response(buf).body; }
  const m = /^bytes=(\d*)-(\d*)$/.exec(range.trim());
  let start, end;
  if (m && m[1] !== "") { start = +m[1]; end = m[2] !== "" ? Math.min(+m[2], size - 1) : size - 1; }
  else if (m && m[2] !== "") { start = Math.max(0, size - +m[2]); end = size - 1; }
  if (!m || start === undefined || start > end || start >= size) {
    if (body) body.cancel();
    return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${size}` } });
  }
  const len = end - start + 1;
  out.set("Content-Range", `bytes ${start}-${end}/${size}`);
  out.set("Content-Length", String(len));
  if (context.request.method === "HEAD" || !body) return new Response(null, { status: 206, headers: out });
  return new Response(body.pipeThrough(sliceBytes(start, len)), { status: 206, headers: out });
}

// Passes through only bytes [start, start + len) of a byte stream.
function sliceBytes(start, len) {
  let pos = 0, sent = 0;
  return new TransformStream({
    transform(chunk, ctl) {
      const from = pos; pos += chunk.byteLength;
      if (pos <= start || sent >= len) return;
      const a = Math.max(0, start - from), b = Math.min(chunk.byteLength, a + (len - sent));
      ctl.enqueue(chunk.subarray(a, b)); sent += b - a;
      if (sent >= len) ctl.terminate();
    },
  });
}

export const onRequestGet = serve;
export const onRequestHead = serve;
