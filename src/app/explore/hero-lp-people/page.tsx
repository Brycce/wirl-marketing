import HeroFrame from '@/components/home/lab/HeroFrame';
import HeroScene from '@/components/home/lab/Hero_lp-people';

export const metadata = { title: 'Hero: Priya and Tom', robots: { index: false, follow: false } };

export default function Page() {
  return <HeroFrame label="Priya and Tom" art={<HeroScene />} />;
}
