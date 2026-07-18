import React from 'react';

import { Link } from 'react-router';

import type { MenuItem } from '@/features/menu/menu.type.ts';
import {
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/shared/components/shadcn-ui/dropdown-menu.tsx';
import { cn } from '@/shared/utils/shadcn/utils.ts';

interface MenuPanelMapProps {
  menus: MenuItem[];
  onMenuClick: (menu: MenuItem | null) => void;
  selectedMenu: string | null;
  depth?: number;
}

export const MenuPanelMap = React.memo(function MenuPanelMap({
  menus,
  onMenuClick,
  selectedMenu,
  depth = 1,
}: MenuPanelMapProps) {
  // 현재 그룹 및 중첩 메뉴의 하위 노드 중에 활성화된 메뉴 ID가 포함되어 있는지 재귀 판별
  const isChildActive = (menu: MenuItem): boolean => {
    if (!selectedMenu) return false;
    if (menu.path === selectedMenu) return true;
    if (menu.children && menu.children.length > 0) {
      return menu.children.some((child) => isChildActive(child));
    }
    return false;
  };

  return (
    <>
      {menus
        .filter((menu) => menu.specialUse === null)
        .map((menu) => {
          const hasActiveChild = isChildActive(menu);
          const hasChildren = menu.children && menu.children.length > 0;
          const isActive = menu.path === selectedMenu;

          const linkCss = cn(
            'hover:text-user-theme focus:text-user-theme text-sm hover:font-semibold focus:font-semibold',
            isActive ? 'text-user-theme' : ''
          );

          return (
            <React.Fragment key={menu.rawId}>
              {hasChildren ? (
                depth === 1 ? (
                  /* =================================================================== */
                  /* [자식이 있는 노드 처리] depth에 따라 고정 레이아웃 또는는 드롭 다운 분기 */
                  /* =================================================================== */
                  <div className='flex min-w-[140px] flex-col gap-1.5 transition-all duration-200'>
                    <MenuPanelMapLink
                      key={menu.rawId}
                      menu={menu}
                      hasActiveChild={hasActiveChild}
                      isMenuItem={true}
                      linkCss={linkCss}
                      onMenuClick={() => onMenuClick(menu)}
                    />

                    {/* 하위 자식 노드들을 담는 그리드 컨테이너: 재귀적으로 연속 호출전개 */}
                    <div className={cn('grid grid-cols-1 gap-4 pt-2')}>
                      <MenuPanelMap
                        menus={menu.children!}
                        onMenuClick={onMenuClick}
                        selectedMenu={selectedMenu}
                        depth={depth + 1}
                      />
                    </div>
                  </div>
                ) : (
                  /* ========================================================== */
                  /* [2 Depth 이상] 여기서부터는 자식이 있으면 무조건 드롭다운 팝업 */
                  /* ========================================================== */
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger variant='custom' className={linkCss}>
                      <MenuPanelMapLink
                        key={menu.rawId}
                        menu={menu}
                        hasActiveChild={hasActiveChild}
                        isMenuItem={false}
                        linkCss={linkCss}
                        onMenuClick={() => onMenuClick(menu)}
                      />
                    </DropdownMenuSubTrigger>

                    {/* 오른쪽으로 새로 펼쳐지는 서브 컨텐츠 박스 */}
                    <DropdownMenuSubContent className='grid min-w-[160px] grid-cols-1 gap-4 px-5 py-3'>
                      <MenuPanelMap
                        menus={menu.children!}
                        onMenuClick={onMenuClick}
                        selectedMenu={selectedMenu}
                        depth={depth + 1}
                      />
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                )
              ) : (
                /* ===================================================== */
                /* [단일 메뉴 구역] 자식이 전혀 없는 최하위 말단 링크 아이템 */
                /* ===================================================== */
                <MenuPanelMapLink
                  key={menu.rawId}
                  menu={menu}
                  hasActiveChild={hasActiveChild}
                  isMenuItem={true}
                  linkCss={linkCss}
                  onMenuClick={() => onMenuClick(menu)}
                />
              )}
            </React.Fragment>
          );
        })}
    </>
  );
});

export interface MenuPanelMapLinkProps {
  key: number;
  menu: MenuItem;
  hasActiveChild: boolean;
  isMenuItem: boolean;
  linkCss: string;
  onMenuClick: (menu: MenuItem) => void;
}

export function MenuPanelMapLink({ menu, hasActiveChild, isMenuItem, linkCss, onMenuClick }: MenuPanelMapLinkProps) {
  if (menu.type !== 'group' && menu.path) {
    if (isMenuItem) {
      return (
        <DropdownMenuItem asChild variant='custom'>
          <Link to={menu.path} className={linkCss} onClick={() => onMenuClick(menu)}>
            <span>{menu.label}</span>
          </Link>
        </DropdownMenuItem>
      );
    }

    return (
      <Link to={menu.path} className={linkCss} onClick={() => onMenuClick(menu)}>
        <span>{menu.label}</span>
      </Link>
    );
  }

  if (isMenuItem) {
    return (
      <div
        className={cn(
          'border-foreground mb-1 border-b py-1.5 text-sm font-bold opacity-80 transition-colors',
          hasActiveChild ? 'text-user-theme' : ''
        )}>
        {menu.label}
      </div>
    );
  }

  return (
    <div className={cn('text-sm opacity-80 transition-colors', hasActiveChild ? 'text-user-theme' : '')}>
      {menu.label}
    </div>
  );
}
