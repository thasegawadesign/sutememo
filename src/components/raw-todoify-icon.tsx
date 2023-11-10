type Props = {
  colorCode: string;
};

export default function RawTodoifyIcon(props: Props) {
  const { colorCode } = props;

  return (
    <svg
      id="todoify-icon"
      style={{ maxWidth: '100%', maxHeight: '100%' }}
      viewBox="0 0 536.8 423.6"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={colorCode}
        d="M533.2,73.2L463.5,3.5c-4.7-4.7-12.3-4.7-17,0L194.4,255.6L90.2,151.4c-4.7-4.7-12.3-4.7-17,0L3.5,221.1
		c-4.7,4.7-4.7,12.3,0,17l182,182c2.5,2.5,5.7,3.6,8.9,3.5c3.2,0.1,6.5-1,8.9-3.5L533.2,90.2C537.9,85.5,537.9,77.9,533.2,73.2z"
      />
    </svg>
  );
}
