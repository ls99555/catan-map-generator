import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Catan Map Generator - All Expansions & Extensions",
  description: "Generate balanced Catan maps for all expansions including Seafarers, Cities & Knights, Traders & Barbarians, and Explorers & Pirates. Mobile-friendly with all game modes and scenarios.",
  keywords: "Catan, Settlers of Catan, map generator, board game, Seafarers, Cities & Knights, Traders & Barbarians, Explorers & Pirates, game tool",
  authors: [{ name: "Catan Map Generator" }],
  creator: "Catan Map Generator",
  publisher: "Catan Map Generator",
  openGraph: {
    title: "Catan Map Generator - All Expansions & Extensions",
    description: "Generate balanced Catan maps for all expansions. Mobile-friendly with statistical analysis and export options.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Catan Map Generator - All Expansions & Extensions",
    description: "Generate balanced Catan maps for all expansions. Mobile-friendly with statistical analysis and export options.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
