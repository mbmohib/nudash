import { useState } from 'react';

export default function useToggle(initValue) {
  const [open, setToggle] = useState(initValue);

  const handleToggleChange = () => {
    setToggle(!open);
  };

  return [open, handleToggleChange];
}
