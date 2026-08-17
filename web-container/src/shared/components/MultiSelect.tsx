import { useState, useId, useMemo, type ButtonHTMLAttributes, type ComponentType } from 'react';

import { CheckIcon, ChevronDown, XIcon, X } from 'lucide-react';

import { Badge } from '@/shared/components/shadcn-ui/badge.tsx';
import { Button } from '@/shared/components/shadcn-ui/button.tsx';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/shared/components/shadcn-ui/command.tsx';
import { Field, FieldGroup, FieldLabel } from '@/shared/components/shadcn-ui/field.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/shadcn-ui/popover.tsx';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/shadcn-ui/select.tsx';
import { cn } from '@/shared/utils/shadcn/utils.ts';

const filterType = [
  { label: '일치', value: '00' },
  { label: '불일치', value: '01' },
  { label: '포함', value: '0' },
  { label: '포함하지 않음', value: '03' },
  { label: '보다 작은', value: '04' },
  { label: '보다 작거나 같은', value: '05' },
  { label: '보다 큰', value: '06' },
  { label: '보다 크거나 같은', value: '07' },
];

interface MultiSelectProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  options: { label: string; value: string; icon?: ComponentType<{ className?: string }> }[];
  onValueChange: (value: string[]) => void;
  defaultValue?: string[];
  placeholder?: string;
  animation?: number;
  maxCount?: number;
  modalPopover?: boolean;
  asChild?: boolean;
  widthClass?: string;
}

