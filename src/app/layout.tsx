import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wirl - Email Automation for Developers",
  description: "Turn user actions into automated email sequences. One line of code.",
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
