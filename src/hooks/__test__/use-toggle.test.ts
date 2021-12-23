import { act, renderHook } from '@testing-library/react-hooks';

import { useToggle } from '..';

test('test toggle a boolean state', () => {
  const { result } = renderHook(useToggle);
  let [value, setValue] = result.current;

  expect(value).toBeFalsy();

  act(() => {
    setValue();
  });

  [value, setValue] = result.current;
  expect(value).toBeTruthy();
});

test('test set a boolean state', () => {
  const { result } = renderHook(useToggle);
  let [value, setValue] = result.current;

  expect(value).toBeFalsy();

  act(() => {
    setValue(false);
  });

  [value, setValue] = result.current;
  expect(value).toBeFalsy();
});
