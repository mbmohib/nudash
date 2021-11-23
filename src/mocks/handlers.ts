// src/mocks/handlers.js
import { rest } from 'msw';

import { sections } from './data';

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
    return res(
      ctx.status(200),
      ctx.json({
        name: 'Nudash',
        logo: '',
        url: 'https://mohib.me',
        menus: [
          {
            label: 'Home',
            url: '/',
          },
        ],
        pages: [
          {
            id: '001',
            name: 'Home',
            path: 'home',
          },
        ],
      }),
    );
  }),

  rest.get('/pages/:pageId', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(sections));
  }),
];
