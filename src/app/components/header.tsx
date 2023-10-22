'use client';

import { useCallback, useContext, useEffect, useState } from 'react';
import useWindowSize from '../hooks/useWindowSize';
import AppInstallButton from './app-install-button';
import IconSvg from './icon-svg';
import { ShowAppInstallButtonContext } from '../contexts/show-app-install-button-provider';
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
} from '../contexts/material-providers';
import AccorionIcon from './accordion-icon';
import { ThemeContext } from '../contexts/theme-provider';
import ThemeSelectButton from './theme-select-button';
import { bgVariants, colorVariants } from '../utils/colorVariants';
import { checkedThemeOptionVariant } from '../utils/checkedThemeOptionVariant';

export default function Header() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const appInstallButtonContext = useContext(ShowAppInstallButtonContext);
  const { setShowAppInstallButton } = appInstallButtonContext;

  const [width, height] = useWindowSize();

  const theme = useContext(ThemeContext);
  const { baseColor, mainColor, mode, setTheme } = theme;

  const [checkedThemeOption, setCheckedThemeOption] = useState(
    checkedThemeOptionVariant(mainColor, mode),
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
    <header className="flex items-center justify-between px-[22px] pb-5 pt-3">
      <div className="flex items-center gap-2">
        <div className="hidden h-12 w-12 select-none items-center justify-center rounded-[24%] border border-gray-200 bg-white p-3 text-center minimum:flex">
          <IconSvg color={mainColor} />
        </div>
        <h1
          style={{ fontWeight: 800 }}
          className={`select-none text-4xl ${colorVariants[mainColor]}`}
        >
          ToDo
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <AppInstallButton
          handleAppInstallButtonClick={handleAppInstallButtonClick}
        />
        <Button
          onClick={openDrawer}
          variant="text"
          className={`rounded-full p-3 text-[32px] hover:bg-blue-gray-50 hover:brightness-[102%] active:bg-blue-gray-50 ${colorVariants[mainColor]}`}
          ripple={false}
        >
          <GoGear />
        </Button>
        <Drawer
          placement="bottom"
          size={height - 60}
          open={isOpenDrawer}
          onClose={closeDrawer}
          className={`-bottom-[max(env(safe-area-inset-bottom),20px)] rounded-3xl ${bgVariants[baseColor]} ${colorVariants[mainColor]}`}
        >
          <div className="flex items-center justify-between px-2 pb-5 pt-3">
            <h2
              className={`select-none pl-5 text-xl font-semibold ${
                mode === 'light' ? 'text-gray-800' : 'text-white'
              }`}
            >
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
                className={`rounded-lg border-none px-3 hover:bg-blue-gray-50 hover:brightness-[102%] ${colorVariants[mainColor]} hover:${colorVariants[mainColor]}`}
              >
                <div className="flex items-center gap-5">
                  <BiSolidPencil />
                  <span className="text-base">テーマカラーの変更</span>
                </div>
              </AccordionHeader>
              <AccordionBody className="px-2">
                <ul className="grid grid-cols-1 gap-5 pr-8 minimum:grid-cols-2 xxs:grid-cols-3">
                  <li>
                    <ThemeSelectButton
                      name="theme-color"
                      id="primary-light-theme"
                      baseColor="white"
                      mainColor="primary"
                      mode="light"
                      checkedThemeOption={checkedThemeOption}
                      setCheckedThemeOption={setCheckedThemeOption}
                    />
                  </li>
                  <li>
                    <ThemeSelectButton
                      name="theme-color"
                      id="tomato-light-theme"
                      baseColor="white"
                      mainColor="tomato"
                      mode="light"
                      checkedThemeOption={checkedThemeOption}
                      setCheckedThemeOption={setCheckedThemeOption}
                    />
                  </li>
                  <li>
                    <ThemeSelectButton
                      name="theme-color"
                      id="tigersYellow-dark-theme"
                      baseColor="tigersBlack"
                      mainColor="tigersYellow"
                      mode="dark"
                      checkedThemeOption={checkedThemeOption}
                      setCheckedThemeOption={setCheckedThemeOption}
                    />
                  </li>
                </ul>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={openAccordion === 2}
              icon={<AccorionIcon id={2} open={openAccordion} />}
            >
              <AccordionHeader
                onClick={() => handleOpenAccordion(2)}
                className={`rounded-lg border-none px-3 hover:bg-blue-gray-50 hover:brightness-[102%] bg-${baseColor} text-${mainColor} hover:text-${mainColor}`}
              >
                <div className="flex items-center gap-5">
                  <FaSearchPlus />
                  <span className="text-base">文字サイズの変更</span>
                </div>
              </AccordionHeader>
              <AccordionBody></AccordionBody>
            </Accordion>
          </div>
        </Drawer>
      </div>
    </header>
  );
}
