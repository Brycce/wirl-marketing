import HeroFrame from '@/components/home/lab/HeroFrame';
import HeroScene from '@/components/home/scenes/Hero';

export const metadata = { title: 'Hero: current', robots: { index: false, follow: false } };

export default function Page() {
  return <HeroFrame label="Current" art={<HeroScene />} />;
}
