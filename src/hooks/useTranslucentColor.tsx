import { useCallback, useEffect, useState } from 'react';

import {
  CustomScaleAlpha,
  RadixScaleAlpha,
  SafeColorList,
} from '@/types/ColorList';
import { COLOR_STEP } from '@/types/ColorStep';
import { customColorList } from '@/utils/customColorList';

import { defaultTranslucentColor } from '../../tailwind.config';

type Props = {
  color: SafeColorList;
};

export default function useTranslucentColor(props: Props) {
  const { color } = props;

  const [translucentColor, setTranslucentColor] = useState<
    RadixScaleAlpha | CustomScaleAlpha
  >(defaultTranslucentColor);

  const generateTranslucentColor = useCallback((color: SafeColorList) => {
    let isCustomBaseColor: boolean;
    let colorStep: COLOR_STEP;
    const colorType = color.split('-')[0];
    for (const customColor of customColorList) {
      isCustomBaseColor = colorType === customColor;
      if (isCustomBaseColor) {
        setTranslucentColor(`${colorType}-a${6}` as CustomScaleAlpha);
      } else {
        colorStep = Number(color.split('-')[1]) as never;
        if (colorStep < 3) {
          setTranslucentColor(`${colorType}-a${colorStep}` as RadixScaleAlpha);
        } else if (colorStep < 6) {
          setTranslucentColor(
            `${colorType}-a${colorStep - 2}` as RadixScaleAlpha,
          );
        } else if (colorStep < 10) {
          setTranslucentColor(
            `${colorType}-a${colorStep - 3}` as RadixScaleAlpha,
          );
        } else {
          setTranslucentColor(
            `${colorType}-a${colorStep - 6}` as RadixScaleAlpha,
          );
        }
      }
    }
  }, []);

  useEffect(() => {
    generateTranslucentColor(color);
  }, [color, generateTranslucentColor]);

  return translucentColor;
}
