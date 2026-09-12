# The two conflicting sets of α values, resolved

Captured from the live site 2026-09-11. This is the conflict the "Awaiting Dr. Schreiner"
box on every instrument page was describing. Both sets are published right now.

## The conflict

| Scale | `/undergradtq` (instrument page) | `/surveys` and `/studentsurveys` |
|---|---|---|
| Engaged Learning | **.87** | .85 |
| Academic Determination | **.84** | .83 |
| Positive Perspective | **.78** | .83 |
| Social Connectedness | **.83** | 81 ← printed with no decimal point |
| Diverse Citizenship | **.79** | .80 |
| Overall TQ | .89 | .89 — agrees |

## Decision taken in-house, per the 11 Sept directive not to wait on Dr. Schreiner

**Use the instrument-page values.** Reasons:

1. They sit on the instrument's own page, which is the page being rebuilt.
2. They vary correctly per instrument. Adult Learner and Graduate carry their own distinct
   sets, which is what per-instrument coefficients look like. The `/surveys` set does not vary.
3. The `/surveys` set is the generic "the TQ" figure from the original validation study across
   92 institutions, and one of its five values is typographically broken (`81`).

Both sets are recorded here so Dr. Schreiner can confirm in one line rather than research it.
Nothing is invented: every number on the rebuilt site is copied from a page she publishes today.

## Other source conflicts found in the same pass

- `/surveys` says the TQ "was developed over a period of five years"; `/studentsurveys` says it
  "was developed in 2005". Same paragraph otherwise.
- `/surveys` calls her "Professor of Higher Education"; `/studentsurveys` says "Professor
  Emerita". Emerita is current and is used elsewhere on the site, so the newer page wins.
- `/studentsurveys` lists "family support" among the additional scales; `/surveys` omits it.
- The Spirituality sample item genuinely differs by instrument. Undergraduate uses "My spiritual
  or religious beliefs provide me with a sense of strength when life is difficult." The Sophomore
  Experiences Survey uses "My spiritual or religious beliefs are a source of meaning and purpose
  in my life." This answers the 1 Sept architecture question about whether spirituality wording
  should be standardised: it should not.
- Two faculty pages exist. `/copy-of-faculty-staff-tq` is the full FTQ with 21 items, per-scale
  α and the three pathways. `/copy-of-faculty-tq/staff-tq` is a shorter, older FTQ page with
  sample items but no per-scale α. The full page is the source.
- `/copy-of-faculty-tq` is titled **Staff** Thriving Quotient, not Faculty. The faculty and staff
  URLs are crossed on the live site, which is already in the 301 ledger.
- The Community College instrument publishes **no** coefficients of its own. Its page says only
  that it "contains the same scales as the original Thriving Quotient, but its items have been
  adapted". Its α values therefore stay unpublished, correctly.
