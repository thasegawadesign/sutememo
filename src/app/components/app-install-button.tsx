import { useContext, useRef } from 'react';
import { Button } from '../context/material-providers';
import { ShowAppInstallButtonContext } from '../context/show-app-install-button-context';

type Props = {
  handleAppInstallButtonClick: () => void;
};

export default function AppInstallButton(props: Props) {
  const { handleAppInstallButtonClick } = props;
  const appInstallButtonRef = useRef<HTMLButtonElement>(null);
  const showInstallButton = useContext(ShowAppInstallButtonContext);

  return (
    <>
      {showInstallButton && (
        <Button
          ref={appInstallButtonRef}
          onClick={handleAppInstallButtonClick}
          className="flex items-center gap-0.5 rounded-full bg-main px-6 py-1.5 font-semibold text-white !shadow-none filter transition hover:brightness-95"
        >
          <span className="select-none text-sm">入手</span>
        </Button>
      )}
    </>
  );
}
