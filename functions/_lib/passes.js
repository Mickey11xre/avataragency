/**
 * Pass links: direct access to the private pages for a prospect Michael invites personally, with no email form.
 *   https://avataragency.ai/avatarstages/?pass=<code>   (lands on /avatarstages/)
 *   https://avataragency.ai/work/?pass=<code>           (lands on /work/, the portfolio; 8 Oct)
 * Any pass works on either page: the URL decides where the visitor lands.
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
  // 2026-10-08: portfolio link for a very important potential partner whose email link went to spam (Michael texts it)
  "1475a50a873d0776d5a6029c2356d7e4f89e2ba5880dd7c40ebc24cf7dc595f4": { label: "work-partner-1", name: "" },
  // 2026-10-08: the Boardsi profile (/profile/) links its work cards and portfolio button here, so Boardsi viewers skip the form.
  // Every first open emails Michael (a lead signal). Revoke with off: true if the link spreads.
  "21e1d46e7d908be32a615a077651f611bbc88a775dfe36b61a6ed37edc159aae": { label: "boardsi-profile", name: "" },
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

const ACCESS_TTL = 60 * 60 * 24 * 180;   // same as /api/portfolio-confirm
const NOTIFY = "michael@avataragency.ai";

/**
 * ?pass=<code> on a gated page. A known pass gets the portfolio cookie (an existing valid one is kept, with no new
 * cookie and no email), Michael is emailed, and the visitor goes to the clean URL. Returns null for an unknown code.
 *   page: what to call the page in the email; location: where to send the visitor.
 */
export async function redeemPass(context, code, who, { location, page }) {
  const pass = await findPass(code);
  if (!pass || !context.env.AISO_KV) return null;
  const headers = { Location: location, "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" };
  if (!who) {
    const key = crypto.randomUUID().replace(/-/g, "") + crypto.randomUUID().replace(/-/g, "");
    await context.env.AISO_KV.put("pf:access:" + key, JSON.stringify({ email: "", name: pass.name || "", pass: pass.label, at: new Date().toISOString() }), { expirationTtl: ACCESS_TTL });
    headers["Set-Cookie"] = `aa_pf=${key}; Path=/; Max-Age=${ACCESS_TTL}; HttpOnly; Secure; SameSite=Lax`;
    const cf = context.request.cf || {};
    const where = [cf.city, cf.region, cf.country].filter(Boolean).join(", ");
    if (context.env.RESEND_API_KEY) context.waitUntil(fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${context.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: "AvatarAgency <studio@avataragency.ai>", to: [NOTIFY],
        subject: `${page} opened with the "${pass.label}" pass`,
        html: `<p>Someone opened <b>avataragency.ai${location}</b> with the <b>${pass.label}</b> pass link${where ? " (approx. " + where.replace(/[<>&]/g, "") + ")" : ""}.</p><p>No email was collected: pass links skip the form.</p>` }),
    }).catch(() => {}));
  }
  return new Response(null, { status: 302, headers });
}
