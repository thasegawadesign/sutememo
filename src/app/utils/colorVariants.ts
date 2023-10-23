const radixColorList = [
  'radixGray',
  'radixMauve',
  'radixMauve',
  'radixSlate',
  'radixSage',
  'radixOlive',
  'radixSand',
  'radixTomato',
  'radixRed',
  'radixRuby',
  'radixCrimson',
  'radixPink',
  'radixPlum',
  'radixPurple',
  'radixViolet',
  'radixIris',
  'radixIndigo',
  'radixBlue',
  'radixCyan',
  'radixTeal',
  'radixJade',
  'radixGreen',
  'radixGrass',
  'radixBronze',
  'radixGold',
  'radixBrown',
  'radixOrange',
  'radixAmber',
  'radixYellow',
  'radixLime',
  'radixMint',
  'radixSky',
  'radixBlack',
  'radixWhite',
] as const;

type TailwindPrefix =
  | 'bg-'
  | 'hover:bg-'
  | 'text-'
  | 'border-'
  | 'ring-'
  | '!fill-';
type RadixColorList = (typeof radixColorList)[number];
type RadixScaleSolid = `${RadixColorList}-${number}`;
type RadixScaleAlpha = `${RadixColorList}-a${number}`;
type RadixScale = RadixScaleSolid | RadixScaleAlpha;
// type RadixScale = `${RadixColorList}-${number}`;
type RadixScaleTailwind = `${TailwindPrefix}${RadixScale}`;

export type ColorList = {
  [key in
    | 'primary'
    | 'black'
    | 'white'
    | 'tigersYellow'
    | 'tigersBlack'
    | RadixScale]: unknown;
};

export const bgVariants: {
  [key: string]: string;
} = {
  primary: 'bg-primary',
  black: 'bg-black',
  white: 'bg-white',
  tigersYellow: 'bg-tigersYellow',
  tigersBlack: 'bg-tigersBlack',
  ...generateRadixMappingObj('bg-'),
} satisfies ColorList;

export const bgHoverVariants: {
  [key: string]: string;
} = {
  primary: 'hover:bg-primary',
  black: 'hover-bg:black',
  white: 'hover-bg:white',
  tigersYellow: 'hover:bg-tigersYellow',
  tigersBlack: 'hover:bg-tigersBlack',
  ...generateRadixMappingObj('hover:bg-'),
} satisfies ColorList;

export const colorVariants: {
  [key: string]: string;
} = {
  primary: 'text-primary',
  black: 'text-black',
  white: 'text-white',
  tigersYellow: 'text-tigersYellow',
  tigersBlack: 'text-tigersBlack',
  ...generateRadixMappingObj('text-'),
} satisfies ColorList;

export const borderVariants: {
  [key: string]: string;
} = {
  primary: 'border-primary',
  black: 'border-black',
  white: 'border-white',
  tigersYellow: 'border-tigersYellow',
  tigersBlack: 'border-tigersBlack',
  ...generateRadixMappingObj('border-'),
} satisfies ColorList;

export const ringVariants: {
  [key: string]: string;
} = {
  primary: 'ring-primary',
  black: 'ring-black',
  white: 'ring-white',
  tigersYellow: 'ring-tigersYellow',
  tigersBlack: 'ring-tigersBlack',
  ...generateRadixMappingObj('ring-'),
} satisfies ColorList;

export const fillVariants: {
  [key: string]: string;
} = {
  primary: '!fill-primary',
  black: '!fill-black',
  white: '!fill-white',
  tigersYellow: '!fill-tigersYellow',
  tigersBlack: '!fill-tigersBlack',
  ...generateRadixMappingObj('!fill-'),
} satisfies ColorList;

function generateRadixMappingObj(tailwindPrefix: TailwindPrefix) {
  const radixArr: [RadixScale, RadixScaleTailwind][] = [];
  radixColorList.map((radixColor, i) => {
    [...Array(12)].map((_, i) => {
      const id = i + 1;
      const key: RadixScale =
        radixColor === 'radixBlack' || radixColor === 'radixWhite'
          ? `${radixColor}-a${id}`
          : `${radixColor}-${id}`;
      const value: RadixScaleTailwind = `${tailwindPrefix}${key}`;
      radixArr.push([key, value]);
    });
  });
  return Object.fromEntries(radixArr);
}
