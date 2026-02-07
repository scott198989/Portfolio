import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        forge: {
          deep: '#0C0A09',
          bg: '#1C1917',
          elevated: '#292524',
          surface: '#44403C',
        },
        accent: {
          DEFAULT: '#F97316',
          hover: '#EA580C',
          glow: '#FB923C',
          subtle: 'rgba(249, 115, 22, 0.12)',
        },
        steel: {
          DEFAULT: '#94A3B8',
          bright: '#CBD5E1',
          accent: '#38BDF8',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'JetBrains Mono', 'monospace'],
        body: ['var(--font-body)', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        lg: '16px',
        md: '12px',
        sm: '10px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'spin-slow': 'spin 20s linear infinite',
        'spin-very-slow': 'spin 30s linear infinite',
        'spin-reverse': 'spin-reverse 15s linear infinite',
        'forge-glow': 'forge-glow 4s ease-in-out infinite',
        'spark': 'spark 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-30px) scale(1.05)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'spin-reverse': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'forge-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(249, 115, 22, 0.15)' },
          '50%': { boxShadow: '0 0 40px rgba(249, 115, 22, 0.3)' },
        },
        'spark': {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(180deg)', opacity: '0' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
