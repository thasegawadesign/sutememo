'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Header from '@/components/header';
import HeaderItem from '@/components/header-item';
import Main from '@/components/main';
import MainItem from '@/components/main-item';
import { themeChangeDurationMs } from '@/utils/themeChange';

export default function ContentsWrapper() {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const openDrawer = () => setIsOpenDrawer(true);
  const closeDrawer = () => {
    const bufferTimeMs = 300;
    setIsOpenDrawer(false);
    setTimeout(() => {
      router.push('/');
    }, themeChangeDurationMs + bufferTimeMs);
  };

  useEffect(() => {
    setIsOpenDrawer(pathname === '/settings' ? true : false);
  }, [pathname, setIsOpenDrawer]);

  return (
    <>
      <Header>
        <HeaderItem openDrawer={openDrawer} />
      </Header>
      <Main>
        <MainItem closeDrawer={closeDrawer} isOpenDrawer={isOpenDrawer} />
      </Main>
    </>
  );
}
