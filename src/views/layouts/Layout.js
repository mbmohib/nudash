import React from 'react';
import { useSelector } from 'react-redux';

import { useToggle } from 'hooks';
import Header from 'views/components/Header';
import Footer from 'views/components/Footer';
import Drawer from 'views/components/Drawer';
import {
  PageWrapper,
  Main,
  Content,
  drawerOpenWidth,
  drawerCloseWidth,
} from './LayoutStyle';

const Layout = ({ children }) => {
  const auth = useSelector(({ auth }) => auth.jwt);
  const [open, handleToggleChange] = useToggle(true);

  return (
    <PageWrapper>
      {auth && (
        <Drawer
          handleToggleChange={handleToggleChange}
          drawerOpenWidth={drawerOpenWidth}
          drawerCloseWidth={drawerCloseWidth}
          open={open}
        />
      )}
      <Main>
        <Header
          auth={auth}
          open={open}
          drawerOpenWidth={drawerOpenWidth}
          drawerCloseWidth={drawerCloseWidth}
        />
        <Content>{children}</Content>
        <Footer />
      </Main>
    </PageWrapper>
  );
};

export default Layout;
