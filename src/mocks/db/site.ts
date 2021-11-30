import { factory, nullable, primaryKey } from '@mswjs/data';
import faker from 'faker';
import { nanoid } from 'nanoid';

const data = {
  id: nanoid(),
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

// eslint-disable-next-line import/prefer-default-export
export const db = factory({
  site: {
    id: primaryKey(String),
    name: faker.lorem.word,
    tagline: faker.lorem.sentence,
    description: faker.lorem.sentences,
    logo: faker.image.imageUrl,
    url: faker.internet.url,
    // menus: [
    //   {
    //     id: primaryKey(faker.random.uuid).
    //   }
    // ],
  },
});

db.site.create({ id: 'nudash' });
