import React from 'react';
import { TextField } from '@material-ui/core';
import { spacing, typography } from '@material-ui/system';
import styled from 'styled-components';

const TextFieldExtended = styled(({ ...rest }) => <TextField {...rest} />)`
  ${spacing}
  ${typography}
`;

export default TextFieldExtended;
