import HeroFrame from '@/components/home/lab/HeroFrame';
import HeroScene from '@/components/home/lab/Hero_the-thread';

export const metadata = { title: 'Hero: Asked at 9:02, linked at 9:14', robots: { index: false, follow: false } };

export default function Page() {
  return <HeroFrame label="Asked at 9:02, linked at 9:14" art={<HeroScene />} />;
}
