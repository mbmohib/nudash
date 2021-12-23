/* eslint-disable @typescript-eslint/no-empty-function */
import { screen, waitFor } from '@testing-library/react';

import { CreatePage } from '../components';
import { render, userEvent } from '../utils/test';

const fakePage = {
  name: 'about us',
  slug: 'about-us',
};

const mockedMutate = jest.fn();

jest.mock('../hooks/usePageApi.ts', () => ({
  useAddPage: () => ({ mutate: mockedMutate }),
}));

test('can create page', async () => {
  render(<CreatePage isOpen={true} onClose={jest.fn()} />);
  const name = screen.getByLabelText(/name/i);
  const slug = screen.getByLabelText(/slug/i);

  userEvent.type(name, fakePage.name);
  userEvent.type(slug, fakePage.slug);

  userEvent.click(screen.getByRole('button', { name: /create/i }));

  await waitFor(() => {
    expect(mockedMutate).toHaveBeenCalledTimes(1);
  });
});
