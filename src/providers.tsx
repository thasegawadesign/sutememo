import { cookies } from 'next/headers';

import IsDarkModeSelectProvider from '@/contexts/is-dark-mode-select-provider';
import IsSystemModeSelectProvider from '@/contexts/is-system-mode-select-provider';
import MaterialThemeProvider from '@/contexts/material-theme-provider';
import SettingsDrawerProvider from '@/contexts/settings-drawer-provider';
import ShowAppInstallButtonProvider from '@/contexts/show-app-install-button-provider';
import ThemeProvider from '@/contexts/theme-provider';

export async function Providers({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const baseColor = cookieStore.get('baseColor')?.value;
  const mainColor = cookieStore.get('mainColor')?.value;
  const mode = cookieStore.get('mode')?.value;
  const isDarkModeSelect = cookieStore.get('isDarkModeSelect')?.value;
  const isSystemModeSelect = cookieStore.get('isSystemModeSelect')?.value;

  return (
    <IsSystemModeSelectProvider isChecked={isSystemModeSelect}>
      <IsDarkModeSelectProvider isChecked={isDarkModeSelect}>
        <ThemeProvider baseColor={baseColor} mainColor={mainColor} mode={mode}>
          <ShowAppInstallButtonProvider>
            <SettingsDrawerProvider>
              <MaterialThemeProvider>{children}</MaterialThemeProvider>
            </SettingsDrawerProvider>
          </ShowAppInstallButtonProvider>
        </ThemeProvider>
      </IsDarkModeSelectProvider>
    </IsSystemModeSelectProvider>
  );
}
