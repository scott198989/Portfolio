import puppeteer from 'puppeteer-core';
import http from 'http';
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve('./out');
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.txt': 'text/plain', '.xml': 'text/xml', '.json': 'application/json' };

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  let file = path.join(ROOT, p);
  if (!fs.existsSync(file)) {
    if (fs.existsSync(file + '.html')) file = file + '.html';
    else { res.writeHead(404); res.end('nf'); return; }
  }
  res.writeHead(200, { 'content-type': MIME[path.extname(file)] || 'application/octet-stream' });
  res.end(fs.readFileSync(file));
});

await new Promise((r) => server.listen(4173, r));

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
});
const page = await browser.newPage();

const widths = [640, 744, 768, 800, 820, 834, 860, 900, 1024, 1100, 1280];
for (const w of widths) {
  await page.setViewport({ width: w, height: 900 });
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 600));
  const m = await page.evaluate(() => {
    const nav = document.querySelector('header nav');
    const header = document.querySelector('header');
    const items = [...nav.querySelectorAll(':scope > *')].map((el) => {
      const r = el.getBoundingClientRect();
      return { tag: el.tagName, left: Math.round(r.left), right: Math.round(r.right), w: Math.round(r.width) };
    });
    const last = nav.querySelector('div:last-child');
    const lastRect = last.getBoundingClientRect();
    return {
      vw: document.documentElement.clientWidth,
      navScrollW: nav.scrollWidth,
      navClientW: nav.clientWidth,
      headerScrollW: header.scrollWidth,
      docScrollW: document.documentElement.scrollWidth,
      bodyScrollW: document.body.scrollWidth,
      lastRight: Math.round(lastRect.right),
      items,
    };
  });
  console.log(w, JSON.stringify(m));
}

// screenshot the worst case
await page.setViewport({ width: 768, height: 500 });
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 800));
await page.screenshot({ path: 'C:/Users/Scott/AppData/Local/Temp/pf-shots/review-768-nav.png' });
await page.setViewport({ width: 820, height: 500 });
await page.reload({ waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 800));
await page.screenshot({ path: 'C:/Users/Scott/AppData/Local/Temp/pf-shots/review-820-nav.png' });

await browser.close();
server.close();
