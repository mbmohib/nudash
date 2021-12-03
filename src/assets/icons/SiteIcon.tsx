import { IconTypes } from '../../types';
import withIcon from './withIcon';

function SiteIcon(props: IconTypes) {
  return (
    <svg
      width={20}
      height={16}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M4 11H1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Zm-.75-2.5h6V10h1.5V8.5h6V10h1.5V8.2c0-.661-.538-1.2-1.2-1.2h-6.3V5H12a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h1.25v2h-6.3c-.662 0-1.2.538-1.2 1.2V10h1.5V8.5ZM11.5 11h-3a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Zm7.5 0h-3a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Z" />
    </svg>
  );
}
export default withIcon(SiteIcon);
