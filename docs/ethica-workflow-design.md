# Ethica — Registration, Email Confirmation & Payment Workflow Design
**Project:** Ethica — The Fraud Fighter (Prototype for LiveBrand.ai)
**Status:** V1 Live at avataragency.ai/ethica/thrive/
**Last Updated:** July 1, 2026

---

## 1. Vision & Context

Ethica is AvatarAgency's first deployed Digital Twin product — a branded AI avatar ("the fraud fighter") powered by the Napster Companion API. It serves as the **proof of concept and template** for LiveBrand.ai, a future platform that lets any business or professional monetize their name and brand through interactive AI avatars with a fully automated subscription workflow.

The Ethica prototype validates three core product loops:
1. **Visitor → Registered User** (registration + email confirmation)
2. **Free Trial → Subscriber** (5-minute free session → paywall → Stripe checkout)
3. **Subscriber → Ongoing Revenue** (monthly recurring billing via Stripe)

---

## 2. Technical Architecture

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Hosting | Cloudflare Pages | Auto-deploys on `git push origin main` |
| Email API | Resend (resend.com) | Transactional email delivery |
| Email Worker | Cloudflare Worker (`ethica-registration`) | Serverless email handler |
| Payments | Stripe | Subscription billing & payment links |
| Avatar Engine | Napster Companion API | Real-time AI avatar conversations |
| Session Gate | localStorage (`ethica_user`) | Free trial tracking (client-side) |
| Analytics | Google Analytics 4 | Event tracking (sign_up, select_subscription) |

**Key Design Principle:** Everything is serverless. No backend database, no servers to manage. Session state lives in `localStorage`; email is handled by a Cloudflare Worker; payments are handled by Stripe-hosted checkout pages.

---

## 3. Registration Flow

### Entry Point
`/ethica/thrive/register.html`

### Left Panel (Conversion)
- **"Talk to" + ETHICA_LOGO.jpg** — superhero badge replaces word mark
- **"the fraud fighter."** — gold uppercase tagline
- Feature bullets (3 key value props)
- YouTube video embed — teases the avatar experience to drive registration
- Footer with Terms of Service and Privacy Policy links

### Right Panel (Form)
- Sticky form card (`position: sticky; top: 78px`) — stays visible as left panel scrolls
- Fields: Full Name, Email Address, checkbox (Terms + Privacy consent)
- CTA: **"Create Account & Meet Ethica"**

### On Submit
1. Client-side validation (name, email format, checkbox)
2. Writes `ethica_user` object to `localStorage`:
   ```json
   { "name": "", "email": "", "registeredAt": "", "freeUsed": false, "freeSeconds": 300 }
   ```
3. POSTs `{ name, email }` to Cloudflare Worker (non-fatal — modal shows regardless)
4. Fires `gtag('event', 'sign_up', { method: 'email', event_category: 'Ethica' })`
5. Shows **confirmation modal**: *"Check your email for a link to talk to Ethica."*
6. Clicking modal dismisses it and resets form

---

## 4. Email Confirmation System

### Cloudflare Worker: `ethica-registration`
**URL:** `https://ethica-registration.michaelrivera.workers.dev/api/register`
**File:** `workers/ethica-register.js`

### Behavior
- Accepts `POST /api/register` with `{ name, email }`
- Fires two emails in parallel via `Promise.allSettled`:
  1. **Confirmation to user** — "You're in, [FirstName]. Talk to Ethica Now →"
  2. **Notification to admin** — registration data table (Name, Email, Timestamp PT)

### Email Design
- Both emails use table-based HTML (email client safe)
- Dark background `#0b0b0b`, AvatarAgency wordmark, gold `#c9a84c` accents
- Confirmation: white card, gold checkmark circle, gold CTA button
- Notification: clean data table format for quick scanning

### Configuration
| Variable | Value |
|----------|-------|
| `FROM_ADDRESS` | `Ethica @ AvatarAgency <hello@avataragency.ai>` |
| `ADMIN_EMAIL` | `michael@avataragency.ai` |
| `ETHICA_URL` | `https://avataragency.ai/ethica/thrive/` |
| `RESEND_API_KEY` | Secret (Cloudflare Worker → Settings → Variables) |

### Domain Verification
`avataragency.ai` is verified in Resend with DNS records (MX + DKIM + SPF) auto-configured via Cloudflare integration. Emails send from `hello@avataragency.ai` with full authentication.

### CORS
Worker returns `Access-Control-Allow-Origin: https://avataragency.ai` — only the production site can call it.

---

## 5. Free Trial Gate

