import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Jacques_Francois } from 'next/font/google';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/siteConfig";

const commitMono = localFont({
  src: "../public/fonts/CommitMono.woff2",
  variable: "--font-commit-mono",
  weight: "450",
  preload: true,
  display: 'swap',
});

const tiemposHeadline = localFont({
  src: "../public/fonts/TiemposHeadline-Regular.woff2",
  variable: "--font-tiempos-headline",
  weight: "400",
  preload: true,
  display: 'swap',
});

const tiemposText = localFont({
  src: [
    {
      path: "../public/fonts/TiemposText-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/TiemposText-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/TiemposText-Regular-Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-tiempos-text",
  preload: true,
  display: 'swap',
});

const jacquesFrancois = Jacques_Francois({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-jacques-francois',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: '32x32' },
    ],
    other: [
      { url: '/favicon/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [{
      url: OG_IMAGE,
      width: 1920,
      height: 1080,
      alt: 'Robert Kan Portfolio',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    creator: '@robertkkan',
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${commitMono.variable} ${tiemposHeadline.variable} ${tiemposText.variable} ${jacquesFrancois.variable} antialiased bg-background min-h-screen`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded-[0.375rem] focus:bg-fill focus:px-2 focus:py-1 focus:shadow-inset-tertiary b_mono"
        >
          Skip to content
        </a>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
