import { nanoid } from 'nanoid';

export default {
  id: '001',
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
};
