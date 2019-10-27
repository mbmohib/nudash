import styled from 'styled-components';

import media from 'styles/mediaQuery';

export const PageWrapper = styled.div`
  display: flex;
`;

export const Main = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

export const Content = styled.main`
  margin-top: 50px;
  padding: ${props => props.theme.space[3] + 'px'};
  padding-top: 0;
  flex-grow: 1;
  width: 100%;

  ${media.md`
    margin-top: 80px;
  `}
`;

export const drawerOpenWidth = 240;
export const drawerCloseWidth = 64;
