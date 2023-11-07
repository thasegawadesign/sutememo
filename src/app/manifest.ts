import { MetadataRoute } from 'next';

import { customGray } from '../../tailwind.config';

export default function manifest(): MetadataRoute.Manifest {
  const baseURL = process.env.BASE_URL;
  const id = '?utm_source=homescreen';
  return {
    name: 'Todoify',
    short_name: 'Todoify',
    description: 'Todoアプリケーション',
    categories: ['productivity'],
    lang: 'ja',
    dir: 'ltr',
    start_url: `${baseURL}/${id}`,
    id: id,
    scope: baseURL,
    theme_color: customGray,
    background_color: customGray,
    display_override: ['fullscreen', 'minimal-ui'],
    display: 'standalone',
    orientation: 'portrait',
    prefer_related_applications: false,
    icons: [
      {
        src: '/icons/maskable-app-icon-180x180.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/maskable-app-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/maskable-app-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/maskable-app-icon-1024x1024.png',
        sizes: '1024x1024',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
