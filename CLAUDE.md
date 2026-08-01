# CLAUDE.md — AvatarAgency Website (avataragency.ai)

Operating rules for editing this repository. Read before making changes.

## Project at a glance
- **Live site:** https://avataragency.ai (GitHub Pages + Cloudflare CDN)
- **Repo:** https://github.com/Mickey11xre/avataragency (public) · user **Mickey11xre** · branch **main**
- **Live pages live at the repository ROOT** (`index.html`, `about.html`, …) — these are what deploy.
  A `website_files/` subfolder also exists in the repo; it is NOT the live copy — edit ROOT files.

## Deploy workflow (every change)
```
git add -A
git commit -m "Short description of the change"
git push origin main
```
- Wait ~40–60s for the `pages-build-deployment` GitHub Action (Actions tab). A ~13-second run = a FAILED build.
- Verify at https://avataragency.ai with a hard refresh (Ctrl+F5).

## CRITICAL project rules — prevent broken / stale pages

### CSS cache-busting
The site sits behind a CDN. When you change the stylesheet, **RENAME the file** (e.g.
`atelier-v5.css` → `atelier-v6.css`) **AND** update the `<link rel="stylesheet">` tag in **every**
HTML page that uses it. Reusing the same filename makes the CDN serve the old cached version.
- **Current live CSS:** `atelier-v5.css`
- Older versions (`atelier.css`, `atelier-v3.css`, `atelier-v4.css`) still exist in the repo.
  NOTE: `services.html` currently links the old `atelier.css` — confirm intent before assuming
  all pages share one stylesheet.

### JS cache-busting
Bump the `?v=N` query on the script tag instead of renaming the file.
- **Current:** `<script src="atelier-v2.js?v=5"></script>` → next change becomes `?v=6`.

### Google Analytics — keep it
Every public page has a GA4 tag in `<head>`. **Measurement ID: G-T8NJ9JVWFV** (property
"avataragency.ai"). Do not remove or alter it when editing pages.

### AI disclosure — keep it
Public pages carry a footer disclosure line about AI-generated synthetic performers. Keep it intact.

## Page inventory
| Path | Notes |
|------|-------|
| `index.html` | Homepage (served at site root) |
| `about.html`, `authors.html`, `business.html`, `real-estate.html`, `services.html`, `contact.html`, `casestudy.html` | Public marketing pages |
| `protection.html` | Public "Protection" page (dark theme) |
| `ethica.html` | **Unlisted** demo (`noindex`) — do NOT link publicly |
| `clients/psmall/index.html` | **Private** client portal (Paul Small) — do NOT link publicly |
| `atelier-v5.css`, `atelier-v2.js` | Shared stylesheet + behavior (nav, scroll, carousel) |

## Reminders
- Authenticate with the `gh` CLI, a fine-grained PAT, or SSH — never a GitHub account password.
- Prefer this clone (`C:\Dev\avataragency`) over any OneDrive copy, which has had sync/truncation issues.
