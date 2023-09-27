import { forwardRef } from 'react';
import { IoIosAdd } from 'react-icons/io';

type Props = {
  handleBtnClick: () => void;
};

export default forwardRef(function Button(props: Props) {
  const { handleBtnClick } = props;
  return (
    <button
      onClick={handleBtnClick}
      className="text-white bg-main rounded-lg p-2 text-5xl w-11/12 transition filter hover:brightness-95 fixed bottom-3 left-0 right-0 mx-auto"
    >
      <div className="grid place-items-center">
        <IoIosAdd />
      </div>
    </button>
  );
});
