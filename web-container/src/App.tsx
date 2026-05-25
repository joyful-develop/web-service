import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { TooltipProvider } from '@components/shadcn-ui/tooltip.tsx';
import RootLayout from '@layouts/RootLayout.tsx';
import About from '@pages/About/About.tsx';
import Home from '@pages/Home/Home.tsx';

function App() {
  return (
    <>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            {/* 레이아웃 적용 */}
            <Route element={<RootLayout />}>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </>
  );
}

export default App;
