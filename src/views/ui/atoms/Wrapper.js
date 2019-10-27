import styled, { css } from 'styled-components';
import { palette, spacing, sizing } from '@material-ui/system';

const Wrapper = styled.div`
  ${props =>
    props.flex &&
    css`
      display: flex;
      flex-wrap: ${props => (props.noWrap ? 'nowrap' : 'wrap')};
      justify-content: ${props =>
        props.justify ? props.justify : 'flex-start'};
      flex-direction: ${props => (props.direction ? props.direction : 'row')};
    `}

  ${props =>
    props.align &&
    css`
      align-items: ${props.align};
    `};

  background-color: ${({ bgColor, theme }) =>
    bgColor === 'gray'
      ? theme.palette.background.default
      : bgColor === 'dark'
      ? '#444444'
      : bgColor === 'light'
      ? theme.palette.background.light
      : ''};

  ${({ bgImage }) =>
    bgImage
      ? css`
          background: url(${bgImage}) no-repeat center center;
          background-size: cover;
        `
      : ''};

  ${props =>
    props.maxHeight &&
    css`
      max-height: ${props.maxHeight};
      overflow-y: auto;
    `};

  ${props =>
    props.maxWidth &&
    css`
      max-width: ${props.maxWidth};
    `};

  ${spacing};
  ${palette};
  ${sizing};
`;

export default Wrapper;
