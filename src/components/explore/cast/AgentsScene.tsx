// Bring your own agent: four coworkers peeking over their laptops, each lid
// wearing the agent that person uses, as a die-cut sticker.

import type { ReactNode } from 'react';
import s from './cast.module.css';
import { C, Hand, Head, LaptopLid, Neck, Ol, Sticker, T, sh, skinOf, topOf, type Face, type Who } from './kit';

const W = 260;
const H = 250;
const DESK = 206;

function Shoulders({ who }: { who: Who }) {
  const top = topOf(who);
  return (
    <>
      <Ol fill={top} far={[-8, 0]}>
        <path d="M-14 37 C-36 37 -48 47 -50 68 L-51 120 L51 120 L50 68 C48 47 36 37 14 37 Z" />
      </Ol>
      <Neck skin={skinOf(who)} />
    </>
  );
}

function Tile({ who, name, face, children, peek, extra }: { who: Who; name: string; face: Face; children: ReactNode; peek: number; extra?: ReactNode }) {
  const skin = skinOf(who);
  return (
    <div className={s.tile}>
      <svg viewBox={`0 0 ${W} ${H}`} className={s.art} role="img" aria-label={`${name} peeks over a laptop with ${who === 'lena' ? 'a plain plus sticker for any MCP agent' : 'their coding agent'} stuck on the lid.`}>
        <rect y={DESK} width={W} height={H - DESK} fill={C.wood} />
        <rect y={DESK} width={W} height="6" fill={sh(C.wood, 0.1)} />
        <g transform="translate(130 70) scale(0.86)">
          <g className={s.peek} style={{ animationDelay: `${peek}s` }}>
            <Shoulders who={who} />
            {who === 'lena' && (
              <g>
                <path d="M-27 30 C-31 50 31 50 27 30" fill="none" stroke={C.ink} strokeWidth={7} strokeLinecap="round" />
                <Ol fill={C.violet} w={2.4}>
                  <rect x="-37" y="26" width="15" height="21" rx="7" />
                  <rect x="22" y="26" width="15" height="21" rx="7" />
                </Ol>
              </g>
            )}
            <Head who={who} face={{ ...face, blink: s.blink }} />
          </g>
        </g>
        <LaptopLid x={130} y={DESK} w={184} h={88}>
          {children}
        </LaptopLid>
        {/* Hands resting on the top of the lid. */}
        <Hand kind="fist" skin={skin} x={80} y={DESK - 76} rot={0} className={s.restL} />
        <g className={s.waveHand}>
          <Hand kind="fist" skin={skin} x={180} y={DESK - 76} rot={0} />
        </g>
        {extra}
        <g transform={`translate(130 ${DESK + 20})`}>
          <rect x={-name.length * 5.2 - 14} y="-13" width={name.length * 10.4 + 28} height="26" rx="8" fill={C.white} stroke={C.ink} strokeWidth={2.2} />
          <T x={0} y={6} size={15.5} weight={800} anchor="middle">{name}</T>
        </g>
      </svg>
    </div>
  );
}

export default function AgentsScene() {
  return (
    <div className="grid grid-cols-2">
      <Tile who="priya" name="Priya, Finance" face={{ mouth: 'grin', eyes: 'happy' }} peek={0}>
        <Sticker kind="claude" x={-14} y={0} size={46} rot={-8} />
        <Sticker kind="anchor" x={56} y={-22} size={22} rot={8} />
      </Tile>
      <Tile who="tom" name="Tom, People" face={{ mouth: 'grin', brows: 'up' }} peek={0.75}>
        <Sticker kind="cursor" x={0} y={-1} size={46} rot={-5} peel peelMore={[s.peelA, s.peelB]} />
      </Tile>
      <Tile
        who="sam"
        name="Sam, Legal"
        face={{ mouth: 'smirk', brows: 'raise', look: [1.5, 0] }}
        peek={1.5}
        extra={
          <g className={s.drum}>
            <path d="M172 104 v-7 M180 103 v-8 M188 104 v-7" stroke={C.ink} strokeWidth={2} strokeLinecap="round" opacity={0.7} />
          </g>
        }
      >
        <Sticker kind="codex" x={-12} y={-1} size={46} rot={5} />
        <g transform="translate(52 22) rotate(-7)">
          <rect x="-26" y="-11" width="52" height="22" rx="5" fill={C.sun} stroke={C.ink} strokeWidth={1.8} />
          <T x={0} y={5.5} size={12.5} weight={800} anchor="middle" ls={0.6}>LEGAL</T>
        </g>
      </Tile>
      <Tile who="lena" name="Lena, Engineering" face={{ mouth: 'smile', look: [0, 0] }} peek={2.25}>
        <Sticker kind="plus" x={0} y={-8} size={38} rot={4} />
        <T x={0} y={32} size={13} weight={800} anchor="middle" fill={C.dim} ls={1}>MCP</T>
      </Tile>
    </div>
  );
}
