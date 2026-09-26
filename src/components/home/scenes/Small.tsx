// Small sticker sets: Acme's seven apps for the closing slab, and the row of
// round badges that previews the built-in features.

import type { ReactNode } from 'react';
import { K, DieCut, Avatar, Padlock } from '../kit';
import { night } from '../css';

/* Night, for the index badges and the closing band here, the admin band
   (Admin.tsx), the connect block (Connect.tsx) and the waitlist form
   (Waitlist.tsx). See NIGHT in css.ts for the approach. Checked at 1440, 1024
   and 390: the admin table and log stay lit screens, the connect block and
   the app stickers read as they are, and the chrome tokens already carry the
   rest. Two things needed a hand:
   - The Keys badge is ink, the one badge whose face is the colour of the
     night page, so inside its paper ring it read as a hole punched through
     the sticker. It takes a lifted ink, the way the ink band is lifted.
   - The waitlist button is ink by day because its band is sun yellow. At
     night the band is a dark tint, so the button takes the sun yellow every
     other call to action on the night page wears. Waitlist.tsx is a client
     component and can't import css.ts, so its rule lives in this sheet,
     which the closing stickers beside it always render.
   One string under one href, so React hoists it once however many of these
   are on the page. */
const NIGHT_ADMIN_CLOSING = night(String.raw`
.tbx .tb-n-keys { fill: #2F3D36; }
.tbx .tb-wl-go { background: var(--sun); color: var(--ink); }
`);

/* Render outside any <svg>: React only hoists a <style> into <head> from HTML. */
export function AdminClosingNight() {
  return <style href="tb-dark-admin-closing" precedence="default">{NIGHT_ADMIN_CLOSING}</style>;
}

/* ---------- Acme's apps, each a little window sticker behind the lock ---------- */
/* lockLeft: in the closing slab's wide pile each tile is dealt down and to one
   side, so the tile below covers whichever bottom corner it lands on. The two
   tiles whose neighbour lands bottom-right wear their lock bottom-left, so no
   lock is ever sliced in half. */
type AppSticker = { name: string; bar: string; barText: string; tilt: number; lockLeft?: boolean; inner: ReactNode };

const bars = (x: number, y: number, ws: number[], gap = 13) =>
  ws.map((w, i) => <rect key={i} x={x} y={y + i * gap} width={w} height={7} rx={3.5} fill={K.edge} />);

export const APPS: AppSticker[] = [
  {
    name: 'customer-credits', bar: K.coral, barText: K.ink, tilt: -7, lockLeft: true,
    inner: (
      <g>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={20} y={48 + i * 20} width={130} height={14} rx={5} fill={K.wash} />
            <rect x={26} y={52 + i * 20} width={[52, 40, 60][i]} height={6} rx={3} fill={K.edge} />
            <rect x={118} y={51 + i * 20} width={26} height={8} rx={4} fill={K.coral} />
          </g>
        ))}
      </g>
    ),
  },
  {
    name: 'candidate-pipeline', bar: K.lilac, barText: K.ink, tilt: 5,
    inner: (
      <g>
        {[0, 1, 2].map((c) => (
          <g key={c}>
            <rect x={18 + c * 46} y={46} width={40} height={60} rx={6} fill={K.wash} />
            {Array.from({ length: 3 - c }, (_, j) => (
              <rect key={j} x={22 + c * 46} y={51 + j * 17} width={32} height={13} rx={3} fill={K.paper} stroke={K.ink} strokeWidth={1.4} />
            ))}
          </g>
        ))}
      </g>
    ),
  },
  {
    name: 'budget-lines', bar: K.sun, barText: K.ink, tilt: -4, lockLeft: true,
    inner: (
      <g>
        {[30, 48, 22, 58, 40, 66].map((h, i) => (
          <rect key={i} x={24 + i * 21} y={106 - h} width={14} height={h} rx={3} fill={i === 5 ? K.green : K.sky} stroke={K.ink} strokeWidth={1.6} />
        ))}
        <path d="M18 107 H152" stroke={K.ink} strokeWidth={2} />
      </g>
    ),
  },
  {
    name: 'nda-lookup', bar: K.mint, barText: K.ink, tilt: 6,
    inner: (
      <g>
        <rect x={20} y={46} width={130} height={18} rx={9} fill={K.wash} stroke={K.ink} strokeWidth={1.6} />
        <circle cx={32} cy={55} r={4} fill="none" stroke={K.ink} strokeWidth={1.6} />
        <path d="M35 58 L38 61" stroke={K.ink} strokeWidth={1.6} />
        {bars(22, 74, [96, 70, 110], 12)}
      </g>
    ),
  },
  {
    name: 'supplier-payments', bar: K.green, barText: K.paper, tilt: 4,
    inner: (
      <g>
        {bars(20, 48, [110, 84, 98], 14)}
        <rect x={98} y={91} width={52} height={17} rx={8.5} fill={K.green} stroke={K.ink} strokeWidth={1.6} />
      </g>
    ),
  },
  {
    name: 'incident-handover', bar: K.pink, barText: K.ink, tilt: -6,
    inner: (
      <g>
        {[0, 1].map((i) => (
          <g key={i}>
            <rect x={20} y={46 + i * 28} width={36} height={6} rx={3} fill={K.edge} />
            <rect x={20} y={55 + i * 28} width={130} height={14} rx={5} fill={K.paper} stroke={K.ink} strokeWidth={1.4} />
          </g>
        ))}
      </g>
    ),
  },
  {
    name: 'spend-requests', bar: K.sky, barText: K.ink, tilt: 7,
    inner: (
      <g>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={20} y={48 + i * 20} width={62} height={7} rx={3.5} fill={K.edge} />
            <circle cx={128} cy={51.5 + i * 20} r={6} fill={i === 1 ? K.sun : K.green} stroke={K.ink} strokeWidth={1.4} />
            <circle cx={144} cy={51.5 + i * 20} r={6} fill={K.wash} stroke={K.ink} strokeWidth={1.4} />
          </g>
        ))}
      </g>
    ),
  },
];

