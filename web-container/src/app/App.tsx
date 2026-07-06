// import { RouterProvider } from 'react-router';

import { Suspense, useEffect } from 'react';

import { Toaster } from 'sonner';

import { queryClient } from '@/app/querys/query-client.ts';
import AppRouter from '@/app/routers/AppRouter.tsx';
import { useUiSettingsStore } from '@/features/settings/useUiSettingsStore.ts';
import { ThemeProvider } from '@/features/theme/ThemeProvider.tsx';
import { TooltipProvider } from '@/shared/components/shadcn-ui/tooltip.tsx';
import type { ApiRequest } from '@/shared/types/api.types.ts';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function App() {
  const { themeColor, fetchUiSettings } = useUiSettingsStore();

  useEffect(() => {
    if (!themeColor) {
      const request: ApiRequest = { userId: '123456' };
      fetchUiSettings(request);
    }
  }, [fetchUiSettings, themeColor]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <TooltipProvider>
          <Suspense fallback={<div>로딩 중...</div>}>
            <AppRouter />
          </Suspense>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
