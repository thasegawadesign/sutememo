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
  // const deleteButtons = document.querySelectorAll('.delete-button');
  // if (deleteButtons.length > 0) {
  //   deleteButtons.forEach((deleteButton) => {
  //     deleteButton.addEventListener('click', (event) => {
  //       gtag('event', 'delete_todo');
  //     });
  //   });
  // }

  // document.addEventListener('mouseup', (event) => {
  //   if (!event.target) return;
  //   const isSVG = event.target.localName === 'svg';
  //   const isButton = event.target.localName === 'button';
  //   console.log(event);
  // });

  // document.addEventListener('click', (event) => {
  //   if (!event.target) return;
  //   const isSVG = event.target.localName === 'svg';
  //   const isButton = event.target.localName === 'button';
  //   const target =
  //     (isSVG && event.target.parentElement) || (isButton && event.target);
  //   const isDeleteButton = target.ariaLabel === 'Delete';
  //   if (isDeleteButton) gtag('event', 'delete_todo');
  // });

  // document.addEventListener('mouseup', (event) => {
  //   if (!event.target) return;
  //   const isSVG = event.target.localName === 'svg';
  //   const isButton = event.target.localName === 'button';
  //   const target =
  //     (isSVG && event.target.parentElement) || (isButton && event.target);
  //   const isDraggableButton = target.ariaRoleDescription === 'sortable';
  //   if (isDraggableButton)
  //     gtag('event', 'sort_todo', {
  //       event_category: 'Sort',
  //       event_label: 'MouseUp',
  //     });
  // });

  // document.addEventListener('touchend', (event) => {
  //   if (!event.target) return;
  //   const isSVG = event.target.localName === 'svg';
  //   const isButton = event.target.localName === 'button';
  //   const target =
  //     (isSVG && event.target.parentElement) || (isButton && event.target);
  //   const isDraggableButton = target.ariaRoleDescription === 'sortable';
  //   if (isDraggableButton)
  //     gtag('event', 'sort_todo', {
  //       event_category: 'Sort',
  //       event_label: 'TouchEnd',
  //     });
  // });

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
            document.querySelector('.add-button')?.addEventListener('click', (event) => {
              gtag('event', 'add_todo');
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
