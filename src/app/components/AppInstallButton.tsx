import { MouseEvent, RefObject } from 'react';
import { Button } from '@material-tailwind/react';

type Props = {
  handleAppInstallButtonClick: (event: MouseEvent) => void;
  appInstallButtonRef: RefObject<HTMLButtonElement>;
};

export default function AppInstallButton(props: Props) {
  const { handleAppInstallButtonClick, appInstallButtonRef } = props;
  return (
    <>
      <Button
        ref={appInstallButtonRef}
        onClick={handleAppInstallButtonClick}
        className="flex items-center gap-0.5 rounded-full bg-main px-6 py-1.5 font-semibold text-white !shadow-none filter transition hover:brightness-95"
      >
        <span className="select-none text-sm">入手</span>
      </Button>
    </>
  );
}
