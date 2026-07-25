import { useEffect, useState, useMemo } from 'react';

import { useLocation } from 'react-router';

import { Menu, X } from 'lucide-react';

import type { MenuItem } from '@/features/menu/menu.type.ts';
import { MenuPanelMap, MenuPanelMapLink } from '@/features/menu/MenuPanelMap.tsx';
import { useMenuStore } from '@/features/menu/useMenuStore.ts';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/shadcn-ui/dropdown-menu.tsx';
import { cn } from '@/shared/utils/shadcn/utils.ts';

const GRID_COLS_MAP: Record<number, string> = {
  4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  2: 'grid-cols-1 lg:grid-cols-2',
  1: 'grid-cols-1',
};

export function MenuPanel() {
  const location = useLocation();
  const { menus, selectedMenu, setSelectedMenu, recentMenus, setRecentMenu } = useMenuStore();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (selectedMenu !== location.pathname) {
      setSelectedMenu(location.pathname);
    }
  }, [location.pathname, open, selectedMenu, setSelectedMenu]);

  const handleMenuClick = useMemo(
    () =>
      (menu: MenuItem): void => {
        setSelectedMenu(menu.path);
        setOpen(false);
        setRecentMenu(menu);
      },
    [setSelectedMenu, setRecentMenu]
  );

  const menuGridColsClass = useMemo(() => {
    const groupCount = menus.filter((menu) => menu.type === 'group' && menu.parentRawId === null).length;
    const count = groupCount > 4 ? 4 : groupCount || 1;
    return GRID_COLS_MAP[count];
  }, [menus]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <button className='group/menu-panel icon-button'>
          <Menu className={cn('h-4 w-4 transition-transform duration-100', open && 'rotate-90')} />
          <span className='sr-only'>Menus</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='ring-background text-sub-foreground bg-background flex w-fit max-w-[95vw] gap-1'
        side='bottom'
        align='start'
        variant='custom'>
        {/* 최근 메뉴 */}
        <div className='border-sub-border bg-sub-secondary flex min-w-45 shrink-0 flex-col rounded-lg p-1'>
          <div className='mb-1 flex items-center gap-2 px-2 pt-1 text-xs font-medium tracking-tight'>
            <span>최근 메뉴</span>
          </div>
          <div className='border-sub-border bg-sub-background flex-1 rounded-lg p-1.5'>
            <div className='flex flex-col gap-1.5'>
              {recentMenus?.map((rec) => (
                <MenuPanelMapLink
                  key={rec.rawId}
                  menu={rec}
                  isActive={rec.path === selectedMenu}
                  onMenuClick={handleMenuClick}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 일반 메뉴 */}
        <div className='bg-background ml-2 flex min-w-45 flex-col'>
          <div className={cn('grid h-full items-start gap-2', menuGridColsClass)}>
            <MenuPanelMap menus={menus} onMenuClick={handleMenuClick} selectedMenu={selectedMenu} depth={1} />
          </div>
        </div>

        <div className='shrink-0'>
          <button onClick={() => setOpen(false)} className='sub-icon-button'>
            <X className='h-4 w-4' />
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
