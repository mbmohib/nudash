import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockConsole from 'jest-mock-console';
import { rest } from 'msw';

import { SiteData } from '..';
import { siteFailed, updateSite } from '../../mocks/api/sites.mock';
import { siteBuilder } from '../../mocks/db';
import { server } from '../../mocks/server';
import { Site } from '../../types';
import { render } from '../../utils/test';

let restoreConsole: { (): void; (): void };

beforeAll(() => {
  restoreConsole = mockConsole();
  server.listen({ onUnhandledRequest: 'error' });
});
afterAll(() => {
  server.close();
  restoreConsole();
});
afterEach(() => server.resetHandlers());
const fakeSiteData = siteBuilder() as Site;

function renderSiteData() {
  render(<SiteData data={fakeSiteData} />);

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

  const submitBtn = screen.getByText(/update/i, { selector: 'button' });

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
