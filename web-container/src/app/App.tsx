import { Toaster } from 'sonner';

import { queryClient } from '@/app/querys/query-client.ts';
import AppRouter from '@/app/routers/AppRouter.tsx';
import { ThemeColorProvider } from '@/features/user-config/theme/ThemeColorProviderContext.tsx';
import { ThemeProvider } from '@/features/user-config/theme/ThemeProviderContext.tsx';
import { TooltipProvider } from '@/shared/components/shadcn-ui/tooltip.tsx';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ThemeColorProvider>
          <TooltipProvider>
            <AppRouter />
            <Toaster />
          </TooltipProvider>
        </ThemeColorProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
