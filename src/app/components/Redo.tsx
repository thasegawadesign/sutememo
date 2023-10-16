import { TouchEvent } from 'react';
import { ImRedo } from 'react-icons/im';

type Props = {
  canRedo: boolean;
  handleRedoClick: () => void;
};

export default function Redo(props: Props) {
  const { canRedo, handleRedoClick } = props;

  return (
    <>
      <button
        tabIndex={0}
        aria-label="Redo"
        role="button"
        className={`xs:text-xl xs:p-7 fixed bottom-[max(calc(env(safe-area-inset-bottom)+80px),102px)] right-[22px] rounded-full border border-gray-200 bg-gray-100 p-[26px] text-lg
        brightness-105 filter transition ${
          canRedo
            ? 'text-gray-500 hover:brightness-[102%]'
            : 'text-gray-300 hover:brightness-105'
        }`}
        onClick={handleRedoClick}
      >
        <ImRedo />
      </button>
    </>
  );
}
