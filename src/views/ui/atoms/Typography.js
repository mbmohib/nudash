import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { spacing } from '@material-ui/system';

const TypographyExtended = styled(({ ...rest }) => <Typography {...rest} />)`
  ${spacing}
`;

export default TypographyExtended;
