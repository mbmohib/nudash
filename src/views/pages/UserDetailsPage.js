import React from 'react';
import { Grid, TextField, Container } from '@material-ui/core';

import { Button, Wrapper } from 'views/ui';

const UserDetailsPage = () => {
  return (
    <Wrapper mt={8}>
      <Container>
        <Grid container justify="center">
          <Grid item xs={8}>
            <TextField id="standard-basic" fullWidth label="Feature Title" />
          </Grid>
          <Grid item xs={8}>
            <TextField
              id="standard-basic"
              fullWidth
              label="Feature Description"
              multiline
            />
          </Grid>
          <Grid item xs={8}>
            <Button variant="contained" color="primary" mt={4}>
              Add
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Wrapper>
  );
};

export default UserDetailsPage;
