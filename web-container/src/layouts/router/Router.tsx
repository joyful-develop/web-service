import React from 'react';

import { createBrowserRouter, type LoaderFunction, type ActionFunction } from 'react-router-dom';

interface RouteCommon {
  loader?: LoaderFunction;
  action?: ActionFunction;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ErrorBoundary?: React.ComponentType<any>;
}

interface IRoute extends RouteCommon {
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Element: React.ComponentType<any>;
}

interface Pages {
  [key: string]: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    default: React.ComponentType<any>;
  } & RouteCommon;
}

const pages: Pages = import.meta.glob('../../pages/**/*.tsx', { eager: true });
console.log(pages);
const routes: IRoute[] = [];
for (const path of Object.keys(pages)) {
  const fileName = path.match(/\.\/pages\/(.*)\.tsx$/)?.[1];
  if (!fileName) {
    console.error(`Component for path ${path} is not found or not exported correctly`);
    continue;
  }

  const normalizedPathName = fileName.includes('$') ? fileName.replace('$', ':') : fileName.replace(/\/index/, '');

  routes.push({
    path: fileName === 'index' ? '/' : `/${normalizedPathName.toLowerCase()}`,
    Element: pages[path].default,
    loader: pages[path]?.loader as LoaderFunction | undefined,
    action: pages[path]?.action as ActionFunction | undefined,
    ErrorBoundary: pages[path]?.ErrorBoundary,
  });
}

console.log('Generated routes:', routes);

if (routes.length === 0) {
  throw new Error('No routes found. Check your page component and paths');
}

const router = createBrowserRouter(
  routes.map(({ Element, ErrorBoundary, ...rest }) => ({
    ...rest,
    element: <Element />,
    ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
  }))
);

export default router;
