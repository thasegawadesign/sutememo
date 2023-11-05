'use client';

import { Dispatch, SetStateAction, createContext, useState } from 'react';

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

type Props = {
  children: React.ReactNode;
  isChecked: boolean | string | undefined;
};

export default function IsDarkModeSelectProvider(props: Props) {
  const { children, isChecked } = props;

  const [isDarkModeSelect, setIsDarkModeSelect] = useState(
    isChecked === undefined
      ? true
      : isChecked === true
      ? true
      : isChecked === false
      ? false
      : JSON.parse(isChecked),
  );

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
