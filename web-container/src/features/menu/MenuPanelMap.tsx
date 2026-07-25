import React, { useMemo } from 'react';

import { Link } from 'react-router';

import { ChevronDown, ChevronRight } from 'lucide-react';

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
                <div className='border-sub-border bg-sub-secondary flex h-full min-w-45 shrink-0 flex-col rounded-lg p-1'>
                  <div className='mb-1 flex items-center gap-2 px-2 pt-1 text-xs font-medium tracking-tight'>
                    {menu.label}
                  </div>
                  <div className='border-sub-border bg-sub-background flex-1 rounded-lg p-1.5'>
                    <div className='flex flex-col gap-1.5'>
                      <MenuPanelMap
                        menus={menu.children!}
                        onMenuClick={onMenuClick}
                        selectedMenu={selectedMenu}
                        depth={depth + 1}
                      />
                    </div>
                  </div>
                </div>
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
      <button className='text-sub-foreground hover:text-accent-foreground flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-sm font-light transition-all hover:font-semibold focus:outline-none'>
        <span className='truncate'>{menu.label}</span>
        <ChevronDown
          className={cn(
            'h-3 w-3 -rotate-90 transform transition-transform duration-100',
            isActive ? 'rotate-0' : 'group-hover:rotate-0'
          )}
        />
      </button>
      <div
        className={cn(
          'bg-sub-background mt-1.5 ml-1.5 flex-col gap-1.5',
          isActive ? 'flex' : 'hidden group-hover:flex'
        )}>
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
      <button
        className={cn(
          'bg-sub-secondary text-sub-foreground hover:bg-sub-accent hover:text-accent-foreground flex h-7 justify-between rounded-lg px-3 py-4 text-sm font-light',
          isActive ? 'text-user-theme' : ''
        )}>
        <Link to={menu.path || '#'} onClick={() => onMenuClick(menu)} className='flex-1 text-left'>
          <span className='truncate'>{menu.label}</span>
        </Link>
        <ChevronRight className='h-3 w-3 shrink-0' />
      </button>
    </DropdownMenuItem>
  );
}
