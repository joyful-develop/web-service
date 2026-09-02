'use client';

import { useState } from 'react';

import { Search, Laptop, Smartphone, Watch, Tv } from 'lucide-react';

import { MenuSelect } from '@/features/menu/MenuSelect.tsx';
import { SelectDropdown, type SelectDropdownOption } from '@/shared/components/SelectDropdown.tsx';

const frameworksList: SelectDropdownOption[] = [
  { value: 'react', label: 'React', disabled: false, icon: Laptop },
  { value: 'angular', label: 'Angular', disabled: false, icon: Smartphone },
  { value: 'vue', label: 'Vue', disabled: true, icon: Watch },
  { value: 'svelte', label: 'Svelte', disabled: false, icon: Tv },
];

export function PageFilterBar() {
  const [selected, setSelected] = useState<SelectDropdownOption[]>([]);

  const handleSearch = () => {
    console.log('조회 실행:', { selected });
  };

  return (
    <div
      className='bg-background text-foreground border-border z-30 flex h-10 shrink-0 items-center justify-between border-b px-1 text-sm font-light shadow-sm select-none'
      role='search'
      aria-label='콘텐츠 필터 및 조회'>
      <MenuSelect />

      <div className='flex flex-1 flex-col justify-end gap-3 sm:flex-row sm:items-center'>
        <SelectDropdown
          label='기술 스택 다중 선택'
          options={frameworksList}
          onValueChange={setSelected}
          defaultValue={['react']}
          placeholder='프레임워크를 선택하세요'
          disabled={false}
          isMultiSelectable={true}
          maxDisplayCount={1}
          isFilterVerticalAlignment={false}
          isSearchable={true}
          isSimpleSearchable={false}
          isNumberSearchable={false}
          isSelectionReorder={false}
          widthClass='h-8 w-32 sm:w-100'
        />

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
