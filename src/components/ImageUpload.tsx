import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

import { Gallery, Modal } from '.';
import { ImageIcon } from '../assets/icons';

export default function ImageUpload() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        border="1px dashed"
        borderColor="secondary.100"
        mx="auto"
        p="2"
        width="200px"
        borderRadius="16px"
        flexDirection="column"
        alignItems="center"
        cursor="pointer"
      >
        <ImageIcon />
        <Text textAlign="center" mt="2">
          Upload image
        </Text>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Gallery />
      </Modal>
    </>
  );
}
