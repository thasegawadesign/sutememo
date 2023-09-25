import { env } from "process";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(`http://localhost:${env.PORT}`),
  manifest: `http://localhost:${env.PORT}/manifest.webmanifest`,
  title: "Todoify",
  description: "Todoアプリケーション",
  applicationName: "Todoify",
  appleWebApp: {
    capable: true,
    title: "Todoify",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: "",
    apple: "",
  },
  twitter: {
    card: "summary",
    creator: "@565683i",
    images: "",
  },
  openGraph: {
    type: "website",
    url: "",
    title: "Todoify",
    description: "Todoアプリケーション",
    siteName: "Todoify",
    images: [
      {
        url: "",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
