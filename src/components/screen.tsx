'use client';

import { useContext, useEffect, useState } from 'react';

import { SystemColorSchemeContext } from '@/contexts/system-color-scheme-provider';
import {
  Mode,
  ThemeContext,
  defaultBaseColor,
  defaultMainColor,
} from '@/contexts/theme-provider';
import { SafeColorList } from '@/types/ColorList';
import { bgVariants } from '@/utils/colorVariants';
import { updateBodyBackgroundColor } from '@/utils/updateBodyBackgroundColor';
import { updateMetaThemeColor } from '@/utils/updateMetaThemeColor';

import { safeColorList } from '../../tailwind.config';

export default function Screen({ children }: { children: React.ReactNode }) {
  const { setPrefersColorScheme } = useContext(SystemColorSchemeContext);
  const { baseColor, mainColor, mode, setTheme } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return;
    localStorage.setItem('baseColor', baseColor);
    localStorage.setItem('mainColor', mainColor);
    localStorage.setItem('mode', mode);
    updateBodyBackgroundColor(baseColor);
    updateMetaThemeColor(baseColor, mode);
  }, [baseColor, isLoading, mainColor, mode]);

  useEffect(() => {
    const initialBaseColor = safeColorList.includes(
      localStorage.getItem('baseColor') as SafeColorList,
    )
      ? (localStorage.getItem('baseColor') as SafeColorList)
      : defaultBaseColor;
    const initialMainColor = safeColorList.includes(
      localStorage.getItem('mainColor') as SafeColorList,
    )
      ? (localStorage.getItem('mainColor') as SafeColorList)
      : defaultMainColor;
    const initialMode = localStorage.getItem('mode')
      ? (localStorage.getItem('mode') as Mode)
      : matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    setTheme({
      baseColor: initialBaseColor,
      mainColor: initialMainColor,
      mode: initialMode,
    });
    updateBodyBackgroundColor(initialBaseColor);
    updateMetaThemeColor(initialBaseColor, initialMode);
    setIsLoading(false);
  }, [setTheme]);

  useEffect(() => {
    if (matchMedia('(prefers-color-scheme: dark)').matches) {
      setPrefersColorScheme('dark');
    }
    if (matchMedia('(prefers-color-scheme: light)').matches) {
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
