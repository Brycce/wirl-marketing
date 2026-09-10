import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wirl - Deploy internal tools your agents build",
  description: "Wirl is where coding agents deploy internal software. Auth, roles, and audit logs come with it.",
  metadataBase: new URL('https://wirl.dev'),
  openGraph: {
    title: "Wirl – The governed home for agent-built internal tools",
    description: "Your agents build the internal tools. Wirl deploys them behind company auth, roles, and audit logs.",
    siteName: "Wirl",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wirl – The governed home for agent-built internal tools",
    description: "Your agents build the internal tools. Wirl deploys them behind company auth, roles, and audit logs.",
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
