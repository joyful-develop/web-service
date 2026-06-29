import type { AxiosError } from 'axios';
import axios from 'axios';

import type { AlertType, ApiErrorBody, ApiErrorResponse } from '@/shared/types/api.types.ts';

export const parsingError = (error: Error | AxiosError | string, defaultMessage: string | null): ApiErrorBody => {
  let type: AlertType = 'Error';
  let message: string = '';
  let description: string = '';
  let status: number = -1;
  let code: string = '';

  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const { request, response } = error;

    if (response) {
      const errorData = response.data; // ApiErrorResponse 타입으로 추론됨

      type = errorData.type || 'Error';
      message = defaultMessage || errorData?.message || error.message;
      status = errorData.status || -1;
      code = errorData.code || '';

      let vaildErrorDesc;
      if (errorData.vaildErrors) {
        vaildErrorDesc = errorData.vaildErrors
          .map(
            (error) =>
              `${error.objectName}.${error.field} => ${error.value}(${error.valueType}) : ${error.message}(${error.code})`
          )
          .join('\n');
      }

      if (errorData.errorDetailTitleCode && errorData.errorDetails) {
        description += vaildErrorDesc ? `${vaildErrorDesc}\n` : '';
        description += `${errorData.errorDetailTitleCode}\n`;
        description += errorData.errorDetails.map((details) => `${details.message}`).join('\n');
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

  if (!message) {
    message = '알 수 없는 에러가 발생했습니다.';
  }

  return {
    message: message,
    type: type,
    status: status,
    code: code,
    description: description,
  };
};
