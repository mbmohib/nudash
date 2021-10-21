import { Box, Button, Icon } from '@chakra-ui/react';
import { FieldType } from '../types/FieldType';
import { DropZone } from './';
import { HandleDropZoneType } from '../types/HandleDropZoneType';
import { AiOutlineHolder } from 'react-icons/ai';

interface DraggableItem {
  id: string;
  fieldType?: FieldType;
  data?: any;
}

interface ColumnProps {
  column: DraggableItem[];
  id: number;
  rowId: number;
  sectionId: number;
  handleDropZone: HandleDropZoneType;
  dropZones: DraggableItem[];
}

export default function Column({
  column,
  id,
  rowId,
  sectionId,
  handleDropZone,
  dropZones,
}: ColumnProps) {
  return (
    <Box>
      {column.map(dropZone => (
        <Box
          border="1px"
          borderColor="gray.500"
          mb="2"
          position="relative"
          key={dropZone.id}
        >
          <DropZone
            id={dropZone.id}
            columnId={id}
            sectionId={sectionId}
            handleDropZone={handleDropZone}
            dropZone={
              dropZones.find(item => item.id === dropZone.id) as DraggableItem
            }
          />
          <Box
            position="absolute"
            left="-4"
            sx={{
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            <Button variant="primary" role="drag-row">
              <Icon as={AiOutlineHolder} width="24px" height="24px" />
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
