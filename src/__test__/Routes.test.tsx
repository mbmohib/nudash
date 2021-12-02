import userEvent from '@testing-library/user-event';
import mockConsole from 'jest-mock-console';

import Routes from '../routes';
import { render } from '../utils/test';

let restoreConsole: { (): void; (): void };

beforeAll(() => {
  restoreConsole = mockConsole();
});
afterAll(() => {
  restoreConsole();
});

test('render dashboard page', () => {
  const { getByRole, getByText } = render(<Routes />);

  const siteLink = getByRole(/site/i);
  userEvent.click(siteLink);

  const heading = getByText(/site/i, { selector: 'h2' });
  expect(heading).toHaveTextContent(/site/i);
});

test('render 404 page', () => {
  const { getByRole } = render(<Routes />, { route: 'no-match-page' });

  const heading = getByRole(/heading/i);
  expect(heading).toHaveTextContent(/404/i);
});
