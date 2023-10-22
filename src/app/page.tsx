'use client';

import { useContext } from 'react';
import Header from './components/header';
import Main from './components/main';
import { ThemeContext } from './contexts/theme-provider';
import { bgVariants } from './utils/colorVariants';

export default function Home() {
  const theme = useContext(ThemeContext);
  const { baseColor } = theme;

  return (
    <>
      <div
        className={`min-h-[100svh] overscroll-none pt-[env(safe-area-inset-top)] pwa:min-h-screen ${bgVariants[baseColor]}`}
      >
        <Header />
        <Main />
      </div>
    </>
  );
}
