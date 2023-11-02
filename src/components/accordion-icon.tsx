'use client';

import clsx from 'clsx';
import { useContext } from 'react';

import { ThemeContext } from '@/contexts/theme-provider';

export default function AccorionIcon({
  id,
  open,
}: {
  id: number;
  open: number;
}) {
  const { mode } = useContext(ThemeContext);

  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('h-5 w-5 -rotate-90 transition-transform', {
        'rotate-0': id === open,
        'group-hover:brightness-105 group-active:brightness-[1.11]':
          mode === 'light',
        'group-hover:brightness-[0.8] group-active:brightness-[0.66]':
          mode === 'dark',
      })}
    >
      <path
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
