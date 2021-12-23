import { useMutation, useQuery, useQueryClient } from 'react-query';

import { useAxios, useToast } from '../hooks';
import { Page, Pages } from '../types';

interface createPageData {
  data: {
    name: string;
    path: string;
  };
}

export const useGetPage = (slug: string | undefined) => {
  const axios = useAxios();

  return useQuery<Page, Error>(
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

export const useGetPages = (siteId: string | undefined) => {
  const axios = useAxios();

  return useQuery<Pages[], Error>(
    [siteId, 'pages'],
    async () => {
      const { data } = await axios.get(`/${siteId}/pages/`);

      return data;
    },
    {
      staleTime: 60 * 1000,
      enabled: !!siteId,
    },
  );
};

export const useAddPage = (siteId: string | undefined) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation(
    ({ data }: createPageData) => axios.post(`/${siteId}/pages`, data),
    {
      onSuccess: data => {
        queryClient.setQueryData([siteId, 'pages'], () => data.data);
      },
    },
  );
};

export const useUpdatePage = (slug: string | undefined) => {
  const axios = useAxios();
  const { showSuccessMessage } = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    ({ data }: { data: Pick<Page, 'sections'>['sections'] }) =>
      axios.post(`/pages/${slug}`, data),
    {
      onSuccess: data => {
        showSuccessMessage('Page updated successfully!');
        queryClient.setQueryData(['pages', slug], () => data.data);
      },
    },
  );
};
