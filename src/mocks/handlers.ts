import { rest } from 'msw';

import { addPage, getPage, getPages, updatePage } from './api/pages';
import { getSite, siteFailed, updateSite } from './api/sites';

export default [
  rest.get('/site', getSite),
  rest.post('/sites', siteFailed),

  rest.get('/pages/:slug', getPage),
  rest.get('/:site/pages', getPages),

  rest.post('/:site/pages', addPage),
  rest.post('/pages/:slug', updatePage),
];
