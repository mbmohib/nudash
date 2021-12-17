import { Box, Container, Grid, Heading } from '@chakra-ui/react';
import {
  BarChart,
  Gallery,
  LineChart,
  PageHeader,
  PageLayout,
  PreLoader,
} from 'components';

import { galleryMenus } from '../config';

export default function Dashboard() {
  return (
    <PageLayout isLoading={false} heading="Gallery" menus={galleryMenus}>
      <PreLoader isLoading={false}>
        <Container maxW="container.xl">
          <PageHeader pageName="Images" />
          <Box bgColor="secondary.500" p="3" borderRadius="md">
            <Gallery />
          </Box>
        </Container>
      </PreLoader>
    </PageLayout>
  );
}
