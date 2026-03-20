import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flynerd.tech"),
  title: {
    default: "FlyNerd Tech | AI-Powered Website Growth Systems",
    template: "%s | FlyNerd Tech",
  },
  description:
    "FlyNerd Tech helps businesses with weak, outdated, or missing websites turn their online presence into a lead-generating sales system.",
  openGraph: {
    title: "FlyNerd Tech | AI-Powered Website Growth Systems",
    description:
      "We identify the pain point, build a custom demo, create a personalized pitch video, and help convert interest into actual revenue.",
    type: "website",
    siteName: "FlyNerd Tech",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlyNerd Tech | AI-Powered Website Growth Systems",
    description:
      "We identify the pain point, build a custom demo, create a personalized pitch video, and help convert interest into actual revenue.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} font-sans min-h-screen bg-background text-foreground antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
