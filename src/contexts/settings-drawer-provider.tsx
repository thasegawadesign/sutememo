'use client';

import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, createContext, useState } from 'react';

import { themeChangeDurationMs } from '@/utils/themeChange';

type SettingsDrawer = {
  isOpenDrawer: boolean;
  isExit: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

interface SettingsDrawerContext extends SettingsDrawer {
  setIsOpenDrawer: Dispatch<SetStateAction<boolean>>;
  setIsExit: Dispatch<SetStateAction<boolean>>;
}

export const SettingsDrawerContext = createContext<SettingsDrawerContext>({
  isOpenDrawer: false,
  isExit: false,
  openDrawer: () => {},
  closeDrawer: () => {},
  setIsOpenDrawer: () => {},
  setIsExit: () => {},
});

type Props = {
  children: React.ReactNode;
};

export default function SettingsDrawerProvider(props: Props) {
  const { children } = props;

  const router = useRouter();

  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isExit, setIsExit] = useState(false);
  const openDrawer = () => {
    setIsExit(false);
    setIsOpenDrawer(true);
  };
  const closeDrawer = () => {
    const bufferTimeMs = 480;
    setIsExit(true);
    setIsOpenDrawer(false);
    setTimeout(() => {
      router.push('/home');
    }, themeChangeDurationMs + bufferTimeMs);
  };
  return (
    <SettingsDrawerContext.Provider
      value={{
        isOpenDrawer,
        isExit,
        openDrawer,
        closeDrawer,
        setIsOpenDrawer,
        setIsExit,
      }}
    >
      {children}
    </SettingsDrawerContext.Provider>
  );
}
