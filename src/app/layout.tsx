import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wirl. Let your people build.",
  description: "Wirl is where your team ships internal tools. Every app becomes a wirl: a URL behind your company login, with a team on it and a record of what happens inside.",
  metadataBase: new URL('https://wirl.dev'),
  openGraph: {
    title: "Let your people build.",
    description: "Wirl is where your team ships internal tools. Every app becomes a wirl: a URL behind your company login, with a team on it and a record of what happens inside.",
    siteName: "Wirl",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Let your people build.",
    description: "Wirl is where your team ships internal tools. Every app becomes a wirl: a URL behind your company login, with a team on it and a record of what happens inside.",
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
