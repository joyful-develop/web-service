import { useEffect } from 'react';

import { Link } from 'react-router';

import type { MenuItem } from '@/features/menu/menu.type.ts';
// import { useMenuQuery } from '@/features/menu/useMenuQuery.ts';
import { useMenuStore } from '@/features/menu/useMenuStore.ts';
import { useUiSettingsStore } from '@/features/settings/useUiSettingsStore.ts';
import { Button, buttonVariants } from '@/shared/components/shadcn-ui/button.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/shadcn-ui/popover.tsx';

import { HeroIcon } from '@shared/icons/HeroIcon.tsx';
import type { ApiRequest } from '@shared/types/api.types.ts';
import { cn } from '@shared/utils/tw-utils.ts';

export const MenuPopover = () => {
  const { themeColor, fetchUiSettings } = useUiSettingsStore();

  useEffect(() => {
    if (!themeColor) {
      const request: ApiRequest = { userId: '123456' };
      fetchUiSettings(request);
    }
  }, [fetchUiSettings, themeColor]);

  const { isMenuPanelOpen, setIsMenuPanelOpen, setSelectedMenuId } = useMenuStore();

  // 💡 파라미터를 넘겨주면, 스토어의 값이 바뀔 때마다 useMenuQuery가 자동으로 반응합니다.
  const reqeust: ApiRequest = { userId: '123456' };
  const { getMenus, menus, isLoading } = useMenuStore();
  getMenus(reqeust);

  useEffect(() => {
    if (menus && menus.length > 0) {
      const currentMenu = menus.find((m) => m.path === location.pathname);
      setSelectedMenuId(currentMenu ? currentMenu.id : null);
    }
  }, [setSelectedMenuId]);

  if (isLoading) {
    return (
      <div className='bg-background text-foreground flex h-screen w-screen items-center justify-center'>
        <p className='text-muted-foreground animate-pulse text-sm font-medium'>Menu Loading...</p>
      </div>
    );
  }

  const menuColClass = 'md:grid-cols-2';
  const menuItemClass = cn(
    buttonVariants({ variant: 'ghost' }),
    `w-full justify-start gap-2 h-9 px-2 font-normal hover:text-[${themeColor}]` // {${selectedMenuId === menu.id ? 'text-red-500' : 'text-black-500'}`
  );

  const menus2: MenuItem[] = [
    {
      rawId: 1,
      groupId: 'g1',
      id: '1',
      label: 'Home',
      path: '/',
      type: 'local',
      localPath: 'pages/Home/Home',
      remoteUrl: null,
      icon: null,
      isDefault: true,
      order: 1,
      parentId: null,
      children: null,
      desc: null,
    },
    {
      rawId: 2,
      groupId: 'g2',
      id: '2',
      label: 'About',
      path: '/about',
      type: 'local',
      localPath: 'pages/About/About',
      remoteUrl: null,
      icon: null,
      isDefault: true,
      order: 1,
      parentId: null,
      children: null,
      desc: null,
    },
    {
      rawId: 3,
      groupId: 'g3',
      id: '3',
      label: 'Error',
      path: '/error',
      type: 'local',
      localPath: 'pages/Error/error',
      remoteUrl: null,
      icon: null,
      isDefault: true,
      order: 1,
      parentId: null,
      children: null,
      desc: null,
    },
  ];

  const handleMenuClick = (id: string) => {
    setSelectedMenuId(id);
    setIsMenuPanelOpen(false);
  };
  {
    /* <button onClick={() => handleMenuClick(menu.id, menu.path)} */
  }
  // data-testid={`menu-item-${menu.id}`}

  return (
    <Popover open={isMenuPanelOpen} onOpenChange={setIsMenuPanelOpen}>
      <PopoverTrigger data-testid='menu-trigger' asChild>
        <Button variant='ghost' size='icon-lg' className='data-[state=open]:bg-accent h-8 w-8'>
          <HeroIcon name='bars4Icon' className='text-muted-foreground size-6' data-testid='bars4-icon' />
        </Button>
      </PopoverTrigger>
      <PopoverContent data-testid='menu-popover' className='w-fit p-4' side='bottom' align='start' sideOffset={8}>
        {isLoading && <div className='text-muted-foreground p-2 text-center text-sm'>로딩 중...</div>}
        {menus && (
          <div className='flex'>
            <div className='mr-6 min-w-3xs border-r pr-6'>
              <div>
                <div className='text-foreground border-foreground mb-1 border-b px-2 py-1.5 text-sm font-bold'>
                  최근 메뉴
                </div>
                <div className='flex flex-col'>
                  <Link
                    key='1'
                    to='/'
                    className={menuItemClass}
                    onClick={() => handleMenuClick(menus2[0].id)}
                    data-testid={`menu-item-${menus2[0].id}`}>
                    <span>Home</span>
                  </Link>
                  <Link
                    key='2'
                    to='/about'
                    className={menuItemClass}
                    onClick={() => handleMenuClick(menus2[1].id)}
                    data-testid={`menu-item-${menus2[1].id}`}>
                    <span>About</span>
                  </Link>
                  <Link
                    key='3'
                    to='/error'
                    className={menuItemClass}
                    onClick={() => handleMenuClick(menus2[2].id)}
                    data-testid={`menu-item-${menus2[2].id}`}>
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
                  <Link key='1' to='/' className={menuItemClass} onClick={() => handleMenuClick(menus2[0].id)}>
                    <span>Home</span>
                  </Link>
                  <Link key='2' to='/about' className={menuItemClass} onClick={() => handleMenuClick(menus2[1].id)}>
                    <span>About</span>
                  </Link>
                  <Link key='3' to='/error' className={menuItemClass} onClick={() => handleMenuClick(menus2[2].id)}>
                    <span>Error</span>
                  </Link>
                </div>
              </div>
              <div>
                <div className='text-foreground border-foreground mb-1 border-b px-2 py-1.5 text-sm font-bold'>
                  최근 메뉴
                </div>
                <div className='flex flex-col'>
                  <Link key='1' to='/' className={menuItemClass} onClick={() => handleMenuClick(menus2[0].id)}>
                    <span>Home</span>
                  </Link>
                  <Link key='2' to='/about' className={menuItemClass} onClick={() => handleMenuClick(menus2[1].id)}>
                    <span>About</span>
                  </Link>
                  <Link key='3' to='/error' className={menuItemClass} onClick={() => handleMenuClick(menus2[2].id)}>
                    <span>Error</span>
                  </Link>
                </div>
              </div>
              <div>
                <div className='text-foreground border-foreground mb-1 border-b px-2 py-1.5 text-sm font-bold'>
                  최근 메뉴
                </div>
                <div className='flex flex-col'>
                  <Link key='1' to='/' className={menuItemClass} onClick={() => handleMenuClick(menus2[0].id)}>
                    <span>Home</span>
                  </Link>
                  <Link key='2' to='/about' className={menuItemClass} onClick={() => handleMenuClick(menus2[1].id)}>
                    <span>About</span>
                  </Link>
                  <Link key='3' to='/error' className={menuItemClass} onClick={() => handleMenuClick(menus2[2].id)}>
                    <span>Error</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
