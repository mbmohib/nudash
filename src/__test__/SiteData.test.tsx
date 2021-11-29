import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { QueryClient, QueryClientProvider } from 'react-query';

import { SiteData } from '../components';
import { siteData } from '../mocks/data';
import { db } from '../mocks/db/site';
import server from '../mocks/server';
import { Site } from '../types';

server.use(
  rest.post('/sites', (req, res, ctx) => {
    const { body } = req;
    const site = db.site.update({
      where: {
        id: {
          equals: 'nudash',
        },
      },
      data: body as Site,
    });

    return res(ctx.json({ data: site }));
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
