'use client';

import { Dispatch, SetStateAction, useContext, useEffect } from 'react';

import CheckedIcon from '@/components/checked-icon';
import { Radio } from '@/contexts/material-providers';
import { ThemeContext, ThemeType } from '@/contexts/theme-provider';
import { ThemeId } from '@/types/ColorList';
import { checkedThemeOptionVariant } from '@/utils/checkedThemeOptionVariant';
import { bgVariants } from '@/utils/colorVariants';

interface Props extends ThemeType {
  id: ThemeId;
  name: string;
  checkedThemeOption: ThemeId;
  setCheckedThemeOption: Dispatch<SetStateAction<ThemeId>>;
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

  const theme = useContext(ThemeContext);
  const setTheme = theme.setTheme;
  const contextBaseColor = theme.baseColor;
  const contextMainColor = theme.mainColor;
  const contextMode = theme.mode;

  const handleOptionChange = () => {
    setCheckedThemeOption(
      checkedThemeOptionVariant(
        contextMainColor,
        contextBaseColor,
        contextMode,
      ),
    );
  };

  useEffect(() => {
    setCheckedThemeOption(
      checkedThemeOptionVariant(
        contextMainColor,
        contextBaseColor,
        contextMode,
      ),
    );
  }, [contextBaseColor, contextMainColor, contextMode, setCheckedThemeOption]);

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
        crossOrigin={undefined}
        icon={<CheckedIcon />}
        id={id}
        name={name}
        ripple={false}
        checked={
          checkedThemeOptionVariant(mainColor, baseColor, mode) ===
          checkedThemeOption
        }
        label={
          <div className={'grid rounded-full border border-radixGray-6'}>
            <div
              className={`h-6 w-12 rounded-t-full ${bgVariants[baseColor]}`}
            />
            <div
              className={`h-6 w-12 rounded-b-full ${bgVariants[mainColor]}`}
            />
          </div>
        }
        onChange={handleOptionChange}
      />
    </button>
  );
}
