/* eslint-disable import/prefer-default-export */
import { useQuery } from 'react-query';

import { useAxios } from '../hooks';

interface loginData {
  data: {
    email: string;
    password: string;
  };
}

export const useGetLeads = () => {
  const axios = useAxios();

  return useQuery<any, Error>(
    'leads',
    async () => {
      const { data } = await axios.get(`/leads`);

      return data;
    },
    {
      staleTime: 60 * 1000,
    },
  );
};
