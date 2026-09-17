/* check-spelling.js — U.S. English on a U.S. site.
 *
 * 17 Sept 2026, the morning after launch: Michael found "programme" on the
 * homepage. Her old Wix site is American throughout (program ×16, behaviors,
 * Center, catalog; not one British form). Every British spelling on the new
 * site was in copy WE wrote: "researcher licence" on eight pages, "research
 * programme", behaviours / centre / organises on the NSSE page, synthesised,
 * analyse. Nobody chose it. No spec set a spelling standard, and check-copy.js
 * only guards her verbatim passages, so our own prose had no check at all.
 *
 * This scans what a VISITOR or a SEARCH ENGINE reads in the built output:
 * page text, attribute text people see (alt, title, aria-label, placeholder,
 * content=), JSON-LD, llms.txt. It ignores <style>, non-JSON-LD <script>,
 * HTML comments and attribute NAMES — `aria-labelledby` is the HTML spec's
 * own spelling and must stay.
 *
 *   node check-spelling.js [dir]   ->  exit 0 clean, exit 1 naming each hit
 *
 * build.js runs it on every build, so a British spelling fails the build
 * instead of shipping. If a word here is ever legitimately British — a
 * quoted book title, an organisation's proper name — add the exact phrase to
 * ALLOW, never delete the word from BRITISH.
 */
const fs = require('fs'), path = require('path');

// British form -> American form. Whole words, case-insensitive.
const BRITISH = {
  programme: 'program', programmes: 'programs',
  licence: 'license', licences: 'licenses',
  behaviour: 'behavior', behaviours: 'behaviors', behavioural: 'behavioral',
  centre: 'center', centres: 'centers', centred: 'centered', centring: 'centering',
  colour: 'color', colours: 'colors', favour: 'favor', favourite: 'favorite',
  honour: 'honor', labour: 'labor', neighbour: 'neighbor', endeavour: 'endeavor',
  humour: 'humor', rumour: 'rumor', vigour: 'vigor', harbour: 'harbor', flavour: 'flavor',
  catalogue: 'catalog', catalogues: 'catalogs', analogue: 'analog',
  metre: 'meter', theatre: 'theater', fibre: 'fiber', litre: 'liter', calibre: 'caliber',
  defence: 'defense', offence: 'offense', pretence: 'pretense',
  analyse: 'analyze', analysed: 'analyzed', analysing: 'analyzing',
  paralyse: 'paralyze', catalyse: 'catalyze',
  judgement: 'judgment', acknowledgement: 'acknowledgment', enrolment: 'enrollment',
  fulfilment: 'fulfillment', fulfil: 'fulfill', enrol: 'enroll', skilful: 'skillful',
  travelled: 'traveled', travelling: 'traveling', modelling: 'modeling', modelled: 'modeled',
  labelled: 'labeled', labelling: 'labeling', cancelled: 'canceled', cancelling: 'canceling',
  counselling: 'counseling', counsellor: 'counselor', levelled: 'leveled', signalled: 'signaled',
  totalled: 'totaled', fuelled: 'fueled', marvellous: 'marvelous', jewellery: 'jewelry',
  focussed: 'focused', benefitted: 'benefited', practise: 'practice (verb)', practised: 'practiced',
  whilst: 'while', amongst: 'among', learnt: 'learned', spelt: 'spelled', cheque: 'check',
  grey: 'gray', ageing: 'aging', sceptical: 'skeptical', enquiry: 'inquiry', enquiries: 'inquiries',
  orientated: 'oriented', 'per cent': 'percent', manoeuvre: 'maneuver', paediatric: 'pediatric',
  mould: 'mold', storey: 'story', draught: 'draft', plough: 'plow',
};

// -ise/-isation/-yse verbs, caught by pattern so new ones are not missed.
// These words genuinely end in -ise in American English too.
const ISE_OK = new Set(('advise advised advises advising advertise advertised advertises advertising ' +
  'arise arises arising chastise circumcise comprise comprised comprises comprising compromise ' +
  'compromised compromises compromising concise demise despise devise devised devises devising ' +
  'disguise disguised enterprise enterprises excise exercise exercised exercises exercising ' +
  'expertise franchise improvise improvised incise merchandise noise otherwise paradise poise ' +
  'praise praised precise premise premises promise promised promises promising raise raised raises ' +
  'raising reprise revise revised revises revising rise rises rising supervise supervised supervises ' +
  'supervising surmise surprise surprised surprises surprising televise treatise turquoise wise ' +
  'likewise clockwise anise cruise bruise porpoise tortoise mortise valise cerise apprise apprised ' +
  'arisen uprise sunrise expertise premised concisely precisely noisy guise elise louise denise')
  .split(/\s+/));
const ISE_RE = /\b[a-z]{3,}(?:is(?:e|es|ed|ing|ation|ations|er|ers)|ys(?:e|es|ed|ing))\b/gi;

// Exact phrases allowed to stay British (proper names, quoted titles).
const ALLOW = [];

const DIR = path.resolve(process.argv[2] || __dirname);
const SKIP_DIRS = new Set(['_src', 'assets', 'node_modules', '.git', 'functions', 'css', 'js']);

function visibleText(html) {
  const ld = [];
  html.replace(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi, (m, j) => { ld.push(j); return m; });
  const attrs = [];
  html.replace(/\s(?:alt|title|aria-label|placeholder|content|data-title)="([^"]*)"/gi, (m, v) => { attrs.push(v); return m; });
  const body = html
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');
  return [body, ...attrs, ...ld].join('\n')
    .replace(/&[a-z]+;|&#\d+;/gi, ' ');
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) walk(path.join(dir, e.name), out); }
    else if (/\.(html|txt|xml)$/i.test(e.name)) out.push(path.join(dir, e.name));
  }
  return out;
}

const words = Object.keys(BRITISH).sort((a, b) => b.length - a.length)
  .map(w => w.replace(/ /g, '\\s+'));
const WORD_RE = new RegExp('\\b(' + words.join('|') + ')\\b', 'gi');

let hits = 0;
const files = walk(DIR).filter(f => !/[\\/]original-site[\\/]|robots\.txt$|sitemap\.xml$/i.test(f));
for (const f of files) {
  let text = fs.readFileSync(f, 'utf8');
  text = /\.html$/i.test(f) ? visibleText(text) : text;
  for (const a of ALLOW) text = text.split(a).join(' ');
  const found = new Map();
  for (const m of text.matchAll(WORD_RE)) {
    const k = m[1].toLowerCase().replace(/\s+/g, ' ');
    found.set(k, (found.get(k) || 0) + 1);
  }
  for (const m of text.matchAll(ISE_RE)) {
    const k = m[0].toLowerCase();
    // un-/re-/pre- on an American -ise word stays American ("unrevised", "reappraised")
    const bare = k.replace(/^(un|re|pre|over|under|mis)/, '');
    if (ISE_OK.has(k) || ISE_OK.has(bare) || BRITISH[k]) continue;
    found.set(k, (found.get(k) || 0) + 1);
  }
  for (const [w, n] of found) {
    hits += n;
    console.log(`${path.relative(DIR, f)}: "${w}" x${n} -> ${BRITISH[w] || 'use the -ize / -yze form'}`);
  }
}

if (hits) {
  console.log(`\ncheck-spelling: ${hits} British spelling(s) in visible text across ${files.length} files. This is a U.S. site — use American spelling.`);
  process.exit(1);
}
console.log(`check-spelling: ${files.length} files, 0 British spellings`);
