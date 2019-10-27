import React from 'react';
import { Grid } from '@material-ui/core';

import { Paper, InfoCard } from 'views/ui';
import { JobIcon, GigIcon, FreelancerIcon } from 'assets/icons';

const InfoCards = () => {
  return (
    <Grid container spacing={2}>
      {[
        { label: 'Job Posted', amount: 20, icon: <JobIcon /> },
        { label: 'Gig Purchased', amount: 8, icon: <GigIcon /> },
        { label: 'Freelancer Hired', amount: 5, icon: <FreelancerIcon /> },
      ].map(card => (
        <Grid item sm={4} md={3}>
          <Paper>
            <InfoCard card={card} />
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default InfoCards;
