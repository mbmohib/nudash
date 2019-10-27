import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import styled, { css } from 'styled-components';

import media from 'styles/mediaQuery';

const AppHeader = styled(({ drawerOpenWidth, drawerCloseWidth, ...rest }) => (
  <AppBar {...rest} />
))`
  background-color: #fff;
  box-shadow: rgba(53, 64, 82, 0.05) 0px 0px 14px 0px;
  color: ${props => props.theme.palette.text.primary};

  ${props =>
    props.open
      ? css`
          transition: all 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
          margin-left: ${props => `${props.drawerOpenWidth}px`};
          width: ${props => `calc(100% - ${props.drawerOpenWidth}px)`};
        `
      : css`
          transition: all 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
          margin-left: ${props => `${props.drawerCloseWidth - 16}px`};
          width: ${`calc(100% - ${props.drawerCloseWidth - 16}px)`};
        `};

  ${media.md`
    ${props =>
      !props.open &&
      css`
        width: ${`calc(100% - ${props.drawerCloseWidth}px)`};
      `};
      `}
`;

export default AppHeader;
