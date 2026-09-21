import HeroFrame from '@/components/home/lab/HeroFrame';
import HeroScene from '@/components/home/lab/Hero_her-laptop-his-phone';

export const metadata = { title: 'Hero: her laptop, his phone', robots: { index: false, follow: false } };

export default function Page() {
  return <HeroFrame label="Her laptop, his phone" art={<HeroScene />} />;
}
