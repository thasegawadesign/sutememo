'use client';

import { useCallback, useEffect, useState } from 'react';
import useWindowSize from '../hooks/useWindowSize';
import AppInstallButton from './app-install-button';
import IconSvg from './icon-svg';
import { ShowAppInstallButtonContext } from '../context/show-app-install-button-context';
import { BeforeInstallPromptEvent } from '@/types/BeforeInstallPromptEvent';
import { BiSolidPencil } from 'react-icons/bi';
import { FaSearchPlus } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Drawer,
} from '../context/material-providers';
import AccorionIcon from './accordion-icon';

export default function Header() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showAppInstallButton, setShowAppInstallButton] = useState(false);

  const [width, height] = useWindowSize();

  const [isOpenDrawer, setIsOpenDrawer] = useState(true);
  const openDrawer = () => setIsOpenDrawer(true);
  const closeDrawer = () => setIsOpenDrawer(false);

  const [openAccordion, setOpenAccordion] = useState(1);
  const handleOpenAccordion = (value: number) =>
    setOpenAccordion(openAccordion === value ? 0 : value);

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
      <div className="flex items-center gap-2">
        <ShowAppInstallButtonContext.Provider value={showAppInstallButton}>
          <AppInstallButton
            handleAppInstallButtonClick={handleAppInstallButtonClick}
          />
        </ShowAppInstallButtonContext.Provider>
        <Button
          onClick={openDrawer}
          variant="text"
          className="rounded-full !p-3 text-[32px] text-main hover:bg-blue-gray-50 hover:brightness-[102%] active:bg-blue-gray-50"
        >
          <FaGear />
        </Button>
        <Drawer
          placement="bottom"
          size={height - 60}
          open={isOpenDrawer}
          onClose={closeDrawer}
          className="-bottom-[max(env(safe-area-inset-bottom),20px)] rounded-3xl"
        >
          <div className="flex items-center justify-between px-2 pb-5 pt-2">
            <h2 className="pl-5 text-lg font-semibold text-gray-900">設定</h2>
            <Button
              variant="text"
              size="md"
              onClick={closeDrawer}
              className="rounded-full text-base hover:bg-blue-gray-50 hover:brightness-[102%] active:bg-blue-gray-50"
              ripple={false}
            >
              完了
            </Button>
          </div>
          <div className="px-5">
            <Accordion
              open={openAccordion === 1}
              icon={<AccorionIcon id={1} open={openAccordion} />}
            >
              <AccordionHeader
                onClick={() => handleOpenAccordion(1)}
                className="rounded-lg border-none px-3 text-main hover:bg-blue-gray-50 hover:text-main hover:brightness-[102%]"
              >
                <div className="flex items-center gap-5">
                  <BiSolidPencil />
                  <span className="text-base">テーマカラーの変更</span>
                </div>
              </AccordionHeader>
              <AccordionBody>
                <p>
                  テーマカラーパレットテーマカラーパレットテーマカラーパレット
                </p>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={openAccordion === 2}
              icon={<AccorionIcon id={2} open={openAccordion} />}
            >
              <AccordionHeader
                onClick={() => handleOpenAccordion(2)}
                className="rounded-lg border-none px-3 text-main hover:bg-blue-gray-50 hover:text-main hover:brightness-[102%]"
              >
                <div className="flex items-center gap-5">
                  <FaSearchPlus />
                  <span className="text-base">文字サイズの変更</span>
                </div>
              </AccordionHeader>
              <AccordionBody>
                <p>文字サイズ文字サイズ文字サイズ</p>
              </AccordionBody>
            </Accordion>
          </div>
        </Drawer>
      </div>
    </header>
  );
}
