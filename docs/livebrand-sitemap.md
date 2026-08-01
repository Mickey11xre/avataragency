# LiveBrand.ai — Site Map & Content Flow

**Purpose:** Information architecture and page-level content flow for the LiveBrand.ai website, to hand to Claude Design for look-and-feel. Pre-visual — this defines *what goes where and in what order*, not styling.
**Sources:** `livebrand-business-plan.md` + `LiveBrand_Design_Guide_dc.html`.
**Date:** 2026-07-02

---

## 0. Orientation

LiveBrand.ai is a **two-sided platform**, which means the "site" is really **four connected surfaces**. This document maps all four, but the **marketing site (Surface A)** is the focus — that's what Claude Design styles first.

| # | Surface | Audience | Goal | Build phase |
|---|---------|----------|------|-------------|
| **A** | **Marketing site** (`livebrand.ai`) | Creators (professionals/brands) | Acquire → sign up | **V1 — style now** |
| **B** | **Creator app** (`app.livebrand.ai`) | Logged-in creators | Build, deploy, manage twins | V1 — functional, styled after A |
| **C** | **Visitor avatar page** (`name.livebrand.ai`) | End-users of a creator's twin | Register → trial → subscribe | V1 — this is the proven Ethica loop |
| **D** | **Marketplace** (`livebrand.ai/gallery` → full directory) | Visitors discovering twins | Browse → engage → convert to creator | V1 curated gallery → V3 full marketplace |

**Brand through-line (from the design guide):** *live / on-air — a broadcast presence that is always on.* CTA verbs are **"Create your avatar"** (primary) and **"Go live."** The pulsing LIVE pill is the recurring signal element.

**CTA hierarchy across the whole site:**
- **Primary:** `Create your avatar` → sign-up (Surface B onboarding)
- **Secondary:** `Talk to a live avatar` → Ethica demo / Gallery (proof)
- **Tertiary (Agency/Enterprise):** `Book a demo`
- **Quaternary:** Newsletter / "Always-on insights" email capture

---

## A. Marketing Site

### Global navigation (header)

Sticky, **solid white "eyebrow" bar** pinned at the very top, hairline bottom border, logo lockup at 26–30px (per guide nav spec). Deliberately **opaque, not transparent-over-video** — this keeps the logo on clean white and always legible above the full-bleed video hero below it (see A1).

```
[LiveBrand.ai logo]   Product ▾   Solutions ▾   Pricing   Gallery   Resources ▾        Log in   [ Create your avatar ]
```

- **Product ▾** — How it works · Features · Avatar Builder · Analytics & Revenue · Security
- **Solutions ▾** — Real Estate · Financial Advisors · Attorneys · Coaches · Healthcare · Influencers · Corporate
- **Resources ▾** — Blog · Guides & Templates · Tutorials (YouTube) · Case Studies · Help / Docs
- **Log in** → Surface B · **Create your avatar** → sign-up (primary button, accent)

### Global footer

5 columns + utility bar.

- **Product:** How it works, Features, Avatar Builder, Analytics, Pricing, What's new
- **Solutions:** the 7 verticals
- **Resources:** Blog, Guides, Tutorials, Case studies, Help/Docs, Affiliate program, Become a Partner
- **Company:** About, Careers, Contact, Press
- **Legal & Trust:** Terms, Privacy, AI Disclosure & Ethics, Security, Acceptable Use, DPA
- **Utility bar:** newsletter capture · social · language (EN; ES/FR/PT roadmap) · **"You're speaking with an AI Digital Twin" disclosure note** · © AvatarAgency

---

### A1. Homepage `/`  — *primary conversion page*

Content flow, top → bottom:

