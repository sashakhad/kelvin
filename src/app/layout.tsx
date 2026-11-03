import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Anybody, DM_Mono, Sora } from 'next/font/google';

import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { LEAD_TAGLINE, NAME_STORY } from '@/lib/brand';
import { siteUrl } from '@/lib/site';

import './globals.css';

const display = Anybody({
  subsets: ['latin'],
  weight: 'variable',
  axes: ['wdth'],
  variable: '--font-anybody',
});

const sans = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
});

const mono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
});

const description = `${LEAD_TAGLINE} ${NAME_STORY} King Louie's energy drink, sold only at Shrimp Club.`;

export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title: {
    default: 'KELVIN',
    template: '%s — KELVIN',
  },
  description,
  openGraph: {
    title: `KELVIN — ${LEAD_TAGLINE}`,
    description,
    images: [
      {
        url: '/brand/og.png',
        width: 1200,
        height: 630,
        alt: 'KELVIN. Celsius + 273.15. Only at Shrimp Club.',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `KELVIN — ${LEAD_TAGLINE}`,
    description,
    images: ['/brand/og.png'],
  },
  icons: {
    icon: [
      { url: '/brand/favicon.svg', type: 'image/svg+xml' },
      { url: '/brand/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/brand/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/brand/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#05060A',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en' className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className='flex min-h-screen flex-col font-sans antialiased'>
        <a
          href='#content'
          className='focus:bg-cyan focus:text-void sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:px-3 focus:py-2'
        >
          Skip to content
        </a>
        <SiteHeader />
        <div id='content' className='flex-1'>
          {children}
        </div>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
