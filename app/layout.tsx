import type { Metadata } from "next";
import { Outfit, Syne } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
      "Your website should be a digital employee. FlyNerd Tech builds AI-powered sites that book appointments, answer questions, and convert leads 24/7.",
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
      "Your website should be a digital employee. FlyNerd Tech builds AI-powered sites that book appointments and convert leads 24/7.",
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
                "FlyNerd Tech builds AI-powered websites for local service businesses. 24/7 AI booking agent, local SEO architecture, and 7-day launch guarantee.",
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
      <body className={`${outfit.variable} ${syne.variable} antialiased font-sans`}>
        {/* Film grain overlay — premium texture */}
        <div className="film-grain" />

        {/* Animated Background */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="bg-orb w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(232,185,35,0.15)_0%,transparent_70%)] -top-[300px] -right-[200px] absolute" />
          <div className="bg-orb w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(43,90,106,0.2)_0%,transparent_70%)] -bottom-[200px] -left-[200px] absolute" style={{ animationDelay: "-5s" }} />
          <div className="bg-orb w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(232,185,35,0.1)_0%,transparent_70%)] top-[50%] left-[60%] absolute" style={{ animationDelay: "-10s" }} />
          <div className="grid-lines" />
          <div className="scan-line" />
          <div className="data-stream absolute inset-0 pointer-events-none opacity-50" />
        </div>

        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}