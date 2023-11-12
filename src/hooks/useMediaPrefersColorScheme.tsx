import { useEffect, useState } from 'react';

import { Mode } from '@/contexts/theme-provider';

export default function useMediaPrefersColorScheme() {
  const [colorScheme, setColorSheme] = useState<Mode>('dark');
  useEffect(() => {
    const updateMediaPrefersColorScheme = () => {
      const prefersColorScheme: Mode = matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches
        ? 'dark'
        : 'light';
      setColorSheme(prefersColorScheme);
    };

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', updateMediaPrefersColorScheme);
    updateMediaPrefersColorScheme();

    return () =>
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', updateMediaPrefersColorScheme);
  }, []);

  return colorScheme;
}
