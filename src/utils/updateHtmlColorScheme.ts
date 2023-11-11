import { Mode } from '@/contexts/theme-provider';

export const updateHtmlColorScheme = (mode: Mode) => {
  const HTML = document.querySelector('html');
  if (!HTML) return;
  switch (mode) {
    case 'light':
      HTML.style.colorScheme = 'light';
      HTML.classList.remove('dark-theme');
      HTML.classList.add('light-theme');
      return;
    case 'dark':
      HTML.style.colorScheme = 'dark';
      HTML.classList.remove('light-theme');
      HTML.classList.add('dark-theme');
      return;
  }
};
