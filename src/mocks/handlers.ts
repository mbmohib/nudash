// src/mocks/handlers.js
import { RestRequest, rest } from 'msw';

import { Page, Site } from '../types';
import { pageData, siteData } from './data';
import { db } from './db/site';

// eslint-disable-next-line import/prefer-default-export
export const handlers = [
  rest.get('/site', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(
        db.site.findFirst({
          where: {
            id: {
              equals: 'nudash',
            },
          },
        }),
      ),
    );
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
    const body = req.body as Page;

    const page = pageData.find(pageItem => pageItem.path === req.params.slug);

    const data = {
      ...page,
      Pages: body,
    };

    return res(ctx.status(200), ctx.json(data));
  }),

  rest.post('/sites', (req: RestRequest, res, ctx) => {
    const { body } = req;

    const site = db.site.update({
      where: {
        id: {
          equals: 'nudash',
        },
      },
      data: body as Site,
    });

    return res(ctx.status(200), ctx.json({ data: site }));
  }),

  rest.get('/:site/pages', (req: RestRequest, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([{ id: 'hosel', name: 'Home', path: 'home' }]),
    );
  }),
];
