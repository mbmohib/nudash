import { build, fake, sequence } from '@jackfranklin/test-data-bot';

import { Site } from '../../types';

// eslint-disable-next-line import/prefer-default-export
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
        id: sequence(),
        label: 'Home',
        url: '/',
        isOpenNew: false,
      },
    ],
  },
});

export const siteData = siteBuilder() as Site;
