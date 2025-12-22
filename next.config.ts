import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Use static export only for GitHub Pages, not for Vercel
  output: process.env.VERCEL ? undefined : 'export',
  images: {
    unoptimized: true,
  },
  basePath: '',
  trailingSlash: true,
  reactStrictMode: true,
  transpilePackages: ['three'],
};

export default nextConfig;
