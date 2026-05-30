'use server';

import { cookies } from 'next/headers';

import { Mode } from '@/contexts/theme-provider';
import { SafeColorList } from '@/types/ColorList';

const oneDay = 24 * 60 * 60 * 1000;

export async function setCookiesUserTheme(
  themeColorCode: string,
  baseColor: SafeColorList,
  mainColor: SafeColorList,
  mode: Mode,
) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: 'themeColorCode',
    value: themeColorCode,
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: oneDay * 14,
    path: '/',
  });
  cookieStore.set({
    name: 'baseColor',
    value: baseColor,
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: oneDay * 14,
    path: '/',
  });
  cookieStore.set({
    name: 'mainColor',
    value: mainColor,
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: oneDay * 14,
    path: '/',
  });
  cookieStore.set({
    name: 'mode',
    value: mode,
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: oneDay * 14,
    path: '/',
  });
}

export async function setCookiesIsDarkModeSelect(isDarkModeSelect: boolean) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: 'isDarkModeSelect',
    value: JSON.stringify(isDarkModeSelect),
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: oneDay * 14,
    path: '/',
  });
}

export async function setCookiesIsSystemModeSelect(
  isSystemModeSelect: boolean,
) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: 'isSystemModeSelect',
    value: JSON.stringify(isSystemModeSelect),
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: oneDay * 14,
    path: '/',
  });
}
