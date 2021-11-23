import { useQuery } from 'react-query';

import { Section } from '../types';
import useAxios from './useAxios';

export default function usePage(pageId: string | undefined) {
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
}
