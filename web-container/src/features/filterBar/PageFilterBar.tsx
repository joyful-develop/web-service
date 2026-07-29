'use client';

import { MenuSelect } from '@/features/menu/MenuSelect.tsx';

// interface FilterOption {
//   value: string;
//   label: string;
//   isDefault?: boolean;
// }

// const parentMenuMap: Record<string, string> = {
//   board_parent: '게시판 관리',
//   cs_parent: '고객센터',
// };

// const mockMenus: MenuItem[] = [
//   { id: 'all', parentId: 'board_parent', name: '전체 메뉴', isDefault: true },
//   { id: 'notice', parentId: 'board_parent', name: '공지사항' },
//   { id: 'gallery', parentId: 'board_parent', name: '갤러리 게시판' },
//   { id: 'download', parentId: 'board_parent', name: '자료실' },
//   { id: 'faq', parentId: 'cs_parent', name: '자주 묻는 질문', isDefault: true },
//   { id: 'qna', parentId: 'cs_parent', name: '1:1 문의' },
// ];

// const sortOptions: FilterOption[] = [
//   { value: 'latest', label: '최신순' },
//   { value: 'oldest', label: '과거순' },
//   { value: 'views', label: '조회순', isDefault: true },
// ];

// const targetOptions: FilterOption[] = [
//   { value: 'title', label: '제목', isDefault: true },
//   { value: 'content', label: '내용' },
//   { value: 'author', label: '작성자' },
// ];

export function PageFilterBar() {
  // const defaultSort = sortOptions.find((opt) => opt.isDefault) || sortOptions[0];
  // const defaultTarget = targetOptions.find((opt) => opt.isDefault) || targetOptions[0];

  // const [searchFilter1, setSearchFilter1] = useState(defaultSort ? defaultSort.value : '');
  // const [searchTarget, setSearchTarget] = useState(defaultTarget ? defaultTarget.value : '');

  // 현재 선택된 값의 label 실시간 매핑 (옵셔널 체이닝 ? 적용으로 더 안전하게 처리)
  // const currentSortLabel = sortOptions.find((opt) => opt.value === searchFilter1)?.label;
  // const currentTargetLabel = targetOptions.find((opt) => opt.value === searchTarget)?.label;

  // const handleSearch = () => {
  //   console.log('조회 실행:', { subMenu, searchFilter1, searchTarget });
  // };

  return (
    <div
      className='bg-background text-foreground border-border z-30 flex h-10 shrink-0 items-center justify-between border-b px-1 text-sm font-light shadow-sm select-none'
      role='search'
      aria-label='콘텐츠 필터 및 조회'>
      <MenuSelect />

      {/* ─── 오른쪽 영역: 조회 조건 콤보박스 2개 + 아이콘 버튼 ─── */}
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
        {/* 조회 조건 1: 정렬 기준 */}
        {/* <div className='flex items-center gap-2'>
          <span className='text-muted-foreground text-xs font-medium whitespace-nowrap'>정렬</span>
          <Select value={searchFilter1} onValueChange={setSearchFilter1}>
            <SelectTrigger
              id='search-filter1-select'
              className='focus-visible:ring-user-theme w-full min-w-28 outline-none focus-visible:ring-2 sm:w-32'
              aria-label='정렬 기준 선택'>
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
        </div> */}

        {/* 조회 조건 2: 검색 대상 */}
        {/* <div className='flex items-center gap-2'>
          <span className='text-muted-foreground text-xs font-medium whitespace-nowrap'>조건</span>
          <Select value={searchTarget} onValueChange={setSearchTarget}>
            <SelectTrigger
              id='search-target-select'
              className='focus-visible:ring-user-theme w-full min-w-28 outline-none focus-visible:ring-2 sm:w-32'
              aria-label='검색 대상 선택'>
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
        </div> */}

        {/* 조회 버튼 */}
        {/* <Button
          type='button'
          onClick={handleSearch}
          className='bg-user-theme text-user-theme-foreground hover:bg-user-theme/90 focus-visible:ring-user-theme flex h-9 w-9 items-center justify-center p-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
          aria-label='선택한 조건으로 조회하기'>
          <Search className='h-4 w-4' aria-hidden='true' />
        </Button> */}
      </div>
    </div>
  );
}
