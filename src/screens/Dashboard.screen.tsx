import { Box, Container, Grid } from '@chakra-ui/react';
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
          <Box height="500px">
            <BarChart />
          </Box>
          <Box height="500px" mt="4">
            <LineChart />
          </Box>
        </Container>
      </PreLoader>
    </PageLayout>
  );
}
