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
