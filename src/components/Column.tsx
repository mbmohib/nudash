import { Box } from '@chakra-ui/react';

import { DropZone } from '.';
import { DraggableItem } from '../types';

interface ColumnProps {
  column: DraggableItem[];
}

export default function Column({ column }: ColumnProps) {
  return (
    <Box width="100%" role="column" minHeight="80px">
      {column.map(dropZone => (
        <Box position="relative" key={dropZone.id}>
          <DropZone id={dropZone.id} />
        </Box>
      ))}
    </Box>
  );
}
