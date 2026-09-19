// Jonah, hand up with a question. While any answer is open he lowers his
// hand and smiles (CSS :has on the FAQ section, no script).

import s from './cast.module.css';
import { C, Figure, Head, Mug, POSE, mirror, withPose } from './kit';

export default function FaqJonah() {
  return (
    <svg viewBox="0 0 200 292" className={s.art} role="img" aria-label="Jonah, mug in one hand, raises the other to ask a question.">
      <ellipse cx="100" cy="280" rx="62" ry="8" fill="#F1E3CB" />
      <g transform="translate(100 66) scale(0.88)">
        <Figure
          who="jonah"
          legs="#5A5570"
          headClass={s.faqCurious}
          face={{ eyes: 'open', brows: 'up', mouth: 'o', look: [0.6, -1.4], blink: s.blink }}
          arms={[
            withPose(POSE.up, { className: s.faqUp, foreClass: s.handWiggle }),
            withPose(POSE.down, { className: s.faqDown, pts: [[-38, 58], [-48, 100], [-44, 128]] }),
            withPose(mirror(POSE.mug), { pts: [[38, 58], [50, 104], [26, 84]], hold: <Mug x={-17} y={7} /> }),
          ]}
        />
        <g className={s.faqSmile}>
          <Head who="jonah" face={{ eyes: 'happy', brows: 'up', mouth: 'grin' }} />
        </g>
      </g>
      <g className={s.faqQ}>
        <circle cx="162" cy="34" r="16" fill={C.white} stroke={C.ink} strokeWidth="2.5" />
        <text x="162" y="41.5" textAnchor="middle" fontSize="21" fontWeight="800" fill={C.ink} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>?</text>
      </g>
    </svg>
  );
}
