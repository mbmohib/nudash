import { Box, Container } from '@chakra-ui/react';
import { PageHeader, PageLayout, SiteNav } from 'components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { siteMenus } from '../config';

export default function Menus() {
  return (
    <Box>
      <PageLayout isLoading={false} heading="Site" menus={siteMenus}>
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
