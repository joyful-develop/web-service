import React, { useEffect, useState, useRef } from 'react';

import { useLocation, Link } from 'react-router';

import type { MenuItem } from '@/features/menu/menu.type.ts';
import { useMenuStore } from '@/features/menu/useMenuStore.ts';
import { useUiSettingsStore } from '@/features/settings/useUiSettingsStore.ts';
import { Button } from '@/shared/components/shadcn-ui/button.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/shadcn-ui/dropdown-menu.tsx';
import { LucideIcon } from '@/shared/icons/LucideIcon.tsx';
import { cn } from '@/shared/utils/shadcn/utils.ts';

// 2번째 파일인 CreateMenu 컴포넌트 임포트 (한 파일에 둘 경우 생략 가능)
import { CreateMenu } from './CreateMenu.tsx';

interface RecentMenu {
  id: string;
  label: string;
  path: string;
}

export function MenuPopover() {
  const location = useLocation();
  const contentRef = useRef<HTMLDivElement>(null);

  const themeColor = useUiSettingsStore.getState().themeColor;
  console.log('themeColor: ', themeColor);

  const menus = useMenuStore((state) => state.menus as MenuItem[]);
  const selectedMenuRawId = useMenuStore((state) => state.selectedMenuRawId as number | null);
  const setSelectedMenuRawId = useMenuStore((state) => state.setSelectedMenuRawId as (rawId: number | null) => void);

  const [open, setOpen] = useState<boolean>(false);
  const [, setIsWidePanel] = useState<boolean>(false);
  const [, setHoveredRecentId] = useState<string | null>(null);

  const recentMenus: RecentMenu[] = [
    { id: 'rec-1', label: 'Home', path: '/' },
    { id: 'rec-2', label: 'About', path: '/about' },
    { id: 'rec-3', label: '사용자 관리', path: '/admin/users' },
    { id: 'rec-4', label: 'Error 페이지', path: '/error' },
  ];

  // 깊은 메뉴 트리 안에서 현재 브라우저의 pathname과 일치하는 메뉴 항목을 재귀적으로 찾는 헬퍼 함수
  const findMenuByPath = (items: MenuItem[], path: string): MenuItem | null => {
    for (const item of items) {
      if (item.path === path) return item;
      if (item.children && item.children.length > 0) {
        const found = findMenuByPath(item.children, path);
        if (found) return found;
      }
    }
    return null;
  };

  useEffect(() => {
    const currentMenu = findMenuByPath(menus, location.pathname);
    setSelectedMenuRawId(currentMenu ? currentMenu.rawId : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menus, location.pathname, setSelectedMenuRawId]);

  useEffect(() => {
    if (!open || !contentRef.current) return;

    const checkPanelSize = () => {
      if (!contentRef.current) return;
      const panelWidth = contentRef.current.getBoundingClientRect().width;
      const windowWidth = window.innerWidth;
      setIsWidePanel(panelWidth >= windowWidth * 0.5);
    };

    checkPanelSize();
    window.addEventListener('resize', checkPanelSize);

    return () => {
      window.removeEventListener('resize', checkPanelSize);
    };
  }, [open, menus]);

  const handleMenuClick = (rawId: number): void => {
    setSelectedMenuRawId(rawId);
    setOpen(false);
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

  // 잔상 테두리, 배경, 링, 그림자를 완전히 제거하는 미니멀 순수 텍스트 기본 스타일
  const menuItemClass =
    'flex w-full items-center justify-start gap-2 h-9 px-2 text-left block truncate border-0 outline-none select-none rounded-md transition-colors bg-transparent hover:bg-transparent focus:bg-transparent focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none shadow-none focus:shadow-none hover:shadow-none';

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger data-testid='menu-trigger' asChild>
        <Button variant='ghost' size='icon-lg' className='data-[state=open]:bg-accent h-8 w-8'>
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
        <div className='flex flex-col gap-6 sm:flex-row sm:items-stretch'>
          {/* 최근 방문 메뉴 기둥 */}
          <div className='flex min-w-[160px] shrink-0 flex-col gap-1.5 border-b pb-4 sm:border-r sm:border-b-0 sm:pr-6 sm:pb-0'>
            <div className='border-foreground mb-1 border-b py-1.5 text-sm font-bold opacity-80'>최근 메뉴</div>
            <div className='flex flex-col gap-1'>
              {recentMenus.map((rec) => {
                const originalMenu = findMenuByPath(menus, rec.path);
                // const isRecentActive = originalMenu ? originalMenu.rawId === selectedMenuRawId : false;
                // const isHovered = hoveredRecentId === rec.id;

                return (
                  <DropdownMenuItem
                    key={rec.id}
                    asChild
                    onSelect={(e: Event) => e.preventDefault()}
                    className='p-0 focus:bg-transparent'>
                    <Link
                      to={rec.path}
                      // className={cn(
                      //   menuItemClass,
                      //   'hover:!font-semibold hover:!text-red-500 focus:!font-semibold focus:!text-red-500',
                      //   isRecentActive ? '!font-bold !text-orange-500' : 'text-muted-foreground'
                      // )}
                      onMouseEnter={() => setHoveredRecentId(rec.id)}
                      onMouseLeave={() => setHoveredRecentId(null)}
                      // style={
                      //   {
                      //     color: isHovered ? '#ef4444' : isRecentActive ? '#f97316' : 'inherit',
                      //     fontWeight: isHovered ? '600' : isRecentActive ? '700' : '400',
                      //   } as React.CSSProperties
                      // }
                      onClick={() => handleMenuClick(originalMenu ? originalMenu.rawId : 0)}>
                      <span>{rec.label}</span>
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </div>
          </div>

          {/* 우측 일반 그룹 및 서브 메뉴 영역 */}
          <div className={cn('grid h-fit items-start gap-10', menuGridColsClass)}>
            <CreateMenu
              items={menus}
              onItemClick={handleMenuClick}
              themeColor={themeColor}
              selectedMenuRawId={selectedMenuRawId}
              menuItemClass={menuItemClass}
            />
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
