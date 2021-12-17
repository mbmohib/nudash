import { useDisclosure } from '@chakra-ui/hooks';
import { Flex, Image, Text } from '@chakra-ui/react';

import { ComponentActionWithData, Gallery, Modal } from '.';
import { ImageIcon } from '../assets/icons';
import { Image as ImageType } from '../types';

interface ImageUploadProps {
  src?: string;
  handleUpload: (image: ImageType) => void;
  handleEdit?: () => void;
  handleRemove?: () => void;
}

export default function ImageUpload({
  handleUpload,
  src,
  handleEdit,
  handleRemove,
}: ImageUploadProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleImageInsert = (image: ImageType) => {
    onClose();
    handleUpload(image);
  };

  return (
    <>
      {src ? (
        <ComponentActionWithData
          handleEdit={handleEdit}
          handleRemove={handleRemove}
        >
          <Image borderRadius="lg" src={src} />
        </ComponentActionWithData>
      ) : (
        <Flex
          border="1px dashed"
          borderColor="secondary.100"
          mx="auto"
          p="2"
          borderRadius="16px"
          flexDirection="column"
          alignItems="center"
          cursor="pointer"
          onClick={onOpen}
        >
          <ImageIcon />
          <Text textAlign="center" mt="2">
            Upload image
          </Text>
        </Flex>
      )}
      <Modal size="6xl" isOpen={isOpen} onClose={onClose} heading="Gallery">
        <Gallery handleImageInsert={handleImageInsert} />
      </Modal>
    </>
  );
}
