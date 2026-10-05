/**
 * /api/dash-auth — email sign-in for the avatar dashboard (/dashboard/).
 *
 *  POST {action:"request", email}        If the address may sign in, emails a one-time link AND a 6-digit code, both
 *                                        good for 15 minutes. Always answers {ok:true}, so the form can't be used to
 *                                        find out who has access.
 *  POST {action:"verify", token}         The emailed link opens /dashboard/login/?t=<token>, where a button sends this.
 *                                        The link alone never signs anyone in, because mail scanners open links.
 *  POST {action:"verify", email, code}   The typed code: read the email on your phone, sign in on the laptop.
 *  POST {action:"logout"}                Ends this browser's sign-in.
 *
 * A sign-in sets cookie aa_dash (HttpOnly, Secure, SameSite=Lax, 30 days) -> KV dash:sess:<id>.
 * Who may sign in: functions/_lib/dash.js (ADMINS, DASH_ADMINS, dash:user:<email>).
 * Bindings: AISO_KV. Secret: RESEND_API_KEY.
 */
import { json, clip, esc, randomHex, sha256, cookie, sameOrigin, userFor, SESSION_DAYS } from "../_lib/dash.js";

const FROM = "AvatarAgency <studio@avataragency.ai>";
const LINK_TTL = 15 * 60;
const MAX_CODE_TRIES = 5;
const REQUESTS_PER_IP_PER_HOUR = 8;
const VERIFIES_PER_IP_PER_HOUR = 30;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const hour = () => new Date().toISOString().slice(0, 13);
async function overLimit(kv, key, max) {
  const n = parseInt((await kv.get(key)) || "0", 10);
  if (n >= max) return true;
  await kv.put(key, String(n + 1), { expirationTtl: 3700 });
  return false;
}
async function sendEmail(env, payload) {
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!r.ok) console.log("dash-auth resend:", r.status, await r.text().catch(() => ""));
  return r.ok;
}
function signInEmail(link, code) {
  const spaced = code.slice(0, 3) + " " + code.slice(3);
  return `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f4f1ea;font-family:Arial,Helvetica,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ea;padding:32px 0"><tr><td align="center">
<table role="presentation" width="520" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden">
  <tr><td style="background:#0a0a0a;padding:22px 32px"><span style="color:#ffffff;font-size:18px;font-weight:bold">Avatar<span style="color:#C9A84C">Agency</span></span><span style="color:#8a8278;font-size:13px;padding-left:10px">Dashboard</span></td></tr>
  <tr><td style="padding:34px 32px 8px">
    <h1 style="margin:0 0 14px;font-size:22px;color:#0a0a0a">Sign in to your avatar dashboard</h1>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#3d3733">Use the button on this device, or type the code on the device where you asked to sign in.</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 24px"><tr><td style="background:#C9A84C;border-radius:999px">
      <a href="${esc(link)}" style="display:inline-block;padding:14px 30px;font-size:15px;font-weight:bold;color:#120f08;text-decoration:none">Open my dashboard</a>
    </td></tr></table>
    <p style="margin:0 0 6px;font-size:13px;color:#8a8278;text-align:center">Your sign-in code</p>
    <p style="margin:0 0 26px;font-size:30px;letter-spacing:6px;font-weight:bold;color:#0a0a0a;text-align:center">${spaced}</p>
    <p style="margin:0 0 26px;font-size:13px;line-height:1.6;color:#8a8278">The link and the code work once, for 15 minutes. If you didn't ask to sign in, you can ignore this email; nobody gets in without it.</p>
  </td></tr>
  <tr><td style="padding:18px 32px;border-top:1px solid #eee;font-size:12px;color:#8a8278">AvatarAgency · Los Angeles, California · avataragency.ai</td></tr>
</table></td></tr></table></body></html>`;
}

