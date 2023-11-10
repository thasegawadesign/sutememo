import RawTodoifyIcon from '@/components/raw-todoify-icon';
import { SafeColorList } from '@/types/ColorList';
import { getColorCode } from '@/utils/getColorCode';

type Props = {
  colorName: SafeColorList;
};

export default function IconSvg(props: Props) {
  const { colorName } = props;

  const colorCode = getColorCode(colorName);

  return RawTodoifyIcon({ colorCode });
}
