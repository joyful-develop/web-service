'use client';

import { useState } from 'react';

import { Search, Laptop, Smartphone, Watch, Tv } from 'lucide-react';

import { MenuSelect } from '@/features/menu/MenuSelect.tsx';
import { FilterCombobox, type ComboboxOption } from '@/shared/components/FilterCombobox.tsx'; // 임포트
import { MultiSelect } from '@/shared/components/MultiSelect.tsx';
import { InlineMultiSelect } from '@/shared/components/MultiSelect2.tsx';

const sortOptions: ComboboxOption[] = [
  { value: 'latest', label: '최신순' },
  { value: 'oldest', label: '과거순' },
  { value: 'views', label: '조회순' }, // 기본값 지표는 부모 state 초기값으로 이관
];

const targetOptions: ComboboxOption[] = [
  { value: 'title', label: '제목' },
  { value: 'content', label: '내용' },
  { value: 'author', label: '작성자' },
];

const frameworksList = [
  { value: 'react', label: 'React', icon: Laptop },
  { value: 'angular', label: 'Angular', icon: Smartphone },
  { value: 'vue', label: 'Vue', icon: Watch },
  { value: 'svelte', label: 'Svelte', icon: Tv },
];

export function PageFilterBar() {
  // 상태 제어 (각 목록의 초기값 지정)
  const [searchFilter1, setSearchFilter1] = useState('views');
  const [searchTarget, setSearchTarget] = useState('title');
  const [selected, setSelected] = useState<string[]>(['react']);

  const handleSearch = () => {
    console.log('조회 실행:', { searchFilter1, searchTarget, selected });
  };

  return (
    <div
      className='bg-background text-foreground border-border z-30 flex h-10 shrink-0 items-center justify-between border-b px-1 text-sm font-light shadow-sm select-none'
      role='search'
      aria-label='콘텐츠 필터 및 조회'>
      {/* 왼쪽: 서브 메뉴 영역 */}
      <MenuSelect />

      {/* 오른쪽 영역: 공통 컴포넌트로 분리된 콤보박스 2개 + 아이콘 버튼 */}
      <div className='flex flex-1 flex-col justify-end gap-3 sm:flex-row sm:items-center'>
        {/* 1. 정렬 기준 콤보박스 */}
        <FilterCombobox
          label='정렬'
          options={sortOptions}
          value={searchFilter1}
          onValueChange={setSearchFilter1}
          placeholder='정렬 기준 선택'
        />

        {/* 2. 검색 대상 콤보박스 (필요 시 주석 해제하여 바로 사용 가능) */}
        <FilterCombobox
          label='조건'
          options={targetOptions}
          value={searchTarget}
          onValueChange={setSearchTarget}
          placeholder='검색 조건 선택'
          widthClass='w-24 sm:w-28' // 컴포넌트별로 너비가 다를 때 오버라이딩 가능
        />

        <MultiSelect
          label='기술 스택 다중 선택'
          options={frameworksList}
          onValueChange={setSelected}
          defaultValue={selected}
          placeholder='프레임워크를 선택하세요'
          maxCount={2} // 화면에 노출할 최대 뱃지 수
          className=''
        />

        <InlineMultiSelect />

        {/* 조회 버튼 */}
        <button onClick={handleSearch} className='group/refresh icon-button' aria-label='선택한 조건으로 조회하기'>
          <Search
            className='h-4 w-4 transition-transform duration-100 group-hover/refresh:rotate-45'
            aria-hidden='true'
          />
        </button>
      </div>
    </div>
  );
}
