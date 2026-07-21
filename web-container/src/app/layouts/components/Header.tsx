import { useState } from 'react';

import { Bell, RotateCw } from 'lucide-react';

import { HeaderCenterNavbar } from '@/app/layouts/components/HeaderCenterNavbar.tsx';
import { HeaderLeftMenu } from '@/app/layouts/components/HeaderLeftMenu.tsx';
import { HeaderSettingsMenu } from '@/app/layouts/components/HeaderSettingsMenu.tsx';
import { MenuPopover } from '@/features/menu/MenuPanel.tsx';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <header className='bg-background z-40 flex h-16 shrink-0 items-center justify-between border-b border-gray-200 px-6 shadow-sm select-none'>
      {/* ================= 좌측 세션: 브랜드 및 시스템 정보 ================= */}
      <div className='flex items-center gap-4'>
        <HeaderLeftMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <MenuPopover />

        {/* 로고 & 시스템명 & 설명 */}
        <div className='flex items-center gap-3'>
          <div className='flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-sm font-black shadow-md shadow-blue-200'>
            FO
          </div>
          <div className='flex flex-col'>
            <div className='flex items-center gap-2'>
              <span className='text-sm font-bold tracking-tight'>FlexOps</span>
              <span className='rounded-md bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-blue-600'>
                Core v1
              </span>
            </div>
            <span className='text-muted-foreground -mt-0.5 text-[11px] font-medium'>
              모듈의 추가와 삭제가 자유로운 아키텍처
            </span>
          </div>
        </div>
      </div>

      {/* ================= 중앙 세션: 메뉴 네비게이션 ================= */}
      <HeaderCenterNavbar />

      {/* ================= 우측 세션: 유틸리티 및 사용자 프로필 ================= */}
      <div className='flex items-center gap-4'>
        {/* 🔄 Refresh 아이콘 (Lucide Icon 적용 및 호버 회전 이펙트) */}
        <button
          onClick={() => window.location.reload()}
          title='화면 새로고침'
          className='group/refresh text-foreground rounded-lg p-2 transition-all hover:bg-gray-100 hover:text-gray-800 active:scale-95'>
          <RotateCw className='h-4 w-4 transition-transform duration-300 group-hover/refresh:rotate-45' />
        </button>

        {/* 🔔 알림 아이콘 (Lucide Icon 적용 및 팝오버) */}
        <div className='group/noti relative'>
          <button className='text-foreground relative rounded-lg p-2 transition-colors hover:bg-gray-100 hover:text-gray-800'>
            <Bell className='h-4 w-4' />
            {/* 알림 배지 인디케이터 */}
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

        <div className='h-4 w-[1px] bg-gray-200' />

        {/* 3. 사용자 프로필 (사진, 이름, 권한 라벨 및 클릭 드롭다운 연동) */}
        <div className='group/profile relative'>
          <div className='flex cursor-pointer items-center gap-3 rounded-xl border border-transparent p-1 transition-colors hover:border-gray-100 hover:bg-gray-50'>
            <div className='flex h-8 w-8 items-center justify-center rounded-lg border border-blue-200 bg-blue-100 text-xs font-bold text-blue-700 shadow-inner'>
              김U
            </div>
            <div className='flex hidden flex-col text-left sm:flex'>
              <span className='text-foreground text-xs leading-tight font-semibold'>김유저 책임</span>
              <span className='text-muted-foreground text-[10px] font-medium tracking-wide'>Workspace Admin</span>
            </div>
          </div>

          <div className='absolute top-full right-0 z-50 mt-1 hidden w-64 rounded-xl border border-gray-200 bg-white p-4 shadow-xl group-hover/profile:block'>
            <div className='mb-3 rounded-lg border border-gray-100 bg-gray-50 p-2.5'>
              <span className='block text-[10px] font-bold tracking-wider text-gray-400 uppercase'>
                보유 접근 상세 권한
              </span>
              <div className='mt-1.5 flex flex-wrap gap-1'>
                <span className='rounded border border-blue-100 bg-blue-50 px-1.5 py-0.5 text-[10px] font-medium text-blue-700'>
                  인프라 제어
                </span>
                <span className='rounded border border-purple-100 bg-purple-50 px-1.5 py-0.5 text-[10px] font-medium text-purple-700'>
                  프로젝트 승인권
                </span>
              </div>
            </div>
            <div className='space-y-1 text-xs'>
              <a href='/my-account' className='block rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-50'>
                👤 마이 계정 센터
              </a>
              <div className='my-2 border-t border-gray-100' />
              <button className='w-full rounded-lg p-2 text-left font-semibold text-red-600 transition-colors hover:bg-red-50'>
                🚪 로그아웃
              </button>
            </div>
          </div>
        </div>

        <div className='h-4 w-[1px] bg-gray-200' />

        <HeaderSettingsMenu />
      </div>
    </header>
  );
}
