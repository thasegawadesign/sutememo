import { SafeTailwind, TailwindPrefix } from '@/types/ColorList';
import type { Config } from 'tailwindcss';
const withMT = require('@material-tailwind/react/utils/withMT');

export const safeColorList = [
  'primary',
  'white',
  'tigersYellow',
  'tigersBlack',
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
  'radixViolet-5',
  'radixViolet-10',
  'radixBrown-4',
  'radixBrown-12',
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
        primary: '#208cd8',
        tigersYellow: '#f7da07',
        tigersBlack: '#060606',
        radixGray: generateScale('gray'),
        radixMauve: generateScale('mauve'),
        radixSlate: generateScale('slate'),
        radixSage: generateScale('sage'),
        radixOlive: generateScale('olive'),
        radixSand: generateScale('sand'),
        radixTomato: generateScale('tomato'),
        radixRed: generateScale('red'),
        radixRuby: generateScale('ruby'),
        radixCrimson: generateScale('crimson'),
        radixPink: generateScale('pink'),
        radixPlum: generateScale('plum'),
        radixPurple: generateScale('purple'),
        radixViolet: generateScale('violet'),
        radixIris: generateScale('iris'),
        radixIndigo: generateScale('indigo'),
        radixBlue: generateScale('blue'),
        radixCyan: generateScale('cyan'),
        radixTeal: generateScale('teal'),
        radixJade: generateScale('jade'),
        radixGreen: generateScale('green'),
        radixGrass: generateScale('grass'),
        radixBronze: generateScale('bronze'),
        radixGold: generateScale('gold'),
        radixBrown: generateScale('brown'),
        radixOrange: generateScale('orange'),
        radixAmber: generateScale('amber'),
        radixYellow: generateScale('yellow'),
        radixLime: generateScale('lime'),
        radixMint: generateScale('mint'),
        radixSky: generateScale('sky'),
        radixBlack: generateScale('black'),
        radixWhite: generateScale('white'),
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

export function generateScale(name: string) {
  let scale = Array.from({ length: 12 }, (_, i) => {
    let id = i + 1;
    return [
      [id, `var(--${name}-${id})`],
      [`a${id}`, `var(--${name}-a${id})`],
    ];
  }).flat();

  return Object.fromEntries(scale);
}
