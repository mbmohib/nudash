import { IconTypes } from '../../types';
import withIcon from './withIcon';

function PlusIcon(props: IconTypes) {
  return (
    <svg
      width={20}
      height={20}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.33 0h9.33C18.06 0 20 1.92 20 5.33v9.34c0 3.39-1.93 5.33-5.33 5.33H5.33C1.92 20 0 18.06 0 14.67V5.33C0 1.92 1.92 0 5.33 0zm5.49 10.83h2.84c.46-.01.83-.38.83-.84 0-.46-.37-.83-.83-.83h-2.84V6.34c0-.46-.37-.83-.83-.83-.46 0-.83.37-.83.83v2.82H6.33c-.22 0-.43.09-.59.24a.866.866 0 00-.24.59c0 .46.37.83.83.84h2.83v2.83c0 .46.37.83.83.83.46 0 .83-.37.83-.83v-2.83z"
      />
    </svg>
  );
}

export default withIcon(PlusIcon);
