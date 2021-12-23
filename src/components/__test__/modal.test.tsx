import { render, screen } from '@testing-library/react';

import { Modal } from '..';

test('modal shows the children', () => {
  render(
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    <Modal isOpen={true} onClose={() => {}}>
      <div data-testid="test-modal" />
    </Modal>,
  );

  expect(screen.getByTestId('test-modal')).toBeInTheDocument();
});

test('modal not showing the children', () => {
  render(
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    <Modal isOpen={false} onClose={() => {}}>
      <div data-testid="test-modal" />
    </Modal>,
  );

  expect(screen.queryByTestId('test-modal')).toBeNull();
});
