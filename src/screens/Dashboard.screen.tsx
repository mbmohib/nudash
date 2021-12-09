import { Box, Container } from '@chakra-ui/react';
import {
  BarChart,
  LineChart,
  PageHeader,
  PageLayout,
  PreLoader,
} from 'components';

import { dashboardMenus } from '../config';

export default function Dashboard() {
  return (
    <PageLayout isLoading={false} heading="Dashboard" menus={dashboardMenus}>
      <PreLoader isLoading={false}>
        <Container maxW="container.xl">
          <PageHeader pageName="Site Analytics" />
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
