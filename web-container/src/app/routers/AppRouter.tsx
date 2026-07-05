import React, { useEffect, useMemo } from 'react';

import { createBrowserRouter, type LoaderFunction, type ActionFunction, RouterProvider } from 'react-router';

import RootLayout from '@/app/layouts/RootLayout.tsx';
import CentralErrorBoundary from '@/app/routers/CentralErrorBoundary.tsx';
import RootErrorBoundary from '@/app/routers/RootErrorBoundary.tsx';
import { useMenuStore } from '@/features/menu/useMenuStore';
import Forbidden from '@/pages/Forbidden.tsx';
import Login from '@/pages/Login.tsx';
import type { ApiRequest } from '@/shared/types/api.types.ts';

interface Pages {
  [key: string]: {
    default: React.ComponentType<object>;
    loader?: LoaderFunction;
    action?: ActionFunction;
    ErrorBoundary?: React.ComponentType<object>;
  };
}

export default function AppRouter() {
  const { menus } = useMenuStore();

  useEffect(() => {
    const request: ApiRequest = { userId: '123456' };
    fetchMenus(request);
  }, [fetchMenus]);

  const router = useMemo(() => {
    if (!isLoaded || menus.length === 0) return null;

    const pages: Pages = import.meta.glob('../../pages/**/*.tsx', { eager: true });

    const dynamicRoutes = menus.map((menu) => {
      const path = `../../${menu.file}`;
      if (path in pages) {
        const TargetComponent = pages[path].default;
        return {
          index: menu.isDefault,
          path: menu.path.toLowerCase(),
          element: <TargetComponent />,
          loader: pages[path]?.loader as LoaderFunction | undefined,
          action: pages[path]?.action as ActionFunction | undefined,
          ErrorBoundary: pages[path]?.ErrorBoundary,
        };
      } else {
        return {
          index: menu.isDefault,
          path: menu.path.toLowerCase(),
          element: <div>Not Found</div>,
        };
      }
    });

    console.log('Generated routes', dynamicRoutes);

    return createBrowserRouter([
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/forbidden',
        element: <Forbidden />,
      },
      {
        path: '/',
        element: <RootLayout />,
        errorElement: <RootErrorBoundary />,
        children: [
          {
            errorElement: <CentralErrorBoundary />,
            children: [
              ...dynamicRoutes,
              {
                path: '*',
                element: (
                  <React.Suspense fallback={null}>
                    <div>Not Found</div>
                  </React.Suspense>
                ),
              },
            ],
          },
        ],
      },
    ]);
  }, [menus, isLoaded]);

  if (!isLoaded || !router) {
    return <div>URL 라우팅 테이블 구성 중 ...</div>;
  }

  return <RouterProvider router={router} />;
}
