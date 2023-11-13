import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { Viewport } from 'next';
import { cookies } from 'next/headers';

import { notoSansJP } from '@/app/fonts';
import Analytics from '@/components/analytics';
import { defaultBaseColor, defaultMode } from '@/contexts/theme-provider';
import '@/globals.css';
import { Providers } from '@/providers';
import { MIDNIGHT_COLOR_CODE } from '@/utils/color';
import { bgVariants } from '@/utils/colorVariants';

import type { Metadata } from 'next';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const creator = process.env.NEXT_PUBLIC_CREATOR;
const authorName = process.env.NEXT_PUBLIC_ATHOR_NAME;
const authorURL = process.env.NEXT_PUBLIC_ATHOR_URL;

export async function generateViewport(): Promise<Viewport> {
  const cookieStore = cookies();
  const themeColorCode =
    cookieStore.get('themeColorCode')?.value ?? MIDNIGHT_COLOR_CODE;

  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    viewportFit: 'cover',
    themeColor: themeColorCode,
    colorScheme: 'dark light',
  };
}

export function generateMetadata(): Metadata {
  return {
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
      statusBarStyle: 'default',
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
      apple: [
        { url: '/icons/apple-touch-icon.png', sizes: '180x180' },
        { url: '/icons/apple-touch-icon-1024x1024.png', sizes: '1024x1024' },
      ],
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
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const mode = String(cookieStore.get('mode')?.value) ?? defaultMode;
  const theme = `${mode}-theme`;
  const baseColor =
    String(cookieStore.get('baseColor')?.value) ?? defaultBaseColor;

  return (
    <html
      className={`${notoSansJP.className} overscroll-none ${theme}`}
      lang="ja"
      style={{ colorScheme: mode }}
    >
      <body
        role="application"
        className={`overscroll-none subpixel-antialiased ${
          bgVariants[`${baseColor}`]
        }`}
      >
        <Providers>{children}</Providers>
        <Analytics />
        <VercelAnalytics />
      </body>
    </html>
  );
}
