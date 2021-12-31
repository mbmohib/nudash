import axios, { Axios, AxiosError, AxiosRequestConfig } from 'axios';
import { useMemo } from 'react';

import { useDispatch, useSelector } from '.';
import { apiEndpoint } from '../config';
import { removeAuth } from '../store/slices/auth.slice';

export default function useAxios() {
  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(removeAuth);
  };

  const axiosClient: Axios = useMemo(() => {
    const axiosInstance = axios.create({
      baseURL: apiEndpoint,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig): AxiosRequestConfig => {
        if (!config?.headers) {
          return config;
        }

        if (token) {
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
          logout();
        }

        return Promise.reject(error);
      },
    );

    return axiosInstance;

    // eslint-disable-next-line
  }, [token]);

  return axiosClient;
}
