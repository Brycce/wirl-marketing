import PageV2 from '@/components/home/v2/PageV2';

export const metadata = { title: 'Doc idea 2: the headline', robots: { index: false, follow: false } };

// The Doc idea as the headline itself.
export default function Page() {
  return (
    <PageV2
      wide
      h1={'Vibe-code it with [icons]\nShare it like a Google Doc.'}
      line="Your agent deploys it to a link. Everyone at your company opens it with their work account, and you choose who else gets in."
    />
  );
}
