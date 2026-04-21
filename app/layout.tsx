import type { Metadata } from "next";
import { Instrument_Serif, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import HomeChatWidget from "@/components/home/HomeChatWidget";
import PostHogProvider from "@/components/demo/PostHogProvider";
import ChromeGate from "@/components/demo/ChromeGate";

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flynerd.tech"),
  title: {
    default: "FlyNerd Tech | AI-Powered Websites for Local Businesses",
    template: "%s | FlyNerd Tech",
  },
  description:
    "FlyNerd Tech builds AI-powered websites for local service businesses. 24/7 AI booking agent, local SEO, and 7-day launch guarantee. Atlanta-based, serving clients globally.",
  keywords: [
    "AI-powered website for local business",
    "AI booking agent",
    "local business website Atlanta",
    "AI website for HVAC",
    "AI website for salons",
    "digital employee website",
    "AI automation agency Atlanta",
    "local SEO website",
    "7 day website launch",
    "AI concierge for small business",
  ],
  authors: [{ name: "FlyNerd Tech" }],
  creator: "FlyNerd Tech",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://flynerd.tech",
    siteName: "FlyNerd Tech",
    title: "FlyNerd Tech | AI-Powered Websites for Local Businesses",
    description:
      "We build the internet for the overlooked. FlyNerd Tech builds AI-powered sites that book appointments, answer questions, and convert leads 24/7.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FlyNerd Tech - AI-Powered Websites for Local Businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FlyNerd Tech | AI-Powered Websites for Local Businesses",
    description:
      "We build the internet for the overlooked. FlyNerd Tech builds AI-powered sites that book appointments and convert leads 24/7.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,300,400&f[]=array@400&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "FlyNerd Tech",
              url: "https://flynerd.tech",
              logo: "https://flynerd.tech/logo.png",
              description:
                "FlyNerd Tech builds AI-powered websites for local service businesses. 24/7 AI booking agent, local SEO architecture, and 7-day launch.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Atlanta",
                addressRegion: "GA",
                addressCountry: "US",
              },
              areaServed: "Worldwide",
              serviceType: "AI-Powered Website Development",
              sameAs: [
                "https://flynerdofficial.com",
                "https://linkedin.com/company/flynerdtech",
                "https://twitter.com/flynerdtech",
                "https://instagram.com/flynerdofficial",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "sales",
                email: "hello@flynerd.tech",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${instrumentSerif.variable} ${geistMono.variable} font-satoshi antialiased`}
      >
        <PostHogProvider>
          <ChromeGate><Header /></ChromeGate>
          <main>{children}</main>
          <ChromeGate><Footer /></ChromeGate>
          <ChromeGate><HomeChatWidget /></ChromeGate>
        </PostHogProvider>
      </body>
    </html>
  );
}
