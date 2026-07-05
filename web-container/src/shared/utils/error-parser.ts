import { isRouteErrorResponse } from 'react-router';

import axios from 'axios';

import type { AlertType, ApiError, ApiResponse } from '@/shared/types/api.types.ts';

export const errorParser = (
  error: unknown,
  defaultMessage?: string | null,
  defaultDescription?: string | null
): ApiError => {
  let type: AlertType = 'error';
  let status: number = 200;
  let code: string = '';
  let message: string = '';
  let description: string = '';

  if (defaultMessage) {
    message = defaultMessage;
    description = defaultDescription || '';

    if (axios.isAxiosError<ApiResponse<null>>(error)) {
      const { response } = error;

      if (response) {
        status = response.status;
      }
    }
  } else if (error) {
    if (axios.isAxiosError<ApiResponse<null>>(error)) {
      const { request, response } = error;

      console.log(response);
      if (response) {
        const apiError = response.data.error as ApiError;
        type = apiError.type || 'error';
        code = apiError.code || '';
        status = apiError.status;

        switch (status) {
          case 401:
            message = '인증 만료';
            description = '로그인이 필요합니다. 로그인 페이지로 이동합니다.';
            window.location.href = '/login';
            break;
          case 403:
            message = '권한 부족';
            description = '이 작업을 수행할 권한이 없습니다.';
            break;
          default:
            message = apiError.message
              ? `${apiError.message} (${status}, ${error.code}, ${apiError.code})`
              : error.message;
            description = apiError.description || '알 수 없는 오류가 발생 했습니다.';
            break;
        }
      } else if (request) {
        message = 'Api 서버로부터 응답이 없습니다. 네트워크 연결을 확인해주세요.';
        description = request;
      } else {
        message = 'Api 요청을 설정하는 중에 에러가 발생했습니다.';
        description = request;
      }
    } else if (isRouteErrorResponse(error)) {
      const errorData = error.data as ApiError;

      message = errorData.message || 'Router Error';
      description = errorData.description || '요청하신 페이지에 문제가 있습니다.';
      code = errorData.code || '';
      status = errorData.status || error.status;
    } else if (error instanceof Error) {
      message = error?.message;
      description = error?.stack || '';
    } else if (typeof error === 'string') {
      message = error;
    }
  }

  if (!message) {
    message = '알 수 없는 오류가 발생 했습니다.';
  }

  return {
    type: type,
    message: message,
    description: description,
    code: code,
    status: status,
  };
};
