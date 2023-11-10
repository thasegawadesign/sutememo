import { SafeTailwind, TailwindPrefix } from '@/types/ColorList';

import type { COLOR_STEP as COLOR_STEP_TYPE } from '@/types/ColorStep';
import type { Config } from 'tailwindcss';

const withMT = require('@material-tailwind/react/utils/withMT');

export const COLOR_STEP = 12;
const SOLID_STEP = 9;

export const WHITE = '#ffffff';
export const BLACK = '#000000';
export const CUSTOMGRAY = '#111111';
export const PRIMARY = '#208cd8';
export const TIGERSYELLOW = '#f7da07';
export const TIGERSBLACK = '#060606';

export const SETTINGS_DRAWER_ALPHA = 1;

type CustomSolidColorCode =
  | typeof WHITE
  | typeof BLACK
  | typeof CUSTOMGRAY
  | typeof PRIMARY
  | typeof TIGERSYELLOW
  | typeof TIGERSBLACK;

export const safeColorList = [
  `white-${SOLID_STEP}`,
  `white-a${SETTINGS_DRAWER_ALPHA}`,
  `black-${SOLID_STEP}`,
  `black-a${SETTINGS_DRAWER_ALPHA}`,
  `customGray-${SOLID_STEP}`,
  `customGray-a${SETTINGS_DRAWER_ALPHA}`,
  `primary-${SOLID_STEP}`,
  'primary-8',
  'primary-a6',
  `tigersYellow-${SOLID_STEP}`,
  `tigersYellow-a${SETTINGS_DRAWER_ALPHA}`,
  `tigersBlack-${SOLID_STEP}`,
  `tigersBlack-a${SETTINGS_DRAWER_ALPHA}`,
  'radixGray-1',
  'radixGray-2',
  'radixGray-3',
  'radixGray-7',
  'radixGray-9',
  'radixGray-12',
  `radixGray-a${SETTINGS_DRAWER_ALPHA}`,
  'radixSage-5',
  'radixSage-12',
  `radixSage-a${SETTINGS_DRAWER_ALPHA}`,
  'radixOlive-5',
  'radixOlive-11',
  `radixOlive-a${SETTINGS_DRAWER_ALPHA}`,
  'radixTomato-11',
  `radixTomato-a${SETTINGS_DRAWER_ALPHA}`,
  'radixRuby-3',
  'radixRuby-10',
  `radixRuby-a${SETTINGS_DRAWER_ALPHA}`,
  'radixCrimson-11',
  `radixCrimson-a${SETTINGS_DRAWER_ALPHA}`,
  'radixPlum-4',
  'radixPlum-12',
  `radixPlum-a${SETTINGS_DRAWER_ALPHA}`,
  'radixViolet-11',
  `radixViolet-a${SETTINGS_DRAWER_ALPHA}`,
  'radixJade-3',
  'radixJade-12',
  `radixJade-a${SETTINGS_DRAWER_ALPHA}`,
  'radixGrass-5',
  'radixGrass-10',
  'radixGrass-11',
  `radixGrass-a${SETTINGS_DRAWER_ALPHA}`,
  'radixSand-10',
  `radixSand-a${SETTINGS_DRAWER_ALPHA}`,
  'radixIris-9',
  `radixIris-a${SETTINGS_DRAWER_ALPHA}`,
  'radixGold-10',
  `radixGold-a${SETTINGS_DRAWER_ALPHA}`,
  'radixBrown-4',
  'radixBrown-12',
  `radixBrown-a${SETTINGS_DRAWER_ALPHA}`,
  'radixOrange-10',
  `radixOrange-a${SETTINGS_DRAWER_ALPHA}`,
  'radixLime-4',
  'radixLime-12',
  `radixLime-a${SETTINGS_DRAWER_ALPHA}`,
  'radixMint-3',
  'radixMint-11',
  `radixMint-a${SETTINGS_DRAWER_ALPHA}`,
  'radixAmber-3',
  'radixAmber-12',
  `radixAmber-a${SETTINGS_DRAWER_ALPHA}`,
  'radixSky-3',
  'radixSky-11',
  `radixSky-a${SETTINGS_DRAWER_ALPHA}`,
] as const;

const variants: TailwindPrefix[] = [
  'bg-',
  'hover:bg-',
  'text-',
  'border-',
  'ring-',
];

const tailwindSafelist: `"${SafeTailwind}"`[] = [];
for (const color of safeColorList) {
  for (const prefix of variants) {
    const safeColorTailwind = `"${prefix}${color}"`;
    tailwindSafelist.push(safeColorTailwind as `"${SafeTailwind}"`);
  }
}

