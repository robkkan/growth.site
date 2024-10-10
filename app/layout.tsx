import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const commitMono = localFont({
  src: "./fonts/CommitMono.woff2",
  variable: "--font-commit-mono",
  weight: "450",
  preload: true,
  display: 'swap',
});

const tiemposHeadline = localFont({
  src: "./fonts/TiemposHeadline-Regular.woff2",
  variable: "--font-tiempos-headline",
  weight: "400",
  preload: true,
  display: 'swap',
});

const tiemposText = localFont({
  src: "./fonts/TiemposText-Regular.woff2",
  variable: "--font-tiempos-text",
  weight: "400",
  preload: true,
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${commitMono.variable} ${tiemposHeadline.variable} ${tiemposText.variable} antialiased bg-background-color min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
