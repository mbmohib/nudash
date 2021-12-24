import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ImageDetails } from '..';
import { imageData } from '../../mocks/db';
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

test('show passed image', async () => {
  render(<ImageDetails isOpen={true} onClose={jest.fn()} image={imageData} />);

  const name = screen.getByLabelText(/name/i);

  expect(screen.getByAltText(imageData.alt)).toBeInTheDocument();
  expect(name).toHaveDisplayValue(imageData.alt);
});

test('update image alt value', async () => {
  const fakeAlt = 'mock alt text';
  render(<ImageDetails isOpen={true} onClose={jest.fn()} image={imageData} />);

  const name = screen.getByLabelText(/name/i);
  const updateBtn = screen.getByRole('button', { name: /update/i });

  userEvent.type(name, fakeAlt);
  userEvent.click(updateBtn);

  await waitFor(() => {
    expect(name).toHaveDisplayValue(fakeAlt);
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Image updated successfully',
    );
  });
});

test('delete image successfully', async () => {
  render(<ImageDetails isOpen={true} onClose={jest.fn()} image={imageData} />);

  const deleteBtn = screen.getByRole('button', { name: /delete/i });

  userEvent.click(deleteBtn);
  await waitFor(() => {
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Image deleted successfully',
    );
  });
});
