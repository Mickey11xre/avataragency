/**
 * GET /work/film/<slug>.mp4 — plays a client film that already lives on Cloudflare Pages (a client portal
 * or a client site) inside the private portfolio WITHOUT revealing where it lives. Client portal URLs
 * (/clients/<name>/) carry billing notes and must never reach a prospect's browser, so the portfolio
 * only ever links /work/film/<slug>.mp4 and this function fetches the real file server-side.
 * Runs behind functions/work/_middleware.js, so only confirmed leads reach it. Byte ranges pass
 * through (iOS Safari and seeking need them).
 */
const FILMS = {
  "paul-hermosa.mp4": "/clients/psmall/hermosa-beach-video-v4.mp4",
  "danny-recruiting.mp4": "/clients/dgomes/brand-video-10.mp4",
  "danny-probate.mp4": "/clients/dgomes/brand-video-05.mp4",
  "danny-brand.mp4": "/clients/dgomes/brand-video-06.mp4",
  "danny-vertical-1.mp4": "/clients/dgomes/vertical-01.mp4",
  "danny-vertical-2.mp4": "/clients/dgomes/vertical-02.mp4",
  "alena-practice.mp4": "/clients/anawrocki/service-video-02.mp4",
  "alena-short-toothache.mp4": "/clients/anawrocki/short-toothache.mp4",
  "alena-short-tooth-infection.mp4": "/clients/anawrocki/short-tooth-infection.mp4",
  "alena-short-el-cajon-emergency.mp4": "/clients/anawrocki/short-el-cajon-emergency.mp4",
  "alena-short-invisalign.mp4": "/clients/anawrocki/invisalign-horizontal.mp4",
  "alena-short-too-old-implants.mp4": "/clients/anawrocki/short-too-old-implants.mp4",
  "alena-short-need-dentures.mp4": "/clients/anawrocki/short-need-dentures.mp4",
  "alena-short-scared.mp4": "/clients/anawrocki/scared-horizontal.mp4",
  "alena-short-busy-people.mp4": "/clients/anawrocki/short-busy-people.mp4",
  "alena-short-four-generations.mp4": "/clients/anawrocki/short-four-generations.mp4",
  "alena-vertical-1.mp4": "/clients/anawrocki/vertical-01-v4.mp4",
  "alena-vertical-2.mp4": "/clients/anawrocki/vertical-02-v3.mp4",
  "laurie-hero.mp4": "/thrivingincollege/assets/hero.mp4",
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
