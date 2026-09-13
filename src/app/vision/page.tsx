import Image from 'next/image';
import { Fraunces } from 'next/font/google';
import Machine from '@/components/Machine';

const fraunces = Fraunces({ subsets: ['latin'], style: ['normal', 'italic'], axes: ['SOFT', 'WONK', 'opsz'] });

// A preview of one direction: the Wirl machine. Not linked from the site.
export default function Vision() {
  return (
    <div className={`min-h-screen text-[#1E1B16] ${fraunces.className}`} style={{ background: '#F6F1E6' }}>
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-lg">
          <Image src="/logo.png" alt="" width={28} height={28} />
          wirl
        </span>
        <span className="inline-flex items-center gap-6 text-[15px]">
          <span className="opacity-70">Docs</span>
          <span className="opacity-70">Log in</span>
          <span className="rounded-full px-4 py-2 text-white" style={{ background: '#1E1B16' }}>Connect your agent</span>
        </span>
      </nav>

      <section className="max-w-6xl mx-auto px-6 pt-10 pb-6 text-center">
        <h1 className="text-[3.25rem] md:text-[4.5rem] leading-[1.02] text-balance" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40, "WONK" 1' }}>
          Let your people build.
        </h1>
        <p className="mt-6 text-lg md:text-xl leading-snug max-w-[42ch] mx-auto">
          Every internal tool your team makes, with an agent or by hand, goes through the same machine. Login, sharing, keys, the log, and rollback happen to every app, whether or not anyone is watching.
        </p>
        <p className="mt-3 text-[15px] italic opacity-70">Fun for the people building. Boring for the people responsible. On purpose.</p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <Machine />
      </section>
    </div>
  );
}
