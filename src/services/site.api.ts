import { useMutation, useQuery, useQueryClient } from 'react-query';

import { useAxios, useToast } from '../hooks';
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
  const { showSuccessMessage, showErrorMessage } = useToast();

  return useMutation(
    ({ data }: { data: Omit<Site, 'id'> }) => axios.post(`/sites`, data),
    {
      onSuccess: data => {
        showSuccessMessage('Site updated successfully');
        queryClient.setQueryData('site', () => data.data);
      },
      onError: () => {
        showErrorMessage('Sorry! site update failed');
      },
    },
  );
};