export function AppStickerArt({ app }: { app: AppSticker }) {
  const lx = app.lockLeft ? 20 : 150;
  return (
    <>
      <AdminClosingNight />
      <svg viewBox="0 0 172 132" className="tb-art" aria-hidden="true" strokeLinecap="round" strokeLinejoin="round">
        <DieCut tilt={app.tilt} cx={86} cy={66} cut={<><rect x={10} y={10} width={150} height={104} rx={12} /><circle cx={lx} cy={106} r={16} /></>} border={7}>
          <rect x={10} y={10} width={150} height={104} rx={12} fill={K.paper} stroke={K.ink} strokeWidth={2.5} />
          <path d={`M10 36 V22 A12 12 0 0 1 22 10 H148 A12 12 0 0 1 160 22 V36 Z`} fill={app.bar} />
          <path d="M10 36 H160" stroke={K.ink} strokeWidth={2} />
          <text className="mono" x={19} y={28.5} fontSize={12.6} fontWeight={700} fill={app.barText}>{app.name}</text>
          {app.inner}
          <rect x={10} y={10} width={150} height={104} rx={12} fill="none" stroke={K.ink} strokeWidth={2.5} />
          <circle cx={lx} cy={106} r={15} fill={K.green} stroke={K.ink} strokeWidth={2.5} />
          <g transform={`translate(${lx} 106)`}>
            <path d="M-3.6 -1.6 V-4 A3.6 3.6 0 0 1 3.6 -4 V-1.6" fill="none" stroke={K.paper} strokeWidth={2.2} />
            <rect x={-5.6} y={-2} width={11.2} height={8.6} rx={2} fill={K.paper} />
          </g>
        </DieCut>
      </svg>
    </>
  );
}

/* ---------- The built-in features, as a row of round badges ---------- */
/* faceClass goes on the coloured face, for night mode. */
function Badge({ fill, tilt, faceClass, children }: { fill: string; tilt: number; faceClass?: string; children: ReactNode }) {
  return (
    <>
      <AdminClosingNight />
      <svg viewBox="-40 -40 80 80" className="tb-art" aria-hidden="true" strokeLinecap="round" strokeLinejoin="round">
        <g filter="url(#tb-stk)">
          <g transform={`rotate(${tilt})`}>
            <circle r={34} fill={K.paper} />
            <circle className={faceClass} r={28} fill={fill} stroke={K.ink} strokeWidth={2.5} />
            {children}
          </g>
        </g>
      </svg>
    </>
  );
}

export const FEATURE_BADGES: { href: string; label: string; art: ReactNode }[] = [
  {
    href: '#signin', label: 'Sign-in',
    art: <Badge fill={K.sky} tilt={-6}><Avatar who="priya" x={0} y={0} r={17} /></Badge>,
  },
  {
    href: '#company-only', label: 'Company-only',
    art: <Badge fill={K.lilac} tilt={5}><Padlock x={-12.6} y={-19} s={0.42} /></Badge>,
  },
  {
    href: '#keys', label: 'Keys',
    art: (
      <Badge fill={K.ink} tilt={-4} faceClass="tb-n-keys">
        <g transform="rotate(-35)">
          <circle cx={-8} cy={0} r={9} fill={K.sun} stroke={K.ink} strokeWidth={2.5} />
          <circle className="tb-n-keys" cx={-10} cy={0} r={3} fill={K.ink} />
          <path d="M0 -3.4 H17 V3.4 H14 V8 H9 V3.4 H0 Z" fill={K.sun} stroke={K.ink} strokeWidth={2.5} />
        </g>
      </Badge>
    ),
  },
  {
    href: '#rollback', label: 'Rollback',
    art: (
      <Badge fill={K.coral} tilt={6}>
        <path d="M11 9 A12 12 0 1 0 -9 8" fill="none" stroke={K.ink} strokeWidth={9} />
        <path d="M11 9 A12 12 0 1 0 -9 8" fill="none" stroke={K.sun} strokeWidth={4.5} />
        <path d="M-17 2 L-9 14 L-2 3 Z" fill={K.sun} stroke={K.ink} strokeWidth={2.2} />
      </Badge>
    ),
  },
  {
    href: '#share', label: 'Share',
    art: (
      <Badge fill={K.mint} tilt={-5}>
        <g fill="none" stroke={K.ink} strokeWidth={3.2} transform="rotate(-45)">
          <rect x={-15} y={-6} width={16} height={12} rx={6} />
          <rect x={-1} y={-6} width={16} height={12} rx={6} />
        </g>
      </Badge>
    ),
  },
  {
    href: '#admins', label: 'Admin view',
    art: (
      <Badge fill={K.lilac} tilt={4}>
        <rect x={-15} y={-13} width={30} height={26} rx={4} fill={K.paper} stroke={K.ink} strokeWidth={2.2} />
        <path d="M-15 -5 H15 M-15 3 H15 M-5 -13 V13" stroke={K.ink} strokeWidth={1.8} />
      </Badge>
    ),
  },
];
