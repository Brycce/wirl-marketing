import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: 'https://wirl.dev', lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: 'https://wirl.dev/docs', lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
  ];
}
