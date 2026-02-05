import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { AnalyticsTracker } from "@/components/layout/AnalyticsTracker";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/layout/JsonLd";
import { MobileBar } from "@/components/layout/MobileBar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { getLocalBusinessJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const mainFont = localFont({
  src: "./fonts/geist-body.woff2",
  variable: "--font-main",
  display: "swap",
  preload: true,
  fallback: ["Inter", "Segoe UI", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Verhuisservice Noord | Verhuisbedrijf Friesland",
    template: "%s | Verhuisservice Noord",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  icons: {
    icon: [{ url: "/favicon.ico" }],
    shortcut: [{ url: "/favicon.ico" }],
    apple: [{ url: "/favicon.ico" }],
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: "Verhuisservice Noord | Verhuisbedrijf Friesland",
    description: siteConfig.description,
    url: siteConfig.url,
    images: [
      {
        url: siteConfig.socialImagePath,
        width: 1200,
        height: 630,
        alt: "Verhuisservice Noord - Verhuizen in Friesland",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Verhuisservice Noord | Verhuisbedrijf Friesland",
    description: siteConfig.description,
    images: [siteConfig.socialImagePath],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B1220",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl">
      <body className={mainFont.variable}>
        <a href="#main-content" className="skip-link">
          Ga naar hoofdinhoud
        </a>
        <Header />
        <ScrollProgress />
        <main id="main-content">{children}</main>
        <Footer />
        <MobileBar />
        <JsonLd data={getLocalBusinessJsonLd()} />
        <AnalyticsTracker />
      </body>
    </html>
  );
}
