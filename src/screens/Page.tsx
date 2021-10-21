import { Container, Grid, Flex, Box, Button, Icon } from '@chakra-ui/react';
import { PageAside, Section } from '../components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ActionType } from '../types/ActionType';
import { HandleDropZoneType } from '../types/HandleDropZoneType';
import {
  MdOutlinePlaylistAdd,
  MdOutlineRemoveCircleOutline,
} from 'react-icons/md';
import { AiOutlineHolder } from 'react-icons/ai';
import { useSelector, useDispatch } from '../hooks/useRedux';
import { handleSection } from '../store/sectionSlice';

export default function Page() {
  const dispatch = useDispatch();
  const { sections } = useSelector(state => state.section);

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
                handleDropZone={handleDropZone}
                section={section}
                key={index}
              />

              {/* Section Action start */}
              <Flex justifyContent="center">
                <Button
                  variant="primary"
                  onClick={() =>
                    dispatch(
                      handleSection({
                        actionType: ActionType.Add,
                        id: section.id,
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
                      handleSection({
                        actionType: ActionType.Delete,
                        id: section.id,
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
              {/* Section action end */}
            </Box>
          ))}
        </Container>
        <PageAside />
      </Grid>
    </DndProvider>
  );
}
