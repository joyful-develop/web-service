import { useMemo } from 'react';

import {
  createBrowserRouter,
  RouterProvider,
  type IndexRouteObject,
  type NonIndexRouteObject,
  type RouteObject,
} from 'react-router';

import RootLayout from '@/app/layouts/RootLayout.tsx';
import GlobalErrorBoundary from '@/app/routers/GlobalErrorBoundary.tsx';
import { createDynamicComponent } from '@/app/routers/lazy-loader.tsx';
import type { MenuItem } from '@/features/menu/menu.type.ts';
import { useMenuQuery } from '@/features/menu/useMenuQuery.ts';
import Forbidden from '@/pages/Forbidden.tsx';
import Login from '@/pages/Login.tsx';
import NotFound from '@/pages/NotFound.tsx';
import type { ApiRequest } from '@/shared/types/api.types.ts';

export default function AppRouter() {
  const request: ApiRequest = { userId: '123456' };
  const { data: menus } = useMenuQuery(request);

  const router = useMemo(() => {
    const safeMenus = menus || [];

    const formatRoutes = (menuList: MenuItem[]): RouteObject[] => {
      return menuList.map((menu): RouteObject => {
        const isDefault = !!menu.isDefault;
        const hasChildren = menu.children && menu.children.length > 0;

        // 공통 속성 정의
        const commonProps = {
          lazy: createDynamicComponent(menu.type, menu.path, menu.localPath, menu.remoteUrl),
          ...(menu.isLayout ? { errorElement: <GlobalErrorBoundary /> } : {}),
        };

        if (isDefault) {
          // 1. Index 라우트 타입 구조 명시 (path는 완전히 제외)
          const indexRoute: IndexRouteObject = {
            ...commonProps,
            index: true,
          };
          return indexRoute;
        } else {
          // 2. Non-Index 라우트 타입 구조 명시 (index는 완전히 제외 또는 undefined)
          const pathRoute: NonIndexRouteObject = {
            ...commonProps,
            path: menu.path.toLowerCase(),
            ...(hasChildren ? { children: formatRoutes(menu.children!) } : {}),
          };
          return pathRoute;
        }
      });
    };

    const dynamicRoutes = formatRoutes(safeMenus);
    console.log('Generated routes', dynamicRoutes);

    return createBrowserRouter([
      {
        path: '/',
        element: <RootLayout />,
        errorElement: <GlobalErrorBoundary />,
        children: [
          {
            errorElement: <GlobalErrorBoundary />,
            children: [
              ...dynamicRoutes,
              {
                path: '*',
                element: <NotFound />,
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
