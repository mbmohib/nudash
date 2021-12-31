import axios, { Axios, AxiosError, AxiosRequestConfig } from 'axios';
import { useMemo } from 'react';

import { useDispatch, useSelector } from '.';
import { apiEndpoint } from '../config';
import { removeAuth, setAuth } from '../store/slices/auth.slice';

export default function useAxios() {
  const dispatch = useDispatch();
  const { token, expiredIn } = useSelector(state => state.auth);

  const axiosClient: Axios = useMemo(() => {
    const axiosInstance = axios.create({
      baseURL: apiEndpoint,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    axiosInstance.interceptors.request.use(
      async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
        if (token && expiredIn && Date.now() >= expiredIn * 1000) {
          const { data, status } = await axios.post(
            '/refresh-token',
            {},
            config,
          );
          dispatch(setAuth(data.data));

          if (config.headers && status === 200) {
            // eslint-disable-next-line no-param-reassign
            config.headers.Authorization = `Bearer ${data.data.token}`;
          }
        } else if (token && config.headers) {
          // eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
    );

    axiosInstance.interceptors.response.use(
      undefined,
      (error: AxiosError): Promise<AxiosError> => {
        const statusCode = error.response ? error.response.status : null;

        if (statusCode === 401) {
          dispatch(removeAuth());
        }

        return Promise.reject(error);
      },
    );

    return axiosInstance;

    // eslint-disable-next-line
  }, [token]);

  return axiosClient;
}
