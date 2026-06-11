import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        void: 'var(--void)',
        panel: 'var(--panel)',
        raised: 'var(--raised)',
        line: {
          DEFAULT: 'var(--line)',
          bright: 'var(--line-bright)',
        },
        ink: {
          DEFAULT: 'var(--ink)',
          muted: 'var(--ink-muted)',
          faint: 'var(--ink-faint)',
        },
        amber: {
          DEFAULT: 'var(--amber)',
          soft: 'var(--amber-soft)',
        },
        signal: 'var(--signal)',
        ok: 'var(--ok)',
        alert: 'var(--alert)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        'led-pulse': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 6px 1px currentColor' },
          '50%': { opacity: '0.45', boxShadow: '0 0 2px 0 currentColor' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'scroll-cue': {
          '0%': { transform: 'translateY(-100%)' },
          '60%, 100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        'led-pulse': 'led-pulse 2.4s ease-in-out infinite',
        blink: 'blink 1.1s step-end infinite',
        marquee: 'marquee 36s linear infinite',
        'scroll-cue': 'scroll-cue 1.8s cubic-bezier(0.65, 0, 0.35, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
