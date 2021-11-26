import { nanoid } from 'nanoid';

export default {
  name: 'Nudash',
  tagline: 'We will rock!',
  description: 'We do...',
  logo: '',
  url: 'https://mohib.me',
  menus: [
    {
      id: nanoid(),
      label: 'Home',
      url: '/',
      isOpenNew: false,
    },
  ],
  pages: [
    {
      id: nanoid(),
      name: 'Home',
      path: 'home',
    },
  ],
};
