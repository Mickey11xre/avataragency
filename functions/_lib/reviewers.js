/**
 * Review-mode access codes for client site previews (the "comment layer").
 *   https://avataragency.ai/clients/harvard/?review=<code>
 * The page's review script stores the code in the browser and sends it with every /api/review-pins call.
 *
 * Only the SHA-256 of each code lives here, because this repo is public; the codes themselves are in
 * docs/WEBSITE-UPDATE-NOTES.md (local only). New reviewer: 16 random bytes as hex, add the SHA-256 below.
 * Revoke: off: true, deploy. role "owner" (Michael) sees and resolves everything on every site ("*").
 */
export const SITES = {
  hig: { name: "Harvard Investment Group website", base: "/clients/harvard" },
};

export const REVIEWERS = {
  // 2026-11-04: Greg Cullen, client reviewer on the Harvard Investment Group preview
  "6f364d9fec5dd1d6e5fb7cc92dd2fe833a17569b1a130d01e1cd369b04e6bcbd": { site: "hig", role: "client", name: "Greg" },
  // 2026-11-04: Michael, owner on every site
  "11971f220a08fcd315c6fb9b95fdcb886366c477a4a3b4b60a80543eb116a465": { site: "*", role: "owner", name: "Michael" },
};

async function sha256Hex(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** The reviewer for a code on a site, or null (unknown, revoked, wrong site, malformed). */
export async function findReviewer(code, site) {
  if (!/^[a-f0-9]{32}$/i.test(code || "") || !SITES[site]) return null;
  const r = REVIEWERS[await sha256Hex(code.toLowerCase())];
  if (!r || r.off) return null;
  if (r.site !== "*" && r.site !== site) return null;
  return { role: r.role, name: r.name };
}
