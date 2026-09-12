# The original site, captured 2026-09-11

Dr. Schreiner's live Wix site, all 29 pages from its `pages-sitemap.xml`, captured the day
Stephanie caught the migrated copy having been silently reworded.

- `*.txt` — page copy with the Wix navigation and footer trimmed off. This is what
  `../../check-copy.js` verifies `../data/instruments.json` against.
- `full/*.txt` — the same pages untrimmed. The trim removes the footer, and the footer carries
  real published facts: her address, phone, and **both** published mailboxes,
  `Info@thrivingincollege.org` and `lschreiner@thrivingincollege.org`. Check here before
  concluding that something is unpublished.
- `ALPHA_CONFLICT.md` — the two conflicting sets of per-scale coefficients she publishes today,
  which set we used, and why.

## Why this is in the repo

The instrument copy was reworded during the migration rather than migrated. Nobody asked for
that and nobody noticed for days. The words on a validated instrument's page are checked by
campus research offices against the published literature, so "close enough" is not a standard
that applies here.

Re-capture if she edits the live site. The pages were fetched with a browser user agent; Wix
ships the rendered copy inside the HTML, so `curl` is enough and no browser is needed.
