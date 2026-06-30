/* eslint-disable @typescript-eslint/no-unused-vars */
import { createBrowserRouter, Outlet } from 'react-router';

import RootLayout from '@/app/layouts/RootLayout.tsx';
import { CentralErrorBoundary } from '@/app/routers/CentralErrorBoundary.tsx';
import { GlobalErrorBoundary2 } from '@/app/routers/GlobalErrorBoundary2.tsx';
import About from '@/pages/About/About.tsx';
import Home from '@/pages/Home/Home.tsx';

import { QueryErrorResetBoundary } from '@tanstack/react-query';

// React Query Reset 기능을 라우트 내부 트리와 연결해주는 래퍼 컴포넌트
function QueryResetWrapper() {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        // 여기에 감싸진 Outlet 내부 컴포넌트들은 에러 시 reset 기능을 공유합니다.
        <Outlet />
      )}
    </QueryErrorResetBoundary>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <GlobalErrorBoundary2 />, // RootLayout이 터졌을 때의 보험
    children: [
      {
        // 🛠️ QueryResetWrapper를 한 단계 추가하여 에러 경계 영역을 감싸줍니다.
        element: <QueryResetWrapper />,
        errorElement: <CentralErrorBoundary />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: 'about',
            element: <About />,
          },
        ],
      },
    ],
  },
]);
