import { PanelLeftIcon } from 'lucide-react';

import { ModeToggle } from '#components/theme/ModeToggle.tsx';

import { SearchForm } from '@/components/shadcn/search-form.tsx';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/shadcn-ui/breadcrumb.tsx';
import { Button } from '@/components/shadcn-ui/button.tsx';
import { Separator } from '@/components/shadcn-ui/separator.tsx';
import { useSidebar } from '@/components/shadcn-ui/sidebar.tsx';

export function Footer() {
  const { toggleSidebar } = useSidebar();

  return (
    <footer className='bg-background sticky bottom-0 z-50 flex w-full items-center border-t'>
      <div className='flex h-(--footer-height) w-full items-center gap-2 px-4'>
        <Button className='h-8 w-8' variant='ghost' size='icon' onClick={toggleSidebar}>
          <PanelLeftIcon />
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
        <SearchForm className='w-full sm:ml-auto sm:w-auto' />
        <ModeToggle />
      </div>
    </footer>
  );
}