export function MultiSelect({
  label,
  options,
  onValueChange,
  defaultValue = [],
  placeholder = 'Select options',
  maxCount = 3,
  widthClass = 'w-28 sm:w-32',
}: MultiSelectProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>(defaultValue);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const comboLabelId = useId();
  const [search, setSearch] = useState('');

  const toggleOption = (value: string) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    setSelectedValues(newSelectedValues);
    onValueChange(newSelectedValues);
  };

  const filteredData = useMemo(() => {
    return options.filter((item) => {
      const matchesSearch = item.value.toLowerCase().includes(search.toLowerCase());
      return matchesSearch;
    });
  }, [options, search]);

  const handleClear = (isAllChecked: boolean) => {
    if (isAllChecked) {
      setSelectedValues(filteredData.map((opt) => opt.value));
      onValueChange(filteredData.map((opt) => opt.value));
    } else {
      setSelectedValues([]);
      onValueChange([]);
    }
  };

  const handleTogglePopover = () => {
    setIsPopoverOpen((prev) => !prev);
  };

  return (
    <div className='flex items-center gap-2 text-sm'>
      <span id={comboLabelId} className='text-muted-foreground truncate font-medium'>
        {label}
      </span>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <button
            onClick={handleTogglePopover}
            className={cn(
              'border-border hover:ring-user-theme focus:ring-user-theme min-h-5 min-w-28 rounded-sm border hover:ring focus:ring',
              widthClass
            )}>
            {selectedValues.length > 0 ? (
              <div className='flex w-full items-center justify-between overflow-hidden'>
                <div className='flex min-w-0 flex-1 items-center overflow-hidden px-1'>
                  <div className='flex w-fit items-center justify-between overflow-hidden'>
                    {selectedValues.length != options.length ? (
                      selectedValues.slice(0, maxCount).map((value) => {
                        const option = options.find((o) => o.value === value);
                        const IconComponent = option?.icon;
                        return (
                          <Badge
                            key={value}
                            className='bg-user-theme/50 mx-1 flex min-w-0 flex-1 items-center justify-between rounded-sm font-light'>
                            {IconComponent && <IconComponent className='mr-1 h-4 w-4' />}
                            <span className='flex-1 truncate'>{option?.label}</span>
                            <div
                              className='hover:bg-user-theme/30 ml-1 shrink-0 cursor-pointer'
                              onClick={(event) => {
                                event.stopPropagation();
                                toggleOption(value);
                              }}>
                              <XIcon className='h-3 w-3' />
                            </div>
                          </Badge>
                        );
                      })
                    ) : (
                      <Badge
                        key={'All'}
                        className='bg-user-theme/50 mx-1 flex min-w-0 flex-1 items-center justify-between rounded-sm font-light'>
                        <span className='flex-1 truncate'>All</span>
                        <div
                          className='hover:bg-user-theme/30 ml-1 shrink-0 cursor-pointer'
                          onClick={(event) => {
                            event.stopPropagation();
                            handleClear(false);
                          }}>
                          <XIcon className='h-3 w-3' />
                        </div>
                      </Badge>
                    )}
                  </div>
                  {selectedValues.length > maxCount && (
                    <Badge className='bg-user-theme/50 mr-1 shrink-0 rounded-sm font-light'>{`+${selectedValues.length - maxCount}`}</Badge>
                  )}
                </div>
                <div className='flex min-w-0 shrink-0 items-center justify-between'>
                  <div className='bg-border h-5 w-px' />
                  <div
                    className='text-muted-foreground cursor-ponter m-1 p-1'
                    onClick={(event) => {
                      event.stopPropagation();
                      handleClear(false);
                    }}>
                    <X className='h-4 w-4 hover:text-red-500' />
                  </div>
                  <div className='bg-border h-5 w-px' />
                  <ChevronDown
                    className={cn(
                      'text-muted-foreground mx-2 h-4 w-4 rotate-0 transform cursor-pointer transition-transform duration-100',
                      isPopoverOpen && 'rotate-180'
                    )}
                  />
                </div>
              </div>
            ) : (
              <div className='mx-auto flex w-full items-center justify-between'>
                <span className={cn('text-muted-foreground mx-3 flex-1 truncate')}>{placeholder}</span>
                <ChevronDown
                  className={cn(
                    'text-muted-foreground mx-2 h-4 w-4 rotate-0 transform cursor-pointer transition-transform duration-100',
                    isPopoverOpen && 'rotate-180'
                  )}
                />
              </div>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className='w-(--radix-popover-trigger-width) p-0' align='start'>
          <Command>
            <CommandGroup className='mx-1 mt-2'>
              <FieldGroup className='max-w-sm'>
                <Field orientation='vertical' className='items-center justify-between'>
                  <FieldLabel htmlFor='checkout-7j9-card-name-43j'>필터</FieldLabel>
                  <Select>
                    <SelectTrigger id='checkout-exp-month-ts6'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent position='popper' align='start'>
                      <SelectGroup>
                        {filterType.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <input
                    className='border-border hover:border-sub-border focus:border-sub-border w-full flex-1 rounded-sm border px-2 py-1 text-sm font-light focus:outline-none'
                    placeholder='filter...'
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Field>
              </FieldGroup>
            </CommandGroup>
            <CommandSeparator className='mx-1 my-2' />
            <CommandGroup className='mx-1'>
              <FieldGroup className='max-w-sm'>
                <Field orientation='horizontal' className='items-center justify-between'>
                  <Button variant='outline' type='button' onClick={() => handleClear(true)}>
                    Select all
                  </Button>
                  <Button variant='outline' type='button' onClick={() => handleClear(false)}>
                    Clear all
                  </Button>
                </Field>
              </FieldGroup>
            </CommandGroup>
            <CommandSeparator className='mx-1 my-2' />
            <CommandList>
              <CommandEmpty>선택 가능한 항목이 없습니다.</CommandEmpty>
              <CommandGroup>
                {filteredData.map((option) => {
                  const isSelected = selectedValues.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => toggleOption(option.value)}
                      className='hover:bg-accent cursor-pointer'>
                      <div
                        className={cn(
                          'border-sub-border group-hover/command-item:border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border',
                          isSelected ? 'bg-primary text-primary-foreground' : 'opacity-50 [&_svg]:invisible'
                        )}>
                        <CheckIcon className='h-4 w-4' />
                      </div>
                      {option?.icon && <option.icon className='text-muted-foreground mr-2 h-4 w-4' />}
                      <span className='truncate'>{option.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

MultiSelect.displayName = 'MultiSelect';
