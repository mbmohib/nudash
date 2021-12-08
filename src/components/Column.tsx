import { Box, Button, Flex } from '@chakra-ui/react';

import { DropZone } from '.';
import { DeleteIcon } from '../assets/icons';
import { useDebounce, useDispatch, useSelector } from '../hooks';
import {
  handleAddRow,
  removeLastUnusedRow,
  removeRow,
} from '../store/slices/page';
import { DraggableItem } from '../types';

interface ColumnProps {
  column: DraggableItem[];
}

export default function Column({ column }: ColumnProps) {
  const dispatch = useDispatch();

  const handleRowRemove = () => {
    // dispatch(
    //   removeRow({
    //     // sectionId,
    //     // rowId,
    //   }),
    // );
  };

  return (
    <Flex flexDirection="column" width="100%">
      <Box
        width="100%"
        role="column"
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
        onClick={handleRowRemove}
        mt="2"
      >
        Delete Column
      </Button>
    </Flex>
  );
}
