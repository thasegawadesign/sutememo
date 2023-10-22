import { useContext } from 'react';
import { ThemeContext, ThemeType } from '../contexts/theme-provider';
import CheckedIcon from './checked-icon';
import { Radio } from '../contexts/material-providers';
import { bgVariants } from '../utils/colorVariants';

interface Props extends ThemeType {
  id: string;
  name: string;
  defaultChecked: boolean;
}

export default function ThemeSelectButton(props: Props) {
  const { id, name, baseColor, mainColor, mode, defaultChecked } = props;
  const { setTheme } = useContext(ThemeContext);

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
        defaultChecked={defaultChecked}
        name={name}
        id={id}
        icon={<CheckedIcon />}
        className="checked:before:bg-blue-gray-50 hover:bg-blue-gray-50 hover:brightness-[102%] active:bg-blue-gray-50"
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
      />
    </button>
  );
}
