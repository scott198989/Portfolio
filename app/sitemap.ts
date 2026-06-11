import type { MetadataRoute } from 'next';
import { profile } from '@/data/profile';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: profile.site, changeFrequency: 'monthly', priority: 1 },
    { url: `${profile.site}/resume`, changeFrequency: 'monthly', priority: 0.7 },
  ];
}
