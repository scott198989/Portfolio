import type { NextConfig } from 'next';

const isVercel = process.env.VERCEL === '1';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Static export for non-Vercel deployments (GitHub Pages)
  ...(isVercel ? {} : {
    output: 'export',
    images: { unoptimized: true },
    trailingSlash: true,
  }),

  // Transpile Three.js packages for better compatibility
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],

  // Optimize for production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Headers for security (Vercel will use vercel.json, this is fallback)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
        ],
      },
    ];
  },
};

export default nextConfig;
