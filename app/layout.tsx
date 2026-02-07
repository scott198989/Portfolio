import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
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
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
