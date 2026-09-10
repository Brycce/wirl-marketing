import Image from 'next/image';

export default function Wordmark({ size = 28 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2">
      <Image src="/logo.png" alt="" width={size} height={size} priority />
      <span className="font-bold tracking-tight" style={{ fontSize: size * 0.6 }}>
        wirl
      </span>
    </span>
  );
}
