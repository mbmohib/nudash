import styled, { css } from 'styled-components';
import {
  palette,
  spacing,
  sizing,
  borders,
  flexbox,
  display,
  typography,
} from '@material-ui/system';

const Wrapper = styled.div`
  background-color: ${({ bgColor, theme }) =>
    bgColor === 'default'
      ? theme.palette.background.default
      : bgColor === 'paper'
      ? theme.palette.background.paper
      : bgColor === 'light'
      ? '#ffffff'
      : bgColor === 'level1'
      ? theme.palette.background.level1
      : bgColor === 'primary'
      ? theme.palette.primary.main
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

  ${({ card }) =>
    card &&
    css`
      transition: box-shadow 0.3s ease-in-out;

      :hover {
        box-shadow: 2px 3px 13px
          ${props => props.theme.palette.primary.main + '40'};
        cursor: pointer;
      }
    `}

  ${spacing};
  ${palette};
  ${sizing};
  ${borders};
  ${flexbox};
  ${display};
  ${typography};
`;

export default Wrapper;
