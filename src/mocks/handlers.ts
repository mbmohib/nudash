import { rest } from 'msw';

import { apiEndpoint } from '../config';
import {
  addPage,
  deleteImage,
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
  rest.get(`${apiEndpoint}/site`, getSite),
  rest.post(`${apiEndpoint}/sites`, updateSite),

  rest.get(`${apiEndpoint}/pages/:slug`, getPage),
  rest.get(`${apiEndpoint}/:site/pages`, getPages),

  rest.post(`${apiEndpoint}/:site/pages`, addPage),
  rest.post(`${apiEndpoint}/pages/:slug`, updatePage),

  rest.get(`${apiEndpoint}/images`, getImages),
  rest.post(`${apiEndpoint}/images`, uploadImage),
  rest.put(`${apiEndpoint}/images/:id`, updateImage),
  rest.delete(`${apiEndpoint}/images/:id`, deleteImage),
];
