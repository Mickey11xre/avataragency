/**
 * GET /api/dash/knowledge?avatar=ava — the sources the avatar answers from, in plain words: a readable title, the
 * one-line summary, and whether it is active. Changes go through "Request a change" (we update the knowledge base).
 */
import { json, avatarFrom, napster, remember, ms } from "../../_lib/dash.js";

const PREFIX = /^[a-z0-9]+kb-[0-9a-f]{6,}-/i;               // our upload prefix, e.g. avakb-efea8916-
const SPECIAL = { avataragency: "AvatarAgency", ai: "AI", aro: "ARO", faq: "FAQ", faqs: "FAQs", seo: "SEO",
  hipaa: "HIPAA", ppo: "PPO", hmo: "HMO", tmj: "TMJ" };
const SMALL = new Set(["and", "or", "of", "the", "for", "to", "in", "a", "an", "on", "with"]);
const STATE = { processed: "active", ready: "active", completed: "active", processing: "updating", pending: "updating",
  uploaded: "updating", failed: "attention", error: "attention" };

function title(file) {
  const words = file.replace(/\.[a-z0-9]+$/i, "").replace(/^\d+[-_ ]+/, "").replace(/[-_]+/g, " ").trim().split(/\s+/);
  return words.filter(Boolean).map((w, i) => {
    const lw = w.toLowerCase();
    if (SPECIAL[lw]) return SPECIAL[lw];
    if (i > 0 && SMALL.has(lw)) return lw;
    return lw[0].toUpperCase() + lw.slice(1);
  }).join(" ");
}

export async function onRequestGet(context) {
  const avatar = avatarFrom(context);
  if (!avatar) return json({ ok: false, error: "unknown avatar" }, 404);
  const files = await remember("kb:" + avatar.id, 600000, async () => {
    const seen = new Map();
    for (let p = 0; p < 10; p++) {
      let r;
      try { r = await napster(context.env, `/knowledge-bases/${avatar.knowledgeBaseId}/files?pageIndex=${p}&pageSize=10`); }
      catch (e) { if (p === 0) throw e; break; }
      const items = Array.isArray(r) ? r : (r.items || []);
      let added = 0;
      for (const f of items) if (f && f.id && !seen.has(f.id)) { seen.set(f.id, f); added++; }
      const total = Array.isArray(r) ? null : r.totalCount;
      if (Array.isArray(r) || !added || items.length < 10 || (total != null && seen.size >= total)) break;
    }
    return [...seen.values()].map((f) => {
      const file = String(f.originalName || f.name || "").replace(PREFIX, "");
      return {
        id: f.id, sort: file, title: title(file), summary: typeof f.summary === "string" ? f.summary : "",
        state: STATE[String(f.status || "").toLowerCase()] || "active", addedAt: ms(f.createdAt),
      };
    }).sort((a, b) => a.sort.localeCompare(b.sort));
  });
  return json({ ok: true, files: files.map(({ sort, ...f }) => f), total: files.length });
}
