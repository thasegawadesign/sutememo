import Header from '@/components/header';
import HeaderItem from '@/components/header-item';
import Main from '@/components/main';
import MainItem from '@/components/main-item';

export default function ContentsWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header>
        <HeaderItem />
      </Header>
      <Main>
        <MainItem appendedNode={children} />
      </Main>
    </>
  );
}
