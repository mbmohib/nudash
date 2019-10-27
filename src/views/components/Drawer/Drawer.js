import React from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import Dashboard from '@material-ui/icons/Dashboard';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import Warning from '@material-ui/icons/Warning';
import Receipt from '@material-ui/icons/Receipt';
import ViewCarousel from '@material-ui/icons/ViewCarousel';
import AttachMoney from '@material-ui/icons/AttachMoney';
import Ballot from '@material-ui/icons/Ballot';
import { Typography } from '@material-ui/core';

import { AppDrawer, DrawerToolbar, LinkItem } from './DrawerStyle';
import { Divider } from 'views/ui';
import { AdminIcon } from 'assets/icons';

const primaryMenu = [
  {
    label: 'Dashboard',
    link: '/dashboard',
    icon: <Dashboard />,
  },
  {
    label: 'Users',
    link: '/users',
    icon: <SupervisorAccount />,
  },
  {
    label: 'Jobs',
    link: '/jobs',
    icon: <Ballot />,
  },
  {
    label: 'Gigs',
    link: '/gigs',
    icon: <ViewCarousel />,
  },
  {
    label: 'Disputes',
    link: '/disputes',
    icon: <Warning />,
  },
  {
    label: 'Withdraws',
    link: '/withdraws',
    icon: <AttachMoney />,
  },
];

const secondaryMenu = [
  {
    label: 'Reports',
    link: '/reports',
    icon: <Receipt />,
  },
  {
    label: 'Restricted Messages',
    link: '/restricted-messages',
    icon: <Receipt />,
  },
];

const AdminDrawer = ({
  open,
  drawerOpenWidth,
  drawerCloseWidth,
  handleToggleChange,
}) => {
  return (
    <AppDrawer
      drawerOpenWidth={drawerOpenWidth}
      drawerCloseWidth={drawerCloseWidth}
      variant="permanent"
      open={open}
    >
      <DrawerToolbar>
        {open ? (
          <>
            <AdminIcon />
            <Typography color="secondary" variant="h6">
              Kajkey Admin
            </Typography>
            <IconButton onClick={handleToggleChange}>
              <ChevronLeftIcon color="secondary" />
            </IconButton>
          </>
        ) : (
          <IconButton
            color="secondary"
            aria-label="open drawer"
            onClick={handleToggleChange}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
        )}
      </DrawerToolbar>
      <Divider light />
      <List>
        {primaryMenu.map((menu, index) => (
          <Link to={menu.link} key={index}>
            <LinkItem button>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.label} />
            </LinkItem>
          </Link>
        ))}
      </List>
      <Divider color="grey" />
      <List>
        {secondaryMenu.map((menu, index) => (
          <Link to={menu.link} key={index}>
            <LinkItem button>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.label} />
            </LinkItem>
          </Link>
        ))}
      </List>
    </AppDrawer>
  );
};

export default AdminDrawer;
