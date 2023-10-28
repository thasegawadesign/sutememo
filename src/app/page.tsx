import Screen from '@/components/screen';
import Header from '@/components/header';
import HeaderItem from '@/components/header-item';
import Main from '@/components/main';
import MainItem from '@/components/main-item';

export default function Home() {
  return (
    <>
      <Screen>
        <Header>
          <HeaderItem />
        </Header>
        <Main>
          <MainItem />
        </Main>
      </Screen>
    </>
  );
}
