'use client';

import { useEffect, useRef } from 'react';

/**
 * Bespoke 2D-canvas simulation: a seeded circuit-trace network with signal
 * pulses flowing along Manhattan-routed paths. No WebGL, no dependencies.
 *
 * - Deterministic layout (seeded PRNG) so every visit renders the same board.
 * - Static traces are pre-rendered once to an offscreen layer; per frame we
 *   only blit + draw pulse sprites with additive blending.
 * - Pauses when offscreen or tab-hidden; renders a static frame under
 *   prefers-reduced-motion.
 */

const GRID = 36;
const SEED = 0x5c077; // "SCOTT"
const TRACE_COLOR = 'rgba(152, 157, 168, 0.14)';
const PAD_COLOR = 'rgba(152, 157, 168, 0.38)';
const PULSE_COLORS = ['#ffb300', '#ffb300', '#3ad1e8']; // amber-weighted

interface Pt {
  x: number;
  y: number;
}

interface Trace {
  pts: Pt[];
  segLens: number[];
  total: number;
}

interface Pulse {
  trace: number;
  dist: number;
  speed: number;
  sprite: number;
  size: number;
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function genTraces(w: number, h: number, rng: () => number): Trace[] {
  const cols = Math.max(4, Math.floor(w / GRID));
  const rows = Math.max(4, Math.floor(h / GRID));
  const count = Math.min(34, Math.max(12, Math.round((w * h) / 36000)));
  const traces: Trace[] = [];

  for (let i = 0; i < count; i++) {
    let x = (1 + Math.floor(rng() * (cols - 2))) * GRID;
    let y = (1 + Math.floor(rng() * (rows - 2))) * GRID;
    const pts: Pt[] = [{ x, y }];
    let dir = Math.floor(rng() * 4); // 0:E 1:S 2:W 3:N
    const segs = 3 + Math.floor(rng() * 5);

    for (let s = 0; s < segs; s++) {
      const len = (2 + Math.floor(rng() * 5)) * GRID;
      let nx = x;
      let ny = y;
      if (dir === 0) nx += len;
      else if (dir === 2) nx -= len;
      else if (dir === 1) ny += len;
      else ny -= len;
      nx = Math.min(Math.max(nx, GRID), (cols - 1) * GRID);
      ny = Math.min(Math.max(ny, GRID), (rows - 1) * GRID);
      if (nx !== x || ny !== y) {
        pts.push({ x: nx, y: ny });
        x = nx;
        y = ny;
      }
      dir = (dir + (rng() < 0.5 ? 1 : 3)) % 4;
    }

    if (pts.length < 2) continue;
    const segLens: number[] = [];
    let total = 0;
    for (let p = 1; p < pts.length; p++) {
      const d = Math.abs(pts[p].x - pts[p - 1].x) + Math.abs(pts[p].y - pts[p - 1].y);
      segLens.push(d);
      total += d;
    }
    traces.push({ pts, segLens, total });
  }
  return traces;
}

function pointAt(trace: Trace, dist: number): Pt {
  let d = Math.min(Math.max(dist, 0), trace.total);
  for (let i = 0; i < trace.segLens.length; i++) {
    if (d <= trace.segLens[i]) {
      const a = trace.pts[i];
      const b = trace.pts[i + 1];
      const t = trace.segLens[i] === 0 ? 0 : d / trace.segLens[i];
      return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
    }
    d -= trace.segLens[i];
  }
  return trace.pts[trace.pts.length - 1];
}

function makeSprite(color: string): HTMLCanvasElement {
  const r = 16;
  const c = document.createElement('canvas');
  c.width = c.height = r * 2;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(r, r, 0, r, r, r);
  grad.addColorStop(0, color);
  grad.addColorStop(0.25, color);
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, r * 2, r * 2);
  return c;
}

export function HeroCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let traces: Trace[] = [];
    let pulses: Pulse[] = [];
    let staticLayer: HTMLCanvasElement | null = null;
    let sprites: HTMLCanvasElement[] = [];
    let raf = 0;
    let running = false;
    let inView = true;
    let last = 0;
    let dpr = 1;
    let w = 0;
    let h = 0;

    const buildStatic = () => {
      staticLayer = document.createElement('canvas');
      staticLayer.width = Math.max(1, Math.round(w * dpr));
      staticLayer.height = Math.max(1, Math.round(h * dpr));
      const g = staticLayer.getContext('2d')!;
      g.scale(dpr, dpr);
      g.lineWidth = 1;
      g.lineJoin = 'miter';
      g.strokeStyle = TRACE_COLOR;
      for (const tr of traces) {
        g.beginPath();
        g.moveTo(tr.pts[0].x, tr.pts[0].y);
        for (let i = 1; i < tr.pts.length; i++) g.lineTo(tr.pts[i].x, tr.pts[i].y);
        g.stroke();
        // pads at the endpoints, like component pins
        g.fillStyle = PAD_COLOR;
        for (const p of [tr.pts[0], tr.pts[tr.pts.length - 1]]) {
          g.fillRect(p.x - 2, p.y - 2, 4, 4);
        }
      }
    };

    const init = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);

      const rng = mulberry32(SEED);
      traces = genTraces(w, h, rng);
      sprites = PULSE_COLORS.map(makeSprite);
      pulses = [];
      const pulseCount = Math.round(traces.length * 1.5);
      for (let i = 0; i < pulseCount; i++) {
        const trace = Math.floor(rng() * traces.length);
        pulses.push({
          trace,
          dist: rng() * traces[trace].total,
          speed: 36 + rng() * 80,
          sprite: Math.floor(rng() * sprites.length),
          size: 4.5 + rng() * 3.5,
        });
      }
      buildStatic();
    };

    const drawStaticFrame = () => {
      if (!staticLayer) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(staticLayer, 0, 0);
    };

    const frame = (now: number) => {
      if (!running) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      drawStaticFrame();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = 'lighter';

      const TAIL_STEPS = 9;
      const TAIL_GAP = 7;
      for (const p of pulses) {
        const tr = traces[p.trace];
        p.dist += p.speed * dt;
        if (p.dist > tr.total + TAIL_STEPS * TAIL_GAP) p.dist = -TAIL_STEPS * TAIL_GAP;
        const sprite = sprites[p.sprite];
        for (let k = 0; k <= TAIL_STEPS; k++) {
          const d = p.dist - k * TAIL_GAP;
          if (d < 0 || d > tr.total) continue;
          const pt = pointAt(tr, d);
          const fade = 1 - k / (TAIL_STEPS + 1);
          const size = p.size * (k === 0 ? 1.6 : fade);
          ctx.globalAlpha = (k === 0 ? 0.9 : 0.32) * fade;
          ctx.drawImage(sprite, pt.x - size, pt.y - size, size * 2, size * 2);
        }
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const sync = () => {
      if (inView && !document.hidden) start();
      else stop();
    };

    init();
    drawStaticFrame();
    if (reduceMotion) {
      // a static frame with a few resting pulses so the board isn't empty
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      for (const p of pulses.slice(0, 10)) {
        const pt = pointAt(traces[p.trace], p.dist);
        ctx.globalAlpha = 0.8;
        ctx.drawImage(sprites[p.sprite], pt.x - p.size, pt.y - p.size, p.size * 2, p.size * 2);
      }
      ctx.globalAlpha = 1;
    } else {
      start();
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const onVis = () => sync();
    document.addEventListener('visibilitychange', onVis);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        stop();
        init();
        drawStaticFrame();
        sync();
      }, 150);
    });
    ro.observe(canvas);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      clearTimeout(resizeTimer);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
