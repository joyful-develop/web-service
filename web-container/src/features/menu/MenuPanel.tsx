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
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (selectedMenu !== location.pathname) {
      setSelectedMenu(location.pathname);
    }
  }, [location.pathname, selectedMenu, setSelectedMenu]);

  const handleMenuClick = useMemo(
    () =>
      (menu: MenuItem): void => {
        setSelectedMenu(menu.path);
        setIsOpen(false);
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
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          className='group/menu-panel icon-button'
          aria-label='메인 메뉴 열기'
          aria-haspopup='dialog'
          aria-expanded={isOpen}>
          <Menu className={cn('h-4 w-4 transition-transform duration-100', isOpen && 'rotate-90')} aria-hidden='true' />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='ring-background text-sub-foreground bg-background flex w-fit max-w-[95vw] gap-1'
        side='bottom'
        sideOffset={8}
        align='start'
        variant='custom'
        role='dialog'
        aria-label='메인 메뉴 팝업'>
        {/* 최근 메뉴 섹션  */}
        <section
          className='border-sub-border bg-sub-secondary flex min-w-45 shrink-0 flex-col rounded-lg p-1'
          role='region'
          aria-labelledby='recent-menu-heading'>
          <div
            id='recent-menu-heading'
            className='mb-1 flex items-center gap-2 px-2 pt-1 text-xs font-medium tracking-tight'>
            <span>최근 메뉴</span>
          </div>
          <div className='border-sub-border bg-sub-background flex-1 rounded-lg p-1.5'>
            <div className='flex flex-col gap-1.5' aria-label='최근 방문한 메뉴 링크 목록'>
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
        </section>

        {/* 일반 메뉴 섹션 */}
        <section className='bg-background ml-2 flex min-w-45 flex-col' role='region' aria-label='전체 메뉴 사이트맵'>
          <div className={cn('grid h-full items-start gap-2', menuGridColsClass)}>
            <MenuPanelMap menus={menus} onMenuClick={handleMenuClick} selectedMenu={selectedMenu} depth={1} />
          </div>
        </section>

        {/* 닫기 버튼 영역 */}
        <div className='shrink-0' role='none'>
          <button onClick={() => setIsOpen(false)} className='sub-icon-button' aria-label='메뉴 팝업 닫기'>
            <X className='h-4 w-4' aria-hidden='true' />
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
