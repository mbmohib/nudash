import { screen, waitFor } from '@testing-library/react';

import { GalleryImages } from '..';
import { imagesData } from '../../mocks/db';
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

test('show image page data', async () => {
  render(<GalleryImages />);

  await waitFor(() => {
    expect(
      screen.getByRole('heading', { name: /page heading/i }),
    ).toHaveTextContent(/images/i);
  });
});

test('show images from api', async () => {
  render(<GalleryImages />);

  await waitFor(() => {
    imagesData.forEach(image => {
      expect(screen.getByAltText(image.alt));
    });
  });
});
