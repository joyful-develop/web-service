import React from 'react';

import { createBrowserRouter, type LoaderFunction, type ActionFunction } from 'react-router-dom';

import RootLayout from '@/layouts/RootLayout.tsx';
import RouteErrorBoundary from '@/layouts/router/RouteErrorBoundary.tsx';

interface RouteLinkCommon {
  loader?: LoaderFunction;
  action?: ActionFunction;
  ErrorBoundary?: React.ComponentType<object>;
}

interface RouteLink extends RouteLinkCommon {
  index: boolean;
  path: string;
  Element: React.ComponentType<object>;
}

interface Pages {
  [key: string]: {
    default: React.ComponentType<object>;
  } & RouteLinkCommon;
}

type Menu = {
  id: number;
  index: boolean;
  path: string;
  label: string;
  file: string;
  isRequiresAdmin: boolean;
};

const menuList: Menu[] = [
  {
    id: 1,
    index: true,
    path: '',
    label: 'Home',
    file: 'pages/Home/Home.tsx',
    isRequiresAdmin: true,
  },
  {
    id: 2,
    index: false,
    path: '/about',
    label: 'Home',
    file: 'pages/About/About.tsx',
    isRequiresAdmin: true,
  },
];

const pages: Pages = import.meta.glob('../../pages/**/*.tsx', { eager: true });

const routeLinks: RouteLink[] = [];
for (const path of Object.keys(pages)) {
  const file = path.match(/pages\/(.*)\.tsx$/)?.[0];
  if (!file) {
    console.error(`Component for path ${path} is not found or not exported correctly`);
    continue;
  }

  const findMenu = menuList.find((menu) => menu.file === file);
  if (findMenu === undefined) continue;

  routeLinks.push({
    index: findMenu.index,
    path: findMenu.path.toLowerCase(),
    Element: pages[path].default,
    loader: pages[path]?.loader as LoaderFunction | undefined,
    action: pages[path]?.action as ActionFunction | undefined,
    ErrorBoundary: pages[path]?.ErrorBoundary,
  });
}

if (routeLinks.length === 0) {
  throw new Error('No routes found. Check your page component and paths');
}

console.log('Generated routes:', routeLinks);

const children = routeLinks.map(({ Element, ErrorBoundary, ...rest }) => ({
  ...rest,
  element: <Element />,
  ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
}));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [...children],
  },
]);

export default router;
