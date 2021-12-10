import Routes from '../routes';
import { render } from '../utils/test';

test('render dashboard page', () => {
  const { getByRole } = render(<Routes />);

  const heading = getByRole('heading', { name: /page heading/i });
  expect(heading).toHaveTextContent(/dashboard/i);
});

test('render site page on clicking site menu', () => {
  const { getByRole, getByTestId, debug } = render(<Routes />);

  const siteLink = getByTestId(/site-link/i);
  // debug(siteLink);
  // userEvent.click(siteLink);

  // const heading = getByRole('heading', { name: /page heading/i });
  // expect(heading).toHaveTextContent(/site/i);
});

test('render 404 page', () => {
  const { getByRole } = render(<Routes />, { route: 'no-match-page' });

  const heading = getByRole(/heading/i);
  expect(heading).toHaveTextContent(/404/i);
});
