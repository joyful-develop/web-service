import { Suspense } from 'react';

import { Outlet } from 'react-router';

import { CollapsibleMenus } from '@/app/layouts/components/CollapsibleMenus.tsx';
import { Footer } from '@/app/layouts/components/Footer.tsx';
import { Header } from '@/app/layouts/components/Header.tsx';
import { MenuBar } from '@/app/layouts/components/MenuBar.tsx';
import { GlobalSuspenseFallback } from '@/app/layouts/GlobalSuspenseFallback.tsx';
import { SidebarInset, SidebarProvider } from '@/shared/components/shadcn-ui/sidebar.tsx';
import { useTranslationQuery } from '@/shared/i18n/useTranslationQuery.ts';

import { Header2 } from '@app/layouts/components/Header2.tsx';
// import { FileTree } from '@/layouts/menu/FileTree.tsx';
// import { Cards } from '@/layouts/side/Cards.tsx';
import { Conditions } from '@app/layouts/components/side/Conditions.tsx';
import { Icons } from '@app/layouts/components/side/Icons.tsx';

export const iframeHeight = '800px';

export const description = 'A sidebar with a header and a search form.';

export default function RootLayout() {
  useTranslationQuery();

  return (
    <div className='[--footer-height:calc(--spacing(10))] [--header-height:calc(--spacing(14))] [--menuBar-height:calc(--spacing(14))]'>
      <SidebarProvider className='flex max-h-svh flex-col overflow-y-hidden'>
        <Header />
        <Header2 />
        <MenuBar />
        <div className='flex flex-1'>
          <Icons />
          <CollapsibleMenus />
          <SidebarInset>
            <main>
              <Suspense fallback={<GlobalSuspenseFallback />}>
                <Outlet />
              </Suspense>
            </main>
          </SidebarInset>
          <Conditions />
          <Icons />
        </div>
        <Footer />
      </SidebarProvider>
    </div>
  );
}
