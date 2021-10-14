import { Container, Grid, Flex, Box, Button, Icon } from '@chakra-ui/react';
import { PageAside, DropZone } from '../components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useState } from 'react';
import { FieldType } from '../types/FieldType';
import { RowActionType } from '../types/RowActionType';
import { HandleDropZoneType } from '../types/HandleDropZoneType';
import { nanoid } from 'nanoid';
import {
  MdOutlinePlaylistAdd,
  MdOutlineRemoveCircleOutline,
} from 'react-icons/md';
import produce from 'immer';

interface DraggableItem {
  id: string;
  fieldType: FieldType | null;
}

interface Section {
  id: number;
  columns: DraggableItem[][];
}

const initialRowState: DraggableItem = {
  id: nanoid(),
  fieldType: null,
};

export default function Page() {
  const [sections, setSections] = useState<Section[]>([
    { id: 0, columns: [[initialRowState]] },
  ]);

  const onFieldDrop = (type: FieldType, dropZoneId: string): void => {
    // const item = rows.find(row => row.id === rowId) as Row;
    // const updatedItem = {
    //   ...item,
    //   fieldType: type,
    // };
    // setRow({
    //   ...rows,
    //   ...updatedItem,
    // });
  };

  const handleSection = (type: RowActionType, id: number): void => {
    if (type === RowActionType.Add) {
      const position = id + 1;

      setSections(
        produce(draft => {
          draft.splice(position, 0, {
            id: sections.length,
            columns: [[{ ...initialRowState, id: nanoid() }]],
          });
        }),
      );
    }

    if (type === RowActionType.Delete) {
      setSections(
        produce(draft => {
          return draft.filter(section => section.id !== id);
        }),
      );
    }
  };

  const handleColumn = (
    type: RowActionType,
    sectionId: number,
    columnId: number,
  ): void => {
    const sectionsCopy = [...sections];
    const section = sectionsCopy.find(section => section.id === sectionId);
    const totalColumns = section?.columns.length;

    if (type === RowActionType.Add) {
      if (totalColumns === 1) {
        section?.columns.push([{ ...initialRowState, id: nanoid() }]);
      }

      sectionsCopy[sectionId] = section as Section;
      setSections(sectionsCopy);
    }

    if (type === RowActionType.Delete) {
    }
  };

  const handleDropZone: HandleDropZoneType = (
    type,
    dropZoneId,
    sectionId,
    columnId,
  ) => {
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

    if (type === RowActionType.Add) {
      setSections(
        produce(draft => {
          draft[sectionIndex].columns[columnIndex].splice(
            dropZoneIndex + 1,
            0,
            {
              ...initialRowState,
              id: nanoid(),
            },
          );
        }),
      );
    }

    if (type === RowActionType.Delete) {
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
              width="100%"
              minHeight="200px"
              bgColor="gray.400"
              rounded="base"
              p="2"
              key={index}
              mb="2"
            >
              <Flex alignItems="center">
                {section.columns.map((column, index) => (
                  <Box width="100%" key={index} m="1" position="relative">
                    <Box>
                      {column.map(row => (
                        <DropZone
                          id={row.id}
                          key={row.id}
                          columnId={index}
                          sectionId={section.id}
                          handleDropZone={handleDropZone}
                          fieldType={row.fieldType}
                        />
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
                        <Button
                          variant="link"
                          onClick={() =>
                            handleColumn(RowActionType.Add, section.id, index)
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
                            handleColumn(
                              RowActionType.Delete,
                              section.id,
                              index,
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
                    </Box>
                  </Box>
                ))}
              </Flex>
              <Flex justifyContent="center">
                <Button
                  variant="primary"
                  onClick={() => handleSection(RowActionType.Add, section.id)}
                >
                  <Icon as={MdOutlinePlaylistAdd} width="24px" height="24px" />
                </Button>
                <Button
                  variant="primary"
                  onClick={() =>
                    handleSection(RowActionType.Delete, section.id)
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
          ))}
        </Container>
        <PageAside isRerender={sections.length} onFieldDrop={onFieldDrop} />
      </Grid>
    </DndProvider>
  );
}
