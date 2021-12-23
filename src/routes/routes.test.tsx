import { screen, waitFor } from '@testing-library/react';
import MatchMediaMock from 'jest-matchmedia-mock';
import mockConsole from 'jest-mock-console';

import Routes from '.';
import { server } from '../mocks/server';
import { renderWithRouter as render, userEvent } from '../utils/test';

let restoreConsole: { (): void; (): void };
let matchMedia: MatchMediaMock;

beforeAll(() => {
  restoreConsole = mockConsole();
  server.listen({ onUnhandledRequest: 'error' });
  matchMedia = new MatchMediaMock();
});

afterEach(() => {
  server.resetHandlers();
  matchMedia.clear();
});
afterAll(() => {
  server.close();
  restoreConsole();
});

test('render dashboard analytics page', () => {
  render(<Routes />);
  const { getByRole } = screen;

  const heading = getByRole('heading', { name: /page heading/i });
  expect(heading).toHaveTextContent(/site analytics/i);
});

test('render site page on clicking site menu', async () => {
  render(<Routes />);

  userEvent.click(screen.getByTestId('site-link'));

  await waitFor(() => {
    expect(
      screen.getByRole('heading', { name: /page heading/i }),
    ).toHaveTextContent(/meta data/i);
  });
});

test('render page builder on clicking page menu', async () => {
  render(<Routes />);

  userEvent.click(screen.getByTestId('page-link'));

  await waitFor(() => {
    expect(
      screen.getByRole('heading', { name: /page heading/i }),
    ).toHaveTextContent(/home/i);
  });
});

test('render images page on clicking gallery menu', async () => {
  render(<Routes />);

  userEvent.click(screen.getByTestId('gallery-link'));

  await waitFor(() => {
    expect(
      screen.getByRole('heading', { name: /page heading/i }),
    ).toHaveTextContent(/images/i);
  });
});

test('render 404 page', () => {
  render(<Routes />, { route: 'no-match-page' });

  const heading = screen.getByRole(/heading/i);
  expect(heading).toHaveTextContent(/404/i);
});
