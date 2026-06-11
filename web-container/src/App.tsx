import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';

import RootLayout from '@/layouts/RootLayout.tsx';
import About from '@/pages/About/About.tsx';
import Home from '@/pages/Home/Home.tsx';

import { TooltipProvider } from '@components/shadcn-ui/tooltip.tsx';
import { ThemeProvider } from '@components/theme/ThemeProvider.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
        // <ScrollRestoration />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <TooltipProvider>
        <RouterProvider router={router} />
        {/* <BrowserRouter>
          <Routes>
            <Route path='/' element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path='/about' element={<About />} />
            </Route>
          </Routes>
        </BrowserRouter> */}
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
