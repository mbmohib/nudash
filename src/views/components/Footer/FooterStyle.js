import styled from 'styled-components';

const FooterWrapper = styled.footer`
  width: 100%;
  background: ${({ theme }) => theme.palette.background.paper};
  border-top: 1px solid ${({ theme }) => theme.palette.grey[300]};
  padding: ${props => props.theme.space[1] + 'px'};
`;

export default FooterWrapper;
