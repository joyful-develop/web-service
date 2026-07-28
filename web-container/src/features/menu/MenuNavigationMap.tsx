import React, { useCallback, useMemo } from 'react';

import { Link } from 'react-router';

import { ChevronDown } from 'lucide-react';

import type { MenuItem } from '@/features/menu/menu.type.ts';
import { NavigationMenuLink } from '@/shared/components/shadcn-ui/navigation-menu.tsx';
import { cn } from '@/shared/utils/shadcn/utils.ts';

interface MenuNavigationMapProps {
  menus: MenuItem[];
  onMenuClick: (menu: MenuItem) => void;
  selectedMenu: string | null;
}

export const MenuNavigationMap = React.memo(function MenuNavigationMap({
  menus,
  onMenuClick,
  selectedMenu,
}: MenuNavigationMapProps) {
  const isChildActive = useCallback(
    function checkActive(menu: MenuItem): boolean {
      if (!selectedMenu || !menu.children) return false;
      return menu.children.some((child) => {
        if (child.path === selectedMenu) return true;
        return checkActive(child);
      });
    },
    [selectedMenu]
  );

  const visibleMenus = useMemo(() => menus.filter((menu) => menu.specialUse === null), [menus]);

  return (
    <>
      {visibleMenus.map((menu) => {
        const hasChildren = !menu.isLayout && (menu.children ?? []).length > 0;
        const isActive = menu.path === selectedMenu;

        return (
          <React.Fragment key={menu.rawId}>
            {hasChildren ? (
              <MenuNavigationAccordionItem
                menu={menu}
                onMenuClick={onMenuClick}
                selectedMenu={selectedMenu}
                isActive={isChildActive(menu)}
              />
            ) : (
              <li role='none'>
                <MenuNavigationMapLink
                  key={menu.rawId}
                  menu={menu}
                  isActive={isActive}
                  isTopMenu={false}
                  onMenuClick={onMenuClick}
                />
              </li>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
});

function MenuNavigationAccordionItem({
  menu,
  onMenuClick,
  selectedMenu,
  isActive,
}: {
  menu: MenuItem;
  onMenuClick: (menu: MenuItem) => void;
  selectedMenu: string | null;
  isActive: boolean;
}) {
  console.log(selectedMenu);
  return (
    <li className='group/menu-nav-accordion flex w-full flex-col' role='none'>
      <button
        className='hover:text-accent-foreground transition-color flex items-center justify-between p-2'
        aria-expanded={isActive}
        aria-haspopup='true'
        aria-controls={`submenu-${menu.rawId}`}>
        <span className='truncate'>{menu.label}</span>
        <ChevronDown
          className={cn(
            'h-3 w-3 -rotate-90 transform transition-transform duration-100',
            isActive ? 'rotate-0' : 'group-hover/menu-nav-accordion:rotate-0'
          )}
        />
      </button>
      <ul
        className={cn('flex-col gap-1 pl-3', isActive ? 'flex' : 'hidden group-hover/menu-nav-accordion:flex')}
        aria-label={`${menu.label} 하위 메뉴`}>
        <MenuNavigationMap menus={menu.children!} onMenuClick={onMenuClick} selectedMenu={selectedMenu} />
      </ul>
    </li>
  );
}

export function MenuNavigationMapLink({
  menu,
  isActive,
  isTopMenu,
  onMenuClick,
}: {
  menu: MenuItem;
  isActive: boolean;
  isTopMenu: boolean;
  onMenuClick: (m: MenuItem) => void;
}) {
  return (
    <NavigationMenuLink variant='custom' asChild>
      <Link
        to={menu.path || '#'}
        onClick={() => onMenuClick(menu)}
        className={cn(
          'cursor-default',
          isTopMenu
            ? 'hover:text-user-theme inline-flex h-9 items-center justify-center px-2 text-sm font-light transition-all'
            : 'hover:bg-sub-accent hover:text-accent-foreground transition-color h-8 p-2 text-left',
          isActive && 'text-user-theme'
        )}>
        <div className='truncate'>{menu.label}</div>
      </Link>
    </NavigationMenuLink>
  );
}
