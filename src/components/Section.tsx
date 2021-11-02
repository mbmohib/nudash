import { Box, Flex, Button, Icon } from '@chakra-ui/react';
import { ActionType } from '../config';
import { Column } from './';
import { handleSection } from '../store/sectionSlice';
import { DraggableItem } from '../types';
import { FileMinusIcons, FilePlusIcons } from '../assets/icons';
import { AiOutlineHolder } from 'react-icons/ai';
import { useDispatch } from '../hooks/useRedux';

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
          <Flex
            width="100%"
            gridGap="2"
            p="2"
            borderTop={
              section.rows.length && index !== 0 ? '1px solid #2D2D6A' : 'none'
            }
          >
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
        </Box>
      ))}

      <Flex justifyContent="center" py="2">
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
