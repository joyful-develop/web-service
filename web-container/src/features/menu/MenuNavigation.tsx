'use client';

import { useEffect, useCallback, useMemo, useState } from 'react';

import { useLocation } from 'react-router';

import type { MenuItem } from '@/features/menu/menu.type.ts';
import { MenuNavigationMap, MenuNavigationMapLink } from '@/features/menu/MenuNavigationMap.tsx';
import { useMenuStore } from '@/features/menu/useMenuStore.ts';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/shared/components/shadcn-ui/navigation-menu.tsx';
import { cn } from '@/shared/utils/shadcn/utils.ts';

export function MenuNavigation() {
  const location = useLocation();
  const { menus, selectedMenu, setSelectedMenu, recentMenus, setRecentMenu } = useMenuStore();
  const [currentValue, setCurrentValue] = useState<string>('');

  useEffect(() => {
    if (location.pathname && selectedMenu !== location.pathname) {
      setSelectedMenu(location.pathname);
    }
  }, [location.pathname, selectedMenu, setSelectedMenu]);

  const handleMenuClick = useCallback(
    (menu: MenuItem): void => {
      setSelectedMenu(menu.path);
      setCurrentValue('');
      setRecentMenu(menu);
    },
    [setSelectedMenu, setRecentMenu]
  );

  const topLevelGroups = useMemo(() => {
    return menus.filter((menu) => menu.specialUse === null && menu.parentRawId === null);
  }, [menus]);

  const isChildActive = useCallback(function checkActive(menu: MenuItem, currentPath: string | null): boolean {
    if (!currentPath || !menu.children) return false;

    return menu.children.some((child) => {
      if (child.path === currentPath) return true;
      return checkActive(child, currentPath);
    });
  }, []);

  return (
    <NavigationMenu
      value={currentValue}
      onValueChange={setCurrentValue}
      viewport={false}
      aria-label='탑 메뉴 내입게이션'>
      <NavigationMenuList>
        {/* 최근 메뉴 섹션 */}
        {recentMenus && recentMenus.length > 0 && (
          <NavigationMenuItem value='recent-menu'>
            <NavigationMenuTrigger
              variant='custom'
              className='hover:text-user-theme inline-flex h-9 items-center justify-center px-2 text-sm font-light transition-all'
              aria-label='최근 메뉴 목록 열기'>
              최근 메뉴
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div
                className='ring-background border-sub-border bg-sub-background flex w-fit min-w-45 flex-col p-2 text-sm font-light select-none'
                aria-label='최근 메뉴'>
                {recentMenus.map((rec) => (
                  <MenuNavigationMapLink
                    key={rec.rawId}
                    menu={rec}
                    isActive={rec.path === selectedMenu}
                    isTopMenu={false}
                    onMenuClick={handleMenuClick}
                  />
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}

        {/* 대메뉴 그룹 섹션 */}
        {topLevelGroups.map((group) => {
          const hasChildren = !group.isLayout && (group.children ?? []).length > 0;
          const isActive = hasChildren ? isChildActive(group, selectedMenu) : group.path === selectedMenu;

          return (
            <NavigationMenuItem key={group.rawId} value={group.rawId.toString()}>
              {hasChildren ? (
                <>
                  <NavigationMenuTrigger
                    variant='custom'
                    className={cn(
                      'hover:text-user-theme inline-flex h-9 items-center justify-center px-2 text-sm font-light transition-all',
                      isActive && 'text-user-theme'
                    )}
                    aria-label={`${group.label} 하위 메뉴 열기`}
                    aria-expanded={currentValue === group.rawId.toString()}>
                    {group.label}
                  </NavigationMenuTrigger>

                  <NavigationMenuContent>
                    <ul
                      className='ring-background border-sub-border bg-sub-background flex w-fit min-w-45 flex-col p-2 text-sm font-light select-none'
                      aria-label={`${group.label} 서브 메뉴`}>
                      <MenuNavigationMap
                        menus={group.children!}
                        onMenuClick={handleMenuClick}
                        selectedMenu={selectedMenu}
                      />
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <MenuNavigationMapLink
                  key={group.rawId}
                  menu={group}
                  isActive={isActive}
                  isTopMenu={true}
                  onMenuClick={handleMenuClick}
                />
              )}
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
      {/* 하단 패널 애니메이션용 뷰포트 배치 */}
      {/* <NavigationMenuViewport /> */}
    </NavigationMenu>
  );
}
