import React, { useEffect, useMemo } from 'react';

import { createBrowserRouter, type LoaderFunction, type ActionFunction, RouterProvider } from 'react-router';

import RootLayout from '@/app/layouts/RootLayout.tsx';
import { useMenuStore } from '@/features/menu/useMenuStore.ts';
import Forbidden from '@/pages/Forbidden.tsx';
import Login from '@/pages/Login.tsx';
import type { ApiRequest } from '@/shared/types/api.types.ts';

import AppRouteErrorBoundary from '@app/routers/AppRouteErrorBoundary.tsx';

interface Pages {
  [key: string]: {
    default: React.ComponentType<object>;
    loader?: LoaderFunction;
    action?: ActionFunction;
    ErrorBoundary?: React.ComponentType<object>;
  };
}

export default function AppRouter() {
  const { menus, isLoaded, fetchMenus } = useMenuStore();

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
        children: [
          {
            errorElement: <AppRouteErrorBoundary />,
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

// import { createBrowserRouter, Navigate, type LoaderFunctionArgs } from 'react-router';
// import { RootLayout } from './layouts/RootLayout';
// import { ProductsPage } from './pages/ProductsPage';
// import { LoginPage } from './pages/LoginPage';
// import { queryClient } from './api/queryClient';
// import { axiosInstance } from './api/axiosInstance';

// // 상품 타입 정의
// interface Product {
//   id: string;
//   name: string;
// }

// export const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <RootLayout />,
//     children: [
//       {
//         path: 'products',
//         element: <ProductsPage />,
//         // v7 명시적 로더 선언 및 타입 추론 레이어
//         loader: async ({ request }: LoaderFunctionArgs) => {
//           const url = new URL(request.url);
//           const search = url.searchParams.get('q') || '';

//           // 컴포넌트 렌더링 전 React Query 캐싱 및 페칭 사전 보장
//           await queryClient.ensureQueryData({
//             queryKey: ['products', search],
//             queryFn: async () => {
//               const { data } = await axiosInstance.get<Product[]>('/products');
//               return data;
//             }
//           });

//           return { search };
//         }
//       }
//     ]
//   },
//   {
//     path: '/login',
//     element: <LoginPage />
//   },
//   {
//     path: '*',
//     element: <Navigate to="/products" replace />
//   }
// ]);
