'use client';

import { useContext, useEffect, useState } from 'react';

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
    if (isLoading) return;
    localStorage.setItem('baseColor', baseColor);
    localStorage.setItem('mainColor', mainColor);
    localStorage.setItem('mode', mode);
    localStorage.setItem(
      'isSystemModeSelect',
      JSON.stringify(isSystemModeSelect),
    );
    localStorage.setItem('isDarkModeSelect', JSON.stringify(isDarkModeSelect));
    updateBodyBackgroundColor(baseColor);
    updateMetaThemeColor(baseColor, mode);
  }, [
    baseColor,
    isDarkModeSelect,
    isLoading,
    isSystemModeSelect,
    mainColor,
    mode,
  ]);

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
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="bg-customGray-a10 grid min-h-[100svh] place-items-center pb-[env(safe-area-inset-bottom)] pwa:min-h-screen">
          <div className={'w-[min(15vw,80px)]'}>
            <IconSvg color="white-a10" />
          </div>
        </div>
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
