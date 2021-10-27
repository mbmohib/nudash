import { Box, Flex, Button, Icon } from '@chakra-ui/react';
import { ActionType } from '../config';
import { Column, PredefinedColumns } from './';
import { useDispatch } from '../hooks/useRedux';
import { handleRow, handleColumn, handleSection } from '../store/sectionSlice';
import {
  MdOutlinePlaylistAdd,
  MdOutlineRemoveCircleOutline,
} from 'react-icons/md';
import { useDisclosure } from '@chakra-ui/hooks';
import { AiOutlineInsertRowRight } from 'react-icons/ai';
import { useState } from 'react';
import { DraggableItem } from '../types';
import { FileMinusIcons, FilePlusIcons } from '../assets/icons';
import { AiOutlineHolder } from 'react-icons/ai';

interface SectionTypes {
  id: number;
  rows: {
    id: number;
    columns: DraggableItem[][];
  }[];
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
    <Box
      width="100%"
      m="1"
      position="relative"
      bgColor="secondary500"
      rounded="base"
      mb="2"
    >
      {section.rows.map((row, index) => (
        <Box width="100%" key={index} role="row" position="relative">
          <Flex width="100%" gridGap="2" p="2">
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
          {/* <Flex justifyContent="center">
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
          </Flex> */}
          {/* <Box
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
          </Box> */}
          <PredefinedColumns
            sectionId={section.id}
            isOpen={isOpen}
            onClose={onClose}
            handleColumnLayout={handleColumnLayout}
          />
        </Box>
      ))}

      <Flex justifyContent="center" borderTop="0.5px solid #2D2D6A" py="2">
        <Button
          fontWeight="normal"
          variant="link"
          leftIcon={<FilePlusIcons />}
          onClick={() =>
            dispatch(
              handleSection({
                actionType: ActionType.Add,
                id: section.id,
              }),
            )
          }
        >
          Add Section
        </Button>
        <Button
          fontWeight="normal"
          leftIcon={<FileMinusIcons />}
          variant="link"
          ml="2"
          onClick={() =>
            dispatch(
              handleSection({
                actionType: ActionType.Delete,
                id: section.id,
              }),
            )
          }
        >
          Delete Section
        </Button>
      </Flex>

      <Box
        role="drag-row"
        position="absolute"
        left="-7"
        sx={{
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
        <Button
          variant="primary"
          onClick={() =>
            dispatch(
              handleSection({
                actionType: ActionType.Drag,
                id: section.id,
              }),
            )
          }
        >
          <Icon as={AiOutlineHolder} width="24px" height="24px" />
        </Button>
      </Box>
    </Box>
  );
}
