import HeroFrame from '@/components/home/lab/HeroFrame';
import HeroScene from '@/components/home/lab/Hero_the-agents-reply';

export const metadata = { title: "Hero: the agent's reply", robots: { index: false, follow: false } };

export default function Page() {
  return <HeroFrame label="The agent's reply" art={<HeroScene />} />;
}
