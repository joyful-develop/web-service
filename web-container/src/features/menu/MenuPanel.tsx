import { useEffect, useState, useRef } from 'react';

import { useLocation } from 'react-router';

import type { MenuItem } from '@/features/menu/menu.type.ts';
import { MenuPanelMap, MenuPanelMapLink } from '@/features/menu/MenuPanelMap.tsx';
import { useMenuStore } from '@/features/menu/useMenuStore.ts';
import { useUiSettingsStore } from '@/features/settings/useUiSettingsStore.ts';
import { Button } from '@/shared/components/shadcn-ui/button.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/shadcn-ui/dropdown-menu.tsx';
import { LucideIcon } from '@/shared/icons/LucideIcon.tsx';
import { cn } from '@/shared/utils/shadcn/utils.ts';

export function MenuPopover() {
  const location = useLocation();
  const contentRef = useRef<HTMLDivElement>(null);

  const themeColor = useUiSettingsStore.getState().themeColor;
  console.log('themeColor: ', themeColor);

  const menus = useMenuStore((state) => state.menus as MenuItem[]);
  const selectedMenu = useMenuStore((state) => state.selectedMenu as string | null);
  const setSelectedMenu = useMenuStore((state) => state.setSelectedMenu as (path: string | null) => void);
  const recentMenus = useMenuStore((state) => state.recentMenus as MenuItem[] | null);
  const setRecentMenu = useMenuStore((state) => state.setRecentMenu as (menu: MenuItem | null) => void);

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setSelectedMenu(location.pathname);
  }, [location.pathname, setSelectedMenu]);

  const handleMenuClick = (menu: MenuItem | null): void => {
    setSelectedMenu(menu?.path || '');
    setOpen(false);
    setRecentMenu(menu);
  };

  const groupCount = menus.filter((menu) => menu.type === 'group' && menu.parentRawId === null).length;
  const menuGridColsCount = groupCount > 4 ? 4 : groupCount;
  const menuGridColsClass =
    menuGridColsCount === 4
      ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
      : menuGridColsCount === 3
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        : menuGridColsCount === 2
          ? 'grid-cols-1 lg:grid-cols-2'
          : 'grid-cols-1';

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
        <DropdownMenuTrigger data-testid='menu-trigger' asChild>
          <Button variant='ghost' size='icon-lg' className='h-8 w-8'>
            <LucideIcon name='menu' size={48} strokeWidth={1} className='size-5' data-testid='bars4-icon' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          ref={contentRef}
          data-testid='menu-popover'
          className='data-[state=closed]:fade-out-0 w-fit max-w-[95vw] p-4 data-[state=closed]:animate-none'
          side='bottom'
          align='start'
          sideOffset={8}>
          <div className='mb-2 grid w-full grid-flow-col justify-items-end'>
            <Button variant='ghost' size='icon-lg' className='h-8 w-8' onClick={() => setOpen(false)}>
              <LucideIcon name='x' size={48} strokeWidth={1} className='size-5' data-testid='x-icon' />
            </Button>
          </div>
          <div className='flex flex-col gap-6 sm:flex-row sm:items-stretch'>
            {/* 최근 방문 메뉴 */}
            <div className='flex min-w-[160px] shrink-0 flex-col gap-1.5 border-b pb-4 sm:border-r sm:border-b-0 sm:pr-6 sm:pb-0'>
              <div className='border-foreground mb-1 border-b py-1.5 text-sm font-bold opacity-80'>최근 메뉴</div>
              <div className='grid grid-cols-1 gap-4'>
                {recentMenus?.map((rec) => {
                  const isRecentActive = rec.path === selectedMenu ? true : false;
                  const linkCss = cn(
                    'hover:text-user-theme focus:text-user-theme text-sm hover:font-semibold focus:font-semibold',
                    isRecentActive ? 'text-user-theme' : ''
                  );

                  return (
                    <MenuPanelMapLink
                      key={rec.rawId}
                      menu={rec}
                      hasActiveChild={false}
                      isMenuItem={true}
                      linkCss={linkCss}
                      onMenuClick={() => handleMenuClick(rec)}
                    />
                  );
                })}
              </div>
            </div>

            {/* 우측 일반 그룹 및 서브 메뉴 영역 */}
            <div className={cn('grid h-fit items-start gap-10 pb-2', menuGridColsClass)}>
              <MenuPanelMap menus={menus} onMenuClick={handleMenuClick} selectedMenu={selectedMenu} depth={1} />
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
