import { IconTypes } from '../../types';
import withIcon from './withIcon';

function PageIcon(props: IconTypes) {
  return (
    <svg
      width={18}
      height={20}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.81 0h8.381C16.28 0 18 1.78 18 4.83v10.33c0 3.1-1.72 4.84-4.809 4.84H4.81C1.77 20 0 18.26 0 15.16V4.83C0 1.78 1.77 0 4.81 0zm.27 4.66v-.01h2.989c.431 0 .781.35.781.779 0 .441-.35.791-.781.791H5.08a.78.78 0 010-1.56zm0 6.08h7.84a.781.781 0 000-1.561H5.08a.781.781 0 000 1.561zm0 4.57h7.84c.399-.04.7-.381.7-.78 0-.41-.301-.75-.7-.79H5.08a.795.795 0 00-.75 1.21c.16.25.45.4.75.36z"
      />
    </svg>
  );
}
export default withIcon(PageIcon);
