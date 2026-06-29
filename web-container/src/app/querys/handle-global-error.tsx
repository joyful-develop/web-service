import { AxiosError } from 'axios';

import { toast } from 'sonner'; // sonner 라이브러리 직접 임포트

import type { ApiErrorBody } from '@/shared/types/api.types.ts';

import { Query } from '@tanstack/react-query';

export const handleGlobalError = (error: Error, query: Query<unknown, unknown, unknown, readonly unknown[]>) => {
  // 1. 전역 에러 비활성화 처리 확인
  if (query.meta?.preventGlobalError) {
    return;
  }

  const defaultMessage = query.meta?.customErrorMessage;

  // 2. Axios API 에러 분기
  if (error instanceof AxiosError) {
    const errorBody = error.response?.data as ApiErrorBody;
    const status = error.response?.status;

    switch (status) {
      case 401:
        toast.error('인증 만료', {
          description: '로그인이 필요합니다. 로그인 페이지로 이동합니다.',
        });
        window.location.href = '/login';
        break;

      case 403:
        toast.error('권한 부족', {
          description: defaultMessage || '해당 메뉴에 접근할 권한이 없습니다.',
        });
        break;

      case 500:
        toast.error('서버 오류', {
          description: defaultMessage || errorBody?.message || '알 수 없는 서버 내부 오류입니다.',
        });
        break;

      default:
        toast.error('요청 실패', {
          description: defaultMessage || `에러코드: ${status} || 'Unknown'`,
        });
    }
    return;
  }

  // 3. 일반 일반 JavaScript 에러 처리
  toast.error('오류 발생', {
    description: error.message,
  });
};
