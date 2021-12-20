import { renderHook } from '@testing-library/react-hooks';

import { useDebounce } from '../hooks';

test('get correct debounced value', () => {
  const fakeValue = 'Lets debounced!';
  const { result } = renderHook(() => useDebounce(fakeValue, 500));

  expect(result.current).toBe(fakeValue);
});
