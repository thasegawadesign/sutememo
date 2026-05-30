declare module '@material-tailwind/react' {
  import type { ComponentType, Context, ReactNode } from 'react';

  export type DrawerStylesType = Record<string, unknown>;
  export type SwitchButtonStylesType = Record<string, unknown>;

  export const MaterialTailwindTheme: Context<Record<string, unknown>>;
  export const ThemeProvider: ComponentType<{
    value?: Record<string, unknown>;
    children?: ReactNode;
  }>;
  export const Button: ComponentType<Record<string, unknown>>;
  export const Drawer: ComponentType<Record<string, unknown>>;
  export const Accordion: ComponentType<Record<string, unknown>>;
  export const AccordionHeader: ComponentType<Record<string, unknown>>;
  export const AccordionBody: ComponentType<Record<string, unknown>>;
  export const Radio: ComponentType<Record<string, unknown>>;
  export const Switch: ComponentType<Record<string, unknown>>;
}
