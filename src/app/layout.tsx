import { Viewport } from 'next';
import { Noto_Sans_JP } from 'next/font/google';

import Analytics from '@/components/analytics';
import '@/globals.css';
import { Providers } from '@/providers';

import { customGray, white } from '../../tailwind.config';

import type { Metadata } from 'next';

const baseURL = process.env.BASE_URL;
const creator = process.env.CREATOR;
const authorName = process.env.ATHOR_NAME;
const authorURL = process.env.ATHOR_URL;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: customGray },
    { media: '(prefers-color-scheme: light)', color: white },
  ],
  colorScheme: 'dark light',
};

export const metadata: Metadata = {
  title: 'Todoify',
  description: 'ToDoアプリケーション',
  abstract: 'ToDoアプリケーション',
  keywords: ['Todoify', 'ToDoアプリ', 'ToDoリスト'],
  category: 'productivity',
  metadataBase: new URL(baseURL as string),
  manifest: `${baseURL}/manifest.webmanifest`,
  applicationName: 'Todoify',
  appleWebApp: {
    title: 'Todoify',
    capable: true,
    statusBarStyle: 'black-translucent',
    startupImage: [
      '/splashscreens/ipad_splash.png',
      {
        url: '/splashscreens/iphone5_splash.png',
        media:
          '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/splashscreens/iphone6_splash.png',
        media:
          '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/splashscreens/iphoneplus_splash.png',
        media:
          '(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)',
      },
      {
        url: '/splashscreens/iphonex_splash.png',
        media:
          '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)',
      },
      {
        url: '/splashscreens/iphonexr_splash.png',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/splashscreens/iphonexsmax_splash.png',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)',
      },
      {
        url: '/splashscreens/ipad_splash.png',
        media:
          '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/splashscreens/ipadpro1_splash.png',
        media:
          '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/splashscreens/ipadpro3_splash.png',
        media:
          '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/splashscreens/ipadpro2_splash.png',
        media:
          '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)',
      },
    ],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/icons/apple-touch-icon.png',
  },
  publisher: authorName,
  authors: [
    {
      name: authorName,
      url: authorURL,
    },
  ],
  twitter: {
    card: 'summary',
    creator: creator,
  },
  openGraph: {
    type: 'website',
    url: baseURL,
    title: 'Todoify',
    description: 'ToDoアプリケーション',
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
