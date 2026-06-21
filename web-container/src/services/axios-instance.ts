import axios, { AxiosError, type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

import { useErrorStore } from '@/store/useErrorStore.ts';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10 * 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: Error | AxiosError) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 공통 규격 { success, message, data, code } 으로 반환
    return response.data;
  },
  (error: Error | AxiosError) => {
    if (axios.isAxiosError(error)) {
      const status = (error as AxiosError).status;

      if (status === 401) {
        // 토큰 재 발행 또는 로그인 페이지로 이동동
      }
    }

    // 에러 등록
    useErrorStore.getState().setError(error);

    return Promise.reject(error);
  }
);

export default axiosInstance;
