import clsx from 'clsx';

export default function AccorionIcon({
  id,
  open,
}: {
  id: number;
  open: number;
}) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('h-5 w-5 -rotate-90 transition-transform', {
        '-rotate-0': id === open,
      })}
    >
      <path
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
