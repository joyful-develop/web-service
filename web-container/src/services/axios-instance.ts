import axios, { AxiosError, type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

import type { ApiErrorResponse } from '@/types/api.ts';

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
    // 백엔드 공통 규격인 { success, message, data, code } 구조가 반환됨
    return response.data;
  },
  (error: Error | AxiosError) => {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
      const { response } = error;

      if (response) {
        // 서버가 응답을 반환했으나 상태 코드가 2XX 범위를 벗어난 경우 (4XX, 5XX)
        const status = response.status;
        const errorData = response.data; // ApiErrorResponse 타입으로 추론됨
        const errorMessage = errorData?.message;

        switch (status) {
          case 401:
            console.error('인증 오류: 로그인이 필요합니다.');
            // 필요 시 토큰 재발급 로직 구현 또는 리다이렉트
            // localStorage.removeItem('accessToken');
            // window.location.href = '/login';
            break;
          case 403:
            console.error('권한 오류: 접근 권한이 없습니다.');
            break;
          case 404:
            console.error('요청 오류: 존재하지 않는 리소스 입니다.');
            break;
          case 500:
            console.error('서버 오류: 잠시 후 다시 시도해 주세요.');
            break;
          default:
            console.error(`오류 상태코드 [${status}]: ${errorMessage}`);
        }
      } else {
        // 서버 응답 자체가 없는 경우(네트워크 끊김, 타임아웃 등)
        console.error('네트워크 오류 또는 서버가 응답하지 않습니다.');
      }
    } else {
      // Axios 에러가 아닌 일반 javascript 런타임 오류
      console.error('오류: ', error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
