import Link from 'next/link';
import Wordmark from '@/components/Wordmark';

export default function Docs() {
  return (
    <div className="min-h-screen bg-tape text-ink flex flex-col">
      <nav className="max-w-7xl mx-auto w-full flex items-center justify-between px-6 md:px-10 py-6">
        <Link href="/"><Wordmark size={30} /></Link>
        <div className="flex items-center gap-4 sm:gap-6 text-[15px]">
          <a href="https://app.wirl.dev/login" className="hidden sm:inline hover:underline underline-offset-4">Log in</a>
          <Link href="/#waitlist" className="bg-ink text-tape px-4 py-2 rounded-md font-bold hover:bg-black transition-colors">
            Join the waitlist
          </Link>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-10 py-24">
        <h1 className="font-extrabold tracking-[-0.04em] leading-[0.92] max-w-[14ch] text-balance" style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}>
          Docs land when the beta opens.
        </h1>
        <p className="mt-7 text-xl md:text-2xl max-w-[44ch] leading-snug">
          They will cover deploying apps, defining teams and permissions, reading the audit log, and driving all of it from your coding agent over MCP.
        </p>
        <Link
          href="/#waitlist"
          className="inline-block mt-10 bg-ink text-tape px-5 py-3 rounded-md font-bold hover:bg-black transition-colors"
        >
          Join the waitlist
        </Link>
      </main>

      <footer className="bg-ink text-white/60">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 flex items-center justify-between text-sm">
          <span className="text-white"><Wordmark size={20} onDark /></span>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
        </div>
      </footer>
    </div>
  );
}