const config: Config = withMT({
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [`${tailwindSafelist.toString()}`],
  theme: {
    extend: {
      screens: {
        pwa: { raw: '(display-mode: standalone)' },
        minimum: '300px',
        xxs: '360px',
        xs: '480px',
      },
      colors: {
        white: generateCustomeScale(WHITE),
        black: generateCustomeScale(BLACK),
        customGray: generateCustomeScale(CUSTOMGRAY),
        primary: generateCustomeScale(PRIMARY),
        tigersYellow: generateCustomeScale(TIGERSYELLOW),
        tigersBlack: generateCustomeScale(TIGERSBLACK),
        radixGray: generateRadixScale('gray'),
        radixMauve: generateRadixScale('mauve'),
        radixSlate: generateRadixScale('slate'),
        radixSage: generateRadixScale('sage'),
        radixOlive: generateRadixScale('olive'),
        radixSand: generateRadixScale('sand'),
        radixTomato: generateRadixScale('tomato'),
        radixRed: generateRadixScale('red'),
        radixRuby: generateRadixScale('ruby'),
        radixCrimson: generateRadixScale('crimson'),
        radixPink: generateRadixScale('pink'),
        radixPlum: generateRadixScale('plum'),
        radixPurple: generateRadixScale('purple'),
        radixViolet: generateRadixScale('violet'),
        radixIris: generateRadixScale('iris'),
        radixIndigo: generateRadixScale('indigo'),
        radixBlue: generateRadixScale('blue'),
        radixCyan: generateRadixScale('cyan'),
        radixTeal: generateRadixScale('teal'),
        radixJade: generateRadixScale('jade'),
        radixGreen: generateRadixScale('green'),
        radixGrass: generateRadixScale('grass'),
        radixBronze: generateRadixScale('bronze'),
        radixGold: generateRadixScale('gold'),
        radixBrown: generateRadixScale('brown'),
        radixOrange: generateRadixScale('orange'),
        radixAmber: generateRadixScale('amber'),
        radixYellow: generateRadixScale('yellow'),
        radixLime: generateRadixScale('lime'),
        radixMint: generateRadixScale('mint'),
        radixSky: generateRadixScale('sky'),
        radixBlack: generateRadixScale('black'),
        radixWhite: generateRadixScale('white'),
      },
      transitionDuration: {
        themeChange: '240ms',
      },
      transitionProperty: {
        drawer:
          'color, background-color, border-color, text-decoration-color, fill, stroke, transform',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
});
export default config;

function generateRadixScale(name: string) {
  let scale = Array.from({ length: COLOR_STEP }, (_, i) => {
    let id = i + 1;
    return [
      [id, `var(--${name}-${id})`],
      [`a${id}`, `var(--${name}-a${id})`],
    ];
  }).flat();
  return Object.fromEntries(scale);
}

function generateCustomeScale(solidColor: CustomSolidColorCode) {
  let scale = Array.from({ length: COLOR_STEP }, (_, i) => {
    let step = (i + 1) as COLOR_STEP_TYPE;
    return [
      getCustomRadix(step, solidColor),
      getCustomOpacity(step, solidColor),
    ].flat();
  });
  return Object.fromEntries(scale);
}

function getCustomRadix(
  step: COLOR_STEP_TYPE,
  solidColor: CustomSolidColorCode,
) {
  let scale = Array.from({ length: step }, (_, i) => {
    const diff = step - SOLID_STEP;
    const attenuationRate = 10;
    const rate = diff === 0 ? 1 : diff;
    const param =
      rate > 0
        ? 1 + rate / attenuationRate
        : 1 - Math.abs(rate) / attenuationRate;

    const solidColorHEX = solidColor.split('#')[1];

    const R_DECIMAL =
      Math.floor(Number(parseInt(solidColorHEX.slice(0, 2), 16)) * param) > 255
        ? 255
        : Math.floor(Number(parseInt(solidColorHEX.slice(0, 2), 16)) * param);
    const G_DECIMAL =
      Math.floor(Number(parseInt(solidColorHEX.slice(2, 4), 16)) * param) > 255
        ? 255
        : Math.floor(Number(parseInt(solidColorHEX.slice(2, 4), 16)) * param);
    const B_DECIMAL =
      Math.floor(Number(parseInt(solidColorHEX.slice(4, 6), 16)) * param) > 255
        ? 255
        : Math.floor(Number(parseInt(solidColorHEX.slice(4, 6), 16)) * param);

    const R_HEX =
      R_DECIMAL.toString(16).length === 1
        ? `0${R_DECIMAL.toString(16)}`
        : R_DECIMAL.toString(16);
    const G_HEX =
      G_DECIMAL.toString(16).length === 1
        ? `0${G_DECIMAL.toString(16)}`
        : G_DECIMAL.toString(16);
    const B_HEX =
      B_DECIMAL.toString(16).length === 1
        ? `0${B_DECIMAL.toString(16)}`
        : B_DECIMAL.toString(16);

    const colorCode = `#${R_HEX}${G_HEX}${B_HEX}`;
    return [`${step}`, `${colorCode}`];
  });
  return scale.flat();
}

function getCustomOpacity(step: COLOR_STEP_TYPE, color: CustomSolidColorCode) {
  switch (step) {
    case 1:
      return [`a${step}`, `${color}0d`];
    case 2:
      return [`a${step}`, `${color}1a`];
    case 3:
      return [`a${step}`, `${color}26`];
    case 4:
      return [`a${step}`, `${color}33`];
    case 5:
      return [`a${step}`, `${color}4d`];
    case 6:
      return [`a${step}`, `${color}66`];
    case 7:
      return [`a${step}`, `${color}80`];
    case 8:
      return [`a${step}`, `${color}99`];
    case 9:
      return [`a${step}`, `${color}b3`];
    case 10:
      return [`a${step}`, `${color}cc`];
    case 11:
      return [`a${step}`, `${color}e6`];
    case 12:
      return [`a${step}`, `${color}f2`];
  }
}
