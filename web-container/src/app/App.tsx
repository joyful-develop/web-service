import { Toaster } from 'sonner';

import { handleGlobalError } from '@/app/querys/handle-global-error.tsx';
import { handleGlobalMutationSuccess } from '@/app/querys/handle-global-mutation-success.tsx';
import { handleGlobalMutationError } from '@/app/querys/handle-global-mutation.tsx';
import AppRouter from '@/app/routers/AppRouter.tsx';
import { ThemeProvider } from '@/features/theme/ThemeProvider.tsx';
import { TooltipProvider } from '@/shared/components/shadcn-ui/tooltip.tsx';

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: handleGlobalError,
  }),
  mutationCache: new MutationCache({
    onError: handleGlobalMutationError,
  }),
  defaultOptions: {
    queries: {
      throwOnError: false,
      retry: false,
      refetchOnWindowFocus: false, // 다른 창 갔다가 돌아와도 다국어 자동 재호출 차단
    },
    mutations: {
      throwOnError: false,
    },
  },
});

const mutationCache = queryClient.getMutationCache();
mutationCache.config.onSuccess = (data, variables, context, mutation) => {
  handleGlobalMutationSuccess(data, variables, context, mutation, queryClient);
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <TooltipProvider>
          <AppRouter />
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
