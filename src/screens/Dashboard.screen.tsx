import { Container } from '@chakra-ui/react';
import { PageHeader, PageLayout, PreLoader } from 'components';

import { dashboardMenus } from '../config';

export default function Dashboard() {
  return (
    <PageLayout isLoading={false} heading="Dashboard" menus={dashboardMenus}>
      <PreLoader isLoading={false}>
        <Container maxW="container.xl">
          <PageHeader pageName="Site Analytics" />
        </Container>
      </PreLoader>
    </PageLayout>
  );
}
