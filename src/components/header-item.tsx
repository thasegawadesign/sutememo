'use client';

import clsx from 'clsx';
import {
  useCallback,
  useContext,
  useEffect,
  useState,
  ChangeEvent,
} from 'react';
import { GoGear, GoInfo, GoZoomIn } from 'react-icons/go';
import { VscSymbolColor } from 'react-icons/vsc';

import AccorionIcon from '@/components/accordion-icon';
import AppInstallButton from '@/components/app-install-button';
import IconSvg from '@/components/icon-svg';
import ThemeSelectButton from '@/components/theme-select-button';
import { IsDarkModeSelectContext } from '@/contexts/is-dark-mode-select-provider';
import { IsSystemModeSelectContext } from '@/contexts/is-system-mode-select-provider';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Drawer,
  Switch,
} from '@/contexts/material-providers';
import { ShowAppInstallButtonContext } from '@/contexts/show-app-install-button-provider';
import { ThemeContext } from '@/contexts/theme-provider';
import useWindowSize from '@/hooks/useWindowSize';
import { BeforeInstallPromptEvent } from '@/types/BeforeInstallPromptEvent';
import { SafeColorList } from '@/types/ColorList';
import { checkedThemeOptionVariant } from '@/utils/checkedThemeOptionVariant';
import {
  bgVariants,
  colorVariants,
  borderVariants,
} from '@/utils/colorVariants';
import { customColorList } from '@/utils/customColorList';

