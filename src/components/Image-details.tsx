import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Text,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Modal } from '.';
import { DeleteIcon } from '../assets/icons';
import { useAddPage } from '../services/page.api';
import { Image as ImageType, imgType } from '../types';

interface ImageDetailsProps {
  image: ImageType | undefined;
  isOpen: boolean;
  type: imgType;
  onClose: () => void;
}

const schema = yup
  .object({
    alt: yup.string(),
  })
  .required();

export default function CreatePage({
  isOpen,
  onClose,
  image,
  type,
}: ImageDetailsProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      alt: image?.alt,
    },
  });

  const onSubmit = (data: { name: string; path: string }) => {
    //
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      heading={type === 'icon' ? 'Icon Details' : 'Image Details'}
    >
      <Image borderRadius="lg" mb="4" src={image?.url} alt={image?.alt} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex gridGap="2">
          <FormControl isInvalid={!!errors.alt} mb="2">
            <FormLabel htmlFor="alt">Name</FormLabel>
            <Input id="alt" placeholder="image name" {...register('alt')} />
            <FormErrorMessage>
              {errors.alt && errors.alt.message}
            </FormErrorMessage>
          </FormControl>

          <Button variant="ghost" mt="4" type="submit">
            Update
          </Button>
        </Flex>

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
            type="submit"
          >
            Delete
          </Button>
        </Box>
      </form>
    </Modal>
  );
}
