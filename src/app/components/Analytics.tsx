import Script from 'next/script';

export default function Analytics() {
  const ANALYTICS_ID = process.env.NEXT_PUBLIC_ANALYTICS_ID;
  if (process.env.NODE_ENV !== 'production') {
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
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
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
          `,
        }}
      />
    </>
  );
}
