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
        className={`fixed bottom-[max(calc(env(safe-area-inset-bottom)+92px),102px)] right-[22px] rounded-full border border-gray-200 bg-gray-100 p-8 text-2xl text-gray-500 filter transition hover:brightness-95 ${
          canRedo ? 'brightness-100' : 'brightness-105 hover:brightness-105'
        }`}
        onClick={handleRedoClick}
      >
        <ImRedo />
      </button>
    </>
  );
}
