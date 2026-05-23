import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from '@app/layout/MainLayout.tsx';
import About from '@pages/About/About.tsx';
import Home from '@pages/Home/Home.tsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* 레이아웃 적용 */}
          <Route element={<MainLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
