import { Radio } from '../context/material-providers';
import CheckedIcon from './checked-icon';

type Props = {
  defaultChecked: boolean;
  name: string;
  id: string;
  baseColor: string;
  mainColor: string;
};

export default function ThemeRadio(props: Props) {
  const { defaultChecked, name, id, baseColor, mainColor } = props;

  return (
    <>
      <Radio
        defaultChecked={defaultChecked}
        name={name}
        id={id}
        icon={<CheckedIcon />}
        className="checked:before:bg-blue-gray-50 hover:bg-blue-gray-50 hover:brightness-[102%] active:bg-blue-gray-50"
        label={
          <div className="grid rounded-full border border-gray-300">
            <div className={`h-6 w-12 rounded-t-full ${baseColor}`} />
            <div className={`h-6 w-12 rounded-b-full ${mainColor}`} />
          </div>
        }
        ripple={false}
      />
    </>
  );
}
