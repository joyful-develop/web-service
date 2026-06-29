import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';

import { handleGlobalError } from '@/app/querys/handle-global-error.tsx';
import { handleGlobalMutationSuccess } from '@/app/querys/handle-global-mutation-success.tsx';
import { handleGlobalMutationError } from '@/app/querys/handle-global-mutation.tsx';
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

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: handleGlobalError,
  }),
  mutationCache: new MutationCache({
    onError: handleGlobalMutationError,
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

const mutationCache = queryClient.getMutationCache();
mutationCache.config.onSuccess = (data, variables, context, mutation) => {
  handleGlobalMutationSuccess(data, variables, context, mutation, queryClient);
};

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
