import { useMutation, useQuery, useQueryClient } from 'react-query';

import { Section } from '../types';
import useAxios from './useAxios';

interface createPageData {
  data: {
    name: string;
    path: string;
  };
}

export const usePageQuery = (slug: string | undefined) => {
  const axios = useAxios();

  return useQuery<Section, Error>(
    ['pages', slug],
    async () => {
      const { data } = await axios.get(`/pages/${slug}`);

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

export const useUpdatePage = (slug: string | undefined) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation(
    ({ data }: { data: Pick<Section, 'sections'>['sections'] }) =>
      axios.post(`/pages/${slug}`, data),
    {
      onSuccess: data => {
        queryClient.setQueryData(['pages', slug], () => data.data);
      },
    },
  );
};
