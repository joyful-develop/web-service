import { useState } from 'react';

import { Link } from 'react-router';

import { LogOut, Settings, Check } from 'lucide-react';

import { useLogout } from '@/features/user-auth/useUserAuthQuery.ts';
import { useUserConfigStore, type LocaleLanguage, type ThemeMode } from '@/features/user-config/useUserConfigStore.ts';
import { Avatar, AvatarFallback } from '@/shared/components/shadcn-ui/avatar.tsx';
import { Button } from '@/shared/components/shadcn-ui/button.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/shadcn-ui/dropdown-menu.tsx';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/components/shadcn-ui/tooltip.tsx';
import { LucideIcon } from '@/shared/icons/LucideIcon.tsx';
import { cn } from '@/shared/utils/shadcn/utils.ts';

export function UserAccountNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, language, setLanguage } = useUserConfigStore();
  const { mutate: logout } = useLogout();

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon-lg'>
              <LucideIcon
                name='ellipsisVertical'
                size={48}
                strokeWidth={1}
                className='size-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90'
              />
              <span className='sr-only'>Settings</span>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Settings</p>
        </TooltipContent>
      </Tooltip>

      <DropdownMenuContent className='w-[350px] rounded-2xl p-3 shadow-2xl' align='end'>
        {/* 프로필 헤더 */}
        <div className='mb-2 flex items-center gap-3 p-2'>
          <Avatar className='h-12 w-12 shadow-sm'>
            <AvatarFallback className='bg-blue-600 font-bold text-white'>SY</AvatarFallback>
          </Avatar>
          <div className='flex flex-col'>
            <span className='text-sm font-semibold text-slate-900 dark:text-slate-100'>Song Young Jin</span>
            <span className='text-xs text-slate-500'>user@example.com</span>
          </div>
        </div>

        <DropdownMenuSeparator className='-mx-3' />

        {/* 다크 모드 카드 섹션 */}
        <div className='py-3'>
          <div className='mb-2 px-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase'>Appearance</div>
          <div className='grid grid-cols-3 gap-2 px-1'>
            {(['light', 'dark', 'system'] as ThemeMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setTheme(mode)}
                className={cn(
                  'flex flex-col items-center justify-center gap-1.5 rounded-xl border py-3 transition-all',
                  theme === mode
                    ? 'border-blue-500 bg-blue-50/50 ring-1 ring-blue-500 dark:bg-blue-900/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950'
                )}>
                <div
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full',
                    theme === mode ? 'text-blue-600' : 'text-slate-400'
                  )}>
                  {mode === 'light' && <span className='text-lg'>☀️</span>}
                  {mode === 'dark' && <span className='text-lg'>🌙</span>}
                  {mode === 'system' && <span className='text-lg'>💻</span>}
                </div>
                <span className={cn('text-[11px] font-medium', theme === mode ? 'text-blue-700' : 'text-slate-500')}>
                  {mode.toUpperCase()}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 다국어 카드 섹션 */}
        <div className='py-3'>
          <div className='mb-2 px-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase'>Language</div>
          <div className='grid grid-cols-2 gap-2 px-1'>
            {[
              { code: 'ko', label: '한국어', flag: '🇰🇷' },
              { code: 'en', label: 'English', flag: '🇺🇸' },
              { code: 'zh', label: '中文', flag: '🇨🇳' },
              { code: 'hu', label: 'Magyar', flag: '🇭🇺' },
            ].map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code as LocaleLanguage)}
                className={cn(
                  'relative flex items-center gap-2 rounded-xl border p-2.5 text-left transition-all',
                  language === lang.code
                    ? 'border-blue-500 bg-blue-50/50 ring-1 ring-blue-500 dark:bg-blue-900/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950'
                )}>
                <span className='text-base'>{lang.flag}</span>
                <span
                  className={cn('text-xs font-medium', language === lang.code ? 'text-blue-700' : 'text-slate-600')}>
                  {lang.label}
                </span>
                {language === lang.code && <Check className='absolute right-2 h-3 w-3 text-blue-600' />}
              </button>
            ))}
          </div>
        </div>

        <DropdownMenuSeparator className='-mx-3' />

        {/* 하단 링크 및 액션 */}
        <DropdownMenuGroup className='p-1'>
          <DropdownMenuItem asChild className='h-10 cursor-pointer rounded-lg px-3 focus:bg-slate-100'>
            <Link to='/settings' className='flex w-full items-center' onClick={() => setIsOpen(false)}>
              <Settings className='mr-3 h-4 w-4 text-slate-500' />
              <span className='text-sm font-medium'>환경 설정</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => logout()}
            className='h-10 cursor-pointer rounded-lg px-3 text-red-600 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950/30'>
            <LogOut className='mr-3 h-4 w-4' />
            <span className='text-sm font-medium'>로그아웃</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
