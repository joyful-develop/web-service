import { Suspense } from 'react';

import { Outlet, Link, useLocation } from 'react-router';

import { Search, User, Shield, Sliders } from 'lucide-react';

import { GlobalSuspenseFallback } from '@/app/layouts/GlobalSuspenseFallback.tsx';
import { useSettingsStore } from '@/features/settings/useSettingsStore.ts';
import { Input } from '@/shared/components/shadcn-ui/input.tsx';

const sidebarMenus = [
  { id: 'profile', label: '나와 앱의 관계', path: '/settings', icon: User },
  { id: 'security', label: '개인정보 및 보안', path: '/settings/security', icon: Shield },
  { id: 'appearance', label: '모양 (테마)', path: '/settings/appearance', icon: Sliders },
];

export default function SettingsLayout() {
  const { searchQuery, setSearchQuery } = useSettingsStore();
  const location = useLocation();

  return (
    <div className='flex h-[calc(100vh-4rem)] flex-1 overflow-hidden bg-slate-50 dark:bg-zinc-950'>
      {/* 1. 좌측 고정 사이드바 */}
      <aside className='hidden w-68 flex-col justify-between border-r bg-white p-4 md:flex dark:bg-zinc-900'>
        <div className='space-y-6'>
          <div className='px-3 py-2'>
            <h2 className='text-lg font-bold tracking-tight text-neutral-800 dark:text-neutral-200'>설정</h2>
          </div>
          <nav className='space-y-1'>
            {sidebarMenus.map((menu) => {
              // React Router v7의 현재 경로와 매칭 검사
              const isActive = location.pathname === menu.path;
              return (
                <Link
                  key={menu.id}
                  to={menu.path}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-50 font-semibold text-blue-600 dark:bg-blue-950/40 dark:text-blue-400'
                      : 'text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-zinc-800'
                  }`}>
                  <menu.icon className='h-4 w-4' />
                  {menu.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* 2. 우측 콘텐츠 스크롤 영역 (상단 검색바 + 메인 카드 내용) */}
      <div className='flex flex-1 flex-col overflow-y-auto'>
        {/* Chrome 내부 검색바 구역 (스티키 고정) */}
        <div className='sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-white/80 px-8 backdrop-blur dark:bg-zinc-900/80'>
          <div className='relative w-full max-w-lg'>
            <Search className='text-muted-foreground absolute top-2.5 left-3 h-4 w-4' />
            <Input
              type='search'
              placeholder='설정 검색'
              className='border-none bg-slate-100 pl-9 focus-visible:ring-1 focus-visible:ring-blue-500 dark:bg-zinc-800'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* 실제 개별 설정 페이지 내용이 갈아끼워지는 구역 */}
        <main className='flex-1 p-8'>
          <div className='mx-auto max-w-2xl space-y-6'>
            <Suspense fallback={<GlobalSuspenseFallback />}>
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}
