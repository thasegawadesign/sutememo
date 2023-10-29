import { env } from 'process';

import { Viewport } from 'next';
import { Noto_Sans_JP } from 'next/font/google';

import Analytics from '@/components/analytics';
import '@/globals.css';
import { Providers } from '@/providers';

import { themeColor } from '../../tailwind.config';

import type { Metadata } from 'next';

const baseURL = env.BASE_URL;
const creator = env.CREATOR;
const authorName = env.ATHOR_NAME;
const authorURL = env.ATHOR_URL;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: themeColor,
};

export const metadata: Metadata = {
  title: 'Todoify',
  description: 'Todoアプリケーション',
  metadataBase: new URL(baseURL as string),
  manifest: `${baseURL}/manifest.webmanifest`,
  applicationName: 'Todoify',
  appleWebApp: {
    capable: true,
    title: 'Todoify',
    statusBarStyle: 'black-translucent',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/icons/icon-192x192.png',
  },
  authors: [
    {
      name: `${authorName}`,
      url: `${authorURL}`,
    },
  ],
  twitter: {
    card: 'summary',
    creator: `${creator}`,
  },
  openGraph: {
    type: 'website',
    url: baseURL,
    title: 'Todoify',
    description: 'Todoアプリケーション',
    siteName: 'Todoify',
    images: [
      {
        url: `${baseURL}/api/og`,
      },
    ],
  },
};

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="overscroll-none" lang="ja">
      <head>
        <Analytics />
      </head>
      <body
        className={`${notoSansJP.className} overscroll-none bg-radixGray-12 subpixel-antialiased`}
        role="application"
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
