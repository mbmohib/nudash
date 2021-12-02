import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { FileUpload } from '.';
import { useSiteQuery, useUpdateSite } from '../hooks/useSite';
import { Site } from '../types';

const schema = yup
  .object({
    name: yup.string().required('Please enter site name'),
    url: yup.string().required('Please enter site url'),
    tagline: yup.string(),
    description: yup.string(),
    logo: yup.string(),
  })
  .required();

export default function SiteData() {
  const updateSite = useUpdateSite();
  const { data } = useSiteQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: data?.name,
      url: data?.url,
      tagline: data?.tagline,
      description: data?.description,
      logo: data?.logo,
    },
  });

  const onSubmit = (values: Site) => {
    updateSite.mutate({ data: values });
  };

  const handleUpload = () => {
    // updateSite.mutate({ data });
  };

  return (
    <Box bgColor="secondary500" rounded="base" p="4">
      <Text fontSize="lg" mb="2">
        Site Data
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.name} mb="2">
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input id="name" placeholder="name" {...register('name')} />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.url} mb="2">
          <FormLabel htmlFor="url">Url</FormLabel>
          <Input id="url" placeholder="url" {...register('url')} />
          <FormErrorMessage>
            {errors.url && errors.url.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.tagline} mb="2">
          <FormLabel htmlFor="tagline">Tagline</FormLabel>
          <Input id="tagline" placeholder="tagline" {...register('tagline')} />
          <FormErrorMessage>
            {errors.tagline && errors.tagline.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.description} mb="2">
          <FormLabel htmlFor="description">Description</FormLabel>
          <Textarea
            id="description"
            placeholder="description"
            {...register('description')}
          />
          <FormErrorMessage>
            {errors.description && errors.description.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.logo} mb="2">
          <FormLabel htmlFor="description">Logo</FormLabel>
          <FileUpload handleUpload={handleUpload} />
          <FormErrorMessage>
            {errors.logo && errors.logo.message}
          </FormErrorMessage>
        </FormControl>

        <Box textAlign="right">
          <Button
            variant="solid"
            mt="3"
            type="submit"
            isLoading={updateSite.isLoading}
          >
            Update
          </Button>
        </Box>
      </form>
    </Box>
  );
}
