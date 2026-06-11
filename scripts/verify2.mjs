// Follow-up verification: lightbox interaction, reduced-motion visibility, OG capture.
import puppeteer from 'puppeteer-core';
import path from 'node:path';
import os from 'node:os';

const BASE = 'http://localhost:3777';
const OUT = path.join(os.tmpdir(), 'pf-shots');
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  headless: 'shell',
  args: ['--disable-gpu', '--hide-scrollbars'],
});
const page = await browser.newPage();
const errors = [];
page.on('pageerror', (err) => errors.push(`[pageerror] ${err.message}`));

// 1) Lightbox: open via card zoom button, navigate, close with Escape
await page.setViewport({ width: 1600, height: 1000 });
await page.goto(`${BASE}/`, { waitUntil: 'networkidle0' });
await page.evaluate(() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'instant' }));
await wait(2000);
const zoom = await page.$('#projects button[aria-label^="Open"]');
if (!zoom) throw new Error('zoom button not found');
await zoom.click();
await wait(900);
await page.screenshot({ path: path.join(OUT, '15-lightbox.png') });
const dialogOpen = await page.$eval('[role="dialog"]', () => true).catch(() => false);
console.log('lightbox open:', dialogOpen);
await page.keyboard.press('ArrowRight');
await wait(500);
await page.keyboard.press('Escape');
await wait(500);
const dialogClosed = await page.$('[role="dialog"]');
console.log('lightbox closed after Esc:', dialogClosed === null);
const overflowReset = await page.evaluate(() => document.body.style.overflow === '');
console.log('body scroll restored:', overflowReset);

// 2) Reduced motion: hero content must be fully visible
await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
await page.goto(`${BASE}/`, { waitUntil: 'networkidle0' });
await wait(2500);
await page.screenshot({ path: path.join(OUT, '16-reduced-motion.png') });
const visible = await page.evaluate(() => {
  const els = {
    summary: document.querySelector('#home p.mt-6.max-w-xl'),
    cta: document.querySelector('#home a[href="#projects"]'),
    stats: document.querySelector('#home .grid.grid-cols-2.gap-px'),
  };
  const out = {};
  for (const [k, el] of Object.entries(els)) {
    out[k] = el ? Number(getComputedStyle(el.closest('[style]') ?? el).opacity) : 'missing';
    if (el && out[k] === 1) continue;
    if (el) {
      // walk up for any zero-opacity ancestor
      let node = el, minOp = 1;
      while (node && node !== document.body) {
        minOp = Math.min(minOp, Number(getComputedStyle(node).opacity));
        node = node.parentElement;
      }
      out[k] = minOp;
    }
  }
  return out;
});
console.log('reduced-motion opacities (1 = visible):', JSON.stringify(visible));

// 3) OG image: 1200x630 hero, real-time settle
await page.emulateMediaFeatures([]);
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await page.goto(`${BASE}/`, { waitUntil: 'networkidle0' });
await wait(6000); // let boot panel finish + typewriter mid-word
await page.screenshot({ path: 'public/og.png' });
console.log('og.png captured');

console.log(errors.length ? `PAGE ERRORS:\n${errors.join('\n')}` : 'NO PAGE ERRORS');
await browser.close();
