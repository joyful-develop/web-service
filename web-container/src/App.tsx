import { ThemeProvider } from '@components/theme/theme-provider.tsx';
import RootLayout from '@layouts/RootLayout.tsx';

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <RootLayout />
    </ThemeProvider>
  );
}

export default App;
