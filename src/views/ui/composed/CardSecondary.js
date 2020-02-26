import React from 'react';
import { Wrapper, Typography } from '../';

const CardSecondary = ({ content: { image, title, desc } = {} }) => {
  return (
    <Wrapper borderRadius={10} bgColor="light" card>
      <Wrapper bgImage={image} height="180px" width="100%"></Wrapper>
      <Wrapper p={2} pb={4}>
        <Typography variant="h3" my={2} align="center">
          {title}
        </Typography>
        <Typography variant="body1" align="center">
          {desc}
        </Typography>
      </Wrapper>
    </Wrapper>
  );
};

export default CardSecondary;
