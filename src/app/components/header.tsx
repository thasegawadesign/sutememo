'use client';

import { useCallback, useContext, useEffect, useState } from 'react';
import useWindowSize from '../hooks/useWindowSize';
import AppInstallButton from './app-install-button';
import IconSvg from './icon-svg';
import { ShowAppInstallButtonContext } from '../context/show-app-install-button-context';
import { BeforeInstallPromptEvent } from '@/types/BeforeInstallPromptEvent';
import { BiSolidPencil } from 'react-icons/bi';
import { FaSearchPlus } from 'react-icons/fa';
import { GoGear } from 'react-icons/go';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Drawer,
} from '../context/material-providers';
import AccorionIcon from './accordion-icon';
import ThemeRadio from './theme-radio';
import { Theme, ThemeContext } from '../context/theme-color-context';
import { Mode } from '../context/theme-color-context';

export default function Header() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showAppInstallButton, setShowAppInstallButton] = useState(false);

  const [width, height] = useWindowSize();

  const [theme, setTheme] = useState<Theme>({
    baseColor: '',
    mainColor: '',
    mode: 'light',
  });

  const handleThemeClick = useCallback(
    (baseColor: string, mainColor: string, mode: Mode) => {
      setTheme({
        baseColor,
        mainColor,
        mode,
      });
    },
    [],
  );

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
          ripple={false}
        >
          <GoGear />
        </Button>
        <Drawer
          placement="bottom"
          size={height - 60}
          open={isOpenDrawer}
          onClose={closeDrawer}
          className="-bottom-[max(env(safe-area-inset-bottom),20px)] rounded-3xl"
        >
          <div className="flex items-center justify-between px-2 pb-5 pt-3">
            <h2 className="select-none pl-5 text-xl font-semibold text-gray-900">
              設定
            </h2>
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
              <AccordionBody className="px-2">
                <ThemeContext.Provider value={theme}>
                  <ul className="xxs:grid-cols-3 grid grid-cols-1 gap-5 pr-8 minimum:grid-cols-2">
                    <li>
                      <button
                        onClick={() =>
                          handleThemeClick('bg-white', 'bg-main', 'light')
                        }
                      >
                        <ThemeRadio
                          defaultChecked={true}
                          name="theme-color"
                          id="default-theme"
                          baseColor="bg-white"
                          mainColor="bg-main"
                        />
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() =>
                          handleThemeClick('bg-white', 'bg-tomato', 'light')
                        }
                      >
                        <ThemeRadio
                          defaultChecked={false}
                          name="theme-color"
                          id="tomato-light-theme"
                          baseColor="bg-white"
                          mainColor="bg-tomato"
                        />
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() =>
                          handleThemeClick(
                            'bg-tigersBlack',
                            'bg-tigersYellow',
                            'dark',
                          )
                        }
                      >
                        <ThemeRadio
                          defaultChecked={false}
                          name="theme-color"
                          id="tigersYellow-dark-theme"
                          baseColor="bg-tigersBlack"
                          mainColor="bg-tigersYellow"
                        />
                      </button>
                    </li>
                  </ul>
                </ThemeContext.Provider>
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
