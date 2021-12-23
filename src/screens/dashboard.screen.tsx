import { Box, Container, Grid, Heading } from '@chakra-ui/react';
import {
  BarChart,
  LineChart,
  PageHeader,
  PageLayout,
  PreLoader,
  ProductStats,
} from 'components';

import { dashboardMenus } from '../config';

export default function Dashboard() {
  return (
    <PageLayout isLoading={false} heading="Dashboard" menus={dashboardMenus}>
      <PreLoader isLoading={false}>
        <Container maxW="container.xl">
          <PageHeader pageName="Site Analytics" />
          <Grid gridTemplateColumns="1fr 1fr 1fr" mb="4" gap="4">
            <ProductStats />
            <ProductStats />
            <ProductStats />
          </Grid>
          <Grid gridTemplateColumns="3fr 2fr" mt="8" gap="4">
            <Box height="500px">
              <Heading fontSize="xl" mb="2">
                Downloads
              </Heading>
              <LineChart />
            </Box>
            <Box height="500px">
              <Heading fontSize="xl" mb="2">
                Product Comparison
              </Heading>
              <BarChart />
            </Box>
          </Grid>
        </Container>
      </PreLoader>
    </PageLayout>
  );
}