1. **Hero — full-bleed cycling faces (LINKA-style).** Near-viewport-height canvas directly beneath the white eyebrow bar. **Concept:** ONE huge close-up face at a time, cycling through ~8 different people, each a short clip with subtle real motion (a smile forming, a nod), crossfading gracefully — *everyone's persona is one-of-a-kind; LiveBrand gives yours a living avatar.* Overlaid, lower-anchored: thin geometric-sans headline (**Geist Light** — LINKA's actual typeface, from their `--font-primary: Geist`; a deliberate deviation from the guide's Fraunces headlines for this hero) in white (e.g. *"Your brand, / your story, your voice…"* — line breaks after the first comma), a one-line subhead (*Easy setup. Turnkey solution. Working 24/7.*), a single primary CTA `Create your avatar`, and thin progress-dots showing the active face. **No LIVE pill and no secondary button in the hero** — kept intentionally quiet. **Legibility:** no scrim/shaded panel over the video — a subtle text-shadow on the headline/subhead keeps text readable so the faces stay fully visible. **Prototype:** `design/livebrand/hero.html` (source-array-driven, placeholder faces swap for real clips).
   - **Delivery strategy (bandwidth):** genuine facial motion ⇒ video, not stills. **Recommended:** one stitched ~24–32s loop (8 faces + baked crossfades), AV1/VP9 `.webm` + H.264 `.mp4` fallback, muted, no audio track, ~2–4 MB at 1080p; **poster JPEG (~150 KB) is the LCP element and paints first.** Alternative: 8 separate short clips, load #1 + poster now, preload-next while current plays. Mobile / reduced-motion ⇒ static poster. Cloudflare CDN + range requests. Keep critical payload < ~1 MB.
   - *Face footage is a production asset to source or generate (Fal.ai video gen — quote cost first).*
2. **Trust strip** — "Powered by the team behind Ethica" + logos/metrics + as-seen-in / vertical badges.
3. **The problem** — "You can only be in one place at a time." 3–4 friction cards (leads go cold, revenue capped by hours, brand unmonetized at scale).
4. **The solution / what it is** — one-liner: *Squarespace for Digital Twins.* Split visual: creator side vs. visitor side.
5. **How it works — 4 steps** — Upload → Configure → Deploy → Collect. Numbered, icon per step (mirrors the Foundation "Clean/Warm/Precise" card pattern).
6. **Feature highlights** — no-code builder, branded pages, registration + paywall, subscription billing, knowledge-base training, analytics dashboard. 6-card grid.
7. **Live visitor experience** — animated walk-through of the visitor loop (register → 5-min trial → paywall → subscribe). "This loop is already live with Ethica."
8. **Verticals** — "Built for your profession" — 7 chips/cards linking to each Solutions page.
9. **Avatar Gallery preview** — 3–6 live example twins (Surface D teaser), `Explore the gallery`.
10. **Proof / case study** — Ethica metrics band → `Read the Ethica case study`.
11. **Pricing teaser** — 3 tiers at a glance ($97 / $197 / $497) → `See full pricing`.
12. **Social proof** — founding-member testimonials, subscriber-count stats.
13. **Founding Member banner** — first-100 lifetime pricing offer (GTM Phase 1).
14. **FAQ** — 5–7 top objections (Is it really no-code? Is this financial/legal advice? How do payouts work? etc.).
15. **Final CTA band** — `Create your avatar` + `Book a demo`.
16. Footer.

### A2. Product

- **A2.0 How it works `/how-it-works`** — long-form of the 4 steps, each with the builder UI preview, the visitor experience, and the analytics payoff. Deep secondary CTA per section.
- **A2.1 Features `/features`** — full capability list grouped: Build (no-code builder, knowledge base, persona/voice), Deploy (branded pages, custom domain, subdomains), Monetize (trial, tiers, Stripe billing, revenue share), Grow (leads/CRM, analytics, A/B pricing).
- **A2.2 Avatar Builder `/product/builder`** — "The Brain Upload." Persona doc, knowledge base ingestion (PDF/URL/text/transcript), appearance, voice cloning (Pro+), test-your-avatar.
- **A2.3 Analytics & Revenue `/product/analytics`** — creator dashboard tour: MRR, leads, subscribers, session duration, top topics, churn; revenue-share payouts via Stripe Connect.
- **A2.4 Security & Compliance `/security`** — encryption, AI disclosure, education-not-advice boundary, GDPR/CCPA, SOC 2 (Year-2 roadmap), content moderation. *Critical for finance/legal/health verticals.*

### A3. Solutions (verticals)

