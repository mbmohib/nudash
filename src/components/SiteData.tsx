import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { ImageUpload } from '.';
import { useUpdateSite } from '../services/use-site.api';
import { Image, Site } from '../types';

interface SiteDataProps {
  data: Site;
}

const schema = yup
  .object({
    name: yup.string().required('Please enter site name'),
    url: yup.string().required('Please enter site url'),
    tagline: yup.string(),
    description: yup.string(),
    logo: yup.string(),
  })
  .required();

export default function SiteData({ data }: SiteDataProps) {
  const updateSite = useUpdateSite();

  const {
    getValues,
    setValue,
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

  const handleImageUpload = (image: Image) => {
    setValue('logo', image.url, { shouldValidate: true });
  };

  const handleImageRemove = () => {
    setValue('logo', '', { shouldValidate: true });
  };

  return (
    <Box bgColor="secondary.500" rounded="base" p="4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.name} mb="2">
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input id="name" placeholder="name" {...register('name')} />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.url} mb="2">
          <FormLabel htmlFor="url">Site URL</FormLabel>
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
          <ImageUpload
            src={getValues().logo}
            handleUpload={handleImageUpload}
            handleRemove={handleImageRemove}
          />
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
