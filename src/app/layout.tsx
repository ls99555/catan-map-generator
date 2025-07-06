import type { Metadata, Viewport } from "next";
import { Inter, Roboto_Slab } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-slab",
});

export const metadata: Metadata = {
  title: {
    default: "Catan Map Builder - Free Online Board Game Map Generator",
    template: "%s | Catan Map Builder"
  },
  description: "Create balanced Catan maps instantly with our free online map builder. Supports 3-4 and 5-6 players, mobile-friendly design, and statistical analysis. Perfect for competitive and casual gameplay.",
  keywords: [
    "Catan map generator",
    "Catan map builder",
    "Catan map builder 5-6",
    "Settlers of Catan",
    "board game map creator",
    "Catan board generator",
    "free Catan maps",
    "3-4 player Catan",
    "5-6 player Catan",
    "mobile Catan generator",
    "balanced Catan maps",
    "Catan game tool",
    "hex map generator",
    "seafarers",
    "board game design",
    "strategy games"
  ],
  authors: [{ name: "Luke Stevens", url: "https://lstevens.dev" }],
  creator: "Luke Stevens",
  publisher: "Luke Stevens",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://catanmapgenerator.app'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        url: '/favicon.svg',
      },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://catanmapgenerator.app',
    siteName: 'Catan Map Generator',
    title: 'Catan Map Generator - Free Online Board Game Map Creator',
    description: 'Create balanced Catan maps instantly with our free online generator. Supports 3-4 and 5-6 players, mobile-friendly design, and statistical analysis.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Catan Map Generator - Create balanced board game maps',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  category: 'Games',
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#334155',
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Catan Map Generator',
    description: 'Create balanced Catan maps instantly with our free online generator. Supports 3-4 and 5-6 players, mobile-friendly design, and statistical analysis.',
    url: 'https://catanmapgenerator.app',
    applicationCategory: 'GameApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    creator: {
      '@type': 'Person',
      name: 'Luke Stevens',
      url: 'https://lstevens.dev',
      email: 'luke@lstevens.dev',
    },
    about: {
      '@type': 'Game',
      name: 'Settlers of Catan',
      description: 'A popular board game about resource management and strategy',
    },
    keywords: 'Catan, Settlers of Catan, map generator, board game, game tool',
    inLanguage: 'en-US',
    isAccessibleForFree: true,
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${robotoSlab.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
