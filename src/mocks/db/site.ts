import { build, fake } from '@jackfranklin/test-data-bot';
import { nanoid } from 'nanoid';

import { Site } from '../../types';

export const siteBuilder = build('Site', {
  fields: {
    id: 'nudash',
    name: fake(f => f.lorem.words()),
    tagline: fake(f => f.lorem.paragraphs()),
    description: fake(f => f.lorem.paragraphs().replace(/\r/g, '')),
    logo: fake(f => f.image.imageUrl),
    url: fake(f => f.internet.url()),
    menus: [
      {
        id: nanoid(),
        label: 'Home',
        url: '/',
        isOpenNew: false,
      },
    ],
  },
});

export const siteData = siteBuilder() as Site;
