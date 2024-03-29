import { build } from '@jackfranklin/test-data-bot';
import { nanoid } from 'nanoid';

import { Page, Pages } from '../../types';

export const pagesBuilder = build('Pages', {
  fields: { id: nanoid(), name: 'Home', path: 'home' },
});

export const pageBuilder = build('Page', {
  fields: {
    siteId: 'nudash',
    pageId: nanoid(),
    name: 'home',
    path: 'home',
    sections: [
      {
        id: nanoid(),
        rows: [
          {
            id: 0,
            columns: [[]],
          },
        ],
      },
    ],
    lastRowItemInfo: {},
  },
});

export const pagesData = [pagesBuilder()] as Pages[];
export const pageData = pageBuilder() as Page;
