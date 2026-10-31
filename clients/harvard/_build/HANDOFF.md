# Harvard Investment Group — site build handoff

Redesign of https://harvardinvestmentgroup.com/ for Greg Cullen, built 2026-10-30 by the AvatarAgency creative
session. Static HTML/CSS/JS, no build dependencies. Preview target: **https://avataragency.ai/clients/harvard/**
(noindex, unlisted). Final target: harvardinvestmentgroup.com (DNS move not yet coordinated).

## What is here
```
clients/harvard/
  _build/content.js      every word on the site (verbatim from the old site, typos fixed) + FAQ + image alts
  _build/build.js        generator → the 7 pages, llms.txt, llms-full.txt, sitemap.xml, monogram.svg
  _build/HANDOFF.md      this file
  index.html  about/  investments/  developments/  philanthropic/  contact/  faq/
  assets/css/site.css    styles (palette, heroes, galleries, avatar stage per AVATAR-STAGE-SPEC v1.3)
  assets/js/site.js      header, menu, GSAP/ScrollTrigger/Lenis animation, lightbox, contact form, stage placeholder
  assets/img/*.webp      390 files: 2201 (39 + the beach photo), 2209 (68), old-site galleries, awards, logos
  assets/video/          hero_1080.mp4 (4.2 MB) · hero_720.mp4 (1.7 MB) · poster.jpg  (Seedance 2.5 job 3c742d3e, approved 10-30)
  vendor/                gsap.min.js · ScrollTrigger.min.js · lenis.min.js (copies of /home-next/vendor)
functions/clients/harvard/api/contact.js   POST handler for the contact form (Resend)
```

## Rebuild after a copy change
```
node clients/harvard/_build/build.js          # preview build (root /clients/harvard, noindex)
node clients/harvard/_build/build.js --final  # production build for harvardinvestmentgroup.com (root "", indexable, robots.txt)
```
Bump `V` in build.js when css/js change (Cloudflare caches assets ~4 h; the pages reference `?v=N`).

## Status
- 🚀 **Preview LIVE 2026-10-30** at https://avataragency.ai/clients/harvard/ (commit `a270dc9`), verified by content:
  all seven titles, css/js/video/image content-types, `data-intro`, the welcome film, noindex. A real form post returned ok.
- Every later change: edit, rebuild, bump `V` if css/js changed, `git add clients/harvard functions/clients/harvard`, commit, push, curl-verify.

## Deploy to the preview (avataragency repo rules)
1. `git add clients/harvard functions/clients/harvard` — specific paths only, never `-A` or `.`.
2. Commit (end the message with `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`), push `main`.
3. Verify by CONTENT, not status: `curl -s https://avataragency.ai/clients/harvard/ | grep -c "Harvard Investment Group"`
   and `curl -sI https://avataragency.ai/clients/harvard/assets/css/site.css | grep -i content-type` (text/css, not html).
4. `robots.txt` already disallows `/clients/` for every named crawler, and every page carries `noindex`.

### Pages env vars for the form (Cloudflare Pages → Settings → Environment variables)
- `RESEND_API_KEY` — already set for the other forms.
- `HIG_CONTACT_TO` — **leave unset on the preview**: messages then go to michael@avataragency.ai.
  At go-live set it to `greg@harvardinvestmentgroup.com`.
- `HIG_CONTACT_FROM` — optional verified sender; defaults to the avataragency.ai sender the other forms use.

## Home hero, v2 (Michael, 10-30)
- **Ambient loop layer** `.ambient` is FIXED behind the page (livebrand.ai pattern). The hero is transparent over it and three
  transparent `.peek` breaks (42vh) further down let the loop show through again. `HERO.clips` in `content.js` lists the
  clips; `site.js` cycles them with a 1.2 s crossfade (one clip = plain loop) and plays only while the hero or a break is on
  screen. **To add a loop:** encode `hero_<name>_1080.mp4` + `_720.mp4` (H.264, no audio, ≤ 5 MB), drop them in
  `assets/video/`, add `{ src, small, poster, label }` to `HERO.clips`, rebuild.
- **Welcome film** `.hero-film` (right column): Harrison's 30 s "Welcome to Harvard Investment Group"
  (`assets/video/harrison-welcome_1080.mp4`, `_720.mp4` under 900 px via `<source media>`, poster `film-harrison-*.webp`).
  Loops MUTED while on screen; the stage's sound icon (top-right of the frame) replays it from 0:00 with sound, then the
  silent loop resumes. **"Talk to Harrison"** sits directly under the frame (`[data-talk]`): it jumps to `#stage` and
  pulses the stage's Talk button. ⏳ Once the live avatar exists, start the conversation from that click
  (site.js, the `[data-talk]` handler). The header's Talk button is gone on the Home page only (the film's button
  replaces it); other pages keep it in the nav.
