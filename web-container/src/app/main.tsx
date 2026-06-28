import { StrictMode } from 'react';

import axios from 'axios';

import { createRoot } from 'react-dom/client';
import { toast, Toaster } from 'sonner';

import AppRouter from '@/app/routers/AppRouter.tsx';
import { ThemeProvider } from '@/features/theme/ThemeProvider.tsx';
import { TooltipProvider } from '@/shared/components/shadcn-ui/tooltip.tsx';

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import '@app/styles/global.css';

async function enableMocking() {
  if (!import.meta.env.VITE_APP_RUN_LOCAL) {
    return;
  }

  const { worker } = await import('../__tests__/mocks/browser.ts');

  return worker.start({
    onUnhandledRequest: 'bypass',
  });
}

// useEffect(() => {
//   if (message) {
//     let iconName: IconName;
//     switch (type) {
//       case 'Info':
//         iconName = 'info';
//         break;
//       case 'Warning':
//         iconName = 'triangleAlert';
//         break;
//       case 'Error':
//         iconName = 'circleX';
//         break;
//       case 'Success':
//         iconName = 'circleCheckBig';
//         break;
//       default:
//         iconName = null;
//         break;
//     }

//     toast(message, {
//       description: description,
//       position: 'top-right',
//       icon: iconName ? (
//         <LucideIcon name={iconName} size={32} strokeWidth={2} className='bg-blue-500 text-white' />
//       ) : null,
//     });
//     reset();
//   }
// }, [type, message, description, reset]);

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      // 500 에러를 제외한 일반적인 API 에러(400, 404 등)는 Shadcn 토스트 알림으로 가볍게 처리
      if (axios.isAxiosError(error) && error.response?.status !== 500) {
        toast('요청 오류 발생', {
          // variant: 'destructive', // Shadcn 에러 스타일 (빨간색)
          // title: '요청 오류 발생',
          description: error.response?.data?.message || '데이터를 가져오는데 실패했습니다.',
        });
      }
    },
  }),
  mutationCache: new MutationCache({
    // 💡 1. 전역에서 모든 Mutation 성공을 가로챕니다.
    onSuccess: (_data, _variables, _context, mutation) => {
      // 💡 2. 컴포넌트에서 정의한 커스텀 메시지가 메타 필드에 있으면 팝업을 띄웁니다.
      const successMessage = mutation.meta?.successMessage as string | undefined;

      if (successMessage) {
        toast('성공', {
          // variant: 'destructive', // Shadcn 에러 스타일 (빨간색)
          // title: '요청 오류 발생',
          description: successMessage,
          className: 'bg-slate-900 text-white border-none', // 필요 시 Shadcn 디자인 커스텀
        });
      }
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast('처리 실패', {
          // variant: 'destructive', // Shadcn 에러 스타일 (빨간색)
          // title: '요청 오류 발생',
          description: error.response?.data?.message || '요청 처리에 실패했습니다.',
        });
      }
    },
  }),
  defaultOptions: {
    queries: {
      // 💡 핵심 1: 에러가 발생하면 가장 가까운 부모 ErrorBoundary가 포착하도록 설정
      throwOnError: true,
      retry: false,
      refetchOnWindowFocus: false, // 다른 창 갔다가 돌아와도 다국어 자동 재호출 차단
    },
  },
});

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
          <TooltipProvider>
            <AppRouter />
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StrictMode>
  );
});
