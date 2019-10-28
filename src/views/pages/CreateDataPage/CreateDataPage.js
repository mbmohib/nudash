import React from 'react';
import { Grid } from '@material-ui/core';

import CreateCategory from 'views/components/CreateCategory';
import CreateTips from 'views/components/CreateTips';

const CreateDataPage = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <CreateTips />
        </Grid>
        <Grid item xs={6}>
          <CreateCategory />
        </Grid>
      </Grid>
    </>
  );
};

export default CreateDataPage;
