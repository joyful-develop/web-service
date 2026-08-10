import * as React from 'react';

// import { CommandAsChild as CommandInput } from 'cmdk'; // 혹은 shadcn 기본 CommandInput 변형 가능
import { X } from 'lucide-react';

import { Badge } from '@/shared/components/shadcn-ui/badge.tsx';
import { Command, CommandGroup, CommandItem, CommandList } from '@/shared/components/shadcn-ui/command.tsx';

type Framework = { value: string; label: string };

const FRAMEWORKS: Framework[] = [
  { value: 'nextjs', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix' },
];

export function InlineMultiSelect() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Framework[]>([]);
  const [inputValue, setInputValue] = React.useState('');

  const handleUnselect = React.useCallback((framework: Framework) => {
    setSelected((prev) => prev.filter((s) => s.value !== framework.value));
  }, []);

  const selectables = FRAMEWORKS.filter((framework) => !selected.includes(framework));

  return (
    <Command
      onKeyDown={(e) => {
        if (e.key === 'Backspace' && inputValue === '') {
          setSelected((prev) => {
            const newArr = [...prev];
            newArr.pop();
            return newArr;
          });
        }
      }}
      className='overflow-visible bg-transparent'>
      <div className='group border-input ring-offset-background focus-within:ring-ring rounded-md border px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-offset-2'>
        <div className='flex flex-wrap gap-1'>
          {selected.map((framework) => (
            <Badge key={framework.value} variant='secondary'>
              {framework.label}
              <button
                className='ring-offset-background focus:ring-ring ml-1 rounded-full outline-none focus:ring-2'
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleUnselect(framework);
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleUnselect(framework)}>
                <X className='text-muted-foreground hover:text-foreground h-3 w-3' />
              </button>
            </Badge>
          ))}
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder='프레임워크 검색 및 선택...'
            className='placeholder:text-muted-foreground ml-2 flex-1 bg-transparent outline-none'
          />
        </div>
      </div>
      <div className='relative mt-2'>
        {open && selectables.length > 0 ? (
          <div className='bg-popover text-popover-foreground animate-in absolute top-0 z-10 w-full rounded-md border shadow-md outline-none'>
            <CommandList>
              <CommandGroup className='h-full overflow-auto'>
                {selectables.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => {
                      setInputValue('');
                      setSelected((prev) => [...prev, framework]);
                    }}
                    className={'cursor-pointer'}>
                    {framework.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </div>
        ) : null}
      </div>
    </Command>
  );
}
