import { Box, Button, Grid, Image } from '@chakra-ui/react';
import { useState } from 'react';
import { FiCheck } from 'react-icons/fi';

import { FileUpload, PreLoader } from '.';
import { EditIcon } from '../assets/icons';
import { useGetImages } from '../hooks/useImage';
import { Image as ImageType } from '../types';

interface GalleryProps {
  handleImageInsert: (image: ImageType) => void;
}

const activeStyle = {
  border: '1px',
  borderColor: 'secondary.100',
  boxShadow: 'glow',
};

export default function Gallery({ handleImageInsert }: GalleryProps) {
  const imagesQuery = useGetImages();
  const [selectedImage, setSelectedImage] = useState<ImageType | undefined>();

  const handleUpload = () => {
    //
  };
  console.log('selectedImage :>> ', selectedImage);

  const handleImageSelect = () => {
    handleImageInsert(selectedImage as ImageType);
  };

  return (
    <Box>
      <Box height="200px" width="80%" mx="auto">
        <FileUpload isLoading={false} handleUpload={handleUpload} />
      </Box>
      <PreLoader isLoading={imagesQuery.isLoading} minHeight="200px">
        <Grid templateColumns="repeat(4, 1fr)" mt="6" gap="2" minHeight="200px">
          {imagesQuery?.data?.map(item => (
            <Box
              key={item.id}
              p="1"
              borderRadius="md"
              position="relative"
              cursor="pointer"
              {...(selectedImage?.id === item.id && { ...activeStyle })}
              onClick={() => setSelectedImage(item)}
              sx={{
                ':hover .edit-image-btn': {
                  display: 'flex',
                },
              }}
            >
              <Image borderRadius="md" src={item.url} alt={item.alt} />
              {selectedImage?.id === item.id && (
                <Box position="absolute" top="2" left="2">
                  <FiCheck />
                </Box>
              )}
              <Button
                className="edit-image-btn"
                display="none"
                variant="iconSolid"
                position="absolute"
                top="2"
                right="2"
              >
                <EditIcon />
              </Button>
            </Box>
          ))}
        </Grid>
      </PreLoader>
      <Box textAlign="right" mt="4">
        <Button onClick={handleImageSelect}>Insert</Button>
      </Box>
    </Box>
  );
}
