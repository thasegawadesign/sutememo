export type ColorList = {
  [key in
    | 'primary'
    | 'tigersYellow'
    | 'tigersBlack'
    | 'radixGray'
    | 'radixMauve'
    | 'radixSlate'
    | 'radixSage'
    | 'radixOlive'
    | 'radixSand'
    | 'radixTomato'
    | 'radixRed'
    | 'radixRuby'
    | 'radixCrimson'
    | 'radixPink'
    | 'radixPlum'
    | 'radixPurple'
    | 'radixViolet'
    | 'radixIris'
    | 'radixIndigo'
    | 'radixBlue'
    | 'radixCyan'
    | 'radixTeal'
    | 'radixJade'
    | 'radixGreen'
    | 'radixGrass'
    | 'radixBronze'
    | 'radixGold'
    | 'radixBrown'
    | 'radixOrange'
    | 'radixAmber'
    | 'radixYellow'
    | 'radixLime'
    | 'radixMint'
    | 'radixSky'
    | 'radixBlack'
    | 'radixWhite']: unknown;
};

export const bgVariants: {
  [key: string]: string;
} = {
  primary: 'bg-primary',
  tigersYellow: 'bg-tigersYellow',
  tigersBlack: 'bg-tigersBlack',
  radixGray: 'bg-radixGray',
  radixMauve: 'bg-radixMauve',
  radixSlate: 'bg-radixSlate',
  radixSage: 'bg-radixSage',
  radixOlive: 'bg-radixOlive',
  radixSand: 'bg-radixSand',
  radixTomato: 'bg-radixTomato',
  radixRed: 'bg-radixRed',
  radixRuby: 'bg-radixRuby',
  radixCrimson: 'bg-radixCrimson',
  radixPink: 'bg-radixPink',
  radixPlum: 'bg-radixPlum',
  radixPurple: 'bg-radixPurple',
  radixViolet: 'bg-radixViolet',
  radixIris: 'bg-radixIris',
  radixIndigo: 'bg-radixIndigo',
  radixBlue: 'bg-radixBlue',
  radixCyan: 'bg-radixCyan',
  radixTeal: 'bg-radixTeal',
  radixJade: 'bg-radixJade',
  radixGreen: 'bg-radixGreen',
  radixGrass: 'bg-radixGrass',
  radixBronze: 'bg-radixBronze',
  radixGold: 'bg-radixGold',
  radixBrown: 'bg-radixBrown',
  radixOrange: 'bg-radixOrange',
  radixAmber: 'bg-radixAmber',
  radixYellow: 'bg-radixYellow',
  radixLime: 'bg-radixLime',
  radixMint: 'bg-radixMint',
  radixSky: 'bg-radixSky',
  radixBlack: 'bg-radixBlack',
  radixWhite: 'bg-radixWhite',
} satisfies ColorList;

export const bgHoverVariants: {
  [key: string]: string;
} = {
  primary: 'hover:bg-primary',
  tigersYellow: 'hover:bg-tigersYellow',
  tigersBlack: 'hover:bg-tigersBlack',
  radixGray: 'hover:bg-radixGray',
  radixMauve: 'hover:bg-radixMauve',
  radixSlate: 'hover:bg-radixSlate',
  radixSage: 'hover:bg-radixSage',
  radixOlive: 'hover:bg-radixOlive',
  radixSand: 'hover:bg-radixSand',
  radixTomato: 'hover:bg-radixTomato',
  radixRed: 'hover:bg-radixRed',
  radixRuby: 'hover:bg-radixRuby',
  radixCrimson: 'hover:bg-radixCrimson',
  radixPink: 'hover:bg-radixPink',
  radixPlum: 'hover:bg-radixPlum',
  radixPurple: 'hover:bg-radixPurple',
  radixViolet: 'hover:bg-radixViolet',
  radixIris: 'hover:bg-radixIris',
  radixIndigo: 'hover:bg-radixIndigo',
  radixBlue: 'hover:bg-radixBlue',
  radixCyan: 'hover:bg-radixCyan',
  radixTeal: 'hover:bg-radixTeal',
  radixJade: 'hover:bg-radixJade',
  radixGreen: 'hover:bg-radixGreen',
  radixGrass: 'hover:bg-radixGrass',
  radixBronze: 'hover:bg-radixBronze',
  radixGold: 'hover:bg-radixGold',
  radixBrown: 'hover:bg-radixBrown',
  radixOrange: 'hover:bg-radixOrange',
  radixAmber: 'hover:bg-radixAmber',
  radixYellow: 'hover:bg-radixYellow',
  radixLime: 'hover:bg-radixLime',
  radixMint: 'hover:bg-radixMint',
  radixSky: 'hover:bg-radixSky',
  radixBlack: 'hover:bg-radixBlack',
  radixWhite: 'hover:bg-radixWhite',
} satisfies ColorList;

