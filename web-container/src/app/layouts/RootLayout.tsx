import { Suspense } from 'react';

import { Outlet, useLocation } from 'react-router';

// import { toast, Toaster } from 'sonner';

import { CollapsibleMenus } from '@/app/layouts/components/CollapsibleMenus.tsx';
import { Footer } from '@/app/layouts/components/Footer.tsx';
import { MenuBar } from '@/app/layouts/components/MenuBar.tsx';
import { GlobalErrorBoundary } from '@/app/routers/GlobalErrorBoundary.tsx';
import { GlobalLoadingFallback } from '@/app/routers/GlobalLoadingFallback.tsx';
import { SidebarInset, SidebarProvider } from '@/shared/components/shadcn-ui/sidebar.tsx';
import { useTranslation } from '@/shared/i18n/useTranslation.ts';

import { Header } from '@app/layouts/components/Header.tsx';
// import { FileTree } from '@/layouts/menu/FileTree.tsx';
// import { Cards } from '@/layouts/side/Cards.tsx';
import { Conditions } from '@app/layouts/components/side/Conditions.tsx';
import { Icons } from '@app/layouts/components/side/Icons.tsx';

export const iframeHeight = '800px';

export const description = 'A sidebar with a header and a search form.';

export default function RootLayout() {
  const location = useLocation(); // 💡 라우트 경로가 바뀔 때 에러 화면을 자동으로 리셋하기 위함
  const { isLoading } = useTranslation();

  // 최초 다국어 데이터가 적재되기 전까지 화면에 번역 Key 값이 노출되는 현상 완전 방어
  if (isLoading) {
    return (
      <div className='bg-background text-foreground flex h-screen w-screen items-center justify-center'>
        <p className='text-muted-foreground animate-pulse text-sm font-medium'>Initializing DB Translations...</p>
      </div>
    );
  }

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
