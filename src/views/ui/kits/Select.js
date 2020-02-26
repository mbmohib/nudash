import React from 'react';
import Select from 'react-select';
import Wrapper from './Wrapper';
import styled from 'styled-components';

const SelectStyle = styled(Select)`
  width: 100%;
`;

const SelectExtended = ({
  label,
  register,
  options = [],
  onChange,
  isMulti,
  defaultValue,
  width = '100%',
  ...rest
}) => {
  return (
    <Wrapper {...rest} width={width}>
      <SelectStyle
        name={label}
        defaultValue={defaultValue}
        inputRef={register}
        onChange={onChange}
        options={options}
        isMulti={isMulti}
      />
    </Wrapper>
  );
};

export default SelectExtended;
