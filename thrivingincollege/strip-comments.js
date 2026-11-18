/* Remove HTML comments from served HTML (added 2026-11-18, staged, not deployed).
 *
 * Why: source fragments and templates carry working notes in <!-- --> comments
 * (who asked for what, Gmail thread ids, local file paths, internal review
 * URLs, notification addresses). build.js copied them verbatim into every
 * page, so all of it was readable with View Source on thrivingincollege.org.
 *
 * Rules:
 *  - removes every <!-- ... --> in markup;
 *  - keeps IE conditional comments (<!--[if ...]> / <![endif]-->) if any appear;
 *  - never touches the inside of <script>, <style>, <textarea>, <template>
 *    (JSON-LD and inline JS/CSS are left byte-for-byte as they were);
 *  - a comment that sat alone on its line(s) takes that whole line with it, so
 *    the output has no blank gaps; an inline comment is removed in place.
 * Throws on an unterminated comment rather than guessing.
 */
'use strict';
const RAW = /<(script|style|textarea|template)\b[^>]*>[\s\S]*?<\/\1\s*>/gi;

function stripSegment(s) {
  let out = '', i = 0;
  for (;;) {
    const a = s.indexOf('<!--', i);
    if (a < 0) { out += s.slice(i); break; }
    if (s.startsWith('<!--[if', a)) {           // conditional comment: keep
      const e = s.indexOf('-->', a); if (e < 0) throw new Error('unterminated conditional comment');
      out += s.slice(i, e + 3); i = e + 3; continue;
    }
    const e = s.indexOf('-->', a + 4);
    if (e < 0) throw new Error('unterminated HTML comment at offset ' + a);
    let start = a, end = e + 3;
    // whole-line comment? (only whitespace between previous newline and the comment,
    // and between the comment and the next newline) -> drop the full line(s)
    const ls = s.lastIndexOf('\n', a - 1) + 1;
    let le = s.indexOf('\n', end); if (le < 0) le = s.length;
    const before = s.slice(Math.max(ls, i), a), after = s.slice(end, le);
    if (ls >= i && /^[ \t]*$/.test(before) && /^[ \t\r]*$/.test(after)) {
      start = ls; end = le < s.length ? le + 1 : le;
    }
    out += s.slice(i, start); i = end;
  }
  return out;
}

function stripHtmlComments(html) {
  let out = '', last = 0, m;
  RAW.lastIndex = 0;
  while ((m = RAW.exec(html))) {
    out += stripSegment(html.slice(last, m.index)) + m[0];
    last = m.index + m[0].length;
  }
  return out + stripSegment(html.slice(last));
}

module.exports = { stripHtmlComments };

/* CSS: remove /* ... *\/ comments outside quoted strings. Stylesheets carry
 * the same kind of working notes (names, dates, the /review/ URL). */
function stripCssComments(css) {
  let out = '', i = 0, q = null;
  while (i < css.length) {
    const c = css[i];
    if (q) { out += c; if (c === '\\') { out += css[i + 1] || ''; i += 2; continue; } if (c === q) q = null; i++; continue; }
    if (c === '"' || c === "'") { q = c; out += c; i++; continue; }
    if (c === '/' && css[i + 1] === '*') {
      const e = css.indexOf('*/', i + 2); if (e < 0) throw new Error('unterminated CSS comment');
      // drop a comment that is alone on its line(s) together with the line
      const ls = out.lastIndexOf('\n') + 1;
      let le = css.indexOf('\n', e + 2); if (le < 0) le = css.length;
      if (/^[ \t]*$/.test(out.slice(ls)) && /^[ \t\r]*$/.test(css.slice(e + 2, le))) {
        out = out.slice(0, ls); i = le < css.length ? le + 1 : le;
      } else { i = e + 2; }
      continue;
    }
    out += c; i++;
  }
  return out;
}
module.exports.stripCssComments = stripCssComments;

/* JS: remove // and /* *\/ comments, leaving code byte-for-byte otherwise.
 * Small tokenizer: knows strings, template literals (with ${} nesting) and
 * regex literals, so a "//" or "/*" inside any of them is never touched.
 * Verified 2026-11-18 by comparing the acorn AST of every _src/js file before
 * and after (identical); /*! license comments are kept. */
