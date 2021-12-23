import { Box, Button, Grid, Image } from '@chakra-ui/react';
import { useState } from 'react';
import { FiCheck } from 'react-icons/fi';

import { FileUpload, PreLoader } from '.';
import { EditIcon } from '../assets/icons';
import { useGetImages } from '../services/use-image.api';
import { Image as ImageType, imgType } from '../types';

interface GalleryProps {
  handleImageInsert?: (image: ImageType) => void;
  type?: imgType;
}

const activeStyle = {
  border: '1px',
  borderColor: 'secondary.100',
  boxShadow: 'glow',
};

export default function Gallery({
  handleImageInsert,
  type = 'image',
}: GalleryProps) {
  const imagesQuery = useGetImages(type);
  const [selectedImage, setSelectedImage] = useState<ImageType | undefined>();

  const handleImageSelect = () => {
    if (typeof handleImageInsert === 'function') {
      handleImageInsert(selectedImage as ImageType);
    }
  };

  return (
    <Box>
      <Box height="200px" width="80%" mx="auto">
        <FileUpload type={type} />
      </Box>
      <PreLoader isLoading={imagesQuery.isLoading} minHeight="200px">
        <Grid templateColumns="repeat(4, 1fr)" mt="6" gap="2" minHeight="200px">
          {imagesQuery?.data?.map(item => (
            <Box key={item.id}>
              <Box
                p="1"
                borderRadius="md"
                position="relative"
                cursor="pointer"
                {...(selectedImage?.id === item.id &&
                  handleImageInsert && { ...activeStyle })}
                onClick={() => setSelectedImage(item)}
                sx={{
                  ':hover .edit-image-btn': {
                    display: 'flex',
                  },
                }}
              >
                <Image borderRadius="md" src={item.url} alt={item.alt} />
                {selectedImage?.id === item.id && handleImageInsert && (
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
            </Box>
          ))}
        </Grid>
      </PreLoader>
      {handleImageInsert && (
        <Box textAlign="right" mt="4">
          <Button onClick={handleImageSelect}>Insert</Button>
        </Box>
      )}
    </Box>
  );
}
