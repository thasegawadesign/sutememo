import { SafeTailwind, TailwindPrefix } from '@/types/ColorList';

import type { Config } from 'tailwindcss';

const withMT = require('@material-tailwind/react/utils/withMT');

export const RADIX_COLOR_STEP = 12;
export const CUSTOM_COLOR_STEP = 10;

export const primary = '#208cd8';
const tigersYellow = '#f7da07';
const tigersBlack = '#060606';

export const backgroundColor = '#f9f9f9';
export const themeColor = '#202020';

export const safeColorList = [
  'white',
  'black',
  'primary-a10',
  'tigersYellow-a10',
  'tigersBlack-a10',
  'radixGray-2',
  'radixGray-7',
  'radixGray-12',
  'radixOlive-8',
  'radixOlive-12',
  'radixGrass-5',
  'radixGrass-10',
  'radixSand-10',
  'radixRuby-5',
  'radixRuby-8',
  'radixRuby-9',
  'radixIris-9',
  'radixCyan-9',
  'radixCyan-12',
  'radixGold-10',
  'radixPlum-12',
  'radixViolet-5',
  'radixViolet-10',
  'radixBrown-4',
  'radixBrown-12',
  'radixOrange-10',
  'radixLime-4',
  'radixLime-12',
  'radixJade-3',
  'radixJade-12',
  'radixAmber-3',
  'radixAmber-12',
  'radixSky-3',
  'radixSky-11',
] as const;

const variants: TailwindPrefix[] = [
  'bg-',
  'hover:bg-',
  'text-',
  'border-',
  'ring-',
  '!fill-',
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
        primary: generateCustomeScale(primary),
        tigersYellow: generateCustomeScale(tigersYellow),
        tigersBlack: generateCustomeScale(tigersBlack),
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
  let scale = Array.from({ length: RADIX_COLOR_STEP }, (_, i) => {
    let id = i + 1;
    return [
      [id, `var(--${name}-${id})`],
      [`a${id}`, `var(--${name}-a${id})`],
    ];
  }).flat();
  return Object.fromEntries(scale);
}

function generateCustomeScale(color: string) {
  let scale = Array.from({ length: CUSTOM_COLOR_STEP }, (_, i) => {
    let id = i + 1;
    return getCustomOpacity(id, color);
  });
  return Object.fromEntries(scale);
}

function getCustomOpacity(id: number, color: string) {
  switch (id) {
    case 1:
      return [`a${id}`, `${color}1a`];
    case 2:
      return [`a${id}`, `${color}33`];
    case 3:
      return [`a${id}`, `${color}4d`];
    case 4:
      return [`a${id}`, `${color}66`];
    case 5:
      return [`a${id}`, `${color}80`];
    case 6:
      return [`a${id}`, `${color}99`];
    case 7:
      return [`a${id}`, `${color}b3`];
    case 8:
      return [`a${id}`, `${color}cc`];
    case 9:
      return [`a${id}`, `${color}e6`];
    case 10:
      return [`a${id}`, `${color}ff`];
  }
  return ['a10', `${color}ff`];
}