export const colorVariants: {
  [key: string]: string;
} = {
  primary: 'text-primary',
  tigersYellow: 'text-tigersYellow',
  tigersBlack: 'text-tigersBlack',
  radixGray: 'text-radixGray',
  radixMauve: 'text-radixMauve',
  radixSlate: 'text-radixSlate',
  radixSage: 'text-radixSage',
  radixOlive: 'text-radixOlive',
  radixSand: 'text-radixSand',
  radixTomato: 'text-radixTomato',
  radixRed: 'text-radixRed',
  radixRuby: 'text-radixRuby',
  radixCrimson: 'text-radixCrimson',
  radixPink: 'text-radixPink',
  radixPlum: 'text-radixPlum',
  radixPurple: 'text-radixPurple',
  radixViolet: 'text-radixViolet',
  radixIris: 'text-radixIris',
  radixIndigo: 'text-radixIndigo',
  radixBlue: 'text-radixBlue',
  radixCyan: 'text-radixCyan',
  radixTeal: 'text-radixTeal',
  radixJade: 'text-radixJade',
  radixGreen: 'text-radixGreen',
  radixGrass: 'text-radixGrass',
  radixBronze: 'text-radixBronze',
  radixGold: 'text-radixGold',
  radixBrown: 'text-radixBrown',
  radixOrange: 'text-radixOrange',
  radixAmber: 'text-radixAmber',
  radixYellow: 'text-radixYellow',
  radixLime: 'text-radixLime',
  radixMint: 'text-radixMint',
  radixSky: 'text-radixSky',
  radixBlack: 'text-radixBlack',
  radixWhite: 'text-radixWhite',
} satisfies ColorList;

export const borderVariants: {
  [key: string]: string;
} = {
  primary: 'border-primary',
  tigersYellow: 'border-tigersYellow',
  tigersBlack: 'border-tigersBlack',
  radixGray: 'border-radixGray',
  radixMauve: 'border-radixMauve',
  radixSlate: 'border-radixSlate',
  radixSage: 'border-radixSage',
  radixOlive: 'border-radixOlive',
  radixSand: 'border-radixSand',
  radixTomato: 'border-radixTomato',
  radixRed: 'border-radixRed',
  radixRuby: 'border-radixRuby',
  radixCrimson: 'border-radixCrimson',
  radixPink: 'border-radixPink',
  radixPlum: 'border-radixPlum',
  radixPurple: 'border-radixPurple',
  radixViolet: 'border-radixViolet',
  radixIris: 'border-radixIris',
  radixIndigo: 'border-radixIndigo',
  radixBlue: 'border-radixBlue',
  radixCyan: 'border-radixCyan',
  radixTeal: 'border-radixTeal',
  radixJade: 'border-radixJade',
  radixGreen: 'border-radixGreen',
  radixGrass: 'border-radixGrass',
  radixBronze: 'border-radixBronze',
  radixGold: 'border-radixGold',
  radixBrown: 'border-radixBrown',
  radixOrange: 'border-radixOrange',
  radixAmber: 'border-radixAmber',
  radixYellow: 'border-radixYellow',
  radixLime: 'border-radixLime',
  radixMint: 'border-radixMint',
  radixSky: 'border-radixSky',
  radixBlack: 'border-radixBlack',
  radixWhite: 'border-radixWhite',
} satisfies ColorList;

