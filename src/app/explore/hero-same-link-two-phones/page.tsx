import HeroFrame from '@/components/home/lab/HeroFrame';
import HeroScene from '@/components/home/lab/Hero_same-link-two-phones';

export const metadata = { title: 'Hero: same link, two people', robots: { index: false, follow: false } };

export default function Page() {
  return <HeroFrame label="Same link, two people" art={<HeroScene />} />;
}
