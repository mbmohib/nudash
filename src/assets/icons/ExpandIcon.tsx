import { IconTypes } from '../../types';
import withIcon from './withIcon';

function ExpandIcon(props: IconTypes) {
  return (
    <svg
      width={19}
      height={19}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      viewBox="0 0 19 19"
    >
      <path d="M4.669 11.923a1 1 0 0 1 1.414 1.414l-2.668 2.667H5a1 1 0 0 1 .993.884l.007.116a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-4a1 1 0 1 1 2 0v1.587l2.669-2.668Zm8.336 6.081a1 1 0 1 1 0-2h1.583l-2.665-2.667a1 1 0 0 1-.083-1.32l.083-.094a1 1 0 0 1 1.414 0l2.668 2.67v-1.589a1 1 0 0 1 .883-.993l.117-.007a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4ZM5 0a1 1 0 0 1 0 2H3.417l2.665 2.668a1 1 0 0 1 .083 1.32l-.083.094a1 1 0 0 1-1.414 0L2 3.412V5a1 1 0 0 1-.883.993L1 6a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h4Zm12.005 0a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V3.412l-2.668 2.67a1 1 0 0 1-1.32.083l-.094-.083a1 1 0 0 1 0-1.414L14.589 2h-1.584a1 1 0 0 1-.993-.883L12.005 1a1 1 0 0 1 1-1h4Z" />
    </svg>
  );
}

export default withIcon(ExpandIcon);
