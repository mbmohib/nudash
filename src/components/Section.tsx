import { Box, Flex, Button, Icon } from '@chakra-ui/react';
import { FieldType } from '../types/FieldType';
import { ActionType } from '../types/ActionType';
import { Column, ColumnLayout } from './';
import { AiOutlineInsertRowRight } from 'react-icons/ai';
import { HandleDropZoneType } from '../types/HandleDropZoneType';
import {
  MdOutlinePlaylistAdd,
  MdOutlineRemoveCircleOutline,
} from 'react-icons/md';

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
  isOpen: boolean;
  dropZones: DraggableItem[];
  handleDropZone: HandleDropZoneType;
  onOpen: () => void;
  onClose: () => void;
  handleColumnLayout: (
    count: number,
    sectionId: number,
    columnId: number,
  ) => void;
  handleRow: (type: ActionType, sectionId: number, rowId: number) => void;
}

export default function Section({
  section,
  isOpen,
  onClose,
  onOpen,
  handleColumnLayout,
  handleDropZone,
  dropZones,
  handleRow,
}: SectionProps) {
  return (
    <Box width="100%" m="1" position="relative">
      <Box>
        {section.rows.map((row, index) => (
          <Box width="100%" key={index}>
            {row.columns.map((column, columnIndex) => (
              <>
                <Column
                  dropZones={dropZones}
                  rowId={row.id}
                  sectionId={section.id}
                  column={column}
                  key={columnIndex}
                  id={columnIndex}
                  handleDropZone={handleDropZone}
                />
                <Flex justifyContent="center">
                  <Button
                    variant="primary"
                    onClick={() =>
                      handleRow(ActionType.Add, section.id, row.id)
                    }
                  >
                    <Icon
                      as={MdOutlinePlaylistAdd}
                      width="24px"
                      height="24px"
                    />
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() =>
                      handleRow(ActionType.Delete, section.id, row.id)
                    }
                  >
                    <Icon
                      as={MdOutlineRemoveCircleOutline}
                      width="24px"
                      height="24px"
                    />
                  </Button>
                </Flex>
              </>
            ))}

            <ColumnLayout
              columnId={index}
              sectionId={section.id}
              isOpen={isOpen}
              onClose={onClose}
              handleColumnLayout={handleColumnLayout}
            />
          </Box>
        ))}
      </Box>
      <Box
        position="absolute"
        right="-3"
        sx={{
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
        <Flex flexDirection="column">
          <Button variant="link" onClick={onOpen}>
            <Icon as={AiOutlineInsertRowRight} width="24px" height="24px" />
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
