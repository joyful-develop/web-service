import React, { useEffect } from 'react';

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
  const { isMenuPanelOpen, menus, setIsMenuPanelOpen, setSelectedMenuRawId } = useMenuStore(
    useShallow((state) => ({
      menus: state.menus,
      isMenuPanelOpen: state.isMenuPanelOpen,
      setIsMenuPanelOpen: state.setIsMenuPanelOpen,
      setSelectedMenuRawId: state.setSelectedMenuRawId,
    }))
  );

  useEffect(() => {
    const currentMenu = menus.find((m) => m.path === location.pathname);
    setSelectedMenuRawId(currentMenu ? currentMenu.rawId : null);
  }, [menus, setSelectedMenuRawId]);

  const menuColClass = 'md:grid-cols-2';

  const handleMenuClick = (rawId: number) => {
    setSelectedMenuRawId(rawId);
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
              {/* <div className='text-foreground border-foreground mb-1 border-b px-2 py-1.5 text-sm font-bold'>
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
              </div> */}
            </div>
          </div>
          <div className={`grid min-w-3xs gap-2 md:min-w-md md:gap-6 ${menuColClass}`}>
            <CreateMenu items={menus} onItemClick={handleMenuClick} />
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface CreateMenuProps {
  items: MenuItem[];
  onItemClick: (rawId: number) => void;
}

const CreateMenu: React.FC<CreateMenuProps> = ({ items, onItemClick }) => {
  const themeColor = useUiSettingsStore((state) => state.themeColor);
  const menuItemClass = cn(
    buttonVariants({ variant: 'ghost' }),
    `w-full justify-start gap-2 h-9 px-2 font-normal hover:text-[${themeColor}]` // {${selectedMenuId === menu.id ? 'text-red-500' : 'text-black-500'}`
  );

  return (
    <>
      {items.map((item) => (
        <>
          {item.type === 'group' ? (
            <>
              <div className='text-foreground border-foreground mb-1 border-b px-2 py-1.5 text-sm font-bold'>
                {item.label}
              </div>
              {item.children && item.children.length > 0 && (
                <div className='flex flex-col'>
                  <CreateMenu items={item.children} onItemClick={onItemClick} />
                </div>
              )}
            </>
          ) : (
            <Link
              key={item.rawId}
              to={item.path || ''}
              className={menuItemClass}
              onClick={() => onItemClick(item.rawId)}>
              <span>{item.label}</span>
            </Link>
          )}
        </>
      ))}
    </>
  );
};
