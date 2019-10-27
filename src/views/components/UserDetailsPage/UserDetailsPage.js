import React from 'react';
import { Grid } from '@material-ui/core';

import InfoCards from 'views/components/InfoCards';
import Transactions from 'views/components/Transactions';
import { UserCard, Paper, BalanceCard } from 'views/ui';

const UserDetailsPage = () => {
  return (
    <Grid container spacing={3}>
      <Grid item sm={4} md={4} lg={3}>
        <Paper p={1}>
          <UserCard />
        </Paper>
        <Paper p={1} mt={2}>
          <BalanceCard />
        </Paper>
      </Grid>
      <Grid item sm={8} md={8} lg={9}>
        <InfoCards />
        {/* <Transactions /> */}
      </Grid>
    </Grid>
  );
};

export default UserDetailsPage;
