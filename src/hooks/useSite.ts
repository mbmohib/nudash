import { useQuery } from 'react-query';

import { Site } from '../types';
import useAxios from './useAxios';

export default function useSite() {
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
}
