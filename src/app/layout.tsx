import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE = 'https://wirl.dev';
const TITLE = 'Wirl: deploy internal tools behind your company login';
const DESCRIPTION =
  'Wirl hosts the internal tools your team builds. Deploy from your coding agent, and the app is live at a link only people at your company can open. Admins see every app, who built it, what it connects to, and who can open it.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: TITLE,
    template: '%s · Wirl',
  },
  description: DESCRIPTION,
  applicationName: 'Wirl',
  keywords: [
    'internal tools', 'internal tools platform', 'deploy internal apps', 'vibe coding', 'AI agents',
    'governance', 'SSO for internal tools', 'audit log', 'role-based access', 'MCP server',
  ],
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: SITE,
    siteName: 'Wirl',
    locale: 'en_US',
    title: 'Build internal tools. Deploy them behind your company login.',
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Build internal tools. Deploy them behind your company login.',
    description: DESCRIPTION,
  },
};

// Both themes exist, so the browser can paint its own canvas and controls dark
// for a dark-mode visitor even before the stylesheet arrives.
export const viewport: Viewport = { colorScheme: 'light dark' };

// Structured data so search results carry the right name, description, and logo.
const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Wirl',
    url: SITE,
    logo: `${SITE}/opengraph-image`,
    sameAs: ['https://www.npmjs.com/package/wirl'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Wirl',
    url: SITE,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Wirl',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    url: SITE,
    description: DESCRIPTION,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Private beta' },
  },
];

// Night mode. Runs in <head> before the first paint, so the page never shows
// the wrong theme first. A choice made with the nav toggle is kept in
// localStorage under "wirl-theme"; without one, the page follows the system
// setting, and keeps following it if the system changes. The theme lands on
// <html> as data-theme="light" | "dark", which is all the CSS reads (with a
// prefers-color-scheme fallback for when this script cannot run). Another tab
// changing the choice is picked up too. It also gives the toggle button
// ([data-theme-toggle], ThemeToggle.tsx) its right label as soon as the page
// is parsed, before React hydrates; ThemeToggle writes the same key.
const themeScript = `(function(){
var d=document.documentElement,k='wirl-theme',m=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)');
function s(){try{var v=localStorage.getItem(k);return v==='light'||v==='dark'?v:null}catch(e){return null}}
function l(t){var b=document.querySelectorAll('[data-theme-toggle]'),n=t==='dark'?'Switch to light mode':'Switch to dark mode';for(var i=0;i<b.length;i++){b[i].setAttribute('aria-label',n);b[i].setAttribute('title',n);b[i].setAttribute('aria-pressed',t==='dark'?'true':'false')}}
function a(){var t=s()||(m&&m.matches?'dark':'light');d.setAttribute('data-theme',t);d.style.colorScheme=t;l(t)}
a();
if(m){m.addEventListener?m.addEventListener('change',a):m.addListener(a)}
window.addEventListener('storage',function(e){if(e.key===k||e.key===null)a()});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){l(d.getAttribute('data-theme'))});
})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The head script sets data-theme and color-scheme on <html> before React
    // hydrates, so those attributes differing from the server's are expected.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
