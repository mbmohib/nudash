import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Button, Grid, Image } from '@chakra-ui/react';
import { useState } from 'react';
import { FiCheck } from 'react-icons/fi';

import { FileUpload, ImageDetails, PreLoader } from '.';
import { EditIcon } from '../assets/icons';
import { useGetImages } from '../services/image.api';
import { Image as ImageType, imgType } from '../types';

interface GalleryProps {
  selectable?: boolean;
  handleImageInsert?: (image: ImageType) => void;
  type?: imgType;
}

const activeStyle = {
  border: '1px',
  borderColor: 'secondary.100',
  boxShadow: 'glow',
};

export default function Gallery({
  selectable,
  handleImageInsert,
  type = 'image',
}: GalleryProps) {
  const imagesQuery = useGetImages(type);
  const [selectedImage, setSelectedImage] = useState<ImageType | undefined>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleImageSelect = () => {
    if (typeof handleImageInsert === 'function') {
      handleImageInsert(selectedImage as ImageType);
    }
  };

  const handleImageEditClick = (image: ImageType) => {
    setSelectedImage(image);
    onOpen();
  };

  return (
    <Box>
      <Box height="200px" width="80%" mx="auto">
        <FileUpload type={type} />
      </Box>
      <PreLoader isLoading={imagesQuery.isLoading} minHeight="200px">
        <Grid
          templateColumns={
            type === 'icon' ? 'repeat(6, 1fr)' : 'repeat(4, 1fr)'
          }
          mt="6"
          gap="2"
          minHeight="200px"
        >
          {imagesQuery?.data?.map(item => (
            <Box key={item.id}>
              <Box
                p="1"
                borderRadius="md"
                position="relative"
                cursor="pointer"
                {...(selectedImage?.id === item.id &&
                  selectable && { ...activeStyle })}
                onClick={() =>
                  selectable
                    ? setSelectedImage(item)
                    : handleImageEditClick(item)
                }
                sx={{
                  ':hover .edit-image-btn': {
                    display: 'flex',
                  },
                }}
              >
                <Image borderRadius="md" src={item.url} alt={item.alt} />
                {selectedImage?.id === item.id && selectable && (
                  <Box
                    position="absolute"
                    top="2"
                    left="2"
                    bgColor="secondary.200"
                    p="4px"
                    borderRadius="sm"
                  >
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
                  data-testid="edit"
                  onClick={() => handleImageEditClick(item)}
                >
                  <EditIcon />
                </Button>
              </Box>
            </Box>
          ))}
        </Grid>
      </PreLoader>
      {selectable && (
        <Box textAlign="right" mt="4">
          <Button disabled={!selectedImage?.id} onClick={handleImageSelect}>
            Insert
          </Button>
        </Box>
      )}
      <ImageDetails
        type={type}
        isOpen={isOpen}
        onClose={onClose}
        image={selectedImage}
      />
    </Box>
  );
}
