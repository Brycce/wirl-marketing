import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wirl. One place to ship every internal tool.",
  description: "Wirl hosts the internal apps your team builds, by hand or with agents. Every one launches behind your company login, with team permissions and an audit log.",
  metadataBase: new URL('https://wirl.dev'),
  openGraph: {
    title: "One place to ship every internal tool.",
    description: "Wirl hosts the internal apps your team builds, by hand or with agents. Every one launches behind your company login, with team permissions and an audit log.",
    siteName: "Wirl",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "One place to ship every internal tool.",
    description: "Wirl hosts the internal apps your team builds, by hand or with agents. Every one launches behind your company login, with team permissions and an audit log.",
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
