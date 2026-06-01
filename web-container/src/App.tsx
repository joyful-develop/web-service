import RootLayout from '@/layouts/RootLayout.tsx';

import { TooltipProvider } from '@components/shadcn-ui/tooltip.tsx';
import { ThemeProvider } from '@components/theme/ThemeProvider.tsx';

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <TooltipProvider>
        <RootLayout />
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
