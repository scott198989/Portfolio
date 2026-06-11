# scott-tuschl.com

Personal portfolio of **Scott Tuschl** — mechatronics engineer building AI systems for the plant floor.

Live at **[scott-tuschl.com](https://www.scott-tuschl.com)**.

## Design

The site is built around an **industrial control-room / HMI** design language: near-black graphite, safety-amber and telemetry-cyan accents, blueprint grid, monospace data readouts, corner-bracketed panels, and an engineering-drawing title block for a footer.

Signature pieces:

- **Bespoke canvas hero** — a seeded, deterministic circuit-trace network with signal pulses flowing along Manhattan-routed paths. Hand-written 2D canvas (no WebGL, no Three.js), DPR-aware, pauses off-screen, renders a static frame under `prefers-reduced-motion`.
- **Command palette** — `Ctrl/⌘ + K` for keyboard-first navigation, live project links, and quick actions (copy email, open resume).
- **Boot sequence panel** — staggered HMI-style init telemetry in the hero.
- **Printable resume** — `/resume` renders a clean paper document straight from the same data files that power the site; `Print / Save PDF` just works.
- **Project lightbox** — filterable project grid with screenshot carousels and a keyboard-driven fullscreen viewer.

## Stack

- [Next.js 15](https://nextjs.org/) (App Router, static export)
- TypeScript · Tailwind CSS · Framer Motion
- Zero heavyweight runtime deps — ~178 kB first-load JS

## Architecture

```
app/          pages, metadata, sitemap/robots, global styles
components/   Nav, CommandPalette, hero/ (canvas sim), projects/, sections/, ui/
data/         single source of truth: profile, projects, experience, capabilities
```

All copy on the site (and the resume) is rendered from `data/*.ts` — update the data, and the site, palette, and printable resume stay in sync.

## Development

```bash
npm install
npm run dev        # dev server
npm run build      # static export to out/
npm run typecheck
```

## Deployment

Pushes to `main` build and deploy to GitHub Pages via `.github/workflows/deploy.yml` (custom domain via `public/CNAME`). The same codebase deploys to Vercel without the static-export flags (`vercel.json`).

## Accessibility

Reduced-motion support across CSS, Framer Motion (`MotionConfig reducedMotion="user"`), and the canvas sim; keyboard-complete navigation (palette, carousels, lightbox); semantic landmarks and a skip link.

---

© Scott Tuschl · Designed & engineered, not templated.
