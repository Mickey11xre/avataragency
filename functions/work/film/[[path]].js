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
  for (const h of ["Content-Type", "Content-Length", "Content-Range", "Accept-Ranges", "ETag", "Last-Modified"]) {
    const v = res.headers.get(h); if (v) out.set(h, v);
  }
  if (!out.has("Accept-Ranges")) out.set("Accept-Ranges", "bytes");
  return new Response(res.body, { status: res.status, headers: out });
}

export const onRequestGet = serve;
export const onRequestHead = serve;
