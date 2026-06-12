import { StrictMode } from 'react';

import { RouterProvider } from 'react-router-dom';

import { createRoot } from 'react-dom/client';

import router from '@/layouts/router/Router.tsx';

import { TooltipProvider } from '@components/shadcn-ui/tooltip.tsx';
import { ThemeProvider } from '@components/theme/ThemeProvider.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import '@styles/global.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <TooltipProvider>
          <RouterProvider router={router} />
        </TooltipProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
