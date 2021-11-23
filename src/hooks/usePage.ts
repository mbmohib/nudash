import { useMutation, useQuery, useQueryClient } from 'react-query';

import { Section } from '../types';
import useAxios from './useAxios';

interface createPageData {
  data: {
    name: string;
    path: string;
  };
}

export const usePageQuery = (pageId: string | undefined) => {
  const axios = useAxios();

  return useQuery<Section, Error>(
    ['pages', pageId],
    async () => {
      const { data } = await axios.get(`/pages/${pageId}`);

      return data;
    },
    {
      staleTime: 60 * 1000,
    },
  );
};

export const useAddPage = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation(({ data }: createPageData) => axios.post(`/pages`, data), {
    onSuccess: data => {
      queryClient.setQueryData('site', () => data.data);
    },
  });
};
