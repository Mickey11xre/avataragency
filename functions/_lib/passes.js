/**
 * Pass links: direct access to the private pages for a prospect Michael invites personally, with no email form.
 *   https://avataragency.ai/avatarstages/?pass=<code>
 * The gate checks the code, issues the same aa_pf cookie the portfolio email link does (so /work/ opens too),
 * emails Michael that the pass was used, and redirects to the clean URL.
 *
 * Only the SHA-256 of each code is stored here, because this repo is public. The codes themselves are recorded
 * in docs/WEBSITE-UPDATE-NOTES.md, which stays local.
 *  - New pass: generate 16 random bytes as hex, add its SHA-256 below with a label (and a first name if the
 *    pass is for one person, so the page and Maya greet them), then deploy.
 *  - Revoke: set off: true and deploy. The link stops working, and every browser that came in through it
 *    loses access too (the access record carries the label).
 */
export const PASSES = {
  // 2026-10-06: general VIP link for very important prospects (Michael)
  "04d7c98de91b0815a515dc170695a89198b47b14876986762d3c0994fde83f26": { label: "vip", name: "" },
};

async function sha256Hex(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** The pass for a code from a URL, or null (unknown, revoked or malformed). */
export async function findPass(code) {
  if (!/^[a-f0-9]{32}$/i.test(code || "")) return null;
  const pass = PASSES[await sha256Hex(code.toLowerCase())];
  return pass && !pass.off ? pass : null;
}

/** False when an access record came from a pass that has since been revoked or removed. */
export function passStillValid(record) {
  if (!record || !record.pass) return true;
  return Object.values(PASSES).some((p) => p.label === record.pass && !p.off);
}
