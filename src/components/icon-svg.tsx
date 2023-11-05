'use client';

import { useEffect, useState } from 'react';

import { CustomColorList, SafeColorList } from '@/types/ColorList';
import { colorVariants } from '@/utils/colorVariants';
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
  isLoading?: boolean;
};

export default function IconSvg(props: Props) {
  const { color, isLoading } = props;

  const colorType = color.split('-')[0];

  const [resultColor, setResultColor] = useState('');
  const [radixColorType, setRadixColorType] = useState('');
  const [radixColorStep, setRadixColorStep] = useState(0);

  const isCustomThemeColor = customColorList.includes(
    colorType as CustomColorList,
  );

  useEffect(() => {
    if (isLoading) return;
    if (isCustomThemeColor) {
      switch (colorType as CustomColorList) {
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
  }, [
    color,
    colorType,
    isCustomThemeColor,
    isLoading,
    radixColorStep,
    radixColorType,
  ]);

  return (
    <svg
      height={206.83}
      style={{ maxWidth: '100%', maxHeight: '100%' }}
      viewBox="0 0 263.41 206.83"
      width={263.41}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="layer">
        <g id="group">
          <g id="l">
            <rect
              className={`fill-current ${colorVariants[color]}`}
              height="140.67"
              rx="12"
              ry="12"
              style={{ fill: resultColor, strokeWidth: '0' }}
              transform="translate(-79.81 88.1) rotate(-45)"
              width="61.31"
              x="35.79"
              y="70.05"
            />
          </g>
          <g id="r">
            <rect
              className={`fill-current ${colorVariants[color]}`}
              height="61.31"
              rx="12"
              ry="12"
              style={{ fill: resultColor, strokeWidth: '0' }}
              transform="translate(-26.26 143.42) rotate(-45)"
              width="245.24"
              x="37.37"
              y="72.76"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
