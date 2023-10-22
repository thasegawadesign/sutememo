export type ColorList = {
  [key in
    | 'primary'
    | 'white'
    | 'black'
    | 'dark'
    | 'orange'
    | 'tomato'
    | 'ruby'
    | 'gold'
    | 'bronze'
    | 'brown'
    | 'grass'
    | 'mint'
    | 'sand'
    | 'olive'
    | 'deepGeen'
    | 'tigersYellow'
    | 'tigersBlack'
    | 'themeBlack'
    | 'stone']: unknown;
};

export const bgVariants: {
  [key: string]: string;
} = {
  primary: 'bg-primary',
  white: 'bg-white',
  black: 'bg-black',
  dark: 'bg-dark',
  orange: 'bg-orange',
  tomato: 'bg-tomato',
  ruby: 'bg-ruby',
  gold: 'bg-gold',
  bronze: 'bg-bronze',
  brown: 'bg-brown',
  grass: 'bg-grass',
  mint: 'bg-mint',
  sand: 'bg-sand',
  olive: 'bg-olive',
  deepGeen: 'bg-deepGeen',
  tigersYellow: 'bg-tigersYellow',
  tigersBlack: 'bg-tigersBlack',
  themeBlack: 'bg-themeBlack',
  stone: 'bg-stone',
} satisfies ColorList;

export const bgHoverVariants: {
  [key: string]: string;
} = {
  primary: 'hover:bg-primary',
  white: 'hover:bg-white',
  black: 'hover:bg-black',
  dark: 'hover:bg-dark',
  orange: 'hover:bg-orange',
  tomato: 'hover:bg-tomato',
  ruby: 'hover:bg-ruby',
  gold: 'hover:bg-gold',
  bronze: 'hover:bg-bronze',
  brown: 'hover:bg-brown',
  grass: 'hover:bg-grass',
  mint: 'hover:bg-mint',
  sand: 'hover:bg-sand',
  olive: 'hover:bg-olive',
  deepGeen: 'hover:bg-deepGeen',
  tigersYellow: 'hover:bg-tigersYellow',
  tigersBlack: 'hover:bg-tigersBlack',
  themeBlack: 'hover:bg-themeBlack',
  stone: 'hover:bg-stone',
} satisfies ColorList;

export const colorVariants: {
  [key: string]: string;
} = {
  primary: 'text-primary',
  white: 'text-white',
  black: 'text-black',
  dark: 'text-dark',
  orange: 'text-orange',
  tomato: 'text-tomato',
  ruby: 'text-ruby',
  gold: 'text-gold',
  bronze: 'text-bronze',
  brown: 'text-brown',
  grass: 'text-grass',
  mint: 'text-mint',
  sand: 'text-sand',
  olive: 'text-olive',
  deepGeen: 'text-deepGeen',
  tigersYellow: 'text-tigersYellow',
  tigersBlack: 'text-tigersBlack',
  themeBlack: 'text-themeBlack',
  stone: 'text-stone',
} satisfies ColorList;

export const borderVariants: {
  [key: string]: string;
} = {
  primary: 'border-primary',
  white: 'border-white',
  black: 'border-black',
  dark: 'border-dark',
  orange: 'border-orange',
  tomato: 'border-tomato',
  ruby: 'border-ruby',
  gold: 'border-gold',
  bronze: 'border-bronze',
  brown: 'border-brown',
  grass: 'border-grass',
  mint: 'border-mint',
  sand: 'border-sand',
  olive: 'border-olive',
  deepGeen: 'border-deepGeen',
  tigersYellow: 'border-tigersYellow',
  tigersBlack: 'border-tigersBlack',
  themeBlack: 'border-themeBlack',
  stone: 'border-stone',
} satisfies ColorList;

export const outlineVariants: {
  [key: string]: string;
} = {
  primary: 'outline-primary',
  white: 'outline-white',
  black: 'outline-black',
  dark: 'outline-dark',
  orange: 'outline-orange',
  tomato: 'outline-tomato',
  ruby: 'outline-ruby',
  gold: 'outline-gold',
  bronze: 'outline-bronze',
  brown: 'outline-brown',
  grass: 'outline-grass',
  mint: 'outline-mint',
  sand: 'outline-sand',
  olive: 'outline-olive',
  deepGeen: 'outline-deepGeen',
  tigersYellow: 'outline-tigersYellow',
  tigersBlack: 'outline-tigersBlack',
  themeBlack: 'outline-themeBlack',
  stone: 'outline-stone',
} satisfies ColorList;

export const fillVariants: {
  [key: string]: string;
} = {
  primary: '!fill-primary',
  white: '!fill-white',
  black: '!fill-black',
  dark: '!fill-dark',
  orange: '!fill-orange',
  tomato: '!fill-tomato',
  ruby: '!fill-ruby',
  gold: '!fill-gold',
  bronze: '!fill-bronze',
  brown: '!fill-brown',
  grass: '!fill-grass',
  mint: '!fill-mint',
  sand: '!fill-sand',
  olive: '!fill-olive',
  deepGeen: '!fill-deepGeen',
  tigersYellow: '!fill-tigersYellow',
  tigersBlack: '!fill-tigersBlack',
  themeBlack: '!fill-themeBlack',
  stone: '!fill-stone',
} satisfies ColorList;
