import { useNavigate } from 'react-router';

import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/shared/components/shadcn-ui/alert.tsx';
import { Button } from '@/shared/components/shadcn-ui/button.tsx';

import { useQueryErrorResetBoundary } from '@tanstack/react-query';

interface ErrorBoundaryProps {
  message: string;
  description?: string | null;
  isEnableRetry?: boolean;
  isEnableGoToHome?: boolean;
}

export default function ErrorBoundary({ message, description, isEnableRetry, isEnableGoToHome }: ErrorBoundaryProps) {
  const navigate = useNavigate();

  const { reset } = useQueryErrorResetBoundary();

  const handleRetry = () => {
    reset();
    navigate('.', { replace: true });
  };

  return (
    <div className='mx-auto my-16 w-fit max-w-xl'>
      <Alert variant='destructive' className='rounded-xl border-red-200 bg-red-50/50 p-6 shadow-sm'>
        <AlertCircle className='mt-0.5 h-5 w-5' />
        <AlertTitle className='mb-1 text-base font-bold tracking-tight text-red-800'>{message}</AlertTitle>
        {description && (
          <AlertDescription className='mb-6 text-sm leading-relaxed whitespace-pre-wrap text-red-600'>
            {description}
          </AlertDescription>
        )}
        {!description && <div></div>}
        <div></div>
        <div className='item-end col-span-2 flex justify-center'>
          {isEnableRetry && (
            <Button variant='destructive' size='sm' onClick={handleRetry}>
              다시 시도
            </Button>
          )}
          {isEnableGoToHome && (
            <Button variant='destructive' size='sm' onClick={() => navigate('/')}>
              메인으로 이동
            </Button>
          )}
        </div>
      </Alert>
    </div>
  );
}
