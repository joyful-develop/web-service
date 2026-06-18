import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import AppRouter from '@/layouts/AppRouter.tsx';

import { TooltipProvider } from '@components/shadcn-ui/tooltip.tsx';
import { ThemeProvider } from '@components/theme/ThemeProvider.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import '@styles/global.css';

async function enableMocking() {
  if (!import.meta.env.VITE_APP_RUN_LOCAL) {
    return;
  }

  const { worker } = await import('./__mocks__/browser.ts');

  return worker.start({
    onUnhandledRequest: 'bypass',
  });
}

const queryClient = new QueryClient();

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
          <TooltipProvider>
            <AppRouter />
          </TooltipProvider>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StrictMode>
  );
});
