import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageTransition } from "@/components/page-transition";
import { siteOrigin } from "@/lib/site";
import "./globals.css";

const jakarta = localFont({
  src: "../public/design/fonts/PlusJakartaSans-Variable.ttf",
  weight: "200 800",
  style: "normal",
  variable: "--font-jakarta",
  display: "swap"
});

const origin = siteOrigin();
export const metadata: Metadata = {
  title: { default: "AmplifyWorld | Business Growth", template: "%s | AmplifyWorld" },
  description: "AmplifyWorld is a digital marketing agency in Prayagraj offering SEO, local SEO, Google Business Profile optimization, Meta Ads, custom websites, GEO, AEO and AI solutions for businesses in India and beyond.",
  metadataBase: origin ?? undefined,
  icons: {
    icon: [{ url: "/design/brand/favicon.png", type: "image/png" }],
    shortcut: "/design/brand/favicon.png",
    apple: "/design/brand/favicon.png"
  },
  robots: { index: Boolean(origin), follow: Boolean(origin) },
  ...(origin ? {
    openGraph: {
      siteName: "AmplifyWorld", locale: "en_US", type: "website" as const,
      images: [{ url: new URL("/design/about/earth-beauty-1200.webp", origin).href,
        width: 1200, height: 800, alt: "AmplifyWorld original Earth and violet brand illustration" }]
    },
    twitter: { card: "summary_large_image" as const }
  } : {})
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={jakarta.variable}>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <PageTransition>{children}</PageTransition>
        <SiteFooter />
      </body>
    </html>
  );
}
