import { Bell, RotateCw } from 'lucide-react';

import { HeaderCenterNavbar } from '@/app/layouts/components/HeaderCenterNavbar.tsx';
import { MenuPanel } from '@/features/menu/MenuPanel.tsx';
import { UserAccountNav } from '@/features/user-config/UserAccountNav.tsx';
import { UserProfile } from '@/features/user-profile/UserProfile.tsx';

export function Header() {
  return (
    <header className='bg-background text-foreground border-border z-40 flex h-16 shrink-0 items-center justify-between border-b px-1 shadow-sm select-none'>
      {/* ================= 좌측 세션: 메뉴 및 시스템 정보 ================= */}
      <div className='flex items-center gap-4'>
        {/* 메뉴 */}
        <MenuPanel />

        {/* 로고 & 시스템명 & 설명 */}
        <div className='flex items-center gap-3'>
          <div className='bg-primary text-primary-foreground shadow-primary flex h-8 w-8 items-center justify-center rounded-xl text-sm font-black shadow-md'>
            FO
          </div>
          <div className='flex flex-col'>
            <div className='flex items-center gap-2'>
              <span className='text-sm font-bold tracking-tight'>FlexOps</span>
              <span className='bg-primary/70 text-primary-foreground rounded-md px-1.5 pt-0.5 text-[9px] font-light tracking-tight'>
                Ver. 1.0.0.1
              </span>
            </div>
            <span className='text-muted-foreground -mt-0.5 text-xs font-medium'>
              모듈의 추가와 삭제가 자유로운 아키텍처
            </span>
          </div>
        </div>
      </div>

      {/* ================= 중앙 세션: 메뉴 네비게이션 ================= */}
      <HeaderCenterNavbar />

      {/* ================= 우측 세션: 유틸리티 및 사용자 프로필 ================= */}
      <div className='flex items-center gap-4'>
        <button onClick={() => window.location.reload()} title='Refresh' className='group/refresh icon-button'>
          <RotateCw className='h-4 w-4 transition-transform duration-100 group-hover/refresh:rotate-45' />
        </button>

        <div className='group/noti relative'>
          <button className='icon-button'>
            <Bell className='h-4 w-4' />
            <span className='absolute top-1.5 right-1.5 h-1.5 w-1.5 animate-pulse rounded-full bg-red-500 ring-2 ring-white' />
          </button>

          {/* 알림 센터 팝오버 내용 */}
          <div className='absolute top-full right-0 z-50 mt-1 hidden w-80 rounded-xl border border-gray-200 bg-white p-4 shadow-xl group-hover/noti:block'>
            <div className='mb-2 flex items-center justify-between border-b pb-2'>
              <h4 className='text-xs font-bold text-gray-800'>최근 미확인 알림</h4>
              <button className='text-[10px] text-blue-600 hover:underline'>모두 읽음 처리</button>
            </div>
            <div className='max-h-48 space-y-2 overflow-y-auto'>
              <div className='rounded-lg border border-blue-100/50 bg-blue-50/50 p-2'>
                <p className='text-xs leading-tight text-gray-700'>
                  ⚠️ <strong>[장애]</strong> 인프라 서버 내부 디스크 사용량 85% 초과 감지.
                </p>
                <span className='mt-1 block text-[10px] text-gray-400'>방금 전</span>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-border h-5 w-px' />

        <UserProfile />

        <div className='bg-border h-5 w-px' />

        <UserAccountNav />
      </div>
    </header>
  );
}
