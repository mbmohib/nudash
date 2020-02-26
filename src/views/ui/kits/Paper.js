import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import { palette, spacing, sizing } from '@material-ui/system';

const PaperExtended = styled(Paper)`
  ${spacing}
  ${palette}
  ${sizing}
`;

export default PaperExtended;
