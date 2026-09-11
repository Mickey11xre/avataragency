#!/usr/bin/env node
/* Minimal static server for local preview of the Cloudflare Pages tree.
 *   node scripts/serve.js [port]      (default 8788)
 * Serves the repo root so /thrivingincollege/... paths match production.
 * Directory URLs resolve to index.html; no functions, no redirects. */
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const PORT = +(process.argv[2] || 8788);
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json',
  '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml', '.pdf': 'application/pdf', '.ico': 'image/x-icon' };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  const file = path.normalize(path.join(ROOT, p));
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) {
      if (!err && st.isDirectory()) { res.writeHead(301, { Location: p + '/' }); return res.end(); }
      res.writeHead(404, { 'Content-Type': 'text/plain' }); return res.end('404 ' + p);
    }
    const ext = path.extname(file).toLowerCase();
    const range = req.headers.range;
    if (range && ext === '.mp4') {                     // <video> seeks need byte ranges
      const [s, e] = range.replace('bytes=', '').split('-'); const start = +s, end = e ? +e : st.size - 1;
      res.writeHead(206, { 'Content-Type': MIME[ext], 'Content-Range': `bytes ${start}-${end}/${st.size}`, 'Accept-Ranges': 'bytes', 'Content-Length': end - start + 1 });
      return fs.createReadStream(file, { start, end }).pipe(res);
    }
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Content-Length': st.size, 'Accept-Ranges': 'bytes' });
    fs.createReadStream(file).pipe(res);
  });
}).listen(PORT, () => console.log('serving ' + ROOT + ' at http://localhost:' + PORT + '/'));
