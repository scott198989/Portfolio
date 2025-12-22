import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Use static export only for GitHub Pages, not for Vercel
  output: process.env.VERCEL ? undefined : 'export',
  // Only unoptimize images for static export
  images: process.env.VERCEL ? undefined : {
    unoptimized: true,
  },
  // Only use basePath and trailingSlash for static export
  basePath: process.env.VERCEL ? undefined : '',
  trailingSlash: process.env.VERCEL ? undefined : true,
  reactStrictMode: true,
  transpilePackages: ['three'],
};

export default nextConfig;
