import { GoogleAnalytics } from '@next/third-parties/google';

export default async function Analytics() {
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
      <GoogleAnalytics gaId={ANALYTICS_ID || ''} />
    </>
  );
}
