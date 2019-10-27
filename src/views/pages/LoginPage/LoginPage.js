import React from 'react';
import Paper from '@material-ui/core/Paper';

import Login from 'views/components/Login';
import { Wrapper } from 'views/ui';
import kajkeyLogo from 'assets/images/kajkey-logo.png';

const LoginPage = () => {
  return (
    <Wrapper width={{ sm: '60%', md: '40%' }} mx="auto">
      <Paper>
        <Wrapper p={8}>
          <img src={kajkeyLogo} alt="Kajkey Logo" />
          <Login />
        </Wrapper>
      </Paper>
    </Wrapper>
  );
};

export default LoginPage;
