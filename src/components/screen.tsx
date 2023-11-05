'use client';

import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';

import {
  setCookiesIsDarkModeSelect,
  setCookiesIsSystemModeSelect,
  setCookiesUserTheme,
} from '@/app/actions';
import IconSvg from '@/components/icon-svg';
import { IsDarkModeSelectContext } from '@/contexts/is-dark-mode-select-provider';
import { IsSystemModeSelectContext } from '@/contexts/is-system-mode-select-provider';
import { ThemeContext } from '@/contexts/theme-provider';
import { bgVariants } from '@/utils/colorVariants';
import { updateBodyBackgroundColor } from '@/utils/updateBodyBackgroundColor';
import { updateMetaThemeColor } from '@/utils/updateMetaThemeColor';

export default function Screen({ children }: { children: React.ReactNode }) {
  const { isSystemModeSelect } = useContext(IsSystemModeSelectContext);
  const { isDarkModeSelect } = useContext(IsDarkModeSelectContext);
  const { baseColor, mainColor, mode } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    setCookiesUserTheme(baseColor, mainColor, mode);
  }, [baseColor, mainColor, mode]);

  useEffect(() => {
    updateBodyBackgroundColor(baseColor);
    updateMetaThemeColor(baseColor, mode);
  }, [baseColor, mode]);

  useEffect(() => {
    setCookiesIsDarkModeSelect(isDarkModeSelect);
  }, [isDarkModeSelect]);

  useEffect(() => {
    setCookiesIsSystemModeSelect(isSystemModeSelect);
  }, [isSystemModeSelect]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <div
          className={clsx(
            'grid min-h-[100svh] place-items-center pb-[env(safe-area-inset-bottom)] pwa:min-h-screen',
            {
              'bg-customGray-9': mode === 'dark',
              'bg-white-12': mode === 'light',
            },
          )}
        ></div>
      ) : (
        <div
          className={`min-h-[100svh] pt-[env(safe-area-inset-top)] pwa:min-h-screen ${bgVariants[baseColor]}`}
        >
          {children}
        </div>
      )}
    </>
  );
}
