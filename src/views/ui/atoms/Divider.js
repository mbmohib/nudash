import styled, { css } from 'styled-components';
import Divider from '@material-ui/core/Divider';
import { palette, spacing } from '@material-ui/system';

const DividerExtended = styled(Divider)`
  ${({ color }) =>
    color === 'secondary' &&
    css`
      background-color: ${props => props.theme.palette.secondary.main};
    `}

  ${({ color }) =>
    color === 'grey' &&
    css`
      background-color: ${props => props.theme.palette.grey[600]};
    `}

    ${spacing}
    ${palette}
`;

export default DividerExtended;
