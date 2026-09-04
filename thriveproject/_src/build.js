#!/usr/bin/env node
/* Build thriveproject/index.html from template.html + assets/ + config.json.
 *
 *   node thriveproject/_src/build.js            # writes ../index.html
 *   node thriveproject/_src/build.js --check    # builds to memory and diffs, writes nothing
 *
 * WHY THIS EXISTS
 * The page ships as one self-contained ~7.6MB file with every asset inlined as base64.
 * That is deliberate (see DEV_HANDOFF) but it makes the deployed file unreviewable and
 * unmergeable. Twice now a rebuild from an out-of-tree template silently reverted work
 * that had been made directly in the deployed file. So the template, the assets and this
 * script all live in git, and index.html is a build product you can regenerate and verify.
 *
 * Everything is read and written as latin1 so bytes are preserved exactly; base64 is
 * ASCII, so this round-trips losslessly. Do NOT switch to utf8 - it will re-encode the
 * payloads and corrupt them.
 */
const fs = require('fs');
const path = require('path');

const SRC = __dirname;
const OUT = path.join(SRC, '..', 'index.html');
const CHECK = process.argv.includes('--check');

const cfg = JSON.parse(fs.readFileSync(path.join(SRC, 'config.json'), 'utf8'));
let t = fs.readFileSync(path.join(SRC, 'template.html'), 'latin1');

const uri = (file, mime) =>
  'data:' + mime + ';base64,' + fs.readFileSync(path.join(SRC, 'assets', file)).toString('base64');

// replacement passed as a function so a '$' in any payload can never be read as a
// substitution pattern; each token appears exactly once
function put(token, value) {
  if (!t.includes(token)) { console.error('template is missing ' + token); process.exit(1); }
  t = t.replace(token, () => value);
}

// ---- frame sequence: one file per frame, joined exactly as the original literal ----
const n = parseInt(cfg.FRAME_COUNT, 10);
const frames = [];
for (let i = 0; i < n; i++) frames.push(uri('frames/' + String(i).padStart(3, '0') + '.webp', 'image/webp'));
put('__EMBEDDED__', '[' + frames.map(u => '"' + u + '"').join(', ') + ']');

const hiFiles = fs.readdirSync(path.join(SRC, 'assets', 'hires'))
  .filter(f => f.endsWith('.webp'))
  .sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
put('__HIRES__', '[' + hiFiles.map(f => '"' + uri('hires/' + f, 'image/webp') + '"').join(', ') + ']');

// ---- standalone assets ----
// The hero brand film is the ONE asset not inlined. At 16.4MB it would base64 to ~22MB and
// push index.html to ~29MB - past Cloudflare Pages' 25MB per-file cap, which fails the whole
// site deploy silently. It ships as a sibling file and streams; the poster stays inlined so
// the card renders instantly with no second request.
put('__LOGOVIDEO_MP4__',  'hero.mp4');
put('__LOGOPOSTER__',     uri('hero-poster.jpg', 'image/jpeg'));
put('__PORTRAIT__',       uri('portrait.webp',   'image/webp'));
put('__TWIN__',           uri('twin.webp',       'image/webp'));
put('__SPEAKING__',       uri('speaking.webp',   'image/webp'));
put('__BUTTERFLY__',      uri('butterfly.webp',  'image/webp'));

// ---- scalars ----
put('__FRAME_COUNT__', cfg.FRAME_COUNT);
put('__ANCHORS_F__',   cfg.ANCHORS_F);
put('__HOLD_TO__',     cfg.HOLD_TO);
put('__OUT_BY__',      cfg.OUT_BY);

// a token that survives the build ships as literal text on the page
const leftover = t.match(/__[A-Z_]+__/g);
if (leftover) { console.error('unreplaced tokens: ' + leftover.join(', ')); process.exit(1); }

const built = Buffer.from(t, 'latin1');

if (CHECK) {
  const cur = fs.readFileSync(OUT);
  const same = cur.equals(built);
  console.log('built  : ' + built.length + ' bytes');
  console.log('on disk: ' + cur.length + ' bytes');
  console.log(same ? 'IDENTICAL - template and index.html are in sync'
                   : 'DIFFERS - index.html has drifted from the template');
  process.exit(same ? 0 : 1);
}

fs.writeFileSync(OUT, built);
console.log('wrote ' + OUT + ' (' + built.length + ' bytes, ' + n + ' frames)');
