// src/mocks/handlers.js
import { RestRequest, rest } from 'msw';

import { Section } from '../types';
import { pageData, siteData } from './data';

// eslint-disable-next-line import/prefer-default-export
export const handlers = [
  rest.get('/site', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(siteData));
  }),

  rest.get('/pages/:slug', (req, res, ctx) => {
    const page = pageData.find(pageItem => pageItem.path === req.params.slug);

    return res(ctx.status(200), ctx.json(page));
  }),

  rest.post('/pages', (req: RestRequest, res, ctx) => {
    const body = req.body as { name: string; path: string };

    const data = {
      ...siteData,
      pages: [
        ...siteData.pages,
        {
          id: '002',
          name: body.name,
          path: body.path,
        },
      ],
    };

    return res(ctx.status(200), ctx.json(data));
  }),

  rest.post('/pages/:slug', (req: RestRequest, res, ctx) => {
    const body = req.body as Section;

    const page = pageData.find(pageItem => pageItem.path === req.params.slug);

    const data = {
      ...page,
      sections: body,
    };

    return res(ctx.status(200), ctx.json(data));
  }),

  rest.post('/sites', (req: RestRequest, res, ctx) => {
    const { body } = req;

    const data = {
      ...siteData,
      ...(body as Record<string, string>),
    };

    return res(ctx.status(200), ctx.json(data));
  }),
];
