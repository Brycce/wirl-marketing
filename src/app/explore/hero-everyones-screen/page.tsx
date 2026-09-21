import HeroFrame from '@/components/home/lab/HeroFrame';
import HeroScene from '@/components/home/lab/Hero_everyones-screen';

export const metadata = { title: 'Hero: everyone’s screen', robots: { index: false, follow: false } };

export default function Page() {
  return <HeroFrame label="Everyone’s screen" art={<HeroScene />} />;
}
