import { useToast } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { FileType, Image } from '../types';
import useAxios from './useAxios';

interface uploadImageData {
  data: {
    file: FileType;
    alt?: string;
  };
}

export const useGetImages = () => {
  const axios = useAxios();

  return useQuery<Image[], Error>(
    ['images'],
    async () => {
      const { data } = await axios.get(`/images`);

      return data;
    },
    {
      staleTime: 60 * 1000,
    },
  );
};

export const useUploadImage = () => {
  const axios = useAxios();
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    ({ data }: uploadImageData) => axios.post(`/images`, data),
    {
      onSuccess: data => {
        toast({
          title: 'Image uploaded successfully',
          status: 'success',
          isClosable: true,
          variant: 'subtle',
          position: 'bottom-right',
        });

        queryClient.setQueryData(['images'], images => [
          ...(images as Image[]),
          data.data,
        ]);
      },
    },
  );
};
