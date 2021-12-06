import { Container } from '@chakra-ui/react';
import { PageHeader, PageLayout, PreLoader, SiteData } from 'components';

import { useSelector } from '../hooks';
import { useSiteQuery } from '../hooks/useSite';
import { Site } from '../types';

export default function MetaData() {
  const { data, isLoading } = useSiteQuery();
  const { menus } = useSelector(state => state.siteData);

  return (
    <PageLayout isLoading={isLoading} heading="Site" menus={menus}>
      <PreLoader isLoading={isLoading}>
        <Container>
          <PageHeader pageName="Meta Data" />
          <SiteData data={data as Site} />
        </Container>
      </PreLoader>
    </PageLayout>
  );
}
