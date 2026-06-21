import axios, { AxiosError } from 'axios';

import { create } from 'zustand';

export type AlertType = 'Message' | 'Success' | 'Info' | 'Warning' | 'Error';

// @valid, @validated 로 DTO 검증 실패 오류
interface VaildError {
  field: string; // "email"
  objectName: string | null; // "userDto"
  value: string; // 사용자가 입력했던 잘못된 값
  valueType: string | null; // 사용자가 입력했던 잘못된 값의 타입
  message: string; // "이메일은 필수 입력 항목입니다."
  code: string | null; // "NotBlank"
}

// 추가 상세 정보 - 사용자에게 알려줄 정보
interface ErrorDetail {
  message: string;
  messageMultiLangCode: string | null; // 커스텀 메시지인 경우 다국어 코드
}

interface ApiErrorResponse {
  type?: AlertType | null;
  timestamp: string | null; // "2026-06-21 18:00:01.123",
  status: number | null; // 400
  error: string | null; // "ERR_BAD_REQUEST"
  path: string | null; // "/api/v1/users/register"
  message: string; // "Validation failed for object='userDto'. Error count: 1"
  messageMultiLangCode?: string | null; // 커스텀 메시지인 경우 다국어 코드
  vaildErrors?: VaildError[] | null;
  errorDetailTitleMultiLangCode?: string | null;
  errorDetails?: ErrorDetail[] | null;
}

interface ErrorState {
  type: AlertType | null;
  message: string | null;
  description: string | null;
  setError: (error: AxiosError | Error) => void;
  reset: () => void;
}

const initialState = {
  type: null,
  message: null,
  description: null,
};

export const useErrorStore = create<ErrorState>((set) => ({
  ...initialState,

  setError: (error: AxiosError | Error) => {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
      const { request, response } = error;

      if (response) {
        const errorData = response.data; // ApiErrorResponse 타입으로 추론됨

        let vaildErrorDesc;
        if (errorData.vaildErrors) {
          vaildErrorDesc = errorData.vaildErrors
            .map(
              (error) =>
                `${error.objectName}.${error.field} => ${error.value}(${error.valueType}) : ${error.message}(${error.code})`
            )
            .join('\n');
        }

        let errorDesc = '';
        if (errorData.errorDetailTitleMultiLangCode && errorData.errorDetails) {
          errorDesc += vaildErrorDesc ? `${vaildErrorDesc}\n` : '';
          errorDesc += `${errorData.errorDetailTitleMultiLangCode}\n`;
          errorDesc += errorData.errorDetails.map((details) => `${details.message}`).join('\n');
        }

        set({
          type: errorData.type,
          message: errorData?.message || error.message,
          description: errorDesc,
        });
      } else if (request) {
        set({
          type: 'Error',
          message: 'Api 서버로부터 응답이 없습니다. 네트워크 연결을 확인해주세요.',
          description: request,
        });
      } else {
        set({
          type: 'Error',
          message: 'Api 요청을 설정하는 중에 에러가 발생했습니다.',
          description: request,
        });
      }
    } else {
      set({
        type: 'Error',
        message: error?.message || '알 수 없는 에러가 발생했습니다.',
        description: error?.stack,
      });
    }
  },

  reset: () => set(initialState),
}));
