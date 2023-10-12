import { MouseEvent } from 'react';

type Props = {
  handleAppInstallButtonClick: (event: MouseEvent) => void;
};

export default function AppInstallButton(props: Props) {
  const { handleAppInstallButtonClick } = props;
  return (
    <>
      <button
        onClick={handleAppInstallButtonClick}
        className="flex items-center gap-0.5 rounded-full bg-main px-6 py-1.5 font-semibold text-white"
      >
        <span className="text-sm">入手</span>
      </button>
    </>
  );
}
