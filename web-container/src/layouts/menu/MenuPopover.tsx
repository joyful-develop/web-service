import { useEffect, useState } from 'react';

import { Link } from 'react-router';

import { HeroIcon } from '#components/icons/HeroIcon.tsx';
import { Button, buttonVariants } from '#components/shadcn-ui/button.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '#components/shadcn-ui/popover.tsx';
import { cn } from '#utils/shadcn/utils.ts';

import { useUiSettingsStore } from '@/store/useUiSettingsStore.ts';
import type { ApiRequest } from '@/types/api.types.ts';

export function MenuPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const { themeColor, fetchUiSettings } = useUiSettingsStore();

  useEffect(() => {
    if (!themeColor) {
      const request: ApiRequest = { userId: '123456' };
      fetchUiSettings(request);
    }
  }, [fetchUiSettings, themeColor]);

  const menuColClass = 'md:grid-cols-2';
  const menuItemClass = cn(
    buttonVariants({ variant: 'ghost' }),
    `w-full justify-start gap-2 h-9 px-2 font-normal hover:text-[${themeColor}]`
  );

  const handleMenuClick = () => {
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant='ghost' size='icon-lg' className='data-[state=open]:bg-accent h-8 w-8'>
          <HeroIcon name='bars4Icon' className='text-muted-foreground size-6' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-fit p-4' side='bottom' align='start' sideOffset={8}>
        <div className='flex'>
          <div className='mr-6 min-w-3xs border-r pr-6'>
            <div>
              <div className='text-foreground border-foreground mb-1 border-b px-2 py-1.5 text-sm font-bold'>
                최근 메뉴
              </div>
              <div className='flex flex-col'>
                <Link to='/' className={menuItemClass} onClick={handleMenuClick}>
                  <span>Home</span>
                </Link>
                <Link to='/about' className={menuItemClass} onClick={handleMenuClick}>
                  <span>About</span>
                </Link>
                <Link to='/error' className={menuItemClass} onClick={handleMenuClick}>
                  <span>Error</span>
                </Link>
              </div>
            </div>
          </div>
          <div className={`grid min-w-3xs gap-2 md:min-w-md md:gap-6 ${menuColClass}`}>
            <div>
              <div className='text-foreground border-foreground mb-1 border-b px-2 py-1.5 text-sm font-bold'>
                최근 메뉴
              </div>
              <div className='flex flex-col'>
                <Link to='/' className={menuItemClass} onClick={handleMenuClick}>
                  <span>Home</span>
                </Link>
                <Link to='/about' className={menuItemClass} onClick={handleMenuClick}>
                  <span>About</span>
                </Link>
                <Link to='/error' className={menuItemClass} onClick={handleMenuClick}>
                  <span>Error</span>
                </Link>
              </div>
            </div>
            <div>
              <div className='text-foreground border-foreground mb-1 border-b px-2 py-1.5 text-sm font-bold'>
                최근 메뉴
              </div>
              <div className='flex flex-col'>
                <Link to='/' className={menuItemClass} onClick={handleMenuClick}>
                  <span>Home</span>
                </Link>
                <Link to='/about' className={menuItemClass} onClick={handleMenuClick}>
                  <span>About</span>
                </Link>
                <Link to='/error' className={menuItemClass} onClick={handleMenuClick}>
                  <span>Error</span>
                </Link>
              </div>
            </div>
            <div>
              <div className='text-foreground border-foreground mb-1 border-b px-2 py-1.5 text-sm font-bold'>
                최근 메뉴
              </div>
              <div className='flex flex-col'>
                <Link to='/' className={menuItemClass} onClick={handleMenuClick}>
                  <span>Home</span>
                </Link>
                <Link to='/about' className={menuItemClass} onClick={handleMenuClick}>
                  <span>About</span>
                </Link>
                <Link to='/error' className={menuItemClass} onClick={handleMenuClick}>
                  <span>Error</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
