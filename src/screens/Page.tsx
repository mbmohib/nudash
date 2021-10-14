import { Container, Grid, Flex, Box, Button, Icon } from '@chakra-ui/react';
import { PageAside, DropZone } from '../components';
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
import { AiOutlineHolder } from 'react-icons/ai';

interface Section {
  id: number;
  columns: DraggableItem[][];
}

interface DraggableItem {
  id: string;
  fieldType?: FieldType;
  data?: any;
}

const initialRowState: DraggableItem = {
  id: nanoid(),
  fieldType: undefined,
  data: null,
};

enum ColumnCount {
  oneColumn = 1,
  twoColumns = 2,
  threeColumns = 3,
  fourColumns = 4,
  sixColumns = 6,
}

export default function Page() {
  const [sections, setSections] = useState<Section[]>([
    { id: 0, columns: [[{ id: initialRowState.id }]] },
  ]);

  const [dropZones, setDropZones] = useState<DraggableItem[]>([
    { ...initialRowState, data: null },
  ]);

  // FIXME: fix field drop for multiple sections and columns
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
      const position = id + 1;

      setSections(
        produce(draft => {
          draft.splice(position, 0, {
            id: sections.length,
            columns: [[{ id: nanoid() }]],
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

  const handleColumn = (
    type: ActionType,
    sectionId: number,
    columnId: number,
    columnCount: number = 1,
  ): void => {
    const sectionIndex = sections.findIndex(
      section => section.id === sectionId,
    );

    const columnIndex =
      sections[sectionIndex].columns.findIndex(
        (_, index) => index === columnId,
      ) || 0;

    if (type === ActionType.Add) {
      const newColumns: DraggableItem[][] = [];

      for (let i = 0; i < columnCount; i++) {
        newColumns.push([
          {
            id: nanoid(),
          },
        ]);
      }

      setSections(
        produce(draft => {
          draft[sectionIndex].columns.splice(columnIndex + 1, 0, ...newColumns);
        }),
      );
    }

    if (type === ActionType.Delete) {
      setSections(
        produce(draft => {
          draft[sectionIndex].columns.splice(columnIndex, 1);
        }),
      );
    }
  };

  const handleDropZone: HandleDropZoneType = (
    type,
    dropZoneId,
    sectionId,
    columnId,
  ) => {
    const newDropZoneId = nanoid();
    const sectionIndex = sections.findIndex(
      section => section.id === sectionId,
    );

    const columnIndex =
      sections[sectionIndex].columns.findIndex(
        (_, index) => index === columnId,
      ) || 0;

    const dropZoneIndex =
      sections[sectionIndex].columns[columnIndex].findIndex(
        dropZone => dropZone.id === dropZoneId,
      ) || 0;

    if (type === ActionType.Add) {
      setDropZones(
        produce(draft => {
          draft?.push({
            ...initialRowState,
            id: newDropZoneId,
          });
        }),
      );

      setSections(
        produce(draft => {
          draft[sectionIndex].columns[columnIndex].splice(
            dropZoneIndex + 1,
            0,
            {
              id: newDropZoneId,
            },
          );
        }),
      );
    }

    if (type === ActionType.Delete) {
      setSections(
        produce(draft => {
          draft[sectionIndex].columns[columnIndex].splice(dropZoneIndex, 1);
        }),
      );
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Grid gridTemplateColumns="1fr 300px">
        <Container py="2" maxW="container.md">
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
              <Box width="100%" key={index} m="1" position="relative">
                <Flex alignItems="center">
                  {section.columns.map((column, index) => (
                    <Box width="100%">
                      {column.map(dropZone => (
                        <Box
                          border="1px"
                          borderColor="gray.500"
                          mb="2"
                          position="relative"
                        >
                          <DropZone
                            id={dropZone.id}
                            key={dropZone.id}
                            columnId={index}
                            sectionId={section.id}
                            handleDropZone={handleDropZone}
                            dropZone={
                              dropZones.find(
                                item => item.id === dropZone.id,
                              ) as DraggableItem
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
                            <Button
                              variant="primary"
                              onClick={() =>
                                handleSection(ActionType.Drag, section.id)
                              }
                            >
                              <Icon
                                as={AiOutlineHolder}
                                width="24px"
                                height="24px"
                              />
                            </Button>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  ))}
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
                      onClick={() =>
                        handleColumn(ActionType.Add, section.id, index)
                      }
                    >
                      <Icon
                        as={MdOutlinePlaylistAdd}
                        width="24px"
                        height="24px"
                      />
                    </Button>
                    <Button
                      variant="link"
                      onClick={() =>
                        handleColumn(ActionType.Delete, section.id, index)
                      }
                    >
                      <Icon
                        as={MdOutlineRemoveCircleOutline}
                        width="24px"
                        height="24px"
                      />
                    </Button>
                  </Flex>
                </Box>
              </Box>
              {/* Section Action start */}
              <Flex justifyContent="center">
                <Button
                  variant="primary"
                  onClick={() => handleSection(ActionType.Add, section.id)}
                >
                  <Icon as={MdOutlinePlaylistAdd} width="24px" height="24px" />
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
  );
}
