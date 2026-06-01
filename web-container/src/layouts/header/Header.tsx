import { LucideIcon } from '@components/icons/LucideIcon.tsx';
import { NavActions } from '@components/shadcn/nav-actions.tsx';
import { SearchForm } from '@components/shadcn/search-form.tsx';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/shadcn-ui/breadcrumb.tsx';
import { Button } from '@components/shadcn-ui/button.tsx';
import { Separator } from '@components/shadcn-ui/separator.tsx';
import { useSidebar } from '@components/shadcn-ui/sidebar.tsx';
import { ModeToggle } from '@components/theme/ModeToggle.tsx';

export function Header() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className='bg-background sticky top-0 z-50 flex w-full items-center border-b'>
      <div className='flex h-(--header-height) w-full items-center gap-2 px-4'>
        <Button className='h-8 w-8' variant='ghost' size='icon' onClick={toggleSidebar}>
          <LucideIcon name='panelLeftIcon' />
        </Button>
        <Separator orientation='vertical' className='mr-2 data-vertical:h-4 data-vertical:self-auto' />
        <Breadcrumb className='hidden sm:block'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='#'>Build Your Application</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Data Fetching</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <NavActions />
        <SearchForm className='w-full sm:ml-auto sm:w-auto' />
        <ModeToggle />
        <LucideIcon name='settings2Icon' />
      </div>
    </header>
  );
}
