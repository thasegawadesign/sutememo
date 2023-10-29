'use client';

import clsx from 'clsx';
import { useCallback, useContext, useEffect, useState } from 'react';
import { GoGear, GoPencil, GoZoomIn } from 'react-icons/go';

import AccorionIcon from '@/components/accordion-icon';
import AppInstallButton from '@/components/app-install-button';
import IconSvg from '@/components/icon-svg';
import ThemeSelectButton from '@/components/theme-select-button';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Drawer,
} from '@/contexts/material-providers';
import { ShowAppInstallButtonContext } from '@/contexts/show-app-install-button-provider';
import { ThemeContext } from '@/contexts/theme-provider';
import useWindowSize from '@/hooks/useWindowSize';
import { BeforeInstallPromptEvent } from '@/types/BeforeInstallPromptEvent';
import { checkedThemeOptionVariant } from '@/utils/checkedThemeOptionVariant';
import {
  bgVariants,
  colorVariants,
  borderVariants,
} from '@/utils/colorVariants';

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
      <div className="flex items-center justify-between pb-5 pl-[22px] pr-3 pt-2">
        <div className="flex items-center gap-2.5">
          <div
            className={`hidden h-8 w-8 select-none items-center justify-center rounded-[24%] border p-2 text-center minimum:flex ${bgVariants[baseColor]} ${borderVariants[mainColor]}`}
          >
            <IconSvg color={mainColor} />
          </div>
          <h1
            className={`select-none text-3xl ${colorVariants[mainColor]}`}
            style={{ fontWeight: 800 }}
          >
            ToDo
          </h1>
        </div>
        <div className="flex items-center gap-0.5">
          <AppInstallButton
            handleAppInstallButtonClick={handleAppInstallButtonClick}
          />
          <Button
            ripple={false}
            variant="text"
            className={clsx(
              `rounded-full p-3 text-[28px] ${colorVariants[mainColor]} active:${bgVariants[baseColor]} hover:${bgVariants[baseColor]}`,
              { 'hover:brightness-95 active:brightness-90': mode === 'light' },
              { 'hover:brightness-110 active:brightness-125': mode === 'dark' },
            )}
            onClick={openDrawer}
          >
            <GoGear />
          </Button>
          <Drawer
            open={isOpenDrawer}
            placement="bottom"
            size={height}
            className={clsx(
              `rounded-3xl transition-drawer duration-themeChange ${bgVariants[baseColor]} ${colorVariants[mainColor]}`,
              {
                '!translate-y-[max(env(safe-area-inset-top),32px)]':
                  isOpenDrawer === true,
                '!translate-y-full': isOpenDrawer === false,
              },
            )}
            onClose={closeDrawer}
          >
            <div className="flex items-center justify-between px-2 pb-5 pt-3">
              <h2
                className={clsx('select-none pl-5 text-lg font-semibold', {
                  'text-gray-900': mode === 'light',
                  'text-white': mode === 'dark',
                })}
              >
                設定
              </h2>
              <Button
                ripple={false}
                size="md"
                variant="text"
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
                onClick={closeDrawer}
              >
                完了
              </Button>
            </div>
            <div className="px-5">
              <Accordion
                icon={<AccorionIcon id={1} open={openAccordion} />}
                open={openAccordion === 1}
              >
                <AccordionHeader
                  className={clsx(
                    `rounded-lg border-none px-3 ${colorVariants[mainColor]} hover:${colorVariants[mainColor]} active:${bgVariants[baseColor]} hover:${bgVariants[baseColor]}`,
                    {
                      'hover:brightness-95 active:brightness-90':
                        mode === 'light',
                      'hover:brightness-110 active:brightness-125':
                        mode === 'dark',
                    },
                  )}
                  onClick={() => handleOpenAccordion(1)}
                >
                  <div className="flex items-center gap-4">
                    <GoPencil />
                    <span className="text-base">テーマカラーの選択</span>
                  </div>
                </AccordionHeader>
                <AccordionBody className="px-2">
                  <ul className="grid grid-cols-1 gap-5 pr-8 minimum:grid-cols-2 xxs:grid-cols-3">
                    <li>
                      <ThemeSelectButton
                        baseColor="radixGray-2"
                        checkedThemeOption={checkedThemeOption}
                        id="primary-a10-radixGray-2-light-theme"
                        mainColor="primary-a10"
                        mode="light"
                        name={labelName}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        baseColor="radixGray-12"
                        checkedThemeOption={checkedThemeOption}
                        id="primary-a10-radixGray-12-dark-theme"
                        mainColor="primary-a10"
                        mode="dark"
                        name={labelName}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        baseColor="radixGray-12"
                        checkedThemeOption={checkedThemeOption}
                        id="radixGray-7-radixGray-12-dark-theme"
                        mainColor="radixGray-7"
                        mode="dark"
                        name={labelName}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        baseColor="radixOlive-8"
                        checkedThemeOption={checkedThemeOption}
                        id="radixOlive-12-radixOlive-8-light-theme"
                        mainColor="radixOlive-12"
                        mode="light"
                        name={labelName}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        baseColor="radixGrass-5"
                        checkedThemeOption={checkedThemeOption}
                        id="radixGrass-10-radixGrass-5-light-theme"
                        mainColor="radixGrass-10"
                        mode="light"
                        name={labelName}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        baseColor="radixGray-2"
                        checkedThemeOption={checkedThemeOption}
                        id="radixSand-10-radixGray-2-light-theme"
                        mainColor="radixSand-10"
                        mode="light"
                        name={labelName}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        baseColor="radixGray-12"
                        checkedThemeOption={checkedThemeOption}
                        id="radixRuby-9-radixGray-12-dark-theme"
                        mainColor="radixRuby-9"
                        mode="dark"
                        name={labelName}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        baseColor="radixGray-12"
                        checkedThemeOption={checkedThemeOption}
                        id="radixIris-9-radixGray-12-dark-theme"
                        mainColor="radixIris-9"
                        mode="dark"
                        name={labelName}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        baseColor="radixCyan-12"
                        checkedThemeOption={checkedThemeOption}
                        id="radixCyan-9-radixCyan-12-dark-theme"
                        mainColor="radixCyan-9"
                        mode="dark"
                        name={labelName}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        baseColor="radixGray-2"
                        checkedThemeOption={checkedThemeOption}
                        id="radixGold-10-radixGray-2-light-theme"
                        mainColor="radixGold-10"
                        mode="light"
                        name={labelName}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        baseColor="radixViolet-5"
                        checkedThemeOption={checkedThemeOption}
                        id="radixViolet-10-radixViolet-5-light-theme"
                        mainColor="radixViolet-10"
                        mode="light"
                        name={labelName}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        baseColor="radixRuby-5"
                        checkedThemeOption={checkedThemeOption}
                        id="radixRuby-8-radixRuby-5-light-theme"
                        mainColor="radixRuby-8"
                        mode="light"
                        name={labelName}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        baseColor="radixBrown-4"
                        checkedThemeOption={checkedThemeOption}
                        id="radixBrown-12-radixBrown-4-light-theme"
                        mainColor="radixBrown-12"
                        mode="light"
                        name={labelName}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        baseColor="radixLime-4"
                        checkedThemeOption={checkedThemeOption}
                        id="radixLime-12-radixLime-4-light-theme"
                        mainColor="radixLime-12"
                        mode="light"
                        name={labelName}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        baseColor="radixJade-12"
                        checkedThemeOption={checkedThemeOption}
                        id="radixJade-3-radixJade-12-dark-theme"
                        mainColor="radixJade-3"
                        mode="dark"
                        name={labelName}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        baseColor="radixAmber-3"
                        checkedThemeOption={checkedThemeOption}
                        id="radixAmber-12-radixAmber-3-light-theme"
                        mainColor="radixAmber-12"
                        mode="light"
                        name={labelName}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        baseColor="radixSky-3"
                        checkedThemeOption={checkedThemeOption}
                        id="radixSky-11-radixSky-3-light-theme"
                        mainColor="radixSky-11"
                        mode="light"
                        name={labelName}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        baseColor="radixPlum-12"
                        checkedThemeOption={checkedThemeOption}
                        id="radixOrange-10-radixPlum-12-dark-theme"
                        mainColor="radixOrange-10"
                        mode="dark"
                        name={labelName}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        baseColor="tigersBlack-a10"
                        checkedThemeOption={checkedThemeOption}
                        id="tigersYellow-a10-tigersBlack-a10-dark-theme"
                        mainColor="tigersYellow-a10"
                        mode="dark"
                        name={labelName}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                  </ul>
                </AccordionBody>
              </Accordion>
              <Accordion
                icon={<AccorionIcon id={2} open={openAccordion} />}
                open={openAccordion === 2}
              >
                <AccordionHeader
                  className={clsx(
                    `rounded-lg border-none px-3 text-${mainColor} hover:text-${mainColor} active:${bgVariants[baseColor]} hover:${bgVariants[baseColor]}`,
                    {
                      'hover:brightness-95 active:brightness-90':
                        mode === 'light',
                      'hover:brightness-110 active:brightness-125':
                        mode === 'dark',
                    },
                  )}
                  onClick={() => handleOpenAccordion(2)}
                >
                  <div className="flex items-center gap-4 text-xl">
                    <GoZoomIn />
                    <span className="text-base">文字サイズの選択</span>
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
