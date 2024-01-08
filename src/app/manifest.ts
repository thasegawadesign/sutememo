import { MetadataRoute } from 'next';

import { appDescription, appName } from '@/common/constants';
import { MIDNIGHT_COLOR_CODE } from '@/utils/color';

export default function manifest(): MetadataRoute.Manifest {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const id = '?utm_source=homescreen';
  return {
    name: appName,
    short_name: appName,
    description: appDescription,
    categories: ['productivity'],
    lang: 'ja',
    dir: 'ltr',
    start_url: `${baseURL}/${id}`,
    id: id,
    scope: baseURL,
    theme_color: MIDNIGHT_COLOR_CODE,
    background_color: MIDNIGHT_COLOR_CODE,
    display_override: ['fullscreen', 'minimal-ui'],
    display: 'standalone',
    orientation: 'portrait',
    prefer_related_applications: false,
    icons: [
      {
        src: '/icons/rounded-app-icon-180x180.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/rounded-app-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/maskable-app-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/rounded-app-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/maskable-app-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/rounded-app-icon-1024x1024.png',
        sizes: '1024x1024',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
