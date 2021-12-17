import { useDisclosure } from '@chakra-ui/hooks';
import { Flex, Text } from '@chakra-ui/react';

import { Gallery, Modal } from '.';
import { ImageIcon } from '../assets/icons';
import { Image } from '../types';

interface ImageUploadProps {
  handleSaveData: (image: Image) => void;
}

export default function ImageUpload({ handleSaveData }: ImageUploadProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleImageInsert = (image: Image) => {
    onClose();
    handleSaveData(image);
  };

  return (
    <>
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
      <Modal size="6xl" isOpen={isOpen} onClose={onClose} heading="Gallery">
        <Gallery handleImageInsert={handleImageInsert} />
      </Modal>
    </>
  );
}
