// src/mocks/browser.js
import { rest, setupWorker } from 'msw';

import handlers from './handlers';

// This configures a Service Worker with the given request handlers.
// eslint-disable-next-line import/prefer-default-export
export const worker = setupWorker(...handlers);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).msw = {
  worker,
  rest,
};
