import { SnailMark } from './paper/Snail';

// The wirl is a snail. Hover the wordmark and it gets going.
export default function Wordmark({ size = 28 }: { size?: number }) {
  return (
    <span className="wordmark inline-flex items-center gap-2">
      <SnailMark size={size} fast className="wordmark-mark" />
      <span className="font-display font-bold leading-none tracking-[-0.04em]" style={{ fontSize: Math.round(size * 0.95) }}>wirl</span>
    </span>
  );
}
