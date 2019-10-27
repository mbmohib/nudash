import React from 'react';
import { Toolbar, IconButton } from '@material-ui/core';

import AppHeader from './HeaderStyle';
import { Avatar, Typography, Wrapper } from 'views/ui';
import { LogoutIcon } from 'assets/icons';

const Header = ({ open, drawerOpenWidth, drawerCloseWidth }) => {
  return (
    <AppHeader
      open={open}
      drawerOpenWidth={drawerOpenWidth}
      drawerCloseWidth={drawerCloseWidth}
    >
      <Toolbar>
        <Wrapper flex justify="flex-end" align="center" width="100%">
          <Avatar src={null} name="Mohammad Mohibbullah" size="30" />
          <Typography ml={1}>Mohammad Mohibbullah</Typography>
          <IconButton>
            <LogoutIcon />
          </IconButton>
        </Wrapper>
      </Toolbar>
    </AppHeader>
  );
};

export default Header;
