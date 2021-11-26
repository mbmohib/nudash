import { Box, Container, Grid } from '@chakra-ui/react';
import { PageHeader, PreLoader, SiteData, SiteNav } from 'components';
import { useSiteQuery } from 'hooks/useSite';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function Site() {
  const siteQuery = useSiteQuery();

  return (
    <Box>
      <PageHeader isLoading={siteQuery.isLoading} pageName="Site" />
      <PreLoader isLoading={siteQuery.isLoading}>
        <Container pt="80px">
          <Grid
            gridTemplateColumns="1fr 1fr"
            mt="4"
            gap="4"
            alignItems="flex-start"
          >
            <SiteData data={siteQuery.data} />
            <DndProvider backend={HTML5Backend}>
              <SiteNav menus={siteQuery.data?.menus} />
            </DndProvider>
          </Grid>
        </Container>
      </PreLoader>
    </Box>
  );
}
