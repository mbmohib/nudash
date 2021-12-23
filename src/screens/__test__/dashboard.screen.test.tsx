import { screen } from '@testing-library/react';

import { Dashboard } from '..';
import { renderWithRouter as render } from '../../utils/test';

test('show dashboard page data', async () => {
  render(<Dashboard />);

  expect(screen.getByText(/site analytics/i)).toBeInTheDocument();
});
