/**
 * GET /work/media/<key>  — streams a private portfolio file from R2 (binding PORTFOLIO_R2).
 * Runs behind functions/work/_middleware.js, so only confirmed leads reach it.
 * Supports byte ranges so <video> can seek and iOS Safari will play.
 */
const TYPES = { mp4: "video/mp4", jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp", json: "application/json" };

export async function onRequestGet(context) {
  const bucket = context.env.PORTFOLIO_R2;
  if (!bucket) return new Response("Portfolio storage is not configured yet.", { status: 503 });
  const parts = context.params.path || [];
  const key = (Array.isArray(parts) ? parts.join("/") : String(parts)).replace(/^\/+/, "");
  if (!key || key.includes("..")) return new Response("Not found", { status: 404 });

  const range = context.request.headers.get("Range");
  let r;
  if (range) {
    const m = range.match(/bytes=(\d*)-(\d*)/);
    if (m) {
      const start = m[1] ? +m[1] : undefined, end = m[2] ? +m[2] : undefined;
      r = start !== undefined ? { offset: start, length: end !== undefined ? end - start + 1 : undefined } : { suffix: end };
    }
  }
  const obj = await bucket.get(key, r ? { range: r } : undefined);
  if (!obj) return new Response("Not found", { status: 404 });

  const ext = key.split(".").pop().toLowerCase();
  const headers = new Headers({ "Content-Type": TYPES[ext] || "application/octet-stream", "Accept-Ranges": "bytes", "Cache-Control": "private, max-age=3600", ETag: obj.httpEtag });
  if (r && obj.range) {
    const off = obj.range.offset ?? (obj.size - obj.range.length), len = obj.range.length ?? (obj.size - off);
    headers.set("Content-Range", `bytes ${off}-${off + len - 1}/${obj.size}`);
    headers.set("Content-Length", String(len));
    return new Response(obj.body, { status: 206, headers });
  }
  headers.set("Content-Length", String(obj.size));
  return new Response(obj.body, { status: 200, headers });
}
