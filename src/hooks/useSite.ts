import { useMutation, useQuery, useQueryClient } from 'react-query';

import { Site } from '../types';
import useAxios from './useAxios';

interface createPageData {
  data: {
    name: string;
    path: string;
  };
}

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

export const useAddSite = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation(({ data }: createPageData) => axios.post(`/pages`, data), {
    onSuccess: data => {
      queryClient.setQueryData('site', () => data.data);
    },
  });
};
