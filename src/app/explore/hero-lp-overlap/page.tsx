import HeroFrame from '@/components/home/lab/HeroFrame';
import HeroScene from '@/components/home/lab/Hero_lp-overlap';

export const metadata = { title: 'Hero: bigger and fewer', robots: { index: false, follow: false } };

export default function Page() {
  return <HeroFrame label="Bigger and fewer" art={<HeroScene />} />;
}
