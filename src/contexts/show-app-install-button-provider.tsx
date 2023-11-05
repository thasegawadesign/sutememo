'use client';

import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
} from 'react';

interface ShowAppInstallButtonType {
  showAppInstallButton: boolean;
}

interface ShowAppInstallButtonContext extends ShowAppInstallButtonType {
  setShowAppInstallButton: Dispatch<SetStateAction<boolean>>;
}

export const ShowAppInstallButtonContext =
  createContext<ShowAppInstallButtonContext>({
    showAppInstallButton: false,
    setShowAppInstallButton: () => {},
  });

export default function ShowAppInstallButtonProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showAppInstallButton, setShowAppInstallButton] = useState(false);

  return (
    <ShowAppInstallButtonContext.Provider
      value={{ showAppInstallButton, setShowAppInstallButton }}
    >
      {children}
    </ShowAppInstallButtonContext.Provider>
  );
}
