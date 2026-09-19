import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: 'https://wirl.dev', lastModified: now, changeFrequency: 'weekly', priority: 1 },
  ];
}
