import axios, { AxiosError } from 'axios';

import type { AlertType, ApiErrorBody, ApiResponse } from '@/shared/types/api.types.ts';

export const errorParser = (
  error: Error | AxiosError | string,
  defaultMessage?: string | null,
  defaultDescription?: string | null
): ApiErrorBody => {
  let message: string = '';
  let description: string = '';
  let errorType: AlertType = 'error';
  let errorCode: string = '';
  let status: number = -1;

  if (defaultMessage) {
    message = defaultMessage;
    description = defaultDescription || '';

    if (axios.isAxiosError<ApiResponse<null>>(error)) {
      const { response } = error;

      if (response) {
        status = response.status || 200;
      }
    }
  } else {
    if (axios.isAxiosError<ApiResponse<null>>(error)) {
      const { request, response } = error;

      if (response) {
        const errorData = response.data;
        errorType = errorData.errorType || 'error';
        errorCode = errorData.errorCode || '';
        status = response.status || 200;

        switch (status) {
          case 401:
            message = '인증 만료';
            description = '로그인이 필요합니다. 로그인 페이지로 이동합니다.';
            window.location.href = '/login';
            break;
          case 403:
            message = '인증 만료';
            description = '로그인이 필요합니다. 로그인 페이지로 이동합니다.';
            break;
          default:
            message = defaultMessage || errorData?.message || error.message;
            description = defaultMessage || errorData?.description || error.stack || '';
            break;
        }
      } else if (request) {
        message = 'Api 서버로부터 응답이 없습니다. 네트워크 연결을 확인해주세요.';
        description = request;
      } else {
        message = 'Api 요청을 설정하는 중에 에러가 발생했습니다.';
        description = request;
      }
    } else if (error instanceof Error) {
      message = defaultMessage || error?.message;
      description = error?.stack || '';
    } else if (typeof error === 'string') {
      message = defaultMessage || error;
    }
  }

  if (!message) {
    message = '알 수 없는 에러가 발생했습니다.';
  }

  return {
    message: message,
    description: description,
    errorType: errorType,
    errorCode: errorCode,
    status: status,
  };
};
