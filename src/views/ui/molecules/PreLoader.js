import React from 'react';
import styled, { keyframes } from 'styled-components';

import Wrapper from '../atoms/Wrapper';

const PerLoaderAnimation = keyframes`  
  0 {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(0, 15px);
  }
  100% {
    transform: translate(0, 0);
  }
`;

const PerLoaderContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const Line = styled.div`
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 15px;
  background-color: #eb1763;
  margin-right: 4px;

  &:last-child {
    margin-right: 0;
  }

  &:nth-last-child(1) {
    animation: ${PerLoaderAnimation} 0.6s 0.1s linear infinite;
  }
  &:nth-last-child(2) {
    animation: ${PerLoaderAnimation} 0.6s 0.2s linear infinite;
  }
  &:nth-last-child(3) {
    animation: ${PerLoaderAnimation} 0.6s 0.3s linear infinite;
  }
`;

const PerLoader = () => (
  <Wrapper p={3}>
    <PerLoaderContainer>
      <Line />
      <Line />
      <Line />
    </PerLoaderContainer>
  </Wrapper>
);

export default PerLoader;
