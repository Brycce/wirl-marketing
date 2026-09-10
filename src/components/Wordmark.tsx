import Image from 'next/image';

// The real mark plus the name. `onDark` flips the mark to white.
export default function Wordmark({ size = 30, onDark = false }: { size?: number; onDark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image src="/logo.png" alt="" width={size} height={size} priority className={onDark ? 'invert' : ''} />
      <span className="font-bold tracking-tight" style={{ fontSize: size * 0.62 }}>
        wirl
      </span>
    </span>
  );
}
