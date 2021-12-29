import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Image,
  Input,
  Text,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Modal } from '.';
import { DeleteIcon } from '../assets/icons';
import { useDeleteImage, useUpdateImage } from '../services/image.api';
import { Image as ImageType, imgType } from '../types';

interface ImageDetailsProps {
  image: ImageType | undefined;
  isOpen: boolean;
  type?: imgType;
  onClose: () => void;
}

const iconStyle = {
  width: '200px',
  padding: '2',
  border: '1px',
  borderColor: 'secondary.50',
};

const schema = yup
  .object({
    alt: yup.string().required('Please enter image name'),
  })
  .required();

export default function ImageDetails({
  isOpen,
  onClose,
  image,
  type = 'image',
}: ImageDetailsProps) {
  const updateImage = useUpdateImage(image?.id);
  const deleteImage = useDeleteImage(image?.id);
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (image?.alt) {
      setValue('alt', image.alt, { shouldDirty: true });
    }
  }, [image]);

  const onSubmit = (data: { alt: string }) => {
    updateImage.mutate({
      data: {
        alt: data.alt,
      },
    });
  };

  const handleDeleteImage = async () => {
    await deleteImage.mutate();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      heading={type === 'icon' ? 'Icon Details' : 'Image Details'}
      size={type === 'icon' ? '3xl' : '5xl'}
    >
      <Grid
        gridTemplateColumns={type === 'icon' ? '1fr 2fr' : '2fr 2fr'}
        gap="3"
      >
        <Image
          borderRadius="lg"
          src={image?.url}
          alt={image?.alt}
          {...(type === 'icon' && { ...iconStyle })}
        />
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex gridGap="2">
              <FormControl isInvalid={!!errors.alt} mb="2">
                <FormLabel htmlFor="alt">Name</FormLabel>
                <Input id="alt" placeholder="image name" {...register('alt')} />
                <FormErrorMessage>
                  {errors.alt && errors.alt.message}
                </FormErrorMessage>
              </FormControl>

              <Button
                variant="ghost"
                mt="4"
                type="submit"
                isLoading={updateImage.isLoading}
              >
                Update
              </Button>
            </Flex>
          </form>
          <Box mt="4">
            <Flex
              gridGap="2"
              alignItems="center"
              justifyContent="space-between"
              mt="2"
            >
              <Text>Original (PNG)</Text>
              <Button variant="outline" size="sm">
                Copy Link
              </Button>
            </Flex>
            <Flex
              gridGap="2"
              alignItems="center"
              justifyContent="space-between"
              mt="2"
            >
              <Text>Placeholder</Text>
              <Button variant="outline" size="sm">
                Copy Link
              </Button>
            </Flex>
          </Box>

          <Box textAlign="right" mt="4">
            <Button
              leftIcon={<DeleteIcon />}
              variant="solid"
              colorScheme="secondary"
              mt="4"
              onClick={handleDeleteImage}
              isLoading={deleteImage.isLoading}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Grid>
    </Modal>
  );
}
