import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { PreLoader } from '..';
import { DeleteIcon } from '../../assets/icons';
import { maxImageSize } from '../../config';

interface ImageUploadComponentProps {
  placeholder?: string;
  handleUpload: (url: string) => void;
  handleRemove?: () => void;
}

export default function ImageUploadComponent({
  placeholder,
  handleUpload,
  handleRemove,
}: ImageUploadComponentProps) {
  const [error, setError] = useState<string>('');

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      const files = acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      );
      if (files[0].size > maxImageSize) {
        setError(
          `Please upload a image less than ${maxImageSize / 1024 / 1024}MB`,
        );
      } else {
        setError('');
        handleUpload(files[0].preview);
      }
    },
    multiple: false,
  });

  return (
    <Flex
      width="100%"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      position="relative"
    >
      <PreLoader isLoading={false} height="150px">
        <Flex {...getRootProps({ className: 'file-upload' })}>
          <input {...getInputProps()} />
          <Box
            border="1px dashed"
            borderColor="secondary.100"
            mx="auto"
            p="3"
            borderRadius="16px"
          >
            <Text textAlign="center" mt="2">
              {placeholder ||
                `Drag 'n' drop image here, or click to select image`}
            </Text>
          </Box>
          {error && <Text color="error">{error}</Text>}
        </Flex>
        <Button
          position="absolute"
          transform="translateX(-50%)"
          left="50%"
          bottom="-17px"
          variant="iconSolid"
          mb="1"
        >
          <DeleteIcon width={13} onClick={handleRemove} />
        </Button>
      </PreLoader>
    </Flex>
  );
}
