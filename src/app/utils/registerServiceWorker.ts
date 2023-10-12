import { env } from 'process';

export const registerServiceWorker = async () => {
  if (env.NODE_ENV === 'development') return;
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered successfully');
    } catch (error) {
      console.log('Service Worker registration failed:', error);
    }
  }
};
