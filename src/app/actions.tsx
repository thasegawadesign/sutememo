'use server';

import { cookies } from 'next/headers';

import { Mode } from '@/contexts/theme-provider';
import { SafeColorList } from '@/types/ColorList';

const oneDay = 24 * 60 * 60 * 1000;

export async function setCookiesUserTheme(
  baseColor: SafeColorList,
  mainColor: SafeColorList,
  mode: Mode,
) {
  cookies().set({
    name: 'baseColor',
    value: baseColor,
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: oneDay * 14,
    path: '/',
  });
  cookies().set({
    name: 'mainColor',
    value: mainColor,
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: oneDay * 14,
    path: '/',
  });
  cookies().set({
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
  cookies().set({
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
  cookies().set({
    name: 'isSystemModeSelect',
    value: JSON.stringify(isSystemModeSelect),
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: oneDay * 14,
    path: '/',
  });
}
