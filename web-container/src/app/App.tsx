// import { RouterProvider } from 'react-router';

import { Toaster } from 'sonner';

import { queryClient } from '@/app/querys/query-client.ts';
// import AppRouter from '@/app/routers/AppRouter.tsx';
// import DynamicRouterProvider from '@/app/routers/DynamicRouterProvider.tsx';
// import { router } from '@/app/routers/router.tsx';
// import AppProvider from '@/app/routers/AppProvider.tsx';
import DynamicRouter from '@/app/routers/DynamicRouter.tsx';
import { ThemeProvider } from '@/features/theme/ThemeProvider.tsx';
import { TooltipProvider } from '@/shared/components/shadcn-ui/tooltip.tsx';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <TooltipProvider>
          {/* <AppRouter /> */}
          {/* <DynamicRouterProvider /> */}
          {/* <RouterProvider router={router} />; */}
          <DynamicRouter />
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
