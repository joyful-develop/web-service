import { LucideIcon } from '@components/icons/LucideIcon.tsx';
import { NavActions } from '@components/shadcn/nav-actions.tsx';
import { SearchForm } from '@components/shadcn/search-form.tsx';
import { ModeToggle } from '@components/theme/ModeToggle.tsx';

export function Header() {
  return (
    <header className='bg-background sticky top-0 z-50 flex w-full items-center border-b'>
      <div className='flex h-(--header-height) w-full items-center gap-2 px-4'>
        <NavActions />
        <div className='relative inline-block text-center'>
          <LucideIcon name='squareIcon' size={36} strokeWidth={1} className='bg-blue-500 text-white' />
          <span className='absolute top-1/2 left-1/2 -translate-1/2 text-xs leading-none font-bold text-pretty text-white'>
            G-FDC
          </span>
        </div>
        <h1 className='text-3xl font-extrabold'>G-FDC</h1>
        <h1 className='text-base font-medium'>G-FDC</h1>
        <SearchForm className='w-full sm:ml-auto sm:w-auto' />
        <ModeToggle />
        <LucideIcon name='settings2Icon' />
      </div>
    </header>
  );
}
