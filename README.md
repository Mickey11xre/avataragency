# Claude Coach Twin — Knowledge Corpus
Compiled 2026-07-28 · Step 1 of the build checklist in the brain page `claude-coach-twin-design`.

## What's here (raw\)
| Tier | Content | Files | Size | KB role |
|------|---------|-------|------|---------|
| **1 — PRIMARY** | `articles/` — the ENTIRE English claude.ai Help Center (Projects, connectors, memory, plans, artifacts, mobile/desktop, Cowork, Claude Code support, privacy) | **357 .md** | 6.0 MB | Host + attach: this is what coaching students actually ask about |
| **2 — CRAFT** | `devdocs/` — prompt-engineering guide (incl. per-model best practices) + models overview/choosing + glossary from platform.claude.com | 9 .md | 152 KB | Host + attach: makes the coach an expert at prompting technique |
| **3 — OPTIONAL** | `claudecode-llms-full.txt` — full Claude Code docs (single file) | 1 | 6.4 MB | Attach only if KB file-size limits allow; Tier 1 already covers Claude Code support articles |
| **REFERENCE** | `api-docs-llms-full.txt` — full platform docs dump | 1 | 24 MB | DO NOT attach wholesale; source for future curation only |

## Sources (for the monthly re-compile)
- Help Center article list: `hc-all-en-urls.txt` (from support.claude.com/sitemap.xml — the llms.txt index only exposes ~101 of 357 articles; use the SITEMAP)
- Any article URL + `.md` = clean markdown (e.g. `.../9517075-what-are-projects.md`)
- Dev docs index: `api-docs-llms.txt` (docs.anthropic.com/llms.txt, 549 pages)
- Claude Code: code.claude.com/docs/llms-full.txt

## Re-compile (monthly maintenance)
1. Re-fetch sitemap → diff against `hc-all-en-urls.txt` → download new/changed articles.
2. Re-fetch the 9 devdocs URLs (`devdocs-urls.txt`).
3. Re-upload changed files to the hosting location; Napster KB re-ingests by URL.

## Hosting plan (step 2)
- ⚠️ Do NOT put this corpus in the avataragency Cloudflare Pages repo main branch —
  `api-docs-llms-full.txt` (24 MB) rides close to the 25 MiB/file cap that silently kills the
  whole site deploy (see brain: avataragency-hosting-deploy).
- Use a GitHub raw branch (twin-assets pattern) or a separate public repo; Napster fetches by URL.
- ⚠️ KB size/file-count limits UNDOCUMENTED — ask on Napster Discord before bulk-adding 366 files;
  fallback is concatenating articles into ~20 category bundles.
