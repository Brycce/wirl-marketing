// Four ways the snail could sit in the cartoon world, side by side at the
// size he is actually used: nav (28px) and footer. A is today's mark.
import { pinnedShellPath, SHELL_REST_TURNS } from '@/components/swirl';
import { EYES } from '@/components/paper/Snail';

const INK = '#1B2420';
const SHELL_D = pinnedShellPath(SHELL_REST_TURNS);
const BODY_D = 'M34.17 29.31 C 27 31.8, 15 33.2, 9 30.2 C 4.6 28, 4.2 23.4, 8.2 22.2';

function Head({ r = 2.1 }: { r?: number }) {
  return (
    <>
      {EYES.map(({ base, tip, eye }) => (
        <g key={tip.join(',')}>
          <path d={`M${base[0]} ${base[1]} L${tip[0]} ${tip[1]}`} />
          <circle cx={eye[0]} cy={eye[1]} r={r} fill="currentColor" stroke="none" />
        </g>
      ))}
    </>
  );
}

/* A and B: today's line mark, at today's weight and at a cartoon weight. */
function LineSnail({ size, weight }: { size: number; weight: number }) {
  return (
    <svg viewBox="0 0 48 36" width={size * (48 / 36)} height={size} style={{ overflow: 'visible' }} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth={weight} strokeLinecap="round" strokeLinejoin="round">
        <path d={SHELL_D} />
        <path d={BODY_D} />
        <Head r={weight * 0.62} />
      </g>
    </svg>
  );
}

/* C: the same snail drawn the way every object in this world is: a flat fill
   inside a thick ink outline. The body keeps today's exact line as its spine,
   stroked fat and outlined, so the silhouette does not change. The shell is a
   disc with the wirl cut into it. */
function SolidSnail({ size, fill = '#F4C542' }: { size: number; fill?: string }) {
  const uid = `ss${size}`;
  return (
    <svg viewBox="0 0 48 36" width={size * (48 / 36)} height={size} style={{ overflow: 'visible' }} aria-hidden="true">
      <clipPath id={uid}>
        <circle cx={33.4} cy={19.6} r={10.4} />
      </clipPath>
      {/* body: the line, stroked fat, with its own outline underneath */}
      <path d={BODY_D} fill="none" stroke="currentColor" strokeWidth={10.4} strokeLinecap="round" strokeLinejoin="round" />
      <path d={BODY_D} fill="none" stroke={fill} strokeWidth={7.2} strokeLinecap="round" strokeLinejoin="round" />
      {/* shell: a disc with the spiral cut through it */}
      <circle cx={33.4} cy={19.6} r={11.8} fill={fill} stroke="currentColor" strokeWidth={2.6} />
      <g clipPath={`url(#${uid})`}>
        <path d={SHELL_D} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" transform="translate(-0.4 -1.2)" />
      </g>
      {/* head */}
      <g fill="none" stroke="currentColor" strokeWidth={2.8} strokeLinecap="round">
        <Head r={2} />
      </g>
    </svg>
  );
}

/* D: today's mark, cut out as a die-cut sticker like the agent logos. */
function StickerSnail({ size }: { size: number }) {
  return (
    <span
      style={{
        display: 'inline-grid',
        placeItems: 'center',
        background: '#FFFCF5',
        borderRadius: 999,
        padding: `${size * 0.2}px ${size * 0.26}px`,
        boxShadow: '0 1px 1px rgba(27,36,32,.14), 0 3px 6px rgba(27,36,32,.2)',
      }}
    >
      <LineSnail size={size} weight={4.2} />
    </span>
  );
}

const ROWS: { key: string; label: string; render: (size: number) => React.ReactNode }[] = [
  { key: 'a', label: 'A · today, 3.4 line', render: (s) => <LineSnail size={s} weight={3.4} /> },
  { key: 'b', label: 'B · heavier line, 4.6', render: (s) => <LineSnail size={s} weight={4.6} /> },
  { key: 'c', label: 'C · solid, outlined', render: (s) => <SolidSnail size={s} /> },
  { key: 'd', label: 'D · die-cut sticker', render: (s) => <StickerSnail size={s} /> },
];

export default function LogoOptions() {
  return (
    <div style={{ display: 'grid', gap: 34, padding: '40px 32px', color: INK, background: '#F5EFE3' }}>
      {ROWS.map(({ key, label, render }) => (
        <div key={key} id={`logo-${key}`} style={{ display: 'flex', alignItems: 'center', gap: 44 }}>
          <span style={{ width: 200, fontSize: 14, fontWeight: 600, opacity: 0.7 }}>{label}</span>
          {[28, 44, 96].map((s) => (
            <span key={s} style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              {render(s)}
              {s === 28 && <span style={{ fontSize: Math.round(s * 0.95), fontWeight: 700, letterSpacing: '-0.04em' }}>wirl</span>}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
