import { screen, waitFor } from '@testing-library/react';

import { siteData } from '../mocks/db';
import { server } from '../mocks/server';
import { MetaData } from '../screens';
import { renderWithRouter as render } from '../utils/test';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: unknown) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});
afterAll(() => {
  server.close();
});
afterEach(() => server.resetHandlers());

test('show site data in site info update form', async () => {
  render(<MetaData />);

  await waitFor(() => {
    expect(screen.getByLabelText(/name/i)).toHaveValue(siteData.name);
    expect(screen.getByLabelText(/url/i)).toHaveValue(siteData.url);
    expect(screen.getByLabelText(/tagline/i)).toHaveValue(siteData.tagline);
    expect(screen.getByLabelText(/description/i)).toHaveValue(
      siteData.description,
    );
  });
});
