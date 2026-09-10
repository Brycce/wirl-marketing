import Sprite from './pixel/Sprite';
import { SWIRL } from './pixel/sprites';

export default function Wordmark({ size = 2 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2">
      <Sprite rows={SWIRL} scale={size} title="wirl" />
      <span className="font-pixel font-bold leading-none" style={{ fontSize: size * 13 }}>wirl</span>
    </span>
  );
}
