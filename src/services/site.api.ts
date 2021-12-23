import { useToast } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { useAxios } from '../hooks';
import { Site } from '../types';

export const useGetSite = () => {
  const axios = useAxios();

  return useQuery<Site, Error>(
    'site',
    async () => {
      const { data } = await axios.get(`/site`);

      return data;
    },
    {
      staleTime: 60 * 1000,
    },
  );
};

export const useUpdateSite = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(
    ({ data }: { data: Omit<Site, 'id'> }) => axios.post(`/sites`, data),
    {
      onSuccess: data => {
        toast({
          title: 'Site updated successfully',
          status: 'success',
          isClosable: true,
          variant: 'subtle',
          position: 'bottom-right',
        });
        queryClient.setQueryData('site', () => data.data);
      },
      onError: () => {
        toast({
          variant: 'subtle',
          title: 'Sorry! site update failed',
          status: 'error',
          isClosable: true,
        });
      },
    },
  );
};
