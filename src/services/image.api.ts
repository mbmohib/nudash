import { useMutation, useQuery, useQueryClient } from 'react-query';

import { useAxios, useToast } from '../hooks';
import { FileType, Image, imgType } from '../types';

interface uploadImageData {
  data: {
    file: FileType;
    alt?: string;
  };
}

interface updateImageData {
  data: {
    alt?: string;
  };
}

export const useGetImages = (type: imgType) => {
  const axios = useAxios();

  return useQuery<Image[], Error>(
    ['images', type],
    async () => {
      const { data } = await axios.get(`/images?type=${type}`);

      return data;
    },
    {
      staleTime: 60 * 1000,
    },
  );
};

export const useUploadImage = () => {
  const axios = useAxios();
  const { showSuccessMessage } = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    ({ data }: uploadImageData) => axios.post(`/images`, data),
    {
      onSuccess: data => {
        showSuccessMessage('Image uploaded successfully');

        queryClient.setQueryData(['images', 'image'], images => [
          ...(images as Image[]),
          data.data,
        ]);
      },
    },
  );
};

export const useUpdateImage = (id: string | undefined) => {
  const axios = useAxios();
  const { showSuccessMessage } = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    ({ data }: updateImageData) => axios.put(`/images/${id}`, data),
    {
      onSuccess: data => {
        showSuccessMessage('Image updated successfully');

        queryClient.setQueryData(['images', 'image'], (images = []) => [
          ...(images as Image[]),
          data.data,
        ]);
      },
    },
  );
};
