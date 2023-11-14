import ContentsWrapper from '@/components/contents-wrapper';
import Screen from '@/components/screen';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Screen>
        <ContentsWrapper>{children}</ContentsWrapper>
      </Screen>
    </>
  );
}
