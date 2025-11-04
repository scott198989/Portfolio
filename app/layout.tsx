import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'Scott Tuschl | Mechatronics Engineering',
  description: 'Portfolio of Scott Tuschl - Mechatronics Engineering Student at Austin Peay State University, aspiring Process Engineer',
  keywords: ['mechatronics', 'engineering', 'process engineer', 'portfolio', 'automation', 'robotics'],
  authors: [{ name: 'Scott Tuschl' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://scott-tuschl.com',
    siteName: 'Scott Tuschl Portfolio',
    title: 'Scott Tuschl | Mechatronics Engineering',
    description: 'Portfolio showcasing mechatronics engineering projects and achievements',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
