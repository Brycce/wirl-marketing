import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wirl. The tools your agents build, wirled into one place.",
  description: "Wirl is where internal software gets deployed. Behind your login, with roles and an audit log, whoever wrote it.",
  metadataBase: new URL('https://wirl.dev'),
  openGraph: {
    title: "The tools your agents build, wirled into one place.",
    description: "Wirl is where internal software gets deployed. Behind your login, with roles and an audit log, whoever wrote it.",
    siteName: "Wirl",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The tools your agents build, wirled into one place.",
    description: "Wirl is where internal software gets deployed. Behind your login, with roles and an audit log, whoever wrote it.",
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
