import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { maxImageSize } from '../config';
import { FileType } from '../types';

interface FileUploadProps {
  loading?: boolean;
  handleUpload: (file: FileType) => void;
}

interface PreviewProps {
  file: {
    preview: string;
    name: string;
  };
  handleImageRemove: (name: string) => void;
}

const Preview = ({ file, handleImageRemove }: PreviewProps) => {
  return (
    <Box textAlign="center">
      <Image src={file.preview} />
      <Button
        mt="2"
        onClick={() => handleImageRemove(file.name)}
        variant="text"
      >
        Remove image
      </Button>
    </Box>
  );
};

export default function FileUpload({ loading, handleUpload }: FileUploadProps) {
  const [error, setError] = useState<string>('');
  const [fieldValue, setFieldValue] = useState<FileType | null>();

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
      }
    },
    multiple: false,
  });

  const handleImageRemove = () => {
    setFieldValue(null);
  };

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      if (fieldValue) {
        URL.revokeObjectURL(fieldValue.preview);
      }
    },
    [fieldValue],
  );

  const handleUploadFile = () => {
    handleUpload(fieldValue as FileType);
  };

  return (
    <Flex
      width="100%"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Flex
        // hasFile={fieldValue.files.length !== 0}
        {...getRootProps({ className: 'dropzone' })}
      >
        <input {...getInputProps()} />
        {!fieldValue && (
          <Box
            border="1px dashed"
            borderColor="secondary100"
            width="80%"
            mx="auto"
            p="3"
          >
            <Text textAlign="center">
              Drag 'n' drop image here, or click to select image
            </Text>
          </Box>
        )}
        {error && <Text color="error">{error}</Text>}
        {fieldValue && (
          <Preview file={fieldValue} handleImageRemove={handleImageRemove} />
        )}
      </Flex>
      <Button
        mt="2"
        loading={loading}
        disabled={!fieldValue}
        type="submit"
        onClick={handleUploadFile}
      >
        Upload
      </Button>
    </Flex>
  );
}
