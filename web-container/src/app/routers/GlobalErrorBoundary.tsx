import React from 'react';

import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import { Navigate } from 'react-router'; // 💡 리다이렉트를 위한 컴포넌트

import axios from 'axios';

import { AlertCircle } from 'lucide-react';

import { QueryErrorResetBoundary } from '@tanstack/react-query';

import { Alert, AlertDescription, AlertTitle } from '../../shared/components/shadcn-ui/alert.tsx';
import { Button } from '../../shared/components/shadcn-ui/button.tsx';

export interface CustomErrorResponse {
  message?: string;
  code?: string;
}

const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  let message;

  // 💡 1. Axios 에러인지 확인하고 상태 코드(Status) 추출
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const serverData = error.response?.data as CustomErrorResponse;
    message = `${status ? status + ' ' : ''}${serverData?.message ? serverData?.message : ''}`;

    // 💡 2. 401 인증 만료 -> 로그인 페이지로 강제 이동 및 현재 페이지 경로 기억(리다이렉트용)
    if (status === 401) {
      return <Navigate to='/login' state={{ from: window.location.pathname }} replace />;
    }

    // 💡 3. 403 권한 없음 -> 별도의 권한 부족 안내 페이지(Forbidden)로 강제 리다이렉트
    if (status === 403) {
      return <Navigate to='/forbidden' replace />;
    }
  }
  // 2. 일반 UI / 렌더링 에러 처리
  else if (error instanceof Error) {
    message = error.message;
  } else {
    message = `Unhandled Unknown Error: ${error}`;
  }

  // 500 등 그 외의 일반적인 시스템 에러는 기존대로 공통 에러 UI 노출
  return (
    <div className='mx-auto my-16 max-w-xl'>
      <Alert variant='destructive' className='rounded-xl border-red-200 bg-red-50/50 p-6 shadow-sm'>
        <AlertCircle className='mt-0.5 h-5 w-5' />
        <AlertTitle className='mb-1 text-base font-bold tracking-tight text-red-800'>
          페이지를 불러오지 못했습니다
        </AlertTitle>
        <AlertDescription className='mb-6 text-sm leading-relaxed text-red-600'>
          {message || '네트워크 연결 상태를 확인하고 잠시 후 다시 시도해 주세요.'}
        </AlertDescription>
        <div className='flex justify-end'>
          <Button variant='destructive' size='sm' onClick={resetErrorBoundary}>
            다시 시도
          </Button>
        </div>
      </Alert>
    </div>
  );
};

export const GlobalErrorBoundary: React.FC<{ children: React.ReactNode; resetKey?: string }> = ({
  children,
  resetKey,
}) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary key={resetKey} onReset={reset} FallbackComponent={ErrorFallback}>
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
