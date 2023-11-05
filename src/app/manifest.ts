import { env } from 'process';

import { MetadataRoute } from 'next';

import { customGray } from '../../tailwind.config';

export default function manifest(): MetadataRoute.Manifest {
  const baseURL = env.BASE_URL;
  const id = '?utm_source=homescreen';
  return {
    name: 'Todoify',
    short_name: 'Todoify',
    description: 'Todoアプリケーション',
    categories: ['utilities', 'lifestyle', 'personalization', 'productivity'],
    lang: 'ja',
    dir: 'ltr',
    start_url: `${baseURL}/${id}`,
    id: id,
    scope: baseURL,
    theme_color: customGray,
    background_color: customGray,
    display_override: ['fullscreen', 'minimal-ui'],
    display: 'standalone',
    orientation: 'landscape',
    prefer_related_applications: false,
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
  };
}
