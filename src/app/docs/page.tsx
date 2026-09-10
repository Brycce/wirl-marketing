import Link from 'next/link';
import Wordmark from '@/components/Wordmark';

export default function Docs() {
  return (
    <div className="min-h-screen bg-white text-ink flex flex-col">
      <nav className="max-w-6xl mx-auto w-full flex items-center justify-between px-6 py-5">
        <Link href="/"><Wordmark /></Link>
        <div className="flex items-center gap-5 text-[14px]">
          <a href="https://app.wirl.dev/login" className="hidden sm:inline text-dim hover:text-ink transition-colors">Log in</a>
          <Link href="/#waitlist" className="bg-ink text-white px-4 py-2 rounded-lg font-semibold hover:bg-black transition-colors">
            Join the waitlist
          </Link>
        </div>
      </nav>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-24 text-center">
        <h1 className="display text-[2.6rem] md:text-6xl leading-[1.02] max-w-[16ch] mx-auto text-balance">
          Docs land when the beta opens.
        </h1>
        <p className="mt-6 text-[17px] text-ink/85 max-w-[46ch] mx-auto leading-relaxed">
          They will cover deploying apps, defining teams and permissions, reading the audit log, and driving all of it from your coding agent over MCP.
        </p>
        <Link href="/#waitlist" className="inline-block mt-8 bg-ink text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-black transition-colors">
          Join the waitlist
        </Link>
      </main>

      <footer className="max-w-6xl mx-auto w-full px-6 py-10 flex items-center justify-between text-[13px] text-dim">
        <span className="text-ink"><Wordmark size={20} /></span>
        <Link href="/" className="hover:text-ink transition-colors">Home</Link>
      </footer>
    </div>
  );
}
