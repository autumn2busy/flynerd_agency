import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flynerd.tech"),
  title: {
    default: "FlyNerd Tech | AI-Powered Websites for Local Businesses",
    template: "%s | FlyNerd Tech",
  },
  description:
    "FlyNerd Tech builds AI-powered websites for local service businesses. 24/7 AI booking agent, local SEO, and 48-hour launch. Atlanta-based, serving clients globally.",
  keywords: [
    "AI-powered website for local business",
    "AI booking agent",
    "local business website Atlanta",
    "AI website for HVAC",
    "AI website for salons",
    "digital employee website",
    "AI automation agency Atlanta",
    "local SEO website",
    "48 hour website launch",
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
                "FlyNerd Tech builds AI-powered websites for local service businesses. 24/7 AI booking agent, local SEO architecture, and 48-hour launch.",
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
        className={`${spaceGrotesk.variable} ${spaceMono.variable} antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
