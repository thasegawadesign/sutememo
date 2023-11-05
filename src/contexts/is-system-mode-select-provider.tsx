'use client';

import { Dispatch, SetStateAction, createContext, useState } from 'react';

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

type Props = {
  children: React.ReactNode;
  isChecked: boolean | string | undefined;
};

export default function IsSystemModeSelectProvider(props: Props) {
  const { children, isChecked } = props;

  const [isSystemModeSelect, setIsSystemModeSelect] = useState(
    isChecked === undefined
      ? true
      : isChecked === true
      ? true
      : isChecked === false
      ? false
      : JSON.parse(isChecked),
  );

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
