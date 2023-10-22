import { Dispatch, SetStateAction, useContext } from 'react';
import { ThemeContext, ThemeType } from '../contexts/theme-provider';
import CheckedIcon from './checked-icon';
import { Radio } from '../contexts/material-providers';
import { bgVariants } from '../utils/colorVariants';
import { checkedThemeOptionVariant } from '../utils/checkedThemeOptionVariant';

interface Props extends ThemeType {
  id: string;
  name: string;
  checkedThemeOption: string;
  setCheckedThemeOption: Dispatch<SetStateAction<string>>;
}

export default function ThemeSelectButton(props: Props) {
  const {
    id,
    name,
    baseColor,
    mainColor,
    mode,
    checkedThemeOption,
    setCheckedThemeOption,
  } = props;
  const { setTheme } = useContext(ThemeContext);

  const handleOptionChange = () => {
    setCheckedThemeOption(id);
  };

  return (
    <button
      onClick={() =>
        setTheme({
          baseColor: baseColor,
          mainColor: mainColor,
          mode: mode,
        })
      }
    >
      <Radio
        checked={
          checkedThemeOptionVariant(mainColor, mode) === checkedThemeOption
        }
        name={name}
        id={id}
        icon={<CheckedIcon />}
        label={
          <div className="grid rounded-full border border-gray-300">
            <div
              className={`h-6 w-12 rounded-t-full ${bgVariants[baseColor]}`}
            />
            <div
              className={`h-6 w-12 rounded-b-full ${bgVariants[mainColor]}`}
            />
          </div>
        }
        ripple={false}
        crossOrigin={undefined}
        onChange={handleOptionChange}
      />
    </button>
  );
}
