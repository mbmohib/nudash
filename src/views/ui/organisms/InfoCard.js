import React from 'react';
import styled from 'styled-components';

import { Typography } from 'views/ui';

const InfoCardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.space[2] + 'px'};
`;

const InfoCardMeta = styled.div``;

const InfoCard = ({ card: { amount, label, icon } }) => {
  return (
    <InfoCardWrapper>
      <InfoCardMeta>
        <Typography variant="h5" gutterBottom>
          {amount}
        </Typography>
        <Typography variant="subtitle1">{label}</Typography>
      </InfoCardMeta>
      {icon}
    </InfoCardWrapper>
  );
};

export default InfoCard;
