import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Container, Grid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useParams } from 'react-router-dom';

import {
  CreatePage,
  DraggableComponentsContainer,
  PageHeader,
  PageLayout,
  PreLoader,
  PredefinedColumns,
  Section,
} from '../components';
import { useDispatch, useSelector } from '../hooks';
import { usePageQueries, usePageQuery, useUpdatePage } from '../hooks/usePage';
import { useSiteQuery } from '../hooks/useSite';
import {
  handleAddColumn,
  removeLastUnusedRow,
  setInitialState,
} from '../store/slices/page';

export default function Page() {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { page } = useParams<{ page?: string }>();
  const createPageModal = useDisclosure();
  const siteQuery = useSiteQuery();
  const pageQuery = usePageQuery(page);
  const pageQueries = usePageQueries(siteQuery.data?.id);
  const updatePage = useUpdatePage(pageQuery.data?.path);
  const { sections } = useSelector(state => state.page);
  const [rowId, setRowId] = useState<number>(0);
  const [sectionId, setSectionId] = useState<number>(0);
  const notInitialRow = sections[0]?.rows[0]?.columns?.length > 0;

  const handleSave = () => {
    updatePage.mutate({ data: sections });
  };

  useEffect(() => {
    if (pageQuery.data?.sections && pageQuery.isFetched) {
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
    <>
      <PageLayout
        isLoading={false}
        handleAdd={handlePageAdd}
        heading="Pages"
        menus={pageQueries.data}
      >
        <PreLoader isLoading={pageQuery.isLoading}>
          <DndProvider backend={HTML5Backend}>
            <Grid gridTemplateColumns="1fr 350px">
              <Container maxW="container.lg">
                <PageHeader
                  pageName={pageQuery.data?.name}
                  showActionButton
                  handleSave={handleSave}
                />
                {sections.map((section, index) => (
                  <Section
                    section={section}
                    key={section.id}
                    index={index}
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
        </PreLoader>
      </PageLayout>

      <CreatePage
        siteId={siteQuery.data?.id}
        isOpen={createPageModal.isOpen}
        onClose={createPageModal.onClose}
      />
    </>
  );
}
