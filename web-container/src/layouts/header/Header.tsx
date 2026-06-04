import { Button } from '#components/shadcn-ui/button.tsx';

import { UserProfile } from '@/layouts/header/UserProfile.tsx';

import { LucideIcon } from '@components/icons/LucideIcon.tsx';
import { SearchForm } from '@components/shadcn/search-form.tsx';
import { Tooltip, TooltipContent, TooltipTrigger } from '@components/shadcn-ui/tooltip.tsx';
import { ModeToggle } from '@components/theme/ModeToggle.tsx';
import { ManuButton } from '@layouts/menu/ManuButton.tsx';

export function Header() {
  return (
    <header className='bg-background sticky top-0 z-50 flex w-full items-center border-b'>
      <div className='flex h-(--header-height) w-full items-center gap-2 px-4'>
        <ManuButton />
        <div className='relative inline-block text-center'>
          <LucideIcon name='squareIcon' size={32} strokeWidth={1} className='bg-blue-500 text-white' />
          <span className='absolute top-1/2 left-1/2 -translate-1/2 text-[10px] leading-none font-bold text-pretty text-white'>
            G-FDC
          </span>
        </div>
        <h3>G-FDC</h3>
        <div className='mt-1 text-sm'>
          <p>Global Fault Detect & Classification System</p>
        </div>
        <div className='mt-1 text-sm'>
          <p>(Ver. 3.2.2605191)</p>
        </div>
        <SearchForm className='w-full sm:ml-auto sm:w-auto' />
        <ModeToggle />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant='outline' size='icon'>
              <LucideIcon
                name='refreshCwIcon'
                size={48}
                strokeWidth={1}
                className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90'
              />
              <span className='sr-only'>Refresh</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Refresh</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant='outline' size='icon'>
              <LucideIcon
                name='bellIcon'
                size={48}
                strokeWidth={1}
                className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90'
              />
              <span className='sr-only'>Notification</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Notification</p>
          </TooltipContent>
        </Tooltip>
        <UserProfile
          user={{
            name: '송영진',
            employeeId: '123456',
            authority: 'Developer',
            avatar: '',
          }}
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant='outline' size='icon'>
              <LucideIcon
                name='ellipsisVerticalIcon'
                size={48}
                strokeWidth={1}
                className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90'
              />
              <span className='sr-only'>Settings</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Settings</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
}
