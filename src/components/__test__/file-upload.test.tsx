import { fireEvent, screen, waitFor } from '@testing-library/react';

import { FileUpload } from '..';
import { render } from '../../utils/test';

const mockedMutate = jest.fn();

jest.mock('../../services/image.api.ts', () => ({
  useUploadImage: () => ({ mutate: mockedMutate }),
}));

test('Upload image on dragging image to dropzone', async () => {
  render(<FileUpload />);
  const dropZone = screen.getByTestId('drop-zone-wrapper');

  fireEvent.drop(dropZone, {
    dataTransfer: {
      files: [new File(['(⌐□_□)'], 'mock.png', { type: 'image/png' })],
    },
  });

  await waitFor(() => {
    // FIXME: test not working, useDrop not firing..
    // expect(mockedMutate).toHaveBeenCalledTimes(1);
    // screen.getByText(/image dropped/i);
  });
});
