import type { Metadata } from 'next';
import { Manrope, Space_Grotesk } from 'next/font/google';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://scott-tuschl.com'),
  title: 'Scott Tuschl | Mechatronics + AI Portfolio',
  description:
    'Portfolio of Scott Tuschl. Mechatronics engineering, manufacturing automation, and AI-powered production systems.',
  keywords: [
    'Scott Tuschl',
    'mechatronics',
    'manufacturing automation',
    'AI systems',
    'process engineering',
    'industrial software',
    'portfolio',
  ],
  authors: [{ name: 'Scott Tuschl' }],
  creator: 'Scott Tuschl',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://scott-tuschl.com',
    siteName: 'Scott Tuschl Portfolio',
    title: 'Scott Tuschl | Mechatronics + AI Portfolio',
    description:
      'Manufacturing-focused software, automation architecture, and AI product delivery by Scott Tuschl.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scott Tuschl | Mechatronics + AI Portfolio',
    description: 'Manufacturing automation and AI portfolio by Scott Tuschl.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${spaceGrotesk.variable} antialiased`}>{children}</body>
    </html>
  );
}
