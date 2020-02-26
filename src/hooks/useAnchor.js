import { useState } from 'react';

export default function useAnchor(initValue = null) {
  const [anchorEl, setAnchorEl] = useState(initValue);

  const handleToggleChange = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return [anchorEl, handleToggleChange];
}
