import PageV2 from '@/components/home/v2/PageV2';

export const metadata = { title: 'Doc idea 1: just the line', robots: { index: false, follow: false } };

// Same headline as live; only the line under it changes.
export default function Page() {
  return <PageV2 line="Share the tools you vibe-code like you share a Google Doc." />;
}
