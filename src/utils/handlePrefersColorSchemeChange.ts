import { updateHtmlColorScheme } from '@/utils/updateHtmlColorScheme';

export function handlePrefersColorSchemeChange(
  this: boolean,
  event: MediaQueryListEvent,
) {
  const isSystemModeSelect = this;
  if (!isSystemModeSelect) return;
  if (event.matches) {
    document.documentElement.classList.remove('light-theme');
    document.documentElement.classList.add('dark-theme');
    updateHtmlColorScheme('dark');
  } else {
    document.documentElement.classList.remove('dark-theme');
    document.documentElement.classList.add('light-theme');
    updateHtmlColorScheme('light');
  }
}
