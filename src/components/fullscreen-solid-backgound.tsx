import { SafeColorList } from '@/types/ColorList';
import { bgVariants } from '@/utils/colorVariants';

type Props = {
  colorName: SafeColorList;
};

export default function FullScreenSolidBackgound(props: Props) {
  const { colorName } = props;

  return (
    <div
      className={`min-h-[100svh] w-full pwa:min-h-screen ${bgVariants[`${colorName}`]}`}
    />
  );
}
