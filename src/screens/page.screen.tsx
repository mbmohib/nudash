import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Grid } from '@chakra-ui/react';
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
import { useGetPage, useGetPages, useUpdatePage } from '../services/page.api';
import { useGetSite } from '../services/site.api';
import {
  handleAddColumn,
  removeLastUnusedRow,
  setInitialState,
} from '../store/slices';

export default function Page() {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { page } = useParams<{ page?: string }>();
  const createPageModal = useDisclosure();
  const siteQuery = useGetSite();
  const pageQuery = useGetPage(page);
  const pageQueries = useGetPages(siteQuery.data?.id);
  const updatePage = useUpdatePage(pageQuery.data?.path);
  const { sections } = useSelector(state => state.page);
  const [rowId, setRowId] = useState<number>(0);
  const [sectionId, setSectionId] = useState<string | undefined>();
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
        sectionId: sectionId || sections[0].id,
        rowId,
        columnCount: count,
      }),
    );

    onClose();
  };

  const handleOpenColumnLayout = (
    rowNumber: number,
    sectionNumber: string,
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
              <Box px="4">
                <PageHeader
                  pageName={pageQuery.data?.name}
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
              </Box>
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
