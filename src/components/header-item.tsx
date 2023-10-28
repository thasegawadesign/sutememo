'use client';

import { useCallback, useContext, useEffect, useState } from 'react';
import { BeforeInstallPromptEvent } from '@/types/BeforeInstallPromptEvent';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Drawer,
} from '@/contexts/material-providers';
import { ThemeContext } from '@/contexts/theme-provider';
import { ShowAppInstallButtonContext } from '@/contexts/show-app-install-button-provider';
import useWindowSize from '@/hooks/useWindowSize';
import { BiSolidPencil } from 'react-icons/bi';
import { FaSearchPlus } from 'react-icons/fa';
import { GoGear } from 'react-icons/go';
import {
  bgVariants,
  colorVariants,
  borderVariants,
} from '@/utils/colorVariants';
import { checkedThemeOptionVariant } from '@/utils/checkedThemeOptionVariant';
import clsx from 'clsx';

import ThemeSelectButton from '@/components/theme-select-button';
import AppInstallButton from '@/components/app-install-button';
import IconSvg from '@/components/icon-svg';
import AccorionIcon from '@/components/accordion-icon';

export default function HeaderItem() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const appInstallButtonContext = useContext(ShowAppInstallButtonContext);
  const { setShowAppInstallButton } = appInstallButtonContext;

  const [width, height] = useWindowSize();

  const theme = useContext(ThemeContext);
  const { baseColor, mainColor, mode } = theme;
  const labelName = 'theme-color';

  const [checkedThemeOption, setCheckedThemeOption] = useState(
    checkedThemeOptionVariant(mainColor, baseColor, mode),
  );

  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
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
    <>
      <div className="flex items-center justify-between px-[22px] pb-5 pt-3">
        <div className="flex items-center gap-2.5">
          <div
            className={`hidden h-12 w-12 select-none items-center justify-center rounded-[24%] border p-3 text-center minimum:flex ${bgVariants[baseColor]} ${borderVariants[mainColor]}`}
          >
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
            className={clsx(
              `rounded-full p-3 text-[32px] ${colorVariants[mainColor]} active:${bgVariants[baseColor]} hover:${bgVariants[baseColor]}`,
              { 'hover:brightness-95 active:brightness-90': mode === 'light' },
              { 'hover:brightness-110 active:brightness-125': mode === 'dark' },
            )}
            ripple={false}
          >
            <GoGear />
          </Button>
          <Drawer
            placement="bottom"
            size={height}
            open={isOpenDrawer}
            onClose={closeDrawer}
            className={clsx(
              `rounded-3xl transition-drawer duration-themeChange ${bgVariants[baseColor]} ${colorVariants[mainColor]}`,
              {
                '!translate-y-[max(env(safe-area-inset-top),32px)]':
                  isOpenDrawer === true,
                '!translate-y-full': isOpenDrawer === false,
              },
            )}
          >
            <div className="flex items-center justify-between px-2 pb-5 pt-3">
              <h2
                className={clsx('select-none pl-5 text-xl font-semibold', {
                  'text-gray-900': mode === 'light',
                  'text-white': mode === 'dark',
                })}
              >
                設定
              </h2>
              <Button
                variant="text"
                size="md"
                onClick={closeDrawer}
                className={clsx(
                  `rounded-full text-base text-blue-700 active:${bgVariants[baseColor]} hover:${bgVariants[baseColor]}`,
                  {
                    'hover:brightness-95 active:brightness-90':
                      mode === 'light',
                  },
                  {
                    'hover:brightness-110 active:brightness-125':
                      mode === 'dark',
                  },
                )}
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
                  className={clsx(
                    `rounded-lg border-none px-3 ${colorVariants[mainColor]} hover:${colorVariants[mainColor]} active:${bgVariants[baseColor]} hover:${bgVariants[baseColor]}`,
                    {
                      'hover:brightness-95 active:brightness-90':
                        mode === 'light',
                      'hover:brightness-110 active:brightness-125':
                        mode === 'dark',
                    },
                  )}
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
                        name={labelName}
                        id="primary-a10-radixGray-2-light-theme"
                        mainColor="primary-a10"
                        baseColor="radixGray-2"
                        mode="light"
                        checkedThemeOption={checkedThemeOption}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        name={labelName}
                        id="primary-a10-radixGray-12-dark-theme"
                        mainColor="primary-a10"
                        baseColor="radixGray-12"
                        mode="dark"
                        checkedThemeOption={checkedThemeOption}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        name={labelName}
                        id="radixGray-7-radixGray-12-dark-theme"
                        mainColor="radixGray-7"
                        baseColor="radixGray-12"
                        mode="dark"
                        checkedThemeOption={checkedThemeOption}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        name={labelName}
                        id="radixOlive-12-radixOlive-8-light-theme"
                        mainColor="radixOlive-12"
                        baseColor="radixOlive-8"
                        mode="light"
                        checkedThemeOption={checkedThemeOption}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        name={labelName}
                        id="radixGrass-10-radixGrass-5-light-theme"
                        mainColor="radixGrass-10"
                        baseColor="radixGrass-5"
                        mode="light"
                        checkedThemeOption={checkedThemeOption}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        name={labelName}
                        id="radixSand-10-radixGray-2-light-theme"
                        mainColor="radixSand-10"
                        baseColor="radixGray-2"
                        mode="light"
                        checkedThemeOption={checkedThemeOption}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        name={labelName}
                        id="radixRuby-9-radixGray-12-dark-theme"
                        mainColor="radixRuby-9"
                        baseColor="radixGray-12"
                        mode="dark"
                        checkedThemeOption={checkedThemeOption}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        name={labelName}
                        id="radixIris-9-radixGray-12-dark-theme"
                        mainColor="radixIris-9"
                        baseColor="radixGray-12"
                        mode="dark"
                        checkedThemeOption={checkedThemeOption}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        name={labelName}
                        id="radixCyan-9-radixCyan-12-dark-theme"
                        mainColor="radixCyan-9"
                        baseColor="radixCyan-12"
                        mode="dark"
                        checkedThemeOption={checkedThemeOption}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        name={labelName}
                        id="radixGold-10-radixGray-2-light-theme"
                        mainColor="radixGold-10"
                        baseColor="radixGray-2"
                        mode="light"
                        checkedThemeOption={checkedThemeOption}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        name={labelName}
                        id="radixViolet-10-radixViolet-5-light-theme"
                        mainColor="radixViolet-10"
                        baseColor="radixViolet-5"
                        mode="light"
                        checkedThemeOption={checkedThemeOption}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        name={labelName}
                        id="radixRuby-8-radixRuby-5-light-theme"
                        mainColor="radixRuby-8"
                        baseColor="radixRuby-5"
                        mode="light"
                        checkedThemeOption={checkedThemeOption}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        name={labelName}
                        id="radixBrown-12-radixBrown-4-light-theme"
                        mainColor="radixBrown-12"
                        baseColor="radixBrown-4"
                        mode="light"
                        checkedThemeOption={checkedThemeOption}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        name={labelName}
                        id="radixLime-12-radixLime-4-light-theme"
                        mainColor="radixLime-12"
                        baseColor="radixLime-4"
                        mode="light"
                        checkedThemeOption={checkedThemeOption}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        name={labelName}
                        id="radixJade-3-radixJade-12-dark-theme"
                        mainColor="radixJade-3"
                        baseColor="radixJade-12"
                        mode="dark"
                        checkedThemeOption={checkedThemeOption}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        name={labelName}
                        id="radixAmber-12-radixAmber-3-light-theme"
                        mainColor="radixAmber-12"
                        baseColor="radixAmber-3"
                        mode="light"
                        checkedThemeOption={checkedThemeOption}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        name={labelName}
                        id="radixSky-11-radixSky-3-light-theme"
                        mainColor="radixSky-11"
                        baseColor="radixSky-3"
                        mode="light"
                        checkedThemeOption={checkedThemeOption}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        name={labelName}
                        id="tigersYellow-a10-tigersBlack-a10-dark-theme"
                        mainColor="tigersYellow-a10"
                        baseColor="tigersBlack-a10"
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
                  className={clsx(
                    `rounded-lg border-none px-3 text-${mainColor} hover:text-${mainColor} active:${bgVariants[baseColor]} hover:${bgVariants[baseColor]}`,
                    {
                      'hover:brightness-95 active:brightness-90':
                        mode === 'light',
                      'hover:brightness-110 active:brightness-125':
                        mode === 'dark',
                    },
                  )}
                >
                  <div className="flex items-center gap-5">
                    <FaSearchPlus />
                    <span className="text-base">文字サイズの変更</span>
                  </div>
                </AccordionHeader>
                {/* <AccordionBody></AccordionBody> */}
              </Accordion>
            </div>
          </Drawer>
        </div>
      </div>
    </>
  );
}
