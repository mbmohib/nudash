import { Box, Button, Flex } from '@chakra-ui/react';

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

  const handleRemoveColumn = () => {
    dispatch(
      removeColumn({
        sectionId,
        rowId,
        columnId,
      }),
    );
  };

  return (
    <Flex role={`column ${columnId}`} flexDirection="column" width="100%">
      <Box
        width="100%"
        border="1px"
        borderColor="secondary.10"
        borderRadius="lg"
        p="2"
      >
        {column.map(dropZone => (
          <Box position="relative" key={dropZone.id}>
            <DropZone dropZone={dropZone} />
          </Box>
        ))}
      </Box>
      <Button
        leftIcon={<DeleteIcon width={15} />}
        variant="ghost"
        onClick={handleRemoveColumn}
        mt="2"
      >
        Delete Column
      </Button>
    </Flex>
  );
}
