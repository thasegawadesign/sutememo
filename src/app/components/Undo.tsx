import { ImUndo } from 'react-icons/im';

type Props = {
  handleUndoClick: () => void;
};

export default function Undo(props: Props) {
  const { handleUndoClick } = props;
  return (
    <>
      <button
        className="fixed bottom-24 left-[22px] rounded-full bg-gray-50 p-9 text-2xl text-gray-500 filter transition hover:brightness-95"
        onClick={handleUndoClick}
      >
        <ImUndo />
      </button>
    </>
  );
}
