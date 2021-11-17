import { useState } from 'react';

export default function useToggle(initialValue = false) {
  const [value, handleValue] = useState(initialValue);

  const toggleValue = () => handleValue(!value);
  const setValue = (val: boolean) => handleValue(val);

  return [value, toggleValue, setValue] as const;
}
