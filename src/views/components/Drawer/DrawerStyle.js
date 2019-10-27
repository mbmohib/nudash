import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import styled, { css } from 'styled-components';
import ListItem from '@material-ui/core/ListItem';

import media from 'styles/mediaQuery';

export const AppDrawer = styled(
  ({ drawerOpenWidth, drawerCloseWidth, ...rest }) => <Drawer {...rest} />
)`
  && {
    flex-shrink: 0;
    white-space: nowrap;

    ${props =>
      props.open
        ? css`
            transition: width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
            width: ${props => `${props.drawerOpenWidth}px`};
          `
        : css`
            overflow-x: hidden;
            transition: width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
            width: ${props => `${props.drawerCloseWidth - 16}px`};
          `}

    .MuiDrawer-paperAnchorDockedLeft {
      background-color: rgb(27, 36, 48);
      overflow-x: hidden;

      ${props =>
        props.open
          ? css`
              transition: width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
              width: ${props => `${props.drawerOpenWidth}px`};
            `
          : css`
              transition: width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
              width: ${props => `${props.drawerCloseWidth - 16}px`};
            `}
    }

    ${media.md`
    ${props =>
      !props.open &&
      css`
        width: ${props => `${props.drawerCloseWidth}px`};
      `}
    .MuiDrawer-paperAnchorDockedLeft {
      ${props =>
        !props.open &&
        css`
          width: ${props => `${props.drawerCloseWidth}px`};
        `}
    }
    `}
  }
`;

export const DrawerToolbar = styled.div`
  background-color: #232f3e;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0px 8px;
  min-height: 56px;

  ${media.md`
    min-height: 64px;
  `}
`;

export const LinkItem = styled(ListItem)`
  span {
    color: ${props => props.theme.palette.grey[100]};
  }

  svg {
    fill: ${props => props.theme.palette.grey[600]};
  }
`;

export default AppDrawer;
