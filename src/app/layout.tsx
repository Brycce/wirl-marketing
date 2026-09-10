import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wirl. Let your people build.",
  description: "A secure place to run the internal tools your team makes. Anyone can ship. Every app lands behind your company login, with team permissions and an audit log.",
  metadataBase: new URL('https://wirl.dev'),
  openGraph: {
    title: "Let your people build.",
    description: "A secure place to run the internal tools your team makes. Anyone can ship. Every app lands behind your company login, with team permissions and an audit log.",
    siteName: "Wirl",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Let your people build.",
    description: "A secure place to run the internal tools your team makes. Anyone can ship. Every app lands behind your company login, with team permissions and an audit log.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
