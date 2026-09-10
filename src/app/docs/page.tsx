import Link from 'next/link';
import Wordmark from '@/components/Wordmark';

export default function Docs() {
  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col">
      <nav className="flex items-center justify-between px-6 md:px-10 py-5 max-w-7xl mx-auto w-full">
        <Link href="/" className="text-ink">
          <Wordmark size={30} />
        </Link>
        <div className="flex items-center gap-6 text-[15px]">
          <a href="https://app.wirl.dev/login" className="text-dim hover:text-ink transition-colors">Log in</a>
          <Link href="/#waitlist" className="bg-ink text-paper px-4 py-2 rounded-md font-semibold hover:bg-cobalt transition-colors">
            Join the waitlist
          </Link>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-10 py-24">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-[-0.03em] leading-[1] max-w-[16ch] text-balance">
          Docs land when the beta opens.
        </h1>
        <p className="mt-6 text-lg text-dim max-w-[48ch] leading-relaxed">
          They will cover deploying apps, defining teams and roles, reading the audit log, and driving all of it from your coding agent over MCP.
        </p>
        <Link
          href="/#waitlist"
          className="inline-block mt-10 bg-cobalt text-white px-5 py-3 rounded-md font-semibold hover:bg-ink transition-colors"
        >
          Join the waitlist
        </Link>
      </main>

      <footer className="border-t border-rule">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 flex items-center justify-between text-sm text-dim">
          <span>wirl.dev</span>
          <Link href="/" className="hover:text-ink transition-colors">Home</Link>
        </div>
      </footer>
    </div>
  );
}
