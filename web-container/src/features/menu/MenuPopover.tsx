import { useEffect } from 'react';

import { Link } from 'react-router';

import { useShallow } from 'zustand/react/shallow';

import type { MenuItem } from '@/features/menu/menu.type.ts';
import { useMenuStore } from '@/features/menu/useMenuStore.ts';
import { useUiSettingsStore } from '@/features/settings/useUiSettingsStore.ts';
import { Button, buttonVariants } from '@/shared/components/shadcn-ui/button.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/shadcn-ui/dropdown-menu.tsx';
import { LucideIcon } from '@/shared/icons/LucideIcon.tsx';
import { cn } from '@/shared/utils/shadcn/utils.ts';

export const MenuPopover = () => {
  const themeColor = useUiSettingsStore((state) => state.themeColor);
  const { isMenuPanelOpen, menus, setIsMenuPanelOpen, setSelectedMenuId } = useMenuStore(
    useShallow((state) => ({
      menus: state.menus,
      isMenuPanelOpen: state.isMenuPanelOpen,
      setIsMenuPanelOpen: state.setIsMenuPanelOpen,
      setSelectedMenuId: state.setSelectedMenuId,
    }))
  );

  useEffect(() => {
    const currentMenu = menus.find((m) => m.path === location.pathname);
    setSelectedMenuId(currentMenu ? currentMenu.id : null);
  }, [menus, setSelectedMenuId]);

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
      isLayout: false,
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
      isLayout: false,
      isDefault: false,
      order: 1,
      parentId: null,
      children: null,
      desc: null,
    },
    {
      rawId: 3,
      groupId: '사용자 및 권한 관리',
      id: '3',
      label: '사용자 및 권한 관리',
      path: '/admin/users',
      type: 'local',
      localPath: 'pages/admin/UserManagement',
      remoteUrl: null,
      icon: null,
      isLayout: false,
      isDefault: false,
      order: 1,
      parentId: null,
      children: null,
      desc: null,
    },
    {
      rawId: 99,
      groupId: 'g3',
      id: '99',
      label: 'Settings',
      path: '/settings',
      type: 'local',
      localPath: 'pages/settings/Layout',
      remoteUrl: null,
      icon: null,
      isLayout: true,
      isDefault: false,
      order: 1,
      parentId: null,
      children: [
        {
          rawId: 991,
          groupId: 'g4',
          id: '991',
          label: 'Profile',
          path: '/settings',
          type: 'local',
          localPath: 'pages/settings/Profile',
          remoteUrl: null,
          icon: null,
          isLayout: false,
          isDefault: true,
          order: 1,
          parentId: null,
          children: null,
          desc: null,
        },
        {
          rawId: 992,
          groupId: 'g5',
          id: '992',
          label: 'Appearance',
          path: '/settings/appearance',
          type: 'local',
          localPath: 'pages/settings/Appearance',
          remoteUrl: null,
          icon: null,
          isLayout: false,
          isDefault: false,
          order: 1,
          parentId: null,
          children: null,
          desc: null,
        },
        {
          rawId: 993,
          groupId: 'g6',
          id: '993',
          label: 'Security',
          path: '/settings/security',
          type: 'local',
          localPath: 'pages/settings/Security',
          remoteUrl: null,
          icon: null,
          isLayout: false,
          isDefault: false,
          order: 1,
          parentId: null,
          children: null,
          desc: null,
        },
      ],
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
    <DropdownMenu open={isMenuPanelOpen} onOpenChange={setIsMenuPanelOpen}>
      <DropdownMenuTrigger data-testid='menu-trigger' asChild>
        <Button variant='ghost' size='icon-lg' className='data-[state=open]:bg-accent h-8 w-8'>
          <LucideIcon name='menu' size={48} strokeWidth={1} className='size-5' data-testid='bars4-icon' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent data-testid='menu-popover' className='w-fit p-4' side='bottom' align='start' sideOffset={8}>
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
                  to='/admin/users'
                  className={menuItemClass}
                  onClick={() => handleMenuClick(menus2[2].id)}
                  data-testid={`menu-item-${menus2[2].id}`}>
                  <span>사용자 관리</span>
                </Link>
                <Link
                  key='4'
                  to='/error'
                  className={menuItemClass}
                  onClick={() => handleMenuClick(menus2[3].id)}
                  data-testid={`menu-item-${menus2[3].id}`}>
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
