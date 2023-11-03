'use client';

import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';

type IsSystemModeSelect = {
  isSystemModeSelect: boolean;
};

interface IsSystemModeSelectContext extends IsSystemModeSelect {
  setIsSystemModeSelect: Dispatch<SetStateAction<boolean>>;
}

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
