import HeroFrame from '@/components/home/lab/HeroFrame';
import HeroScene from '@/components/home/lab/Hero_ships-and-shows-up';

export const metadata = { title: 'Hero: Priya ships, the admin sees it', robots: { index: false, follow: false } };

export default function Page() {
  return <HeroFrame label="Priya ships, the admin sees it" art={<HeroScene />} />;
}
