import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { spacing, typography } from '@material-ui/system';

const TypographyExtended = styled(({ ...rest }) => <Typography {...rest} />)`
  text-transform: ${({ transform }) => (transform ? transform : 'inherit')};

  span {
    color: ${props => props.theme.palette.primary.main};
  }

  ${spacing}
  ${typography}
`;

export default TypographyExtended;
