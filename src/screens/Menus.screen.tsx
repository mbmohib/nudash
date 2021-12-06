import { Box, Container } from '@chakra-ui/react';
import { PageHeader, PageLayout, SiteNav } from 'components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { useSelector } from '../hooks';

export default function Menus() {
  const { menus } = useSelector(state => state.siteData);

  return (
    <Box>
      <PageLayout isLoading={false} heading="Site" menus={menus}>
        <Container>
          <PageHeader pageName="Menus" />

          <DndProvider backend={HTML5Backend}>
            <SiteNav />
          </DndProvider>
        </Container>
      </PageLayout>
    </Box>
  );
}
