import { useMutation, useQuery, useQueryClient } from 'react-query';

import { Site } from '../types';
import useAxios from './useAxios';

export const useSiteQuery = () => {
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

  return useMutation(({ data }: { data: Site }) => axios.post(`/sites`, data), {
    onSuccess: data => {
      queryClient.setQueryData('site', () => data.data);
    },
  });
};
