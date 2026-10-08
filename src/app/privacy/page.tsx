import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { Metadata } from 'next';
import LegalPage from '@/components/home/v2/LegalPage';

// The document lives in the repo as Markdown and is read once at build time.
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: 'What Wirl collects, why, who handles it, how long it is kept, and how to ask for it to be deleted.',
  alternates: { canonical: '/privacy' },
};

export default async function Page() {
  const markdown = await readFile(path.join(process.cwd(), 'src/content/legal/privacy.md'), 'utf8');
  return <LegalPage markdown={markdown} />;
}
