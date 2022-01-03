import { screen, waitFor } from '@testing-library/react';
import MatchMediaMock from 'jest-matchmedia-mock';
import mockConsole from 'jest-mock-console';

import Routes from '.';
import { authData } from '../mocks/db';
import { pageData } from '../mocks/db/page.db';
import { server } from '../mocks/server';
import { removeAuth, setAuth } from '../store/slices/auth.slice';
import { store } from '../store/store';
import { renderWithRouter as render, userEvent } from '../utils/test';

let restoreConsole: { (): void; (): void };
let matchMedia: MatchMediaMock;

beforeEach(() => {
  //
});

beforeAll(() => {
  // restoreConsole = mockConsole();
  server.listen({ onUnhandledRequest: 'error' });
  matchMedia = new MatchMediaMock();
});

afterEach(() => {
  server.resetHandlers();
  matchMedia.clear();
  store.dispatch(removeAuth());
});

afterAll(() => {
  server.close();
  // restoreConsole();
});

test('render dashboard analytics page', async () => {
  store.dispatch(setAuth(authData));
  render(<Routes />, { route: '/dashboard/analytics' });

  await waitFor(() => {
    expect(
      screen.getByRole('heading', { name: /page heading/i }),
    ).toHaveTextContent(/site analytics/i);
  });
});

test('redirect to login page if not authenticated', () => {
  render(<Routes />, { route: '/dashboard/analytics' });

  expect(screen.getByRole('heading')).toHaveTextContent(/here you can login/i);
});

test('render site page on clicking site menu', async () => {
  store.dispatch(setAuth(authData));
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
    ).toHaveTextContent(pageData.name);
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
  render(<Routes />, { route: '/no-match-page' });

  const heading = screen.getByRole(/heading/i);
  expect(heading).toHaveTextContent(/404/i);
});
