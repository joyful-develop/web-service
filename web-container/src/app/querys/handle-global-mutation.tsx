import { AxiosError } from 'axios';

import { toast } from 'sonner';

import type { ApiErrorBody } from '@/shared/types/api.types.ts';

import { Mutation } from '@tanstack/react-query';

export const handleGlobalMutationError = (
  error: Error,
  _variables: unknown,
  _context: unknown,
  mutation: Mutation<unknown, unknown, unknown, unknown>
) => {
  // 1. 컴포넌트 내부 useMutation에서 전역 에러 처리를 막았는지 확인
  if (mutation.meta?.preventGlobalError) {
    return;
  }

  const defaultMessage = mutation.meta?.customErrorMessage;

  // 2. Axios API 에러 분기
  if (error instanceof AxiosError) {
    const errorBody = error.response?.data as ApiErrorBody;
    const status = error.response?.status;

    switch (status) {
      case 400:
        // CUD 작업 시 주로 발생하는 입력값 유효성 검증 실패 등
        toast.error('잘못된 요청입니다.', {
          description: defaultMessage || errorBody?.message || '요청 데이터를 확인해주세요.',
        });
        break;

      case 401:
        toast.error('인증 만료', {
          description: '로그인이 필요합니다. 로그인 페이지로 이동합니다.',
        });
        window.location.href = '/login';
        break;

      case 403:
        toast.error('권한 부족', {
          description: defaultMessage || '이 작업을 수행할 권한이 없습니다.',
        });
        break;

      case 500:
        toast.error('저장 실패', {
          description: defaultMessage || '서버 오류로 인해 처리에 실패했습니다.',
        });
        break;

      default:
        toast.error('작업 실패', {
          description: defaultMessage || `에러코드: ${status} || Unknown`,
        });
    }
    return;
  }

  // 3. 일반 JavaScript 에러 처리
  toast.error('시스템 오류', {
    description: error.message,
  });
};