function stripJsComments(src) {
  let out = '', i = 0; const n = src.length; const tpl = []; // brace depth stack for ${}
  let depth = 0;
  const KW = /(?:^|[^\w$])(return|typeof|case|do|else|in|of|new|delete|void|throw|yield|await|instanceof)$/;
  const regexAllowed = () => {
    const t = out.replace(/\s+$/, '');
    if (!t) return true;
    const c = t[t.length - 1];
    if ('(,=:[!&|?{};+-*%<>~^'.includes(c)) return true;
    return KW.test(t);
  };
  const dropLine = (endIdx) => {             // comment alone on its line -> drop the line
    const ls = out.lastIndexOf('\n') + 1;
    let le = src.indexOf('\n', endIdx); if (le < 0) le = n;
    if (/^[ \t]*$/.test(out.slice(ls)) && /^[ \t\r]*$/.test(src.slice(endIdx, le))) {
      out = out.slice(0, ls); return le < n ? le + 1 : le;
    }
    return endIdx;
  };
  const readQuoted = (q) => { let s = q; i++; while (i < n) { const c = src[i]; s += c; i++; if (c === '\\') { s += src[i] || ''; i++; } else if (c === q) break; } return s; };
  while (i < n) {
    const c = src[i], d = src[i + 1];
    if (c === '"' || c === "'") { out += readQuoted(c); continue; }
    if (c === '`') { out += c; i++; tpl.push(depth); depth = 0;
      // read template chars until ` or ${
      for (;;) { if (i >= n) throw new Error('unterminated template');
        const t = src[i];
        if (t === '\\') { out += t + src[i + 1]; i += 2; continue; }
        if (t === '`') { out += t; i++; depth = tpl.pop(); break; }
        if (t === '$' && src[i + 1] === '{') { out += '${'; i += 2; tpl.push(-1); depth = 0; tpl.push(depth); break; }
        out += t; i++; }
      if (tpl.length && tpl[tpl.length - 1] === 0 && tpl[tpl.length - 2] === -1) { tpl.pop(); tpl.pop(); tpl.push('expr'); depth = 0; }
      continue; }
    if (c === '{') { depth++; out += c; i++; continue; }
    if (c === '}') {
      if (depth === 0 && tpl.length && tpl[tpl.length - 1] === 'expr') { // end of ${ } -> resume template
        tpl.pop(); out += c; i++;
        for (;;) { if (i >= n) throw new Error('unterminated template');
          const t = src[i];
          if (t === '\\') { out += t + src[i + 1]; i += 2; continue; }
          if (t === '`') { out += t; i++; depth = tpl.pop(); break; }
          if (t === '$' && src[i + 1] === '{') { out += '${'; i += 2; tpl.push('expr'); depth = 0; break; }
          out += t; i++; }
        continue; }
      depth--; out += c; i++; continue; }
    if (c === '/' && d === '/') { let e = src.indexOf('\n', i); if (e < 0) e = n; i = dropLine(e); continue; }
    if (c === '/' && d === '*') {
      const e = src.indexOf('*/', i + 2); if (e < 0) throw new Error('unterminated JS comment');
      if (src[i + 2] === '!') { out += src.slice(i, e + 2); i = e + 2; continue; }
      i = dropLine(e + 2); if (i === e + 2 && /[\w$]$/.test(out) && /^[\w$]/.test(src[i] || '')) out += ' ';
      continue; }
    if (c === '/' && regexAllowed()) {       // regex literal
      let s = '/', cls = false; i++;
      while (i < n) { const t = src[i]; s += t; i++;
        if (t === '\\') { s += src[i] || ''; i++; continue; }
        if (t === '[') cls = true; else if (t === ']') cls = false;
        else if (t === '/' && !cls) break;
        else if (t === '\n') throw new Error('unterminated regex'); }
      out += s; continue; }
    out += c; i++;
  }
  return out;
}
module.exports.stripJsComments = stripJsComments;
