import { useEffect, useState } from 'react';

import { CustomColorList, SafeColorList } from '@/types/ColorList';
import { customColorList } from '@/utils/customColorList';

import {
  black,
  customGray,
  primary,
  tigersBlack,
  tigersYellow,
  white,
} from '../../tailwind.config';

type Props = {
  color: SafeColorList;
};

export default function useRealColor(props: Props) {
  const { color } = props;

  const colorType = color.split('-')[0];

  const [resultColor, setResultColor] = useState('');
  const [radixColorType, setRadixColorType] = useState('');
  const [radixColorStep, setRadixColorStep] = useState(0);

  const isCustomThemeColor = customColorList.includes(
    colorType as CustomColorList,
  );

  useEffect(() => {
    if (isCustomThemeColor) {
      switch (colorType as never as CustomColorList) {
        case 'white':
          setResultColor(white);
          break;
        case 'black':
          setResultColor(black);
          break;
        case 'customGray':
          setResultColor(customGray);
          break;
        case 'primary':
          setResultColor(primary);
          break;
        case 'tigersBlack':
          setResultColor(tigersBlack);
          break;
        case 'tigersYellow':
          setResultColor(tigersYellow);
          break;
      }
    } else {
      setRadixColorType(colorType.split('radix')[1].toLowerCase());
      setRadixColorStep(Number(color.split('-')[1]));
      setResultColor(
        getComputedStyle(document.documentElement).getPropertyValue(
          `--${radixColorType}-${radixColorStep}`,
        ),
      );
    }
  }, [color, colorType, isCustomThemeColor, radixColorStep, radixColorType]);

  return resultColor;
}
