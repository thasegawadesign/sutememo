import clsx from 'clsx';
import { useContext, useRef } from 'react';

import { Button } from '@/contexts/material-providers';
import { ShowAppInstallButtonContext } from '@/contexts/show-app-install-button-provider';
import { ThemeContext } from '@/contexts/theme-provider';
import { bgVariants, colorVariants } from '@/utils/colorVariants';

type Props = {
  handleAppInstallButtonClick: () => void;
};

export default function AppInstallButton(props: Props) {
  const { handleAppInstallButtonClick } = props;
  const appInstallButtonRef = useRef<HTMLButtonElement>(null);
  const { showAppInstallButton } = useContext(ShowAppInstallButtonContext);

  const { baseColor, mainColor, mode } = useContext(ThemeContext);

  return (
    <>
      {showAppInstallButton && (
        <Button
          ref={appInstallButtonRef}
          className={clsx(
            `flex items-center gap-0.5 rounded-full px-6 py-1.5 font-semibold !shadow-none transition ${bgVariants[`${mainColor}`]} ${colorVariants[`${baseColor}`]}`,
            {
              'hover:brightness-110 active:brightness-125': mode === 'light',
              'hover:brightness-95 active:brightness-90': mode === 'dark',
            },
          )}
          onClick={handleAppInstallButtonClick}
        >
          <span className="select-none text-sm">入手</span>
        </Button>
      )}
    </>
  );
}
