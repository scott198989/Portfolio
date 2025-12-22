import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Scott Tuschl | Mechatronics Engineering Technology',
  description: 'Portfolio of Scott Tuschl - Mechatronics Engineering Technology Student, Lab Technician, and Aspiring Process Engineer. Passionate about automation, AI integration, and manufacturing excellence.',
  keywords: [
    'mechatronics',
    'engineering',
    'process engineer',
    'automation',
    'robotics',
    'AI',
    'manufacturing',
    'portfolio',
    'lab technician',
    'blown film extrusion',
  ],
  authors: [{ name: 'Scott Tuschl' }],
  creator: 'Scott Tuschl',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://scott-tuschl.com',
    siteName: 'Scott Tuschl Portfolio',
    title: 'Scott Tuschl | Mechatronics Engineering Technology',
    description: 'Mechatronics Engineering Technology Student & Aspiring Process Engineer. Building the future of manufacturing with automation and AI.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Scott Tuschl - Mechatronics Engineering',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scott Tuschl | Mechatronics Engineering',
    description: 'Mechatronics Engineering Student & Aspiring Process Engineer',
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
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#0a0a0f" />
      </head>
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
