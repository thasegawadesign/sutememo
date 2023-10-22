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
    | 'tigersBlack']: unknown;
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
} satisfies ColorList;
