import { useCallback, useState } from 'react';

export default function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback((val?: unknown): void => {
    if (typeof val === 'boolean') {
      setValue(val);
    } else {
      setValue(state => !state);
    }
  }, []);

  return [value, toggle] as const;
}
