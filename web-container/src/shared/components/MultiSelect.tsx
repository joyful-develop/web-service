import * as React from 'react';

import { ChevronsUpDown, X, Check } from 'lucide-react'; // Check 아이콘 추가

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from '@/shared/components/shadcn-ui/combobox.tsx';

const frameworks = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro'];

export function MultiSelect() {
  const [value, setValue] = React.useState<string[]>([]);
  const [open, setOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleRemove = (itemToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setValue((prev) => prev.filter((item) => item !== itemToRemove));
  };

  const handleOpenCombobox = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  return (
    <Combobox items={frameworks} multiple value={value} onValueChange={setValue} open={open} onOpenChange={setOpen}>
      <div
        onClick={handleOpenCombobox}
        className='border-input bg-background hover:bg-accent/50 focus-within:ring-ring flex w-full cursor-pointer items-center justify-between rounded-md border p-1 text-sm shadow-sm focus-within:ring-1'>
        <ComboboxChips className='flex flex-1 flex-wrap items-center gap-1 border-0 p-0 shadow-none'>
          {value.length > 0 ? (
            <ComboboxValue>
              {value.map((item) => (
                <ComboboxChip key={item} className='flex items-center gap-1 pr-1'>
                  {item}
                  <button
                    type='button'
                    onClick={(e) => handleRemove(item, e)}
                    className='hover:bg-muted-foreground/20 text-muted-foreground shrink-0 rounded-full p-0.5'>
                    <X className='h-3 w-3' />
                  </button>
                </ComboboxChip>
              ))}
            </ComboboxValue>
          ) : (
            <ComboboxChipsInput ref={inputRef} placeholder='Add framework' className='border-0 focus-visible:ring-0' />
          )}
        </ComboboxChips>

        <div className='text-muted-foreground shrink-0 px-2'>
          <ChevronsUpDown className='h-4 w-4 opacity-50' />
        </div>
      </div>

      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => {
            // 현재 아이템이 선택된 상태(value 배열에 포함되어 있는지) 확인
            // const isSelected = value.includes(item);

            return (
              <ComboboxItem key={item} value={item} className='flex items-center gap-2 pl-2'>
                {/* 
                  왼쪽 고정 체크박스 영역:
                  선택되었을 때는 Lucide Check 아이콘을 보여주고,
                  선택되지 않았을 때도 레이아웃(너비)이 틀어지지 않도록 공간(h-4 w-4)을 유지합니다.
                */}
                {/* <div className='flex h-4 w-4 shrink-0 items-center justify-center'>
                  {isSelected && <Check className='text-primary h-4 w-4' />}
                </div> */}

                {/* 아이템 텍스트 */}
                <span>{item}</span>
              </ComboboxItem>
            );
          }}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
