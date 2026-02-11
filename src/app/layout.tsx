import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-inter",
  weight: "100 900",
});

const jetbrainsMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flynerd.tech"),
  title: {
    default: "Fly Nerd Tech | AI Automation Agency",
    template: "%s",
  },
  description: "Authenticity is the new Authority. Fly Nerd Tech builds enterprise-grade automations for franchises and member hubs.",
  openGraph: {
    title: "Fly Nerd Tech | AI Automation Agency",
    description: "Authenticity is the new Authority. Enterprise-grade automations for conversion-focused growth.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fly Nerd Tech | AI Automation Agency",
    description: "Authenticity is the new Authority. Enterprise-grade automations for conversion-focused growth.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans min-h-screen bg-background text-foreground antialiased`}>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
