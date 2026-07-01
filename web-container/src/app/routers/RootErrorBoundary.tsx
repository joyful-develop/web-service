import { useRouteError, Navigate, useNavigate } from 'react-router';

import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/shared/components/shadcn-ui/alert.tsx';
import { Button } from '@/shared/components/shadcn-ui/button.tsx';
import { errorParser } from '@/shared/utils/error-parser.ts';

import { useQueryErrorResetBoundary } from '@tanstack/react-query';

export default function RootErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();
  const apiError = errorParser(error);

  const { reset } = useQueryErrorResetBoundary();

  const handleRetry = () => {
    reset();
    navigate('.', { replace: true });
  };

  if (apiError.status === 401) {
    return <Navigate to='/login' state={{ from: window.location.pathname }} replace />;
  }
  if (apiError.status === 403) {
    return <Navigate to='/forbidden' replace />;
  }

  return (
    <div className='mx-auto my-16 max-w-xl'>
      <Alert variant='destructive' className='rounded-xl border-red-200 bg-red-50/50 p-6 shadow-sm'>
        <AlertCircle className='mt-0.5 h-5 w-5' />
        <AlertTitle className='mb-1 text-base font-bold tracking-tight text-red-800'>
          {apiError.message || '알 수 없는 오류'}
        </AlertTitle>
        <AlertDescription className='mb-6 text-sm leading-relaxed text-red-600'>
          {apiError.description || '네트워크 연결 상태를 확인하고 잠시 후 다시 시도해 주세요.'}
        </AlertDescription>
        <div className='flex justify-end'>
          <Button variant='destructive' size='sm' onClick={handleRetry}>
            다시 시도
          </Button>
          <Button variant='destructive' size='sm' onClick={() => navigate('/')}>
            메인으로 이동
          </Button>
        </div>
      </Alert>
    </div>
  );
}
