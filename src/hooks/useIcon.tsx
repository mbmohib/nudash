import { useCallback, useState } from 'react';

function chakraThemeToCSSVariable(prefix = '', theme = '') {
  const themeCode = '--chakra';
  const token = theme.split('.').join('-');
  return `var(${themeCode}-${prefix}-${token})`;
}

export default function useIcon(initialValue = false) {
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
