import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: 'https://wirl.dev', lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: 'https://wirl.dev/terms', lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: 'https://wirl.dev/privacy', lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
