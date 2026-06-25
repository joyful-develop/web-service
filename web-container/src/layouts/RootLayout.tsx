import { Suspense } from 'react';

import { Outlet, useLocation } from 'react-router';

// import { toast, Toaster } from 'sonner';

import { GlobalErrorBoundary } from '#components/error/GlobalErrorBoundary.tsx';
import { GlobalLoadingFallback } from '#components/error/GlobalLoadingFallback.tsx';

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
  const location = useLocation(); // 💡 라우트 경로가 바뀔 때 에러 화면을 자동으로 리셋하기 위함

  // useEffect(() => {
  //   if (message) {
  //     let iconName: IconName;
  //     switch (type) {
  //       case 'Info':
  //         iconName = 'info';
  //         break;
  //       case 'Warning':
  //         iconName = 'triangleAlert';
  //         break;
  //       case 'Error':
  //         iconName = 'circleX';
  //         break;
  //       case 'Success':
  //         iconName = 'circleCheckBig';
  //         break;
  //       default:
  //         iconName = null;
  //         break;
  //     }

  //     toast(message, {
  //       description: description,
  //       position: 'top-right',
  //       icon: iconName ? (
  //         <LucideIcon name={iconName} size={32} strokeWidth={2} className='bg-blue-500 text-white' />
  //       ) : null,
  //     });
  //     reset();
  //   }
  // }, [type, message, description, reset]);

  return (
    <div className='[--footer-height:calc(--spacing(10))] [--header-height:calc(--spacing(14))] [--menuBar-height:calc(--spacing(14))]'>
      <SidebarProvider className='flex max-h-svh flex-col overflow-y-hidden'>
        <Header />
        <MenuBar />
        <div className='flex flex-1'>
          <Icons />
          <CollapsibleMenus />
          <SidebarInset>
            <GlobalErrorBoundary resetKey={location.key}>
              {/* Shadcn 디자인 무드에 맞는 스켈레톤/로더 배치 */}
              <Suspense fallback={<GlobalLoadingFallback />}>
                <Outlet />
              </Suspense>
            </GlobalErrorBoundary>
          </SidebarInset>
          <Conditions />
          <Icons />
        </div>
        <Footer />
      </SidebarProvider>
    </div>
  );
}
