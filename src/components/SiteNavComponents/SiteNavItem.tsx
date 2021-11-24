import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Input,
  Switch,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup
  .object({
    label: yup.string().required('Please enter site label'),
    url: yup.string().required('Please enter site url'),
    isOpenNew: yup.boolean(),
  })
  .required();

interface SiteNavProps {
  isLoading: boolean;
  menu: {
    label: string;
    url: string;
    isOpenNew: boolean;
  };
  handleSaveData: (values: any) => void;
  handleDeleteNav: (values: any) => void;
}

export default function SiteNav({
  isLoading,
  menu,
  handleSaveData,
  handleDeleteNav,
}: SiteNavProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      label: menu.label,
      url: menu.url,
      isOpenNew: menu.isOpenNew,
    },
  });

  return (
    <form onSubmit={handleSubmit(handleSaveData)}>
      <Grid gridTemplateColumns="3fr 1fr" gridTemplateRows="1f 1fr" gap="2">
        <FormControl isInvalid={!!errors.label} mb="2">
          <FormLabel htmlFor="label">Label</FormLabel>
          <Input id="label" placeholder="label" {...register('label')} />
          <FormErrorMessage>
            {errors.label && errors.label.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.isOpenNew} mb="2">
          <FormLabel htmlFor="isOpenNew">New?</FormLabel>
          <Switch id="isOpenNew" {...register('isOpenNew')} />
          <FormErrorMessage>
            {errors.isOpenNew && errors.isOpenNew.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.url} mb="2">
          <FormLabel htmlFor="url">URL</FormLabel>
          <Input id="url" placeholder="url" {...register('url')} />
          <FormErrorMessage>
            {errors.url && errors.url.message}
          </FormErrorMessage>
        </FormControl>
      </Grid>
      <Flex justifyContent="flex-end" mt="1">
        <Button variant="link" mr="1" type="submit" isLoading={isLoading}>
          Save
        </Button>
        <Button variant="link" onClick={handleDeleteNav}>
          Delete
        </Button>
      </Flex>
    </form>
  );
}
