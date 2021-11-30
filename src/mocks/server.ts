// src/mocks/server.js
import { setupServer } from 'msw/node';

import handlers from './handlers';

// This configures a request mocking server with the given request handlers.
// eslint-disable-next-line import/prefer-default-export
export const server = setupServer(...handlers);
