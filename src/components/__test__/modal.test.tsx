import { render, screen } from '@testing-library/react';

import { Modal } from '..';

test('modal shows the children', () => {
  render(
    <Modal isOpen={true} onClose={jest.fn()}>
      <div data-testid="test-modal" />
    </Modal>,
  );

  expect(screen.getByTestId('test-modal')).toBeInTheDocument();
});

test('modal not showing the children', () => {
  render(
    <Modal isOpen={false} onClose={jest.fn()}>
      <div data-testid="test-modal" />
    </Modal>,
  );

  expect(screen.queryByTestId('test-modal')).toBeNull();
});
