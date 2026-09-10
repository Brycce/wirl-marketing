import type { Metadata } from "next";
import "./globals.css";

const SITE = 'https://wirl.dev';
const TITLE = 'Wirl: a secure place for the internal tools your team builds';
const DESCRIPTION =
  'Host the internal tools your team builds, by hand or with AI agents. Every app ships behind your company login, with team permissions and an audit log.';

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
    title: 'Let your people build.',
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Let your people build.',
    description: DESCRIPTION,
  },
};

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
