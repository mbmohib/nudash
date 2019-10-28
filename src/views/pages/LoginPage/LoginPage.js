import React from 'react';
import Paper from '@material-ui/core/Paper';

import Login from 'views/components/Login';
import { Wrapper, Typography } from 'views/ui';

const LoginPage = () => (
  <Wrapper width={{ sm: '60%', md: '40%', lg: '30%' }} mx="auto" mt="20vh">
    <Paper>
      <Wrapper p={8}>
        <Typography variant="h2" align="center" mb={4}>
          NuDash
        </Typography>
        <Login />
      </Wrapper>
    </Paper>
  </Wrapper>
);

export default LoginPage;
