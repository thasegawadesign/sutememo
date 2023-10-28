import { env } from 'process';
import '@/globals.css';
import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import Analytics from '@/components/analytics';
import { Providers } from '@/providers';

const baseURL = env.BASE_URL;
const creator = env.CREATOR;
const authorName = env.ATHOR_NAME;
const authorURL = env.ATHOR_URL;

export const metadata: Metadata = {
  title: 'Todoify',
  description: 'Todoアプリケーション',
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
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
  themeColor: {
    color: '#191919',
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
    <html lang="ja" className="overscroll-y-none">
      <head>
        <Analytics />
      </head>
      <body
        className={`${notoSansJP.className} overscroll-y-none bg-radixGray-12 subpixel-antialiased`}
        role="application"
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
