import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

const port = Number(process.env.PORT || 4173);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PORT invalide.');
const assets = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/index.html', ['index.html', 'text/html; charset=utf-8']],
  ['/styles.css', ['styles.css', 'text/css; charset=utf-8']],
  ['/app.js', ['app.js', 'text/javascript; charset=utf-8']]
]);

createServer(async (request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    return response.end();
  }
  let pathname;
  try { pathname = new URL(request.url, 'http://localhost').pathname; }
  catch { response.writeHead(400); return response.end(); }
  const asset = assets.get(pathname);
  if (!asset) { response.writeHead(404); return response.end('Page introuvable.'); }
  try {
    const data = await readFile(new URL(`./dist/${asset[0]}`, import.meta.url));
    response.writeHead(200, {
      'Content-Type': asset[1],
      'Content-Length': data.length,
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff'
    });
    response.end(request.method === 'HEAD' ? undefined : data);
  } catch { response.writeHead(500); response.end('Le fichier demandé est indisponible.'); }
}).listen(port, '127.0.0.1', () => console.log(`NSI : http://127.0.0.1:${port}/`));
