import { rest } from 'msw';

import {
  addPage,
  getImages,
  getPage,
  getPages,
  getSite,
  updateImage,
  updatePage,
  updateSite,
  uploadImage,
} from './api';

export default [
  rest.get('/site', getSite),
  rest.post('/sites', updateSite),

  rest.get('/pages/:slug', getPage),
  rest.get('/:site/pages', getPages),

  rest.post('/:site/pages', addPage),
  rest.post('/pages/:slug', updatePage),

  rest.get('/images', getImages),
  rest.post('/images', uploadImage),
  rest.put('/images/:id', updateImage),
];
