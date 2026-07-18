import { useMemo } from 'react';

import {
  createBrowserRouter,
  RouterProvider,
  type IndexRouteObject,
  type NonIndexRouteObject,
  type RouteObject,
} from 'react-router';

import { GlobalLoadingFallback } from '@/app/layouts/GlobalLoadingFallback.tsx';
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
        const hasChildren = menu.children && menu.children.length > 0;

        const commonProps =
          menu.type !== 'group'
            ? {
                lazy: createDynamicComponent(menu.type, menu.path, menu.component),
                ...(menu.isLayout ? { errorElement: <GlobalErrorBoundary /> } : {}),
              }
            : {};

        if (menu.isDefault) {
          const indexRoute: IndexRouteObject = {
            ...commonProps,
            index: true,
            path: menu.path?.toLowerCase(),
          };
          return indexRoute;
        } else {
          const pathRoute: NonIndexRouteObject =
            menu.type !== 'group'
              ? {
                  ...commonProps,
                  path: menu.path?.toLowerCase(),
                  ...(hasChildren ? { children: formatRoutes(menu.children!) } : {}),
                }
              : { ...(hasChildren ? { children: formatRoutes(menu.children!) } : {}) };
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
        hydrateFallbackElement: <GlobalLoadingFallback />,
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
