import { MouseEvent, RefObject } from 'react';

type Props = {
  handleAppInstallButtonClick: (event: MouseEvent) => void;
  appInstallButtonRef: RefObject<HTMLButtonElement>;
};

export default function AppInstallButton(props: Props) {
  const { handleAppInstallButtonClick, appInstallButtonRef } = props;
  return (
    <>
      <button
        ref={appInstallButtonRef}
        onClick={handleAppInstallButtonClick}
        className="flex items-center gap-0.5 rounded-full bg-main px-6 py-1.5 font-semibold text-white filter transition hover:brightness-95"
      >
        <span className="text-sm">入手</span>
      </button>
    </>
  );
}
