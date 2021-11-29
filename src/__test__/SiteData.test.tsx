import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from 'react-query';

import { SiteData } from '../components';
import { siteData } from '../mocks/data';

const server = setupServer(
  rest.post('/sites', (req, res, ctx) => {
    const { body } = req;

    const data = {
      ...siteData,
      ...(body as Record<string, string>),
    };

    return res(ctx.status(200), ctx.json(data));
  }),
);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

test('renders a site update form and update data', async () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <SiteData data={siteData} />
    </QueryClientProvider>,
  );

  const name = screen.getByLabelText(/name/i);
  userEvent.clear(name);
  userEvent.type(name, 'My Rocking site!');

  const url = screen.getByLabelText(/url/i);
  userEvent.clear(url);
  userEvent.type(url, 'https://example.me');

  const tagline = screen.getByLabelText(/tagline/i);
  userEvent.clear(tagline);
  userEvent.type(tagline, 'We will rock!');

  const description = screen.getByLabelText(/description/i);
  userEvent.clear(description);
  userEvent.type(description, 'We do...');

  const submitBtn = screen.getByText(/update/i);
  userEvent.click(submitBtn);

  // TODO: test image upload..
  await waitFor(() => {
    expect(name).toHaveValue('My Rocking site!');
    expect(url).toHaveValue('https://example.me');
    expect(tagline).toHaveValue('We will rock!');
    expect(description).toHaveValue('We do...');
  });
});