- **A3.0 Solutions index `/solutions`** — grid of the 7 verticals, each a card (pain → outcome).
- **A3.1–A3.7 Vertical landing pages** — one template, seven fills. Priority order from the plan:
  1. `/solutions/real-estate` (priority #1)
  2. `/solutions/financial-advisors`
  3. `/solutions/attorneys`
  4. `/solutions/coaches`
  5. `/solutions/healthcare`
  6. `/solutions/influencers`
  7. `/solutions/corporate`

  **Vertical page content flow (shared template):** vertical hero (profession-specific headline) → the pain in this vertical → "your twin does X while you sleep" → **Starter Kit** (pre-built knowledge-base template, suggested tiers) → example live twin for this vertical → ROI framing ("one avatar-sourced client pays for months") → compliance note where relevant (finance/legal/health = "education, not advice") → pricing → CTA `Create your [vertical] twin`.

### A4. Pricing `/pricing`

1. Header + billing toggle (monthly/annual).
2. **3-tier cards:** Starter $97 · Pro $197 (most-popular, accent) · Agency $497. Per-card: twin count (1/3/10), visitor tiers, custom domain, voice cloning, CRM, support, revenue share (10%/7%/5%).
3. **White-label add-on** ($300/mo) callout.
4. **Two-layer revenue explainer** — "You keep your subscription revenue minus a small share (10/7/5%)." Simple diagram.
5. **Full feature comparison table** (from plan §3.5).
6. **Founding Member** lifetime-pricing offer.
7. **30-day money-back guarantee** badge.
8. Pricing FAQ (revenue share, payouts, downgrade, visitor price guardrails $5–$499).
9. CTA band.

### A5. Gallery `/gallery`  — *Surface D entry point*

- V1: curated grid of live example twins, filter by category. Each card → the live avatar page (Surface C). `Create your avatar` CTA persists.
- Evolves into the full **Marketplace** (search, categories, profiles) at V3.

### A6. Case Study — Ethica `/case-studies/ethica`

The proof asset (GTM Phase 1). Story + the loop diagram + metrics (leads, trial→paid conversion, subscriber revenue, COGS) + `Talk to Ethica live` (links to the existing avataragency.ai/ethica deployment).

### A7. Resources

- **A7.1 Blog `/blog`** — index + post template (SEO engine: "monetize your personal brand," "AI avatar for business," "passive income for real estate agents"). 3 posts/week per GTM plan.
- **A7.2 Guides & Templates `/guides`** — vertical starter-kit templates, persona-writing guide.
- **A7.3 Tutorials `/tutorials`** — YouTube embed hub ("build your avatar live").
- **A7.4 Help / Docs `/help`** — onboarding docs, FAQ, support.

### A8. Partners `/partners`

- **Affiliate program** — 20% recurring commission (coaches refer coaches). Apply form.
- **LiveBrand Certified** — agency/consultant certification (V3). Apply form.

### A9. Company

- `/about` · `/careers` · `/contact` (sales + support + Book-a-demo) · `/press`

### A10. Legal & Trust

- `/terms` · `/privacy` · `/ai-disclosure` (mandatory AI-twin disclosure + education-not-advice policy) · `/acceptable-use` · `/security` · `/dpa`
- *Note: Ethica already has Terms + Privacy live in the repo — reuse/adapt.*

### A11. Auth (bridge to Surface B)

- `/login` · `/signup` ("Create your avatar" — name, email, professional category, tier select) · `/forgot-password` · KYC-lite identity step.

---

## B. Creator App  `app.livebrand.ai` *(post-login product — functional now, deep styling after A)*

**B0. Onboarding wizard** (the 4-step flow from plan §3.2), shown once after signup:
1. Account & category + KYC-lite
2. **Brain Upload** — persona doc, knowledge base, voice/video sample, appearance
3. **Experience config** — trial length, visitor tiers, confirmation emails, redirects
4. **Deploy** — pick subdomain/custom domain, preview, publish → `Go live`

**B-app sections (left nav):**
- **Dashboard** — MRR, leads, active subscribers, avg session, top topics, churn, "first subscriber" milestone nudge
- **Twins** — list / create / edit (1–10 by tier)
- **Avatar Builder** — persona, knowledge base, appearance, voice, "test your avatar"
- **Experience** — trial, visitor tiers, emails, redirect flows, A/B pricing
- **Leads** — table, CSV export, CRM sync (Zapier / HubSpot / Salesforce by tier)
- **Analytics** — sessions, conversion, retention, benchmarks
- **Billing & Revenue** — platform subscription, Stripe Connect payouts, revenue-share statement
- **Settings** — domain, brand kit, team, integrations, white-label
- **Account** — profile, security, notifications

---

## C. Visitor Avatar Page  `name.livebrand.ai` *(templated, creator-branded — the proven Ethica loop)*

Single-flow, creator-configurable:
1. **Landing / hero** — creator's brand, avatar, welcome message, LIVE pill → `Start free conversation`
2. **Register** — name + email (double opt-in option) → branded confirmation email (Resend)
3. **Live trial** — real-time avatar conversation + countdown timer (default 5 min)
4. **Paywall** — trial-expired screen, visitor subscription tiers (creator-set, $5–$499), optional avatar "pitch"
5. **Checkout** — Stripe → access unlocked
6. **Subscribed** — ongoing access / return sessions
- Persistent: AI-disclosure banner, powered-by-LiveBrand footer badge.

*This is exactly what Ethica does today at `avataragency.ai/ethica/thrive/` — it becomes the templated output of Surface B.*

---

## D. Marketplace  `/gallery` → full directory *(V1 curated → V3 full PLG surface)*

- **D1. Directory home** — browse by category (Real Estate, Finance, Legal, Coaching, Creators…)
- **D2. Category / search results**
- **D3. Twin profile card → live avatar page** (Surface C)
- **D4. "List your twin / become a creator"** cross-sell → sign-up
- Network-effect surface: visitors discover twins → some become creators.

---

## Primary user journeys

1. **Creator acquisition (main funnel):** Ad / LinkedIn / SEO → Homepage **or** Vertical LP → Pricing → `Create your avatar` → Onboarding (B0) → Deploy → Dashboard.
2. **Skeptic / proof path:** Homepage → Gallery **or** Ethica case study → `Talk to a live avatar` → Pricing → sign-up.
3. **Visitor → subscriber (on a creator's page):** Discover (Surface C/D) → Register → 5-min trial → Paywall → Stripe → Subscribed.
4. **Partner / affiliate:** Footer/Partners → Apply → Affiliate or Certified.
5. **Enterprise/Agency:** Vertical (Corporate) or Pricing → `Book a demo` → Contact/sales.

---

## Build phasing (what to design & ship when)

**V1 (launch — style with Claude Design now):**
Homepage · Pricing · How it works · Features · Security · Solutions index + Real Estate + Coaches (2 flagship verticals) · Ethica case study · Gallery (curated) · Blog (index + template) · Legal set · Auth · Onboarding (B0) + Dashboard.

**V2:** Remaining 5 vertical pages · Avatar Builder & Analytics product pages · Integrations · embeddable-widget marketing · full app sections.

**V3:** Full Marketplace (search/profiles) · Partners + LiveBrand Certified · multi-language (ES/FR/PT) · A/B pricing engine surfaces.

---

## Notes for Claude Design (styling handoff)

- **Ground:** white primary; cream for editorial/Resources; black for hero moments/footer or dark-mode.
- **Recurring motifs:** the pulsing LIVE pill, the logo-circle avatar treatment (avatar chips echo the mark), hairline-bordered cards (flat, no shadows except overlays), Fraunces headlines / Inter body / Space Grotesk eyebrows-and-labels.
- **One accent, used sparingly:** Electric Blue `#2E63FF` for primary CTAs, the live dot, focus states — never as a background wash.
- **Every page ends on a `Create your avatar` CTA band.**
- Vertical pages share ONE template (design once, fill seven).
- The visitor avatar page (C) is a distinct, creator-brandable template — design it as a themeable shell, not a fixed look.

### Reference: LINKA Production (linkaproduction.com/agence)

Inspiration for the **editorial, imagery-forward feel** — adopt the mood, keep LiveBrand tokens. What we're borrowing:
- **Full-bleed hero video above the fold** (their signature move) → LiveBrand's close-up-faces-into-avatar-twins montage.
- Editorial vertical pacing, one idea per section, generous whitespace (the Apple-clean side of the brand).
- Imagery as the dominant element; type stays quiet around it.
- **Not** borrowing: portfolio-style low CTA density. LiveBrand keeps SaaS conversion scaffolding (repeated `Create your avatar`, pricing, proof).
- **Logo-over-video solution:** opaque white eyebrow bar at the very top (never float the logo on the video).
