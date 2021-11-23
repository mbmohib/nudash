import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Container, Grid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useParams } from 'react-router-dom';

import {
  CreatePage,
  DraggableComponentsContainer,
  PageLayout,
  PreLoader,
  PredefinedColumns,
  Section,
} from '../components';
import { useDispatch, useSelector } from '../hooks';
import { usePageQuery } from '../hooks/usePage';
import { useSiteQuery } from '../hooks/useSite';
import {
  handleAddColumn,
  removeLastUnusedRow,
  setInitialState,
} from '../store/slices/page';

export default function Page() {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const createPageModal = useDisclosure();
  const { sections } = useSelector(state => state.page);
  const [rowId, setRowId] = useState<number>(0);
  const [sectionId, setSectionId] = useState<number>(0);
  const notInitialRow = sections[0]?.rows[0]?.columns[0].length > 0;
  const { page } = useParams<{ page?: string }>();
  const siteQuery = useSiteQuery();
  const pageQuery = usePageQuery(page);

  useEffect(() => {
    if (pageQuery.data && pageQuery.isFetched) {
      dispatch(setInitialState(pageQuery.data));
    }
  }, [pageQuery.data]);

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

  const handlePageAdd = () => {
    createPageModal.onToggle();
  };

  return (
    <PageLayout
      heading="Pages"
      menus={siteQuery.data?.pages}
      isLoading={siteQuery.isLoading}
      pageName={pageQuery.data?.name}
      handleAdd={handlePageAdd}
    >
      <PreLoader isLoading={pageQuery.isLoading}>
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
      </PreLoader>

      <CreatePage
        isOpen={createPageModal.isOpen}
        onClose={createPageModal.onClose}
      />
    </PageLayout>
  );
}
