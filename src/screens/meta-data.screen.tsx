import { Container } from '@chakra-ui/react';
import { PageHeader, PageLayout, PreLoader, SiteData } from 'components';

import { siteMenus } from '../config';
import { useGetSite } from '../services/use-site.api';
import { Site } from '../types';

export default function MetaData() {
  const { data, isLoading } = useGetSite();

  return (
    <PageLayout isLoading={isLoading} heading="Site" menus={siteMenus}>
      <PreLoader isLoading={isLoading}>
        <Container>
          <PageHeader pageName="Meta Data" />
          <SiteData data={data as Site} />
        </Container>
      </PreLoader>
    </PageLayout>
  );
}
