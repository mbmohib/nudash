import React from 'react';
import { Container, Grid } from '@material-ui/core';

import FooterWrapper from './FooterStyle';
import { Menus, Typography } from 'views/ui';

const Footer = () => (
  <FooterWrapper>
    <Container>
      <Grid container alignItems="center">
        <Grid item sm>
          <Menus
            items={[
              { label: 'Home', link: '/home' },
              { label: 'About', link: '/about' },
              { label: 'Support', link: '/support' },
            ]}
            py={2}
          />
        </Grid>
        <Grid item sm={2}>
          <Typography variant="subtitle1">© 2019 - Kajkey.com</Typography>
        </Grid>
      </Grid>
    </Container>
  </FooterWrapper>
);

export default Footer;
