import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MatchMediaMock from 'jest-matchmedia-mock';

import { Page } from '..';
import { pageData } from '../../mocks/db';
import { server } from '../../mocks/server';
import { renderWithRouter as render } from '../../utils/test';

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

test('show page builder data', async () => {
  render(<Page />);

  await waitFor(() => {
    expect(
      screen.getByRole('heading', { name: /page heading/i }),
    ).toHaveTextContent(pageData.name);
  });
});

test('add/delete section on clicking add/delete button', async () => {
  render(<Page />);

  userEvent.click(screen.getByText(/add section/i));

  expect(screen.getAllByLabelText(/page section/i)).toHaveLength(2);

  userEvent.click(screen.getAllByText(/delete section/i)[0]);
  expect(screen.getAllByLabelText(/page section/i)).toHaveLength(1);
});

test('disabled delete section if only one section exist', async () => {
  render(<Page />);

  expect(screen.getAllByLabelText(/page section/i)).toHaveLength(1);
  expect(screen.getByText(/delete section/i)).toBeDisabled();
});

test('save page builder data on save', async () => {
  render(<Page />);

  userEvent.click(screen.getByText(/save/i));

  await waitFor(() => {
    expect(screen.getByRole('alert')).toHaveTextContent(/successful/i);
  });
});