export const ringVariants: {
  [key: string]: string;
} = {
  primary: 'ring-primary',
  tigersYellow: 'ring-tigersYellow',
  tigersBlack: 'ring-tigersBlack',
  radixGray: 'ring-radixGray',
  radixMauve: 'ring-radixMauve',
  radixSlate: 'ring-radixSlate',
  radixSage: 'ring-radixSage',
  radixOlive: 'ring-radixOlive',
  radixSand: 'ring-radixSand',
  radixTomato: 'ring-radixTomato',
  radixRed: 'ring-radixRed',
  radixRuby: 'ring-radixRuby',
  radixCrimson: 'ring-radixCrimson',
  radixPink: 'ring-radixPink',
  radixPlum: 'ring-radixPlum',
  radixPurple: 'ring-radixPurple',
  radixViolet: 'ring-radixViolet',
  radixIris: 'ring-radixIris',
  radixIndigo: 'ring-radixIndigo',
  radixBlue: 'ring-radixBlue',
  radixCyan: 'ring-radixCyan',
  radixTeal: 'ring-radixTeal',
  radixJade: 'ring-radixJade',
  radixGreen: 'ring-radixGreen',
  radixGrass: 'ring-radixGrass',
  radixBronze: 'ring-radixBronze',
  radixGold: 'ring-radixGold',
  radixBrown: 'ring-radixBrown',
  radixOrange: 'ring-radixOrange',
  radixAmber: 'ring-radixAmber',
  radixYellow: 'ring-radixYellow',
  radixLime: 'ring-radixLime',
  radixMint: 'ring-radixMint',
  radixSky: 'ring-radixSky',
  radixBlack: 'ring-radixBlack',
  radixWhite: 'ring-radixWhite',
} satisfies ColorList;

export const fillVariants: {
  [key: string]: string;
} = {
  primary: '!fill-primary',
  tigersYellow: '!fill-tigersYellow',
  tigersBlack: '!fill-tigersBlack',
  radixGray: '!fill-radixGray',
  radixMauve: '!fill-radixMauve',
  radixSlate: '!fill-radixSlate',
  radixSage: '!fill-radixSage',
  radixOlive: '!fill-radixOlive',
  radixSand: '!fill-radixSand',
  radixTomato: '!fill-radixTomato',
  radixRed: '!fill-radixRed',
  radixRuby: '!fill-radixRuby',
  radixCrimson: '!fill-radixCrimson',
  radixPink: '!fill-radixPink',
  radixPlum: '!fill-radixPlum',
  radixPurple: '!fill-radixPurple',
  radixViolet: '!fill-radixViolet',
  radixIris: '!fill-radixIris',
  radixIndigo: '!fill-radixIndigo',
  radixBlue: '!fill-radixBlue',
  radixCyan: '!fill-radixCyan',
  radixTeal: '!fill-radixTeal',
  radixJade: '!fill-radixJade',
  radixGreen: '!fill-radixGreen',
  radixGrass: '!fill-radixGrass',
  radixBronze: '!fill-radixBronze',
  radixGold: '!fill-radixGold',
  radixBrown: '!fill-radixBrown',
  radixOrange: '!fill-radixOrange',
  radixAmber: '!fill-radixAmber',
  radixYellow: '!fill-radixYellow',
  radixLime: '!fill-radixLime',
  radixMint: '!fill-radixMint',
  radixSky: '!fill-radixSky',
  radixBlack: '!fill-radixBlack',
  radixWhite: '!fill-radixWhite',
} satisfies ColorList;
