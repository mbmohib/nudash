import { Box, Button, Icon, Flex } from '@chakra-ui/react';
import { FieldType } from '../types/FieldType';
import { ActionType } from '../types/ActionType';
import { DropZone } from './';
import { AiOutlineHolder } from 'react-icons/ai';
import {
  MdOutlinePlaylistAdd,
  MdOutlineRemoveCircleOutline,
} from 'react-icons/md';
import { handleDropZone } from '../store/sectionSlice';
import { useDispatch } from '../hooks/useRedux';

interface DraggableItem {
  id: string;
  fieldType?: FieldType;
  data?: any;
}

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
  const dispatch = useDispatch();

  return (
    <Box width="100%" row="column">
      {column.map(dropZone => (
        <Box
          border="1px"
          borderColor="gray.500"
          mb="2"
          position="relative"
          key={dropZone.id}
        >
          <DropZone id={dropZone.id} />
          <Flex justifyContent="center">
            <Button
              variant="primary"
              onClick={() =>
                dispatch(
                  handleDropZone({
                    actionType: ActionType.Add,
                    sectionId: sectionId,
                    rowId: rowId,
                    columnId: columnId,
                    dropZoneId: dropZone.id,
                  }),
                )
              }
            >
              <Icon as={MdOutlinePlaylistAdd} width="24px" height="24px" />
            </Button>
            <Button
              variant="primary"
              onClick={() =>
                dispatch(
                  handleDropZone({
                    actionType: ActionType.Delete,
                    sectionId: sectionId,
                    rowId: rowId,
                    columnId: columnId,
                    dropZoneId: dropZone.id,
                  }),
                )
              }
            >
              <Icon
                as={MdOutlineRemoveCircleOutline}
                width="24px"
                height="24px"
              />
            </Button>
          </Flex>
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