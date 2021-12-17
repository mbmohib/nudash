import { Box, Container } from '@chakra-ui/react';
import { Gallery, PageHeader, PageLayout, PreLoader } from 'components';

import { galleryMenus } from '../config';

export default function GalleryIconsPage() {
  return (
    <PageLayout isLoading={false} heading="Gallery" menus={galleryMenus}>
      <PreLoader isLoading={false}>
        <Container maxW="container.xl">
          <PageHeader pageName="Icons" />
          <Box bgColor="secondary.500" p="3" borderRadius="md">
            <Gallery type="icon" />
          </Box>
        </Container>
      </PreLoader>
    </PageLayout>
  );
}
