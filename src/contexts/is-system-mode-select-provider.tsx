'use client';

import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';

import { Mode } from '@/contexts/theme-provider';

type IsSystemModeSelect = {
  isSystemModeSelect: boolean;
};

interface IsSystemModeSelectContext extends IsSystemModeSelect {
  setIsSystemModeSelect: Dispatch<SetStateAction<boolean>>;
}

// export const defaultMode: Mode = 'dark';

export const IsSystemModeSelectContext =
  createContext<IsSystemModeSelectContext>({
    isSystemModeSelect: true,
    setIsSystemModeSelect: () => {},
  });

export default function IsSystemModeSelectProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSystemModeSelect, setIsSystemModeSelect] = useState(true);

  useEffect(() => {
    if (!globalThis.window) return;
    // console.log(Boolean(localStorage.getItem('isSystemModeSelect')));
    setIsSystemModeSelect(
      JSON.parse(localStorage.getItem('isSystemModeSelect') as string),
    );
  }, []);

  return (
    <IsSystemModeSelectContext.Provider
      value={{
        isSystemModeSelect,
        setIsSystemModeSelect,
      }}
    >
      {children}
    </IsSystemModeSelectContext.Provider>
  );
}
