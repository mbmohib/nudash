import { Box, Container, Grid } from '@chakra-ui/react';
import { PageHeader, PageLayout, SiteData } from 'components';

import { Pages } from '../types';

const menus: Pages[] = [
  {
    id: '001',
    name: 'Meta Data',
    path: '/site/meta-data',
  },
  {
    id: '002',
    name: 'Menus',
    path: '/site/menus',
  },
  {
    id: '003',
    name: 'Settings',
    path: '/site/settings',
  },
  {
    id: '004',
    name: 'SEO',
    path: '/site/seo',
  },
];

export default function Site() {
  return (
    <Box>
      <PageLayout isLoading={false} heading="Site" menus={menus}>
        <Container maxW="container.lg">
          <PageHeader pageName="Site" showActionButton={true} />
          <Grid
            gridTemplateColumns="1fr 1fr"
            mt="4"
            gap="4"
            alignItems="flex-start"
          >
            <SiteData />
          </Grid>
        </Container>
      </PageLayout>
    </Box>
  );
}
