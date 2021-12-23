import { screen, waitFor } from '@testing-library/react';

import { GalleryIcons } from '..';
import { iconsData } from '../../mocks/db';
import { server } from '../../mocks/server';
import { renderWithRouter as render } from '../../utils/test';

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});
afterAll(() => {
  server.close();
});
afterEach(() => {
  server.resetHandlers();
});

test('show icon page data', async () => {
  render(<GalleryIcons />);

  await waitFor(() => {
    expect(
      screen.getByRole('heading', { name: /page heading/i }),
    ).toHaveTextContent(/icons/i);
  });
});

test('show images from api', async () => {
  render(<GalleryIcons />);

  await waitFor(() => {
    iconsData.forEach(icon => {
      expect(screen.getByAltText(icon.alt));
    });
  });
});
