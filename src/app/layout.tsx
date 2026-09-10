import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wirl. Let your people build.",
  description: "Wirl hosts the internal tools your team builds, by hand or with agents. Each ships as a wirl: a URL behind your login, a team that can open it, and a log of what happens.",
  metadataBase: new URL('https://wirl.dev'),
  openGraph: {
    title: "Let your people build.",
    description: "Wirl hosts the internal tools your team builds, by hand or with agents. Each ships as a wirl: a URL behind your login, a team that can open it, and a log of what happens.",
    siteName: "Wirl",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Let your people build.",
    description: "Wirl hosts the internal tools your team builds, by hand or with agents. Each ships as a wirl: a URL behind your login, a team that can open it, and a log of what happens.",
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
