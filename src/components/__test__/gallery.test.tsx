import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Gallery } from '..';
import { imagesData } from '../../mocks/db';
import { server } from '../../mocks/server';
import { render } from '../../utils/test';

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

  await waitFor(() => {
    const editButton = screen.getAllByTestId('edit')[0];
    userEvent.click(editButton);
  });

  screen.getByText(/image details/i);
});

test('Hide insert button if selectable not pass as props', () => {
  render(<Gallery />);

  expect(screen.queryByText(/insert/i)).toBeNull();
});

test('Insert selected image', async () => {
  const mockHandleImageInsert = jest.fn();
  const fakeImage = imagesData[0];
  render(<Gallery selectable handleImageInsert={mockHandleImageInsert} />);

  const insertButton = screen.getByRole('button', { name: /insert/i });

  await waitFor(() => {
    const image = screen.getByAltText(fakeImage.alt);
    userEvent.click(image);
  });

  userEvent.click(insertButton);

  expect(mockHandleImageInsert).toBeCalledTimes(1);
  expect(mockHandleImageInsert).toHaveBeenCalledWith({
    alt: fakeImage.alt,
    id: fakeImage.id,
    url: fakeImage.url,
  });
});
