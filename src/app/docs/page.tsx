import Link from 'next/link';
import type { Metadata } from 'next';
import Wordmark from '@/components/Wordmark';

export const metadata: Metadata = {
  title: 'Docs',
  description: 'Wirl documentation lands when the private beta opens: shipping an app, who can open what, connections and keys, running it on your machine, the audit log, the MCP tools, and driving it all from your coding agent over MCP.',
  alternates: { canonical: '/docs' },
};

export default function Docs() {
  return (
    <div className="min-h-screen bg-cream text-ink flex flex-col">
      <nav className="max-w-6xl mx-auto w-full flex items-center justify-between px-6 py-5">
        <Link href="/" className="text-ink"><Wordmark /></Link>
        <div className="flex items-center gap-5 text-[15px] font-medium">
          <a href="https://app.wirl.dev/login" className="hidden sm:inline text-dim hover:text-ink">Log in</a>
          <Link href="/#waitlist" className="btn">Join the waitlist</Link>
        </div>
      </nav>
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-24 text-center">
        <h1 className="font-display font-bold text-[2.5rem] md:text-[3.5rem] leading-[1.05] tracking-[-0.025em] max-w-[16ch] mx-auto text-balance">
          Docs land when the beta opens.
        </h1>
        <p className="mt-6 text-[17px] text-ink/85 max-w-[46ch] mx-auto leading-relaxed">
          They will cover shipping an app, who can open what, connections and keys, running it on your machine, reading the audit log, the MCP tools, and driving all of it from your coding agent.
        </p>
        <Link href="/#waitlist" className="btn mt-8">Join the waitlist</Link>
      </main>
      <footer className="max-w-6xl mx-auto w-full px-6 py-10 flex items-center justify-between text-[14px] text-dim">
        <span className="text-ink"><Wordmark size={22} /></span>
        <Link href="/" className="hover:text-ink">Home</Link>
      </footer>
    </div>
  );
}
