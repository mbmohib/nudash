import { Container, Grid, Flex, Box, Button, Icon } from '@chakra-ui/react';
import { PageAside, Section } from '../components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ActionType } from '../config';
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
              <Section section={section} key={index} />

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
