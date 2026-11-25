#!/usr/bin/env node
/**
 * Client portal accounts — run on Michael's computer from the repo root (wrangler must be logged in).
 * Writes straight to the CLIENT_AUTH KV namespace with `wrangler kv`. Never stores or logs a password in plaintext:
 * a temporary password is printed ONCE (or written to --out <file>), and only its PBKDF2 hash is saved.
 *
 *   node scripts/client-admin.mjs add       --email andre@example.com --name "Andre Neidich" --slugs aneidich [--preview]
 *   node scripts/client-admin.mjs add-admin --email michael@avataragency.ai --name "Michael Rivera"
 *   node scripts/client-admin.mjs reset     --email andre@example.com     # new temporary password; signs out every browser
 *   node scripts/client-admin.mjs slugs     --email andre@example.com --slugs aneidich,other
 *   node scripts/client-admin.mjs disable   --email andre@example.com     # (enable to undo) blocks sign-in at once
 *   node scripts/client-admin.mjs unlock    --email andre@example.com     # clears a failed-attempt lockout
 *   node scripts/client-admin.mjs show      --email andre@example.com     # the record, without the hash
 *   node scripts/client-admin.mjs list
 *   node scripts/client-admin.mjs delete    --email andre@example.com
 *
 * Which namespace:  (default) production CLIENT_AUTH  |  --preview  the preview-deployment namespace
 *                   --ns <namespace-id>               |  --local <persist dir>  (wrangler pages dev, binding CLIENT_AUTH)
 * Options: --out <file>  write the temporary password to this file (mode 600) instead of the screen.
 *
 * Remember: a client is only gated once their slug is in GATED (functions/_lib/client-auth.js) and that is deployed.
 * Send the temporary password yourself (text or email); they choose their own on first sign-in.
 */
