import React from 'react';
import { IconButton } from '@material-ui/core';
import { FilterList } from '@material-ui/icons';

import { Wrapper, Typography } from 'views/ui';

const PageHeader = ({ title, handleToggleChange }) => {
  return (
    <Wrapper display="flex" alignItems="center" mb={3}>
      <Typography variant="h6">{title}</Typography>
      <IconButton onClick={handleToggleChange}>
        <FilterList />
      </IconButton>
    </Wrapper>
  );
};

export default PageHeader;
