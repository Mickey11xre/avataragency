# thriveproject — source of truth

`../index.html` is a **build product**. Do not hand-edit it.

```
_src/
  template.html   <- THE FILE YOU EDIT. 65KB of markup/CSS/JS with __TOKENS__ where assets go.
  config.json     <- FRAME_COUNT, ANCHORS_F, HOLD_TO, OUT_BY
  build.js        <- template + assets + config  ->  ../index.html
  assets/
    frames/000..118.webp   the scroll-scrub sequence (119)
    hires/0..4.webp        full-res stills for the anchor frames
    logo.mp4 / logo.webm / logo-poster.webp
    portrait.webp  twin.webp  speaking.webp
    butterfly.webp         the 9-frame cursor-butterfly sprite strip
```

## Build

```bash
node thriveproject/_src/build.js
```

## Check the deployed file still matches the template

```bash
node thriveproject/_src/build.js --check
```

Exits non-zero if `index.html` has drifted. **Run this before any rebuild.** It is the
guard that would have caught both of the incidents below.

## Why this exists

The page ships as one self-contained ~7.6MB file with every asset inlined as base64.
That is deliberate — see `DEV_HANDOFF.md` — but it makes the deployed file impossible to
review or merge, and it hides drift completely.

Twice, a rebuild from an out-of-tree `template.html` (which lived only in a Cowork
sandbox, never in git) silently reverted work that had been made directly in the
deployed file — including two bugs the client had personally reported and had fixed.
The second time, the incoming build also contained real fixes of its own, so neither
copy could simply be thrown away and the two had to be merged by hand.

That out-of-tree template is now **stale and must not be used**. This directory replaces
it. Everything needed to produce the deployed byte-for-byte lives here, in git.

## Rules

- **Edit `template.html`, never `../index.html`.** A change made to the built file is
  invisible to git review and will be destroyed by the next build.
- **Read and write latin1** if you script against these files. Base64 is ASCII, so a
  latin1 round-trip is lossless; switching to utf8 re-encodes the payloads and corrupts
  them.
- **Replace an asset by dropping in the file and rebuilding** — do not paste base64 into
  the template.
- The token list is fixed by `build.js`. Add a token to the template and you must add it
  to `build.js` or it ships as literal text on the page.

## Note

`_src/` sits inside the served directory, so its files are also reachable at
`/thriveproject/_src/...`. Nothing here is sensitive — every byte is already public
inside `index.html` — but it can be moved out of the deploy if that is ever unwanted.
