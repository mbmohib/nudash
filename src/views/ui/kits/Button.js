import React from 'react';
import styled, { css } from 'styled-components';
import { spacing, sizing } from '@material-ui/system';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const ButtonWrapper = styled.div`
  position: relative;
  display: inline-flex;
  justify-content: ${({ justify }) => (justify ? justify : 'center')};
  align-items: center;

  ${sizing};
  ${spacing};
`;

const CircularProgressWrapper = styled(CircularProgress)`
  && {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -12px;
    margin-left: -12px;
  }
`;

const StyledButton = styled(({ minWidth, justify, ...rest }) => (
  <Button {...rest} />
))`
  box-shadow: none;
  padding: 12px 30px 9px;
  min-width: ${props => props.minWidth + 'px'};
  border-radius: 4px;

  ${({ size }) =>
    size === 'small' &&
    css`
      padding: 6px 18px 3px;
    `}
`;

const ButtonExtended = ({
  justify = 'flex-start',
  minWidth = 100,
  loading = false,
  ...rest
}) => {
  return (
    <ButtonWrapper justify={justify} {...rest}>
      <StyledButton minWidth={minWidth} {...rest} />
      {loading && <CircularProgressWrapper size={24} />}
    </ButtonWrapper>
  );
};

export default ButtonExtended;
