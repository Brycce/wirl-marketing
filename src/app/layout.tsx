import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wirl - Email Automation for Developers",
  description: "Turn user actions into automated email sequences. One line of code.",
  metadataBase: new URL('https://wirl.dev'),
  openGraph: {
    title: "Wirl – Email automation built for developers",
    description: "Track events. Trigger sequences. Send emails. No drag & drop.",
    siteName: "Wirl",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wirl – Email automation built for developers",
    description: "Track events. Trigger sequences. Send emails. No drag & drop.",
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
