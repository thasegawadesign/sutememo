'use client';

import { useContext, useEffect, useState } from 'react';

import {
  setCookiesIsDarkModeSelect,
  setCookiesIsSystemModeSelect,
  setCookiesUserTheme,
} from '@/app/actions';
import FullScreenSolidBackgound from '@/components/fullscreen-solid-backgound';
import { IsDarkModeSelectContext } from '@/contexts/is-dark-mode-select-provider';
import { IsSystemModeSelectContext } from '@/contexts/is-system-mode-select-provider';
import { ThemeContext } from '@/contexts/theme-provider';
import useMediaPrefersColorScheme from '@/hooks/useMediaPrefersColorScheme';
import { bgVariants } from '@/utils/colorVariants';
import { handlePrefersColorSchemeChange } from '@/utils/handlePrefersColorSchemeChange';
import { updateBodyBackgroundColor } from '@/utils/updateBodyBackgroundColor';
import { updateHtmlColorScheme } from '@/utils/updateHtmlColorScheme';
import { updateMetaThemeColor } from '@/utils/updateMetaThemeColor';

export default function Screen({ children }: { children: React.ReactNode }) {
  const { isSystemModeSelect } = useContext(IsSystemModeSelectContext);
  const { isDarkModeSelect, setIsDarkModeSelect } = useContext(
    IsDarkModeSelectContext,
  );
  const { baseColor, mainColor, mode, setTheme } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(true);
  const prefersColorScheme = useMediaPrefersColorScheme();

  useEffect(() => {
    if (!globalThis.window) return;
    if (isSystemModeSelect) {
      setTheme({
        baseColor,
        mainColor,
        mode: prefersColorScheme,
      });
      setIsDarkModeSelect(prefersColorScheme === 'dark');
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener(
          'change',
          handlePrefersColorSchemeChange.bind(isSystemModeSelect),
        );
    }

    return () =>
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener(
          'change',
          handlePrefersColorSchemeChange.bind(isSystemModeSelect),
        );
  }, [
    baseColor,
    isSystemModeSelect,
    mainColor,
    prefersColorScheme,
    setIsDarkModeSelect,
    setTheme,
  ]);

  useEffect(() => {
    updateHtmlColorScheme(mode);
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
        <FullScreenSolidBackgound colorName="midnight-9" />
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