import { spawnSync } from "node:child_process";
import { pbkdf2Sync, randomBytes, randomInt } from "node:crypto";
import { writeFileSync, mkdtempSync, rmSync, chmodSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const NAMESPACES = {
  production: "",                                   // fill in after `wrangler kv namespace create client-auth`
  preview: "7f7044419fdf45939eacf372e751885c",      // client-auth-preview (2026-11-24)
};
const ITER = 100000;                                // must match functions/_lib/client-auth.js (Workers max)

const argv = process.argv.slice(2);
const cmd = argv[0];
const opt = {};
for (let i = 1; i < argv.length; i++) {
  const a = argv[i];
  if (!a.startsWith("--")) continue;
  const k = a.slice(2), v = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : true;
  opt[k] = v;
}
const die = (m) => { console.error("Error: " + m); process.exit(1); };

let target;
if (opt.local) target = { local: String(opt.local), id: "CLIENT_AUTH", label: "LOCAL (" + opt.local + ")" };
else if (opt.ns) target = { id: String(opt.ns), label: "namespace " + opt.ns };
else if (opt.preview) target = { id: NAMESPACES.preview, label: "PREVIEW (client-auth-preview)" };
else {
  if (!NAMESPACES.production) die("the production namespace id isn't set in scripts/client-admin.mjs yet. Use --preview, or --ns <id>.");
  target = { id: NAMESPACES.production, label: "PRODUCTION (client-auth)" };
}

function wrangler(args, { quiet = true, missingOk = false } = {}) {
  const full = ["wrangler", ...args, "--namespace-id", target.id, ...(target.local ? ["--local", "--persist-to", target.local] : ["--remote"])];
  const win = process.platform === "win32";
  // Windows needs a shell to run npx.cmd; pass ONE pre-quoted command line (every value here is validated: emails, slugs, ids, paths).
  if (win && full.some((a) => /["%^&|<>]/.test(a))) die("unsafe character in an argument");
  const r = win
    ? spawnSync(["npx.cmd", ...full].map((a) => (/\s/.test(a) ? `"${a}"` : a)).join(" "), { encoding: "utf8", shell: true, maxBuffer: 1 << 24 })
    : spawnSync("npx", full, { encoding: "utf8", maxBuffer: 1 << 24 });
  if (r.status !== 0 && missingOk && /404|not found/i.test((r.stderr || "") + (r.stdout || ""))) return "";
  if (r.status !== 0) die("wrangler failed: " + (r.stderr || r.stdout || "").trim().split("\n").slice(-4).join("\n"));
  if (!quiet) console.log(r.stdout.trim());
  return r.stdout || "";
}
function kvGet(key) {
  const out = wrangler(["kv", "key", "get", key, "--text"], { missingOk: true });
  const i = out.indexOf("{");
  if (i < 0) return null;
  try { return JSON.parse(out.slice(i)); } catch { return null; }
}
function kvPut(key, value) {
  const dir = mkdtempSync(join(tmpdir(), "cladm-"));
  const f = join(dir, "v.json");
  try { writeFileSync(f, JSON.stringify(value), { mode: 0o600 }); wrangler(["kv", "key", "put", key, "--path", f]); }
  finally { rmSync(dir, { recursive: true, force: true }); }
}
function kvDel(key) { wrangler(["kv", "key", "delete", key], { missingOk: true }); }
function kvList(prefix) {
  const out = wrangler(["kv", "key", "list", "--prefix", prefix]);
  const i = out.indexOf("[");
  return i < 0 ? [] : JSON.parse(out.slice(i));
}

const b64u = (buf) => Buffer.from(buf).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
function hash(pw) {
  const salt = randomBytes(16);
  return { alg: "PBKDF2-SHA256", iter: ITER, salt: b64u(salt), dk: b64u(pbkdf2Sync(String(pw).normalize("NFC"), salt, ITER, 32, "sha256")) };
}
function tempPassword() {          // e.g. Kq7m-x2Pd-9vRt : 12 random chars, no look-alikes (0/O, 1/l/I)
  const A = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  const g = () => Array.from({ length: 4 }, () => A[randomInt(A.length)]).join("");
  return `${g()}-${g()}-${g()}`;
}
function emailArg() {
  const e = String(opt.email || "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e)) die("--email <address> is required");
  return e;
}
const slugsArg = () => String(opt.slugs || "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
function issue(email, pw) {
  if (opt.out) {
    writeFileSync(String(opt.out), `${email}\t${pw}\n`, { flag: "a", mode: 0o600 });
    try { chmodSync(String(opt.out), 0o600); } catch {}
    console.log(`Temporary password for ${email} written to ${opt.out}`);
  } else {
    console.log(`\n  Temporary password for ${email}:  ${pw}\n  (shown once; they must change it at first sign-in)\n`);
  }
}
const pub = (u) => { const { hash: _h, ...rest } = u || {}; return rest; };

console.log(`[client-admin] target: ${target.label}`);
const now = new Date().toISOString();
switch (cmd) {
  case "add":
  case "add-admin": {
    const email = emailArg();
    if (kvGet("cl:user:" + email) && !opt.force) die(`${email} already exists. Use reset (or --force to overwrite).`);
    const admin = cmd === "add-admin";
    const slugs = admin ? ["*"] : slugsArg();
    if (!admin && !slugs.length) die("--slugs <slug,...> is required for a client");
    const pw = tempPassword();
    kvPut("cl:user:" + email, { email, name: String(opt.name || ""), role: admin ? "admin" : "client", slugs, hash: hash(pw),
      must_change: true, disabled: false, pwv: 1, created: now, updated: now });
    console.log(`Created ${admin ? "ADMIN" : "client"} ${email} -> ${slugs.join(", ")}`);
    issue(email, pw);
    break;
  }
  case "reset": {
    const email = emailArg(), u = kvGet("cl:user:" + email);
    if (!u) die(`${email} not found`);
    const pw = tempPassword();
    Object.assign(u, { hash: hash(pw), must_change: true, pwv: (u.pwv || 1) + 1, updated: now, reset_at: now });
    kvPut("cl:user:" + email, u);
    kvDel("cl:fail:" + email);
    console.log(`Reset ${email}: every browser is signed out; the new temporary password must be changed at sign-in.`);
    issue(email, pw);
    break;
  }
  case "slugs": {
    const email = emailArg(), u = kvGet("cl:user:" + email);
    if (!u) die(`${email} not found`);
    u.slugs = slugsArg(); u.updated = now; kvPut("cl:user:" + email, u);
    console.log(`${email} -> ${u.slugs.join(", ") || "(none)"}`);
    break;
  }
  case "disable":
  case "enable": {
    const email = emailArg(), u = kvGet("cl:user:" + email);
    if (!u) die(`${email} not found`);
    u.disabled = cmd === "disable"; u.updated = now; kvPut("cl:user:" + email, u);
    console.log(`${email} ${u.disabled ? "disabled" : "enabled"}`);
    break;
  }
  case "unlock": { const email = emailArg(); kvDel("cl:fail:" + email); console.log(`${email} unlocked`); break; }
  case "show": { const u = kvGet("cl:user:" + emailArg()); console.log(u ? JSON.stringify(pub(u), null, 2) : "not found"); break; }
  case "delete": { const email = emailArg(); kvDel("cl:user:" + email); console.log(`${email} deleted`); break; }
  case "list": {
    for (const k of kvList("cl:user:")) {
      const u = kvGet(k.name);
      if (u) console.log([u.email, u.role, (u.slugs || []).join(","), u.disabled ? "DISABLED" : u.must_change ? "temp password" : "active", u.last_login || "never signed in"].join("\t"));
    }
    break;
  }
  default:
    console.log("Usage: node scripts/client-admin.mjs <add|add-admin|reset|slugs|disable|enable|unlock|show|list|delete> --email ... [--preview]");
    process.exit(cmd ? 1 : 0);
}
