import { env } from 'process';

import { minify } from '@swc/core';
import Script from 'next/script';

export default async function Analytics() {
  const cookieDomain = env.COOKIE_DOMAIN;
  const ANALYTICS_ID = env.NEXT_PUBLIC_ANALYTICS_ID;

  const customGaScript = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('set', {
    cookie_domain: '${cookieDomain}',
    cookie_flags: 'SameSite=None;Secure',
  });
  gtag('config', '${ANALYTICS_ID}');
  document.addEventListener(
    'blur',
    (event) => {
      if (!event.target) return;
      const isTextbox = event.target.role === 'textbox';
      if (isTextbox) {
        gtag('event', 'edit_todo');
      }
    },
    true,
  );
  document.querySelector('[aria-label="Add"]')?.addEventListener('click', (event) => {
    gtag('event', 'add_todo', {
      event_category: 'Add',
      event_label: 'Click',
    });
  });
  document.querySelector('[aria-label="Undo"]')?.addEventListener('click', (event) => {
    gtag('event', 'undo', {
      event_category: 'Undo',
      event_label: 'Click',
    });
  });
  document.querySelector('[aria-label="Redo"]')?.addEventListener('click', (event) => {
    gtag('event', 'redo', {
      event_category: 'Redo',
      event_label: 'Click',
    });
  });
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) return;
    if (event.key === 'Enter') {
      const target = event.target;
      if (target?.nodeName !== 'BODY') return;
      gtag('event', 'add_todo', {
        event_category: 'Add',
        event_label: 'Keydown',
      });
    }
  });
  document.addEventListener('click', (event) => {
    if (!event.target) return;
    const isSVG = event.target.localName === 'svg';
    const isButton = event.target.localName === 'button';
    const target =
      (isSVG && event.target.parentElement) || (isButton && event.target);
    const isDeleteButton = target.ariaLabel === 'Delete';
    if (isDeleteButton) gtag('event', 'delete_todo');
  });
  document.addEventListener('mouseup', (event) => {
    if (!event.target) return;
    const isSVG = event.target.localName === 'svg';
    const isButton = event.target.localName === 'button';
    const target =
      (isSVG && event.target.parentElement) || (isButton && event.target);
    const isDraggableButton = target.ariaRoleDescription === 'sortable';
    if (isDraggableButton)
      gtag('event', 'sort_todo', {
        event_category: 'Sort',
        event_label: 'MouseUp',
      });
  });
  document.addEventListener('touchend', (event) => {
    if (!event.target) return;
    const isSVG = event.target.localName === 'svg';
    const isButton = event.target.localName === 'button';
    const target =
      (isSVG && event.target.parentElement) || (isButton && event.target);
    const isDraggableButton = target.ariaRoleDescription === 'sortable';
    if (isDraggableButton)
      gtag('event', 'sort_todo', {
        event_category: 'Sort',
        event_label: 'TouchEnd',
      });
  });
  window.addEventListener('appinstalled', (event) => {
    gtag('event', 'install_pwa', {
      event_category: 'PWA',
      event_label: 'Install',
    });
  });
`;

  const result = await minify(customGaScript);
  const minifiedCode = result.code as string;

  if (env.NODE_ENV !== 'production') {
    return <></>;
  }
  if (!ANALYTICS_ID) {
    console.warn('Analytics測定IDが定義されていません');
    return <></>;
  }

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_ID}`}
      ></Script>
      <Script id="gtag">{minifiedCode}</Script>
    </>
  );
}
