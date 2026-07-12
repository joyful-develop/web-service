import * as React from 'react';

import { Link } from 'react-router'; // React Router v7

import { Menu, Settings, LogOut, User, Bell, ShieldCheck } from 'lucide-react';

// import { SettingsDialog } from '@/features/settings/SettingsDialog.tsx';
import { SettingsSheet } from '@/features/settings/SettingsSheet.tsx';
import { ChromeUserPopup } from '@/features/user-config/UserAccountNav.tsx';
import { UserProfile } from '@/features/user-profile/UserProfile.tsx';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/shadcn-ui/avatar.tsx';
import { Button } from '@/shared/components/shadcn-ui/button.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/shadcn-ui/dropdown-menu.tsx';
import { useAuthStore } from '@/shared/store/useAuthStore.ts';

export function Header2() {
  const { user, logout } = useAuthStore();

  // ⚙️ 설정 다이얼로그 열림/닫힘 상태 관리
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

  return (
    <>
      <header className='bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur'>
        <div className='container flex h-16 items-center justify-between px-4'>
          {/* 왼쪽 영역: 모바일 메뉴 버튼 + 로고 및 시스템 이름 */}
          <div className='flex items-center gap-4'>
            <Button variant='ghost' size='icon' className='md:hidden' aria-label='메뉴 열기'>
              <Menu className='h-5 w-5' />
            </Button>

            <Link to='/' className='flex items-center gap-2 text-xl font-bold tracking-tight'>
              <ShieldCheck className='text-primary h-6 w-6' />
              <span className='from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-transparent select-none'>
                CoreSystem
              </span>
            </Link>
          </div>

          {/* 오른쪽 영역: 옵션 버튼 세트 + 사용자 프로필 드롭다운 */}
          <div className='flex items-center gap-4'>
            {/* 상단 공통 옵션 버튼 제어 영역 */}
            <div className='flex items-center gap-1'>
              <Button variant='ghost' size='icon' aria-label='알림 보기'>
                <Bell className='text-muted-foreground h-5 w-5' />
              </Button>

              {/* ⚙️ 설정 버튼 클릭 시 다이얼로그 상태를 true로 변경 */}
              <Button variant='ghost' size='icon' aria-label='시스템 설정' onClick={() => setIsSettingsOpen(true)}>
                <Settings className='text-muted-foreground h-5 w-5' />
              </Button>

              <Link to='/settings' className='text-blue-600 hover:underline'>
                설정
              </Link>
            </div>

            {/* 세로 구분선 */}
            <span className='bg-border hidden h-5 w-px sm:block' />

            {/* 사용자 세션 정보 및 전용 메뉴 버튼 드롭다운 */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' className='relative h-9 w-9 rounded-full select-none'>
                    <Avatar className='h-9 w-9'>
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className='w-56' align='end' forceMount>
                  <DropdownMenuLabel className='font-normal'>
                    <div className='flex flex-col space-y-1'>
                      <p className='text-sm leading-none font-medium'>{user.name}</p>
                      <p className='text-muted-foreground text-xs leading-none'>{user.email}</p>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  {/* React Router v7 내비게이션을 위한 asChild 바인딩 */}
                  <DropdownMenuItem asChild>
                    <Link to='/profile' className='flex w-full cursor-pointer items-center'>
                      <User className='mr-2 h-4 w-4' />
                      <span>마이페이지</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to='/settings' className='flex w-full cursor-pointer items-center'>
                      <Settings className='mr-2 h-4 w-4' />
                      <span>개인 설정</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className='text-destructive focus:text-destructive cursor-pointer'
                    onClick={() => logout()}>
                    <LogOut className='mr-2 h-4 w-4' />
                    <span>로그아웃</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild size='sm'>
                <Link to='/login'>로그인</Link>
              </Button>
            )}

            {/* 세로 구분선 */}
            <span className='bg-border hidden h-5 w-px sm:block' />

            <ChromeUserPopup />

            {/* 세로 구분선 */}
            <span className='bg-border hidden h-5 w-px sm:block' />

            <UserProfile />
          </div>
        </div>
      </header>

      {/* ⚙️ 타입 안정성이 검증 완료된 시스템 설정 다이얼로그 주입 */}
      {/* <SettingsDialog isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} /> */}

      {/* ⚙️ 수정한 탭 기반 반응형 설정 시트 컴포넌트 배치 */}
      <SettingsSheet isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
}
