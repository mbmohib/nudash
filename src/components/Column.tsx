import { Box, Button } from '@chakra-ui/react';

import { DropZone } from '.';
import { DeleteIcon } from '../assets/icons';
import { useDispatch, useSectionMeta } from '../hooks';
import { removeColumn } from '../store/slices/page';
import { DraggableItem } from '../types';

interface ColumnProps {
  column: DraggableItem[];
}

export default function Column({ column }: ColumnProps) {
  const dispatch = useDispatch();
  const { sectionId, rowId, columnId } = useSectionMeta();

  const handleRowRemove = () => {
    dispatch(
      removeColumn({
        sectionId,
        rowId,
        columnId,
      }),
    );
  };

  return (
    <Box width="100%" role="column" minHeight="80px">
      {column.map(dropZone => (
        <Box position="relative" key={dropZone.id}>
          <DropZone dropZone={dropZone} />
          {!dropZone.fieldType && (
            <Box position="absolute" right="20px" top="20px">
              <Button variant="icon" onClick={handleRowRemove}>
                <DeleteIcon width={15} />
              </Button>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}
