import { IconTypes } from '../../types';
import withIcon from './withIcon';

function SaveIcon(props: IconTypes) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={14}
      height={15}
      viewBox="0 0 14 15"
      {...props}
    >
      <path d="M0 2.5a2 2 0 0 1 2-2h1V4a1.5 1.5 0 0 0 1.5 1.5h4A1.5 1.5 0 0 0 10 4V.5h.379a2 2 0 0 1 1.414.586l1.621 1.621A2 2 0 0 1 14 4.121V12.5a2 2 0 0 1-2 2V9a1.5 1.5 0 0 0-1.5-1.5h-7A1.5 1.5 0 0 0 2 9v5.5a2 2 0 0 1-2-2v-10Zm9-2H4V4a.5.5 0 0 0 .5.5h4A.5.5 0 0 0 9 4V.5ZM11 9v5.5H3V9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5Z" />
    </svg>
  );
}

export default withIcon(SaveIcon);
