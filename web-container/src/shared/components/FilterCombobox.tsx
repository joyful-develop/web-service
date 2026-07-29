'use client';

import { useState, useId } from 'react';

import { Check, ChevronsUpDown } from 'lucide-react';

import { Button } from '@/shared/components/shadcn-ui/button.tsx';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/components/shadcn-ui/command.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/shadcn-ui/popover.tsx';
import { cn } from '@/shared/utils/shadcn/utils.ts';

// 외부에서 넘겨받을 Props 타입 정의
export interface ComboboxOption {
  value: string;
  label: string;
}

interface FilterComboboxProps {
  label: string; // 좌측에 표시될 이름 (예: '정렬', '조건')
  options: ComboboxOption[]; // 선택 목록 데이터 배열
  value: string; // 현재 선택된 상태 값 (제어 컴포넌트)
  onValueChange: (value: string) => void; // 값이 변경될 때 호출할 핸들러
  placeholder?: string; // 선택 전 트리거에 보여줄 기본 문구
  searchPlaceholder?: string; // 검색창 내부 placeholder
  widthClass?: string; // 너비 커스텀을 위한 Tailwind 클래스
}

export function FilterCombobox({
  label,
  options,
  value,
  onValueChange,
  placeholder = '선택...',
  searchPlaceholder = '검색...',
  widthClass = 'w-28 sm:w-32', // 기본 너비 세팅
}: FilterComboboxProps) {
  const [open, setOpen] = useState(false);
  const comboLabelId = useId(); // ♿ 접근성: 스크린 리더용 고유 레이블 ID 생성

  // 현재 선택된 값의 label 역추적
  const currentLabel = options.find((opt) => opt.value === value)?.label;

  return (
    <div className='flex items-center gap-2'>
      {/* ♿ 접근성: 스크린 리더가 이 텍스트와 콤보박스를 연관지어 읽도록 id 부여 */}
      <span id={comboLabelId} className='text-muted-foreground text-xs font-medium whitespace-nowrap'>
        {label}
      </span>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox' // ♿ 접근성: 스크린 리더용 롤 명시
            aria-expanded={open}
            aria-labelledby={comboLabelId} // ♿ 접근성: 좌측 label과 스크린 리더 시맨틱 연결
            disabled={options.length === 0}
            className={cn(
              'focus-visible:ring-user-theme h-8 justify-between px-3 text-xs font-light focus-visible:ring-2',
              widthClass
            )}>
            <span className='truncate'>{currentLabel || placeholder}</span>
            <ChevronsUpDown className='h-3 w-3 shrink-0 opacity-50' aria-hidden='true' />
          </Button>
        </PopoverTrigger>

        <PopoverContent className='w-40 p-0' align='end'>
          <Command>
            <CommandInput placeholder={searchPlaceholder} className='h-8 text-xs' />
            <CommandList>
              <CommandEmpty className='text-muted-foreground p-2 text-center text-xs' role='status' aria-live='polite'>
                결과가 없습니다.
              </CommandEmpty>
              <CommandGroup>
                {options.map((opt) => (
                  <CommandItem
                    key={opt.value}
                    value={opt.value}
                    aria-selected={value === opt.value}
                    onSelect={(selectedValue) => {
                      // 💡 최적화: shadcn command 내부의 영문 소문자 강제 변환 현상 방어
                      const target = options.find((o) => o.value.toLowerCase() === selectedValue.toLowerCase());
                      if (target) {
                        onValueChange(target.value);
                      }
                      setOpen(false);
                    }}
                    className='text-xs font-light'>
                    <span className='truncate'>{opt.label}</span>
                    <Check
                      className={cn('ml-auto h-3 w-3 shrink-0', value === opt.value ? 'opacity-100' : 'opacity-0')}
                      aria-hidden='true'
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
