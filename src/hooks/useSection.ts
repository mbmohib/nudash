import { useQuery } from 'react-query';

import useAxios from './useAxios';

export default function useSection(pageId: string | undefined) {
  const axios = useAxios();

  // Create a query with the key `projects`
  return useQuery(
    [pageId, 'section'],
    async () => {
      // Fetch data from our API using Axios. We'll talk about the typing below
      const { data } = await axios.get(`/${pageId}/section`);

      // Return the data from the Axios response
      return data;
    },
    {
      staleTime: 60 * 1000,
    },
  );
}
