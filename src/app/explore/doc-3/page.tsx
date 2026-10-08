import PageV2 from '@/components/home/v2/PageV2';
import ShareDialog from '@/components/home/v2/ShareDialog';

export const metadata = { title: 'Doc idea 3: the share dialog', robots: { index: false, follow: false } };

// The Doc headline with the share dialog as the hero picture.
export default function Page() {
  return (
    <PageV2
      wide
      h1={'Vibe-code it with [icons]\nShare it like a Google Doc.'}
      line="Your agent deploys it to a link only your company can open."
      art={<ShareDialog stamp="Company-only by default" />}
    />
  );
}
