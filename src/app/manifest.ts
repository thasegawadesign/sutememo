import { MetadataRoute } from 'next';
import { env } from 'process';

export default function manifest(): MetadataRoute.Manifest {
  const baseURL = env.BASE_URL;
  const id = '?utm_source=homescreen';
  return {
    name: 'Todoify',
    short_name: 'Todoify',
    description: 'Todoアプリケーション',
    lang: 'ja',
    dir: 'ltr',
    start_url: `${baseURL}/${id}`,
    id: `${id}`,
    scope: `${baseURL}`,
    display: 'standalone',
    orientation: 'landscape',
    background_color: '#ffffff',
    theme_color: '#191919',
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-256x256.png',
        sizes: '256x256',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    prefer_related_applications: false,
  };
}
