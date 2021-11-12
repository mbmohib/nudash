import { Box } from '@chakra-ui/react';

import { DropZone } from '.';
import { DraggableItem } from '../types';

interface ColumnProps {
  column: DraggableItem[];
  columnId: number;
  rowId: number;
  sectionId: number;
}

export default function Column({
  column,
  columnId,
  rowId,
  sectionId,
}: ColumnProps) {
  return (
    <Box width="100%" role="column" minHeight="80px">
      {column.map(dropZone => (
        <Box position="relative" key={dropZone.id}>
          <DropZone
            sectionId={sectionId}
            rowId={rowId}
            columnId={columnId}
            id={dropZone.id}
          />
        </Box>
      ))}
    </Box>
  );
}
