import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { maxImageSize } from '../config';
import { useUploadImage } from '../services/use-image.api';
import { FileType, imgType } from '../types';

interface FileUploadProps {
  type?: imgType;
}
interface PreviewProps {
  file: FileType | undefined;
}

const Preview = ({ file }: PreviewProps) => {
  return (
    <Box width="60%" mx="auto">
      <Box
        position="relative"
        width="100%"
        height="100%"
        backgroundImage={file?.preview}
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        borderRadius="16px"
      >
        <Box
          borderRadius="16px"
          bg="secondary.100"
          width="100%"
          height="100%"
          position="absolute"
          left="0"
          top="0"
          opacity="0.7"
        ></Box>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          sx={{ transform: 'translate(-50%, -50%)' }}
        >
          <Spinner color="red.500" />
        </Box>
      </Box>
    </Box>
  );
};

export default function FileUpload({ type }: FileUploadProps) {
  const [error, setError] = useState<string>('');
  const [fieldValue, setFieldValue] = useState<FileType | undefined>();
  const uploadImage = useUploadImage();

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
        setFieldValue(files[0]);
        uploadImage.mutate(
          {
            data: { file: files[0] },
          },
          {
            onSuccess: () => {
              setFieldValue(undefined);
            },
          },
        );
      }
    },
    multiple: false,
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      if (fieldValue) {
        URL.revokeObjectURL(fieldValue.preview);
      }
    },
    [fieldValue],
  );

  return (
    <Flex
      height="full"
      width="full"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Flex
        width="full"
        height="full"
        {...getRootProps({ className: 'file-upload' })}
      >
        <input {...getInputProps()} />
        {!fieldValue && (
          <Flex
            border="1px dashed"
            borderColor="secondary.100"
            mx="auto"
            p="3"
            width="full"
            borderRadius="16px"
            alignItems="center"
            justifyContent="center"
          >
            <Text>
              Drag 'n' drop {type === 'icon' ? 'icon' : 'image'} here, or click
              to select {type === 'icon' ? 'icon' : 'image'}
            </Text>
          </Flex>
        )}
        {error && <Text color="error">{error}</Text>}
        {uploadImage.isLoading && <Preview file={fieldValue} />}
      </Flex>
    </Flex>
  );
}
