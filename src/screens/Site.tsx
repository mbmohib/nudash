import { Box, Container, Grid } from '@chakra-ui/react';

import { PageHeader, PreLoader, SiteData, SiteNav } from '../components';
import { useSiteQuery } from '../hooks/useSite';

export default function Site() {
  const siteQuery = useSiteQuery();

  const saveData = () => {
    // eslint-disable-next-line no-console
    console.log('saveData');
  };

  return (
    <Box>
      <PageHeader
        isLoading={siteQuery.isLoading}
        pageName="Site"
        handleSave={saveData}
        handleDelete={saveData}
      />
      <PreLoader isLoading={siteQuery.isLoading}>
        <Container pt="80px">
          <Grid
            gridTemplateColumns="1fr 1fr"
            mt="4"
            gap="4"
            alignItems="flex-start"
          >
            <SiteData data={siteQuery.data} />
            <SiteNav menus={siteQuery.data?.menus} />
          </Grid>
        </Container>
      </PreLoader>
    </Box>
  );
}
