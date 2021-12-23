import { screen, waitFor } from '@testing-library/react';

import { Menus } from '..';
import { siteData } from '../../mocks/db';
import { server } from '../../mocks/server';
import { SiteMenu } from '../../types';
import { renderWithRouter as render } from '../../utils/test';

const menus = siteData?.menus as SiteMenu[];

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});
afterAll(() => {
  server.close();
});
afterEach(() => {
  server.resetHandlers();
});

test('show site data in site info update form', async () => {
  render(<Menus />);

  await waitFor(() => {
    expect(screen.getByText(/primary menu/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/label/i)).toHaveValue(menus[0].label);
    expect(screen.getByLabelText(/url/i)).toHaveValue(menus[0].url);
    expect(screen.getByLabelText(/open in new tab/i)).toBeTruthy();
  });
});
