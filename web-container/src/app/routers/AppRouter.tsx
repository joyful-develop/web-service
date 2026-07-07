import { useMemo } from 'react';

import { createBrowserRouter, RouterProvider, Outlet } from 'react-router';

import RootLayout from '@/app/layouts/RootLayout.tsx';
import CentralErrorBoundary from '@/app/routers/CentralErrorBoundary.tsx';
import { createDynamicComponent } from '@/app/routers/lazy-loader.tsx';
import RootErrorBoundary from '@/app/routers/RootErrorBoundary.tsx';
import { useMenuQuery } from '@/features/menu/useMenuQuery.ts';
import Forbidden from '@/pages/Forbidden.tsx';
import Login from '@/pages/Login.tsx';
import type { ApiRequest } from '@/shared/types/api.types.ts';

export default function AppRouter() {
  const request: ApiRequest = { userId: '123456' };
  const { data: menus } = useMenuQuery(request);

  const router = useMemo(() => {
    const safeMenus = menus || [];

    const dynamicRoutes = safeMenus.map((menu) => {
      const isDefault = !!menu.isDefault;
      return {
        // index 라우트는 path 속성을 가지면 안 됨 (React Router 규칙)
        ...(isDefault ? { index: true } : { path: menu.path.toLowerCase() }),
        // 라우터가 이 경로에 접근하는 순간 팩토리 함수가 실행되면서
        // { Component, loader, action, ErrorBoundary } 객체를 통째로 받아와 세팅
        lazy: createDynamicComponent(menu.type, menu.path, menu.localPath, menu.remoteUrl),
      };
    });
    console.log('Generated routes', dynamicRoutes);

    return createBrowserRouter([
      {
        path: '/',
        element: <RootLayout />,
        errorElement: <RootErrorBoundary />,
        children: [
          {
            element: <Outlet />,
            errorElement: <CentralErrorBoundary />,
            children: [
              {
                errorElement: <CentralErrorBoundary />,
                children: dynamicRoutes,
              },
            ],
          },
        ],
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/forbidden',
        element: <Forbidden />,
      },
    ]);
  }, [menus]);

  return <RouterProvider router={router} />;
}
