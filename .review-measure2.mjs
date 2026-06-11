import puppeteer from 'puppeteer-core';
import http from 'http';
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve('./out');
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.ico': 'image/x-icon' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  let file = path.join(ROOT, p);
  if (!fs.existsSync(file)) { if (fs.existsSync(file + '.html')) file += '.html'; else { res.writeHead(404); res.end(); return; } }
  res.writeHead(200, { 'content-type': MIME[path.extname(file)] || 'application/octet-stream' });
  res.end(fs.readFileSync(file));
});
await new Promise((r) => server.listen(4174, r));

const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });
await page.goto('http://localhost:4174/', { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 500));

const marquee = await page.evaluate(() => {
  const track = document.querySelector('.animate-marquee');
  if (!track) return null;
  const spans = [...track.children];
  const n = spans.length / 2;
  const r0 = spans[0].getBoundingClientRect();
  const rn = spans[n].getBoundingClientRect();
  const w = track.getBoundingClientRect().width;
  return { trackWidth: w, half: w / 2, period: rn.left - r0.left, children: spans.length };
});
console.log('marquee:', JSON.stringify(marquee));

// mobile menu height check at landscape phone
await page.setViewport({ width: 740, height: 360 });
await page.reload({ waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 400));
await page.click('header button[aria-label="Open menu"]');
await new Promise((r) => setTimeout(r, 600));
const menu = await page.evaluate(() => {
  const header = document.querySelector('header');
  const hr = header.getBoundingClientRect();
  const lastLink = header.querySelector('ul li:last-child a');
  const lr = lastLink ? lastLink.getBoundingClientRect() : null;
  return { headerBottom: hr.bottom, viewportH: window.innerHeight, lastLinkBottom: lr ? lr.bottom : null, bodyOverflow: document.body.style.overflow };
});
console.log('menuLandscape:', JSON.stringify(menu));
await page.screenshot({ path: 'C:/Users/Scott/AppData/Local/Temp/pf-shots/review-landscape-menu.png' });

await browser.close();
server.close();
