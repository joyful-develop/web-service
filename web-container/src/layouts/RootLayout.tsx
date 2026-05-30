import React from 'react';

import { SidebarInset, SidebarProvider } from '@/components/shadcn-ui/sidebar.tsx';
import { Footer } from '@/layouts/footer/Footer.tsx';
import { Header } from '@/layouts/header/Header.tsx';
import { MenuBar } from '@/layouts/menuBar/MenuBar.tsx';
import { Cards } from '@/layouts/sideBar/Cards.tsx';
// import { Icons } from '@/layouts/sideBar/Icons.tsx';
import { CollapsibleMenus } from '@/layouts/sideBar/CollapsibleMenus.tsx';

// import { Conditions } from '@/layouts/sideBar/Conditions.tsx';
// import { FileTree } from '@/layouts/sideBar/FileTree.tsx';

export const iframeHeight = '800px';

export const description = 'A sidebar with a header and a search form.';

export default function RootLayout() {
  return (
    <div className='[--footer-height:calc(--spacing(14))] [--header-height:calc(--spacing(14))] [--menuBar-height:calc(--spacing(14))]'>
      <SidebarProvider className='flex max-h-svh flex-col overflow-y-hidden'>
        <Header />
        <MenuBar />
        <div className='flex flex-1'>
          <CollapsibleMenus />
          <SidebarInset>
            <div className='flex flex-1 flex-col gap-4 p-4'>
              <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
                <div className='bg-muted/50 aspect-video rounded-xl' />
                <div className='bg-muted/50 aspect-video rounded-xl' />
                <div className='bg-muted/50 aspect-video rounded-xl' />
              </div>
              <div className='bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min' />
            </div>
          </SidebarInset>
          <Cards />
        </div>
        <Footer />
      </SidebarProvider>
    </div>
  );
}
