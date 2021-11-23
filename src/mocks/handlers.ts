// src/mocks/handlers.js
import { RestRequest, rest } from 'msw';

import { pageData, siteData } from './data';

// eslint-disable-next-line import/prefer-default-export
export const handlers = [
  rest.post('/login', (req, res, ctx) => {
    // Persist user's authentication in the session
    sessionStorage.setItem('is-authenticated', 'true');

    return res(
      // Respond with a 200 status code
      ctx.status(200),
    );
  }),

  rest.get('/user', (req, res, ctx) => {
    // Check if the user is authenticated in this session
    const isAuthenticated = sessionStorage.getItem('is-authenticated');

    if (!isAuthenticated) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authorized',
        }),
      );
    }

    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        username: 'admin',
      }),
    );
  }),

  rest.get('/site', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(siteData));
  }),

  rest.get('/pages/:pageId', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(pageData));
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
];
