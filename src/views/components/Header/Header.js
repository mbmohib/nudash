import React from "react";
import { Toolbar, IconButton } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import AppHeader from "./HeaderStyle";
import { Avatar, Typography, Wrapper } from "views/ui";
import { LogoutIcon } from "views/ui/icons";
import { authActions } from "store/auth";

const Header = ({ open, drawerOpenWidth, drawerCloseWidth }) => {
  const { user, jwt } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <AppHeader
      open={open}
      drawerOpenWidth={jwt ? drawerOpenWidth : 0}
      drawerCloseWidth={jwt ? drawerCloseWidth : 0}
    >
      <Toolbar>
        {jwt && (
          <Wrapper
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            width="100%"
          >
            <Avatar
              src={null}
              name={user ? user.fullName : "Anonymous"}
              size="30"
            />
            <Typography ml={1}>{user && user.fullName}</Typography>
            <IconButton onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Wrapper>
        )}
      </Toolbar>
    </AppHeader>
  );
};

export default Header;
