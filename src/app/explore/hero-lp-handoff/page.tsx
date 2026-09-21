import HeroFrame from '@/components/home/lab/HeroFrame';
import HeroScene from '@/components/home/lab/Hero_lp-handoff';

export const metadata = { title: 'Hero: the agent hands it over', robots: { index: false, follow: false } };

export default function Page() {
  return <HeroFrame label="The agent hands it over" art={<HeroScene />} />;
}
