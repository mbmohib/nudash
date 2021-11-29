import axios, { Axios, AxiosError, AxiosRequestConfig } from 'axios';
import { useMemo } from 'react';

// import { useAuth } from '.';
import { apiEndpoint } from '../config';

export default function useAxios() {
  // const { token, logout } = useAuth();
  const token = undefined;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const logout = () => {};

  const axiosClient: Axios = useMemo(() => {
    const axiosInstance = axios.create({
      baseURL: '/', // apiEndpoint,
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
