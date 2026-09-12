/* check-copy.js — the guard that stops the 11 Sept failure recurring.
 *
 * Dr. Schreiner's instrument copy was silently reworded during the migration
 * ("measures how far undergraduate students are thriving"), and Stephanie
 * caught it in review four days before launch. The risk was never the prose:
 * it was that the same hand could have altered a reliability coefficient that
 * a campus research office checks against the literature.
 *
 * Run this after ANY edit to instruments.json. It is a drift guard, not a
 * style check — it has no opinion about what the copy should say, only that
 * it must match what Dr. Schreiner publishes.
 *
 *   node check-copy.js     ->  exit 0 clean, exit 1 with the offending strings
 *
 * The archived pages in _src/original-site/ were captured 2026-09-11 from the
 * live Wix site. Re-capture them if she edits it.
 *
 * Prove the restore: every prose string in instruments.json must appear, word
 * for word, in a page captured from the live site. Anything that does not is
 * something we wrote, and it gets named.
 *
 * Normalisation is deliberately narrow — only differences that are pure
 * rendering, never differences in wording:
 *   - the alpha glyph (the site mixes Latin ɑ and Greek α)
 *   - dash flavour (the site mixes –, -- and - inside one list)
 *   - the trademark sign vs the &trade; entity
 *   - whitespace, which Wix splits mid-word ("Institutional Integrit y")
 * A coefficient is checked by proximity to its scale name rather than by a
 * fixed punctuation pattern, because the staff page prints α AFTER the
 * definition while every other page prints it before.
 */
const fs = require('fs'), path = require('path');
const SC = path.join(__dirname, '_src', 'original-site');

// a slug may legitimately draw on more than one source page
const MAP = {
  undergraduate: ['undergradtq'],
  sophomore: ['sophmoreexperiences'],
  'adult-learner': ['adultlearnertq'],
  graduate: ['graduatetq'],
  'community-college': ['ccstudenttq'],
  faculty: ['copy-of-faculty-staff-tq', 'copy-of-faculty-tq_staff-tq'],
  staff: ['copy-of-faculty-tq'],
};

const norm = s => String(s)
  .replace(/[\u0251\u03B1]/g, 'a')
  .replace(/\u2122|&trade;/g, 'TM')
  .replace(/--/g, '-').replace(/[\u2013\u2014]/g, '-')
  .replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
const tight = s => norm(s).replace(/\s+/g, '');   // ignores Wix's mid-word splits

const { instruments } = JSON.parse(fs.readFileSync('_src/data/instruments.json', 'utf8'));
let bad = 0, checked = 0;

for (const inst of instruments) {
  const src = MAP[inst.slug].map(f => fs.readFileSync(path.join(SC, f + '.txt'), 'utf8')).join('\n');
  const N = norm(src), T = tight(src);

  const fail = (label, v) => {
    bad++;
    console.log('MISSING  ' + inst.slug + '  ' + label + '\n         ' + norm(v).slice(0, 110));
  };
  const prose = (label, v) => {
    if (!v || !String(v).trim()) return;
    checked++;
    if (!N.includes(norm(v))) fail(label, v);
  };
  // Try EVERY occurrence of the scale name. The first is usually the capsule's
  // list of the five dimensions, which carries no coefficient; the one that
  // matters is the entry in the numbered list further down.
  const coeff = (label, name, alpha) => {
    if (!alpha) return;
    checked++;
    const want = 'a=' + tight(alpha), key = tight(name);
    for (let i = T.indexOf(key); i > -1; i = T.indexOf(key, i + 1)) {
      if (T.slice(i, i + 420).includes(want)) return;
    }
    fail(label, name + ' a = ' + alpha);
  };

  prose('capsule', inst.capsule);
  prose('scales_intro', inst.scales_intro);
  prose('pathways_intro', inst.pathways_intro);
  prose('closing', inst.closing);
  prose('admin', inst.admin);
  for (const s of inst.scales || []) {
    prose('scale ' + s.name + ' def', s.def);
    prose('scale ' + s.name + ' sample', s.sample);
    coeff('scale ' + s.name + ' a', s.name, s.alpha);
  }
  for (const p of inst.pathways || []) {
    prose('path ' + p.name + ' def', p.def);
    prose('path ' + p.name + ' sample', p.sample);
    coeff('path ' + p.name + ' a', p.name, p.alpha);
  }
  if (inst.alpha) {
    checked++;
    if (!T.includes('a=' + tight(inst.alpha))) fail('overall a', inst.alpha);
  }
}

console.log('\n' + checked + ' strings checked against the archived original, ' + bad + ' not found verbatim');
process.exit(bad ? 1 : 0);
