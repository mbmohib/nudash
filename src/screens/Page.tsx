import { Container, Grid } from '@chakra-ui/react';
import { DraggableComponents, Section, PredefinedColumns } from '../components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector, useDispatch } from '../hooks/useRedux';
import { useDisclosure } from '@chakra-ui/hooks';
import { useState } from 'react';
import { handleAddColumn, removeLastUnusedRow } from '../store/sectionSlice';

export default function Page() {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { sections } = useSelector(state => state.section);
  const [rowId, setRowId] = useState<number>(0);
  const [sectionId, setSectionId] = useState<number>(0);

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

  const handleOpenColumnLayout = (rowId: number, sectionId: number): void => {
    setRowId(rowId);
    setSectionId(sectionId);
    onOpen();
  };

  const handleCloseColumnLayout = () => {
    dispatch(removeLastUnusedRow());
    onClose();
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Grid gridTemplateColumns="1fr 350px">
          <Container py="2" maxW="container.lg">
            {sections.map((section, index) => (
              <Section section={section} key={index} />
            ))}
          </Container>
          <DraggableComponents
            handleOpenColumnLayout={handleOpenColumnLayout}
          />
        </Grid>
      </DndProvider>
      <PredefinedColumns
        isOpen={isOpen}
        onClose={handleCloseColumnLayout}
        handleColumnLayout={handleColumnLayout}
      />
    </>
  );
}
