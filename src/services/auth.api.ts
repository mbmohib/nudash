import { useMutation } from 'react-query';

import { useAxios, useDispatch } from '../hooks';
import { removeAuth, setAuth } from '../store/slices/auth.slice';

interface loginData {
  data: {
    email: string;
    password: string;
  };
}

export const useLogin = () => {
  const axios = useAxios();
  const dispatch = useDispatch();

  return useMutation(({ data }: loginData) => axios.post(`/login`, data), {
    onSuccess: data => {
      dispatch(setAuth(data.data.data));
    },
  });
};

export const useRefreshToken = () => {
  const axios = useAxios();
  const dispatch = useDispatch();

  return useMutation(
    ({ data }: { data: any }) => axios.post(`/refresh-token`),
    {
      onSuccess: data => {
        dispatch(setAuth(data.data.data));
      },
    },
  );
};

export const useLogout = () => {
  const axios = useAxios();
  const dispatch = useDispatch();

  return useMutation(() => axios.post(`/logout`), {
    onSuccess: () => {
      dispatch(removeAuth());

      window.localStorage.setItem('logout', Date.now().toString());
    },
  });
};
