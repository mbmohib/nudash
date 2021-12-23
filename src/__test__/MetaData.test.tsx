import { screen, waitFor } from '@testing-library/react';
import MatchMediaMock from 'jest-matchmedia-mock';

import { siteData } from '../mocks/db';
import { server } from '../mocks/server';
import { MetaData } from '../screens';
import { renderWithRouter as render } from '../utils/test';

let matchMedia: MatchMediaMock;

beforeAll(() => {
  matchMedia = new MatchMediaMock();
  server.listen({ onUnhandledRequest: 'error' });
});
afterAll(() => {
  server.close();
});
afterEach(() => {
  server.resetHandlers();
  matchMedia.clear();
});

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
