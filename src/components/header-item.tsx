'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useCallback, useContext, useEffect, useState } from 'react';
import { GoGear } from 'react-icons/go';

import AppInstallButton from '@/components/app-install-button';
import { Button } from '@/contexts/material-providers';
import { ShowAppInstallButtonContext } from '@/contexts/show-app-install-button-provider';
import { ThemeContext } from '@/contexts/theme-provider';
import { BeforeInstallPromptEvent } from '@/types/BeforeInstallPromptEvent';
import { bgVariants, colorVariants } from '@/utils/colorVariants';

export default function HeaderItem() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const { showAppInstallButton, setShowAppInstallButton } = useContext(
    ShowAppInstallButtonContext,
  );

  const { baseColor, mainColor, mode } = useContext(ThemeContext);

  const handleAppInstallButtonClick = useCallback(async () => {
    if (!globalThis.window) return;
    const displayMode = window.matchMedia('(display-mode: standalone)').matches
      ? 'standalone'
      : 'browser tab';
    if (displayMode === 'standalone') return;
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    try {
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
        setDeferredPrompt(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setShowAppInstallButton(false);
    }
  }, [deferredPrompt, setShowAppInstallButton]);

  const handleAppInstalled = useCallback(() => {
    if (!globalThis.window) return;
    console.log('PWA was installed');
    setDeferredPrompt(null);
    setShowAppInstallButton(false);
  }, [setShowAppInstallButton]);

  const handleBeforeInstallPrompt = useCallback(
    (event: Event) => {
      if (!globalThis.window) return;
      event.preventDefault();
      const beforeInstallPromptEvent = event as BeforeInstallPromptEvent;
      console.log('beforeInstallPromptEvent: ', beforeInstallPromptEvent);
      setDeferredPrompt(beforeInstallPromptEvent);
      setShowAppInstallButton(true);
    },
    [setShowAppInstallButton],
  );

  useEffect(() => {
    if (!globalThis.window) return;
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () =>
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
  }, [handleBeforeInstallPrompt]);

  useEffect(() => {
    if (!globalThis.window) return;
    window.addEventListener('appinstalled', handleAppInstalled);
    return () => window.removeEventListener('appinstalled', handleAppInstalled);
  }, [handleAppInstalled]);

  return (
    <>
      <div className="flex items-center justify-between pb-5 pl-[22px] pr-3 pt-2">
        <h1
          className={`select-none text-3xl ${colorVariants[`${mainColor}`]}`}
          style={{ fontWeight: 800 }}
        >
          ToDo
        </h1>
        <menu className="flex items-center gap-0.5">
          {showAppInstallButton ? (
            <li>
              <AppInstallButton
                handleAppInstallButtonClick={handleAppInstallButtonClick}
              />
            </li>
          ) : null}
          <li>
            <Link className="block" href="/settings">
              <Button
                ripple={false}
                variant="text"
                className={clsx(
                  `group rounded-full p-3 text-[28px] ${
                    colorVariants[`${mainColor}`]
                  } active:${bgVariants[`${baseColor}`]} hover:${
                    bgVariants[`${baseColor}`]
                  }`,
                  {
                    'hover:brightness-95 active:brightness-90':
                      mode === 'light',
                    'hover:brightness-125 active:brightness-150':
                      mode === 'dark',
                    'hover:bg-radixGray-1': baseColor === 'tigersBlack-9',
                  },
                )}
              >
                <span
                  className={clsx('', {
                    'group-hover:brightness-105 group-active:brightness-[1.11]':
                      mode === 'light',
                    'group-hover:brightness-[0.8] group-active:brightness-[0.66]':
                      mode === 'dark',
                  })}
                >
                  <GoGear />
                </span>
              </Button>
            </Link>
          </li>
        </menu>
      </div>
    </>
  );
}
