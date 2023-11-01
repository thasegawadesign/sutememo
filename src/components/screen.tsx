'use client';

import { useContext, useEffect } from 'react';

import { SystemColorSchemeContext } from '@/contexts/system-color-scheme-provider';
import { ThemeContext } from '@/contexts/theme-provider';
import { bgVariants } from '@/utils/colorVariants';

export default function Screen({ children }: { children: React.ReactNode }) {
  const { prefersColorScheme, setPrefersColorScheme } = useContext(
    SystemColorSchemeContext,
  );
  const { baseColor, mainColor, mode, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    setTheme({
      baseColor,
      mainColor,
      mode: prefersColorScheme,
    });
  }, [baseColor, mainColor, prefersColorScheme, setTheme]);

  useEffect(() => {
    if (matchMedia('(prefers-color-scheme: dark)').matches) {
      setPrefersColorScheme('dark');
    } else {
      setPrefersColorScheme('light');
    }
  }, [setPrefersColorScheme]);

  useEffect(() => {
    const HTML = document.querySelector('html');
    if (!HTML) return;
    switch (mode) {
      case 'light':
        HTML.style.colorScheme = 'light';
        HTML.classList.remove('dark-theme');
        HTML.classList.add('light-theme');
        break;
      case 'dark':
        HTML.style.colorScheme = 'dark';
        HTML.classList.remove('light-theme');
        HTML.classList.add('dark-theme');
        break;
    }
  }, [mode]);

  return (
    <>
      <div
        className={`min-h-[100svh] pt-[env(safe-area-inset-top)] pwa:min-h-screen ${bgVariants[baseColor]}`}
      >
        {children}
      </div>
    </>
  );
}
