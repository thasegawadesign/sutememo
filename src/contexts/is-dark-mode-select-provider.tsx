'use client';

import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';

type IsDarkModeSelect = {
  isDarkModeSelect: boolean;
};

interface IsDarkModeSelectContext extends IsDarkModeSelect {
  setIsDarkModeSelect: Dispatch<SetStateAction<boolean>>;
}

export const IsDarkModeSelectContext = createContext<IsDarkModeSelectContext>({
  isDarkModeSelect: true,
  setIsDarkModeSelect: () => {},
});

export default function IsDarkModeSelectProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDarkModeSelect, setIsDarkModeSelect] = useState(true);

  useEffect(() => {
    if (!globalThis.window) return;
    setIsDarkModeSelect(
      JSON.parse(localStorage.getItem('isDarkModeSelect') as string) ?? true,
    );
  }, []);

  return (
    <IsDarkModeSelectContext.Provider
      value={{
        isDarkModeSelect,
        setIsDarkModeSelect,
      }}
    >
      {children}
    </IsDarkModeSelectContext.Provider>
  );
}
