import React, { Fragment } from 'react';
import styled from 'styled-components';

import { Avatar, Ratings, Typography, Wrapper, List, Button } from 'views/ui';
import { formatDate } from 'utils';
import media from 'styles/mediaQuery';
import {
  MobileIcon,
  LocationIcon,
  EmailIcon,
  CalenderIcon,
} from 'assets/icons';

const UserCardContent = styled.div`
  margin-top: ${({ theme }) => theme.space[1] + 'px'};
  padding-bottom: ${({ theme }) => theme.space[2] + 'px'};

  ${media.md`
    padding-left: ${({ theme }) => theme.space[2] + 'px'};
  `}
`;

const UserCard = ({ user, handleCloseDialog }) => (
  <Wrapper pt={3}>
    {true ? (
      <Fragment>
        <Wrapper flex justify="center">
          <Wrapper flex align="center" direction="column">
            <Avatar src={null} name="Mohammad Mohibbullah" size="100" />
            <Typography variant="body1" mt={2}>
              Mohammad Mohibbullah
            </Typography>
            <Ratings rating={3.5} />
          </Wrapper>
        </Wrapper>
        <UserCardContent>
          {[
            {
              icon: <EmailIcon />,
              primaryText: 'mbmohib@gmail.com',
              secondaryText: 'Email',
            },
            {
              icon: <MobileIcon />,
              primaryText: '01711981813',
              secondaryText: 'Mobile No',
            },
            {
              icon: <LocationIcon />,
              primaryText: 'Dhaka',
              secondaryText: 'Lives in',
            },
            {
              icon: <CalenderIcon />,
              primaryText: '22/3/2018',
              secondaryText: 'Joined',
            },
          ].map((list, index) => (
            <List key={index} list={list} />
          ))}
        </UserCardContent>
        <Wrapper flex justify="center" pb={3}>
          <Button size="small" variant="outlined" color="primary">
            Ban
          </Button>
          <Button ml={1} size="small" variant="contained" color="primary">
            Visit Profile
          </Button>
        </Wrapper>
      </Fragment>
    ) : (
      'Loading...'
    )}
  </Wrapper>
);

export default UserCard;
