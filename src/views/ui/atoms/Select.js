import React, { useRef, useState } from 'react';
import { FormControl, MenuItem, Select, InputLabel } from '@material-ui/core';
import styled from 'styled-components';

const Label = styled(InputLabel)`
  text-transform: capitalize;
`;

const SelectExtended = ({
  label,
  register,
  options = [],
  handleSelectMenuChange,
}) => {
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  const [value, setValue] = useState('');

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = event => {
    const value = event.target.value;
    setValue(value);
    handleSelectMenuChange(label, value);
  };

  return (
    <FormControl variant="outlined" fullWidth margin="dense">
      <Label ref={inputLabel} htmlFor={label}>
        {label}
      </Label>

      <Select
        labelWidth={labelWidth}
        autoWidth
        name={label}
        value={value}
        inputRef={register}
        onChange={handleChange}
      >
        {options.map(option => (
          <MenuItem value={option.value} key={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectExtended;