export async function onRequestPost(context) {
  const { request, env } = context;
  if (!sameOrigin(request)) return json({ ok: false, error: "forbidden" }, 403);
  if (!env.AISO_KV) return json({ ok: false, error: "not configured" }, 503);
  let b; try { b = await request.json(); } catch { return json({ ok: false, error: "bad request" }, 400); }
  const kv = env.AISO_KV;
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const action = String(b.action || "");

  if (action === "logout") {
    const sid = cookie(request, "aa_dash");
    if (/^[a-f0-9]{64}$/.test(sid)) await kv.delete("dash:sess:" + sid);
    return json({ ok: true }, 200, { "Set-Cookie": "aa_dash=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax" });
  }

  if (action === "request") {
    const email = clip(b.email, 160).toLowerCase();
    if (!EMAIL_RE.test(email)) return json({ ok: false, error: "Enter a valid email address." }, 400);
    if (await overLimit(kv, `rl:dash-auth:ip:${ip}:${hour()}`, REQUESTS_PER_IP_PER_HOUR)) {
      return json({ ok: false, error: "Too many sign-in requests from here. Try again in an hour." }, 429);
    }
    const user = await userFor(env, email);
    if (!user) return json({ ok: true });                      // say nothing about who has access
    if (!env.RESEND_API_KEY) return json({ ok: false, error: "Sign-in email is not set up yet." }, 503);
    const prev = await kv.get("dash:code:" + email, "json");
    if (prev && prev.sentAt > Date.now() - 60000) return json({ ok: true });   // one email a minute per address
    if (prev && prev.token) await kv.delete("dash:login:" + prev.token);         // a new email replaces the old one
    const token = randomHex(32);
    const code = String(100000 + (crypto.getRandomValues(new Uint32Array(1))[0] % 900000));
    await kv.put("dash:login:" + token, JSON.stringify({ email, codeHash: await sha256(code + ":" + token), tries: 0, createdAt: Date.now() }), { expirationTtl: LINK_TTL });
    await kv.put("dash:code:" + email, JSON.stringify({ token, sentAt: Date.now() }), { expirationTtl: LINK_TTL });
    const link = `${new URL(request.url).origin}/dashboard/login/?t=${token}`;
    const sent = await sendEmail(env, { from: FROM, to: [email], subject: `Your dashboard sign-in code: ${code}`, html: signInEmail(link, code) });
    if (!sent) return json({ ok: false, error: "We couldn't send the email. Try again in a minute." }, 502);
    return json({ ok: true });
  }

  if (action === "verify") {
    if (await overLimit(kv, `rl:dash-verify:ip:${ip}:${hour()}`, VERIFIES_PER_IP_PER_HOUR)) {
      return json({ ok: false, error: "Too many attempts from here. Try again in an hour." }, 429);
    }
    const expired = json({ ok: false, error: "This sign-in has expired or was already used. Request a new email." }, 410);
    let token = clip(b.token, 80), rec = null;
    if (token) {
      if (!/^[a-f0-9]{64}$/.test(token)) return expired;
      rec = await kv.get("dash:login:" + token, "json");
      if (!rec) return expired;
    } else {
      const email = clip(b.email, 160).toLowerCase();
      const code = String(b.code || "").replace(/\D/g, "");
      if (!EMAIL_RE.test(email) || code.length !== 6) return json({ ok: false, error: "Enter the 6-digit code from the email." }, 400);
      const c = await kv.get("dash:code:" + email, "json");
      if (!c || !c.token) return expired;
      token = c.token;
      rec = await kv.get("dash:login:" + token, "json");
      if (!rec) return expired;
      if ((await sha256(code + ":" + token)) !== rec.codeHash) {
        rec.tries = (rec.tries || 0) + 1;
        if (rec.tries >= MAX_CODE_TRIES) {
          await kv.delete("dash:login:" + token);
          await kv.delete("dash:code:" + email);
          return json({ ok: false, error: "Too many wrong codes. Request a new email." }, 429);
        }
        const left = Math.max(60, LINK_TTL - Math.round((Date.now() - rec.createdAt) / 1000));
        await kv.put("dash:login:" + token, JSON.stringify(rec), { expirationTtl: left });
        return json({ ok: false, error: "That code doesn't match. Check the email and try again." }, 400);
      }
    }
    await kv.delete("dash:login:" + token);                    // single use
    await kv.delete("dash:code:" + rec.email);
    const user = await userFor(env, rec.email);
    if (!user) return json({ ok: false, error: "This address no longer has dashboard access." }, 403);
    const sid = randomHex(32);
    await kv.put("dash:sess:" + sid, JSON.stringify({
      email: user.email, createdAt: new Date().toISOString(),
      ua: clip(request.headers.get("User-Agent"), 160), country: (request.cf && request.cf.country) || "",
    }), { expirationTtl: SESSION_DAYS * 86400 });
    return json({ ok: true }, 200, { "Set-Cookie": `aa_dash=${sid}; Path=/; Max-Age=${SESSION_DAYS * 86400}; HttpOnly; Secure; SameSite=Lax` });
  }

  return json({ ok: false, error: "unknown action" }, 400);
}
