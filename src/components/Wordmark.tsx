import Image from 'next/image';

// The real mark, plus the name set in the page face. The mark is the only
// hand-drawn thing on the site, and it should stay that way.
export default function Wordmark({ size = 30 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image src="/logo.png" alt="" width={size} height={size} priority />
      <span className="font-bold tracking-tight" style={{ fontSize: size * 0.62 }}>
        wirl
      </span>
    </span>
  );
}
