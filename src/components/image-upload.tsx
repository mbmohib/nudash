import { useDisclosure } from '@chakra-ui/hooks';
import { Flex, Image, Text } from '@chakra-ui/react';

import { ComponentAction, Gallery, Modal } from '.';
import { ImageIcon, SymbolIcon } from '../assets/icons';
import { Image as ImageType, imgType } from '../types';

interface ImageUploadProps {
  src?: string;
  type?: imgType;
  handleUpload: (image: ImageType) => void;
  handleEdit?: () => void;
  handleRemove?: () => void;
}

const iconStyle = {
  width: '80px',
  padding: '2',
  border: '1px',
  borderColor: 'secondary.50',
};

export default function ImageUpload({
  handleUpload,
  src,
  handleEdit,
  handleRemove,
  type = 'image',
}: ImageUploadProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleImageInsert = (image: ImageType) => {
    onClose();
    handleUpload(image);
  };

  return (
    <>
      {src ? (
        <ComponentAction handleEdit={handleEdit} handleRemove={handleRemove}>
          <Image
            {...(type === 'icon' && { ...iconStyle })}
            borderRadius="lg"
            src={src}
          />
        </ComponentAction>
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
          mb="2"
        >
          {type === 'icon' ? <SymbolIcon /> : <ImageIcon />}
          <Text textAlign="center" mt="2">
            Upload {type === 'icon' ? 'Icon' : 'Image'}
          </Text>
        </Flex>
      )}
      <Modal
        size="6xl"
        isOpen={isOpen}
        onClose={onClose}
        heading={type === 'icon' ? 'Icon Gallery' : 'Image Gallery'}
      >
        <Gallery selectable type={type} handleImageInsert={handleImageInsert} />
      </Modal>
    </>
  );
}
