// Visual verification: drives headless Edge over the static export and
// captures desktop/mobile screenshots of every section, plus console errors.
import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const BASE = process.env.SHOT_BASE ?? 'http://localhost:3777';
const OUT = path.join(os.tmpdir(), 'pf-shots');
mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  headless: 'shell',
  args: ['--disable-gpu', '--hide-scrollbars'],
});

const errors = [];
const page = await browser.newPage();
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(`[console] ${msg.text()}`);
});
page.on('pageerror', (err) => errors.push(`[pageerror] ${err.message}`));

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function shoot(name, url, { width = 1600, height = 1000, settle = 3500, scrollTo } = {}) {
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  if (scrollTo) {
    await page.evaluate((sel) => {
      document.querySelector(sel)?.scrollIntoView({ behavior: 'instant', block: 'start' });
    }, scrollTo);
  }
  await wait(settle);
  await page.screenshot({ path: path.join(OUT, `${name}.png`) });
  console.log(`shot: ${name}`);
}

await shoot('01-hero', `${BASE}/`);
await shoot('02-about', `${BASE}/`, { scrollTo: '#about' });
await shoot('03-capabilities', `${BASE}/`, { scrollTo: '#capabilities' });
await shoot('04-projects', `${BASE}/`, { scrollTo: '#projects' });
await shoot('05-experience', `${BASE}/`, { scrollTo: '#experience' });
await shoot('06-stack', `${BASE}/`, { scrollTo: '#stack' });
await shoot('07-contact', `${BASE}/`, { scrollTo: '#contact' });
await shoot('08-footer', `${BASE}/`, { scrollTo: 'footer' });
await shoot('09-resume', `${BASE}/resume/`);
await shoot('10-404', `${BASE}/nope/`);
await shoot('11-mobile-hero', `${BASE}/`, { width: 390, height: 844 });
await shoot('12-mobile-projects', `${BASE}/`, { width: 390, height: 844, scrollTo: '#projects' });

// command palette open
await page.setViewport({ width: 1600, height: 1000 });
await page.goto(`${BASE}/`, { waitUntil: 'networkidle0' });
await wait(2500);
await page.keyboard.down('Control');
await page.keyboard.press('KeyK');
await page.keyboard.up('Control');
await wait(600);
await page.screenshot({ path: path.join(OUT, '13-palette.png') });
console.log('shot: 13-palette');

// lightbox open (click first project image)
await page.evaluate(() => {
  document.querySelector('#projects')?.scrollIntoView({ behavior: 'instant' });
});
await wait(1500);
const zoomBtn = await page.$('#projects button[aria-label^="Open"]');
if (zoomBtn) {
  await zoomBtn.click();
  await wait(800);
  await page.screenshot({ path: path.join(OUT, '14-lightbox.png') });
  console.log('shot: 14-lightbox');
} else {
  console.log('WARN: no lightbox trigger found');
}

console.log(errors.length ? `CONSOLE ERRORS:\n${errors.join('\n')}` : 'NO CONSOLE ERRORS');
await browser.close();
