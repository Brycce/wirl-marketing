import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { Metadata } from 'next';
import LegalPage from '@/components/home/v2/LegalPage';

// The document lives in the repo as Markdown and is read once at build time.
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Terms of service',
  description: 'The terms that govern the use of Wirl, its tools and the apps hosted on wirl.run.',
  alternates: { canonical: '/terms' },
};

export default async function Page() {
  const markdown = await readFile(path.join(process.cwd(), 'src/content/legal/terms.md'), 'utf8');
  return <LegalPage markdown={markdown} />;
}
