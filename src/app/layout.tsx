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
    default: "Catan Map Builder - Generate Base Game Maps for 3-4 & 5-6 Players",
    template: "%s | Catan Map Builder"
  },
  description: "Free online Catan map builder for base game. Generate balanced maps for 3-4 or 5-6 players with statistical analysis, resource distribution, and number placement. Mobile-friendly with instant generation.",
  keywords: [
    "Catan map builder",
    "Catan base game generator",
    "3-4 player Catan maps",
    "5-6 player Catan maps",
    "Catan map generator free",
    "Settlers of Catan",
    "board game map creator",
    "balanced Catan maps",
    "mobile Catan generator",
    "Catan statistical analysis",
    "resource distribution",
    "number placement",
    "hex map builder",
    "Catan board layout",
    "game setup tool"
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
    siteName: 'Catan Map Builder',
    title: 'Catan Map Builder - Generate Base Game Maps for 3-4 & 5-6 Players',
    description: 'Free online Catan map builder for base game. Generate balanced maps for 3-4 or 5-6 players with statistical analysis, resource distribution, and number placement.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Catan Map Builder - Generate base game maps with statistical analysis',
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
    name: 'Catan Map Builder',
    description: 'Free online Catan map builder for base game. Generate balanced maps for 3-4 or 5-6 players with statistical analysis, resource distribution, and number placement.',
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
    },
    about: {
      '@type': 'Game',
      name: 'Settlers of Catan',
      description: 'A popular board game about resource management and strategy',
    },
    keywords: 'Catan map builder, base game generator, 3-4 players, 5-6 players, resource distribution, statistical analysis',
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    featureList: [
      'Generate balanced Catan base game maps',
      'Support for 3-4 and 5-6 player modes',
      'Statistical analysis of resource distribution',
      'Number placement optimization',
      'Mobile-friendly responsive design',
      'Instant map generation',
      'Resource balance visualization'
    ],
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
