import { useContext, useRef } from 'react';
import { Button } from '../contexts/material-providers';
import { ShowAppInstallButtonContext } from '../contexts/show-app-install-button-provider';
import { ThemeContext } from '../contexts/theme-provider';
import { bgVariants, colorVariants } from '../utils/colorVariants';

type Props = {
  handleAppInstallButtonClick: () => void;
};

export default function AppInstallButton(props: Props) {
  const { handleAppInstallButtonClick } = props;
  const appInstallButtonRef = useRef<HTMLButtonElement>(null);
  const { showAppInstallButton } = useContext(ShowAppInstallButtonContext);

  const theme = useContext(ThemeContext);
  const { baseColor, mainColor } = theme;

  return (
    <>
      {showAppInstallButton && (
        <Button
          ref={appInstallButtonRef}
          onClick={handleAppInstallButtonClick}
          className={`flex items-center gap-0.5 rounded-full px-6 py-1.5 font-semibold !shadow-none transition hover:brightness-95 ${bgVariants[mainColor]} ${colorVariants[baseColor]}`}
        >
          <span className="select-none text-sm">入手</span>
        </Button>
      )}
    </>
  );
}
