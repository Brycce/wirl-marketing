import HeroFrame from '@/components/home/lab/HeroFrame';
import HeroScene from '@/components/home/lab/Hero_lp-gate';

export const metadata = { title: 'Hero: laptop, link, two people', robots: { index: false, follow: false } };

export default function Page() {
  return <HeroFrame label="Laptop, link, two people" art={<HeroScene />} />;
}
