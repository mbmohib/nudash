import { IconTypes } from '../../types';
import withIcon from './withIcon';

function EditIcon(props: IconTypes) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={14}
      height={14}
      viewBox="0 0 14 14"
      {...props}
    >
      <path d="M.5 1.59c.028-.105.051-.212.086-.315C.816.601 1.424.17 2.156.17c1.484-.003 2.969-.003 4.454 0h2.816c-.039.043-.063.074-.091.101-.477.48-.959.957-1.435 1.438a.268.268 0 0 1-.21.087c-1.798-.002-3.596-.003-5.394-.002h-.171v8.859c0 .555.337.89.894.89h7.958c.565 0 .897-.334.897-.902L11.87 5.98a.282.282 0 0 1 .094-.22c.504-.5 1.005-1.004 1.522-1.522.005.048.011.079.011.109 0 2.12.004 4.24 0 6.36-.003 1.255-.877 2.255-2.112 2.435a.373.373 0 0 0-.07.024H2.684a.417.417 0 0 0-.07-.024c-.962-.159-1.622-.69-1.968-1.6-.068-.18-.098-.373-.146-.56V1.59Z" />
      <path d="M7.687 8.256 5.395 5.962l.078-.084 5.483-5.48c.06-.065.13-.12.205-.168a.396.396 0 0 1 .51.066c.561.558 1.12 1.117 1.68 1.677.165.166.173.397.028.586-.031.04-.066.077-.103.112L7.766 8.18c-.025.027-.054.052-.079.076ZM7.137 8.922l-3.213.803.803-3.213 2.41 2.41Z" />
    </svg>
  );
}

export default withIcon(EditIcon);
