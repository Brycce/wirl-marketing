import Link from 'next/link';
import Wordmark from '@/components/Wordmark';

export default function Docs() {
  return (
    <div className="min-h-screen bg-cream text-ink flex flex-col">
      <nav className="max-w-6xl mx-auto w-full flex items-center justify-between px-6 py-5">
        <Link href="/"><Wordmark /></Link>
        <div className="flex items-center gap-5 font-pixel text-[17px] leading-none">
          <a href="https://app.wirl.dev/login" className="hidden sm:inline text-dim hover:text-ink">Log in</a>
          <Link href="/#waitlist" className="px-btn px-4 py-2">Join the waitlist</Link>
        </div>
      </nav>
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-24 text-center">
        <h1 className="font-pixel font-bold text-[2.75rem] md:text-6xl leading-[1.05] max-w-[16ch] mx-auto text-balance">
          Docs land when the beta opens.
        </h1>
        <p className="mt-6 text-[17px] text-ink/85 max-w-[46ch] mx-auto leading-relaxed">
          They will cover shipping an app, defining teams and permissions, reading the audit log, and driving all of it from your coding agent over MCP.
        </p>
        <Link href="/#waitlist" className="px-btn inline-block mt-8 px-5 py-2.5 font-pixel text-[18px] leading-none">
          Join the waitlist
        </Link>
      </main>
      <footer className="max-w-6xl mx-auto w-full px-6 py-10 flex items-center justify-between font-pixel text-[16px] leading-none text-dim">
        <span className="text-ink"><Wordmark size={2} /></span>
        <Link href="/" className="hover:text-ink">Home</Link>
      </footer>
    </div>
  );
}
