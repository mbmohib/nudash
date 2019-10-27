import React from 'react';
import { Collapse } from '@material-ui/core';

import { useToggle } from 'hooks';
import Filters from 'views/components/Filters';
import Users from 'views/components/Users';
import { Divider, Wrapper, PageHeader, Paper } from 'views/ui';

export default function UsersPage() {
  const [open, handleToggleChange] = useToggle(true);

  return (
    <Wrapper>
      <PageHeader title="Users List" handleToggleChange={handleToggleChange} />
      <Collapse in={open}>
        <Filters />
      </Collapse>
      <Divider my={3} />
      <Paper elevation={2}>
        <Wrapper p={3}>
          <Users />
        </Wrapper>
      </Paper>
    </Wrapper>
  );
}
