import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import { palette, spacing } from '@material-ui/system';

const PaperExtended = styled(Paper)`
  ${spacing}
  ${palette}
`;

export default PaperExtended;
