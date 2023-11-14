import Header from '@/components/header';
import HeaderItem from '@/components/header-item';
import Main from '@/components/main';
import MainItem from '@/components/main-item';
import Screen from '@/components/screen';

export default function Settings() {
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
