import { forwardRef } from 'react';
import { isIOS } from 'react-device-detect';
import { IoIosAdd } from 'react-icons/io';

type Props = {
  handleBtnClick: () => void;
};

export default forwardRef(function Button(props: Props) {
  const { handleBtnClick } = props;
  return (
    <button
      onClick={handleBtnClick}
      className={`text-white bg-main rounded-lg p-2 text-5xl w-[calc(100%-40px)] transition filter hover:brightness-95 fixed bottom-5 left-0 right-0 mx-auto ${
        isIOS && 'bottom-[calc(0.6vh+20px)]'
      }`}
    >
      <div className="grid place-items-center">
        <IoIosAdd />
      </div>
    </button>
  );
});
