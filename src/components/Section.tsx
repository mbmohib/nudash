import { Box, Flex, Button, Icon } from '@chakra-ui/react';
import { FieldType } from '../types/FieldType';
import { ActionType } from '../types/ActionType';
import { Column, PredefinedColumns } from './';
import { useDispatch } from '../hooks/useRedux';
import { handleRow, handleColumn } from '../store/sectionSlice';
import { HandleDropZoneType } from '../types/HandleDropZoneType';
import {
  MdOutlinePlaylistAdd,
  MdOutlineRemoveCircleOutline,
} from 'react-icons/md';
import { useDisclosure } from '@chakra-ui/hooks';
import { AiOutlineInsertRowRight } from 'react-icons/ai';
import { useState } from 'react';

interface SectionTypes {
  id: number;
  rows: {
    id: number;
    columns: DraggableItem[][];
  }[];
}

interface DraggableItem {
  id: string;
  fieldType?: FieldType;
  data?: any;
}

interface SectionProps {
  section: SectionTypes;
}

export default function Section({ section }: SectionProps) {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rowId, setRow] = useState<number>(0);

  const handleColumnLayout = (count: number, sectionId: number) => {
    dispatch(
      handleColumn({
        actionType: ActionType.Modify,
        sectionId,
        rowId,
        columnCount: count,
      }),
    );

    onClose();
  };

  const handleOpenColumnLayout = (id: number): void => {
    setRow(id);
    onOpen();
  };

  return (
    <Box width="100%" m="1" position="relative">
      {section.rows.map((row, index) => (
        <Box width="100%" key={index} role="row" position="relative">
          <Flex width="100%" gridGap="2">
            {row.columns.map((column, columnIndex) => (
              <Column
                key={columnIndex}
                rowId={row.id}
                sectionId={section.id}
                column={column}
                columnId={columnIndex}
              />
            ))}
          </Flex>
          <Flex justifyContent="center">
            <Button
              variant="primary"
              onClick={() =>
                dispatch(
                  handleRow({
                    actionType: ActionType.Add,
                    sectionId: section.id,
                    rowId: row.id,
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
                  handleRow({
                    actionType: ActionType.Delete,
                    sectionId: section.id,
                    rowId: row.id,
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
            right="-3"
            sx={{
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            <Flex flexDirection="column">
              <Button
                variant="link"
                onClick={() => handleOpenColumnLayout(row.id)}
              >
                <Icon as={AiOutlineInsertRowRight} width="24px" height="24px" />
              </Button>
            </Flex>
          </Box>
          <PredefinedColumns
            sectionId={section.id}
            isOpen={isOpen}
            onClose={onClose}
            handleColumnLayout={handleColumnLayout}
          />
        </Box>
      ))}
    </Box>
  );
}
