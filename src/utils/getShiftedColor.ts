import { Mode } from '@/contexts/theme-provider';
import { CustomScale, RadixScale, SafeColorList } from '@/types/ColorList';
import { COLOR_STEP, SHIFT_COLOR_STEP } from '@/types/ColorStep';
import { judgeIsTranslucentColor } from '@/utils//judgeIsTranslucentColor';
import { getColorStep } from '@/utils/getColorStep';
import { getColorType } from '@/utils/getColorType';
import { judgeIsCustomThemeColor } from '@/utils/judgeIsCustomThemeColor';

type Method = 'lighten' | 'darken';
type Sign = 'plus' | 'minus';

export const getShiftedColor = (
  colorName: SafeColorList,
  shiftAmount: SHIFT_COLOR_STEP,
  method: Method,
  mode: Mode,
) => {
  const colorType = getColorType(colorName);
  const colorStep = getColorStep(colorName);
  const isTranslucentColor = judgeIsTranslucentColor(colorName);
  const isCustomThemeColor = judgeIsCustomThemeColor(colorType);
  let resultShiftedColor: RadixScale | CustomScale;
  let resultStep: COLOR_STEP;
  if (isCustomThemeColor) {
    const sign = getSignCustom(method);
    resultStep = calcShiftedStep(colorStep, shiftAmount, sign);
    resultShiftedColor = isTranslucentColor
      ? `${colorType}-a${resultStep}`
      : `${colorType}-${resultStep}`;
  } else {
    const sign = getSignRadix(method, mode);
    resultStep = calcShiftedStep(colorStep, shiftAmount, sign);
    resultShiftedColor = isTranslucentColor
      ? `${colorType}-a${resultStep}`
      : `${colorType}-${resultStep}`;
  }
  return resultShiftedColor;
};

function calcShiftedStep(
  colorStep: COLOR_STEP,
  shiftAmount: SHIFT_COLOR_STEP,
  sign: Sign,
) {
  let step: COLOR_STEP;
  if (sign === 'plus') {
    step = checkExceedsUpperLimit(colorStep, shiftAmount)
      ? 12
      : ((colorStep + shiftAmount) as COLOR_STEP);
  } else {
    step = checkBelowLowerLimit(colorStep, shiftAmount)
      ? 1
      : ((colorStep - shiftAmount) as COLOR_STEP);
  }
  return step;
}

function getSignRadix(method: Method, mode: Mode) {
  let sign: Sign = 'plus';
  if (mode === 'dark' && method === 'darken') {
    sign = 'minus';
    return sign;
  }
  if (mode === 'dark' && method === 'lighten') {
    sign = 'plus';
    return sign;
  }
  if (mode === 'light' && method === 'darken') {
    sign = 'plus';
    return sign;
  }
  if (mode === 'light' && method === 'lighten') {
    sign = 'minus';
    return sign;
  }
  return sign;
}

function getSignCustom(method: Method) {
  let sign: Sign;
  if (method === 'darken') {
    sign = 'minus';
  } else {
    sign = 'plus';
  }
  return sign;
}

function checkExceedsUpperLimit(colorStep: COLOR_STEP, shiftAmount: number) {
  if (colorStep + shiftAmount > 12) return true;
  return false;
}

function checkBelowLowerLimit(colorStep: COLOR_STEP, shiftAmount: number) {
  if (colorStep - shiftAmount < 1) return true;
  return false;
}
