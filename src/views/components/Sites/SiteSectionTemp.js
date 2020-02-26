import React from 'react';
import { IconButton, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { Paper, Typography, Wrapper } from 'views/ui';
import Table from 'views/components/Table';

const features = [
  {
    title: 'Coffee shops & Light Retails',
    description:
      'With our off-the-shelf Point Of Sale system, small stores run very fast and efficiently. They can start with our free and open source Point of Sale system, then add PRO features as they grow.',
  },
  {
    title: 'Chain Stores & Restaurants',
    description:
      'Our PRO line of product can operate millions of products and can connect multiple branches in different geographical locations. Chain stores, we offer dedicated support with a customized solution',
  },
  {
    title: 'Pizzeria and Home delivery',
    description:
      'With our Pizza designer, order entry is faster and easier. Delivery scheduler organizes volume of phone and online orders. Our system is integrated with distance calculator using Google map. API.',
  },
];

const SiteSection = () => {
  return (
    <Paper p={4}>
      <Grid container>
        <Grid item xs={10}>
          <Typography variant="h3" mb={3}>
            Who We Are?
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Wrapper display="flex" justifyContent="flex-end">
            <IconButton aria-label="delete">
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Wrapper>
        </Grid>
      </Grid>
      <Wrapper>
        <Table
          title={`Features:`}
          columns={[
            {
              title: 'Title',
              field: 'title',
            },
            {
              title: 'Description',
              field: 'description',
            },
          ]}
          data={features}
        />
      </Wrapper>
    </Paper>
  );
};

export default SiteSection;
