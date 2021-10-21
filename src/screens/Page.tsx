import { Container, Grid, Flex, Box, Button, Icon } from '@chakra-ui/react';
import { PageAside, Section } from '../components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useState } from 'react';
import { FieldType } from '../types/FieldType';
import { ActionType } from '../types/ActionType';
import { HandleDropZoneType } from '../types/HandleDropZoneType';
import { nanoid } from 'nanoid';
import {
  MdOutlinePlaylistAdd,
  MdOutlineRemoveCircleOutline,
} from 'react-icons/md';
import produce from 'immer';
import { AiOutlineHolder, AiOutlineInsertRowRight } from 'react-icons/ai';
import { useDisclosure } from '@chakra-ui/hooks';

interface Section {
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

const initialDraggableState: DraggableItem = {
  id: nanoid(),
  fieldType: undefined,
  data: null,
};

const initialSectionState: Section = {
  id: 0,
  rows: [
    {
      id: 0,
      columns: [[{ id: initialDraggableState.id }]],
    },
  ],
};

export default function Page() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sections, setSections] = useState<Section[]>([initialSectionState]);

  const [dropZones, setDropZones] = useState<DraggableItem[]>([
    { ...initialDraggableState, data: null },
  ]);

  const handleFieldDrop = (type: FieldType, dropZoneId: string): void => {
    setDropZones(
      produce(draft => {
        // TODO: need to add proper return type
        return draft.map((dropZone: DraggableItem) => {
          if (dropZone.id === dropZoneId) {
            return {
              ...dropZone,
              fieldType: type,
            };
          }

          return dropZone;
        });
      }),
    );
  };

  const handleSection = (type: ActionType, id: number): void => {
    if (type === ActionType.Add) {
      const newDropZoneId = nanoid();
      const position = id + 1;

      setSections(
        produce(draft => {
          draft.splice(position, 0, {
            id: sections.length,
            rows: [
              {
                id: 0,
                columns: [[{ id: newDropZoneId }]],
              },
            ],
          });
        }),
      );

      setDropZones(
        produce(draft => {
          draft?.push({
            ...initialDraggableState,
            id: newDropZoneId,
          });
        }),
      );
    }

    if (type === ActionType.Delete) {
      setSections(
        produce(draft => {
          return draft.filter(section => section.id !== id);
        }),
      );
    }
  };

  const handleRow = (
    type: ActionType,
    sectionId: number,
    rowId: number,
  ): void => {
    const sectionIndex = sections.findIndex(
      section => section.id === sectionId,
    );

    if (type === ActionType.Add) {
      const newDropZoneId = nanoid();
      const position = rowId + 1;

      setSections(
        produce(draft => {
          draft[sectionIndex].rows.splice(position, 0, {
            id: draft[sectionIndex].rows.length,
            columns: [[{ id: newDropZoneId }]],
          });
        }),
      );

      setDropZones(
        produce(draft => {
          draft?.push({
            ...initialDraggableState,
            id: newDropZoneId,
          });
        }),
      );
    }

    if (type === ActionType.Delete) {
      const rows = sections[sectionIndex].rows.filter(row => row.id !== rowId);
      setSections(
        produce(draft => {
          draft[sectionIndex].rows = rows;
        }),
      );
    }
  };

  const handleColumn = (
    type: ActionType,
    sectionId: number,
    columnId: number,
    columnCount: number,
  ): void => {
    // const sectionIndex = sections.findIndex(
    //   section => section.id === sectionId,
    // );
    // const columnIndex =
    //   sections[sectionIndex].columns.findIndex(
    //     (_, index) => index === columnId,
    //   ) || 0;
    // if (type === ActionType.Modify) {
    //   const newDropZoneId = nanoid();
    //   const newColumns: DraggableItem[][] = [];
    //   const totalColumn = columnCount - sections[sectionIndex].columns.length;
    //   for (let i = 0; i < totalColumn; i++) {
    //     newColumns.push([
    //       {
    //         id: newDropZoneId,
    //       },
    //     ]);
    //   }
    //   setSections(
    //     produce(draft => {
    //       draft[sectionIndex].columns.splice(columnIndex + 1, 0, ...newColumns);
    //     }),
    //   );
    //   setDropZones(
    //     produce(draft => {
    //       draft?.push({
    //         ...initialDraggableState,
    //         id: newDropZoneId,
    //       });
    //     }),
    //   );
    // }
    // onClose();
  };

  const handleColumnLayout = (
    count: number,
    sectionId: number,
    columnId: number,
  ) => {
    handleColumn(ActionType.Modify, sectionId, columnId, count);
  };

  const handleDropZone: HandleDropZoneType = (
    type,
    dropZoneId,
    sectionId,
    columnId,
  ) => {
    // const newDropZoneId = nanoid();
    // const sectionIndex = sections.findIndex(
    //   section => section.id === sectionId,
    // );
    // const columnIndex =
    //   sections[sectionIndex].columns.findIndex(
    //     (_, index) => index === columnId,
    //   ) || 0;
    // const dropZoneIndex =
    //   sections[sectionIndex].columns[columnIndex].findIndex(
    //     dropZone => dropZone.id === dropZoneId,
    //   ) || 0;
    // if (type === ActionType.Add) {
    //   setDropZones(
    //     produce(draft => {
    //       draft?.push({
    //         ...initialDraggableState,
    //         id: newDropZoneId,
    //       });
    //     }),
    //   );
    //   setSections(
    //     produce(draft => {
    //       draft[sectionIndex].columns[columnIndex].splice(
    //         dropZoneIndex + 1,
    //         0,
    //         {
    //           id: newDropZoneId,
    //         },
    //       );
    //     }),
    //   );
    // }
    // if (type === ActionType.Delete) {
    //   setSections(
    //     produce(draft => {
    //       draft[sectionIndex].columns[columnIndex].splice(dropZoneIndex, 1);
    //     }),
    //   );
    // }
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Grid gridTemplateColumns="1fr 300px">
          <Container py="2" maxW="container.xl">
            {sections.map((section, index) => (
              <Box
                position="relative"
                width="100%"
                minHeight="200px"
                bgColor="gray.400"
                rounded="base"
                p="2"
                key={index}
                mb="2"
              >
                <Section
                  isOpen={isOpen}
                  onClose={onClose}
                  onOpen={onOpen}
                  handleColumnLayout={handleColumnLayout}
                  handleDropZone={handleDropZone}
                  handleRow={handleRow}
                  section={section}
                  key={index}
                  dropZones={dropZones}
                />

                {/* Section Action start */}
                <Flex justifyContent="center">
                  <Button
                    variant="primary"
                    onClick={() => handleSection(ActionType.Add, section.id)}
                  >
                    <Icon
                      as={MdOutlinePlaylistAdd}
                      width="24px"
                      height="24px"
                    />
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => handleSection(ActionType.Delete, section.id)}
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
                  <Button
                    variant="primary"
                    onClick={() => handleSection(ActionType.Drag, section.id)}
                  >
                    <Icon as={AiOutlineHolder} width="24px" height="24px" />
                  </Button>
                </Box>
                {/* Section action end */}
              </Box>
            ))}
          </Container>
          <PageAside
            isRerender={dropZones.length}
            handleFieldDrop={handleFieldDrop}
          />
        </Grid>
      </DndProvider>
    </>
  );
}

// const sections = [
//   {
//     id: 0,
//     rows: [
//       {
//         id: 0,
//         columns: [
//           [{ id: 'drag zone 0' }, { id: 'drag zone 1' }],
//           [{ id: 'drag zone 0' }, { id: 'drag zone 1' }, { id: 'drag zone 2' }],
//         ],
//       },
//       {
//         id: 0,
//         columns: [[{ id: 'drag zone 0' }]],
//       },
//     ],
//   },
//   {
//     id: 0,
//     rows: [
//       {
//         id: 0,
//         columns: [
//           [{ id: 'drag zone 0' }, { id: 'drag zone 1' }],
//           [{ id: 'drag zone 0' }, { id: 'drag zone 1' }, { id: 'drag zone 2' }],
//         ],
//       },
//       {
//         id: 0,
//         columns: [[{ id: 'drag zone 0' }]],
//       },
//     ],
//   },
// ];
