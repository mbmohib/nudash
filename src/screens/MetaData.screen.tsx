import { Container } from '@chakra-ui/react';
import { PageHeader, PageLayout, PreLoader, SiteData } from 'components';

import { siteMenus } from '../config';
import { useSiteQuery } from '../hooks/useSite';
import { Site } from '../types';

export default function MetaData() {
  const { data, isLoading } = useSiteQuery();

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
