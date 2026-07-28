import React, { useMemo } from 'react';

import { Link } from 'react-router';

import { ChevronDown } from 'lucide-react';

import type { MenuItem } from '@/features/menu/menu.type.ts';
import { DropdownMenuItem } from '@/shared/components/shadcn-ui/dropdown-menu.tsx';
import { cn } from '@/shared/utils/shadcn/utils.ts';

interface MenuPanelMapProps {
  menus: MenuItem[];
  onMenuClick: (menu: MenuItem) => void;
  selectedMenu: string | null;
  depth?: number;
}

export const MenuPanelMap = React.memo(function MenuPanelMap({
  menus,
  onMenuClick,
  selectedMenu,
  depth = 1,
}: MenuPanelMapProps) {
  const isChildActive = (menu: MenuItem): boolean => {
    if (!selectedMenu) return false;
    if (menu.path === selectedMenu) return true;
    return menu.children?.some((child) => isChildActive(child)) ?? false;
  };

  const visibleMenus = useMemo(() => menus.filter((menu) => menu.specialUse === null), [menus]);

  return (
    <>
      {visibleMenus.map((menu) => {
        const hasChildren = !menu.isLayout && (menu.children ?? []).length > 0;
        const isActive = menu.path === selectedMenu;

        return (
          <React.Fragment key={menu.rawId}>
            {hasChildren ? (
              depth === 1 ? (
                <section
                  className='flex h-full min-w-45 shrink-0 flex-col px-2'
                  role='region'
                  aria-labelledby='menu-heading'>
                  <div id='menu-heading' className='border-sub-border border-b p-2'>
                    {menu.label}
                  </div>
                  <div className='flex-1 p-1.5'>
                    <div className='flex flex-col'>
                      <MenuPanelMap
                        menus={menu.children!}
                        onMenuClick={onMenuClick}
                        selectedMenu={selectedMenu}
                        depth={depth + 1}
                      />
                    </div>
                  </div>
                </section>
              ) : (
                <MenuAccordionItem
                  menu={menu}
                  onMenuClick={onMenuClick}
                  selectedMenu={selectedMenu}
                  depth={depth}
                  isActive={isChildActive(menu)}
                />
              )
            ) : (
              <MenuPanelMapLink menu={menu} isActive={isActive} onMenuClick={onMenuClick} />
            )}
          </React.Fragment>
        );
      })}
    </>
  );
});

function MenuAccordionItem({
  menu,
  onMenuClick,
  selectedMenu,
  depth,
  isActive,
}: {
  menu: MenuItem;
  onMenuClick: (menu: MenuItem) => void;
  selectedMenu: string | null;
  depth: number;
  isActive: boolean;
}) {
  return (
    <div className='group flex w-full flex-col'>
      <button className='hover:text-accent-foreground transition-color flex items-center justify-between p-2'>
        <span className='truncate'>{menu.label}</span>
        <ChevronDown
          className={cn(
            'h-3 w-3 -rotate-90 transform transition-transform duration-100',
            isActive ? 'rotate-0' : 'group-hover:rotate-0'
          )}
        />
      </button>
      <div className={cn('flex-col gap-1 pl-3', isActive ? 'flex' : 'hidden group-hover:flex')}>
        <MenuPanelMap menus={menu.children!} onMenuClick={onMenuClick} selectedMenu={selectedMenu} depth={depth + 1} />
      </div>
    </div>
  );
}

export function MenuPanelMapLink({
  menu,
  isActive,
  onMenuClick,
}: {
  menu: MenuItem;
  isActive: boolean;
  onMenuClick: (m: MenuItem) => void;
}) {
  return (
    <DropdownMenuItem variant='custom' asChild>
      <Link
        to={menu.path || '#'}
        onClick={() => onMenuClick(menu)}
        className={cn(
          'hover:bg-sub-accent hover:text-accent-foreground transition-color h-8 cursor-default p-2 text-left',
          isActive && 'text-user-theme'
        )}>
        <span className='truncate'>{menu.label}</span>
      </Link>
    </DropdownMenuItem>
  );
}
