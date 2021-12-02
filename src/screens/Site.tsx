import { Box, Container, Grid } from '@chakra-ui/react';
import { PageHeader, SiteData, SiteNav } from 'components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function Site() {
  return (
    <Box>
      <PageHeader pageName="Site" showActionButton={true} />
      <Container pt="80px">
        <Grid
          gridTemplateColumns="1fr 1fr"
          mt="4"
          gap="4"
          alignItems="flex-start"
        >
          <SiteData />
          <DndProvider backend={HTML5Backend}>
            <SiteNav />
          </DndProvider>
        </Grid>
      </Container>
    </Box>
  );
}
