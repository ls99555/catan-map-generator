import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Official Catan Rules & Guidelines | Catan Map Generator',
  description: 'Complete guide to official Settlers of Catan rules for 3-4 and 5-6 players. Learn robber mechanics, development cards, building rules, and advanced strategies.',
  keywords: [
    'Catan rules',
    'Settlers of Catan rules',
    'Catan robber rules',
    'Catan development cards',
    'Catan building rules',
    '5-6 player Catan',
    'Catan strategy guide',
    'board game rules'
  ],
  openGraph: {
    title: 'Official Catan Rules & Guidelines',
    description: 'Master the complete Settlers of Catan rules with our comprehensive guide covering all player counts and advanced mechanics.',
    type: 'article',
    url: 'https://catan-map-generator.vercel.app/rules',
  },
  twitter: {
    title: 'Official Catan Rules & Guidelines',
    description: 'Master the complete Settlers of Catan rules with our comprehensive guide covering all player counts and advanced mechanics.',
  },
  alternates: {
    canonical: '/rules',
  },
};

export default function RulesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
