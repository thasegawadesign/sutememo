import { Metadata } from 'next';

import { appName } from '@/common/constants';

export const metadata: Metadata = {
  title: `ホーム | ${appName}`,
};

export default function Home() {
  return <></>;
}
