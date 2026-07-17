import React, { useState } from 'react';

import { Link } from 'react-router';

import type { MenuItem } from '@/features/menu/menu.type.ts';
import { DropdownMenuItem } from '@/shared/components/shadcn-ui/dropdown-menu.tsx';
import { cn } from '@/shared/utils/shadcn/utils.ts';

interface CreateMenuProps {
  items: MenuItem[];
  onItemClick: (rawId: number) => void;
  themeColor: string | null;
  selectedMenuRawId: number | null;
  menuItemClass: string;
}

export const CreateMenu = React.memo(function CreateMenu({
  items,
  onItemClick,
  themeColor,
  selectedMenuRawId,
  menuItemClass,
}: CreateMenuProps) {
  const [, setHoveredRawId] = useState<number | null>(null);

  // 현재 그룹 및 중첩 메뉴의 하위 노드 중에 활성화된 메뉴 ID가 포함되어 있는지 재귀 판별
  const isChildActive = (item: MenuItem): boolean => {
    if (!selectedMenuRawId) return false;
    if (item.rawId === selectedMenuRawId) return true;
    if (item.children && item.children.length > 0) {
      return item.children.some((child) => isChildActive(child));
    }
    return false;
  };

  return (
    <>
      {items.map((item) => {
        const hasActiveChild = isChildActive(item);
        const hasChildren = item.children && item.children.length > 0;
        // const isItemHovered = item.rawId === hoveredRawId;
        // const isItemActive = item.rawId === selectedMenuRawId;

        return (
          <React.Fragment key={item.rawId}>
            {/* [해결 핵심] 자식(children)이 존재하는 모든 노드는 레이아웃 프레임을 먼저 구성 */}
            {hasChildren ? (
              <div className={cn('flex min-w-[200px] flex-col gap-1.5 transition-all duration-200')}>
                {/* 
                  대메뉴이면서 링크 주소(path)도 동시에 가지고 있는 중첩 라우트 예외 처리:
                  path가 있으면 클릭 가능한 <Link>로, 단순 텍스트 그룹 타이틀이면 일반 <div>로 분기
                */}
                {item.type !== 'group' && item.path ? (
                  <DropdownMenuItem
                    asChild
                    onSelect={(e: Event) => e.preventDefault()}
                    className='p-0 focus:bg-transparent'>
                    <Link
                      to={item.path}
                      className={cn(
                        // menuItemClass
                        'mb-1 border-b pb-1 hover:!font-semibold hover:!text-red-500 focus:!font-semibold focus:!text-red-500'
                        // isItemActive ? '!font-bold !text-orange-500' : 'text-muted-foreground font-bold'
                      )}
                      onMouseEnter={() => setHoveredRawId(item.rawId)}
                      onMouseLeave={() => setHoveredRawId(null)}
                      // style={
                      //   {
                      //     color: isItemHovered ? '#ef4444' : isItemActive ? '#f97316' : 'inherit',
                      //     fontWeight: isItemHovered ? '600' : isItemActive ? '700' : '700',
                      //   } as React.CSSProperties
                      // }
                      onClick={() => onItemClick(item.rawId)}>
                      <span>{item.label}</span>
                    </Link>
                  </DropdownMenuItem>
                ) : (
                  <div
                    className={cn(
                      'border-b py-1.5 text-sm font-bold opacity-80 transition-colors',
                      hasActiveChild ? 'border-orange-500 text-orange-500' : ''
                    )}>
                    {item.label}
                  </div>
                )}

                {/* 하위 자식 노드들을 담는 그리드 컨테이너: 재귀적으로 연속 호출전개 */}
                <div className={cn('grid grid-cols-1 gap-1')}>
                  <CreateMenu
                    items={item.children!}
                    onItemClick={onItemClick}
                    themeColor={themeColor}
                    selectedMenuRawId={selectedMenuRawId}
                    menuItemClass={menuItemClass}
                  />
                </div>
              </div>
            ) : (
              /* 자식이 전혀 없는 단일 말단 노드 링크 아이템 처리 구역 */
              <DropdownMenuItem asChild variant='custom' onSelect={(e: Event) => e.preventDefault()} className='p-0'>
                <Link
                  to={item.path || ''}
                  // style={
                  //   {
                  //     '--user-theme': themeColor,
                  //   } as React.CSSProperties
                  // }
                  className={cn(
                    // menuItemClass,
                    'hover:text-user-theme focus:text-user-theme text-sm hover:font-semibold focus:font-semibold'
                    // themeColor ? 'hover:text-[var(--hover-color)]' : 'hover:text-red-500'
                    // !themeColor ? `focus: text-[${themeColor}]` : 'focus: text-red-500'
                    // isItemActive ? '!font-bold !text-orange-500' : 'text-muted-foreground'
                  )}
                  onMouseEnter={() => setHoveredRawId(item.rawId)}
                  onMouseLeave={() => setHoveredRawId(null)}
                  // style={
                  //   {
                  //     color: isItemHovered ? '#ef4444' : isItemActive ? '#f97316' : 'inherit',
                  //     fontWeight: isItemHovered ? '600' : isItemActive ? '700' : '400',
                  //   } as React.CSSProperties
                  // }
                  onClick={() => onItemClick(item.rawId)}>
                  <span>{item.label}</span>
                </Link>
              </DropdownMenuItem>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
});

CreateMenu.displayName = 'CreateMenu';
