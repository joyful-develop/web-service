import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';

import { useErrorStore } from '@/app/routers/useErrorStore.ts';

// 1. 대기 큐 인프라를 위한 상태 정의
let isRefreshing = false; // 토큰 재발급 API가 현재 실행 중인지 여부
let refreshSubscribers: ((token: string) => void)[] = []; // 토큰이 갱신되기를 기다리는 대기 중인 요청들의 콜백 큐

// 토큰 갱신 완료 시, 대기 중이던 모든 요청에 새 토큰을 전달하고 실행시키는 함수
const onRefreshed = (token: string) => {
  refreshSubscribers.map((callback) => callback(token));
  refreshSubscribers = [];
};

// 토큰 갱신 도중 에러가 나거나 실패했을 때 큐를 비우는 함수
const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10 * 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
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
  async (error: Error | AxiosError) => {
    if (axios.isAxiosError(error)) {
      const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

      // 에러 응답 코드가 401이고, 이전에 이미 재시도한 요청이 아닌 경우 처리 시작
      if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
        // 💡 만약 현재 이미 다른 API 때문에 토큰 재발급(Refresh)이 진행 중이라면?
        if (isRefreshing) {
          return new Promise((resolve) => {
            // 대기 큐에 이 요청을 등록하고, 새 토큰이 나오면 헤더를 갈아끼우고 다시 axiosInstance를 호출(Resolve)하게 만듦
            addRefreshSubscriber((newToken: string) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
              }
              resolve(axiosInstance(originalRequest));
            });
          });
        }

        // 💡 여기서부터 최초로 401을 마주한 요청이 진행하는 재발급 메인 라인
        originalRequest._retry = true; // 무한 루프 방지 플래그 설정
        isRefreshing = true;

        try {
          const refreshToken = localStorage.getItem('refreshToken');

          // 만약 리프레시 토큰조차 없다면 즉시 만료 처리
          if (!refreshToken) {
            throw new Error('No refresh token available');
          }

          // 백엔드의 토큰 재발급(Refresh) API 호출 (순수 axios 인스턴스로 호출하여 인터셉터 체인 루프 방지)
          const response = await axios.post(`${axiosInstance.defaults.baseURL}/auth/refresh`, {
            refreshToken,
          });

          const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;

          // 새 토큰들 저장 장소 동기화 (만약 쿠키 방식이라면 이 부분은 브라우저가 자동 처리하므로 생략 가능)
          localStorage.setItem('accessToken', newAccessToken);
          if (newRefreshToken) {
            localStorage.setItem('refreshToken', newRefreshToken);
          }

          // 이 요청의 헤더를 새 토큰으로 즉시 교체
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }

          // 💡 큐에서 대기 중이던 다른 401 API 요청들에게도 새 토큰 배포 및 일괄 재시도 처리
          onRefreshed(newAccessToken);

          // 최초에 실패했던 현재 요청 복구하여 최종 Resolve 반환
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // 💡 리프레시 토큰마저 만료되었거나 에러가 난 경우 (진짜 세션 만료)
          refreshSubscribers = []; // 대기 큐 초기화

          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');

          // 전역 레이아웃이나 인터셉터 이벤트 바운더리로 튕겨내기 위한 커스텀 이벤트 발행 (이전 단계 연동)
          const event = new CustomEvent('auth-error', { detail: { status: 401 } });
          window.dispatchEvent(event);

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }
    }

    // 에러 등록
    useErrorStore.getState().setError(error);

    return Promise.reject(error);
  }
);

export default axiosInstance;
