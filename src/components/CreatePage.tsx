import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Modal } from '.';
import { useAddSite } from '../hooks/useSite';

interface CreatePageProps {
  isOpen: boolean;
  onClose: () => void;
}

const schema = yup
  .object({
    name: yup.string().required('Please enter page name'),
    path: yup.string().required('Please enter page slug'),
  })
  .required();

export default function CreatePage({ isOpen, onClose }: CreatePageProps) {
  const addPage = useAddSite();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: { name: string; path: string }) => {
    addPage.mutate(
      { data },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} heading="Create Page">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.name} mb="2">
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input id="name" placeholder="name" {...register('name')} />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.path}>
          <FormLabel htmlFor="path">Slug</FormLabel>
          <Input id="path" placeholder="slug" {...register('path')} />
          <FormErrorMessage>
            {errors.path && errors.path.message}
          </FormErrorMessage>
        </FormControl>
        <Box textAlign="right">
          <Button variant="solid" mt="3" type="submit">
            Create
          </Button>
        </Box>
      </form>
    </Modal>
  );
}
