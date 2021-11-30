import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { QueryClient, QueryClientProvider } from 'react-query';

import { SiteData } from '../components';
import { siteFailed, updateSite } from '../mocks/api/sites';
import { siteBuilder, siteData } from '../mocks/db/site';
import { server } from '../mocks/server';
import { Site } from '../types';

const consoleErrorSpy = jest.spyOn(console, 'error');

beforeAll(() => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  consoleErrorSpy.mockImplementation(() => {});
  server.listen({ onUnhandledRequest: 'error' });
});
afterAll(() => {
  server.close();
  consoleErrorSpy.mockRestore();
});
afterEach(() => server.resetHandlers());
const fakeSiteData = siteBuilder() as Site;

function renderSiteData() {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <SiteData data={siteData} />
    </QueryClientProvider>,
  );

  const name = screen.getByLabelText(/name/i);
  userEvent.clear(name);
  userEvent.type(name, fakeSiteData.name as string);

  const url = screen.getByLabelText(/url/i);
  userEvent.clear(url);
  userEvent.type(url, fakeSiteData.url as string);

  const tagline = screen.getByLabelText(/tagline/i);
  userEvent.clear(tagline);
  userEvent.type(tagline, fakeSiteData.tagline as string);

  const description = screen.getByLabelText(/description/i);
  userEvent.clear(description);
  userEvent.type(description, fakeSiteData.description as string);

  const submitBtn = screen.getByText(/update/i);

  return {
    name,
    url,
    tagline,
    description,
    submitBtn,
  };
}

test('renders a site update form and update data', async () => {
  server.use(rest.post('/sites', updateSite));
  const { submitBtn, name, url, tagline, description } = renderSiteData();

  userEvent.click(submitBtn);

  // TODO: test image upload..
  await waitFor(() => {
    expect(name).toHaveValue(fakeSiteData.name);
    expect(url).toHaveValue(fakeSiteData.url);
    expect(tagline).toHaveValue(fakeSiteData.tagline);
    expect(description).toHaveValue(fakeSiteData.description);
  });
});

test('handle error on site update form', async () => {
  server.use(rest.post('/sites', siteFailed));

  const { submitBtn } = renderSiteData();
  userEvent.click(submitBtn);

  const updateError = await screen.findByRole('alert');
  expect(updateError).toBeInTheDocument();
});
