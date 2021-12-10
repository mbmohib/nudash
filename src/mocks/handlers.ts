import { rest } from 'msw';

import {
  addPage,
  getPage,
  getPages,
  getSite,
  updatePage,
  updateSite,
} from './api';

export default [
  rest.get('/site', getSite),
  rest.post('/sites', updateSite),

  rest.get('/pages/:slug', getPage),
  rest.get('/:site/pages', getPages),

  rest.post('/:site/pages', addPage),
  rest.post('/pages/:slug', updatePage),
];
