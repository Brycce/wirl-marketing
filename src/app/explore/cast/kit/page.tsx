// Temporary: the character kit on one sheet, for judging the drawing. Removed before handing over.
import s from '@/components/explore/cast/cast.module.css';
import { Bust, C, Head, LaptopLid, Mug, Plant, POSE, Sticker, Win, mirror, type Who } from '@/components/explore/cast/kit';

export const metadata = { title: 'Kit', robots: { index: false, follow: false } };

const WHO: Who[] = ['priya', 'jonah', 'mia', 'tom', 'sam', 'lena', 'dana', 'intern', 'jo'];

export default function Kit() {
  return (
    <div className={s.root} style={{ padding: 20 }}>
      <svg viewBox="0 0 1400 260" width="1400" style={{ display: 'block', background: C.sky }}>
        {WHO.map((w, i) => (
          <g key={w} transform={`translate(${80 + i * 150} 110) scale(1.5)`}>
            <Head who={w} face={{ mouth: i % 3 === 0 ? 'grin' : i % 3 === 1 ? 'smile' : 'o', brows: w === 'sam' ? 'raise' : 'calm' }} />
          </g>
        ))}
      </svg>
      <svg viewBox="0 0 1400 330" width="1400" style={{ display: 'block', background: C.mint, marginTop: 10 }}>
        <g transform="translate(110 90)">
          <Bust who="priya" face={{ eyes: 'happy', mouth: 'grin' }} arms={[POSE.tada, mirror(POSE.tada)]} height={130} />
        </g>
        <g transform="translate(300 90)">
          <Bust who="jonah" face={{ brows: 'up', mouth: 'o' }} arms={[POSE.down, mirror(POSE.down)]} height={130} />
          <Mug x={-10} y={110} />
        </g>
        <g transform="translate(470 90)">
          <Bust who="mia" face={{ mouth: 'tongue', brows: 'focus' }} arms={[POSE.thumb]} height={130} />
        </g>
        <g transform="translate(640 90)">
          <Bust who="tom" face={{ mouth: 'smile' }} arms={[POSE.wave]} height={130} />
        </g>
        <g transform="translate(810 90)">
          <Bust who="sam" face={{ mouth: 'smirk', brows: 'raise' }} arms={[mirror(POSE.chest)]} height={130} />
        </g>
        <g transform="translate(980 90)">
          <Bust who="lena" face={{ eyes: 'tired', mouth: 'flat' }} height={130} />
        </g>
        <g transform="translate(1150 90)">
          <Bust who="dana" face={{ mouth: 'smile' }} arms={[POSE.shrug, mirror(POSE.shrug)]} height={130} />
        </g>
        <g transform="translate(1310 90)">
          <Bust who="intern" face={{ mouth: 'grin' }} arms={[POSE.up]} height={130} />
        </g>
      </svg>
      <svg viewBox="0 0 1400 300" width="1400" style={{ display: 'block', background: C.butter, marginTop: 10 }}>
        <g transform="translate(140 120)">
          <Bust who="priya" face={{ mouth: 'smile' }} height={110} />
        </g>
        <LaptopLid x={140} y={260} w={170} h={110}>
          <Sticker kind="claude" x={-22} y={-4} size={44} rot={-8} />
          <Sticker kind="anchor" x={40} y={-22} size={24} rot={6} />
          <Sticker kind="snail" x={38} y={22} size={22} rot={-4} />
        </LaptopLid>
        <LaptopLid x={400} y={260} w={170} h={110}>
          <Sticker kind="cursor" x={0} y={0} size={48} rot={-6} peel /><Sticker kind="plus" x={60} y={-30} size={24} rot={6} />
        </LaptopLid>
        <LaptopLid x={620} y={260} w={170} h={110}>
          <Sticker kind="codex" x={0} y={0} size={48} rot={5} />
        </LaptopLid>
        <Plant x={780} y={260} stage={4} />
        <Plant x={840} y={260} stage={3} />
        <Mug x={900} y={260} kind="it" steam />
        <Win x={960} y={40} w={420} h={200} url="harbor--supplier-payments.wirl.run" />
      </svg>
    </div>
  );
}
