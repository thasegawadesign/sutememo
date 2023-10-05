import { env } from 'process';
import './globals.css';
import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import Analytics from './components/Analytics';

const baseURL = env.BASE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(baseURL as string),
  manifest: `${baseURL}/manifest.webmanifest`,
  title: 'Todoify',
  description: 'Todoアプリケーション',
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
    color: '#208cd8',
  },
  twitter: {
    card: 'summary',
    creator: '@565683i',
  },
  openGraph: {
    type: 'website',
    url: baseURL,
    title: 'Todoify',
    description: 'Todoアプリケーション',
    siteName: 'Todoify',
    images: [
      {
        url: '',
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
    <html lang="ja" className="overscroll-none">
      <Analytics />
      <body
        className={`overscroll-none ${notoSansJP.className}`}
        role="application"
      >
        {children}
      </body>
    </html>
  );
}
