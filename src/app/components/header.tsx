'use client';

import { useCallback, useEffect, useState } from 'react';
import AppInstallButton from './app-install-button';
import IconSvg from './icon-svg';
import { ShowAppInstallButtonContext } from '../context/show-app-install-button-context';
import { BeforeInstallPromptEvent } from '@/types/BeforeInstallPromptEvent';

export default function Header() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showAppInstallButton, setShowAppInstallButton] = useState(false);

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
  }, [deferredPrompt]);

  const handleAppInstalled = useCallback(() => {
    if (!globalThis.window) return;
    console.log('PWA was installed');
    setDeferredPrompt(null);
    setShowAppInstallButton(false);
  }, []);

  const handleBeforeInstallPrompt = useCallback((event: Event) => {
    if (!globalThis.window) return;
    event.preventDefault();
    const beforeInstallPromptEvent = event as BeforeInstallPromptEvent;
    console.log('beforeInstallPromptEvent: ', beforeInstallPromptEvent);
    setDeferredPrompt(beforeInstallPromptEvent);
    setShowAppInstallButton(true);
  }, []);

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
    <header className="flex items-center justify-between px-[22px] pb-5 pt-3">
      <div className="flex items-center gap-2">
        <div className="hidden h-12 w-12 select-none items-center justify-center rounded-[24%] border border-gray-200 bg-white p-3 text-center minimum:flex">
          <IconSvg />
        </div>
        <h1
          style={{ fontWeight: 800 }}
          className="select-none text-4xl text-main"
        >
          ToDo
        </h1>
      </div>
      <ShowAppInstallButtonContext.Provider value={showAppInstallButton}>
        <AppInstallButton
          handleAppInstallButtonClick={handleAppInstallButtonClick}
        />
      </ShowAppInstallButtonContext.Provider>
    </header>
  );
}
