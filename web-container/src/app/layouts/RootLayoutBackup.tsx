import { Suspense } from 'react';

import { Outlet, useLocation } from 'react-router';

import { CollapsibleMenus } from '@/app/layouts/components/CollapsibleMenus.tsx';
import { FooterBackup } from '@/app/layouts/components/FooterBackup.tsx';
import { MenuBar } from '@/app/layouts/components/MenuBar.tsx';
import { Conditions } from '@/app/layouts/components/side/Conditions.tsx';
import { Icons } from '@/app/layouts/components/side/Icons.tsx';
import { GlobalSuspenseFallback } from '@/app/layouts/GlobalSuspenseFallback.tsx';
import { useTranslationQuery } from '@/features/user-config/i18n/useTranslationQuery.ts';
import { SidebarInset, SidebarProvider } from '@/shared/components/shadcn-ui/sidebar.tsx';

// import { FileTree } from '@/layouts/menu/FileTree.tsx';
// import { Cards } from '@/layouts/side/Cards.tsx';

export const iframeHeight = '800px';

export const description = 'A sidebar with a header and a search form.';

export default function RootLayoutBackup() {
  useTranslationQuery();
  const location = useLocation();

  return (
    <div className='[--footer-height:calc(--spacing(10))] [--header-height:calc(--spacing(14))] [--menuBar-height:calc(--spacing(14))]'>
      <SidebarProvider className='flex max-h-svh flex-col overflow-y-hidden'>
        <MenuBar />
        <div className='flex flex-1'>
          <Icons />
          <CollapsibleMenus />
          <SidebarInset>
            <main>
              <Suspense key={location.key} fallback={<GlobalSuspenseFallback />}>
                <Outlet />
              </Suspense>
            </main>
          </SidebarInset>
          <Conditions />
          <Icons />
        </div>
        <FooterBackup />
      </SidebarProvider>
    </div>
  );
}
