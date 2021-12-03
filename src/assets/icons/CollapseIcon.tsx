import { IconTypes } from '../../types';
import withIcon from './withIcon';

function CollapseIcon(props: IconTypes) {
  return (
    <svg
      width={16}
      height={16}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      {...props}
    >
      <path d="M15.707 1.707A1 1 0 0 0 14.293.293l-2.96 2.96V1.666a1 1 0 1 0-2 0v3.866l.002.07a.998.998 0 0 0 1.063 1.062l.069.002h3.866a1 1 0 1 0 0-2h-1.585l2.96-2.96ZM5.667 15.333a1 1 0 0 1-1-1v-1.585l-2.96 2.96a1 1 0 0 1-1.414-1.415l2.96-2.96H1.666a1 1 0 1 1 0-2h3.866l.07.002a.998.998 0 0 1 1.062 1.063l.002.069v3.866a1 1 0 0 1-1 1Z" />
    </svg>
  );
}

export default withIcon(CollapseIcon);
