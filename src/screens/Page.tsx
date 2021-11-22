import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Container, Grid } from '@chakra-ui/react';
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useParams } from 'react-router-dom';

import {
  DraggableComponentsContainer,
  PageLayout,
  PredefinedColumns,
  Section,
} from '../components';
import { useDispatch, useSelector } from '../hooks';
import { handleAddColumn, removeLastUnusedRow } from '../store/sectionSlice';

const menus = [
  {
    link: '/home',
    label: 'Home',
  },
];

export default function Page() {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { sections } = useSelector(state => state.section);
  const [rowId, setRowId] = useState<number>(0);
  const [sectionId, setSectionId] = useState<number>(0);
  const notInitialRow = sections[0]?.rows[0]?.columns[0].length > 0;
  const { page } = useParams<{ page?: string }>();

  const handleColumnLayout = (count: number) => {
    dispatch(
      handleAddColumn({
        sectionId,
        rowId,
        columnCount: count,
      }),
    );

    onClose();
  };

  const handleOpenColumnLayout = (
    rowNumber: number,
    sectionNumber: number,
  ): void => {
    setRowId(rowNumber);
    setSectionId(sectionNumber);
    onOpen();
  };

  const handleCloseColumnLayout = () => {
    if (notInitialRow) {
      dispatch(removeLastUnusedRow());
    }
    onClose();
  };

  return (
    <PageLayout heading="Pages" menus={menus}>
      <Box pt="80px">
        <DndProvider backend={HTML5Backend}>
          <Grid gridTemplateColumns="1fr 350px">
            <Container py="2" maxW="container.lg">
              {sections.map((section, index) => (
                <Section
                  section={section}
                  key={index}
                  totalSection={sections.length}
                />
              ))}
            </Container>
            <DraggableComponentsContainer
              handleOpenColumnLayout={handleOpenColumnLayout}
            />
          </Grid>
        </DndProvider>
        <PredefinedColumns
          isOpen={isOpen}
          onClose={handleCloseColumnLayout}
          handleColumnLayout={handleColumnLayout}
        />
      </Box>
    </PageLayout>
  );
}
