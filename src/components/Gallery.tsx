import { Box, Flex, Grid } from '@chakra-ui/react';

import { FileUpload, ImageUpload } from '.';

export default function Gallery() {
  const handleUpload = () => {
    //
  };

  return <FileUpload isLoading={false} handleUpload={handleUpload} />;
}