### 5-Minute Session Timer
File: `/ethica/thrive/index.html`

On `startNapsterAvatar()`:
1. Checks `localStorage` for `ethica_user`
2. If `freeUsed: true` → redirects immediately to `/ethica/thrive/subscribe.html`
3. If registered → starts countdown from remaining seconds (default 300)
4. Timer badge displays below avatar: `"5:00 free remaining"`
5. Color states: default → amber (60s) → red (30s)
6. Saves remaining seconds to `localStorage` every 10s (survives page refresh)
7. At 0: sets `freeUsed: true`, redirects to subscribe page

---

## 6. Subscription / Payment Workflow

### Subscribe Page
`/ethica/thrive/subscribe.html`

**Design:**
- Dark hero with floating Ethica logo animation + gold radial glow
- Wave SVG transition to cream pricing section
- 3-column plan grid

**Plans:**

| Plan | Price | Minutes | CTA |
|------|-------|---------|-----|
| Starter | $9/mo | 60 min | "Get Started" |
| Guardian ⭐ | $19/mo | 200 min | "Become a Guardian" |
| Defender | $39/mo | Unlimited | "Become a Defender" |

**COGs basis:** $0.05/minute (per Real Estate subscription analysis)

### Stripe Integration
- 3 Products created in Stripe dashboard (one per plan)
- Each product generates a **Stripe Payment Link** (hosted checkout page)
- CTA buttons link directly to Stripe Payment Links — no backend needed
- Stripe handles: recurring billing, failed payment retries, invoices, customer portal, payouts

### Post-Payment (Future)
When a user subscribes, Stripe webhook should:
1. Update `ethica_user.freeUsed = false` and set `freeSeconds` based on plan
2. Grant extended session time based on subscription tier
*(Currently manual — webhook integration is V2)*

---

## 7. Legal Pages

Both pages use the same AvatarAgency cream/serif design system.

| Page | URL | Key Content |
|------|-----|-------------|
| Terms of Service | `/terms.html` | 11 sections, covers usage, IP, liability |
| Privacy Policy | `/privacy.html` | 11 sections, GDPR-aligned, covers data collection, retention, rights |

Footer cross-links between both pages. "Back" button uses `history.back()` for seamless UX.

---

## 8. GA4 Event Tracking

| Event | Trigger | Parameters |
|-------|---------|-----------|
| `sign_up` | Successful registration | `method: 'email', event_category: 'Ethica'` |
| `select_subscription` | CTA button click on subscribe page | `plan: 'starter'/'guardian'/'defender'` |

---

## 9. Key Design Decisions & Why

| Decision | Rationale |
|----------|-----------|
| `localStorage` for session state | No backend needed — keeps infrastructure serverless and free |
| Non-fatal Worker call | Email failure never breaks registration UX — modal always shows |
| `position: sticky` on form card | Prevents form from floating to bottom of tall left panel |
| `Promise.allSettled` for emails | Both emails attempt regardless of individual failure |
| Stripe Payment Links (not API) | Zero backend code — Stripe hosts the checkout entirely |
| Redirect on timer expiry (not modal) | Cleaner UX, harder to dismiss, drives conversion |
| Wave SVG transition on subscribe page | Softer visual break between dark hero and light pricing — reduces scroll fatigue |

---

## 10. Known Issues & V2 Roadmap

| Item | Status | Priority |
|------|--------|---------|
| Stripe webhook → unlock session after payment | Pending | High |
| Admin notification 403 on Resend free plan | Fixed (domain verified) | Done |
| Paul Small avatar head crop + controls overlap | Deferred | Medium |
| Napster v2 private-preview access request | Pending | High |
| Delete old Lady Belle stock-voice companion | Pending | Low |
| Post-payment session extension logic | V2 | High |
| User database (replace localStorage) | V2 | High |
| CRM integration (registrant data) | V2 | Medium |

---

## 11. File Map

```
avataragency/
├── ethica/
│   └── napster/
│       ├── index.html          # Avatar page + 5-min timer + paywall redirect
│       ├── register.html       # Registration form + YouTube embed + modal
│       ├── subscribe.html      # 3-tier subscription page
│       └── ETHICA_LOGO.jpg     # Superhero badge logo
├── workers/
│   └── ethica-register.js      # Cloudflare Worker source (deploy manually)
├── terms.html                  # Terms of Service
├── privacy.html                # Privacy Policy
└── docs/
    └── ethica-workflow-design.md  # This document
```

---

*This document serves as the design template for scaling the registration + email + payment workflow to LiveBrand.ai.*
