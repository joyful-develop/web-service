import { useState } from 'react';

import { Link } from 'react-router';

import { Check, EllipsisVertical, ChevronRight, Languages, Palette, Settings, LogOut } from 'lucide-react';

import { useLogout } from '@/features/user-auth/useUserAuthQuery.ts';
import { ThemeColorPicker } from '@/features/user-config/theme/ThemeColorPicker.tsx';
import { LocaleLanguages, useUserConfigStore, type ThemeMode } from '@/features/user-config/useUserConfigStore.ts';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/shadcn-ui/dropdown-menu.tsx';
import { cn } from '@/shared/utils/shadcn/utils.ts';

export function UserAccountNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTheme, setIsOpenTheme] = useState<boolean>(false);
  const [isOpenLanguage, setIsOpenLanguage] = useState<boolean>(false);
  const { theme, setTheme, language, setLanguage, getLanguageLabel } = useUserConfigStore();
  const { mutate: logout } = useLogout();

  const baseCss = 'hover:bg-sub-accent hover:text-accent-foreground flex h-12 justify-between px-3 items-center';

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <button className='group/user-account-nav icon-button'>
          <EllipsisVertical className={cn('h-4 w-4 transition-transform duration-100', isOpen && 'rotate-90')} />
          <span className='sr-only'>Settings</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='ring-background bg-background w-60 select-none'
        side='bottom'
        align='end'
        sideOffset={8}
        variant='custom'
        role='setting menu'>
        <div className='border-border bg-secondary rounded-lg text-sm font-light shadow-lg'>
          {/* 테마 변경 */}
          <div className='flex w-full flex-col'>
            <button
              id='theme-menu-button'
              onClick={() => {
                setIsOpenTheme(!isOpenTheme);
                setIsOpenLanguage(false);
              }}
              className={cn(baseCss)}
              aria-haspopup='true'
              aria-expanded={isOpenTheme}
              aria-controls='theme-menu-list'
              role='menuitem'>
              <div className='flex items-center gap-3'>
                <Palette className='h-4 w-4' />
                <span aria-hidden='true'>테마</span>
                <span className='sr-only'>테마 변경</span>
              </div>
              <div className='flex items-center gap-2'>
                <span className='text-xs first-letter:uppercase'>{theme}</span>
                <div className='bg-user-theme h-4 w-4 rounded-sm shadow-inner transition-colors duration-100' />
                <ChevronRight className={`h-3 w-3 transition-transform ${isOpenTheme && 'rotate-90'}`} />
              </div>
            </button>

            {isOpenTheme && (
              <>
                <div
                  id='theme-menu-list'
                  className='bg-sub-background border-t py-1'
                  role='menu'
                  aria-labelledby='theme-menu-button'>
                  {(['light', 'dark', 'system'] as ThemeMode[]).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => {
                        setTheme(mode);
                        setIsOpenTheme(false);
                      }}
                      className={cn(
                        'hover:bg-sub-accent hover:text-accent-foreground flex w-full items-center justify-between px-11 py-2 text-xs hover:cursor-pointer',
                        theme === mode && 'text-user-theme'
                      )}
                      role='menuitemradio'
                      aria-checked={theme === mode}>
                      <span className='first-letter:uppercase'>{mode}</span>
                      {theme === mode && (
                        <Check className='text-user-theme h-3 w-3' strokeWidth={4} aria-hidden='true' />
                      )}
                    </button>
                  ))}
                </div>
                <ThemeColorPicker />
              </>
            )}
          </div>

          {/* 다국어 변경 */}
          <div className='flex w-full flex-col'>
            <button
              id='lang-menu-button'
              onClick={() => {
                setIsOpenTheme(false);
                setIsOpenLanguage(!isOpenLanguage);
              }}
              className={cn('border-t', baseCss)}
              aria-haspopup='true'
              aria-expanded={isOpenLanguage}
              aria-controls='lang-menu-list'
              role='menuitem'>
              <div className='flex items-center gap-3'>
                <Languages className='h-4 w-4' />
                <span aria-hidden='true'>언어</span>
                <span className='sr-only'>언어 변경</span>
              </div>
              <div className='flex items-center gap-1'>
                <span className='text-xs'>{getLanguageLabel()}</span>
                <ChevronRight className={`h-3 w-3 transition-transform ${isOpenLanguage && 'rotate-90'}`} />
              </div>
            </button>

            {isOpenLanguage && (
              <div className='bg-sub-background border-t py-1' role='menu' aria-labelledby='lang-menu-button'>
                {LocaleLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsOpenLanguage(false);
                    }}
                    className={cn(
                      'hover:bg-sub-accent hover:text-accent-foreground flex w-full items-center justify-between px-11 py-2 text-xs hover:cursor-pointer',
                      language === lang.code && 'text-user-theme'
                    )}
                    role='menuitemradio'
                    aria-checked={language === lang.code}>
                    <span>{lang.label}</span>
                    {language === lang.code && (
                      <Check className='text-user-theme h-3 w-3' strokeWidth={4} aria-hidden='true' />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 설정 메뉴 */}
          <div role='none'>
            <Link
              to='/settings'
              onClick={() => setIsOpen(false)}
              className={cn('border-t no-underline decoration-0', baseCss)}
              role='menuitem'>
              <div className='flex items-center gap-3'>
                <Settings className='h-4 w-4' />
                <span aria-hidden='true'>설정</span>
                <span className='sr-only'>설정 메뉴</span>
              </div>
              <ChevronRight className='h-3 w-3' aria-hidden='true' />
            </Link>
          </div>

          {/* 로그 아웃 메뉴 */}
          <div role='none'>
            <button onClick={() => logout()} className={cn('group w-full border-t', baseCss)}>
              <div className='flex items-center gap-3'>
                <LogOut className='h-4 w-4' />
                <span aria-hidden='true'>로그 아웃</span>
                <span className='sr-only'>로그 아웃 메뉴</span>
              </div>
              <ChevronRight className='h-3 w-3' aria-hidden='true' />
            </button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