- **2201 layers** float in from left / right / bottom (scrubbed), then keep drifting at their own speeds.

- **Logo:** Greg's own H with the swish (`assets/img/logo-h-white.png` in the header and footer, `logo-h-navy.png` for light
  backgrounds and the Organization JSON-LD, `favicon.png`). Keyed from the old site's grey logo file; redo from a vector if Greg has one.

## Open items (waiting on Michael / Greg)
- ✅ Three hero loops in `HERO.clips` (10-30): 2201 beach drift (job 3c742d3e, approved), Hollywood Hills fly-over
  (4b96e1ab, approved; the first attempt 6ecdac60 rose straight up and was rejected), Newport Harbor aerial (f77e576e). Masters in `C:\VideoProjects\HarvardInvestmentGroup\website_build\assets\`.
- The welcome film (avatar walk-through) → `HERO.film.src`.
- ✅ Greg's B&W portrait is on /about/ (OPTION_A, AI-aged from his two headshots; `assets/img/greg-portrait-*.webp`).
  Greg approves it, picks B or C from the REVIEW folder, or sends current photos for a redo.
- ✅ Harrison's stage intro is wired (10-30): `STAGE.intro` / `STAGE.poster` in content.js → `data-intro` on `#stage`,
  the poster as the `.stage-av` background, the sound icon replays from 0:00 with the captions in site.js `LINES`
  (source of truth `AVATAR\HARRISON\STAGE\harrison-intro.vtt`, `INTRO_END` 28.4), hearing stops when the clip wraps,
  passes the end or scrolls away, and the panel options pulse. Reduced motion: poster, one sounded pass on tap.
  ✅ **Live session wired (10-30, Part A of `AVATAR\HARRISON\DELIVERY\_HANDOFF_harrison-live_v1.md`):**
  `functions/api/hig-harrison-token.js` (origin-checked, 8 sessions/IP/hour, visitor cookie `aa_hig_vid` + seen cookie
  `aa_hig_seen` on `/api`, first-visit / welcome-back `initialSpeech`); site.js `HigStage` (ACCU port: token → SDK →
  `#hig-mount`, reveal on real frames, zero border, Connecting… / End conversation, ten-minute cap, pop-out from
  `vendor/avatar-popout.js`); the panel = four cards (links when idle; while live they tell Harrison and Contact opens the
  form) + the contact form + review card; his four tools `show_topic` · `show_contact_form` · `fill_contact_details` ·
  `submit_contact_details` (first call = review card, second call or the visitor's Yes = ONE POST to `/api/contact`,
  message prefixed "[Via Harrison, the website AI agent]"). The welcome film's "Talk to Harrison" starts the session in
  the same click. Console harness: `HigStage.exec("show_topic",{topic:"philanthropy"})` etc.
  ✅ **Part B LIVE 10-30** (aed6e6a, agent 51acf130-ee2a-4cf2-a576-69c99b82edf5). Stage fix da021cf + 4d18d1f: the
  `.ava-mount` fill rules (copied from home-next.css) plus an ID-level `#np_companion-avatar-container` override
  (inset 0, transform none): without them the live player floats as a 340x400 box and the stage goes black. While live,
  `.ava-ctrls` hides and the player's own bar (red hang-up) ends the session, per the stage spec.
  ⛔ The site must not mention the avatar platform anywhere (Michael, 10-29).
- Netflix logo file → footer `.ftr-netflix` (currently a red "N" tile + the trademark line).
- ✅ Donate buttons go to https://hopefth.org (`SITE.donateUrl`, 10-30).
- Greg to approve the 12 FAQs (`content.js` → FAQ) and the two figures kept as written:
  Home says "approaching half a billion", About says "approaching a billion".
- Optional: Higgsfield stills for Investments if Greg wants non-property imagery (quote first).
- Final-domain move: run `--final`, move `functions/clients/harvard/api/contact.js` to `functions/api/contact.js`
  in the new Pages project, set the env vars, submit `sitemap.xml` + IndexNow.

## Verified 2026-10-30 (local, node scripts/serve.js, 1440×900)
Home hero video + title rise, header solid/hide, reveals, 2201 layered drift, duo cards, stage placeholder, Netflix
line + AvatarAgency credit in the footer; Developments heroes, mosaics, galleries, 39-photo drawer; About hero.
`?rm=1` on any URL disables Lenis/GSAP (reduced-motion path).

## Phones while Harrison is live (10-31, V 19)
A view opens UNDER him: `fitStage()` in site.js keeps the stage under the header and caps the view (`--pv-max`) to the
room left. `.panel-body` is `overscroll-behavior: auto` on phones; `contain` trapped visitors in the view.