export default function HeaderItem() {
  const appVersion = process.env.NEXT_PUBLIC_APP_VERSION;

  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const appInstallButtonContext = useContext(ShowAppInstallButtonContext);
  const { setShowAppInstallButton } = appInstallButtonContext;

  const [width, height] = useWindowSize();

  const { baseColor, mainColor, mode, setTheme } = useContext(ThemeContext);

  const labelName = 'theme-color';

  const [baseColorTranslucent, setBaseColorTranslucent] =
    useState<SafeColorList>('black-a5');
  const generateBaseColorTranslucent = useCallback(
    (baseColor: SafeColorList) => {
      let isCustomBaseColor: boolean;
      let radixColorStep: number;
      const baseColorType = baseColor.split('-')[0];
      for (const customColor of customColorList) {
        isCustomBaseColor = baseColorType === customColor;
        if (isCustomBaseColor) {
          setBaseColorTranslucent(`${baseColorType}-a${6}` as SafeColorList);
        } else {
          radixColorStep = Number(baseColor.split('-')[1]);
          if (radixColorStep < 3) {
            setBaseColorTranslucent(
              `${baseColorType}-a${radixColorStep}` as SafeColorList,
            );
          } else if (radixColorStep < 6) {
            setBaseColorTranslucent(
              `${baseColorType}-a${radixColorStep - 2}` as SafeColorList,
            );
          } else if (radixColorStep < 10) {
            setBaseColorTranslucent(
              `${baseColorType}-a${radixColorStep - 3}` as SafeColorList,
            );
          } else {
            setBaseColorTranslucent(
              `${baseColorType}-a${radixColorStep - 6}` as SafeColorList,
            );
          }
        }
      }
    },
    [],
  );

  const [checkedThemeOption, setCheckedThemeOption] = useState(
    checkedThemeOptionVariant(mainColor, baseColor, mode),
  );

  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const openDrawer = () => setIsOpenDrawer(true);
  const closeDrawer = () => setIsOpenDrawer(false);

  const [openAccordion, setOpenAccordion] = useState(0);
  const handleOpenAccordion = (value: number) =>
    setOpenAccordion(openAccordion === value ? 0 : value);

  const { isDarkModeSelect, setIsDarkModeSelect } = useContext(
    IsDarkModeSelectContext,
  );
  const { isSystemModeSelect, setIsSystemModeSelect } = useContext(
    IsSystemModeSelectContext,
  );

  const syncSystemMode = useCallback(() => {
    if (matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme({
        baseColor,
        mainColor,
        mode: 'dark',
      });
      if (!isDarkModeSelect) setIsDarkModeSelect(true);
    }
    if (matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme({
        baseColor,
        mainColor,
        mode: 'light',
      });
      if (isDarkModeSelect) setIsDarkModeSelect(false);
    }
  }, [baseColor, isDarkModeSelect, mainColor, setIsDarkModeSelect, setTheme]);

  const handleDarkModeSwitchChange = useCallback(
    (event: ChangeEvent) => {
      const toggleSwitch = event.target as HTMLInputElement;
      const isRequestDarkMode = toggleSwitch.checked;
      setIsDarkModeSelect(isRequestDarkMode);
      if (
        isRequestDarkMode &&
        matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        setTheme({
          baseColor,
          mainColor,
          mode: 'dark',
        });
      }
      if (
        !isRequestDarkMode &&
        matchMedia('(prefers-color-scheme: light)').matches
      ) {
        setTheme({
          baseColor,
          mainColor,
          mode: 'light',
        });
      }
      if (
        isRequestDarkMode &&
        matchMedia('(prefers-color-scheme: light)').matches
      ) {
        setTheme({
          baseColor,
          mainColor,
          mode: 'dark',
        });
        setIsSystemModeSelect(false);
      }
      if (
        !isRequestDarkMode &&
        matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        setTheme({
          baseColor,
          mainColor,
          mode: 'light',
        });
        setIsSystemModeSelect(false);
      }
    },
    [
      baseColor,
      mainColor,
      setIsDarkModeSelect,
      setIsSystemModeSelect,
      setTheme,
    ],
  );

  const handleUseSystemModeChange = useCallback(
    (event: ChangeEvent) => {
      const toggleSwitch = event.target as HTMLInputElement;
      setIsSystemModeSelect(toggleSwitch.checked);
      if (matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme({
          baseColor,
          mainColor,
          mode: 'dark',
        });
        setIsDarkModeSelect(true);
      }
      if (matchMedia('(prefers-color-scheme: light)').matches) {
        setTheme({
          baseColor,
          mainColor,
          mode: 'light',
        });
        setIsDarkModeSelect(false);
      }
    },
    [
      baseColor,
      mainColor,
      setIsDarkModeSelect,
      setIsSystemModeSelect,
      setTheme,
    ],
  );

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

  const handleReloadButtonClick = useCallback(() => {
    location.reload();
  }, []);

  const handleVisibilityChange = useCallback(async () => {
    if (!isSystemModeSelect) return;
    syncSystemMode();
  }, [isSystemModeSelect, syncSystemMode]);

  const handleWindowFocus = useCallback(async () => {
    if (!isSystemModeSelect) return;
    syncSystemMode();
  }, [isSystemModeSelect, syncSystemMode]);

  useEffect(() => {
    if (!globalThis.window) return;
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [handleVisibilityChange]);

  useEffect(() => {
    if (!globalThis.window) return;
    window.addEventListener('focus', handleWindowFocus);
    return () => window.removeEventListener('focus', handleWindowFocus);
  }, [handleWindowFocus]);

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

  useEffect(() => {
    generateBaseColorTranslucent(baseColor);
  }, [baseColor, generateBaseColorTranslucent]);

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
              `group rounded-full p-3 text-[28px] ${colorVariants[mainColor]} active:${bgVariants[baseColor]} hover:${bgVariants[baseColor]}`,
              {
                'hover:brightness-95 active:brightness-90': mode === 'light',
                'hover:brightness-125 active:brightness-150': mode === 'dark',
                'hover:bg-radixGray-1': baseColor === 'tigersBlack-9',
              },
            )}
            onClick={openDrawer}
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
          <Drawer
            open={isOpenDrawer}
            placement="bottom"
            size={height}
            className={clsx(
              `overflow-y-auto overscroll-none rounded-3xl transition-drawer duration-themeChange ${bgVariants[baseColor]} ${colorVariants[mainColor]}`,
              {
                '!translate-y-[max(env(safe-area-inset-top),32px)]':
                  isOpenDrawer === true,
                '!translate-y-full': isOpenDrawer === false,
              },
            )}
            onClose={closeDrawer}
          >
            <div className="sticky top-0 z-[9999]">
              <div
                className={`mb-5 flex items-center justify-between px-2 py-3 backdrop-blur-2xl transition-drawer duration-themeChange ${bgVariants[baseColorTranslucent]}`}
              >
                <h2
                  className={clsx('select-none pl-5 text-lg font-semibold', {
                    'text-gray-900': mode === 'light',
                    'text-white-12': mode === 'dark',
                  })}
                >
                  設定
                </h2>
                <Button
                  ripple={false}
                  size="md"
                  variant="text"
                  className={clsx(
                    `group rounded-full active:${bgVariants[baseColor]} hover:${bgVariants[baseColor]}`,
                    {
                      'hover:brightness-95 active:brightness-90':
                        mode === 'light',
                      'hover:brightness-125 active:brightness-150':
                        mode === 'dark',
                      'hover:bg-radixGray-1': baseColor === 'tigersBlack-9',
                    },
                  )}
                  onClick={closeDrawer}
                >
                  <span
                    className={clsx('text-base text-blue-700', {
                      'group-hover:brightness-105 group-active:brightness-[1.11]':
                        mode === 'light',
                      'group-hover:brightness-[0.8] group-active:brightness-[0.66]':
                        mode === 'dark',
                    })}
                  >
                    完了
                  </span>
                </Button>
              </div>
            </div>
            <div className="grid gap-2 px-5 pb-24">
              <Accordion
                icon={<AccorionIcon id={1} open={openAccordion} />}
                open={openAccordion === 1}
              >
                <AccordionHeader
                  className={clsx(
                    `group rounded-lg border-none px-3 ${colorVariants[mainColor]} hover:${colorVariants[mainColor]} active:${bgVariants[baseColor]} hover:${bgVariants[baseColor]}`,
                    {
                      'hover:brightness-95 active:brightness-90':
                        mode === 'light',
                      'hover:brightness-125 active:brightness-150':
                        mode === 'dark',
                      'hover:bg-radixGray-1': baseColor === 'tigersBlack-9',
                    },
                  )}
                  onClick={() => handleOpenAccordion(1)}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={clsx('shrink-0', {
                        'group-hover:brightness-105 group-active:brightness-[1.11]':
                          mode === 'light',
                        'group-hover:brightness-[0.8] group-active:brightness-[0.66]':
                          mode === 'dark',
                      })}
                    >
                      <VscSymbolColor />
                    </span>
                    <span
                      className={clsx('text-base', {
                        'group-hover:brightness-105 group-active:brightness-[1.11]':
                          mode === 'light',
                        'group-hover:brightness-[0.8] group-active:brightness-[0.66]':
                          mode === 'dark',
                      })}
                    >
                      表示モード と テーマカラー
                    </span>
                  </div>
                </AccordionHeader>
                <AccordionBody className="px-2">
                  <div className="mb-10 grid gap-6">
                    <div className="flex items-center justify-between">
                      <h3
                        className={clsx('text-base font-semibold', {
                          'text-gray-900': mode === 'light',
                          'text-white-12': mode === 'dark',
                        })}
                      >
                        ダークモード
                      </h3>
                      <Switch
                        checked={isDarkModeSelect}
                        className="h-full w-full checked:bg-[#2ec946]"
                        crossOrigin={undefined}
                        ripple={false}
                        circleProps={{
                          className: 'before:hidden left-0.5 border-none',
                        }}
                        containerProps={{
                          className: 'w-11 h-6 scale-[1.25]',
                        }}
                        disabled={
                          baseColor === 'tigersBlack-9' ||
                          baseColor === 'tigersYellow-9'
                        }
                        onChange={handleDarkModeSwitchChange}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <h3
                        className={clsx('text-base font-semibold', {
                          'text-gray-900': mode === 'light',
                          'text-white-12': mode === 'dark',
                        })}
                      >
                        端末の設定を使う
                      </h3>
                      <Switch
                        checked={isSystemModeSelect}
                        className="h-full w-full checked:bg-[#2ec946]"
                        crossOrigin={undefined}
                        ripple={false}
                        circleProps={{
                          className: 'before:hidden left-0.5 border-none',
                        }}
                        containerProps={{
                          className: 'w-11 h-6 scale-[1.25]',
                        }}
                        disabled={
                          baseColor === 'tigersBlack-9' ||
                          baseColor === 'tigersYellow-9'
                        }
                        onChange={handleUseSystemModeChange}
                      />
                    </div>
                  </div>
                  <ul className="grid grid-cols-1 gap-5 pr-8 minimum:grid-cols-2 xxs:grid-cols-3">
                    <li>
                      <ThemeSelectButton
                        baseColor="radixGray-1"
                        checkedThemeOption={checkedThemeOption}
                        id={`radixGray-12-radixGray-1-${mode}-theme`}
                        mainColor="radixGray-12"
                        mode={mode}
                        name={labelName}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        baseColor="radixGray-2"
                        checkedThemeOption={checkedThemeOption}
                        id={`primary-8-radixGray-2-${mode}-theme`}
                        mainColor="primary-8"
                        mode={mode}
                        name={labelName}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        baseColor="radixGray-2"
                        checkedThemeOption={checkedThemeOption}
                        id={`radixTomato-11-radixGray-2-${mode}-theme`}
                        mainColor="radixTomato-11"
                        mode={mode}
                        name={labelName}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        baseColor="radixGray-2"
                        checkedThemeOption={checkedThemeOption}
                        id={`radixCrimson-11-radixGray-2-${mode}-theme`}
                        mainColor="radixCrimson-11"
                        mode={mode}
                        name={labelName}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        baseColor="radixGray-2"
                        checkedThemeOption={checkedThemeOption}
                        id={`radixViolet-11-radixGray-2-${mode}-theme`}
                        mainColor="radixViolet-11"
                        mode={mode}
                        name={labelName}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        baseColor="radixGray-2"
                        checkedThemeOption={checkedThemeOption}
                        id={`radixMint-11-radixGray-2-${mode}-theme`}
                        mainColor="radixMint-11"
                        mode={mode}
                        name={labelName}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        baseColor="radixGray-2"
                        checkedThemeOption={checkedThemeOption}
                        id={`radixGrass-11-radixGray-2-${mode}-theme`}
                        mainColor="radixGrass-11"
                        mode={mode}
                        name={labelName}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        baseColor="radixOlive-5"
                        checkedThemeOption={checkedThemeOption}
                        id={`radixOlive-11-radixOlive-5-${mode}-theme`}
                        mainColor="radixOlive-11"
                        mode={mode}
                        name={labelName}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        baseColor="radixGrass-5"
                        checkedThemeOption={checkedThemeOption}
                        id={`radixGrass-10-radixGrass-5-${mode}-theme`}
                        mainColor="radixGrass-10"
                        mode={mode}
                        name={labelName}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        baseColor="radixGray-2"
                        checkedThemeOption={checkedThemeOption}
                        id={`radixSand-10-radixGray-2-${mode}-theme`}
                        mainColor="radixSand-10"
                        mode={mode}
                        name={labelName}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        baseColor="radixGray-2"
                        checkedThemeOption={checkedThemeOption}
                        id={`radixGold-10-radixGray-2-${mode}-theme`}
                        mainColor="radixGold-10"
                        mode={mode}
                        name={labelName}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        baseColor="radixBrown-4"
                        checkedThemeOption={checkedThemeOption}
                        id={`radixBrown-12-radixBrown-4-${mode}-theme`}
                        mainColor="radixBrown-12"
                        mode={mode}
                        name={labelName}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        baseColor="radixLime-4"
                        checkedThemeOption={checkedThemeOption}
                        id={`radixLime-12-radixLime-4-${mode}-theme`}
                        mainColor="radixLime-12"
                        mode={mode}
                        name={labelName}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        baseColor="radixAmber-3"
                        checkedThemeOption={checkedThemeOption}
                        id={`radixAmber-12-radixAmber-3-${mode}-theme`}
                        mainColor="radixAmber-12"
                        mode={mode}
                        name={labelName}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        baseColor="radixSky-3"
                        checkedThemeOption={checkedThemeOption}
                        id={`radixSky-11-radixSky-3-${mode}-theme`}
                        mainColor="radixSky-11"
                        mode={mode}
                        name={labelName}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        baseColor="radixRuby-3"
                        checkedThemeOption={checkedThemeOption}
                        id={`radixRuby-10-radixRuby-3-${mode}-theme`}
                        mainColor="radixRuby-10"
                        mode={mode}
                        name={labelName}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        baseColor="radixPlum-4"
                        checkedThemeOption={checkedThemeOption}
                        id={`radixPlum-12-radixPlum-4-${mode}-theme`}
                        mainColor="radixPlum-12"
                        mode={mode}
                        name={labelName}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        baseColor="radixJade-3"
                        checkedThemeOption={checkedThemeOption}
                        id={`radixJade-12-radixJade-3-${mode}-theme`}
                        mainColor="radixJade-12"
                        mode={mode}
                        name={labelName}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        baseColor="radixSage-5"
                        checkedThemeOption={checkedThemeOption}
                        id={`radixSage-12-radixSage-5-${mode}-theme`}
                        mainColor="radixSage-12"
                        mode={mode}
                        name={labelName}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        baseColor="radixMint-3"
                        checkedThemeOption={checkedThemeOption}
                        id={`radixMint-11-radixMint-3-${mode}-theme`}
                        mainColor="radixMint-11"
                        mode={mode}
                        name={labelName}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      <ThemeSelectButton
                        baseColor="radixGray-3"
                        checkedThemeOption={checkedThemeOption}
                        id={`radixGray-12-radixGray-3-${mode}-theme`}
                        mainColor="radixGray-12"
                        mode={mode}
                        name={labelName}
                        setCheckedThemeOption={setCheckedThemeOption}
                      />
                    </li>
                    <li>
                      {mode === 'dark' ? (
                        <ThemeSelectButton
                          baseColor="tigersBlack-9"
                          checkedThemeOption={checkedThemeOption}
                          id="tigersYellow-9-tigersBlack-9-dark-theme"
                          mainColor="tigersYellow-9"
                          mode="dark"
                          name={labelName}
                          setCheckedThemeOption={setCheckedThemeOption}
                        />
                      ) : (
                        <ThemeSelectButton
                          baseColor="tigersYellow-9"
                          checkedThemeOption={checkedThemeOption}
                          id="tigersBlack-9-tigersYellow-9-light-theme"
                          mainColor="tigersBlack-9"
                          mode="light"
                          name={labelName}
                          setCheckedThemeOption={setCheckedThemeOption}
                        />
                      )}
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
                    `group rounded-lg border-none px-3 text-${mainColor} hover:text-${mainColor} active:${bgVariants[baseColor]} hover:${bgVariants[baseColor]}`,
                    {
                      'hover:brightness-95 active:brightness-90':
                        mode === 'light',
                      'hover:brightness-125 active:brightness-150':
                        mode === 'dark',
                      'hover:bg-radixGray-1': baseColor === 'tigersBlack-9',
                    },
                  )}
                  onClick={() => handleOpenAccordion(2)}
                >
                  <div className="flex items-center gap-4 text-xl">
                    <span
                      className={clsx('shrink-0', {
                        'group-hover:brightness-105 group-active:brightness-[1.11]':
                          mode === 'light',
                        'group-hover:brightness-[0.8] group-active:brightness-[0.66]':
                          mode === 'dark',
                      })}
                    >
                      <GoZoomIn />
                    </span>
                    <span
                      className={clsx('text-base', {
                        'group-hover:brightness-105 group-active:brightness-[1.11]':
                          mode === 'light',
                        'group-hover:brightness-[0.8] group-active:brightness-[0.66]':
                          mode === 'dark',
                      })}
                    >
                      文字サイズ
                    </span>
                  </div>
                </AccordionHeader>
                {/* <AccordionBody></AccordionBody> */}
              </Accordion>
              <Accordion
                icon={<AccorionIcon id={3} open={openAccordion} />}
                open={openAccordion === 3}
              >
                <AccordionHeader
                  className={clsx(
                    `group rounded-lg border-none px-3 text-${mainColor} hover:text-${mainColor} active:${bgVariants[baseColor]} hover:${bgVariants[baseColor]}`,
                    {
                      'hover:brightness-95 active:brightness-90':
                        mode === 'light',
                      'hover:brightness-125 active:brightness-150':
                        mode === 'dark',
                      'hover:bg-radixGray-1': baseColor === 'tigersBlack-9',
                    },
                  )}
                  onClick={() => handleOpenAccordion(3)}
                >
                  <div className="flex items-center gap-4 text-xl">
                    <span
                      className={clsx('shrink-0', {
                        'group-hover:brightness-105 group-active:brightness-[1.11]':
                          mode === 'light',
                        'group-hover:brightness-[0.8] group-active:brightness-[0.66]':
                          mode === 'dark',
                      })}
                    >
                      <GoInfo />
                    </span>
                    <span
                      className={clsx('text-base', {
                        'group-hover:brightness-105 group-active:brightness-[1.11]':
                          mode === 'light',
                        'group-hover:brightness-[0.8] group-active:brightness-[0.66]':
                          mode === 'dark',
                      })}
                    >
                      アプリ情報
                    </span>
                  </div>
                </AccordionHeader>
                <AccordionBody>
                  <div className="grid gap-5 px-2">
                    <dl
                      className={clsx(
                        'flex items-center justify-between px-3',
                        {
                          'text-gray-900': mode === 'light',
                          'text-white-12': mode === 'dark',
                        },
                      )}
                    >
                      <dt className="text-base font-semibold">
                        現在のバージョン
                      </dt>
                      <dd className="text-sm font-medium">{appVersion}</dd>
                    </dl>
                    <Button
                      ripple={false}
                      variant="text"
                      className={clsx(
                        `flex items-center justify-center gap-3 px-3 py-3.5 text-${baseColor} ${bgVariants[mainColor]} hover:${bgVariants[mainColor]} active:${bgVariants[mainColor]}`,
                        {
                          'hover:brightness-95 active:brightness-90':
                            mode === 'light',
                          'hover:brightness-110 active:brightness-125':
                            mode === 'dark',
                        },
                      )}
                      onClick={handleReloadButtonClick}
                    >
                      <span className="text-base font-semibold">
                        アプリを更新する
                      </span>
                    </Button>
                  </div>
                </AccordionBody>
              </Accordion>
            </div>
          </Drawer>
        </div>
      </div>
    </>
  );
}
