import React, { useEffect, useMemo } from 'react';

import { createBrowserRouter, type LoaderFunction, type ActionFunction, RouterProvider } from 'react-router';

import RootLayout from '@/layouts/RootLayout.tsx';
import RouteErrorBoundary from '@/layouts/RouteErrorBoundary.tsx';
import { useMenuStore } from '@/store/useMenuStore.ts';
import type { ApiRequest } from '@/types/api.ts';

interface Pages {
  [key: string]: {
    default: React.ComponentType<object>;
    loader?: LoaderFunction;
    action?: ActionFunction;
    ErrorBoundary?: React.ComponentType<object>;
  };
}

export default function Router() {
  const { menus, isLoaded, fetchMenus } = useMenuStore();

  useEffect(() => {
    const request: ApiRequest = { userId: '123456' };
    fetchMenus(request);
  }, [fetchMenus]);

  const router = useMemo(() => {
    if (!isLoaded || menus.length === 0) return null;

    const pages: Pages = import.meta.glob('../pages/**/*.tsx', { eager: true });

    const dynamicRoutes = menus.map((menu) => {
      const path = `../${menu.file}`;
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
        path: '/',
        element: <RootLayout />,
        errorElement: <RouteErrorBoundary />,
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
    ]);
  }, [menus, isLoaded]);

  if (!isLoaded || !router) {
    return <div>URL 라우팅 테이블 구성 중 ...</div>;
  }

  return <RouterProvider router={router} />;
}
