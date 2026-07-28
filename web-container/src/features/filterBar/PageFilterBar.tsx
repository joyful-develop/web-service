'use client';

import { useState } from 'react';

import { Search } from 'lucide-react';

import { Button } from '@/shared/components/shadcn-ui/button.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/shadcn-ui/select.tsx';

interface MenuItem {
  id: string;
  parentId: string;
  name: string;
  isDefault?: boolean;
}

interface FilterOption {
  value: string;
  label: string;
  isDefault?: boolean;
}

const parentMenuMap: Record<string, string> = {
  board_parent: '게시판 관리',
  cs_parent: '고객센터',
};

const mockMenus: MenuItem[] = [
  { id: 'all', parentId: 'board_parent', name: '전체 메뉴', isDefault: true },
  { id: 'notice', parentId: 'board_parent', name: '공지사항' },
  { id: 'gallery', parentId: 'board_parent', name: '갤러리 게시판' },
  { id: 'download', parentId: 'board_parent', name: '자료실' },
  { id: 'faq', parentId: 'cs_parent', name: '자주 묻는 질문', isDefault: true },
  { id: 'qna', parentId: 'cs_parent', name: '1:1 문의' },
];

const sortOptions: FilterOption[] = [
  { value: 'latest', label: '최신순' },
  { value: 'oldest', label: '과거순' },
  { value: 'views', label: '조회순', isDefault: true },
];

const targetOptions: FilterOption[] = [
  { value: 'title', label: '제목', isDefault: true },
  { value: 'content', label: '내용' },
  { value: 'author', label: '작성자' },
];

interface PageFilterBarProps {
  parentMenuId: string;
}

export function PageFilterBar({ parentMenuId }: PageFilterBarProps) {
  const parentMenuName = parentMenuMap[parentMenuId] || '상위 메뉴';

  // 1. 부모 ID에 맞는 서브 메뉴들 필터링
  const subMenuItems = mockMenus.filter((menu) => menu.parentId === parentMenuId);

  // 2. 🔥 [에러 수정] 기본값 찾기 로직 최적화
  // 배열 전체(|| subMenuItems)를 넘기지 않고, 없으면 첫 번째 원소(subMenuItems[0])를 보도록 수정합니다.
  const defaultMenu = subMenuItems.find((menu) => menu.isDefault) || subMenuItems[0];

  const defaultSort = sortOptions.find((opt) => opt.isDefault) || sortOptions[0];
  const defaultTarget = targetOptions.find((opt) => opt.isDefault) || targetOptions[0];

  // 3. 상태 관리 (이제 defaultMenu는 확실히 'MenuItem | undefined' 타입이 됩니다)
  const [subMenu, setSubMenu] = useState(defaultMenu ? defaultMenu.id : '');
  const [prevParentMenuId, setPrevParentMenuId] = useState(parentMenuId);
  const [searchFilter1, setSearchFilter1] = useState(defaultSort ? defaultSort.value : '');
  const [searchTarget, setSearchTarget] = useState(defaultTarget ? defaultTarget.value : '');

  // 부모 ID 변경 시 안전하게 서브 메뉴 상태 동기화
  if (parentMenuId !== prevParentMenuId) {
    setPrevParentMenuId(parentMenuId);
    setSubMenu(defaultMenu ? defaultMenu.id : '');
  }

  // 현재 선택된 값의 label 실시간 매핑 (옵셔널 체이닝 ? 적용으로 더 안전하게 처리)
  const currentSortLabel = sortOptions.find((opt) => opt.value === searchFilter1)?.label;
  const currentTargetLabel = targetOptions.find((opt) => opt.value === searchTarget)?.label;

  const handleSearch = () => {
    console.log('조회 실행:', { subMenu, searchFilter1, searchTarget });
  };
  return (
    <div
      className='border-sub-border bg-sub-background flex flex-col gap-4 border-b p-4 sm:flex-row sm:items-center sm:justify-between'
      role='search'
      aria-label='콘텐츠 필터 및 조회'>
      {/* ─── 왼쪽 영역: 부모 메뉴 표시 + 서브 메뉴 선택 콤보박스 ─── */}
      <div className='flex w-full flex-row items-center gap-3 sm:w-auto'>
        <span className='text-muted-foreground bg-muted rounded-md border px-2.5 py-1.5 text-sm font-medium whitespace-nowrap'>
          {parentMenuName}
        </span>

        <div className='flex-1 sm:flex-initial'>
          <label htmlFor='sub-menu-select' className='sr-only'>
            서브 메뉴 선택
          </label>
          <Select value={subMenu} onValueChange={setSubMenu}>
            <SelectTrigger
              id='sub-menu-select'
              className='focus-visible:ring-user-theme w-full min-w-44 outline-none focus-visible:ring-2 sm:w-48'
              aria-label='서브 메뉴 선택'>
              {/* 서브 메뉴는 컴포넌트 내부에서 상태를 직접 추적하므로 기본 placeholder 동작이 가능합니다 */}
              <SelectValue placeholder='서브 메뉴 선택' />
            </SelectTrigger>
            <SelectContent>
              {subMenuItems.map((menu) => (
                <SelectItem key={menu.id} value={menu.id}>
                  {menu.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ─── 오른쪽 영역: 조회 조건 콤보박스 2개 + 아이콘 버튼 ─── */}
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
        {/* 조회 조건 1: 정렬 기준 */}
        <div className='flex items-center gap-2'>
          <span className='text-muted-foreground text-xs font-medium whitespace-nowrap'>정렬</span>
          <Select value={searchFilter1} onValueChange={setSearchFilter1}>
            <SelectTrigger
              id='search-filter1-select'
              className='focus-visible:ring-user-theme w-full min-w-28 outline-none focus-visible:ring-2 sm:w-32'
              aria-label='정렬 기준 선택'>
              {/* 💡 현재 선택된 한글 라벨(예: 조회순)이 트리거에 명확히 표기되도록 연동 */}
              <SelectValue>{currentSortLabel}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 조회 조건 2: 검색 대상 */}
        <div className='flex items-center gap-2'>
          <span className='text-muted-foreground text-xs font-medium whitespace-nowrap'>조건</span>
          <Select value={searchTarget} onValueChange={setSearchTarget}>
            <SelectTrigger
              id='search-target-select'
              className='focus-visible:ring-user-theme w-full min-w-28 outline-none focus-visible:ring-2 sm:w-32'
              aria-label='검색 대상 선택'>
              {/* 💡 현재 선택된 한글 라벨(예: 제목)이 트리거에 명확히 표기되도록 연동 */}
              <SelectValue>{currentTargetLabel}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {targetOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 조회 버튼 */}
        <Button
          type='button'
          onClick={handleSearch}
          className='bg-user-theme text-user-theme-foreground hover:bg-user-theme/90 focus-visible:ring-user-theme flex h-9 w-9 items-center justify-center p-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
          aria-label='선택한 조건으로 조회하기'>
          <Search className='h-4 w-4' aria-hidden='true' />
        </Button>
      </div>
    </div>
  );
}
