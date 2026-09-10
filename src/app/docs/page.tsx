import Link from 'next/link';
import Image from 'next/image';

export default function Docs() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="wirl" width={28} height={28} />
          <span className="font-semibold text-gray-900">wirl.dev</span>
        </Link>
        <div className="flex items-center gap-6">
          <a href="https://app.wirl.dev/login" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">login</a>
          <Link
            href="/#waitlist"
            className="bg-gray-900 text-white text-sm px-4 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            Join the waitlist
          </Link>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center px-4 py-24">
        <div className="max-w-lg text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-6">Documentation is on the way.</h1>
          <p className="text-gray-500 leading-relaxed mb-4">
            Wirl is in private beta, and the docs will land when the platform opens up. They will cover
            deploying apps, defining roles, and driving all of it from your coding agent over MCP.
          </p>
          <p className="text-gray-500 leading-relaxed mb-10">
            Join the waitlist and we will send them to you when they are ready.
          </p>
          <Link
            href="/#waitlist"
            className="inline-block bg-gray-900 text-white text-sm px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            Join the waitlist
          </Link>
        </div>
      </main>

      <footer className="border-t border-gray-100 py-8 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-gray-400">
          <span>wirl.dev</span>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-gray-600 transition-colors">home</Link>
            <Link href="/#waitlist" className="hover:text-gray-600 transition-colors">waitlist</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
