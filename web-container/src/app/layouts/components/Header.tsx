import { UserProfile } from '@/app/layouts/components/UserProfile.tsx';
import { MenuPopover } from '@/features/menu/MenuPopover.tsx';
import { Button } from '@/shared/components/shadcn-ui/button.tsx';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/components/shadcn-ui/tooltip.tsx';
import { LucideIcon } from '@/shared/icons/LucideIcon.tsx';

export function Header() {
  return (
    <header className='bg-background sticky top-0 z-50 flex w-full items-center border-b'>
      <div className='flex h-(--header-height) w-full items-center gap-2 px-4'>
        <div className='flex w-full basis-3/6 flex-row flex-wrap items-center justify-start gap-2'>
          <MenuPopover />
          <div className='relative inline-block text-center'>
            <LucideIcon name='squareIcon' size={32} strokeWidth={2} className='bg-blue-500 text-white' />
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
        </div>
        <div className='flex w-full basis-1/6 flex-row flex-wrap items-center justify-center gap-2'></div>
        <div className='flex w-full basis-2/6 flex-row flex-wrap items-center justify-end gap-2'>
          <div className='bg-muted flex gap-1.5 rounded-lg border p-1'>
            <button
              className={`text-muted-foreground hover:text-foreground rounded-md px-3 py-1 text-xs font-semibold transition-all`}>
              KO
            </button>
            <button
              className={`bg-background text-foreground rounded-md px-3 py-1 text-xs font-semibold shadow-sm transition-all`}>
              EN
            </button>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='outline' size='icon'>
                <LucideIcon
                  name='refreshCwIcon'
                  size={48}
                  strokeWidth={2}
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
                  strokeWidth={2}
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
                  strokeWidth={2}
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
      </div>
    </header>
  );
}
