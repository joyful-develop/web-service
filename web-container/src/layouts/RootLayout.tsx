import { Outlet } from 'react-router';

import { Toaster } from 'sonner';

import { SidebarInset, SidebarProvider } from '@/components/shadcn-ui/sidebar.tsx';
import { Footer } from '@/layouts/footer/Footer.tsx';
import { Header } from '@/layouts/header/Header.tsx';
import { CollapsibleMenus } from '@/layouts/menu/CollapsibleMenus.tsx';
// import { FileTree } from '@/layouts/menu/FileTree.tsx';
import { MenuBar } from '@/layouts/menu/MenuBar.tsx';
// import { Cards } from '@/layouts/side/Cards.tsx';
import { Conditions } from '@/layouts/side/Conditions.tsx';
import { Icons } from '@/layouts/side/Icons.tsx';

export const iframeHeight = '800px';

export const description = 'A sidebar with a header and a search form.';

export default function RootLayout() {
  return (
    <div className='[--footer-height:calc(--spacing(10))] [--header-height:calc(--spacing(14))] [--menuBar-height:calc(--spacing(14))]'>
      <SidebarProvider className='flex max-h-svh flex-col overflow-y-hidden'>
        <Header />
        <MenuBar />
        <div className='flex flex-1'>
          <Icons />
          <CollapsibleMenus />
          <SidebarInset>
            <Outlet />
            <Toaster />
          </SidebarInset>
          <Conditions />
          <Icons />
        </div>
        <Footer />
      </SidebarProvider>
    </div>
  );
}
