import React, { Fragment } from 'react';
import styled from 'styled-components';

import { Wrapper, List, Button } from 'views/ui';
import media from 'styles/mediaQuery';
import { MoneyIcon } from 'views/ui/icons';

const BalanceCardContent = styled.div`
  margin-top: ${({ theme }) => theme.space[1] + 'px'};
  padding-bottom: ${({ theme }) => theme.space[2] + 'px'};

  ${media.md`
    padding-left: ${({ theme }) => theme.space[2] + 'px'};
  `}
`;

const BalanceCard = ({ user, handleCloseDialog }) => (
  <Wrapper pt={3}>
    {true ? (
      <Fragment>
        <Wrapper flex justify="center">
          <Wrapper flex align="center" direction="column" mb={1}>
            <MoneyIcon />
          </Wrapper>
        </Wrapper>
        <BalanceCardContent>
          {[
            {
              primaryText: '2000',
              secondaryText: 'Balance',
            },
            {
              primaryText: '50000',
              secondaryText: 'Total Spent',
            },
            {
              primaryText: '500',
              secondaryText: 'Working Projects',
            },
            {
              primaryText: '3000',
              secondaryText: 'Withdraw Requested',
            },
          ].map((list, index) => (
            <List key={index} list={list} />
          ))}
        </BalanceCardContent>
        <Button ml={1} mb={2} size="small" variant="contained" color="primary">
          Adjust Balance
        </Button>
      </Fragment>
    ) : (
      'Loading...'
    )}
  </Wrapper>
);

export default BalanceCard;
