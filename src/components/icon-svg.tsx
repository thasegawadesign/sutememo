import RawIconSvg from '@/components/raw-icon-svg';
import { SafeColorList } from '@/types/ColorList';
import { getColorCode } from '@/utils/getColorCode';

type Props = {
  colorName: SafeColorList;
};

export default function IconSvg(props: Props) {
  const { colorName } = props;

  const colorCode = getColorCode(colorName);

  return RawIconSvg({ colorCode });
}
