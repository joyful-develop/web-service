import { useEffect } from 'react';

import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';

import RootLayout from '@/app/layouts/RootLayout.tsx';
import CentralErrorBoundary from '@/app/routers/CentralErrorBoundary.tsx';
import { createDynamicComponent } from '@/app/routers/lazy-loader.tsx';
import RootErrorBoundary from '@/app/routers/RootErrorBoundary.tsx';
import { useMenuStore } from '@/features/menu/useMenuStore.ts';
import type { ApiRequest } from '@/shared/types/api.types.ts';

export default function DynamicRouter() {
  const { menus, getMenus, isLoading, isLoaded } = useMenuStore();

  useEffect(() => {
    if (menus) {
      const request: ApiRequest = { userId: '123456' };
      getMenus(request);
    }
  }, [getMenus]);

  if (isLoading) {
    return <div>URL 라우팅 테이블 구성 중 ...</div>;
  }

  if (!isLoaded || menus === null || menus.length === 0) return null;

  // const menus = useMenuStore((state) => state.menus);
  console.log('menus: ', menus);

  const dynamicRoutes = menus?.map((menu) => {
    // const Component = createDynamicComponent(menu.type, menu.path, menu.localPath, menu.remoteUrl);
    return {
      path: menu.path,
      index: menu.isDefault,
      // 라우터가 이 경로에 접근하는 순간 팩토리 함수가 실행되면서
      // { Component, loader, action, ErrorBoundary } 객체를 통째로 받아와 세팅
      lazy: createDynamicComponent(menu.type, menu.path, menu.localPath, menu.remoteUrl),
    };
  });
  if (!dynamicRoutes || dynamicRoutes.length === 0) {
    throw new Error(`Router 구성을 실패했습니다. (menus : ${menus})`);
  }

  const router = createBrowserRouter([
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
              children: [...dynamicRoutes],
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
