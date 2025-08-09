// src/app/metadata.ts
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Outreach Pilot',
  description: 'AI-powered email outreach platform',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Outreach Pilot',
    description: 'AI-powered email outreach platform',
    url: 'https://yourdomain.com',
    siteName: 'Outreach Pilot',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Outreach Pilot',
    description: 'AI-powered email outreach platform',
    images: ['/twitter-image.png'],
  },
};
