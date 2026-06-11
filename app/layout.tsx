import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import { Providers } from '@/components/Providers';
import { profile } from '@/data/profile';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title: {
    default: 'Scott Tuschl — Mechatronics × Industrial AI',
    template: '%s — Scott Tuschl',
  },
  description:
    'Mechatronics engineer building AI systems for the plant floor: predictive maintenance, expert systems, and natural-language interfaces for manufacturing. U.S. Army veteran with nine years of hands-on production experience.',
  keywords: [
    'Scott Tuschl',
    'mechatronics',
    'industrial AI',
    'manufacturing automation',
    'predictive maintenance',
    'process engineering',
    'PLC',
    'portfolio',
  ],
  authors: [{ name: profile.name, url: profile.site }],
  creator: profile.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: profile.site,
    siteName: 'Scott Tuschl — Portfolio',
    title: 'Scott Tuschl — Mechatronics × Industrial AI',
    description:
      'AI systems for the plant floor, built by someone who ran the machines first. Predictive maintenance, expert systems, and manufacturing software that ships.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Scott Tuschl — Mechatronics × Industrial AI portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scott Tuschl — Mechatronics × Industrial AI',
    description: 'AI systems for the plant floor, built by someone who ran the machines first.',
    images: ['/og.png'],
  },
  robots: { index: true, follow: true },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  url: profile.site,
  email: `mailto:${profile.email}`,
  jobTitle: 'Mechatronics Engineering Technologist',
  description: profile.tagline,
  sameAs: [profile.github, profile.linkedin],
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Austin Peay State University' },
    { '@type': 'EducationalOrganization', name: 'LEARN Academy' },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-body">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-20 border border-amber bg-void px-4 py-2 font-mono text-xs uppercase tracking-widest text-amber transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
        <div className="noise-overlay" aria-hidden />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
