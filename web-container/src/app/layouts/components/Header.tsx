import { Link } from 'react-router';

import { MenuPopover } from '@/features/menu/MenuPopover.tsx';
import { UserAccountNav } from '@/features/user-config/UserAccountNav.tsx';
import { UserProfile } from '@/features/user-profile/UserProfile.tsx';
import { Button } from '@/shared/components/shadcn-ui/button.tsx';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/components/shadcn-ui/tooltip.tsx';
import { LucideIcon } from '@/shared/icons/LucideIcon.tsx';

export function Header() {
  return (
    <header className='bg-background sticky top-0 z-50 flex w-full items-center border-b'>
      <div className='flex h-(--header-height) w-full items-center gap-2 px-2'>
        <div className='flex w-full basis-3/6 flex-row flex-wrap items-center justify-start gap-2'>
          <MenuPopover />
          <Link to='/' className='flex items-center gap-2 text-xl font-bold tracking-tight'>
            <div className='relative inline-block text-center'>
              <LucideIcon name='square' size={32} strokeWidth={2} className='bg-blue-500 text-white' />
              <span className='absolute top-1/2 left-1/2 -translate-1/2 text-[10px] leading-none font-bold text-pretty text-white'>
                G-FDC
              </span>
            </div>
            <span className='from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-transparent select-none'>
              G-FDC
            </span>
          </Link>
          <div className='mt-1 text-sm'>
            <p>Global Fault Detect & Classification System</p>
          </div>
          <div className='mt-1 text-sm'>
            <p>(Ver. 3.2.2605191)</p>
          </div>
        </div>
        <div className='flex w-full basis-1/6 flex-row flex-wrap items-center justify-center gap-2'></div>
        <div className='flex w-full basis-2/6 flex-row flex-wrap items-center justify-end gap-2'>
          <span className='bg-border hidden h-5 w-px sm:block' />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='ghost' size='icon-lg'>
                <LucideIcon
                  name='refreshCw'
                  size={48}
                  strokeWidth={1}
                  className='size-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90'
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
              <Button variant='ghost' size='icon-lg'>
                <LucideIcon
                  name='bell'
                  size={48}
                  strokeWidth={1}
                  className='size-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90'
                />
                <span className='sr-only'>Notification</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Notification</p>
            </TooltipContent>
          </Tooltip>
          <span className='bg-border hidden h-5 w-px sm:block' />
          <UserProfile />
          <span className='bg-border hidden h-5 w-px sm:block' />
          <UserAccountNav />
        </div>
      </div>
    </header>
  );
}
