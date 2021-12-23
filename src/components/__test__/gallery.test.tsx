import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Gallery } from '..';
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

test('show images from api', async () => {
  render(<Gallery />);

  await waitFor(() => {
    imagesData.forEach(image => {
      expect(screen.getByAltText(image.alt));
    });
  });
});

test('open image options modal on clicking edit button', async () => {
  render(<Gallery />);

  userEvent.click(screen.getAllByTestId('edit')[0]);

  await waitFor(() => {
    screen.findByText(/image details/i);
  });
});
