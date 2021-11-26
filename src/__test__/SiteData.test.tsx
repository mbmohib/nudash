import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';

import { SiteData } from '../components';
import { siteData } from '../mocks/data';

test('render site data form heading', () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <SiteData data={siteData} />
    </QueryClientProvider>,
  );
  const formHeading = screen.getByText(/site data/i);

  expect(formHeading).toBeInTheDocument();
});

test('render name input field & check user input', () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <SiteData data={siteData} />
    </QueryClientProvider>,
  );
  const name = screen.getByLabelText(/name/i);

  expect(name).toBeInTheDocument();

  user.clear(name);
  user.type(name, 'John Doe');
  expect(name).toHaveValue('John Doe');
});

test('render url input field & check user input', () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <SiteData data={siteData} />
    </QueryClientProvider>,
  );
  const url = screen.getByLabelText(/url/i);

  expect(url).toBeInTheDocument();

  user.clear(url);
  user.type(url, 'https://mohib.me');
  expect(url).toHaveValue('https://mohib.me');
});

test('render tagline input field & check user input', () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <SiteData data={siteData} />
    </QueryClientProvider>,
  );
  const tagline = screen.getByLabelText(/url/i);

  expect(tagline).toBeInTheDocument();

  user.clear(tagline);
  user.type(tagline, 'We will rock!');
  expect(tagline).toHaveValue('We will rock!');
});

test('render description textarea field & check user input', () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <SiteData data={siteData} />
    </QueryClientProvider>,
  );
  const description = screen.getByLabelText(/url/i);

  expect(description).toBeInTheDocument();

  user.clear(description);
  user.type(description, 'We do...');
  expect(description).toHaveValue('We do...');
});
