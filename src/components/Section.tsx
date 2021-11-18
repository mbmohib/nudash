import { Box, Button, Flex, Icon } from '@chakra-ui/react';
import { AiOutlineHolder } from 'react-icons/ai';

import { Row } from '.';
import { FileMinusIcons, FilePlusIcons } from '../assets/icons';
import { useDispatch } from '../hooks';
import { handleAddSection, handleRemoveSection } from '../store/sectionSlice';
import { DraggableItem } from '../types';

interface SectionTypes {
  id: number;
  rows: {
    id: number;
    columns: DraggableItem[][];
  }[];
}

interface SectionProps {
  section: SectionTypes;
  totalSection: number;
}

export default function Section({ section, totalSection }: SectionProps) {
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
        <Row key={index} rowId={row.id} sectionId={section.id} row={row} />
      ))}

      <Flex justifyContent="center" py="2">
        <Button
          fontWeight="normal"
          variant="link"
          leftIcon={<FilePlusIcons />}
          onClick={() =>
            dispatch(
              handleAddSection({
                id: section.id,
              }),
            )
          }
        >
          Add Section
        </Button>
        <Button
          disabled={totalSection === 1}
          fontWeight="normal"
          leftIcon={<FileMinusIcons />}
          variant="link"
          ml="2"
          onClick={() =>
            dispatch(
              handleRemoveSection({
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
              handleRemoveSection({
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
