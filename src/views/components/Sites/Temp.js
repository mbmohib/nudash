import React from 'react';
import { Paper, Typography, Wrapper } from 'views/ui';
import Table from 'views/components/Table';
import { IconButton, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const features = [
  {
    title: 'Specialized POS company',
    description:
      'Contrary to popular belief, Lorem Ipsum is not simply random te',
  },
  {
    title: 'Long Experience',
    description:
      'Contrary to popular belief, Lorem Ipsum is not simply random te',
  },
  {
    title: 'Team Work',
    description:
      'Contrary to popular belief, Lorem Ipsum is not simply random te',
  },
  {
    title: 'Create Value',
    description:
      'Contrary to popular belief, Lorem Ipsum is not simply random te',
  },
];

const SiteSection = () => {
  return (
    <Paper p={4}>
      <Grid container>
        <Grid item xs={10}>
          <Typography variant="h3" mb={3}>
            Why choose OROCUBE LLC
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
