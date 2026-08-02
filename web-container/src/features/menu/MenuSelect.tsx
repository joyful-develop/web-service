'use client';

import { useMemo, useEffect, useId } from 'react';

import { useLocation, useNavigate } from 'react-router';

import { ChevronRight } from 'lucide-react';

import type { MenuItem } from '@/features/menu/menu.type.ts';
import { useMenuStore } from '@/features/menu/useMenuStore.ts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/shadcn-ui/select.tsx';

export function MenuSelect() {
  const location = useLocation();
  const navigate = useNavigate();
  const { menus, selectedMenu, selectedParentMenu, setRecentMenu, setSelectedMenu } = useMenuStore();

  const isHydrated = useMenuStore.persist.hasHydrated();

  const selectLabelId = useId();

  const currentParentMenu = useMemo(() => {
    if (!isHydrated || !selectedParentMenu) return null;

    const findMenuById = (items: MenuItem[], targetId: string): MenuItem | null => {
      for (const item of items) {
        if (String(item.rawId) === targetId) return item;
        if (item.children && item.children.length > 0) {
          const found = findMenuById(item.children, targetId);
          if (found) return found;
        }
      }
      return null;
    };

    return findMenuById(menus, String(selectedParentMenu));
  }, [menus, selectedParentMenu, isHydrated]);

  const subMenuItems = useMemo(() => {
    if (!isHydrated || !selectedParentMenu) return [];

    const findMenusByParentId = (items: MenuItem[], targetParentId: string): MenuItem[] => {
      let result: MenuItem[] = [];

      for (const item of items) {
        const isMatch = item.parentRawId !== null && String(item.parentRawId).trim() === targetParentId.trim();

        if (item.specialUse === null && isMatch) {
          result.push(item);
        }
        if (item.children && item.children.length > 0) {
          const matchingChildren = findMenusByParentId(item.children, targetParentId);
          result = result.concat(matchingChildren);
        }
      }

      return result;
    };

    return findMenusByParentId(menus, String(selectedParentMenu));
  }, [menus, selectedParentMenu, isHydrated]);

  const currentValue = useMemo(() => {
    if (!isHydrated || subMenuItems.length === 0) return '';

    const matchedMenu = subMenuItems.find((menu) => menu.path === location.pathname);
    if (matchedMenu) return matchedMenu.rawId.toString();

    const defaultMenu = subMenuItems.find((menu) => menu.isDefault) || subMenuItems[0];
    return defaultMenu ? defaultMenu.rawId.toString() : '';
  }, [subMenuItems, location.pathname, isHydrated]);

  useEffect(() => {
    if (isHydrated && location.pathname && selectedMenu !== location.pathname) {
      setSelectedMenu(location.pathname);
    }
  }, [location.pathname, selectedMenu, setSelectedMenu, isHydrated]);

  const handleMenuChange = (value: string) => {
    const targetMenu = subMenuItems.find((menu) => menu.rawId.toString() === value);
    if (targetMenu?.path) {
      setSelectedMenu(targetMenu.path);
      setRecentMenu(targetMenu);
      navigate(targetMenu.path);
    }
  };

  return (
    <>
      {selectedParentMenu ? (
        <nav
          className='flex w-full flex-row items-center justify-center gap-1 select-none sm:w-auto'
          aria-label='서브 네비게이션'>
          <span id={selectLabelId} className='text-sm font-medium'>
            {currentParentMenu ? currentParentMenu.label : selectedParentMenu}
          </span>
          <ChevronRight className='h-4 w-4' aria-hidden='true' />

          <div className='flex-1 sm:flex-initial'>
            <Select value={currentValue} onValueChange={handleMenuChange}>
              <SelectTrigger
                variant='custom'
                className='w-full min-w-20 font-medium sm:w-40'
                aria-labelledby={selectLabelId}>
                <SelectValue placeholder={subMenuItems.length === 0 ? '하위 메뉴 없음' : '서브 메뉴 선택'} />
              </SelectTrigger>
              <SelectContent
                position='popper'
                className='ring-background border-sub-border bg-sub-background flex w-fit min-w-45 flex-col p-2 text-sm font-light select-none'>
                {subMenuItems.length === 0 ? (
                  <div className='text-muted-foreground p-2 text-center text-xs' role='status' aria-live='polite'>
                    하위 메뉴가 없습니다.
                  </div>
                ) : (
                  subMenuItems.map((menu) => (
                    <SelectItem key={menu.rawId} value={menu.rawId.toString()}>
                      {menu.label}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
        </nav>
      ) : (
        <div className='text-muted-foreground p-2 text-center'>상위 메뉴를 선택하세요.</div>
      )}
    </>
  );
}
