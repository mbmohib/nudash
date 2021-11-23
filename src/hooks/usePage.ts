import { useQuery } from 'react-query';

import useAxios from './useAxios';

export default function usePage(pageId: string | undefined) {
  const axios = useAxios();

  // Create a query with the key `projects`
  return useQuery(
    ['pages', pageId],
    async () => {
      // Fetch data from our API using Axios. We'll talk about the typing below
      const { data } = await axios.get(`/pages/${pageId}`);

      // Return the data from the Axios response
      return data;
    },
    {
      staleTime: 60 * 1000,
    },
  );
}
