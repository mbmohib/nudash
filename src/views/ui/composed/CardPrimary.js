import React from 'react';
import { Image, Wrapper, Typography, Button } from '../';

const CardPrimary = ({ content = {} }) => {
  return (
    <Wrapper
      display="flex"
      alignItems="center"
      flexDirection="column"
      py={4}
      px={{ xs: 4, md: 8 }}
      bgcolor="#ffffff"
      borderRadius={10}
      card
    >
      <Image src={content.image} />
      <Typography variant="h3" my={2} align="center">
        {content.title}
      </Typography>
      <Typography variant="body1" align="center">
        {content.description}
      </Typography>
      <Button
        href={content.link}
        target="_blank"
        rel="noopener noreferrer"
        variant="outlined"
        mt={2}
        color="primary"
        size="small"
      >
        Learn More
      </Button>
    </Wrapper>
  );
};

export default CardPrimary;
