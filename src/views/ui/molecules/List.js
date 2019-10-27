import React from 'react';
import styled from 'styled-components';
import { spacing } from '@material-ui/system';

import { Typography } from 'views/ui';

const ListWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 3px 0;

  svg {
    margin-right: 10px;
  }

  span {
    color: ${({ theme }) => theme.palette.primary.main};
  }

  ${spacing};
`;

const List = ({ list: { icon, primaryText, secondaryText } }) => (
  <ListWrapper>
    {icon && icon}
    <Typography variant="body1" align="center">
      {secondaryText} <span>{primaryText}</span>
    </Typography>
  </ListWrapper>
);

export default List;
