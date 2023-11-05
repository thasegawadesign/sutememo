import RawIconSvg from '@/components/raw-icon-svg';
import useRealColor from '@/hooks/useRealColor';
import { SafeColorList } from '@/types/ColorList';

type Props = {
  color: SafeColorList;
};

export default function IconSvg(props: Props) {
  const { color } = props;
  const realColor = useRealColor({ color });

  return RawIconSvg({ color, realColor });
}
